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

    constructor(onMessageCallback?: (topic: string, data: unknown) => void) {
        console.log('Initializing MQTT Service...');
        this.onMessageCallback = onMessageCallback;
    }

    public connect(clientId?: string): void {
        this.disconnect();

        this.clientIdCandidates = this.buildClientIdCandidates(clientId);
        this.candidateIndex = 0;
        this.shouldReconnect = true;
        this.connectWithCurrentCandidate();
    }

    private connectWithCurrentCandidate(): void {
        const candidateClientId = this.clientIdCandidates[this.candidateIndex];
        const connectUrl = `mqtt://${this.host}:${this.port}`;
        console.log(
            `[MQTT] Connecting to ${connectUrl} with clientId=${candidateClientId || 'mqttjs-default'}, local=${this.localAddress}, auth=${this.username ? 'username-password' : 'none'}`,
        );

        const connectOptions: mqtt.IClientOptions = {
            clean: true,
            protocolVersion: 4,
            connectTimeout: 4000,
            reconnectPeriod: this.shouldReconnect ? 1000 : 0,
            ...(candidateClientId ? { clientId: candidateClientId } : {}),
            ...(this.username ? { username: this.username } : {}),
            ...(this.password ? { password: this.password } : {}),
        };

        (connectOptions as any).localAddress = this.localAddress;
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
        });

        this.client.on('message', (topic, payload) => {
            this.handleMessage(topic, payload);
        });
    }

    private isIdentifierRejected(error: unknown): boolean {
        const anyErr = error as any;
        return anyErr?.code === 2 || anyErr?.reasonCode === 2;
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
            }
        });
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
