import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace rm. */
export namespace rm {

    /** Properties of a KeyboardMouseControl. */
    interface IKeyboardMouseControl {

        /** KeyboardMouseControl mouseX */
        mouseX?: (number|null);

        /** KeyboardMouseControl mouseY */
        mouseY?: (number|null);

        /** KeyboardMouseControl mouseZ */
        mouseZ?: (number|null);

        /** KeyboardMouseControl leftButtonDown */
        leftButtonDown?: (boolean|null);

        /** KeyboardMouseControl rightButtonDown */
        rightButtonDown?: (boolean|null);

        /** KeyboardMouseControl keyboardValue */
        keyboardValue?: (number|null);

        /** KeyboardMouseControl midButtonDown */
        midButtonDown?: (boolean|null);
    }

    /** Represents a KeyboardMouseControl. */
    class KeyboardMouseControl implements IKeyboardMouseControl {

        /**
         * Constructs a new KeyboardMouseControl.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IKeyboardMouseControl);

        /** KeyboardMouseControl mouseX. */
        public mouseX: number;

        /** KeyboardMouseControl mouseY. */
        public mouseY: number;

        /** KeyboardMouseControl mouseZ. */
        public mouseZ: number;

        /** KeyboardMouseControl leftButtonDown. */
        public leftButtonDown: boolean;

        /** KeyboardMouseControl rightButtonDown. */
        public rightButtonDown: boolean;

        /** KeyboardMouseControl keyboardValue. */
        public keyboardValue: number;

        /** KeyboardMouseControl midButtonDown. */
        public midButtonDown: boolean;

        /**
         * Creates a new KeyboardMouseControl instance using the specified properties.
         * @param [properties] Properties to set
         * @returns KeyboardMouseControl instance
         */
        public static create(properties?: rm.IKeyboardMouseControl): rm.KeyboardMouseControl;

        /**
         * Encodes the specified KeyboardMouseControl message. Does not implicitly {@link rm.KeyboardMouseControl.verify|verify} messages.
         * @param message KeyboardMouseControl message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IKeyboardMouseControl, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified KeyboardMouseControl message, length delimited. Does not implicitly {@link rm.KeyboardMouseControl.verify|verify} messages.
         * @param message KeyboardMouseControl message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IKeyboardMouseControl, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a KeyboardMouseControl message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns KeyboardMouseControl
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.KeyboardMouseControl;

        /**
         * Decodes a KeyboardMouseControl message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns KeyboardMouseControl
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.KeyboardMouseControl;

        /**
         * Verifies a KeyboardMouseControl message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a KeyboardMouseControl message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns KeyboardMouseControl
         */
        public static fromObject(object: { [k: string]: any }): rm.KeyboardMouseControl;

        /**
         * Creates a plain object from a KeyboardMouseControl message. Also converts values to other types if specified.
         * @param message KeyboardMouseControl
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.KeyboardMouseControl, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this KeyboardMouseControl to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for KeyboardMouseControl
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CustomControl. */
    interface ICustomControl {

        /** CustomControl data */
        data?: (Uint8Array|null);
    }

    /** Represents a CustomControl. */
    class CustomControl implements ICustomControl {

        /**
         * Constructs a new CustomControl.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.ICustomControl);

        /** CustomControl data. */
        public data: Uint8Array;

        /**
         * Creates a new CustomControl instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CustomControl instance
         */
        public static create(properties?: rm.ICustomControl): rm.CustomControl;

        /**
         * Encodes the specified CustomControl message. Does not implicitly {@link rm.CustomControl.verify|verify} messages.
         * @param message CustomControl message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.ICustomControl, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CustomControl message, length delimited. Does not implicitly {@link rm.CustomControl.verify|verify} messages.
         * @param message CustomControl message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.ICustomControl, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CustomControl message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CustomControl
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.CustomControl;

        /**
         * Decodes a CustomControl message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CustomControl
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.CustomControl;

        /**
         * Verifies a CustomControl message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CustomControl message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CustomControl
         */
        public static fromObject(object: { [k: string]: any }): rm.CustomControl;

        /**
         * Creates a plain object from a CustomControl message. Also converts values to other types if specified.
         * @param message CustomControl
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.CustomControl, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CustomControl to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CustomControl
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

        /** GlobalUnitStatus enemyBaseHealth */
        enemyBaseHealth?: (number|null);

        /** GlobalUnitStatus enemyBaseStatus */
        enemyBaseStatus?: (number|null);

        /** GlobalUnitStatus enemyBaseShield */
        enemyBaseShield?: (number|null);

        /** GlobalUnitStatus enemyOutpostHealth */
        enemyOutpostHealth?: (number|null);

        /** GlobalUnitStatus enemyOutpostStatus */
        enemyOutpostStatus?: (number|null);

        /** GlobalUnitStatus robotHealth */
        robotHealth?: (number[]|null);

