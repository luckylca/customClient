import mqtt from 'mqtt';
import * as rm from '../proto/rm_pb.js';
import * as fs from 'fs';
import type { CustomByteBlock, CustomByteBlockFrameMeta } from '../types/rmType';

export class MqttService {
    private readonly customByteBlockFrameSize = 300;
    private readonly customByteBlockHeader0 = 0xA8;
    private readonly customByteBlockHeader1 = 0xA7;
    private readonly customByteBlockSequenceLength = 2;
    private readonly customByteBlockVideoLength = 270;
    private readonly customByteBlockReservedLength = 24;
    private readonly customByteBlockVideoOffset = 2 + this.customByteBlockSequenceLength;
    private readonly customByteBlockReservedOffset = this.customByteBlockVideoOffset + this.customByteBlockVideoLength;
    private readonly customByteBlockCrcOffset = this.customByteBlockReservedOffset + this.customByteBlockReservedLength;
    private client: mqtt.MqttClient | null = null;
    private readonly host: string = '192.168.12.1';
    // private readonly host: string = '127.0.0.1';
    private readonly port: number = 3333;
    private readonly localAddress: string = process.env.MQTT_LOCAL_ADDRESS || '192.168.12.2';
    private readonly username: string | undefined = process.env.MQTT_USERNAME || undefined;
    private readonly password: string | undefined = process.env.MQTT_PASSWORD || undefined;
    private onMessageCallback?: (topic: string, data: unknown) => void;
    private clientIdCandidates: string[] = [];
    private candidateIndex = 0;
    private shouldReconnect = true;
    private bindLocalAddress = true;
    private readonly debugTopics: string[] = (
        process.env.MQTT_DEBUG_TOPICS || 'CustomByteBlock,GlobalUnitStatus'
    )
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    private readonly debugTopicSet = new Set(this.debugTopics);
    private readonly debugTopicLogIntervalMs = 500;
    private lastDebugLogAtByTopic: Record<string, number> = {};

    constructor(onMessageCallback?: (topic: string, data: unknown) => void) {
        console.log('Initializing MQTT Service...');
        this.onMessageCallback = onMessageCallback;
    }

    public connect(clientId?: string): void {
        this.disconnect();

        this.clientIdCandidates = this.buildClientIdCandidates(clientId);
        this.candidateIndex = 0;
        this.shouldReconnect = true;
        this.bindLocalAddress = true;
        this.connectWithCurrentCandidate();
    }

    private connectWithCurrentCandidate(): void {
        const candidateClientId = this.clientIdCandidates[this.candidateIndex];
        const connectUrl = `mqtt://${this.host}:${this.port}`;
        console.log(
            `[MQTT] Connecting to ${connectUrl} with clientId=${candidateClientId || 'mqttjs-default'}, local=${this.bindLocalAddress ? this.localAddress : '(auto)'}, auth=${this.username ? 'username-password' : 'none'}`,
        );

        const connectOptions: mqtt.IClientOptions = {
            clean: true,
            protocolVersion: 4,
            connectTimeout: 10000,
            reconnectPeriod: this.shouldReconnect ? 1000 : 0,
            ...(candidateClientId ? { clientId: candidateClientId } : {}),
            ...(this.username ? { username: this.username } : {}),
            ...(this.password ? { password: this.password } : {}),
        };

        if (this.bindLocalAddress) {
            (connectOptions as any).localAddress = this.localAddress;
        }
        this.client = mqtt.connect(connectUrl, connectOptions as any);

        this.client.on('connect', () => {
            console.log('Connected to MQTT broker');
            // Subscribe to all relevant topics
            this.subscribeToAllTopics();
        });

        this.client.on('error', (error) => {
            if ((error as any)?.code === 'EADDRNOTAVAIL') {
                console.error(
                    `[MQTT] Local address ${this.localAddress} is unavailable. Please configure your NIC to 192.168.12.2 or set MQTT_LOCAL_ADDRESS.`,
                );
                return;
            }
            if (this.isConnackTimeout(error) && this.bindLocalAddress) {
                console.warn(
                    `[MQTT] connack timeout with localAddress=${this.localAddress}, retrying with auto-selected local interface.`,
                );
                this.bindLocalAddress = false;
                this.disconnect();
                this.connectWithCurrentCandidate();
                return;
            }
            if (this.isIdentifierRejected(error)) {
                if (this.tryNextClientIdCandidate()) {
                    return;
                }

                // 所有候选都被拒绝后，停止自动重连，避免刷屏。
                this.shouldReconnect = false;
                console.error(
                    `[MQTT] All clientId candidates rejected: ${this.clientIdCandidates.join(', ') || '(none)'}; current=${candidateClientId || 'mqttjs-default'}`,
                );
                this.disconnect();
                return;
            }
            console.error('MQTT connection error:', error);
            if (this.isConnackTimeout(error)) {
                console.error(
                    `[MQTT] connack timeout diagnostics: check broker ${this.host}:${this.port} reachability, ACL/clientId policy, and that robot is in the same subnet.`,
                );
            }
        });

        this.client.on('message', (topic, payload) => {
            this.handleMessage(topic, payload);
        });
    }

