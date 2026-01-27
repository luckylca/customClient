import dgram from 'dgram';
import { BrowserWindow } from 'electron';

interface FrameCache {
    receivedSize: number;
    totalSize: number;
    slices: Buffer[];
    // 新增：用于记录已收到的分片索引，防止UDP重发导致的重复累加
    receivedSliceIndices: Set<number>;
    // 新增：最后更新时间，用于超时清理
    lastUpdateTime: number;
}

export class VideoHandler {
    private server = dgram.createSocket('udp4');
    private frameBuffer = new Map<number, FrameCache>();
    private win: BrowserWindow | null = null;

    // 配置常量
    private readonly PORT = 3334;
    private readonly GC_INTERVAL = 2000; // 每2秒清理一次过期帧
    private readonly FRAME_TIMEOUT = 1000; // 超过1秒未组装完成的帧视为过期

    constructor(window: BrowserWindow) {
        this.win = window;
        this.initUDP();
        this.startGarbageCollector(); // 启动垃圾回收
    }

    private initUDP() {
        this.server.on('message', (msg) => {
            if (msg.length < 8) {
                // console.warn(`[VideoHandler] Invalid packet length: ${msg.length}`);
                return;
            }

            try {
                // 1. 解析协议头
                const frameSeq = msg.readUInt16BE(0);      // 帧编号
                const sliceIndex = msg.readUInt16BE(2);    // 分片序号
                const totalByteSize = msg.readUInt32BE(4); // 帧总大小
                const rawData = msg.subarray(8);           // 视频数据

                // 2. 初始化帧缓存
                if (!this.frameBuffer.has(frameSeq)) {
                    this.frameBuffer.set(frameSeq, {
                        receivedSize: 0,
                        totalSize: totalByteSize,
                        slices: [], // 初始化空数组
                        receivedSliceIndices: new Set(),
                        lastUpdateTime: Date.now()
                    });
                }

                const currentFrame = this.frameBuffer.get(frameSeq)!;
                currentFrame.lastUpdateTime = Date.now(); // 更新活跃时间

                // 3. 关键改进：去重处理
                // 如果这个分片已经收到过，直接忽略（防止 receivedSize 错误累加）
                if (currentFrame.receivedSliceIndices.has(sliceIndex)) {
                    return;
                }

                // 4. 存入数据
                // 注意：UDP乱序可能导致 currentFrame.slices[5] 有值但 [0-4] 为 undefined
                currentFrame.slices[sliceIndex] = rawData;
                currentFrame.receivedSliceIndices.add(sliceIndex);
                currentFrame.receivedSize += rawData.length;

                // 5. 检查是否组装完成
                if (currentFrame.receivedSize >= currentFrame.totalSize) {
                    this.assembleAndSend(frameSeq, currentFrame);
                }

            } catch (err) {
                console.error(`[VideoHandler] Process Error:`, err);
            }
        });

        this.server.on('error', (err) => {
            console.error('[VideoHandler] UDP Error:', err);
            this.server.close();
        });

        this.server.on('listening', () => {
            const address = this.server.address();
            console.log(`[VideoHandler] UDP Listening on ${address.address}:${address.port}`);
        });

        this.server.bind(this.PORT, '0.0.0.0');
    }

    /**
     * 组装并发送帧数据
     */
    private assembleAndSend(frameSeq: number, frame: FrameCache) {
        try {
            // 修复核心问题：
            // 数组中可能存在 undefined (因为乱序或数组扩容机制)，必须过滤
            const validSlices = frame.slices.filter(Boolean); // 过滤掉 null/undefined

            // 双重检查：确保过滤后的数据确实存在
            if (validSlices.length > 0) {
                const completeFrame = Buffer.concat(validSlices);

                // 发送给渲染进程
                if (this.win && !this.win.isDestroyed()) {
                    // 使用 send 而不是 sendSync，避免阻塞主进程
                    this.win.webContents.send('video-frame', completeFrame);
                }
            }
        } catch (error) {
            console.error(`[VideoHandler] Assembly failed for frame ${frameSeq}:`, error);
        } finally {
            // 无论成功失败，只要触发了组装逻辑，就应该清理内存
            this.frameBuffer.delete(frameSeq);
        }
    }

    /**
     * 垃圾回收机制：清理因丢包导致永远无法完成组装的帧
     */
    private startGarbageCollector() {
        setInterval(() => {
            const now = Date.now();
            // 遍历 Map，使用 for...of 提高性能
            for (const [seq, frame] of this.frameBuffer) {
                if (now - frame.lastUpdateTime > this.FRAME_TIMEOUT) {
                    // console.log(`[VideoHandler] Dropping stale frame #${seq} (Incomplete)`);
                    this.frameBuffer.delete(seq);
                }
            }
        }, this.GC_INTERVAL);
    }

    public close() {
        try {
            this.server.close();
        } catch (e) {
            // 忽略关闭时的错误
        }
    }
}