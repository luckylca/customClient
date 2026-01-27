import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace rm. */
export namespace rm {

    /** Properties of a RemoteControl. */
    interface IRemoteControl {

        /** RemoteControl mouseX */
        mouseX?: (number|null);

        /** RemoteControl mouseY */
        mouseY?: (number|null);

        /** RemoteControl mouseZ */
        mouseZ?: (number|null);

        /** RemoteControl leftButtonDown */
        leftButtonDown?: (boolean|null);

        /** RemoteControl rightButtonDown */
        rightButtonDown?: (boolean|null);

        /** RemoteControl keyboardValue */
        keyboardValue?: (number|null);

        /** RemoteControl midButtonDown */
        midButtonDown?: (boolean|null);

        /** RemoteControl data */
        data?: (Uint8Array|null);
    }

    /** Represents a RemoteControl. */
    class RemoteControl implements IRemoteControl {

        /**
         * Constructs a new RemoteControl.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IRemoteControl);

        /** RemoteControl mouseX. */
        public mouseX: number;

        /** RemoteControl mouseY. */
        public mouseY: number;

        /** RemoteControl mouseZ. */
        public mouseZ: number;

        /** RemoteControl leftButtonDown. */
        public leftButtonDown: boolean;

        /** RemoteControl rightButtonDown. */
        public rightButtonDown: boolean;

        /** RemoteControl keyboardValue. */
        public keyboardValue: number;

        /** RemoteControl midButtonDown. */
        public midButtonDown: boolean;

        /** RemoteControl data. */
        public data: Uint8Array;

        /**
         * Creates a new RemoteControl instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemoteControl instance
         */
        public static create(properties?: rm.IRemoteControl): rm.RemoteControl;

        /**
         * Encodes the specified RemoteControl message. Does not implicitly {@link rm.RemoteControl.verify|verify} messages.
         * @param message RemoteControl message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IRemoteControl, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemoteControl message, length delimited. Does not implicitly {@link rm.RemoteControl.verify|verify} messages.
         * @param message RemoteControl message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IRemoteControl, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemoteControl message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RemoteControl
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.RemoteControl;

        /**
         * Decodes a RemoteControl message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RemoteControl
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.RemoteControl;

        /**
         * Verifies a RemoteControl message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemoteControl message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemoteControl
         */
        public static fromObject(object: { [k: string]: any }): rm.RemoteControl;

        /**
         * Creates a plain object from a RemoteControl message. Also converts values to other types if specified.
         * @param message RemoteControl
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.RemoteControl, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemoteControl to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RemoteControl
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GameStatus. */
    interface IGameStatus {

        /** GameStatus currentRound */
        currentRound?: (number|null);

        /** GameStatus totalRounds */
        totalRounds?: (number|null);

        /** GameStatus redScore */
        redScore?: (number|null);

        /** GameStatus blueScore */
        blueScore?: (number|null);

        /** GameStatus currentStage */
        currentStage?: (number|null);

        /** GameStatus stageCountdownSec */
        stageCountdownSec?: (number|null);

        /** GameStatus stageElapsedSec */
        stageElapsedSec?: (number|null);

        /** GameStatus isPaused */
        isPaused?: (boolean|null);
    }

    /** Represents a GameStatus. */
    class GameStatus implements IGameStatus {

        /**
         * Constructs a new GameStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IGameStatus);

        /** GameStatus currentRound. */
        public currentRound: number;

        /** GameStatus totalRounds. */
        public totalRounds: number;

        /** GameStatus redScore. */
        public redScore: number;

        /** GameStatus blueScore. */
        public blueScore: number;

        /** GameStatus currentStage. */
        public currentStage: number;

        /** GameStatus stageCountdownSec. */
        public stageCountdownSec: number;

        /** GameStatus stageElapsedSec. */
        public stageElapsedSec: number;

        /** GameStatus isPaused. */
        public isPaused: boolean;

        /**
         * Creates a new GameStatus instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameStatus instance
         */
        public static create(properties?: rm.IGameStatus): rm.GameStatus;

        /**
         * Encodes the specified GameStatus message. Does not implicitly {@link rm.GameStatus.verify|verify} messages.
         * @param message GameStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IGameStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameStatus message, length delimited. Does not implicitly {@link rm.GameStatus.verify|verify} messages.
         * @param message GameStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IGameStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.GameStatus;

        /**
         * Decodes a GameStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.GameStatus;

        /**
         * Verifies a GameStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameStatus
         */
        public static fromObject(object: { [k: string]: any }): rm.GameStatus;

        /**
         * Creates a plain object from a GameStatus message. Also converts values to other types if specified.
         * @param message GameStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.GameStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GameStatus
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GlobalUnitStatus. */
    interface IGlobalUnitStatus {

        /** GlobalUnitStatus baseHealth */
        baseHealth?: (number|null);

        /** GlobalUnitStatus baseStatus */
        baseStatus?: (number|null);

        /** GlobalUnitStatus baseShield */
        baseShield?: (number|null);

        /** GlobalUnitStatus outpostHealth */
        outpostHealth?: (number|null);

        /** GlobalUnitStatus outpostStatus */
        outpostStatus?: (number|null);

        /** GlobalUnitStatus robotHealth */
        robotHealth?: (number[]|null);

        /** GlobalUnitStatus robotBullets */
        robotBullets?: (number[]|null);

        /** GlobalUnitStatus totalDamageRed */
        totalDamageRed?: (number|null);

        /** GlobalUnitStatus totalDamageBlue */
        totalDamageBlue?: (number|null);
    }

    /** Represents a GlobalUnitStatus. */
    class GlobalUnitStatus implements IGlobalUnitStatus {

        /**
         * Constructs a new GlobalUnitStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IGlobalUnitStatus);

        /** GlobalUnitStatus baseHealth. */
        public baseHealth: number;

        /** GlobalUnitStatus baseStatus. */
        public baseStatus: number;

        /** GlobalUnitStatus baseShield. */
        public baseShield: number;

        /** GlobalUnitStatus outpostHealth. */
        public outpostHealth: number;

        /** GlobalUnitStatus outpostStatus. */
        public outpostStatus: number;

        /** GlobalUnitStatus robotHealth. */
        public robotHealth: number[];

        /** GlobalUnitStatus robotBullets. */
        public robotBullets: number[];

        /** GlobalUnitStatus totalDamageRed. */
        public totalDamageRed: number;

        /** GlobalUnitStatus totalDamageBlue. */
        public totalDamageBlue: number;

        /**
         * Creates a new GlobalUnitStatus instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GlobalUnitStatus instance
         */
        public static create(properties?: rm.IGlobalUnitStatus): rm.GlobalUnitStatus;

        /**
         * Encodes the specified GlobalUnitStatus message. Does not implicitly {@link rm.GlobalUnitStatus.verify|verify} messages.
         * @param message GlobalUnitStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IGlobalUnitStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GlobalUnitStatus message, length delimited. Does not implicitly {@link rm.GlobalUnitStatus.verify|verify} messages.
         * @param message GlobalUnitStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IGlobalUnitStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GlobalUnitStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GlobalUnitStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.GlobalUnitStatus;

        /**
         * Decodes a GlobalUnitStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GlobalUnitStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.GlobalUnitStatus;

        /**
         * Verifies a GlobalUnitStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GlobalUnitStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GlobalUnitStatus
         */
        public static fromObject(object: { [k: string]: any }): rm.GlobalUnitStatus;

