// videoHandler.ts
import dgram from 'dgram';
import { BrowserWindow } from 'electron';

interface FrameCache {
    receivedSize: number;
    totalSize: number;
    slices: Buffer[];
}

export class VideoHandler {
    private server = dgram.createSocket('udp4');
    private frameBuffer = new Map<number, FrameCache>();
    private win: BrowserWindow | null = null;

    constructor(window: BrowserWindow) {
        this.win = window;
        this.initUDP();
    }

    private initUDP() {
        this.server.on('message', (msg) => {
            if (msg.length < 8) {
                console.warn(`[VideoHandler] Received invalid packet with length ${msg.length}`);
                return;
            }

            // 1. 解析 8 字节协议头 [cite: 551]
            const frameSeq = msg.readUInt16BE(0);      // 帧编号 (2 bytes) [cite: 552]
            const sliceIndex = msg.readUInt16BE(2);    // 分片序号 (2 bytes) [cite: 553]
            const totalByteSize = msg.readUInt32BE(4); // 当前帧总字节数 (4 bytes) [cite: 554]
            const rawData = msg.subarray(8);           // 实际的 HEVC 码流数据

            // Debug log every 100 packets to reduce noise but verify flow
            if (frameSeq % 100 === 0 && sliceIndex === 0) {
                console.log(`[VideoHandler] Received Frame #${frameSeq}, totalSize=${totalByteSize}`);
            }

            // 2. 组包逻辑
            if (!this.frameBuffer.has(frameSeq)) {
                this.frameBuffer.set(frameSeq, {
                    receivedSize: 0,
                    totalSize: totalByteSize,
                    slices: []
                });
            }

            const currentFrame = this.frameBuffer.get(frameSeq)!;
            currentFrame.slices[sliceIndex] = rawData;
            currentFrame.receivedSize += rawData.length;

            // 3. 检查帧是否组装完成
            if (currentFrame.receivedSize === currentFrame.totalSize) {
                const completeFrame = Buffer.concat(currentFrame.slices);

                // 发送给渲染进程 (Vue)
                if (this.win && !this.win.isDestroyed()) {
                    this.win.webContents.send('video-frame', completeFrame);
                }

                // 清理旧缓存，防止内存泄漏
                this.frameBuffer.delete(frameSeq);

                // 限制 Map 大小，防止因为丢包导致的内存堆积
                if (this.frameBuffer.size > 10) {
                    const firstKey = this.frameBuffer.keys().next().value;
                    if (firstKey !== undefined) this.frameBuffer.delete(firstKey);
                }
            }
        });

        this.server.on('error', (err) => {
            console.error('UDP Error:', err);
        });

        this.server.on('listening', () => {
            const address = this.server.address();
            console.log(`[VideoHandler] UDP Server listening on ${address.address}:${address.port}`);
        });

        this.server.bind(3334, '0.0.0.0'); // 监听所有网卡
    }

    public close() {
        this.server.close();
    }
}