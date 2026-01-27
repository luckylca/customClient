import mqtt from 'mqtt';
import * as rm from '../proto/rm_pb';

export class MqttService {
    private client: mqtt.MqttClient | null = null;
    private readonly host: string = '127.0.0.1';
    private readonly port: number = 3333;
    private onMessageCallback?: (topic: string, data: unknown) => void;

    constructor(onMessageCallback?: (topic: string, data: unknown) => void) {
        console.log('Initializing MQTT Service...');
        this.onMessageCallback = onMessageCallback;
    }

    public connect(): void {
        const connectUrl = `mqtt://${this.host}:${this.port}`;
        console.log(`Connecting to MQTT broker at ${connectUrl}`);

        this.client = mqtt.connect(connectUrl, {
            clean: true,
            connectTimeout: 4000,
            reconnectPeriod: 1000,
        });

        this.client.on('connect', () => {
            console.log('Connected to MQTT broker');
            // Subscribe to all relevant topics
            this.subscribeToAllTopics();
        });

        this.client.on('error', (error) => {
            console.error('MQTT connection error:', error);
        });

        this.client.on('message', (topic, payload) => {
            this.handleMessage(topic, payload);
        });
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

            // Encode to Uint8Array
            const buffer = messageType.encode(msg).finish();

            this.client.publish(topic, buffer as Buffer, { qos }, (err) => {
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
            'GameStatus', 'GlobalUnitStatus', 'GlobalLogisticsStatus', 'GlobalSpecialMechanism',
            'Event', 'RobotInjuryStat', 'RobotRespawnStatus', 'RobotStaticStatus',
            'RobotDynamicStatus', 'RobotModuleStatus', 'RobotPosition', 'Buff',
            'PenaltyInfo', 'RobotPathPlanInfo', 'RaderInfoToClient', 'CustomByteBlock',
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
                console.log(`Received ${topic}:`, object);
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