        /**
         * Creates a plain object from a GlobalUnitStatus message. Also converts values to other types if specified.
         * @param message GlobalUnitStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.GlobalUnitStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GlobalUnitStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GlobalUnitStatus
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GlobalLogisticsStatus. */
    interface IGlobalLogisticsStatus {

        /** GlobalLogisticsStatus remainingEconomy */
        remainingEconomy?: (number|null);

        /** GlobalLogisticsStatus totalEconomyObtained */
        totalEconomyObtained?: (number|Long|null);

        /** GlobalLogisticsStatus techLevel */
        techLevel?: (number|null);

        /** GlobalLogisticsStatus encryptionLevel */
        encryptionLevel?: (number|null);
    }

    /** Represents a GlobalLogisticsStatus. */
    class GlobalLogisticsStatus implements IGlobalLogisticsStatus {

        /**
         * Constructs a new GlobalLogisticsStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IGlobalLogisticsStatus);

        /** GlobalLogisticsStatus remainingEconomy. */
        public remainingEconomy: number;

        /** GlobalLogisticsStatus totalEconomyObtained. */
        public totalEconomyObtained: (number|Long);

        /** GlobalLogisticsStatus techLevel. */
        public techLevel: number;

        /** GlobalLogisticsStatus encryptionLevel. */
        public encryptionLevel: number;

        /**
         * Creates a new GlobalLogisticsStatus instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GlobalLogisticsStatus instance
         */
        public static create(properties?: rm.IGlobalLogisticsStatus): rm.GlobalLogisticsStatus;

        /**
         * Encodes the specified GlobalLogisticsStatus message. Does not implicitly {@link rm.GlobalLogisticsStatus.verify|verify} messages.
         * @param message GlobalLogisticsStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IGlobalLogisticsStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GlobalLogisticsStatus message, length delimited. Does not implicitly {@link rm.GlobalLogisticsStatus.verify|verify} messages.
         * @param message GlobalLogisticsStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IGlobalLogisticsStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GlobalLogisticsStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GlobalLogisticsStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.GlobalLogisticsStatus;

        /**
         * Decodes a GlobalLogisticsStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GlobalLogisticsStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.GlobalLogisticsStatus;

        /**
         * Verifies a GlobalLogisticsStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GlobalLogisticsStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GlobalLogisticsStatus
         */
        public static fromObject(object: { [k: string]: any }): rm.GlobalLogisticsStatus;

        /**
         * Creates a plain object from a GlobalLogisticsStatus message. Also converts values to other types if specified.
         * @param message GlobalLogisticsStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.GlobalLogisticsStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GlobalLogisticsStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GlobalLogisticsStatus
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GlobalSpecialMechanism. */
    interface IGlobalSpecialMechanism {

        /** GlobalSpecialMechanism mechanismId */
        mechanismId?: (number[]|null);

        /** GlobalSpecialMechanism mechanismTimeSec */
        mechanismTimeSec?: (number[]|null);
    }

    /** Represents a GlobalSpecialMechanism. */
    class GlobalSpecialMechanism implements IGlobalSpecialMechanism {

        /**
         * Constructs a new GlobalSpecialMechanism.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IGlobalSpecialMechanism);

        /** GlobalSpecialMechanism mechanismId. */
        public mechanismId: number[];

        /** GlobalSpecialMechanism mechanismTimeSec. */
        public mechanismTimeSec: number[];

        /**
         * Creates a new GlobalSpecialMechanism instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GlobalSpecialMechanism instance
         */
        public static create(properties?: rm.IGlobalSpecialMechanism): rm.GlobalSpecialMechanism;

        /**
         * Encodes the specified GlobalSpecialMechanism message. Does not implicitly {@link rm.GlobalSpecialMechanism.verify|verify} messages.
         * @param message GlobalSpecialMechanism message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IGlobalSpecialMechanism, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GlobalSpecialMechanism message, length delimited. Does not implicitly {@link rm.GlobalSpecialMechanism.verify|verify} messages.
         * @param message GlobalSpecialMechanism message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IGlobalSpecialMechanism, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GlobalSpecialMechanism message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GlobalSpecialMechanism
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.GlobalSpecialMechanism;

        /**
         * Decodes a GlobalSpecialMechanism message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GlobalSpecialMechanism
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.GlobalSpecialMechanism;

        /**
         * Verifies a GlobalSpecialMechanism message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GlobalSpecialMechanism message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GlobalSpecialMechanism
         */
        public static fromObject(object: { [k: string]: any }): rm.GlobalSpecialMechanism;

        /**
         * Creates a plain object from a GlobalSpecialMechanism message. Also converts values to other types if specified.
         * @param message GlobalSpecialMechanism
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.GlobalSpecialMechanism, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GlobalSpecialMechanism to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GlobalSpecialMechanism
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an Event. */
    interface IEvent {

        /** Event eventId */
        eventId?: (number|null);

        /** Event param */
        param?: (string|null);
    }

    /** Represents an Event. */
    class Event implements IEvent {

        /**
         * Constructs a new Event.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IEvent);

        /** Event eventId. */
        public eventId: number;

        /** Event param. */
        public param: string;

        /**
         * Creates a new Event instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Event instance
         */
        public static create(properties?: rm.IEvent): rm.Event;

        /**
         * Encodes the specified Event message. Does not implicitly {@link rm.Event.verify|verify} messages.
         * @param message Event message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Event message, length delimited. Does not implicitly {@link rm.Event.verify|verify} messages.
         * @param message Event message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Event message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Event
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.Event;

        /**
         * Decodes an Event message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Event
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.Event;

        /**
         * Verifies an Event message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Event message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Event
         */
        public static fromObject(object: { [k: string]: any }): rm.Event;

        /**
         * Creates a plain object from an Event message. Also converts values to other types if specified.
         * @param message Event
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.Event, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Event to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Event
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RobotInjuryStat. */
    interface IRobotInjuryStat {

        /** RobotInjuryStat totalDamage */
        totalDamage?: (number|null);

        /** RobotInjuryStat collisionDamage */
        collisionDamage?: (number|null);

        /** RobotInjuryStat smallProjectileDamage */
        smallProjectileDamage?: (number|null);

        /** RobotInjuryStat largeProjectileDamage */
        largeProjectileDamage?: (number|null);

        /** RobotInjuryStat dartSplashDamage */
        dartSplashDamage?: (number|null);

        /** RobotInjuryStat moduleOfflineDamage */
        moduleOfflineDamage?: (number|null);

        /** RobotInjuryStat wifiOfflineDamage */
        wifiOfflineDamage?: (number|null);

        /** RobotInjuryStat penaltyDamage */
        penaltyDamage?: (number|null);

        /** RobotInjuryStat serverKillDamage */
        serverKillDamage?: (number|null);

        /** RobotInjuryStat killerId */
        killerId?: (number|null);
    }

    /** Represents a RobotInjuryStat. */
    class RobotInjuryStat implements IRobotInjuryStat {

        /**
         * Constructs a new RobotInjuryStat.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IRobotInjuryStat);

        /** RobotInjuryStat totalDamage. */
        public totalDamage: number;

        /** RobotInjuryStat collisionDamage. */
        public collisionDamage: number;

        /** RobotInjuryStat smallProjectileDamage. */
        public smallProjectileDamage: number;

        /** RobotInjuryStat largeProjectileDamage. */
        public largeProjectileDamage: number;

        /** RobotInjuryStat dartSplashDamage. */
        public dartSplashDamage: number;

        /** RobotInjuryStat moduleOfflineDamage. */
        public moduleOfflineDamage: number;

        /** RobotInjuryStat wifiOfflineDamage. */
        public wifiOfflineDamage: number;