        /** GlobalUnitStatus robotBullets */
        robotBullets?: (number[]|null);

        /** GlobalUnitStatus totalDamageAlly */
        totalDamageAlly?: (number|null);

        /** GlobalUnitStatus totalDamageEnemy */
        totalDamageEnemy?: (number|null);
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

        /** GlobalUnitStatus enemyBaseHealth. */
        public enemyBaseHealth: number;

        /** GlobalUnitStatus enemyBaseStatus. */
        public enemyBaseStatus: number;

        /** GlobalUnitStatus enemyBaseShield. */
        public enemyBaseShield: number;

        /** GlobalUnitStatus enemyOutpostHealth. */
        public enemyOutpostHealth: number;

        /** GlobalUnitStatus enemyOutpostStatus. */
        public enemyOutpostStatus: number;

        /** GlobalUnitStatus robotHealth. */
        public robotHealth: number[];

        /** GlobalUnitStatus robotBullets. */
        public robotBullets: number[];

        /** GlobalUnitStatus totalDamageAlly. */
        public totalDamageAlly: number;

        /** GlobalUnitStatus totalDamageEnemy. */
        public totalDamageEnemy: number;

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
        public eventId?: (number|null);

        /** Event param. */
        public param?: (string|null);

        /** Event _eventId. */
        public _eventId?: "eventId";

        /** Event _param. */
        public _param?: "param";

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

        /** RobotInjuryStat offlineDamage */
        offlineDamage?: (number|null);

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

        /** RobotInjuryStat offlineDamage. */
        public offlineDamage: number;

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

        /** RobotModuleStatus laserDetectionModule */
        laserDetectionModule?: (number|null);
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

        /** RobotModuleStatus laserDetectionModule. */
        public laserDetectionModule: number;

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

        /** RobotPosition robotId */
        robotId?: (number|null);
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

        /** RobotPosition robotId. */
        public robotId: number;

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
        public penaltyType?: (number|null);

        /** PenaltyInfo penaltyEffectSec. */
        public penaltyEffectSec?: (number|null);

        /** PenaltyInfo totalPenaltyNum. */
        public totalPenaltyNum?: (number|null);

        /** PenaltyInfo _penaltyType. */
        public _penaltyType?: "penaltyType";

        /** PenaltyInfo _penaltyEffectSec. */
        public _penaltyEffectSec?: "penaltyEffectSec";

        /** PenaltyInfo _totalPenaltyNum. */
        public _totalPenaltyNum?: "totalPenaltyNum";

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

    /** Properties of a RadarSingleRobotInfo. */
    interface IRadarSingleRobotInfo {

        /** RadarSingleRobotInfo targetPosX */
        targetPosX?: (number|null);

        /** RadarSingleRobotInfo targetPosY */
        targetPosY?: (number|null);

        /** RadarSingleRobotInfo isHighLight */
        isHighLight?: (number|null);
    }

    /** Represents a RadarSingleRobotInfo. */
    class RadarSingleRobotInfo implements IRadarSingleRobotInfo {

        /**
         * Constructs a new RadarSingleRobotInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IRadarSingleRobotInfo);

        /** RadarSingleRobotInfo targetPosX. */
        public targetPosX: number;

        /** RadarSingleRobotInfo targetPosY. */
        public targetPosY: number;

        /** RadarSingleRobotInfo isHighLight. */
        public isHighLight: number;

        /**
         * Creates a new RadarSingleRobotInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RadarSingleRobotInfo instance
         */
        public static create(properties?: rm.IRadarSingleRobotInfo): rm.RadarSingleRobotInfo;

        /**
         * Encodes the specified RadarSingleRobotInfo message. Does not implicitly {@link rm.RadarSingleRobotInfo.verify|verify} messages.
         * @param message RadarSingleRobotInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IRadarSingleRobotInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RadarSingleRobotInfo message, length delimited. Does not implicitly {@link rm.RadarSingleRobotInfo.verify|verify} messages.
         * @param message RadarSingleRobotInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IRadarSingleRobotInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RadarSingleRobotInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RadarSingleRobotInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.RadarSingleRobotInfo;

        /**
         * Decodes a RadarSingleRobotInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RadarSingleRobotInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.RadarSingleRobotInfo;

        /**
         * Verifies a RadarSingleRobotInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RadarSingleRobotInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RadarSingleRobotInfo
         */
        public static fromObject(object: { [k: string]: any }): rm.RadarSingleRobotInfo;

        /**
         * Creates a plain object from a RadarSingleRobotInfo message. Also converts values to other types if specified.
         * @param message RadarSingleRobotInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.RadarSingleRobotInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RadarSingleRobotInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RadarSingleRobotInfo
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RadarInfoToClient. */
    interface IRadarInfoToClient {