    private isIdentifierRejected(error: unknown): boolean {
        const anyErr = error as any;
        return anyErr?.code === 2 || anyErr?.reasonCode === 2;
    }

    private isConnackTimeout(error: unknown): boolean {
        const anyErr = error as any;
        const msg = String(anyErr?.message || '').toLowerCase();
        return msg.includes('connack timeout');
    }

    private tryNextClientIdCandidate(): boolean {
        if (this.candidateIndex >= this.clientIdCandidates.length - 1) {
            return false;
        }

        this.candidateIndex += 1;
        const nextId = this.clientIdCandidates[this.candidateIndex];
        console.warn(`[MQTT] Broker rejected identifier, retry with clientId=${nextId}`);
        this.disconnect();
        this.connectWithCurrentCandidate();
        return true;
    }

    private buildClientIdCandidates(input?: string): string[] {
        const envCandidates = (process.env.MQTT_CLIENT_IDS || '')
            .split(',')
            .map((x) => x.trim())
            .filter(Boolean);

        if (envCandidates.length > 0) {
            return [...new Set(envCandidates)];
        }

        const candidates: string[] = [];
        const id = (input || process.env.MQTT_CLIENT_ID || '').trim();

        if (!id) {
            return candidates;
        }

        const pushUnique = (value: string) => {
            if (!value) return;
            if (!candidates.includes(value)) {
                candidates.push(value);
            }
        };

        pushUnique(id);

        const hexMatch = id.match(/^0x([0-9a-fA-F]+)$/);
        if (hexMatch) {
            const hexBody = hexMatch[1];
            pushUnique(hexBody);

            const asNumber = Number.parseInt(hexBody, 16);
            if (Number.isFinite(asNumber)) {
                pushUnique(String(asNumber));
            }
        }

        const decimalMatch = id.match(/^\d+$/);
        if (decimalMatch) {
            const asNumber = Number.parseInt(id, 10);
            if (Number.isFinite(asNumber)) {
                const asHexBody = asNumber.toString(16).toUpperCase().padStart(4, '0');
                pushUnique(`0x${asHexBody}`);
                pushUnique(asHexBody);
            }
        }

        return candidates;
    }

    public isConnected(): boolean {
        return !!this.client?.connected;
    }

    public disconnect(): void {
        if (!this.client) return;

        this.client.end(true, () => {
            console.log('MQTT client disconnected');
        });
        this.client = null;
    }

    private lastLogTime = 0;
    public publish<T>(topic: string, message: any, messageType: any, qos: 0 | 1 | 2 = 0): void {
        if (!this.client || !this.client.connected) {
            const now = Date.now();
            if (now - this.lastLogTime > 5000) {
                console.warn('Cannot publish: MQTT client not connected (throttled log)');
                this.lastLogTime = now;
            }
            return;
        }

        try {
            // Verify message
            const errMsg = messageType.verify(message);
            if (errMsg) throw Error(errMsg);

            // Create message
            const msg = messageType.create(message);

            // Encode to Uint8Array and ensure it is a Buffer for MQTT library
            const encoded = messageType.encode(msg).finish();
            const buffer = Buffer.from(encoded);

            this.client.publish(topic, buffer, { qos }, (err) => {
                if (err) {
                    console.error(`Failed to publish to ${topic}:`, err);
                } else {
                    // console.log(`Published to ${topic} with QoS ${qos}`);
                }
            });
        } catch (e) {
            console.error(`Error publishing to ${topic}:`, e);
        }
    }