        /** RobotInjuryStat penaltyDamage. */
        public penaltyDamage: number;

        /** RobotInjuryStat serverKillDamage. */
        public serverKillDamage: number;

        /** RobotInjuryStat killerId. */
        public killerId: number;

        /**
         * Creates a new RobotInjuryStat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RobotInjuryStat instance
         */
        public static create(properties?: rm.IRobotInjuryStat): rm.RobotInjuryStat;

        /**
         * Encodes the specified RobotInjuryStat message. Does not implicitly {@link rm.RobotInjuryStat.verify|verify} messages.
         * @param message RobotInjuryStat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IRobotInjuryStat, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RobotInjuryStat message, length delimited. Does not implicitly {@link rm.RobotInjuryStat.verify|verify} messages.
         * @param message RobotInjuryStat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IRobotInjuryStat, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RobotInjuryStat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RobotInjuryStat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.RobotInjuryStat;

        /**
         * Decodes a RobotInjuryStat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RobotInjuryStat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.RobotInjuryStat;

        /**
         * Verifies a RobotInjuryStat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RobotInjuryStat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RobotInjuryStat
         */
        public static fromObject(object: { [k: string]: any }): rm.RobotInjuryStat;

        /**
         * Creates a plain object from a RobotInjuryStat message. Also converts values to other types if specified.
         * @param message RobotInjuryStat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.RobotInjuryStat, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RobotInjuryStat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RobotInjuryStat
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RobotRespawnStatus. */
    interface IRobotRespawnStatus {

        /** RobotRespawnStatus isPendingRespawn */
        isPendingRespawn?: (boolean|null);

        /** RobotRespawnStatus totalRespawnProgress */
        totalRespawnProgress?: (number|null);

        /** RobotRespawnStatus currentRespawnProgress */
        currentRespawnProgress?: (number|null);

        /** RobotRespawnStatus canFreeRespawn */
        canFreeRespawn?: (boolean|null);

        /** RobotRespawnStatus goldCostForRespawn */
        goldCostForRespawn?: (number|null);

        /** RobotRespawnStatus canPayForRespawn */
        canPayForRespawn?: (boolean|null);
    }

    /** Represents a RobotRespawnStatus. */
    class RobotRespawnStatus implements IRobotRespawnStatus {

        /**
         * Constructs a new RobotRespawnStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IRobotRespawnStatus);

        /** RobotRespawnStatus isPendingRespawn. */
        public isPendingRespawn: boolean;

        /** RobotRespawnStatus totalRespawnProgress. */
        public totalRespawnProgress: number;

        /** RobotRespawnStatus currentRespawnProgress. */
        public currentRespawnProgress: number;

        /** RobotRespawnStatus canFreeRespawn. */
        public canFreeRespawn: boolean;

        /** RobotRespawnStatus goldCostForRespawn. */
        public goldCostForRespawn: number;

        /** RobotRespawnStatus canPayForRespawn. */
        public canPayForRespawn: boolean;

        /**
         * Creates a new RobotRespawnStatus instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RobotRespawnStatus instance
         */
        public static create(properties?: rm.IRobotRespawnStatus): rm.RobotRespawnStatus;

        /**
         * Encodes the specified RobotRespawnStatus message. Does not implicitly {@link rm.RobotRespawnStatus.verify|verify} messages.
         * @param message RobotRespawnStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IRobotRespawnStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RobotRespawnStatus message, length delimited. Does not implicitly {@link rm.RobotRespawnStatus.verify|verify} messages.
         * @param message RobotRespawnStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IRobotRespawnStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RobotRespawnStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RobotRespawnStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.RobotRespawnStatus;

        /**
         * Decodes a RobotRespawnStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RobotRespawnStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.RobotRespawnStatus;

        /**
         * Verifies a RobotRespawnStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RobotRespawnStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RobotRespawnStatus
         */
        public static fromObject(object: { [k: string]: any }): rm.RobotRespawnStatus;

        /**
         * Creates a plain object from a RobotRespawnStatus message. Also converts values to other types if specified.
         * @param message RobotRespawnStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.RobotRespawnStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RobotRespawnStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RobotRespawnStatus
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RobotStaticStatus. */
    interface IRobotStaticStatus {

        /** RobotStaticStatus connectionState */
        connectionState?: (number|null);

        /** RobotStaticStatus fieldState */
        fieldState?: (number|null);

        /** RobotStaticStatus aliveState */
        aliveState?: (number|null);

        /** RobotStaticStatus robotId */
        robotId?: (number|null);

        /** RobotStaticStatus robotType */
        robotType?: (number|null);

        /** RobotStaticStatus performanceSystemShooter */
        performanceSystemShooter?: (number|null);

        /** RobotStaticStatus performanceSystemChassis */
        performanceSystemChassis?: (number|null);

        /** RobotStaticStatus level */
        level?: (number|null);

        /** RobotStaticStatus maxHealth */
        maxHealth?: (number|null);

        /** RobotStaticStatus maxHeat */
        maxHeat?: (number|null);

        /** RobotStaticStatus heatCooldownRate */
        heatCooldownRate?: (number|null);

        /** RobotStaticStatus maxPower */
        maxPower?: (number|null);

        /** RobotStaticStatus maxBufferEnergy */
        maxBufferEnergy?: (number|null);

        /** RobotStaticStatus maxChassisEnergy */
        maxChassisEnergy?: (number|null);
    }

    /** Represents a RobotStaticStatus. */
    class RobotStaticStatus implements IRobotStaticStatus {

        /**
         * Constructs a new RobotStaticStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IRobotStaticStatus);

        /** RobotStaticStatus connectionState. */
        public connectionState: number;

        /** RobotStaticStatus fieldState. */
        public fieldState: number;

        /** RobotStaticStatus aliveState. */
        public aliveState: number;

        /** RobotStaticStatus robotId. */
        public robotId: number;

        /** RobotStaticStatus robotType. */
        public robotType: number;

        /** RobotStaticStatus performanceSystemShooter. */
        public performanceSystemShooter: number;

        /** RobotStaticStatus performanceSystemChassis. */
        public performanceSystemChassis: number;

        /** RobotStaticStatus level. */
        public level: number;

        /** RobotStaticStatus maxHealth. */
        public maxHealth: number;

        /** RobotStaticStatus maxHeat. */
        public maxHeat: number;

        /** RobotStaticStatus heatCooldownRate. */
        public heatCooldownRate: number;

        /** RobotStaticStatus maxPower. */
        public maxPower: number;

        /** RobotStaticStatus maxBufferEnergy. */
        public maxBufferEnergy: number;

        /** RobotStaticStatus maxChassisEnergy. */
        public maxChassisEnergy: number;

        /**
         * Creates a new RobotStaticStatus instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RobotStaticStatus instance
         */
        public static create(properties?: rm.IRobotStaticStatus): rm.RobotStaticStatus;

        /**
         * Encodes the specified RobotStaticStatus message. Does not implicitly {@link rm.RobotStaticStatus.verify|verify} messages.
         * @param message RobotStaticStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IRobotStaticStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RobotStaticStatus message, length delimited. Does not implicitly {@link rm.RobotStaticStatus.verify|verify} messages.
         * @param message RobotStaticStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IRobotStaticStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RobotStaticStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RobotStaticStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.RobotStaticStatus;

        /**
         * Decodes a RobotStaticStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RobotStaticStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.RobotStaticStatus;

        /**
         * Verifies a RobotStaticStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RobotStaticStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RobotStaticStatus
         */
        public static fromObject(object: { [k: string]: any }): rm.RobotStaticStatus;