        /** RadarInfoToClient RadarSingleRobotInfo */
        RadarSingleRobotInfo?: (rm.IRadarSingleRobotInfo[]|null);
    }

    /** Represents a RadarInfoToClient. */
    class RadarInfoToClient implements IRadarInfoToClient {

        /**
         * Constructs a new RadarInfoToClient.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IRadarInfoToClient);

        /** RadarInfoToClient RadarSingleRobotInfo. */
        public RadarSingleRobotInfo: rm.IRadarSingleRobotInfo[];

        /**
         * Creates a new RadarInfoToClient instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RadarInfoToClient instance
         */
        public static create(properties?: rm.IRadarInfoToClient): rm.RadarInfoToClient;

        /**
         * Encodes the specified RadarInfoToClient message. Does not implicitly {@link rm.RadarInfoToClient.verify|verify} messages.
         * @param message RadarInfoToClient message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IRadarInfoToClient, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RadarInfoToClient message, length delimited. Does not implicitly {@link rm.RadarInfoToClient.verify|verify} messages.
         * @param message RadarInfoToClient message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IRadarInfoToClient, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RadarInfoToClient message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RadarInfoToClient
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.RadarInfoToClient;

        /**
         * Decodes a RadarInfoToClient message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RadarInfoToClient
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.RadarInfoToClient;

        /**
         * Verifies a RadarInfoToClient message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RadarInfoToClient message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RadarInfoToClient
         */
        public static fromObject(object: { [k: string]: any }): rm.RadarInfoToClient;

        /**
         * Creates a plain object from a RadarInfoToClient message. Also converts values to other types if specified.
         * @param message RadarInfoToClient
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.RadarInfoToClient, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RadarInfoToClient to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RadarInfoToClient
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

        /** TechCoreMotionStateSync basicState */
        basicState?: (number|null);

        /** TechCoreMotionStateSync putinState */
        putinState?: (number|null);

        /** TechCoreMotionStateSync moveState */
        moveState?: (number|null);

        /** TechCoreMotionStateSync rotateState */
        rotateState?: (number|null);

        /** TechCoreMotionStateSync enemyCoreStatus */
        enemyCoreStatus?: (number|null);

        /** TechCoreMotionStateSync remainTimeAll */
        remainTimeAll?: (number|null);

        /** TechCoreMotionStateSync remainTimeStep */
        remainTimeStep?: (number|null);
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

        /** TechCoreMotionStateSync basicState. */
        public basicState: number;

        /** TechCoreMotionStateSync putinState. */
        public putinState: number;

        /** TechCoreMotionStateSync moveState. */
        public moveState: number;

        /** TechCoreMotionStateSync rotateState. */
        public rotateState: number;

        /** TechCoreMotionStateSync enemyCoreStatus. */
        public enemyCoreStatus: number;

        /** TechCoreMotionStateSync remainTimeAll. */
        public remainTimeAll: number;

        /** TechCoreMotionStateSync remainTimeStep. */
        public remainTimeStep: number;

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

    /** Properties of a RobotPerformanceSelectionCommand. */
    interface IRobotPerformanceSelectionCommand {

        /** RobotPerformanceSelectionCommand shooter */
        shooter?: (number|null);

        /** RobotPerformanceSelectionCommand chassis */
        chassis?: (number|null);

        /** RobotPerformanceSelectionCommand sentryControl */
        sentryControl?: (number|null);
    }

    /** Represents a RobotPerformanceSelectionCommand. */
    class RobotPerformanceSelectionCommand implements IRobotPerformanceSelectionCommand {

        /**
         * Constructs a new RobotPerformanceSelectionCommand.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IRobotPerformanceSelectionCommand);

        /** RobotPerformanceSelectionCommand shooter. */
        public shooter?: (number|null);

        /** RobotPerformanceSelectionCommand chassis. */
        public chassis?: (number|null);

        /** RobotPerformanceSelectionCommand sentryControl. */
        public sentryControl?: (number|null);

        /** RobotPerformanceSelectionCommand _shooter. */
        public _shooter?: "shooter";

        /** RobotPerformanceSelectionCommand _chassis. */
        public _chassis?: "chassis";

        /** RobotPerformanceSelectionCommand _sentryControl. */
        public _sentryControl?: "sentryControl";

        /**
         * Creates a new RobotPerformanceSelectionCommand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RobotPerformanceSelectionCommand instance
         */
        public static create(properties?: rm.IRobotPerformanceSelectionCommand): rm.RobotPerformanceSelectionCommand;