    private subscribeToAllTopics(): void {
        if (!this.client) return;

        // Subscribe to topics defined in the protocol
        // You might want to make this dynamic or list all topics involved
        const topics = [
            'KeyboardMouseControl', 'CustomControl',
            'GameStatus', 'GlobalUnitStatus', 'GlobalLogisticsStatus', 'GlobalSpecialMechanism',
            'Event', 'RobotInjuryStat', 'RobotRespawnStatus', 'RobotStaticStatus',
            'RobotDynamicStatus', 'RobotModuleStatus', 'RobotPosition', 'Buff',
            'PenaltyInfo', 'RobotPathPlanInfo', 'MapClickInfoNotify', 'RadarInfoToClient', 'CustomByteBlock',
            'AssemblyCommand',
            'TechCoreMotionStateSync', 'RobotPerformanceSelectionSync', 'DeployModeStatusSync',
            'RuneStatusSync', 'SentinelStatusSync', 'SentryStatusSync', 'DartSelectTargetStatusSync',
            'GuardCtrlResult', 'SentryCtrlResult', 'AirSupportStatusSync'
        ];

        this.client.subscribe(topics, { qos: 1 }, (err) => {
            if (err) {
                console.error('Subscription error:', err);
            } else {
                console.log(`Subscribed to ${topics.length} topics`);
                if (this.debugTopics.length > 0) {
                    console.log(`[MQTT][DEBUG] enabled topics: ${this.debugTopics.join(', ')}`);
                }
            }
        });
    }

    private shouldLogDebugTopic(topic: string): boolean {
        return this.debugTopicSet.has(topic);
    }

    private decodeDebugBytes(value: unknown): Uint8Array | null {
        if (!value) return null;
        if (value instanceof Uint8Array) return value;
        if (typeof value === 'string') {
            try {
                return new Uint8Array(Buffer.from(value, 'base64'));
            } catch {
                return null;
            }
        }
        if (Array.isArray(value)) {
            const allByte = value.every((item) => typeof item === 'number' && item >= 0 && item <= 255);
            return allByte ? new Uint8Array(value as number[]) : null;
        }
        if (typeof value === 'object' && value !== null) {
            const maybeBuffer = value as { type?: string; data?: unknown };
            if (maybeBuffer.type === 'Buffer' && Array.isArray(maybeBuffer.data)) {
                const allByte = maybeBuffer.data.every((item) => typeof item === 'number' && item >= 0 && item <= 255);
                return allByte ? new Uint8Array(maybeBuffer.data as number[]) : null;
            }
        }
        return null;
    }

    private hexPreview(bytes: Uint8Array, maxLen = 64): string {
        if (!bytes.length) return '-';
        const clipped = bytes.subarray(0, Math.min(maxLen, bytes.length));
        const hex = Array.from(clipped)
            .map((value) => value.toString(16).padStart(2, '0').toUpperCase())
            .join(' ');
        return bytes.length > maxLen ? `${hex} ...` : hex;
    }

    private parseCustomByteBlockFrame(bytes: Uint8Array): CustomByteBlockFrameMeta | null {
        if (bytes.length < this.customByteBlockFrameSize) return null;

        const maxStart = bytes.length - this.customByteBlockFrameSize;
        let frameStart = maxStart;

        for (let start = maxStart; start >= 0; start -= 1) {
            if (bytes[start] === this.customByteBlockHeader0 && bytes[start + 1] === this.customByteBlockHeader1) {
                frameStart = start;
                break;
            }
        }

        const frame = bytes.subarray(frameStart, frameStart + this.customByteBlockFrameSize);
        const headerValid = frame[0] === this.customByteBlockHeader0 && frame[1] === this.customByteBlockHeader1;
        const sequenceId = frame[2] | (frame[3] << 8);
        const videoData = frame.subarray(this.customByteBlockVideoOffset, this.customByteBlockVideoOffset + this.customByteBlockVideoLength);
        const sidebandData = frame.subarray(
            this.customByteBlockReservedOffset,
            this.customByteBlockReservedOffset + this.customByteBlockReservedLength,
        );
        const crc16 = frame.subarray(this.customByteBlockCrcOffset, this.customByteBlockCrcOffset + 2);

        return {
            frame,
            frameStart,
            sequenceId,
            videoData,
            sidebandData,
            crc16,
            headerValid,
        };
    }

    private buildCustomByteBlockObject(bytes: Uint8Array): CustomByteBlock {
        const parsed = this.parseCustomByteBlockFrame(bytes);
        const frameCount = Math.floor(bytes.length / this.customByteBlockFrameSize);
        return {
            data: bytes,
            rawLength: bytes.length,
            frameCount,
            trailingBytes: bytes.length - frameCount * this.customByteBlockFrameSize,
            lastFrame: parsed ?? undefined,
            sequenceId: parsed?.sequenceId,
            videoData: parsed?.videoData,
            sidebandData: parsed?.sidebandData,
            crc16: parsed?.crc16,
            headerValid: parsed?.headerValid ?? false,
        };
    }

    private decodeCustomByteBlockPayload(data: unknown): Uint8Array | null {
        return this.decodeDebugBytes((data as any)?.data) ?? this.decodeDebugBytes(data);
    }