        /**
         * Creates a plain object from a RobotStaticStatus message. Also converts values to other types if specified.
         * @param message RobotStaticStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.RobotStaticStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RobotStaticStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RobotStaticStatus
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RobotDynamicStatus. */
    interface IRobotDynamicStatus {

        /** RobotDynamicStatus currentHealth */
        currentHealth?: (number|null);

        /** RobotDynamicStatus currentHeat */
        currentHeat?: (number|null);

        /** RobotDynamicStatus lastProjectileFireRate */
        lastProjectileFireRate?: (number|null);

        /** RobotDynamicStatus currentChassisEnergy */
        currentChassisEnergy?: (number|null);

        /** RobotDynamicStatus currentBufferEnergy */
        currentBufferEnergy?: (number|null);

        /** RobotDynamicStatus currentExperience */
        currentExperience?: (number|null);

        /** RobotDynamicStatus experienceForUpgrade */
        experienceForUpgrade?: (number|null);

        /** RobotDynamicStatus totalProjectilesFired */
        totalProjectilesFired?: (number|null);

        /** RobotDynamicStatus remainingAmmo */
        remainingAmmo?: (number|null);

        /** RobotDynamicStatus isOutOfCombat */
        isOutOfCombat?: (boolean|null);

        /** RobotDynamicStatus outOfCombatCountdown */
        outOfCombatCountdown?: (number|null);

        /** RobotDynamicStatus canRemoteHeal */
        canRemoteHeal?: (boolean|null);

        /** RobotDynamicStatus canRemoteAmmo */
        canRemoteAmmo?: (boolean|null);
    }

    /** Represents a RobotDynamicStatus. */
    class RobotDynamicStatus implements IRobotDynamicStatus {

        /**
         * Constructs a new RobotDynamicStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IRobotDynamicStatus);

        /** RobotDynamicStatus currentHealth. */
        public currentHealth: number;

        /** RobotDynamicStatus currentHeat. */
        public currentHeat: number;

        /** RobotDynamicStatus lastProjectileFireRate. */
        public lastProjectileFireRate: number;

        /** RobotDynamicStatus currentChassisEnergy. */
        public currentChassisEnergy: number;

        /** RobotDynamicStatus currentBufferEnergy. */
        public currentBufferEnergy: number;

        /** RobotDynamicStatus currentExperience. */
        public currentExperience: number;

        /** RobotDynamicStatus experienceForUpgrade. */
        public experienceForUpgrade: number;

        /** RobotDynamicStatus totalProjectilesFired. */
        public totalProjectilesFired: number;

        /** RobotDynamicStatus remainingAmmo. */
        public remainingAmmo: number;

        /** RobotDynamicStatus isOutOfCombat. */
        public isOutOfCombat: boolean;

        /** RobotDynamicStatus outOfCombatCountdown. */
        public outOfCombatCountdown: number;

        /** RobotDynamicStatus canRemoteHeal. */
        public canRemoteHeal: boolean;

        /** RobotDynamicStatus canRemoteAmmo. */
        public canRemoteAmmo: boolean;

        /**
         * Creates a new RobotDynamicStatus instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RobotDynamicStatus instance
         */
        public static create(properties?: rm.IRobotDynamicStatus): rm.RobotDynamicStatus;

        /**
         * Encodes the specified RobotDynamicStatus message. Does not implicitly {@link rm.RobotDynamicStatus.verify|verify} messages.
         * @param message RobotDynamicStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IRobotDynamicStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RobotDynamicStatus message, length delimited. Does not implicitly {@link rm.RobotDynamicStatus.verify|verify} messages.
         * @param message RobotDynamicStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IRobotDynamicStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RobotDynamicStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RobotDynamicStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.RobotDynamicStatus;

        /**
         * Decodes a RobotDynamicStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RobotDynamicStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.RobotDynamicStatus;

        /**
         * Verifies a RobotDynamicStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RobotDynamicStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RobotDynamicStatus
         */
        public static fromObject(object: { [k: string]: any }): rm.RobotDynamicStatus;

        /**
         * Creates a plain object from a RobotDynamicStatus message. Also converts values to other types if specified.
         * @param message RobotDynamicStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.RobotDynamicStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RobotDynamicStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RobotDynamicStatus
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RobotModuleStatus. */
    interface IRobotModuleStatus {

        /** RobotModuleStatus powerManager */
        powerManager?: (number|null);

        /** RobotModuleStatus rfid */
        rfid?: (number|null);

        /** RobotModuleStatus lightStrip */
        lightStrip?: (number|null);

        /** RobotModuleStatus smallShooter */
        smallShooter?: (number|null);

        /** RobotModuleStatus bigShooter */
        bigShooter?: (number|null);

        /** RobotModuleStatus uwb */
        uwb?: (number|null);

        /** RobotModuleStatus armor */
        armor?: (number|null);

        /** RobotModuleStatus videoTransmission */
        videoTransmission?: (number|null);

        /** RobotModuleStatus capacitor */
        capacitor?: (number|null);

        /** RobotModuleStatus mainController */
        mainController?: (number|null);
    }

    /** Represents a RobotModuleStatus. */
    class RobotModuleStatus implements IRobotModuleStatus {

        /**
         * Constructs a new RobotModuleStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IRobotModuleStatus);

        /** RobotModuleStatus powerManager. */
        public powerManager: number;

        /** RobotModuleStatus rfid. */
        public rfid: number;

        /** RobotModuleStatus lightStrip. */
        public lightStrip: number;

        /** RobotModuleStatus smallShooter. */
        public smallShooter: number;

        /** RobotModuleStatus bigShooter. */
        public bigShooter: number;

        /** RobotModuleStatus uwb. */
        public uwb: number;

        /** RobotModuleStatus armor. */
        public armor: number;

        /** RobotModuleStatus videoTransmission. */
        public videoTransmission: number;

        /** RobotModuleStatus capacitor. */
        public capacitor: number;

        /** RobotModuleStatus mainController. */
        public mainController: number;

        /**
         * Creates a new RobotModuleStatus instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RobotModuleStatus instance
         */
        public static create(properties?: rm.IRobotModuleStatus): rm.RobotModuleStatus;

        /**
         * Encodes the specified RobotModuleStatus message. Does not implicitly {@link rm.RobotModuleStatus.verify|verify} messages.
         * @param message RobotModuleStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IRobotModuleStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RobotModuleStatus message, length delimited. Does not implicitly {@link rm.RobotModuleStatus.verify|verify} messages.
         * @param message RobotModuleStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IRobotModuleStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RobotModuleStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RobotModuleStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.RobotModuleStatus;

        /**
         * Decodes a RobotModuleStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RobotModuleStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.RobotModuleStatus;

        /**
         * Verifies a RobotModuleStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RobotModuleStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RobotModuleStatus
         */
        public static fromObject(object: { [k: string]: any }): rm.RobotModuleStatus;

        /**
         * Creates a plain object from a RobotModuleStatus message. Also converts values to other types if specified.
         * @param message RobotModuleStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.RobotModuleStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RobotModuleStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RobotModuleStatus
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RobotPosition. */
    interface IRobotPosition {

        /** RobotPosition x */
        x?: (number|null);

        /** RobotPosition y */
        y?: (number|null);

        /** RobotPosition z */
        z?: (number|null);

        /** RobotPosition yaw */
        yaw?: (number|null);
    }

    /** Represents a RobotPosition. */
    class RobotPosition implements IRobotPosition {

        /**
         * Constructs a new RobotPosition.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IRobotPosition);

        /** RobotPosition x. */
        public x: number;