        /**
         * Encodes the specified RobotPerformanceSelectionCommand message. Does not implicitly {@link rm.RobotPerformanceSelectionCommand.verify|verify} messages.
         * @param message RobotPerformanceSelectionCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IRobotPerformanceSelectionCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RobotPerformanceSelectionCommand message, length delimited. Does not implicitly {@link rm.RobotPerformanceSelectionCommand.verify|verify} messages.
         * @param message RobotPerformanceSelectionCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IRobotPerformanceSelectionCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RobotPerformanceSelectionCommand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RobotPerformanceSelectionCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.RobotPerformanceSelectionCommand;

        /**
         * Decodes a RobotPerformanceSelectionCommand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RobotPerformanceSelectionCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.RobotPerformanceSelectionCommand;

        /**
         * Verifies a RobotPerformanceSelectionCommand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RobotPerformanceSelectionCommand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RobotPerformanceSelectionCommand
         */
        public static fromObject(object: { [k: string]: any }): rm.RobotPerformanceSelectionCommand;

        /**
         * Creates a plain object from a RobotPerformanceSelectionCommand message. Also converts values to other types if specified.
         * @param message RobotPerformanceSelectionCommand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.RobotPerformanceSelectionCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RobotPerformanceSelectionCommand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RobotPerformanceSelectionCommand
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RobotPerformanceSelectionSync. */
    interface IRobotPerformanceSelectionSync {

        /** RobotPerformanceSelectionSync shooter */
        shooter?: (number|null);

        /** RobotPerformanceSelectionSync chassis */
        chassis?: (number|null);

        /** RobotPerformanceSelectionSync sentryControl */
        sentryControl?: (number|null);
    }

    /** Represents a RobotPerformanceSelectionSync. */
    class RobotPerformanceSelectionSync implements IRobotPerformanceSelectionSync {

        /**
         * Constructs a new RobotPerformanceSelectionSync.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IRobotPerformanceSelectionSync);

        /** RobotPerformanceSelectionSync shooter. */
        public shooter: number;

        /** RobotPerformanceSelectionSync chassis. */
        public chassis: number;

        /** RobotPerformanceSelectionSync sentryControl. */
        public sentryControl: number;

        /**
         * Creates a new RobotPerformanceSelectionSync instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RobotPerformanceSelectionSync instance
         */
        public static create(properties?: rm.IRobotPerformanceSelectionSync): rm.RobotPerformanceSelectionSync;

        /**
         * Encodes the specified RobotPerformanceSelectionSync message. Does not implicitly {@link rm.RobotPerformanceSelectionSync.verify|verify} messages.
         * @param message RobotPerformanceSelectionSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IRobotPerformanceSelectionSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RobotPerformanceSelectionSync message, length delimited. Does not implicitly {@link rm.RobotPerformanceSelectionSync.verify|verify} messages.
         * @param message RobotPerformanceSelectionSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IRobotPerformanceSelectionSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RobotPerformanceSelectionSync message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RobotPerformanceSelectionSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.RobotPerformanceSelectionSync;

        /**
         * Decodes a RobotPerformanceSelectionSync message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RobotPerformanceSelectionSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.RobotPerformanceSelectionSync;

        /**
         * Verifies a RobotPerformanceSelectionSync message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RobotPerformanceSelectionSync message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RobotPerformanceSelectionSync
         */
        public static fromObject(object: { [k: string]: any }): rm.RobotPerformanceSelectionSync;

        /**
         * Creates a plain object from a RobotPerformanceSelectionSync message. Also converts values to other types if specified.
         * @param message RobotPerformanceSelectionSync
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.RobotPerformanceSelectionSync, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RobotPerformanceSelectionSync to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RobotPerformanceSelectionSync
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CommonCommand. */
    interface ICommonCommand {

        /** CommonCommand cmdType */
        cmdType?: (number|null);

        /** CommonCommand param */
        param?: (number|null);
    }

    /** Represents a CommonCommand. */
    class CommonCommand implements ICommonCommand {

        /**
         * Constructs a new CommonCommand.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.ICommonCommand);

        /** CommonCommand cmdType. */
        public cmdType: number;

        /** CommonCommand param. */
        public param: number;

        /**
         * Creates a new CommonCommand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommonCommand instance
         */
        public static create(properties?: rm.ICommonCommand): rm.CommonCommand;

        /**
         * Encodes the specified CommonCommand message. Does not implicitly {@link rm.CommonCommand.verify|verify} messages.
         * @param message CommonCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.ICommonCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommonCommand message, length delimited. Does not implicitly {@link rm.CommonCommand.verify|verify} messages.
         * @param message CommonCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.ICommonCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommonCommand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommonCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.CommonCommand;

        /**
         * Decodes a CommonCommand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommonCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.CommonCommand;

        /**
         * Verifies a CommonCommand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommonCommand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommonCommand
         */
        public static fromObject(object: { [k: string]: any }): rm.CommonCommand;

        /**
         * Creates a plain object from a CommonCommand message. Also converts values to other types if specified.
         * @param message CommonCommand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.CommonCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommonCommand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CommonCommand
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a HeroDeployModeEventCommand. */
    interface IHeroDeployModeEventCommand {

        /** HeroDeployModeEventCommand mode */
        mode?: (number|null);
    }