    private toUint8Array(value: unknown): Uint8Array | null {
        if (!value) return null;
        if (value instanceof Uint8Array) return value;
        if (Array.isArray(value)) {
            const allByte = value.every((item) => typeof item === 'number' && item >= 0 && item <= 255);
            return allByte ? new Uint8Array(value as number[]) : null;
        }
        if (typeof value === 'object' && value !== null) {
            const maybeBuffer = value as { type?: string; data?: unknown };
            if (maybeBuffer.type === 'Buffer' && Array.isArray(maybeBuffer.data)) {
                const allByte = maybeBuffer.data.every((item) => typeof item === 'number' && item >= 0 && item <= 255);
                return allByte ? new Uint8Array(maybeBuffer.data as number[]) : null;
            }
        }
        return null;
    }

    private logDebugTopic(topic: string, data: unknown): void {
        if (!this.shouldLogDebugTopic(topic)) return;

        const now = Date.now();
        const last = this.lastDebugLogAtByTopic[topic] || 0;
        if (now - last < this.debugTopicLogIntervalMs) return;
        this.lastDebugLogAtByTopic[topic] = now;

        if (topic === 'CustomByteBlock') {
            const bytes = this.decodeCustomByteBlockPayload(data);
            if (!bytes) {
                console.log(`[MQTT][DEBUG] topic=${topic} payload has no decodable bytes`);
                return;
            }

            const object = this.buildCustomByteBlockObject(bytes);
            const parsed = object.lastFrame;
            const header0 = bytes.length > 0 ? `0x${bytes[0].toString(16).padStart(2, '0').toUpperCase()}` : '-';
            const header1 = bytes.length > 1 ? `0x${bytes[1].toString(16).padStart(2, '0').toUpperCase()}` : '-';

            if (!parsed) {
                console.log(
                    `[MQTT][DEBUG] topic=${topic} rawLen=${bytes.length} frameCount=${object.frameCount} trailing=${object.trailingBytes} header=[${header0}, ${header1}] frame=incomplete\n${this.hexPreview(bytes, 64)}`,
                );
                return;
            }

            console.log(
                `[MQTT][DEBUG] topic=${topic} rawLen=${bytes.length} frameCount=${object.frameCount} trailing=${object.trailingBytes} lastFrameStart=${parsed.frameStart} frameLen=${parsed.frame?.length || 0} sequence=${parsed.sequenceId} headerValid=${parsed.headerValid ? 'yes' : 'no'} videoLen=${parsed.videoData?.length || 0} reservedLen=${parsed.sidebandData?.length || 0} crc16=${this.hexPreview(parsed.crc16 || new Uint8Array(0), 2)}\nvideo=${this.hexPreview(parsed.videoData || new Uint8Array(0), 32)}\nreserved=${this.hexPreview(parsed.sidebandData || new Uint8Array(0), 24)}`,
            );
            return;
        }

        try {
            console.log(`[MQTT][DEBUG] topic=${topic} data=${JSON.stringify(data)}`);
        } catch {
            console.log(`[MQTT][DEBUG] topic=${topic} data=[unserializable]`);
        }
    }

    private handleMessage(topic: string, payload: Buffer): void {
        try {
            if (topic === 'CustomByteBlock') {
                const bytes = new Uint8Array(payload);
                
                if (process.env.DUMP_H264 === 'true' && bytes.length >= 300) {
                    try {
                        const frameCount = Math.floor(bytes.length / 300);
                        for (let i = 0; i < frameCount; i++) {
                            const start = bytes.length - frameCount * 300 + i * 300;
                            const header0 = bytes[start];
                            const header1 = bytes[start + 1];
                            if (header0 === 0xA8 && header1 === 0xA7) {
                                const videoPayload = bytes.subarray(start + 4, start + 274);
                                fs.appendFileSync('video_dump.h264', videoPayload);
                            }
                        }
                    } catch (err) {
                        console.error('Failed to dump video to video_dump.h264', err);
                    }
                }

                const object = this.buildCustomByteBlockObject(bytes);
                this.logDebugTopic(topic, object);
                if (this.onMessageCallback) {
                    // 传递原始字节数组，而不是解析后的对象，供图传组件使用
                    this.onMessageCallback(topic, object);
                }
                return;
            }

            // Map topic to message type
            // Note: This relies on the convention that Topic Name = Message Type Name
            const messageType = (rm.rm as any)[topic];

            if (messageType) {
                const message = messageType.decode(payload);

                const object = messageType.toObject(message, {
                    longs: Number,
                    enums: String,
                    bytes: Array,
                });
                this.logDebugTopic(topic, object);
                if (this.onMessageCallback) {
                    this.onMessageCallback(topic, object);
                }

            } else {
                console.warn(`Unknown topic/type: ${topic}`);
            }
        } catch (e) {
            console.error(`Error handling message from ${topic}:`, e);
        }
    }
}