        /** RobotPosition y. */
        public y: number;

        /** RobotPosition z. */
        public z: number;

        /** RobotPosition yaw. */
        public yaw: number;

        /**
         * Creates a new RobotPosition instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RobotPosition instance
         */
        public static create(properties?: rm.IRobotPosition): rm.RobotPosition;

        /**
         * Encodes the specified RobotPosition message. Does not implicitly {@link rm.RobotPosition.verify|verify} messages.
         * @param message RobotPosition message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IRobotPosition, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RobotPosition message, length delimited. Does not implicitly {@link rm.RobotPosition.verify|verify} messages.
         * @param message RobotPosition message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IRobotPosition, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RobotPosition message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RobotPosition
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.RobotPosition;

        /**
         * Decodes a RobotPosition message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RobotPosition
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.RobotPosition;

        /**
         * Verifies a RobotPosition message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RobotPosition message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RobotPosition
         */
        public static fromObject(object: { [k: string]: any }): rm.RobotPosition;

        /**
         * Creates a plain object from a RobotPosition message. Also converts values to other types if specified.
         * @param message RobotPosition
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.RobotPosition, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RobotPosition to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RobotPosition
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Buff. */
    interface IBuff {

        /** Buff robotId */
        robotId?: (number|null);

        /** Buff buffType */
        buffType?: (number|null);

        /** Buff buffLevel */
        buffLevel?: (number|null);

        /** Buff buffMaxTime */
        buffMaxTime?: (number|null);

        /** Buff buffLeftTime */
        buffLeftTime?: (number|null);

        /** Buff msgParams */
        msgParams?: (string|null);
    }

    /** Represents a Buff. */
    class Buff implements IBuff {

        /**
         * Constructs a new Buff.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IBuff);

        /** Buff robotId. */
        public robotId: number;

        /** Buff buffType. */
        public buffType: number;

        /** Buff buffLevel. */
        public buffLevel: number;

        /** Buff buffMaxTime. */
        public buffMaxTime: number;

        /** Buff buffLeftTime. */
        public buffLeftTime: number;

        /** Buff msgParams. */
        public msgParams: string;

        /**
         * Creates a new Buff instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Buff instance
         */
        public static create(properties?: rm.IBuff): rm.Buff;

        /**
         * Encodes the specified Buff message. Does not implicitly {@link rm.Buff.verify|verify} messages.
         * @param message Buff message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IBuff, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Buff message, length delimited. Does not implicitly {@link rm.Buff.verify|verify} messages.
         * @param message Buff message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IBuff, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Buff message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Buff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.Buff;

        /**
         * Decodes a Buff message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Buff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.Buff;

        /**
         * Verifies a Buff message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Buff message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Buff
         */
        public static fromObject(object: { [k: string]: any }): rm.Buff;

        /**
         * Creates a plain object from a Buff message. Also converts values to other types if specified.
         * @param message Buff
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.Buff, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Buff to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Buff
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PenaltyInfo. */
    interface IPenaltyInfo {

        /** PenaltyInfo penaltyType */
        penaltyType?: (number|null);

        /** PenaltyInfo penaltyEffectSec */
        penaltyEffectSec?: (number|null);

        /** PenaltyInfo totalPenaltyNum */
        totalPenaltyNum?: (number|null);
    }

    /** Represents a PenaltyInfo. */
    class PenaltyInfo implements IPenaltyInfo {

        /**
         * Constructs a new PenaltyInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IPenaltyInfo);

        /** PenaltyInfo penaltyType. */
        public penaltyType: number;

        /** PenaltyInfo penaltyEffectSec. */
        public penaltyEffectSec: number;

        /** PenaltyInfo totalPenaltyNum. */
        public totalPenaltyNum: number;

        /**
         * Creates a new PenaltyInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PenaltyInfo instance
         */
        public static create(properties?: rm.IPenaltyInfo): rm.PenaltyInfo;

        /**
         * Encodes the specified PenaltyInfo message. Does not implicitly {@link rm.PenaltyInfo.verify|verify} messages.
         * @param message PenaltyInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IPenaltyInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PenaltyInfo message, length delimited. Does not implicitly {@link rm.PenaltyInfo.verify|verify} messages.
         * @param message PenaltyInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IPenaltyInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PenaltyInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PenaltyInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.PenaltyInfo;

        /**
         * Decodes a PenaltyInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PenaltyInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.PenaltyInfo;

        /**
         * Verifies a PenaltyInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PenaltyInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PenaltyInfo
         */
        public static fromObject(object: { [k: string]: any }): rm.PenaltyInfo;

        /**
         * Creates a plain object from a PenaltyInfo message. Also converts values to other types if specified.
         * @param message PenaltyInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.PenaltyInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PenaltyInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PenaltyInfo
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RobotPathPlanInfo. */
    interface IRobotPathPlanInfo {

        /** RobotPathPlanInfo intention */
        intention?: (number|null);

        /** RobotPathPlanInfo startPosX */
        startPosX?: (number|null);

        /** RobotPathPlanInfo startPosY */
        startPosY?: (number|null);

        /** RobotPathPlanInfo offsetX */
        offsetX?: (number[]|null);

        /** RobotPathPlanInfo offsetY */
        offsetY?: (number[]|null);

        /** RobotPathPlanInfo senderId */
        senderId?: (number|null);
    }

    /** Represents a RobotPathPlanInfo. */
    class RobotPathPlanInfo implements IRobotPathPlanInfo {

        /**
         * Constructs a new RobotPathPlanInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IRobotPathPlanInfo);

        /** RobotPathPlanInfo intention. */
        public intention: number;

        /** RobotPathPlanInfo startPosX. */
        public startPosX: number;

        /** RobotPathPlanInfo startPosY. */
        public startPosY: number;

        /** RobotPathPlanInfo offsetX. */
        public offsetX: number[];

        /** RobotPathPlanInfo offsetY. */
        public offsetY: number[];

        /** RobotPathPlanInfo senderId. */
        public senderId: number;

        /**
         * Creates a new RobotPathPlanInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RobotPathPlanInfo instance
         */
        public static create(properties?: rm.IRobotPathPlanInfo): rm.RobotPathPlanInfo;

        /**
         * Encodes the specified RobotPathPlanInfo message. Does not implicitly {@link rm.RobotPathPlanInfo.verify|verify} messages.
         * @param message RobotPathPlanInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IRobotPathPlanInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RobotPathPlanInfo message, length delimited. Does not implicitly {@link rm.RobotPathPlanInfo.verify|verify} messages.
         * @param message RobotPathPlanInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IRobotPathPlanInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RobotPathPlanInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RobotPathPlanInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.RobotPathPlanInfo;

        /**
         * Decodes a RobotPathPlanInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RobotPathPlanInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.RobotPathPlanInfo;

        /**
         * Verifies a RobotPathPlanInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RobotPathPlanInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RobotPathPlanInfo
         */
        public static fromObject(object: { [k: string]: any }): rm.RobotPathPlanInfo;

        /**
         * Creates a plain object from a RobotPathPlanInfo message. Also converts values to other types if specified.
         * @param message RobotPathPlanInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.RobotPathPlanInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RobotPathPlanInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RobotPathPlanInfo
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a MapClickInfoNotify. */
    interface IMapClickInfoNotify {

        /** MapClickInfoNotify isSendAll */
        isSendAll?: (number|null);

        /** MapClickInfoNotify robotId */
        robotId?: (Uint8Array|null);

        /** MapClickInfoNotify mode */
        mode?: (number|null);