    /** Represents a HeroDeployModeEventCommand. */
    class HeroDeployModeEventCommand implements IHeroDeployModeEventCommand {

        /**
         * Constructs a new HeroDeployModeEventCommand.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IHeroDeployModeEventCommand);

        /** HeroDeployModeEventCommand mode. */
        public mode: number;

        /**
         * Creates a new HeroDeployModeEventCommand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HeroDeployModeEventCommand instance
         */
        public static create(properties?: rm.IHeroDeployModeEventCommand): rm.HeroDeployModeEventCommand;

        /**
         * Encodes the specified HeroDeployModeEventCommand message. Does not implicitly {@link rm.HeroDeployModeEventCommand.verify|verify} messages.
         * @param message HeroDeployModeEventCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IHeroDeployModeEventCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HeroDeployModeEventCommand message, length delimited. Does not implicitly {@link rm.HeroDeployModeEventCommand.verify|verify} messages.
         * @param message HeroDeployModeEventCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IHeroDeployModeEventCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HeroDeployModeEventCommand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HeroDeployModeEventCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.HeroDeployModeEventCommand;

        /**
         * Decodes a HeroDeployModeEventCommand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HeroDeployModeEventCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.HeroDeployModeEventCommand;

        /**
         * Verifies a HeroDeployModeEventCommand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HeroDeployModeEventCommand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HeroDeployModeEventCommand
         */
        public static fromObject(object: { [k: string]: any }): rm.HeroDeployModeEventCommand;

        /**
         * Creates a plain object from a HeroDeployModeEventCommand message. Also converts values to other types if specified.
         * @param message HeroDeployModeEventCommand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.HeroDeployModeEventCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HeroDeployModeEventCommand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for HeroDeployModeEventCommand
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a DeployModeStatusSync. */
    interface IDeployModeStatusSync {

        /** DeployModeStatusSync status */
        status?: (number|null);
    }

    /** Represents a DeployModeStatusSync. */
    class DeployModeStatusSync implements IDeployModeStatusSync {

        /**
         * Constructs a new DeployModeStatusSync.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IDeployModeStatusSync);

        /** DeployModeStatusSync status. */
        public status: number;

        /**
         * Creates a new DeployModeStatusSync instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DeployModeStatusSync instance
         */
        public static create(properties?: rm.IDeployModeStatusSync): rm.DeployModeStatusSync;

        /**
         * Encodes the specified DeployModeStatusSync message. Does not implicitly {@link rm.DeployModeStatusSync.verify|verify} messages.
         * @param message DeployModeStatusSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IDeployModeStatusSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DeployModeStatusSync message, length delimited. Does not implicitly {@link rm.DeployModeStatusSync.verify|verify} messages.
         * @param message DeployModeStatusSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IDeployModeStatusSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DeployModeStatusSync message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DeployModeStatusSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.DeployModeStatusSync;

        /**
         * Decodes a DeployModeStatusSync message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DeployModeStatusSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.DeployModeStatusSync;

        /**
         * Verifies a DeployModeStatusSync message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DeployModeStatusSync message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DeployModeStatusSync
         */
        public static fromObject(object: { [k: string]: any }): rm.DeployModeStatusSync;

        /**
         * Creates a plain object from a DeployModeStatusSync message. Also converts values to other types if specified.
         * @param message DeployModeStatusSync
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.DeployModeStatusSync, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DeployModeStatusSync to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DeployModeStatusSync
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RuneActivateCommand. */
    interface IRuneActivateCommand {

        /** RuneActivateCommand activate */
        activate?: (number|null);
    }

    /** Represents a RuneActivateCommand. */
    class RuneActivateCommand implements IRuneActivateCommand {

        /**
         * Constructs a new RuneActivateCommand.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IRuneActivateCommand);

        /** RuneActivateCommand activate. */
        public activate: number;

        /**
         * Creates a new RuneActivateCommand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RuneActivateCommand instance
         */
        public static create(properties?: rm.IRuneActivateCommand): rm.RuneActivateCommand;

        /**
         * Encodes the specified RuneActivateCommand message. Does not implicitly {@link rm.RuneActivateCommand.verify|verify} messages.
         * @param message RuneActivateCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IRuneActivateCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RuneActivateCommand message, length delimited. Does not implicitly {@link rm.RuneActivateCommand.verify|verify} messages.
         * @param message RuneActivateCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IRuneActivateCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RuneActivateCommand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RuneActivateCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.RuneActivateCommand;

        /**
         * Decodes a RuneActivateCommand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RuneActivateCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.RuneActivateCommand;

        /**
         * Verifies a RuneActivateCommand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RuneActivateCommand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RuneActivateCommand
         */
        public static fromObject(object: { [k: string]: any }): rm.RuneActivateCommand;

