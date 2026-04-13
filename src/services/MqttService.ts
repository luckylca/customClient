import mqtt from 'mqtt';
import * as rm from '../proto/rm_pb';

export class MqttService {
    private client: mqtt.MqttClient | null = null;
    private readonly host: string = '192.168.12.1';
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
        process.env.MQTT_DEBUG_TOPICS || 'CustomByteBlock,RobotStaticStatus'
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
            'RuneStatusSync', 'SentinelStatusSync', 'DartSelectTargetStatusSync',
            'GuardCtrlResult', 'AirSupportStatusSync'
        ];

        this.client.subscribe(topics,{qos: 1}, (err) => {
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

    private logDebugTopic(topic: string, data: unknown): void {
        if (!this.shouldLogDebugTopic(topic)) return;

        const now = Date.now();
        const last = this.lastDebugLogAtByTopic[topic] || 0;
        if (now - last < this.debugTopicLogIntervalMs) return;
        this.lastDebugLogAtByTopic[topic] = now;

        if (topic === 'CustomByteBlock') {
            const bytes = this.decodeDebugBytes((data as any)?.data);
            if (!bytes) {
                console.log(`[MQTT][DEBUG] topic=${topic} payload has no decodable bytes`);
                return;
            }
            const header = bytes.length > 0 ? `0x${bytes[0].toString(16).padStart(2, '0').toUpperCase()}` : '-';
            const sequence = bytes.length > 1 ? bytes[1] : '-';
            console.log(
                `[MQTT][DEBUG] topic=${topic} len=${bytes.length} header=${header} seq=${sequence}\n${this.hexPreview(bytes, 64)}`,
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
            // Map topic to message type
            // Note: This relies on the convention that Topic Name = Message Type Name
            const messageType = (rm.rm as any)[topic];

            if (messageType) {
                const message = messageType.decode(payload);
                const object = messageType.toObject(message, {
                    longs: Number,
                    enums: String,
                    bytes: String,
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