        /** MapClickInfoNotify enemyId */
        enemyId?: (number|null);

        /** MapClickInfoNotify ascii */
        ascii?: (number|null);

        /** MapClickInfoNotify type */
        type?: (number|null);

        /** MapClickInfoNotify screenX */
        screenX?: (number|null);

        /** MapClickInfoNotify screenY */
        screenY?: (number|null);

        /** MapClickInfoNotify mapX */
        mapX?: (number|null);

        /** MapClickInfoNotify mapY */
        mapY?: (number|null);
    }

    /** Represents a MapClickInfoNotify. */
    class MapClickInfoNotify implements IMapClickInfoNotify {

        /**
         * Constructs a new MapClickInfoNotify.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IMapClickInfoNotify);

        /** MapClickInfoNotify isSendAll. */
        public isSendAll: number;

        /** MapClickInfoNotify robotId. */
        public robotId: Uint8Array;

        /** MapClickInfoNotify mode. */
        public mode: number;

        /** MapClickInfoNotify enemyId. */
        public enemyId: number;

        /** MapClickInfoNotify ascii. */
        public ascii: number;

        /** MapClickInfoNotify type. */
        public type: number;

        /** MapClickInfoNotify screenX. */
        public screenX: number;

        /** MapClickInfoNotify screenY. */
        public screenY: number;

        /** MapClickInfoNotify mapX. */
        public mapX: number;

        /** MapClickInfoNotify mapY. */
        public mapY: number;

        /**
         * Creates a new MapClickInfoNotify instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MapClickInfoNotify instance
         */
        public static create(properties?: rm.IMapClickInfoNotify): rm.MapClickInfoNotify;

        /**
         * Encodes the specified MapClickInfoNotify message. Does not implicitly {@link rm.MapClickInfoNotify.verify|verify} messages.
         * @param message MapClickInfoNotify message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IMapClickInfoNotify, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MapClickInfoNotify message, length delimited. Does not implicitly {@link rm.MapClickInfoNotify.verify|verify} messages.
         * @param message MapClickInfoNotify message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IMapClickInfoNotify, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MapClickInfoNotify message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MapClickInfoNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.MapClickInfoNotify;

        /**
         * Decodes a MapClickInfoNotify message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MapClickInfoNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.MapClickInfoNotify;

        /**
         * Verifies a MapClickInfoNotify message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MapClickInfoNotify message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MapClickInfoNotify
         */
        public static fromObject(object: { [k: string]: any }): rm.MapClickInfoNotify;

        /**
         * Creates a plain object from a MapClickInfoNotify message. Also converts values to other types if specified.
         * @param message MapClickInfoNotify
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.MapClickInfoNotify, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MapClickInfoNotify to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MapClickInfoNotify
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RaderInfoToClient. */
    interface IRaderInfoToClient {

        /** RaderInfoToClient targetRobotId */
        targetRobotId?: (number|null);

        /** RaderInfoToClient targetPosX */
        targetPosX?: (number|null);

        /** RaderInfoToClient targetPosY */
        targetPosY?: (number|null);

        /** RaderInfoToClient torwardAngle */
        torwardAngle?: (number|null);

        /** RaderInfoToClient isHighLight */
        isHighLight?: (number|null);
    }

    /** Represents a RaderInfoToClient. */
    class RaderInfoToClient implements IRaderInfoToClient {

        /**
         * Constructs a new RaderInfoToClient.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IRaderInfoToClient);

        /** RaderInfoToClient targetRobotId. */
        public targetRobotId: number;

        /** RaderInfoToClient targetPosX. */
        public targetPosX: number;

        /** RaderInfoToClient targetPosY. */
        public targetPosY: number;

        /** RaderInfoToClient torwardAngle. */
        public torwardAngle: number;

        /** RaderInfoToClient isHighLight. */
        public isHighLight: number;

        /**
         * Creates a new RaderInfoToClient instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RaderInfoToClient instance
         */
        public static create(properties?: rm.IRaderInfoToClient): rm.RaderInfoToClient;

        /**
         * Encodes the specified RaderInfoToClient message. Does not implicitly {@link rm.RaderInfoToClient.verify|verify} messages.
         * @param message RaderInfoToClient message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IRaderInfoToClient, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RaderInfoToClient message, length delimited. Does not implicitly {@link rm.RaderInfoToClient.verify|verify} messages.
         * @param message RaderInfoToClient message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IRaderInfoToClient, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RaderInfoToClient message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RaderInfoToClient
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.RaderInfoToClient;

        /**
         * Decodes a RaderInfoToClient message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RaderInfoToClient
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.RaderInfoToClient;

        /**
         * Verifies a RaderInfoToClient message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RaderInfoToClient message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RaderInfoToClient
         */
        public static fromObject(object: { [k: string]: any }): rm.RaderInfoToClient;

        /**
         * Creates a plain object from a RaderInfoToClient message. Also converts values to other types if specified.
         * @param message RaderInfoToClient
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.RaderInfoToClient, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RaderInfoToClient to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RaderInfoToClient
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CustomByteBlock. */
    interface ICustomByteBlock {

        /** CustomByteBlock data */
        data?: (Uint8Array|null);
    }

    /** Represents a CustomByteBlock. */
    class CustomByteBlock implements ICustomByteBlock {

        /**
         * Constructs a new CustomByteBlock.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.ICustomByteBlock);

        /** CustomByteBlock data. */
        public data: Uint8Array;

        /**
         * Creates a new CustomByteBlock instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CustomByteBlock instance
         */
        public static create(properties?: rm.ICustomByteBlock): rm.CustomByteBlock;

        /**
         * Encodes the specified CustomByteBlock message. Does not implicitly {@link rm.CustomByteBlock.verify|verify} messages.
         * @param message CustomByteBlock message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.ICustomByteBlock, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CustomByteBlock message, length delimited. Does not implicitly {@link rm.CustomByteBlock.verify|verify} messages.
         * @param message CustomByteBlock message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.ICustomByteBlock, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CustomByteBlock message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CustomByteBlock
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.CustomByteBlock;

        /**
         * Decodes a CustomByteBlock message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CustomByteBlock
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.CustomByteBlock;

        /**
         * Verifies a CustomByteBlock message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CustomByteBlock message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CustomByteBlock
         */
        public static fromObject(object: { [k: string]: any }): rm.CustomByteBlock;

        /**
         * Creates a plain object from a CustomByteBlock message. Also converts values to other types if specified.
         * @param message CustomByteBlock
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.CustomByteBlock, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CustomByteBlock to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CustomByteBlock
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AssemblyCommand. */
    interface IAssemblyCommand {

        /** AssemblyCommand operation */
        operation?: (number|null);

        /** AssemblyCommand difficulty */
        difficulty?: (number|null);
    }

    /** Represents an AssemblyCommand. */
    class AssemblyCommand implements IAssemblyCommand {

        /**
         * Constructs a new AssemblyCommand.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IAssemblyCommand);

        /** AssemblyCommand operation. */
        public operation: number;

        /** AssemblyCommand difficulty. */
        public difficulty: number;

        /**
         * Creates a new AssemblyCommand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AssemblyCommand instance
         */
        public static create(properties?: rm.IAssemblyCommand): rm.AssemblyCommand;

        /**
         * Encodes the specified AssemblyCommand message. Does not implicitly {@link rm.AssemblyCommand.verify|verify} messages.
         * @param message AssemblyCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IAssemblyCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AssemblyCommand message, length delimited. Does not implicitly {@link rm.AssemblyCommand.verify|verify} messages.
         * @param message AssemblyCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IAssemblyCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AssemblyCommand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AssemblyCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.AssemblyCommand;

        /**
         * Decodes an AssemblyCommand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AssemblyCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.AssemblyCommand;

        /**
         * Verifies an AssemblyCommand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AssemblyCommand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AssemblyCommand
         */
        public static fromObject(object: { [k: string]: any }): rm.AssemblyCommand;