        /**
         * Creates a plain object from a RuneActivateCommand message. Also converts values to other types if specified.
         * @param message RuneActivateCommand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.RuneActivateCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RuneActivateCommand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RuneActivateCommand
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RuneStatusSync. */
    interface IRuneStatusSync {

        /** RuneStatusSync runeStatus */
        runeStatus?: (number|null);

        /** RuneStatusSync activatedArms */
        activatedArms?: (number|null);

        /** RuneStatusSync averageRings */
        averageRings?: (number|null);
    }

    /** Represents a RuneStatusSync. */
    class RuneStatusSync implements IRuneStatusSync {

        /**
         * Constructs a new RuneStatusSync.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IRuneStatusSync);

        /** RuneStatusSync runeStatus. */
        public runeStatus: number;

        /** RuneStatusSync activatedArms. */
        public activatedArms: number;

        /** RuneStatusSync averageRings. */
        public averageRings: number;

        /**
         * Creates a new RuneStatusSync instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RuneStatusSync instance
         */
        public static create(properties?: rm.IRuneStatusSync): rm.RuneStatusSync;

        /**
         * Encodes the specified RuneStatusSync message. Does not implicitly {@link rm.RuneStatusSync.verify|verify} messages.
         * @param message RuneStatusSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IRuneStatusSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RuneStatusSync message, length delimited. Does not implicitly {@link rm.RuneStatusSync.verify|verify} messages.
         * @param message RuneStatusSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IRuneStatusSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RuneStatusSync message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RuneStatusSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.RuneStatusSync;

        /**
         * Decodes a RuneStatusSync message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RuneStatusSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.RuneStatusSync;

        /**
         * Verifies a RuneStatusSync message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RuneStatusSync message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RuneStatusSync
         */
        public static fromObject(object: { [k: string]: any }): rm.RuneStatusSync;

        /**
         * Creates a plain object from a RuneStatusSync message. Also converts values to other types if specified.
         * @param message RuneStatusSync
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.RuneStatusSync, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RuneStatusSync to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RuneStatusSync
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SentryStatusSync. */
    interface ISentryStatusSync {

        /** SentryStatusSync postureId */
        postureId?: (number|null);

        /** SentryStatusSync isWeakened */
        isWeakened?: (boolean|null);
    }

    /** Represents a SentryStatusSync. */
    class SentryStatusSync implements ISentryStatusSync {

        /**
         * Constructs a new SentryStatusSync.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.ISentryStatusSync);

        /** SentryStatusSync postureId. */
        public postureId: number;

        /** SentryStatusSync isWeakened. */
        public isWeakened: boolean;

        /**
         * Creates a new SentryStatusSync instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SentryStatusSync instance
         */
        public static create(properties?: rm.ISentryStatusSync): rm.SentryStatusSync;

        /**
         * Encodes the specified SentryStatusSync message. Does not implicitly {@link rm.SentryStatusSync.verify|verify} messages.
         * @param message SentryStatusSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.ISentryStatusSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SentryStatusSync message, length delimited. Does not implicitly {@link rm.SentryStatusSync.verify|verify} messages.
         * @param message SentryStatusSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.ISentryStatusSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SentryStatusSync message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SentryStatusSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.SentryStatusSync;

        /**
         * Decodes a SentryStatusSync message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SentryStatusSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.SentryStatusSync;

        /**
         * Verifies a SentryStatusSync message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SentryStatusSync message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SentryStatusSync
         */
        public static fromObject(object: { [k: string]: any }): rm.SentryStatusSync;

        /**
         * Creates a plain object from a SentryStatusSync message. Also converts values to other types if specified.
         * @param message SentryStatusSync
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.SentryStatusSync, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SentryStatusSync to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SentryStatusSync
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a DartCommand. */
    interface IDartCommand {

        /** DartCommand targetId */
        targetId?: (number|null);

        /** DartCommand open */
        open?: (boolean|null);

        /** DartCommand launchConfirm */
        launchConfirm?: (boolean|null);
    }

    /** Represents a DartCommand. */
    class DartCommand implements IDartCommand {

        /**
         * Constructs a new DartCommand.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IDartCommand);

        /** DartCommand targetId. */
        public targetId: number;

        /** DartCommand open. */
        public open: boolean;

        /** DartCommand launchConfirm. */
        public launchConfirm: boolean;

        /**
         * Creates a new DartCommand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DartCommand instance
         */
        public static create(properties?: rm.IDartCommand): rm.DartCommand;

        /**
         * Encodes the specified DartCommand message. Does not implicitly {@link rm.DartCommand.verify|verify} messages.
         * @param message DartCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IDartCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DartCommand message, length delimited. Does not implicitly {@link rm.DartCommand.verify|verify} messages.
         * @param message DartCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IDartCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DartCommand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DartCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.DartCommand;

        /**
         * Decodes a DartCommand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DartCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.DartCommand;

        /**
         * Verifies a DartCommand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DartCommand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DartCommand
         */
        public static fromObject(object: { [k: string]: any }): rm.DartCommand;

