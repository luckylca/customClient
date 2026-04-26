cmake_minimum_required(VERSION 3.8)
project(hik_camera)

if(NOT CMAKE_CXX_STANDARD)
  set(CMAKE_CXX_STANDARD 17)
endif()

# =======================================

find_package(OpenCV 4 REQUIRED COMPONENTS core imgproc)
find_package(ament_cmake_auto REQUIRED)
ament_auto_find_build_dependencies()

# =======================================

# # 声明消息文件
# rosidl_generate_interfaces(${PROJECT_NAME}
#   "msg/SensorData.msg"
#   "msg/SensorDataArray.msg"
#   DEPENDENCIES std_msgs
# )

# =======================================

include_directories(
  include
  /opt/MVS/include # Install Hik MVS if this directory is missing
  ${OpenCV_INCLUDE_DIRS}
)

set(MVS_LIB_SEARCH_DIRS
  /opt/MVS/lib/64
  /opt/MVS/lib/aarch64
)

function(find_mvs_shared_lib out_var base_name)
  set(_candidates)
  foreach(_dir IN LISTS MVS_LIB_SEARCH_DIRS)
    file(GLOB _matches
      "${_dir}/lib${base_name}.so"
      "${_dir}/lib${base_name}.so.*"
    )
    list(APPEND _candidates ${_matches})
  endforeach()

  list(LENGTH _candidates _count)
  if(_count EQUAL 0)
    message(FATAL_ERROR
      "Cannot find MVS shared library lib${base_name}.so[.*] under /opt/MVS/lib/64 or /opt/MVS/lib/aarch64")
  endif()

  list(SORT _candidates)
  list(GET _candidates 0 _picked)
  set(${out_var} "${_picked}" PARENT_SCOPE)
endfunction()

find_mvs_shared_lib(MVS_LIB_FORMAT_CONVERSION FormatConversion)
find_mvs_shared_lib(MVS_LIB_MEDIA_PROCESS MediaProcess)
find_mvs_shared_lib(MVS_LIB_CAMERA_CONTROL MvCameraControl)
find_mvs_shared_lib(MVS_LIB_RENDER MVRender)
find_mvs_shared_lib(MVS_LIB_USB3VTL MvUsb3vTL)

add_library(hik_camera_component SHARED src/hik_camera_node.cpp)

# 链接Hik SDK
set_target_properties(hik_camera_component PROPERTIES
  BUILD_RPATH "/opt/MVS/lib/64;/opt/MVS/lib/aarch64"
  INSTALL_RPATH "/opt/MVS/lib/64;/opt/MVS/lib/aarch64"
)

target_link_libraries(hik_camera_component PUBLIC
  rclcpp::rclcpp
  rclcpp_components::component
  sensor_msgs::sensor_msgs_library
  image_transport::image_transport
  camera_info_manager::camera_info_manager
  ${OpenCV_LIBRARIES}
  
  # 海康SDK
  ${MVS_LIB_FORMAT_CONVERSION}
  ${MVS_LIB_MEDIA_PROCESS}
  ${MVS_LIB_CAMERA_CONTROL}
  ${MVS_LIB_RENDER}
  ${MVS_LIB_USB3VTL}
)
# =======================================

# rosidl_target_interfaces(hik_camera_component ${PROJECT_NAME} "rosidl_typesupport_cpp")
rclcpp_components_register_nodes(hik_camera_component "hik_camera::HikCameraNode")
# 安装共享库到lib目录
install(TARGETS
  hik_camera_component
  ARCHIVE DESTINATION lib
  LIBRARY DESTINATION lib
  RUNTIME DESTINATION bin
)

# 安装config目录
# 安装配置文件
install(DIRECTORY
  config
  DESTINATION share/${PROJECT_NAME}
)

# =======================================

# 导出依赖
ament_export_dependencies(
  rclcpp
  rclcpp_components
  sensor_msgs
)

ament_package()