        /**
         * Creates a plain object from an AssemblyCommand message. Also converts values to other types if specified.
         * @param message AssemblyCommand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.AssemblyCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AssemblyCommand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AssemblyCommand
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a TechCoreMotionStateSync. */
    interface ITechCoreMotionStateSync {

        /** TechCoreMotionStateSync maximumDifficultyLevel */
        maximumDifficultyLevel?: (number|null);

        /** TechCoreMotionStateSync status */
        status?: (number|null);
    }

    /** Represents a TechCoreMotionStateSync. */
    class TechCoreMotionStateSync implements ITechCoreMotionStateSync {

        /**
         * Constructs a new TechCoreMotionStateSync.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.ITechCoreMotionStateSync);

        /** TechCoreMotionStateSync maximumDifficultyLevel. */
        public maximumDifficultyLevel: number;

        /** TechCoreMotionStateSync status. */
        public status: number;

        /**
         * Creates a new TechCoreMotionStateSync instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TechCoreMotionStateSync instance
         */
        public static create(properties?: rm.ITechCoreMotionStateSync): rm.TechCoreMotionStateSync;

        /**
         * Encodes the specified TechCoreMotionStateSync message. Does not implicitly {@link rm.TechCoreMotionStateSync.verify|verify} messages.
         * @param message TechCoreMotionStateSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.ITechCoreMotionStateSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TechCoreMotionStateSync message, length delimited. Does not implicitly {@link rm.TechCoreMotionStateSync.verify|verify} messages.
         * @param message TechCoreMotionStateSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.ITechCoreMotionStateSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TechCoreMotionStateSync message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TechCoreMotionStateSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.TechCoreMotionStateSync;

        /**
         * Decodes a TechCoreMotionStateSync message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TechCoreMotionStateSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.TechCoreMotionStateSync;

        /**
         * Verifies a TechCoreMotionStateSync message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TechCoreMotionStateSync message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TechCoreMotionStateSync
         */
        public static fromObject(object: { [k: string]: any }): rm.TechCoreMotionStateSync;

        /**
         * Creates a plain object from a TechCoreMotionStateSync message. Also converts values to other types if specified.
         * @param message TechCoreMotionStateSync
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.TechCoreMotionStateSync, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TechCoreMotionStateSync to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for TechCoreMotionStateSync
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PerformanceSelection. */
    interface IPerformanceSelection {

        /** PerformanceSelection shooter */
        shooter?: (number|null);

        /** PerformanceSelection chassis */
        chassis?: (number|null);
    }

    /** Represents a PerformanceSelection. */
    class PerformanceSelection implements IPerformanceSelection {

        /**
         * Constructs a new PerformanceSelection.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IPerformanceSelection);

        /** PerformanceSelection shooter. */
        public shooter: number;

        /** PerformanceSelection chassis. */
        public chassis: number;

        /**
         * Creates a new PerformanceSelection instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PerformanceSelection instance
         */
        public static create(properties?: rm.IPerformanceSelection): rm.PerformanceSelection;

        /**
         * Encodes the specified PerformanceSelection message. Does not implicitly {@link rm.PerformanceSelection.verify|verify} messages.
         * @param message PerformanceSelection message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IPerformanceSelection, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PerformanceSelection message, length delimited. Does not implicitly {@link rm.PerformanceSelection.verify|verify} messages.
         * @param message PerformanceSelection message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IPerformanceSelection, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PerformanceSelection message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PerformanceSelection
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.PerformanceSelection;

        /**
         * Decodes a PerformanceSelection message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PerformanceSelection
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.PerformanceSelection;

        /**
         * Verifies a PerformanceSelection message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PerformanceSelection message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PerformanceSelection
         */
        public static fromObject(object: { [k: string]: any }): rm.PerformanceSelection;

        /**
         * Creates a plain object from a PerformanceSelection message. Also converts values to other types if specified.
         * @param message PerformanceSelection
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.PerformanceSelection, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PerformanceSelection to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PerformanceSelection
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a HeroDeployMode. */
    interface IHeroDeployMode {

        /** HeroDeployMode modeOrStatus */
        modeOrStatus?: (number|null);
    }

    /** Represents a HeroDeployMode. */
    class HeroDeployMode implements IHeroDeployMode {

        /**
         * Constructs a new HeroDeployMode.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IHeroDeployMode);

        /** HeroDeployMode modeOrStatus. */
        public modeOrStatus: number;

        /**
         * Creates a new HeroDeployMode instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HeroDeployMode instance
         */
        public static create(properties?: rm.IHeroDeployMode): rm.HeroDeployMode;

        /**
         * Encodes the specified HeroDeployMode message. Does not implicitly {@link rm.HeroDeployMode.verify|verify} messages.
         * @param message HeroDeployMode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IHeroDeployMode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HeroDeployMode message, length delimited. Does not implicitly {@link rm.HeroDeployMode.verify|verify} messages.
         * @param message HeroDeployMode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IHeroDeployMode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HeroDeployMode message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HeroDeployMode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.HeroDeployMode;

        /**
         * Decodes a HeroDeployMode message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HeroDeployMode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.HeroDeployMode;

        /**
         * Verifies a HeroDeployMode message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HeroDeployMode message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HeroDeployMode
         */
        public static fromObject(object: { [k: string]: any }): rm.HeroDeployMode;

        /**
         * Creates a plain object from a HeroDeployMode message. Also converts values to other types if specified.
         * @param message HeroDeployMode
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.HeroDeployMode, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HeroDeployMode to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for HeroDeployMode
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RuneStatus. */
    interface IRuneStatus {

        /** RuneStatus activate */
        activate?: (number|null);

        /** RuneStatus runeStatus */
        runeStatus?: (number|null);

        /** RuneStatus activatedArms */
        activatedArms?: (number|null);

        /** RuneStatus averageRings */
        averageRings?: (number|null);
    }

    /** Represents a RuneStatus. */
    class RuneStatus implements IRuneStatus {

        /**
         * Constructs a new RuneStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IRuneStatus);

        /** RuneStatus activate. */
        public activate: number;

        /** RuneStatus runeStatus. */
        public runeStatus: number;

        /** RuneStatus activatedArms. */
        public activatedArms: number;

        /** RuneStatus averageRings. */
        public averageRings: number;

        /**
         * Creates a new RuneStatus instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RuneStatus instance
         */
        public static create(properties?: rm.IRuneStatus): rm.RuneStatus;

        /**
         * Encodes the specified RuneStatus message. Does not implicitly {@link rm.RuneStatus.verify|verify} messages.
         * @param message RuneStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IRuneStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RuneStatus message, length delimited. Does not implicitly {@link rm.RuneStatus.verify|verify} messages.
         * @param message RuneStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IRuneStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RuneStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RuneStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.RuneStatus;

        /**
         * Decodes a RuneStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RuneStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.RuneStatus;

        /**
         * Verifies a RuneStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RuneStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RuneStatus
         */
        public static fromObject(object: { [k: string]: any }): rm.RuneStatus;

        /**
         * Creates a plain object from a RuneStatus message. Also converts values to other types if specified.
         * @param message RuneStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.RuneStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RuneStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RuneStatus
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SentinelStatusSync. */
    interface ISentinelStatusSync {

        /** SentinelStatusSync postureId */
        postureId?: (number|null);