        /**
         * Creates a plain object from a DartCommand message. Also converts values to other types if specified.
         * @param message DartCommand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.DartCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DartCommand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DartCommand
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a DartSelectTargetStatusSync. */
    interface IDartSelectTargetStatusSync {

        /** DartSelectTargetStatusSync targetId */
        targetId?: (number|null);

        /** DartSelectTargetStatusSync open */
        open?: (number|null);
    }

    /** Represents a DartSelectTargetStatusSync. */
    class DartSelectTargetStatusSync implements IDartSelectTargetStatusSync {

        /**
         * Constructs a new DartSelectTargetStatusSync.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IDartSelectTargetStatusSync);

        /** DartSelectTargetStatusSync targetId. */
        public targetId: number;

        /** DartSelectTargetStatusSync open. */
        public open: number;

        /**
         * Creates a new DartSelectTargetStatusSync instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DartSelectTargetStatusSync instance
         */
        public static create(properties?: rm.IDartSelectTargetStatusSync): rm.DartSelectTargetStatusSync;

        /**
         * Encodes the specified DartSelectTargetStatusSync message. Does not implicitly {@link rm.DartSelectTargetStatusSync.verify|verify} messages.
         * @param message DartSelectTargetStatusSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IDartSelectTargetStatusSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DartSelectTargetStatusSync message, length delimited. Does not implicitly {@link rm.DartSelectTargetStatusSync.verify|verify} messages.
         * @param message DartSelectTargetStatusSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IDartSelectTargetStatusSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DartSelectTargetStatusSync message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DartSelectTargetStatusSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.DartSelectTargetStatusSync;

        /**
         * Decodes a DartSelectTargetStatusSync message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DartSelectTargetStatusSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.DartSelectTargetStatusSync;

        /**
         * Verifies a DartSelectTargetStatusSync message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DartSelectTargetStatusSync message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DartSelectTargetStatusSync
         */
        public static fromObject(object: { [k: string]: any }): rm.DartSelectTargetStatusSync;

        /**
         * Creates a plain object from a DartSelectTargetStatusSync message. Also converts values to other types if specified.
         * @param message DartSelectTargetStatusSync
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.DartSelectTargetStatusSync, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DartSelectTargetStatusSync to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DartSelectTargetStatusSync
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SentryCtrlCommand. */
    interface ISentryCtrlCommand {

        /** SentryCtrlCommand commandId */
        commandId?: (number|null);
    }

    /** Represents a SentryCtrlCommand. */
    class SentryCtrlCommand implements ISentryCtrlCommand {

        /**
         * Constructs a new SentryCtrlCommand.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.ISentryCtrlCommand);

        /** SentryCtrlCommand commandId. */
        public commandId: number;

        /**
         * Creates a new SentryCtrlCommand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SentryCtrlCommand instance
         */
        public static create(properties?: rm.ISentryCtrlCommand): rm.SentryCtrlCommand;

        /**
         * Encodes the specified SentryCtrlCommand message. Does not implicitly {@link rm.SentryCtrlCommand.verify|verify} messages.
         * @param message SentryCtrlCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.ISentryCtrlCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SentryCtrlCommand message, length delimited. Does not implicitly {@link rm.SentryCtrlCommand.verify|verify} messages.
         * @param message SentryCtrlCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.ISentryCtrlCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SentryCtrlCommand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SentryCtrlCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.SentryCtrlCommand;

        /**
         * Decodes a SentryCtrlCommand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SentryCtrlCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.SentryCtrlCommand;

        /**
         * Verifies a SentryCtrlCommand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SentryCtrlCommand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SentryCtrlCommand
         */
        public static fromObject(object: { [k: string]: any }): rm.SentryCtrlCommand;

        /**
         * Creates a plain object from a SentryCtrlCommand message. Also converts values to other types if specified.
         * @param message SentryCtrlCommand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.SentryCtrlCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SentryCtrlCommand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SentryCtrlCommand
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SentryCtrlResult. */
    interface ISentryCtrlResult {

        /** SentryCtrlResult commandId */
        commandId?: (number|null);

        /** SentryCtrlResult resultCode */
        resultCode?: (number|null);
    }

    /** Represents a SentryCtrlResult. */
    class SentryCtrlResult implements ISentryCtrlResult {

        /**
         * Constructs a new SentryCtrlResult.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.ISentryCtrlResult);

        /** SentryCtrlResult commandId. */
        public commandId: number;

        /** SentryCtrlResult resultCode. */
        public resultCode: number;

        /**
         * Creates a new SentryCtrlResult instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SentryCtrlResult instance
         */
        public static create(properties?: rm.ISentryCtrlResult): rm.SentryCtrlResult;

