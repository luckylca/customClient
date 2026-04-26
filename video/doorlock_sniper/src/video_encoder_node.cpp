#include "doorlock_sniper/video_encoder_node.hpp"
#include <cv_bridge/cv_bridge.h>
#include <rclcpp_components/register_node_macro.hpp>
#include <algorithm>
#include <cctype>
#include <chrono>
#include <cstring>  // 为 memcpy/memset
#include <fcntl.h>
#include <filesystem>
#include <fstream>
#include <iomanip>
#include <termios.h>
#include <unistd.h>
#include <sstream>

namespace doorlock_sniper
{

namespace {

constexpr const char *kVisionModeAlivePath = "/tmp/vision_mode.sniper_alive";
constexpr const char *kVisionModeRequestPath = "/tmp/vision_mode.request";
constexpr uint8_t kModeFrameHeader1 = 0x4A;
constexpr uint8_t kModeFrameHeader2 = 0xA4;
constexpr size_t kModeFrameSize = 5;  // header1 + header2 + mode + crc_l + crc_h

#pragma pack(push, 1)
struct VisionModeFramePacked
{
  uint8_t header1;
  uint8_t header2;
  uint8_t mode;
  uint16_t crc16;
};
#pragma pack(pop)

static_assert(sizeof(VisionModeFramePacked) == kModeFrameSize, "VisionModeFramePacked must be 5 bytes");

void write_sniper_alive()
{
  std::ofstream alive_file(kVisionModeAlivePath, std::ios::trunc);
  if (!alive_file.is_open()) {
    return;
  }
  alive_file << "SNIPER\n";
}

void write_mode_request(const char *mode_text)
{
  std::ofstream request_file(kVisionModeRequestPath, std::ios::trunc);
  if (!request_file.is_open()) {
    return;
  }
  request_file << mode_text << "\n";
}

}  // namespace

VideoEncoderNode::VideoEncoderNode(const rclcpp::NodeOptions & options)
: Node("video_encoder_node", options),
  pipeline_(nullptr),
  appsrc_(nullptr),
  appsink_(nullptr),
  bus_(nullptr),
  packet_sequence_id_(0),    // 初始化顺序与声明一致
  frame_count_(0),
  display_running_(false)    // 最后初始化
{
  const int kVideoPacketBytes = static_cast<int>(doorlock_sniper::msg::VideoPacket{}.data.size());

  param_input_topic_ = this->declare_parameter("input_topic", "/image_raw");
  param_crop_size_ = this->declare_parameter("crop_size", 800);
  param_output_size_ = this->declare_parameter("output_size", 400);
  param_output_fps_ = this->declare_parameter("output_fps", 60);
  param_target_bitrate_ = this->declare_parameter("target_bitrate", 40);
  param_packet_size_ = this->declare_parameter("packet_size", kVideoPacketBytes);
  param_static_simplify_ = this->declare_parameter("static_simplify", true);
  param_motion_threshold_ = this->declare_parameter("motion_threshold", 14);
  param_motion_erode_px_ = this->declare_parameter("motion_erode_px", 1);
  param_motion_dilate_px_ = this->declare_parameter("motion_dilate_px", 2);
  param_motion_trail_frames_ = this->declare_parameter("motion_trail_frames", 3);
  param_trail_disable_motion_ratio_ = this->declare_parameter("trail_disable_motion_ratio", 0.30);
  param_bg_update_alpha_ = this->declare_parameter("bg_update_alpha", 0.01);
  param_bg_blur_sigma_ = this->declare_parameter("bg_blur_sigma", 1.2);
  param_center_clear_size_ = this->declare_parameter("center_clear_size", 100);
  param_force_monochrome_ = this->declare_parameter("force_monochrome", false);
  param_bandwidth_limit_kbytes_ = this->declare_parameter("bandwidth_limit_kbytes", 7.0);
  param_bandwidth_window_s_ = this->declare_parameter("bandwidth_window_s", 2.0);
  param_max_tx_delay_s_ = this->declare_parameter("max_tx_delay_s", 1.0);
  param_enable_display_ = this->declare_parameter("enable_display", true);
  param_x264_preset_ = this->declare_parameter("x264_preset", std::string("auto"));
  param_debug_dump_enable_ = this->declare_parameter("debug_dump_enable", false);
  param_debug_dump_every_n_frames_ = this->declare_parameter("debug_dump_every_n_frames", 20);
  param_debug_dump_save_raw_ = this->declare_parameter("debug_dump_save_raw", true);
  param_debug_dump_save_roi_ = this->declare_parameter("debug_dump_save_roi", true);
  param_debug_dump_save_static_ = this->declare_parameter("debug_dump_save_static", true);
  param_debug_dump_save_final_ = this->declare_parameter("debug_dump_save_final", true);
  param_debug_dump_dir_ = this->declare_parameter("debug_dump_dir", std::string("sniper_debug_imgs"));
  param_serial_enable_ = this->declare_parameter("serial_enable", false);
  param_serial_rx_enable_ = this->declare_parameter("serial_rx_enable", false);
  param_serial_port_ = this->declare_parameter("serial_port", std::string("/dev/ttyACM0"));
  param_serial_baudrate_ = this->declare_parameter("serial_baudrate", 921600);

  if (param_output_fps_ < 1) {
    RCLCPP_WARN(this->get_logger(), "Invalid output_fps=%d, clamp to 1", param_output_fps_);
    param_output_fps_ = 1;
  }
  if (param_output_fps_ > 60) {
    RCLCPP_WARN(this->get_logger(), "output_fps=%d too high, clamp to 60", param_output_fps_);
    param_output_fps_ = 60;
  }

  if (param_packet_size_ != kVideoPacketBytes) {
    RCLCPP_WARN(
      this->get_logger(),
      "VideoPacket.msg payload is fixed to %d bytes, override packet_size %d -> %d",
      kVideoPacketBytes, param_packet_size_, kVideoPacketBytes);
    param_packet_size_ = kVideoPacketBytes;
  }

  if (param_target_bitrate_ < 200) {
    RCLCPP_WARN(
      this->get_logger(),
      "Very low bitrate (%d kbps) detected, using low-bitrate optimized pipeline",
      param_target_bitrate_);
  }
  if (param_motion_trail_frames_ < 0) {
    RCLCPP_WARN(
      this->get_logger(), "motion_trail_frames=%d invalid, clamp to 0",
      param_motion_trail_frames_);
    param_motion_trail_frames_ = 0;
  }
  if (param_motion_trail_frames_ > 15) {
    RCLCPP_WARN(
      this->get_logger(), "motion_trail_frames=%d too high, clamp to 15",
      param_motion_trail_frames_);
    param_motion_trail_frames_ = 15;
  }
  if (param_trail_disable_motion_ratio_ < 0.0) {
    RCLCPP_WARN(
      this->get_logger(), "trail_disable_motion_ratio=%.3f invalid, clamp to 0.0",
      param_trail_disable_motion_ratio_);
    param_trail_disable_motion_ratio_ = 0.0;
  }
  if (param_trail_disable_motion_ratio_ > 1.0) {
    RCLCPP_WARN(
      this->get_logger(), "trail_disable_motion_ratio=%.3f invalid, clamp to 1.0",
      param_trail_disable_motion_ratio_);
    param_trail_disable_motion_ratio_ = 1.0;
  }

  if (param_motion_erode_px_ < 0) {
    RCLCPP_WARN(
      this->get_logger(), "motion_erode_px=%d invalid, clamp to 0",
      param_motion_erode_px_);
    param_motion_erode_px_ = 0;
  }
  if (param_motion_erode_px_ > 20) {
    RCLCPP_WARN(
      this->get_logger(), "motion_erode_px=%d too high, clamp to 20",
      param_motion_erode_px_);
    param_motion_erode_px_ = 20;
  }
  if (param_motion_dilate_px_ < 0) {
    RCLCPP_WARN(
      this->get_logger(), "motion_dilate_px=%d invalid, clamp to 0",
      param_motion_dilate_px_);
    param_motion_dilate_px_ = 0;
  }
  if (param_motion_dilate_px_ > 20) {
    RCLCPP_WARN(
      this->get_logger(), "motion_dilate_px=%d too high, clamp to 20",
      param_motion_dilate_px_);
    param_motion_dilate_px_ = 20;
  }

  if (param_bandwidth_limit_kbytes_ < 1.0) {
    RCLCPP_WARN(
      this->get_logger(), "bandwidth_limit_kbytes=%.2f too low, clamp to 1.0",
      param_bandwidth_limit_kbytes_);
    param_bandwidth_limit_kbytes_ = 1.0;
  }
  if (param_bandwidth_window_s_ < 0.2) {
    RCLCPP_WARN(
      this->get_logger(), "bandwidth_window_s=%.2f too low, clamp to 0.2",
      param_bandwidth_window_s_);
    param_bandwidth_window_s_ = 0.2;
  }
  if (param_max_tx_delay_s_ < 0.05) {
    RCLCPP_WARN(
      this->get_logger(), "max_tx_delay_s=%.2f too low, clamp to 0.05",
      param_max_tx_delay_s_);
    param_max_tx_delay_s_ = 0.05;
  }
  if (param_debug_dump_every_n_frames_ < 1) {
    RCLCPP_WARN(
      this->get_logger(), "debug_dump_every_n_frames=%d invalid, clamp to 1",
      param_debug_dump_every_n_frames_);
    param_debug_dump_every_n_frames_ = 1;
  }
  if (param_debug_dump_enable_) {
    const bool any_encoder_save =
      param_debug_dump_save_raw_ || param_debug_dump_save_roi_ ||
      param_debug_dump_save_static_ || param_debug_dump_save_final_;
    if (!any_encoder_save) {
      RCLCPP_WARN(
        this->get_logger(),
        "debug_dump_enable=true but all encoder dump switches are off");
    } else {
      const std::filesystem::path dump_dir = std::filesystem::path(param_debug_dump_dir_) / "encoder";
      std::error_code ec;
      std::filesystem::create_directories(dump_dir, ec);
      if (ec) {
        RCLCPP_WARN(
          this->get_logger(),
          "Create debug dump dir failed: %s (%s), disable debug dump",
          dump_dir.string().c_str(), ec.message().c_str());
        param_debug_dump_enable_ = false;
      } else {
        RCLCPP_INFO(
          this->get_logger(),
          "Debug dump enabled: every %d frames -> %s (raw=%s roi=%s static=%s final=%s)",
          param_debug_dump_every_n_frames_,
          dump_dir.string().c_str(),
          param_debug_dump_save_raw_ ? "on" : "off",
          param_debug_dump_save_roi_ ? "on" : "off",
          param_debug_dump_save_static_ ? "on" : "off",
          param_debug_dump_save_final_ ? "on" : "off");
      }
    }
  }

  image_sub_ = this->create_subscription<sensor_msgs::msg::Image>(
    param_input_topic_,
    rclcpp::SensorDataQoS(),
    std::bind(&VideoEncoderNode::image_callback, this, std::placeholders::_1));

  packet_pub_ = this->create_publisher<doorlock_sniper::msg::VideoPacket>(
    "video_stream",
    rclcpp::QoS(rclcpp::KeepLast(3000)).reliable());

  if (param_serial_enable_ || param_serial_rx_enable_) {
    initialize_serial();
  }

  initialize_gstreamer();

  if (param_enable_display_) {
    display_running_ = true;
    display_thread_ = std::thread(&VideoEncoderNode::display_loop, this);
  }

  RCLCPP_INFO(this->get_logger(), 
    "VideoEncoderNode: crop=%d -> %dx%d@%dfps %dkbps, packets=%dbytes, static_simplify=%s, "
    "motion_open(y=%d,x=%d), trail=%df disable@%.0f%% mono=%s, "
    "tx_limit=%.2fkB/s@%.2fs max_delay=%.2fs x264_preset=%s",
    param_crop_size_, param_output_size_, param_output_size_,
    param_output_fps_, param_target_bitrate_, param_packet_size_,
    param_static_simplify_ ? "on" : "off",
    param_motion_erode_px_, param_motion_dilate_px_,
    param_motion_trail_frames_, param_trail_disable_motion_ratio_ * 100.0,
    param_force_monochrome_ ? "on" : "off",
    param_bandwidth_limit_kbytes_, param_bandwidth_window_s_, param_max_tx_delay_s_,
    param_x264_preset_.c_str());
}

VideoEncoderNode::~VideoEncoderNode()
{
  if (param_enable_display_) {
    display_running_ = false;
    if (display_thread_.joinable()) display_thread_.join();
    cv::destroyAllWindows();
  }
  shutdown_serial();
  shutdown_gstreamer();
}

speed_t VideoEncoderNode::baudrate_to_speed(int baudrate)
{
  switch (baudrate) {
    case 9600: return B9600;
    case 19200: return B19200;
    case 38400: return B38400;
    case 57600: return B57600;
    case 115200: return B115200;
    case 230400: return B230400;
    case 460800: return B460800;
#ifdef B921600
    case 921600: return B921600;
#endif
#ifdef B1500000
    case 1500000: return B1500000;
#endif
#ifdef B2000000
    case 2000000: return B2000000;
#endif
    default: return B115200;
  }
}

uint16_t VideoEncoderNode::getCRC(const uint8_t * data, size_t length)
{
  static constexpr uint16_t kCrcInit = 0xFFFF;
  static constexpr uint16_t kCrcTable[256] = {
    0x0000, 0x1189, 0x2312, 0x329b, 0x4624, 0x57ad, 0x6536, 0x74bf,
    0x8c48, 0x9dc1, 0xaf5a, 0xbed3, 0xca6c, 0xdbe5, 0xe97e, 0xf8f7,
    0x1081, 0x0108, 0x3393, 0x221a, 0x56a5, 0x472c, 0x75b7, 0x643e,
    0x9cc9, 0x8d40, 0xbfdb, 0xae52, 0xdaed, 0xcb64, 0xf9ff, 0xe876,
    0x2102, 0x308b, 0x0210, 0x1399, 0x6726, 0x76af, 0x4434, 0x55bd,
    0xad4a, 0xbcc3, 0x8e58, 0x9fd1, 0xeb6e, 0xfae7, 0xc87c, 0xd9f5,
    0x3183, 0x200a, 0x1291, 0x0318, 0x77a7, 0x662e, 0x54b5, 0x453c,
    0xbdcb, 0xac42, 0x9ed9, 0x8f50, 0xfbef, 0xea66, 0xd8fd, 0xc974,
    0x4204, 0x538d, 0x6116, 0x709f, 0x0420, 0x15a9, 0x2732, 0x36bb,
    0xce4c, 0xdfc5, 0xed5e, 0xfcd7, 0x8868, 0x99e1, 0xab7a, 0xbaf3,
    0x5285, 0x430c, 0x7197, 0x601e, 0x14a1, 0x0528, 0x37b3, 0x263a,
    0xdecd, 0xcf44, 0xfddf, 0xec56, 0x98e9, 0x8960, 0xbbfb, 0xaa72,
    0x6306, 0x728f, 0x4014, 0x519d, 0x2522, 0x34ab, 0x0630, 0x17b9,
    0xef4e, 0xfec7, 0xcc5c, 0xddd5, 0xa96a, 0xb8e3, 0x8a78, 0x9bf1,
    0x7387, 0x620e, 0x5095, 0x411c, 0x35a3, 0x242a, 0x16b1, 0x0738,
    0xffcf, 0xee46, 0xdcdd, 0xcd54, 0xb9eb, 0xa862, 0x9af9, 0x8b70,
    0x8408, 0x9581, 0xa71a, 0xb693, 0xc22c, 0xd3a5, 0xe13e, 0xf0b7,
    0x0840, 0x19c9, 0x2b52, 0x3adb, 0x4e64, 0x5fed, 0x6d76, 0x7cff,
    0x9489, 0x8500, 0xb79b, 0xa612, 0xd2ad, 0xc324, 0xf1bf, 0xe036,
    0x18c1, 0x0948, 0x3bd3, 0x2a5a, 0x5ee5, 0x4f6c, 0x7df7, 0x6c7e,
    0xa50a, 0xb483, 0x8618, 0x9791, 0xe32e, 0xf2a7, 0xc03c, 0xd1b5,
    0x2942, 0x38cb, 0x0a50, 0x1bd9, 0x6f66, 0x7eef, 0x4c74, 0x5dfd,
    0xb58b, 0xa402, 0x9699, 0x8710, 0xf3af, 0xe226, 0xd0bd, 0xc134,
    0x39c3, 0x284a, 0x1ad1, 0x0b58, 0x7fe7, 0x6e6e, 0x5cf5, 0x4d7c,
    0xc60c, 0xd785, 0xe51e, 0xf497, 0x8028, 0x91a1, 0xa33a, 0xb2b3,
    0x4a44, 0x5bcd, 0x6956, 0x78df, 0x0c60, 0x1de9, 0x2f72, 0x3efb,
    0xd68d, 0xc704, 0xf59f, 0xe416, 0x90a9, 0x8120, 0xb3bb, 0xa232,
    0x5ac5, 0x4b4c, 0x79d7, 0x685e, 0x1ce1, 0x0d68, 0x3ff3, 0x2e7a,
    0xe70e, 0xf687, 0xc41c, 0xd595, 0xa12a, 0xb0a3, 0x8238, 0x93b1,
    0x6b46, 0x7acf, 0x4854, 0x59dd, 0x2d62, 0x3ceb, 0x0e70, 0x1ff9,
    0xf78f, 0xe606, 0xd49d, 0xc514, 0xb1ab, 0xa022, 0x92b9, 0x8330,
    0x7bc7, 0x6a4e, 0x58d5, 0x495c, 0x3de3, 0x2c6a, 0x1ef1, 0x0f78
  };

  if (data == nullptr) {
    return 0xFFFF;
  }

  uint16_t crc = kCrcInit;
  for (size_t index = 0; index < length; ++index) {
    crc = static_cast<uint16_t>((crc >> 8) ^
      kCrcTable[(crc ^ static_cast<uint16_t>(data[index])) & 0x00FF]);
  }
  return crc;
}


void VideoEncoderNode::initialize_serial()
{
  serial_fd_ = open(param_serial_port_.c_str(), O_RDWR | O_NOCTTY | O_SYNC);
  if (serial_fd_ < 0) {
    RCLCPP_ERROR(
      this->get_logger(), "Open serial port failed: %s", param_serial_port_.c_str());
    param_serial_enable_ = false;
    return;
  }

  termios tty {};
  if (tcgetattr(serial_fd_, &tty) != 0) {
    RCLCPP_ERROR(this->get_logger(), "tcgetattr failed for %s", param_serial_port_.c_str());
    close(serial_fd_);
    serial_fd_ = -1;
    param_serial_enable_ = false;
    return;
  }

  cfmakeraw(&tty);
  speed_t speed = baudrate_to_speed(param_serial_baudrate_);
  cfsetispeed(&tty, speed);
  cfsetospeed(&tty, speed);
  tty.c_cflag |= (CLOCAL | CREAD);
  tty.c_cflag &= ~CSTOPB;
  tty.c_cflag &= ~PARENB;
  tty.c_cflag &= ~CRTSCTS;
  tty.c_cflag &= ~CSIZE;
  tty.c_cflag |= CS8;
  tty.c_cc[VMIN] = 0;
  tty.c_cc[VTIME] = 1;

  if (tcsetattr(serial_fd_, TCSANOW, &tty) != 0) {
    RCLCPP_ERROR(this->get_logger(), "tcsetattr failed for %s", param_serial_port_.c_str());
    close(serial_fd_);
    serial_fd_ = -1;
    param_serial_enable_ = false;
    return;
  }

  RCLCPP_INFO(
    this->get_logger(),
    "Serial enabled: %s @ %d (tx=%s rx=%s)",
    param_serial_port_.c_str(),
    param_serial_baudrate_,
    param_serial_enable_ ? "on" : "off",
    param_serial_rx_enable_ ? "on" : "off");

  if (param_serial_rx_enable_) {
    serial_rx_running_.store(true);
    serial_rx_thread_ = std::thread(&VideoEncoderNode::serial_receive_loop, this);
  }
}

void VideoEncoderNode::shutdown_serial()
{
  serial_rx_running_.store(false);
  if (serial_rx_thread_.joinable()) {
    serial_rx_thread_.join();
  }

  if (serial_fd_ >= 0) {
    close(serial_fd_);
    serial_fd_ = -1;
  }
}

void VideoEncoderNode::publish_mode_request(uint8_t mode)
{
  const uint8_t previous_mode = last_recv_mode_;
  if (mode == 1) {
    write_mode_request("AUTOAIM");
  } else if (mode == 2) {
    write_mode_request("SNIPER");
  } else {
    RCLCPP_WARN_THROTTLE(
      this->get_logger(), *this->get_clock(), 1000,
      "Ignore unknown mode byte from serial: %u", static_cast<unsigned>(mode));
    return;
  }

  if (last_recv_mode_ != mode) {
    last_recv_mode_ = mode;
    if (mode == 2) {
      RCLCPP_INFO(
        this->get_logger(),
        "Serial mode flag: recv=%u request=%s current=%s prev=%s",
        static_cast<unsigned>(mode),
        "SNIPER",
        "SNIPER",
        previous_mode == 1 ? "AUTOAIM" : (previous_mode == 2 ? "SNIPER" : "UNKNOWN"));
    }
  }
}

void VideoEncoderNode::serial_receive_loop()
{
  std::vector<uint8_t> rx_buffer;
  rx_buffer.reserve(128);
  uint8_t read_buf[64] = {0};

  while (serial_rx_running_.load()) {
    if (serial_fd_ < 0) {
      break;
    }

    const ssize_t n = read(serial_fd_, read_buf, sizeof(read_buf));
    if (n <= 0) {
      continue;
    }
    rx_buffer.insert(rx_buffer.end(), read_buf, read_buf + n);

    // 固定帧结构: [header1=0x4A, header2=0xA4, mode, crc_l, crc_h]
    while (rx_buffer.size() >= kModeFrameSize) {
      size_t header_pos = 0;
      bool found_header = false;
      for (; header_pos + 1 < rx_buffer.size(); ++header_pos) {
        if (rx_buffer[header_pos] == kModeFrameHeader1 &&
          rx_buffer[header_pos + 1] == kModeFrameHeader2)
        {
          found_header = true;
          break;
        }
      }

      if (!found_header) {
        // 保留最后一个字节，防止帧头跨 read 边界丢失
        if (rx_buffer.size() > 1) {
          rx_buffer.erase(rx_buffer.begin(), rx_buffer.end() - 1);
        }
        break;
      }

      if (header_pos > 0) {
        rx_buffer.erase(rx_buffer.begin(), rx_buffer.begin() + header_pos);
      }

      if (rx_buffer.size() < kModeFrameSize) {
        break;
      }

      VisionModeFramePacked frame{};
      std::memcpy(&frame, rx_buffer.data(), sizeof(frame));

      if (frame.header1 != kModeFrameHeader1 || frame.header2 != kModeFrameHeader2) {
        rx_buffer.erase(rx_buffer.begin());
        continue;
      }

      const uint16_t recv_crc =
        static_cast<uint16_t>(rx_buffer[3]) |
        (static_cast<uint16_t>(rx_buffer[4]) << 8);
      const uint16_t calc_crc = getCRC(rx_buffer.data(), 3);

      if (recv_crc == calc_crc) {
        publish_mode_request(frame.mode);
      } else {
        RCLCPP_WARN_THROTTLE(
          this->get_logger(), *this->get_clock(), 1000,
          "Drop bad mode frame: crc_recv=0x%04X crc_calc=0x%04X mode=0x%02X",
          static_cast<unsigned>(recv_crc),
          static_cast<unsigned>(calc_crc),
          static_cast<unsigned>(frame.mode));
      }

      rx_buffer.erase(rx_buffer.begin(), rx_buffer.begin() + kModeFrameSize);
    }
  }
}

bool VideoEncoderNode::send_serial_packet(const doorlock_sniper::msg::VideoPacket & packet)
{
  if (!param_serial_enable_ || serial_fd_ < 0) {
    return true;
  }

  constexpr uint8_t kMagic0 = 0x55;
  constexpr uint8_t kMagic1 = 0xAA;
  constexpr uint8_t kVersion = 1;
  constexpr uint8_t kTypeVideo = 1;
  constexpr size_t kExpectedFrameBytes = 288;
  const size_t kPayloadBytes = packet.data.size();

  std::vector<uint8_t> frame;
  frame.reserve(2 + 1 + 1 + 2 + 8 + 2 + kPayloadBytes + 2);
  frame.push_back(kMagic0);
  frame.push_back(kMagic1);
  frame.push_back(kVersion);
  frame.push_back(kTypeVideo);

  const uint16_t sequence_id = static_cast<uint16_t>(packet.sequence_id & 0xFFFF);
  const uint64_t timestamp_ns = packet.timestamp_ns;
  const uint16_t payload_len = static_cast<uint16_t>(kPayloadBytes);

  frame.push_back(static_cast<uint8_t>(sequence_id & 0xFF));
  frame.push_back(static_cast<uint8_t>((sequence_id >> 8) & 0xFF));
  for (int shift = 0; shift < 64; shift += 8) frame.push_back(static_cast<uint8_t>((timestamp_ns >> shift) & 0xFF));
  frame.push_back(static_cast<uint8_t>(payload_len & 0xFF));
  frame.push_back(static_cast<uint8_t>((payload_len >> 8) & 0xFF));
  frame.insert(frame.end(), packet.data.begin(), packet.data.end());

  const uint16_t crc = getCRC(frame.data(), frame.size());
  frame.push_back(static_cast<uint8_t>(crc & 0xFF));
  frame.push_back(static_cast<uint8_t>((crc >> 8) & 0xFF));

  if (frame.size() != kExpectedFrameBytes) {
    RCLCPP_WARN_THROTTLE(
      this->get_logger(), *this->get_clock(), 1000,
      "Serial frame size mismatch: actual=%zu expected=%zu payload=%zu",
      frame.size(), kExpectedFrameBytes, kPayloadBytes);
  }

  RCLCPP_INFO(
    this->get_logger(),
    "Serial TX frame: bytes=%zu "
    "hdr=[%02X %02X %02X %02X] "
    "seq=%u ts=%llu len=%u "
    "raw_len=[%02X %02X] payload_head=[%02X %02X %02X %02X] "
    "crc=0x%04X crc_bytes=[%02X %02X]",
    frame.size(),
    static_cast<unsigned>(frame[0]),
    static_cast<unsigned>(frame[1]),
    static_cast<unsigned>(frame[2]),
    static_cast<unsigned>(frame[3]),
    static_cast<unsigned>(sequence_id),
    static_cast<unsigned long long>(timestamp_ns),
    static_cast<unsigned>(payload_len),
    static_cast<unsigned>(frame[14]),
    static_cast<unsigned>(frame[15]),
    static_cast<unsigned>(frame[16]),
    static_cast<unsigned>(frame[17]),
    static_cast<unsigned>(frame[18]),
    static_cast<unsigned>(frame[19]),
    static_cast<unsigned>(crc),
    static_cast<unsigned>(frame[frame.size() - 2]),
    static_cast<unsigned>(frame[frame.size() - 1]));

  size_t written = 0;
  while (written < frame.size()) {
    const ssize_t ret = write(serial_fd_, frame.data() + written, frame.size() - written);
    if (ret < 0) {
      return false;
    }
    written += static_cast<size_t>(ret);
  }
  return true;
}

void VideoEncoderNode::initialize_gstreamer()
{
  gst_init(nullptr, nullptr);

  pipeline_ = gst_pipeline_new("encoder_pipe");
  appsrc_ = gst_element_factory_make("appsrc", "source");
  appsink_ = gst_element_factory_make("appsink", "sink");
  GstElement *convert = gst_element_factory_make("videoconvert", "convert");
  GstElement *encoder = gst_element_factory_make("x264enc", "encoder");
  GstElement *parser = gst_element_factory_make("h264parse", "parser");

  if (!pipeline_ || !appsrc_ || !appsink_ || !convert || !encoder || !parser) {
    RCLCPP_FATAL(this->get_logger(), "GStreamer element creation failed");
    return;
  }

  GstCaps *caps = gst_caps_new_simple(
    "video/x-raw",
    "format", G_TYPE_STRING, "BGR",
    "width", G_TYPE_INT, param_output_size_,
    "height", G_TYPE_INT, param_output_size_,
    "framerate", GST_TYPE_FRACTION, param_output_fps_, 1,
    nullptr);
  g_object_set(G_OBJECT(appsrc_),
    "caps", caps,
    "stream-type", 0,
    "format", GST_FORMAT_TIME,
    "is-live", TRUE,
    "do-timestamp", TRUE,
    nullptr);
  gst_caps_unref(caps);

  const bool low_bitrate_mode = (param_target_bitrate_ <= 80);
  const int key_int = std::max(8 * param_output_fps_, 30);
  const int default_speed_preset = low_bitrate_mode ? 9 : 3;  // veryslow / veryfast
  int speed_preset = default_speed_preset;
  std::string preset_lower = param_x264_preset_;
  std::transform(
    preset_lower.begin(), preset_lower.end(), preset_lower.begin(),
    [](unsigned char c) { return static_cast<char>(std::tolower(c)); });

  if (!preset_lower.empty() && preset_lower != "auto") {
    if (preset_lower == "ultrafast") speed_preset = 1;
    else if (preset_lower == "superfast") speed_preset = 2;
    else if (preset_lower == "veryfast") speed_preset = 3;
    else if (preset_lower == "faster") speed_preset = 4;
    else if (preset_lower == "fast") speed_preset = 5;
    else if (preset_lower == "medium") speed_preset = 6;
    else if (preset_lower == "slow") speed_preset = 7;
    else if (preset_lower == "slower") speed_preset = 8;
    else if (preset_lower == "veryslow") speed_preset = 9;
    else if (preset_lower == "placebo") speed_preset = 10;
    else {
      RCLCPP_WARN(
        this->get_logger(),
        "Unknown x264_preset='%s', fallback to auto default",
        param_x264_preset_.c_str());
      speed_preset = default_speed_preset;
    }
  }

  if (low_bitrate_mode) {
    g_object_set(
      G_OBJECT(encoder),
      "bitrate", param_target_bitrate_,
      "speed-preset", speed_preset,
      "tune", 0,                  // no tuning, favor efficiency
      "byte-stream", TRUE,
      "key-int-max", key_int,     // 减少 I 帧开销
      "bframes", 4,
      "rc-lookahead", 40,
      "sync-lookahead", 20,
      "sliced-threads", FALSE,
      "ref", 5,
      "aud", TRUE,
      "vbv-buf-capacity", 500,
      "option-string", "repeat-headers=1:scenecut=0:aq-mode=2:aq-strength=1.2:mbtree=1:qcomp=0.75:subme=8:trellis=2:deblock=1,1:force-cfr=1",
      "pass", 0,
      nullptr);
  } else {
    g_object_set(
      G_OBJECT(encoder),
      "bitrate", param_target_bitrate_,
      "speed-preset", speed_preset,
      "tune", 0x00000004,         // zerolatency
      "byte-stream", TRUE,
      "key-int-max", 2 * param_output_fps_,
      "bframes", 0,
      "rc-lookahead", 0,
      "sync-lookahead", 0,
      "sliced-threads", TRUE,
      "aud", TRUE,
      "option-string", "repeat-headers=1:scenecut=0:ref=1:force-cfr=1",
      "pass", 0,
      nullptr);
  }

  // 确保下游看到可流式重组的 Annex-B 字节流，并周期重复 SPS/PPS
  g_object_set(
    G_OBJECT(parser),
    "config-interval", -1,
    "disable-passthrough", TRUE,
    nullptr);

  GstCaps *h264_caps = gst_caps_new_simple(
    "video/x-h264",
    "stream-format", G_TYPE_STRING, "byte-stream",
    "alignment", G_TYPE_STRING, "au",
    nullptr);

  g_object_set(G_OBJECT(appsink_),
    "caps", h264_caps,
    "max-buffers", 5,
    "drop", FALSE,
    "emit-signals", FALSE,
    "sync", FALSE,
    nullptr);
  gst_caps_unref(h264_caps);

  gst_bin_add_many(GST_BIN(pipeline_), appsrc_, convert, encoder, parser, appsink_, nullptr);
  if (!gst_element_link_many(appsrc_, convert, encoder, parser, appsink_, nullptr)) {
    RCLCPP_FATAL(this->get_logger(), "GStreamer pipeline link failed");
    return;
  }

  GstStateChangeReturn ret = gst_element_set_state(pipeline_, GST_STATE_PLAYING);
  if (ret == GST_STATE_CHANGE_FAILURE) {
    RCLCPP_FATAL(this->get_logger(), "GStreamer pipeline start failed");
    return;
  }
  
  bus_ = gst_element_get_bus(pipeline_);
  RCLCPP_INFO(
    this->get_logger(),
    "GStreamer encoder ready (%s mode, byte-stream)",
    low_bitrate_mode ? "low-bitrate" : "low-latency");
}

void VideoEncoderNode::shutdown_gstreamer()
{
  if (pipeline_) {
    gst_element_set_state(pipeline_, GST_STATE_NULL);
    if (bus_) gst_object_unref(bus_);
    gst_object_unref(pipeline_);
    pipeline_ = nullptr;
  }
}

cv::Mat VideoEncoderNode::preprocess_image(
  const cv::Mat & input,
  cv::Mat * roi_downsample,
  cv::Mat * static_removed)
{
  int x = (input.cols - param_crop_size_) / 2;
  int y = (input.rows - param_crop_size_) / 2;
  x = std::max(0, x);
  y = std::max(0, y);
  int w = std::min(param_crop_size_, input.cols - x);
  int h = std::min(param_crop_size_, input.rows - y);

  cv::Mat cropped = input(cv::Rect(x, y, w, h));
  cv::Mat resized;
  cv::resize(cropped, resized, cv::Size(param_output_size_, param_output_size_), 
             0, 0, cv::INTER_LINEAR);
  if (roi_downsample) {
    resized.copyTo(*roi_downsample);
  }
  cv::Mat working = resized;
  if (param_force_monochrome_) {
    cv::Mat gray_full;
    cv::cvtColor(working, gray_full, cv::COLOR_BGR2GRAY);
    cv::cvtColor(gray_full, working, cv::COLOR_GRAY2BGR);
  }

  if (!param_static_simplify_) {
    if (static_removed) {
      working.copyTo(*static_removed);
    }
    return working;
  }

  cv::Mat gray;
  cv::cvtColor(working, gray, cv::COLOR_BGR2GRAY);
  if (background_gray_f32_.empty()) {
    gray.convertTo(background_gray_f32_, CV_32F);
    return working;
  }

  cv::Mat bg_u8;
  cv::convertScaleAbs(background_gray_f32_, bg_u8);

  cv::Mat diff;
  cv::absdiff(gray, bg_u8, diff);

  cv::Mat motion_mask;
  cv::threshold(diff, motion_mask, param_motion_threshold_, 255, cv::THRESH_BINARY);
  if (param_motion_erode_px_ > 0) {
    if (motion_erode_kernel_.empty()) {
      const int k = 2 * param_motion_erode_px_ + 1;
      motion_erode_kernel_ = cv::getStructuringElement(
        cv::MORPH_ELLIPSE, cv::Size(k, k));
    }
    cv::erode(motion_mask, motion_mask, motion_erode_kernel_, cv::Point(-1, -1), 1);
  }
  if (param_motion_dilate_px_ > 0) {
    if (motion_dilate_kernel_.empty()) {
      const int k = 2 * param_motion_dilate_px_ + 1;
      motion_dilate_kernel_ = cv::getStructuringElement(
        cv::MORPH_ELLIPSE, cv::Size(k, k));
    }
    cv::dilate(motion_mask, motion_mask, motion_dilate_kernel_, cv::Point(-1, -1), 1);
  }
  const double motion_ratio_raw =
    static_cast<double>(cv::countNonZero(motion_mask)) / static_cast<double>(motion_mask.total());
  const bool suppress_trail = (motion_ratio_raw >= param_trail_disable_motion_ratio_);

  // 中心区域保护：不做静态模糊
  if (param_center_clear_size_ > 0) {
    const int clear_size = std::min({param_center_clear_size_, working.cols, working.rows});
    const int x0 = std::max(0, working.cols / 2 - clear_size / 2);
    const int y0 = std::max(0, working.rows / 2 - clear_size / 2);
    const int cw = std::min(clear_size, working.cols - x0);
    const int ch = std::min(clear_size, working.rows - y0);
    cv::rectangle(motion_mask, cv::Rect(x0, y0, cw, ch), cv::Scalar(255), cv::FILLED);
  }

  cv::Mat static_base = working.clone();
  if (!param_force_monochrome_ && param_target_bitrate_ <= 80) {
    cv::Mat gray_bg;
    cv::cvtColor(static_base, gray_bg, cv::COLOR_BGR2GRAY);
    cv::cvtColor(gray_bg, static_base, cv::COLOR_GRAY2BGR);
  }
  cv::Mat blurred_static;
  cv::GaussianBlur(
    static_base,
    blurred_static,
    cv::Size(),
    std::max(0.0, param_bg_blur_sigma_),
    std::max(0.0, param_bg_blur_sigma_));

  cv::Mat focused = blurred_static.clone();
  working.copyTo(focused, motion_mask);
  if (static_removed) {
    focused.copyTo(*static_removed);
  }

  // 运动拖影：简单时域 max（当前+历史N帧），仅作用在运动区域联合掩码
  if (param_motion_trail_frames_ > 0) {
    motion_mask_history_.push_back(motion_mask.clone());
    trail_frame_history_.push_back(working.clone());
    const size_t max_history = static_cast<size_t>(param_motion_trail_frames_ + 1);
    while (motion_mask_history_.size() > max_history) {
      motion_mask_history_.pop_front();
    }
    while (trail_frame_history_.size() > max_history) {
      trail_frame_history_.pop_front();
    }

    const size_t history_size = motion_mask_history_.size();
    if (!suppress_trail && history_size > 1 && history_size == trail_frame_history_.size()) {
      cv::Mat trail_mask = motion_mask.clone();
      cv::Mat trail_img = working.clone();
      for (size_t i = 0; i < history_size - 1; ++i) {
        cv::bitwise_or(trail_mask, motion_mask_history_[i], trail_mask);
        cv::max(trail_img, trail_frame_history_[i], trail_img);
      }
      trail_img.copyTo(focused, trail_mask);
    }
  } else {
    motion_mask_history_.clear();
    trail_frame_history_.clear();
  }

  cv::accumulateWeighted(gray, background_gray_f32_, std::clamp(param_bg_update_alpha_, 0.001, 0.2));
  return focused;
}

void VideoEncoderNode::image_callback(const sensor_msgs::msg::Image::SharedPtr msg)
{
  try {
    if ((frame_count_ % 60) == 0) {
      write_sniper_alive();
    }

    // 仅在明确要求低于 60fps 时做抽帧；60fps 模式不主动丢帧
    if (param_output_fps_ < 60) {
      const int64_t stamp_ns = rclcpp::Time(msg->header.stamp).nanoseconds();
      const int64_t frame_interval_ns = 1000000000LL / std::max(param_output_fps_, 1);
      const int64_t now_ns = (stamp_ns > 0) ? stamp_ns : this->now().nanoseconds();
      if (last_encode_stamp_ns_ > 0 && (now_ns - last_encode_stamp_ns_) < frame_interval_ns) {
        return;
      }
      last_encode_stamp_ns_ = now_ns;
    }

    cv::Mat input = cv_bridge::toCvShare(msg, "bgr8")->image;
    cv::Mat roi_downsample;
    cv::Mat static_removed;
    cv::Mat processed = preprocess_image(input, &roi_downsample, &static_removed);
    
    if (param_enable_display_) {
      cv::Mat raw_preview;
      cv::resize(
        input,
        raw_preview,
        cv::Size(std::max(1, input.cols / 2), std::max(1, input.rows / 2)),
        0,
        0,
        cv::INTER_AREA);
      std::lock_guard<std::mutex> lock(frame_mutex_);
      raw_preview.copyTo(display_raw_frame_);
      roi_downsample.copyTo(display_roi_frame_);
      static_removed.copyTo(display_static_frame_);
      processed.copyTo(display_frame_);
    }
    
    push_frame_to_gstreamer(processed);
    pull_stream_and_packetize();
    
    frame_count_++;
    
  } catch (const cv_bridge::Exception & e) {
    RCLCPP_ERROR(this->get_logger(), "cv_bridge error: %s", e.what());
  }
}

void VideoEncoderNode::push_frame_to_gstreamer(const cv::Mat & frame)
{
  if (!appsrc_ || frame.empty()) return;

  size_t size = frame.total() * frame.elemSize();
  GstBuffer *buffer = gst_buffer_new_allocate(nullptr, size, nullptr);
  
  GstMapInfo map;
  if (gst_buffer_map(buffer, &map, GST_MAP_WRITE)) {
    memcpy(map.data, frame.data, size);
    gst_buffer_unmap(buffer, &map);
    
    GstFlowReturn ret;
    g_signal_emit_by_name(appsrc_, "push-buffer", buffer, &ret);
    if (ret != GST_FLOW_OK) {
      RCLCPP_WARN(this->get_logger(), "Push buffer failed: %d", ret);
    }
  }
  gst_buffer_unref(buffer);
}

// 296B 分包 + 带宽窗口限速 + 队列时延上限
void VideoEncoderNode::pull_stream_and_packetize()
{
  if (!appsink_) return;

  const size_t packet_bytes = static_cast<size_t>(param_packet_size_);
  const int64_t window_ns = static_cast<int64_t>(param_bandwidth_window_s_ * 1e9);
  const size_t window_limit_bytes = static_cast<size_t>(
    param_bandwidth_limit_kbytes_ * 1000.0 * param_bandwidth_window_s_);
  const size_t max_backlog_bytes = static_cast<size_t>(
    param_bandwidth_limit_kbytes_ * 1000.0 * param_max_tx_delay_s_);

  while (true) {
    GstSample *sample = gst_app_sink_try_pull_sample(GST_APP_SINK(appsink_), 0);
    if (!sample) break;

    GstBuffer *buffer = gst_sample_get_buffer(sample);
    if (!buffer) {
      gst_sample_unref(sample);
      continue;
    }

    GstMapInfo map;
    if (gst_buffer_map(buffer, &map, GST_MAP_READ)) {
      std::lock_guard<std::mutex> lock(buffer_mutex_);

      // 追加到流缓冲区
      size_t old_size = stream_buffer_.size();
      stream_buffer_.resize(old_size + map.size);
      memcpy(stream_buffer_.data() + old_size, map.data, map.size);

      // 2秒滑动窗口硬限速：任何窗口内总字节不超过 window_limit_bytes
      while (stream_buffer_.size() >= packet_bytes) {
        const int64_t now_ns = this->now().nanoseconds();
        while (!sent_window_.empty() && (now_ns - sent_window_.front().first) > window_ns) {
          sent_window_bytes_ -= sent_window_.front().second;
          sent_window_.pop_front();
        }

        if (sent_window_bytes_ + packet_bytes > window_limit_bytes) {
          break;
        }

        doorlock_sniper::msg::VideoPacket pkt;
        pkt.sequence_id = packet_sequence_id_++;
        pkt.timestamp_ns = now_ns;

        pkt.data.fill(0);
        memcpy(pkt.data.data(), stream_buffer_.data(), packet_bytes);

        packet_pub_->publish(pkt);
        if (!send_serial_packet(pkt)) {
          RCLCPP_WARN_THROTTLE(
            this->get_logger(), *this->get_clock(), 2000,
            "Serial send failed on %s", param_serial_port_.c_str());
        }
        sent_window_.emplace_back(now_ns, packet_bytes);
        sent_window_bytes_ += packet_bytes;

        memmove(stream_buffer_.data(),
          stream_buffer_.data() + packet_bytes,
          stream_buffer_.size() - packet_bytes);
        stream_buffer_.resize(stream_buffer_.size() - packet_bytes);
      }

      // 排队时延上限：防止突发造成长延时。超限时丢弃旧数据。
      if (stream_buffer_.size() > max_backlog_bytes) {
        const size_t target_drop = stream_buffer_.size() - max_backlog_bytes;
        size_t drop_bytes = target_drop;

        // 尽量对齐到下一个 Annex-B 起始码，减少解码错误持续时间
        for (size_t i = target_drop; i + 4 < stream_buffer_.size(); ++i) {
          const bool start_code_3 = (stream_buffer_[i] == 0 && stream_buffer_[i + 1] == 0 &&
                                     stream_buffer_[i + 2] == 1);
          const bool start_code_4 = (stream_buffer_[i] == 0 && stream_buffer_[i + 1] == 0 &&
                                     stream_buffer_[i + 2] == 0 && stream_buffer_[i + 3] == 1);
          if (start_code_3 || start_code_4) {
            drop_bytes = i;
            break;
          }
        }

        memmove(
          stream_buffer_.data(), stream_buffer_.data() + drop_bytes, stream_buffer_.size() - drop_bytes);
        stream_buffer_.resize(stream_buffer_.size() - drop_bytes);

        dropped_bytes_ += drop_bytes;
        dropped_events_++;
        if (dropped_events_ % 20 == 1) {
          RCLCPP_WARN(
            this->get_logger(),
            "TX backlog clipped: dropped=%zuB backlog=%zuB total_dropped=%luB events=%u",
            drop_bytes, stream_buffer_.size(), dropped_bytes_, dropped_events_);
        }
      }

      const int64_t telemetry_ns = this->now().nanoseconds();
      if (telemetry_ns - last_telemetry_ns_ > 1000000000LL) {
        // Keep cadence bookkeeping but suppress periodic TX stats INFO logs
        // to make serial CRC debug output easier to inspect.
        last_telemetry_ns_ = telemetry_ns;
      }

      gst_buffer_unmap(buffer, &map);
    }
    gst_sample_unref(sample);
  }
}

void VideoEncoderNode::display_loop()
{
  cv::namedWindow("Doorlock Sniper Raw", cv::WINDOW_NORMAL);
  cv::namedWindow("Doorlock Sniper ROI", cv::WINDOW_NORMAL);
  cv::namedWindow("Doorlock Sniper Static", cv::WINDOW_NORMAL);
  cv::namedWindow("Doorlock Sniper", cv::WINDOW_NORMAL);
  cv::setWindowProperty("Doorlock Sniper Raw", cv::WND_PROP_ASPECT_RATIO, cv::WINDOW_KEEPRATIO);
  cv::resizeWindow("Doorlock Sniper ROI", param_output_size_, param_output_size_);
  cv::resizeWindow("Doorlock Sniper Static", param_output_size_, param_output_size_);
  cv::resizeWindow("Doorlock Sniper", param_output_size_, param_output_size_);
  
  while (display_running_ && rclcpp::ok()) {
    cv::Mat raw_frame;
    cv::Mat roi_frame;
    cv::Mat static_frame;
    cv::Mat frame;
    {
      std::lock_guard<std::mutex> lock(frame_mutex_);
      if (!display_raw_frame_.empty()) {
        display_raw_frame_.copyTo(raw_frame);
      }
      if (!display_roi_frame_.empty()) {
        display_roi_frame_.copyTo(roi_frame);
      }
      if (!display_static_frame_.empty()) {
        display_static_frame_.copyTo(static_frame);
      }
      if (!display_frame_.empty()) {
        display_frame_.copyTo(frame);
      }
    }
    
    if (!raw_frame.empty()) {
      cv::imshow("Doorlock Sniper Raw", raw_frame);
    }
    if (!roi_frame.empty()) {
      cv::imshow("Doorlock Sniper ROI", roi_frame);
    }
    if (!static_frame.empty()) {
      cv::imshow("Doorlock Sniper Static", static_frame);
    }
    if (!frame.empty()) {
      cv::imshow("Doorlock Sniper", frame);
    }
    if (param_debug_dump_enable_ && !frame.empty()) {
      display_frame_counter_++;
      if ((display_frame_counter_ % static_cast<uint64_t>(param_debug_dump_every_n_frames_)) == 0U) {
        const std::filesystem::path dump_dir = std::filesystem::path(param_debug_dump_dir_) / "encoder";
        std::ostringstream idx;
        idx << std::setw(8) << std::setfill('0') << display_frame_counter_;
        const std::string frame_id = idx.str();
        if (param_debug_dump_save_raw_ && !raw_frame.empty()) {
          cv::imwrite((dump_dir / ("raw_" + frame_id + ".png")).string(), raw_frame);
        }
        if (param_debug_dump_save_roi_ && !roi_frame.empty()) {
          cv::imwrite((dump_dir / ("roi_" + frame_id + ".png")).string(), roi_frame);
        }
        if (param_debug_dump_save_static_ && !static_frame.empty()) {
          cv::imwrite((dump_dir / ("static_" + frame_id + ".png")).string(), static_frame);
        }
        if (param_debug_dump_save_final_) {
          cv::imwrite((dump_dir / ("final_" + frame_id + ".png")).string(), frame);
        }
      }
    }
    cv::waitKey(1);
    
    std::this_thread::sleep_for(std::chrono::milliseconds(16));
  }
  
  cv::destroyWindow("Doorlock Sniper Raw");
  cv::destroyWindow("Doorlock Sniper ROI");
  cv::destroyWindow("Doorlock Sniper Static");
  cv::destroyWindow("Doorlock Sniper");
}

} // namespace doorlock_sniper

RCLCPP_COMPONENTS_REGISTER_NODE(doorlock_sniper::VideoEncoderNode)