        /** SentinelStatusSync isWeakened */
        isWeakened?: (boolean|null);
    }

    /** Represents a SentinelStatusSync. */
    class SentinelStatusSync implements ISentinelStatusSync {

        /**
         * Constructs a new SentinelStatusSync.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.ISentinelStatusSync);

        /** SentinelStatusSync postureId. */
        public postureId: number;

        /** SentinelStatusSync isWeakened. */
        public isWeakened: boolean;

        /**
         * Creates a new SentinelStatusSync instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SentinelStatusSync instance
         */
        public static create(properties?: rm.ISentinelStatusSync): rm.SentinelStatusSync;

        /**
         * Encodes the specified SentinelStatusSync message. Does not implicitly {@link rm.SentinelStatusSync.verify|verify} messages.
         * @param message SentinelStatusSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.ISentinelStatusSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SentinelStatusSync message, length delimited. Does not implicitly {@link rm.SentinelStatusSync.verify|verify} messages.
         * @param message SentinelStatusSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.ISentinelStatusSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SentinelStatusSync message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SentinelStatusSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.SentinelStatusSync;

        /**
         * Decodes a SentinelStatusSync message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SentinelStatusSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.SentinelStatusSync;

        /**
         * Verifies a SentinelStatusSync message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SentinelStatusSync message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SentinelStatusSync
         */
        public static fromObject(object: { [k: string]: any }): rm.SentinelStatusSync;

        /**
         * Creates a plain object from a SentinelStatusSync message. Also converts values to other types if specified.
         * @param message SentinelStatusSync
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.SentinelStatusSync, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SentinelStatusSync to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SentinelStatusSync
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a DartInfo. */
    interface IDartInfo {

        /** DartInfo targetId */
        targetId?: (number|null);

        /** DartInfo open */
        open?: (boolean|null);
    }

    /** Represents a DartInfo. */
    class DartInfo implements IDartInfo {

        /**
         * Constructs a new DartInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IDartInfo);

        /** DartInfo targetId. */
        public targetId: number;

        /** DartInfo open. */
        public open: boolean;

        /**
         * Creates a new DartInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DartInfo instance
         */
        public static create(properties?: rm.IDartInfo): rm.DartInfo;

        /**
         * Encodes the specified DartInfo message. Does not implicitly {@link rm.DartInfo.verify|verify} messages.
         * @param message DartInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IDartInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DartInfo message, length delimited. Does not implicitly {@link rm.DartInfo.verify|verify} messages.
         * @param message DartInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IDartInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DartInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DartInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.DartInfo;

        /**
         * Decodes a DartInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DartInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.DartInfo;

        /**
         * Verifies a DartInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DartInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DartInfo
         */
        public static fromObject(object: { [k: string]: any }): rm.DartInfo;

        /**
         * Creates a plain object from a DartInfo message. Also converts values to other types if specified.
         * @param message DartInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.DartInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DartInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DartInfo
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GuardCtrl. */
    interface IGuardCtrl {

        /** GuardCtrl commandId */
        commandId?: (number|null);

        /** GuardCtrl resultCode */
        resultCode?: (number|null);
    }

    /** Represents a GuardCtrl. */
    class GuardCtrl implements IGuardCtrl {

        /**
         * Constructs a new GuardCtrl.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IGuardCtrl);

        /** GuardCtrl commandId. */
        public commandId: number;

        /** GuardCtrl resultCode. */
        public resultCode: number;

        /**
         * Creates a new GuardCtrl instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GuardCtrl instance
         */
        public static create(properties?: rm.IGuardCtrl): rm.GuardCtrl;

        /**
         * Encodes the specified GuardCtrl message. Does not implicitly {@link rm.GuardCtrl.verify|verify} messages.
         * @param message GuardCtrl message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IGuardCtrl, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GuardCtrl message, length delimited. Does not implicitly {@link rm.GuardCtrl.verify|verify} messages.
         * @param message GuardCtrl message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IGuardCtrl, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GuardCtrl message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GuardCtrl
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.GuardCtrl;

        /**
         * Decodes a GuardCtrl message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GuardCtrl
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.GuardCtrl;

        /**
         * Verifies a GuardCtrl message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GuardCtrl message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GuardCtrl
         */
        public static fromObject(object: { [k: string]: any }): rm.GuardCtrl;

        /**
         * Creates a plain object from a GuardCtrl message. Also converts values to other types if specified.
         * @param message GuardCtrl
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.GuardCtrl, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GuardCtrl to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GuardCtrl
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AirSupport. */
    interface IAirSupport {

        /** AirSupport commandId */
        commandId?: (number|null);

        /** AirSupport airsupportStatus */
        airsupportStatus?: (number|null);

        /** AirSupport leftTime */
        leftTime?: (number|null);

        /** AirSupport costCoins */
        costCoins?: (number|null);
    }

    /** Represents an AirSupport. */
    class AirSupport implements IAirSupport {

        /**
         * Constructs a new AirSupport.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IAirSupport);

        /** AirSupport commandId. */
        public commandId: number;

        /** AirSupport airsupportStatus. */
        public airsupportStatus: number;

        /** AirSupport leftTime. */
        public leftTime: number;

        /** AirSupport costCoins. */
        public costCoins: number;

        /**
         * Creates a new AirSupport instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AirSupport instance
         */
        public static create(properties?: rm.IAirSupport): rm.AirSupport;

        /**
         * Encodes the specified AirSupport message. Does not implicitly {@link rm.AirSupport.verify|verify} messages.
         * @param message AirSupport message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IAirSupport, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AirSupport message, length delimited. Does not implicitly {@link rm.AirSupport.verify|verify} messages.
         * @param message AirSupport message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IAirSupport, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AirSupport message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AirSupport
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.AirSupport;

        /**
         * Decodes an AirSupport message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AirSupport
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.AirSupport;

        /**
         * Verifies an AirSupport message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AirSupport message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AirSupport
         */
        public static fromObject(object: { [k: string]: any }): rm.AirSupport;

        /**
         * Creates a plain object from an AirSupport message. Also converts values to other types if specified.
         * @param message AirSupport
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.AirSupport, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AirSupport to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AirSupport
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Aliases for protocol names in documentation */
    const RobotPerformanceSelectionCommand: typeof PerformanceSelection;
    type RobotPerformanceSelectionCommand = PerformanceSelection;

    const RobotPerformanceSelectionSync: typeof PerformanceSelection;
    type RobotPerformanceSelectionSync = PerformanceSelection;

    const HeroDeployModeEventCommand: typeof HeroDeployMode;
    type HeroDeployModeEventCommand = HeroDeployMode;

    const DeployModeStatusSync: typeof HeroDeployMode;
    type DeployModeStatusSync = HeroDeployMode;

    const RuneActivateCommand: typeof RuneStatus;
    type RuneActivateCommand = RuneStatus;

    const RuneStatusSync: typeof RuneStatus;
    type RuneStatusSync = RuneStatus;

    const DartCommand: typeof DartInfo;
    type DartCommand = DartInfo;

    const DartSelectTargetStatusSync: typeof DartInfo;
    type DartSelectTargetStatusSync = DartInfo;

    const GuardCtrlCommand: typeof GuardCtrl;
    type GuardCtrlCommand = GuardCtrl;

    const GuardCtrlResult: typeof GuardCtrl;
    type GuardCtrlResult = GuardCtrl;

    const AirSupportCommand: typeof AirSupport;
    type AirSupportCommand = AirSupport;

    const AirSupportStatusSync: typeof AirSupport;
    type AirSupportStatusSync = AirSupport;
}