        /**
         * Encodes the specified SentryCtrlResult message. Does not implicitly {@link rm.SentryCtrlResult.verify|verify} messages.
         * @param message SentryCtrlResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.ISentryCtrlResult, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SentryCtrlResult message, length delimited. Does not implicitly {@link rm.SentryCtrlResult.verify|verify} messages.
         * @param message SentryCtrlResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.ISentryCtrlResult, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SentryCtrlResult message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SentryCtrlResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.SentryCtrlResult;

        /**
         * Decodes a SentryCtrlResult message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SentryCtrlResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.SentryCtrlResult;

        /**
         * Verifies a SentryCtrlResult message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SentryCtrlResult message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SentryCtrlResult
         */
        public static fromObject(object: { [k: string]: any }): rm.SentryCtrlResult;

        /**
         * Creates a plain object from a SentryCtrlResult message. Also converts values to other types if specified.
         * @param message SentryCtrlResult
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.SentryCtrlResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SentryCtrlResult to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SentryCtrlResult
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AirSupportCommand. */
    interface IAirSupportCommand {

        /** AirSupportCommand commandId */
        commandId?: (number|null);
    }

    /** Represents an AirSupportCommand. */
    class AirSupportCommand implements IAirSupportCommand {

        /**
         * Constructs a new AirSupportCommand.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IAirSupportCommand);

        /** AirSupportCommand commandId. */
        public commandId: number;

        /**
         * Creates a new AirSupportCommand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AirSupportCommand instance
         */
        public static create(properties?: rm.IAirSupportCommand): rm.AirSupportCommand;

        /**
         * Encodes the specified AirSupportCommand message. Does not implicitly {@link rm.AirSupportCommand.verify|verify} messages.
         * @param message AirSupportCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IAirSupportCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AirSupportCommand message, length delimited. Does not implicitly {@link rm.AirSupportCommand.verify|verify} messages.
         * @param message AirSupportCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IAirSupportCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AirSupportCommand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AirSupportCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.AirSupportCommand;

        /**
         * Decodes an AirSupportCommand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AirSupportCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.AirSupportCommand;

        /**
         * Verifies an AirSupportCommand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AirSupportCommand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AirSupportCommand
         */
        public static fromObject(object: { [k: string]: any }): rm.AirSupportCommand;

        /**
         * Creates a plain object from an AirSupportCommand message. Also converts values to other types if specified.
         * @param message AirSupportCommand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.AirSupportCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AirSupportCommand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AirSupportCommand
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AirSupportStatusSync. */
    interface IAirSupportStatusSync {

        /** AirSupportStatusSync airsupportStatus */
        airsupportStatus?: (number|null);

        /** AirSupportStatusSync leftTime */
        leftTime?: (number|null);

        /** AirSupportStatusSync costCoins */
        costCoins?: (number|null);

        /** AirSupportStatusSync isBeingTargeted */
        isBeingTargeted?: (number|null);

        /** AirSupportStatusSync shooterStatus */
        shooterStatus?: (number|null);
    }

    /** Represents an AirSupportStatusSync. */
    class AirSupportStatusSync implements IAirSupportStatusSync {

        /**
         * Constructs a new AirSupportStatusSync.
         * @param [properties] Properties to set
         */
        constructor(properties?: rm.IAirSupportStatusSync);

        /** AirSupportStatusSync airsupportStatus. */
        public airsupportStatus: number;

        /** AirSupportStatusSync leftTime. */
        public leftTime: number;

        /** AirSupportStatusSync costCoins. */
        public costCoins: number;

        /** AirSupportStatusSync isBeingTargeted. */
        public isBeingTargeted: number;

        /** AirSupportStatusSync shooterStatus. */
        public shooterStatus: number;

        /**
         * Creates a new AirSupportStatusSync instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AirSupportStatusSync instance
         */
        public static create(properties?: rm.IAirSupportStatusSync): rm.AirSupportStatusSync;

        /**
         * Encodes the specified AirSupportStatusSync message. Does not implicitly {@link rm.AirSupportStatusSync.verify|verify} messages.
         * @param message AirSupportStatusSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rm.IAirSupportStatusSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AirSupportStatusSync message, length delimited. Does not implicitly {@link rm.AirSupportStatusSync.verify|verify} messages.
         * @param message AirSupportStatusSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rm.IAirSupportStatusSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AirSupportStatusSync message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AirSupportStatusSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rm.AirSupportStatusSync;

        /**
         * Decodes an AirSupportStatusSync message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AirSupportStatusSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rm.AirSupportStatusSync;

        /**
         * Verifies an AirSupportStatusSync message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AirSupportStatusSync message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AirSupportStatusSync
         */
        public static fromObject(object: { [k: string]: any }): rm.AirSupportStatusSync;

        /**
         * Creates a plain object from an AirSupportStatusSync message. Also converts values to other types if specified.
         * @param message AirSupportStatusSync
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rm.AirSupportStatusSync, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AirSupportStatusSync to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AirSupportStatusSync
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
