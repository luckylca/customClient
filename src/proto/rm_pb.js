/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import $protobuf from "protobufjs/minimal.js";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const rm = $root.rm = (() => {

    /**
     * Namespace rm.
     * @exports rm
     * @namespace
     */
    const rm = {};

    rm.RemoteControl = (function () {

        /**
         * Properties of a RemoteControl.
         * @memberof rm
         * @interface IRemoteControl
         * @property {number|null} [mouseX] RemoteControl mouseX
         * @property {number|null} [mouseY] RemoteControl mouseY
         * @property {number|null} [mouseZ] RemoteControl mouseZ
         * @property {boolean|null} [leftButtonDown] RemoteControl leftButtonDown
         * @property {boolean|null} [rightButtonDown] RemoteControl rightButtonDown
         * @property {number|null} [keyboardValue] RemoteControl keyboardValue
         * @property {boolean|null} [midButtonDown] RemoteControl midButtonDown
         * @property {Uint8Array|null} [data] RemoteControl data
         */

        /**
         * Constructs a new RemoteControl.
         * @memberof rm
         * @classdesc Represents a RemoteControl.
         * @implements IRemoteControl
         * @constructor
         * @param {rm.IRemoteControl=} [properties] Properties to set
         */
        function RemoteControl(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RemoteControl mouseX.
         * @member {number} mouseX
         * @memberof rm.RemoteControl
         * @instance
         */
        RemoteControl.prototype.mouseX = 0;

        /**
         * RemoteControl mouseY.
         * @member {number} mouseY
         * @memberof rm.RemoteControl
         * @instance
         */
        RemoteControl.prototype.mouseY = 0;

        /**
         * RemoteControl mouseZ.
         * @member {number} mouseZ
         * @memberof rm.RemoteControl
         * @instance
         */
        RemoteControl.prototype.mouseZ = 0;

        /**
         * RemoteControl leftButtonDown.
         * @member {boolean} leftButtonDown
         * @memberof rm.RemoteControl
         * @instance
         */
        RemoteControl.prototype.leftButtonDown = false;

        /**
         * RemoteControl rightButtonDown.
         * @member {boolean} rightButtonDown
         * @memberof rm.RemoteControl
         * @instance
         */
        RemoteControl.prototype.rightButtonDown = false;

        /**
         * RemoteControl keyboardValue.
         * @member {number} keyboardValue
         * @memberof rm.RemoteControl
         * @instance
         */
        RemoteControl.prototype.keyboardValue = 0;

        /**
         * RemoteControl midButtonDown.
         * @member {boolean} midButtonDown
         * @memberof rm.RemoteControl
         * @instance
         */
        RemoteControl.prototype.midButtonDown = false;

        /**
         * RemoteControl data.
         * @member {Uint8Array} data
         * @memberof rm.RemoteControl
         * @instance
         */
        RemoteControl.prototype.data = $util.newBuffer([]);

        /**
         * Creates a new RemoteControl instance using the specified properties.
         * @function create
         * @memberof rm.RemoteControl
         * @static
         * @param {rm.IRemoteControl=} [properties] Properties to set
         * @returns {rm.RemoteControl} RemoteControl instance
         */
        RemoteControl.create = function create(properties) {
            return new RemoteControl(properties);
        };

        /**
         * Encodes the specified RemoteControl message. Does not implicitly {@link rm.RemoteControl.verify|verify} messages.
         * @function encode
         * @memberof rm.RemoteControl
         * @static
         * @param {rm.IRemoteControl} message RemoteControl message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteControl.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.mouseX != null && Object.hasOwnProperty.call(message, "mouseX"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.mouseX);
            if (message.mouseY != null && Object.hasOwnProperty.call(message, "mouseY"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.mouseY);
            if (message.mouseZ != null && Object.hasOwnProperty.call(message, "mouseZ"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.mouseZ);
            if (message.leftButtonDown != null && Object.hasOwnProperty.call(message, "leftButtonDown"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.leftButtonDown);
            if (message.rightButtonDown != null && Object.hasOwnProperty.call(message, "rightButtonDown"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.rightButtonDown);
            if (message.keyboardValue != null && Object.hasOwnProperty.call(message, "keyboardValue"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.keyboardValue);
            if (message.midButtonDown != null && Object.hasOwnProperty.call(message, "midButtonDown"))
                writer.uint32(/* id 7, wireType 0 =*/56).bool(message.midButtonDown);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.data);
            return writer;
        };

        /**
         * Encodes the specified RemoteControl message, length delimited. Does not implicitly {@link rm.RemoteControl.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.RemoteControl
         * @static
         * @param {rm.IRemoteControl} message RemoteControl message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteControl.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RemoteControl message from the specified reader or buffer.
         * @function decode
         * @memberof rm.RemoteControl
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.RemoteControl} RemoteControl
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteControl.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.RemoteControl();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.mouseX = reader.float();
                        break;
                    }
                    case 2: {
                        message.mouseY = reader.float();
                        break;
                    }
                    case 3: {
                        message.mouseZ = reader.float();
                        break;
                    }
                    case 4: {
                        message.leftButtonDown = reader.bool();
                        break;
                    }
                    case 5: {
                        message.rightButtonDown = reader.bool();
                        break;
                    }
                    case 6: {
                        message.keyboardValue = reader.uint32();
                        break;
                    }
                    case 7: {
                        message.midButtonDown = reader.bool();
                        break;
                    }
                    case 8: {
                        message.data = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a RemoteControl message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.RemoteControl
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.RemoteControl} RemoteControl
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteControl.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemoteControl message.
         * @function verify
         * @memberof rm.RemoteControl
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemoteControl.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.mouseX != null && message.hasOwnProperty("mouseX"))
                if (typeof message.mouseX !== "number")
                    return "mouseX: number expected";
            if (message.mouseY != null && message.hasOwnProperty("mouseY"))
                if (typeof message.mouseY !== "number")
                    return "mouseY: number expected";
            if (message.mouseZ != null && message.hasOwnProperty("mouseZ"))
                if (typeof message.mouseZ !== "number")
                    return "mouseZ: number expected";
            if (message.leftButtonDown != null && message.hasOwnProperty("leftButtonDown"))
                if (typeof message.leftButtonDown !== "boolean")
                    return "leftButtonDown: boolean expected";
            if (message.rightButtonDown != null && message.hasOwnProperty("rightButtonDown"))
                if (typeof message.rightButtonDown !== "boolean")
                    return "rightButtonDown: boolean expected";
            if (message.keyboardValue != null && message.hasOwnProperty("keyboardValue"))
                if (!$util.isInteger(message.keyboardValue))
                    return "keyboardValue: integer expected";
            if (message.midButtonDown != null && message.hasOwnProperty("midButtonDown"))
                if (typeof message.midButtonDown !== "boolean")
                    return "midButtonDown: boolean expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                    return "data: buffer expected";
            return null;
        };

        /**
         * Creates a RemoteControl message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.RemoteControl
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.RemoteControl} RemoteControl
         */
        RemoteControl.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.RemoteControl)
                return object;
            let message = new $root.rm.RemoteControl();
            if (object.mouseX != null)
                message.mouseX = Number(object.mouseX);
            if (object.mouseY != null)
                message.mouseY = Number(object.mouseY);
            if (object.mouseZ != null)
                message.mouseZ = Number(object.mouseZ);
            if (object.leftButtonDown != null)
                message.leftButtonDown = Boolean(object.leftButtonDown);
            if (object.rightButtonDown != null)
                message.rightButtonDown = Boolean(object.rightButtonDown);
            if (object.keyboardValue != null)
                message.keyboardValue = object.keyboardValue >>> 0;
            if (object.midButtonDown != null)
                message.midButtonDown = Boolean(object.midButtonDown);
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length >= 0)
                    message.data = object.data;
            return message;
        };

        /**
         * Creates a plain object from a RemoteControl message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.RemoteControl
         * @static
         * @param {rm.RemoteControl} message RemoteControl
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemoteControl.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.mouseX = 0;
                object.mouseY = 0;
                object.mouseZ = 0;
                object.leftButtonDown = false;
                object.rightButtonDown = false;
                object.keyboardValue = 0;
                object.midButtonDown = false;
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
            }
            if (message.mouseX != null && message.hasOwnProperty("mouseX"))
                object.mouseX = options.json && !isFinite(message.mouseX) ? String(message.mouseX) : message.mouseX;
            if (message.mouseY != null && message.hasOwnProperty("mouseY"))
                object.mouseY = options.json && !isFinite(message.mouseY) ? String(message.mouseY) : message.mouseY;
            if (message.mouseZ != null && message.hasOwnProperty("mouseZ"))
                object.mouseZ = options.json && !isFinite(message.mouseZ) ? String(message.mouseZ) : message.mouseZ;
            if (message.leftButtonDown != null && message.hasOwnProperty("leftButtonDown"))
                object.leftButtonDown = message.leftButtonDown;
            if (message.rightButtonDown != null && message.hasOwnProperty("rightButtonDown"))
                object.rightButtonDown = message.rightButtonDown;
            if (message.keyboardValue != null && message.hasOwnProperty("keyboardValue"))
                object.keyboardValue = message.keyboardValue;
            if (message.midButtonDown != null && message.hasOwnProperty("midButtonDown"))
                object.midButtonDown = message.midButtonDown;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            return object;
        };

        /**
         * Converts this RemoteControl to JSON.
         * @function toJSON
         * @memberof rm.RemoteControl
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemoteControl.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RemoteControl
         * @function getTypeUrl
         * @memberof rm.RemoteControl
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RemoteControl.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.RemoteControl";
        };

        return RemoteControl;
    })();

    rm.GameStatus = (function () {

        /**
         * Properties of a GameStatus.
         * @memberof rm
         * @interface IGameStatus
         * @property {number|null} [currentRound] GameStatus currentRound
         * @property {number|null} [totalRounds] GameStatus totalRounds
         * @property {number|null} [redScore] GameStatus redScore
         * @property {number|null} [blueScore] GameStatus blueScore
         * @property {number|null} [currentStage] GameStatus currentStage
         * @property {number|null} [stageCountdownSec] GameStatus stageCountdownSec
         * @property {number|null} [stageElapsedSec] GameStatus stageElapsedSec
         * @property {boolean|null} [isPaused] GameStatus isPaused
         */

        /**
         * Constructs a new GameStatus.
         * @memberof rm
         * @classdesc Represents a GameStatus.
         * @implements IGameStatus
         * @constructor
         * @param {rm.IGameStatus=} [properties] Properties to set
         */
        function GameStatus(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameStatus currentRound.
         * @member {number} currentRound
         * @memberof rm.GameStatus
         * @instance
         */
        GameStatus.prototype.currentRound = 0;

        /**
         * GameStatus totalRounds.
         * @member {number} totalRounds
         * @memberof rm.GameStatus
         * @instance
         */
        GameStatus.prototype.totalRounds = 0;

        /**
         * GameStatus redScore.
         * @member {number} redScore
         * @memberof rm.GameStatus
         * @instance
         */
        GameStatus.prototype.redScore = 0;

        /**
         * GameStatus blueScore.
         * @member {number} blueScore
         * @memberof rm.GameStatus
         * @instance
         */
        GameStatus.prototype.blueScore = 0;

        /**
         * GameStatus currentStage.
         * @member {number} currentStage
         * @memberof rm.GameStatus
         * @instance
         */
        GameStatus.prototype.currentStage = 0;

        /**
         * GameStatus stageCountdownSec.
         * @member {number} stageCountdownSec
         * @memberof rm.GameStatus
         * @instance
         */
        GameStatus.prototype.stageCountdownSec = 0;

        /**
         * GameStatus stageElapsedSec.
         * @member {number} stageElapsedSec
         * @memberof rm.GameStatus
         * @instance
         */
        GameStatus.prototype.stageElapsedSec = 0;

        /**
         * GameStatus isPaused.
         * @member {boolean} isPaused
         * @memberof rm.GameStatus
         * @instance
         */
        GameStatus.prototype.isPaused = false;

        /**
         * Creates a new GameStatus instance using the specified properties.
         * @function create
         * @memberof rm.GameStatus
         * @static
         * @param {rm.IGameStatus=} [properties] Properties to set
         * @returns {rm.GameStatus} GameStatus instance
         */
        GameStatus.create = function create(properties) {
            return new GameStatus(properties);
        };

        /**
         * Encodes the specified GameStatus message. Does not implicitly {@link rm.GameStatus.verify|verify} messages.
         * @function encode
         * @memberof rm.GameStatus
         * @static
         * @param {rm.IGameStatus} message GameStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameStatus.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.currentRound != null && Object.hasOwnProperty.call(message, "currentRound"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.currentRound);
            if (message.totalRounds != null && Object.hasOwnProperty.call(message, "totalRounds"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.totalRounds);
            if (message.redScore != null && Object.hasOwnProperty.call(message, "redScore"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.redScore);
            if (message.blueScore != null && Object.hasOwnProperty.call(message, "blueScore"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.blueScore);
            if (message.currentStage != null && Object.hasOwnProperty.call(message, "currentStage"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.currentStage);
            if (message.stageCountdownSec != null && Object.hasOwnProperty.call(message, "stageCountdownSec"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.stageCountdownSec);
            if (message.stageElapsedSec != null && Object.hasOwnProperty.call(message, "stageElapsedSec"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.stageElapsedSec);
            if (message.isPaused != null && Object.hasOwnProperty.call(message, "isPaused"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.isPaused);
            return writer;
        };

        /**
         * Encodes the specified GameStatus message, length delimited. Does not implicitly {@link rm.GameStatus.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.GameStatus
         * @static
         * @param {rm.IGameStatus} message GameStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameStatus.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameStatus message from the specified reader or buffer.
         * @function decode
         * @memberof rm.GameStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.GameStatus} GameStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameStatus.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.GameStatus();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.currentRound = reader.int32();
                        break;
                    }
                    case 2: {
                        message.totalRounds = reader.int32();
                        break;
                    }
                    case 3: {
                        message.redScore = reader.int32();
                        break;
                    }
                    case 4: {
                        message.blueScore = reader.int32();
                        break;
                    }
                    case 5: {
                        message.currentStage = reader.int32();
                        break;
                    }
                    case 6: {
                        message.stageCountdownSec = reader.int32();
                        break;
                    }
                    case 7: {
                        message.stageElapsedSec = reader.int32();
                        break;
                    }
                    case 8: {
                        message.isPaused = reader.bool();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameStatus message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.GameStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.GameStatus} GameStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameStatus.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameStatus message.
         * @function verify
         * @memberof rm.GameStatus
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameStatus.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.currentRound != null && message.hasOwnProperty("currentRound"))
                if (!$util.isInteger(message.currentRound))
                    return "currentRound: integer expected";
            if (message.totalRounds != null && message.hasOwnProperty("totalRounds"))
                if (!$util.isInteger(message.totalRounds))
                    return "totalRounds: integer expected";
            if (message.redScore != null && message.hasOwnProperty("redScore"))
                if (!$util.isInteger(message.redScore))
                    return "redScore: integer expected";
            if (message.blueScore != null && message.hasOwnProperty("blueScore"))
                if (!$util.isInteger(message.blueScore))
                    return "blueScore: integer expected";
            if (message.currentStage != null && message.hasOwnProperty("currentStage"))
                if (!$util.isInteger(message.currentStage))
                    return "currentStage: integer expected";
            if (message.stageCountdownSec != null && message.hasOwnProperty("stageCountdownSec"))
                if (!$util.isInteger(message.stageCountdownSec))
                    return "stageCountdownSec: integer expected";
            if (message.stageElapsedSec != null && message.hasOwnProperty("stageElapsedSec"))
                if (!$util.isInteger(message.stageElapsedSec))
                    return "stageElapsedSec: integer expected";
            if (message.isPaused != null && message.hasOwnProperty("isPaused"))
                if (typeof message.isPaused !== "boolean")
                    return "isPaused: boolean expected";
            return null;
        };

        /**
         * Creates a GameStatus message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.GameStatus
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.GameStatus} GameStatus
         */
        GameStatus.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.GameStatus)
                return object;
            let message = new $root.rm.GameStatus();
            if (object.currentRound != null)
                message.currentRound = object.currentRound | 0;
            if (object.totalRounds != null)
                message.totalRounds = object.totalRounds | 0;
            if (object.redScore != null)
                message.redScore = object.redScore | 0;
            if (object.blueScore != null)
                message.blueScore = object.blueScore | 0;
            if (object.currentStage != null)
                message.currentStage = object.currentStage | 0;
            if (object.stageCountdownSec != null)
                message.stageCountdownSec = object.stageCountdownSec | 0;
            if (object.stageElapsedSec != null)
                message.stageElapsedSec = object.stageElapsedSec | 0;
            if (object.isPaused != null)
                message.isPaused = Boolean(object.isPaused);
            return message;
        };

        /**
         * Creates a plain object from a GameStatus message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.GameStatus
         * @static
         * @param {rm.GameStatus} message GameStatus
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameStatus.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.currentRound = 0;
                object.totalRounds = 0;
                object.redScore = 0;
                object.blueScore = 0;
                object.currentStage = 0;
                object.stageCountdownSec = 0;
                object.stageElapsedSec = 0;
                object.isPaused = false;
            }
            if (message.currentRound != null && message.hasOwnProperty("currentRound"))
                object.currentRound = message.currentRound;
            if (message.totalRounds != null && message.hasOwnProperty("totalRounds"))
                object.totalRounds = message.totalRounds;
            if (message.redScore != null && message.hasOwnProperty("redScore"))
                object.redScore = message.redScore;
            if (message.blueScore != null && message.hasOwnProperty("blueScore"))
                object.blueScore = message.blueScore;
            if (message.currentStage != null && message.hasOwnProperty("currentStage"))
                object.currentStage = message.currentStage;
            if (message.stageCountdownSec != null && message.hasOwnProperty("stageCountdownSec"))
                object.stageCountdownSec = message.stageCountdownSec;
            if (message.stageElapsedSec != null && message.hasOwnProperty("stageElapsedSec"))
                object.stageElapsedSec = message.stageElapsedSec;
            if (message.isPaused != null && message.hasOwnProperty("isPaused"))
                object.isPaused = message.isPaused;
            return object;
        };

        /**
         * Converts this GameStatus to JSON.
         * @function toJSON
         * @memberof rm.GameStatus
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameStatus.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GameStatus
         * @function getTypeUrl
         * @memberof rm.GameStatus
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GameStatus.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.GameStatus";
        };

        return GameStatus;
    })();

    rm.GlobalUnitStatus = (function () {

        /**
         * Properties of a GlobalUnitStatus.
         * @memberof rm
         * @interface IGlobalUnitStatus
         * @property {number|null} [baseHealth] GlobalUnitStatus baseHealth
         * @property {number|null} [baseStatus] GlobalUnitStatus baseStatus
         * @property {number|null} [baseShield] GlobalUnitStatus baseShield
         * @property {number|null} [outpostHealth] GlobalUnitStatus outpostHealth
         * @property {number|null} [outpostStatus] GlobalUnitStatus outpostStatus
         * @property {Array.<number>|null} [robotHealth] GlobalUnitStatus robotHealth
         * @property {Array.<number>|null} [robotBullets] GlobalUnitStatus robotBullets
         * @property {number|null} [totalDamageRed] GlobalUnitStatus totalDamageRed
         * @property {number|null} [totalDamageBlue] GlobalUnitStatus totalDamageBlue
         */

        /**
         * Constructs a new GlobalUnitStatus.
         * @memberof rm
         * @classdesc Represents a GlobalUnitStatus.
         * @implements IGlobalUnitStatus
         * @constructor
         * @param {rm.IGlobalUnitStatus=} [properties] Properties to set
         */
        function GlobalUnitStatus(properties) {
            this.robotHealth = [];
            this.robotBullets = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GlobalUnitStatus baseHealth.
         * @member {number} baseHealth
         * @memberof rm.GlobalUnitStatus
         * @instance
         */
        GlobalUnitStatus.prototype.baseHealth = 0;

        /**
         * GlobalUnitStatus baseStatus.
         * @member {number} baseStatus
         * @memberof rm.GlobalUnitStatus
         * @instance
         */
        GlobalUnitStatus.prototype.baseStatus = 0;

        /**
         * GlobalUnitStatus baseShield.
         * @member {number} baseShield
         * @memberof rm.GlobalUnitStatus
         * @instance
         */
        GlobalUnitStatus.prototype.baseShield = 0;

        /**
         * GlobalUnitStatus outpostHealth.
         * @member {number} outpostHealth
         * @memberof rm.GlobalUnitStatus
         * @instance
         */
        GlobalUnitStatus.prototype.outpostHealth = 0;

        /**
         * GlobalUnitStatus outpostStatus.
         * @member {number} outpostStatus
         * @memberof rm.GlobalUnitStatus
         * @instance
         */
        GlobalUnitStatus.prototype.outpostStatus = 0;

        /**
         * GlobalUnitStatus robotHealth.
         * @member {Array.<number>} robotHealth
         * @memberof rm.GlobalUnitStatus
         * @instance
         */
        GlobalUnitStatus.prototype.robotHealth = $util.emptyArray;

        /**
         * GlobalUnitStatus robotBullets.
         * @member {Array.<number>} robotBullets
         * @memberof rm.GlobalUnitStatus
         * @instance
         */
        GlobalUnitStatus.prototype.robotBullets = $util.emptyArray;

        /**
         * GlobalUnitStatus totalDamageRed.
         * @member {number} totalDamageRed
         * @memberof rm.GlobalUnitStatus
         * @instance
         */
        GlobalUnitStatus.prototype.totalDamageRed = 0;

        /**
         * GlobalUnitStatus totalDamageBlue.
         * @member {number} totalDamageBlue
         * @memberof rm.GlobalUnitStatus
         * @instance
         */
        GlobalUnitStatus.prototype.totalDamageBlue = 0;

        /**
         * Creates a new GlobalUnitStatus instance using the specified properties.
         * @function create
         * @memberof rm.GlobalUnitStatus
         * @static
         * @param {rm.IGlobalUnitStatus=} [properties] Properties to set
         * @returns {rm.GlobalUnitStatus} GlobalUnitStatus instance
         */
        GlobalUnitStatus.create = function create(properties) {
            return new GlobalUnitStatus(properties);
        };

        /**
         * Encodes the specified GlobalUnitStatus message. Does not implicitly {@link rm.GlobalUnitStatus.verify|verify} messages.
         * @function encode
         * @memberof rm.GlobalUnitStatus
         * @static
         * @param {rm.IGlobalUnitStatus} message GlobalUnitStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GlobalUnitStatus.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.baseHealth != null && Object.hasOwnProperty.call(message, "baseHealth"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.baseHealth);
            if (message.baseStatus != null && Object.hasOwnProperty.call(message, "baseStatus"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.baseStatus);
            if (message.baseShield != null && Object.hasOwnProperty.call(message, "baseShield"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.baseShield);
            if (message.outpostHealth != null && Object.hasOwnProperty.call(message, "outpostHealth"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.outpostHealth);
            if (message.outpostStatus != null && Object.hasOwnProperty.call(message, "outpostStatus"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.outpostStatus);
            if (message.robotHealth != null && message.robotHealth.length) {
                writer.uint32(/* id 6, wireType 2 =*/50).fork();
                for (let i = 0; i < message.robotHealth.length; ++i)
                    writer.int32(message.robotHealth[i]);
                writer.ldelim();
            }
            if (message.robotBullets != null && message.robotBullets.length) {
                writer.uint32(/* id 7, wireType 2 =*/58).fork();
                for (let i = 0; i < message.robotBullets.length; ++i)
                    writer.int32(message.robotBullets[i]);
                writer.ldelim();
            }
            if (message.totalDamageRed != null && Object.hasOwnProperty.call(message, "totalDamageRed"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.totalDamageRed);
            if (message.totalDamageBlue != null && Object.hasOwnProperty.call(message, "totalDamageBlue"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.totalDamageBlue);
            return writer;
        };

        /**
         * Encodes the specified GlobalUnitStatus message, length delimited. Does not implicitly {@link rm.GlobalUnitStatus.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.GlobalUnitStatus
         * @static
         * @param {rm.IGlobalUnitStatus} message GlobalUnitStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GlobalUnitStatus.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GlobalUnitStatus message from the specified reader or buffer.
         * @function decode
         * @memberof rm.GlobalUnitStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.GlobalUnitStatus} GlobalUnitStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GlobalUnitStatus.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.GlobalUnitStatus();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.baseHealth = reader.int32();
                        break;
                    }
                    case 2: {
                        message.baseStatus = reader.int32();
                        break;
                    }
                    case 3: {
                        message.baseShield = reader.int32();
                        break;
                    }
                    case 4: {
                        message.outpostHealth = reader.int32();
                        break;
                    }
                    case 5: {
                        message.outpostStatus = reader.int32();
                        break;
                    }
                    case 6: {
                        if (!(message.robotHealth && message.robotHealth.length))
                            message.robotHealth = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.robotHealth.push(reader.int32());
                        } else
                            message.robotHealth.push(reader.int32());
                        break;
                    }
                    case 7: {
                        if (!(message.robotBullets && message.robotBullets.length))
                            message.robotBullets = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.robotBullets.push(reader.int32());
                        } else
                            message.robotBullets.push(reader.int32());
                        break;
                    }
                    case 8: {
                        message.totalDamageRed = reader.int32();
                        break;
                    }
                    case 9: {
                        message.totalDamageBlue = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a GlobalUnitStatus message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.GlobalUnitStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.GlobalUnitStatus} GlobalUnitStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GlobalUnitStatus.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GlobalUnitStatus message.
         * @function verify
         * @memberof rm.GlobalUnitStatus
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GlobalUnitStatus.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.baseHealth != null && message.hasOwnProperty("baseHealth"))
                if (!$util.isInteger(message.baseHealth))
                    return "baseHealth: integer expected";
            if (message.baseStatus != null && message.hasOwnProperty("baseStatus"))
                if (!$util.isInteger(message.baseStatus))
                    return "baseStatus: integer expected";
            if (message.baseShield != null && message.hasOwnProperty("baseShield"))
                if (!$util.isInteger(message.baseShield))
                    return "baseShield: integer expected";
            if (message.outpostHealth != null && message.hasOwnProperty("outpostHealth"))
                if (!$util.isInteger(message.outpostHealth))
                    return "outpostHealth: integer expected";
            if (message.outpostStatus != null && message.hasOwnProperty("outpostStatus"))
                if (!$util.isInteger(message.outpostStatus))
                    return "outpostStatus: integer expected";
            if (message.robotHealth != null && message.hasOwnProperty("robotHealth")) {
                if (!Array.isArray(message.robotHealth))
                    return "robotHealth: array expected";
                for (let i = 0; i < message.robotHealth.length; ++i)
                    if (!$util.isInteger(message.robotHealth[i]))
                        return "robotHealth: integer[] expected";
            }
            if (message.robotBullets != null && message.hasOwnProperty("robotBullets")) {
                if (!Array.isArray(message.robotBullets))
                    return "robotBullets: array expected";
                for (let i = 0; i < message.robotBullets.length; ++i)
                    if (!$util.isInteger(message.robotBullets[i]))
                        return "robotBullets: integer[] expected";
            }
            if (message.totalDamageRed != null && message.hasOwnProperty("totalDamageRed"))
                if (!$util.isInteger(message.totalDamageRed))
                    return "totalDamageRed: integer expected";
            if (message.totalDamageBlue != null && message.hasOwnProperty("totalDamageBlue"))
                if (!$util.isInteger(message.totalDamageBlue))
                    return "totalDamageBlue: integer expected";
            return null;
        };

        /**
         * Creates a GlobalUnitStatus message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.GlobalUnitStatus
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.GlobalUnitStatus} GlobalUnitStatus
         */
        GlobalUnitStatus.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.GlobalUnitStatus)
                return object;
            let message = new $root.rm.GlobalUnitStatus();
            if (object.baseHealth != null)
                message.baseHealth = object.baseHealth | 0;
            if (object.baseStatus != null)
                message.baseStatus = object.baseStatus | 0;
            if (object.baseShield != null)
                message.baseShield = object.baseShield | 0;
            if (object.outpostHealth != null)
                message.outpostHealth = object.outpostHealth | 0;
            if (object.outpostStatus != null)
                message.outpostStatus = object.outpostStatus | 0;
            if (object.robotHealth) {
                if (!Array.isArray(object.robotHealth))
                    throw TypeError(".rm.GlobalUnitStatus.robotHealth: array expected");
                message.robotHealth = [];
                for (let i = 0; i < object.robotHealth.length; ++i)
                    message.robotHealth[i] = object.robotHealth[i] | 0;
            }
            if (object.robotBullets) {
                if (!Array.isArray(object.robotBullets))
                    throw TypeError(".rm.GlobalUnitStatus.robotBullets: array expected");
                message.robotBullets = [];
                for (let i = 0; i < object.robotBullets.length; ++i)
                    message.robotBullets[i] = object.robotBullets[i] | 0;
            }
            if (object.totalDamageRed != null)
                message.totalDamageRed = object.totalDamageRed | 0;
            if (object.totalDamageBlue != null)
                message.totalDamageBlue = object.totalDamageBlue | 0;
            return message;
        };

        /**
         * Creates a plain object from a GlobalUnitStatus message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.GlobalUnitStatus
         * @static
         * @param {rm.GlobalUnitStatus} message GlobalUnitStatus
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GlobalUnitStatus.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.robotHealth = [];
                object.robotBullets = [];
            }
            if (options.defaults) {
                object.baseHealth = 0;
                object.baseStatus = 0;
                object.baseShield = 0;
                object.outpostHealth = 0;
                object.outpostStatus = 0;
                object.totalDamageRed = 0;
                object.totalDamageBlue = 0;
            }
            if (message.baseHealth != null && message.hasOwnProperty("baseHealth"))
                object.baseHealth = message.baseHealth;
            if (message.baseStatus != null && message.hasOwnProperty("baseStatus"))
                object.baseStatus = message.baseStatus;
            if (message.baseShield != null && message.hasOwnProperty("baseShield"))
                object.baseShield = message.baseShield;
            if (message.outpostHealth != null && message.hasOwnProperty("outpostHealth"))
                object.outpostHealth = message.outpostHealth;
            if (message.outpostStatus != null && message.hasOwnProperty("outpostStatus"))
                object.outpostStatus = message.outpostStatus;
            if (message.robotHealth && message.robotHealth.length) {
                object.robotHealth = [];
                for (let j = 0; j < message.robotHealth.length; ++j)
                    object.robotHealth[j] = message.robotHealth[j];
            }
            if (message.robotBullets && message.robotBullets.length) {
                object.robotBullets = [];
                for (let j = 0; j < message.robotBullets.length; ++j)
                    object.robotBullets[j] = message.robotBullets[j];
            }
            if (message.totalDamageRed != null && message.hasOwnProperty("totalDamageRed"))
                object.totalDamageRed = message.totalDamageRed;
            if (message.totalDamageBlue != null && message.hasOwnProperty("totalDamageBlue"))
                object.totalDamageBlue = message.totalDamageBlue;
            return object;
        };

        /**
         * Converts this GlobalUnitStatus to JSON.
         * @function toJSON
         * @memberof rm.GlobalUnitStatus
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GlobalUnitStatus.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GlobalUnitStatus
         * @function getTypeUrl
         * @memberof rm.GlobalUnitStatus
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GlobalUnitStatus.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.GlobalUnitStatus";
        };

        return GlobalUnitStatus;
    })();

    rm.GlobalLogisticsStatus = (function () {

        /**
         * Properties of a GlobalLogisticsStatus.
         * @memberof rm
         * @interface IGlobalLogisticsStatus
         * @property {number|null} [remainingEconomy] GlobalLogisticsStatus remainingEconomy
         * @property {number|Long|null} [totalEconomyObtained] GlobalLogisticsStatus totalEconomyObtained
         * @property {number|null} [techLevel] GlobalLogisticsStatus techLevel
         * @property {number|null} [encryptionLevel] GlobalLogisticsStatus encryptionLevel
         */

        /**
         * Constructs a new GlobalLogisticsStatus.
         * @memberof rm
         * @classdesc Represents a GlobalLogisticsStatus.
         * @implements IGlobalLogisticsStatus
         * @constructor
         * @param {rm.IGlobalLogisticsStatus=} [properties] Properties to set
         */
        function GlobalLogisticsStatus(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GlobalLogisticsStatus remainingEconomy.
         * @member {number} remainingEconomy
         * @memberof rm.GlobalLogisticsStatus
         * @instance
         */
        GlobalLogisticsStatus.prototype.remainingEconomy = 0;

        /**
         * GlobalLogisticsStatus totalEconomyObtained.
         * @member {number|Long} totalEconomyObtained
         * @memberof rm.GlobalLogisticsStatus
         * @instance
         */
        GlobalLogisticsStatus.prototype.totalEconomyObtained = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

        /**
         * GlobalLogisticsStatus techLevel.
         * @member {number} techLevel
         * @memberof rm.GlobalLogisticsStatus
         * @instance
         */
        GlobalLogisticsStatus.prototype.techLevel = 0;

        /**
         * GlobalLogisticsStatus encryptionLevel.
         * @member {number} encryptionLevel
         * @memberof rm.GlobalLogisticsStatus
         * @instance
         */
        GlobalLogisticsStatus.prototype.encryptionLevel = 0;

        /**
         * Creates a new GlobalLogisticsStatus instance using the specified properties.
         * @function create
         * @memberof rm.GlobalLogisticsStatus
         * @static
         * @param {rm.IGlobalLogisticsStatus=} [properties] Properties to set
         * @returns {rm.GlobalLogisticsStatus} GlobalLogisticsStatus instance
         */
        GlobalLogisticsStatus.create = function create(properties) {
            return new GlobalLogisticsStatus(properties);
        };

        /**
         * Encodes the specified GlobalLogisticsStatus message. Does not implicitly {@link rm.GlobalLogisticsStatus.verify|verify} messages.
         * @function encode
         * @memberof rm.GlobalLogisticsStatus
         * @static
         * @param {rm.IGlobalLogisticsStatus} message GlobalLogisticsStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GlobalLogisticsStatus.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.remainingEconomy != null && Object.hasOwnProperty.call(message, "remainingEconomy"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.remainingEconomy);
            if (message.totalEconomyObtained != null && Object.hasOwnProperty.call(message, "totalEconomyObtained"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.totalEconomyObtained);
            if (message.techLevel != null && Object.hasOwnProperty.call(message, "techLevel"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.techLevel);
            if (message.encryptionLevel != null && Object.hasOwnProperty.call(message, "encryptionLevel"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.encryptionLevel);
            return writer;
        };

        /**
         * Encodes the specified GlobalLogisticsStatus message, length delimited. Does not implicitly {@link rm.GlobalLogisticsStatus.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.GlobalLogisticsStatus
         * @static
         * @param {rm.IGlobalLogisticsStatus} message GlobalLogisticsStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GlobalLogisticsStatus.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GlobalLogisticsStatus message from the specified reader or buffer.
         * @function decode
         * @memberof rm.GlobalLogisticsStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.GlobalLogisticsStatus} GlobalLogisticsStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GlobalLogisticsStatus.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.GlobalLogisticsStatus();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.remainingEconomy = reader.int32();
                        break;
                    }
                    case 2: {
                        message.totalEconomyObtained = reader.int64();
                        break;
                    }
                    case 3: {
                        message.techLevel = reader.int32();
                        break;
                    }
                    case 4: {
                        message.encryptionLevel = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a GlobalLogisticsStatus message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.GlobalLogisticsStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.GlobalLogisticsStatus} GlobalLogisticsStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GlobalLogisticsStatus.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GlobalLogisticsStatus message.
         * @function verify
         * @memberof rm.GlobalLogisticsStatus
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GlobalLogisticsStatus.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.remainingEconomy != null && message.hasOwnProperty("remainingEconomy"))
                if (!$util.isInteger(message.remainingEconomy))
                    return "remainingEconomy: integer expected";
            if (message.totalEconomyObtained != null && message.hasOwnProperty("totalEconomyObtained"))
                if (!$util.isInteger(message.totalEconomyObtained) && !(message.totalEconomyObtained && $util.isInteger(message.totalEconomyObtained.low) && $util.isInteger(message.totalEconomyObtained.high)))
                    return "totalEconomyObtained: integer|Long expected";
            if (message.techLevel != null && message.hasOwnProperty("techLevel"))
                if (!$util.isInteger(message.techLevel))
                    return "techLevel: integer expected";
            if (message.encryptionLevel != null && message.hasOwnProperty("encryptionLevel"))
                if (!$util.isInteger(message.encryptionLevel))
                    return "encryptionLevel: integer expected";
            return null;
        };

        /**
         * Creates a GlobalLogisticsStatus message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.GlobalLogisticsStatus
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.GlobalLogisticsStatus} GlobalLogisticsStatus
         */
        GlobalLogisticsStatus.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.GlobalLogisticsStatus)
                return object;
            let message = new $root.rm.GlobalLogisticsStatus();
            if (object.remainingEconomy != null)
                message.remainingEconomy = object.remainingEconomy | 0;
            if (object.totalEconomyObtained != null)
                if ($util.Long)
                    (message.totalEconomyObtained = $util.Long.fromValue(object.totalEconomyObtained)).unsigned = false;
                else if (typeof object.totalEconomyObtained === "string")
                    message.totalEconomyObtained = parseInt(object.totalEconomyObtained, 10);
                else if (typeof object.totalEconomyObtained === "number")
                    message.totalEconomyObtained = object.totalEconomyObtained;
                else if (typeof object.totalEconomyObtained === "object")
                    message.totalEconomyObtained = new $util.LongBits(object.totalEconomyObtained.low >>> 0, object.totalEconomyObtained.high >>> 0).toNumber();
            if (object.techLevel != null)
                message.techLevel = object.techLevel | 0;
            if (object.encryptionLevel != null)
                message.encryptionLevel = object.encryptionLevel | 0;
            return message;
        };

        /**
         * Creates a plain object from a GlobalLogisticsStatus message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.GlobalLogisticsStatus
         * @static
         * @param {rm.GlobalLogisticsStatus} message GlobalLogisticsStatus
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GlobalLogisticsStatus.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.remainingEconomy = 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.totalEconomyObtained = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.totalEconomyObtained = options.longs === String ? "0" : 0;
                object.techLevel = 0;
                object.encryptionLevel = 0;
            }
            if (message.remainingEconomy != null && message.hasOwnProperty("remainingEconomy"))
                object.remainingEconomy = message.remainingEconomy;
            if (message.totalEconomyObtained != null && message.hasOwnProperty("totalEconomyObtained"))
                if (typeof message.totalEconomyObtained === "number")
                    object.totalEconomyObtained = options.longs === String ? String(message.totalEconomyObtained) : message.totalEconomyObtained;
                else
                    object.totalEconomyObtained = options.longs === String ? $util.Long.prototype.toString.call(message.totalEconomyObtained) : options.longs === Number ? new $util.LongBits(message.totalEconomyObtained.low >>> 0, message.totalEconomyObtained.high >>> 0).toNumber() : message.totalEconomyObtained;
            if (message.techLevel != null && message.hasOwnProperty("techLevel"))
                object.techLevel = message.techLevel;
            if (message.encryptionLevel != null && message.hasOwnProperty("encryptionLevel"))
                object.encryptionLevel = message.encryptionLevel;
            return object;
        };

        /**
         * Converts this GlobalLogisticsStatus to JSON.
         * @function toJSON
         * @memberof rm.GlobalLogisticsStatus
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GlobalLogisticsStatus.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GlobalLogisticsStatus
         * @function getTypeUrl
         * @memberof rm.GlobalLogisticsStatus
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GlobalLogisticsStatus.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.GlobalLogisticsStatus";
        };

        return GlobalLogisticsStatus;
    })();

    rm.GlobalSpecialMechanism = (function () {

        /**
         * Properties of a GlobalSpecialMechanism.
         * @memberof rm
         * @interface IGlobalSpecialMechanism
         * @property {Array.<number>|null} [mechanismId] GlobalSpecialMechanism mechanismId
         * @property {Array.<number>|null} [mechanismTimeSec] GlobalSpecialMechanism mechanismTimeSec
         */

        /**
         * Constructs a new GlobalSpecialMechanism.
         * @memberof rm
         * @classdesc Represents a GlobalSpecialMechanism.
         * @implements IGlobalSpecialMechanism
         * @constructor
         * @param {rm.IGlobalSpecialMechanism=} [properties] Properties to set
         */
        function GlobalSpecialMechanism(properties) {
            this.mechanismId = [];
            this.mechanismTimeSec = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GlobalSpecialMechanism mechanismId.
         * @member {Array.<number>} mechanismId
         * @memberof rm.GlobalSpecialMechanism
         * @instance
         */
        GlobalSpecialMechanism.prototype.mechanismId = $util.emptyArray;

        /**
         * GlobalSpecialMechanism mechanismTimeSec.
         * @member {Array.<number>} mechanismTimeSec
         * @memberof rm.GlobalSpecialMechanism
         * @instance
         */
        GlobalSpecialMechanism.prototype.mechanismTimeSec = $util.emptyArray;

        /**
         * Creates a new GlobalSpecialMechanism instance using the specified properties.
         * @function create
         * @memberof rm.GlobalSpecialMechanism
         * @static
         * @param {rm.IGlobalSpecialMechanism=} [properties] Properties to set
         * @returns {rm.GlobalSpecialMechanism} GlobalSpecialMechanism instance
         */
        GlobalSpecialMechanism.create = function create(properties) {
            return new GlobalSpecialMechanism(properties);
        };

        /**
         * Encodes the specified GlobalSpecialMechanism message. Does not implicitly {@link rm.GlobalSpecialMechanism.verify|verify} messages.
         * @function encode
         * @memberof rm.GlobalSpecialMechanism
         * @static
         * @param {rm.IGlobalSpecialMechanism} message GlobalSpecialMechanism message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GlobalSpecialMechanism.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.mechanismId != null && message.mechanismId.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (let i = 0; i < message.mechanismId.length; ++i)
                    writer.int32(message.mechanismId[i]);
                writer.ldelim();
            }
            if (message.mechanismTimeSec != null && message.mechanismTimeSec.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (let i = 0; i < message.mechanismTimeSec.length; ++i)
                    writer.int32(message.mechanismTimeSec[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified GlobalSpecialMechanism message, length delimited. Does not implicitly {@link rm.GlobalSpecialMechanism.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.GlobalSpecialMechanism
         * @static
         * @param {rm.IGlobalSpecialMechanism} message GlobalSpecialMechanism message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GlobalSpecialMechanism.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GlobalSpecialMechanism message from the specified reader or buffer.
         * @function decode
         * @memberof rm.GlobalSpecialMechanism
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.GlobalSpecialMechanism} GlobalSpecialMechanism
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GlobalSpecialMechanism.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.GlobalSpecialMechanism();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        if (!(message.mechanismId && message.mechanismId.length))
                            message.mechanismId = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.mechanismId.push(reader.int32());
                        } else
                            message.mechanismId.push(reader.int32());
                        break;
                    }
                    case 2: {
                        if (!(message.mechanismTimeSec && message.mechanismTimeSec.length))
                            message.mechanismTimeSec = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.mechanismTimeSec.push(reader.int32());
                        } else
                            message.mechanismTimeSec.push(reader.int32());
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a GlobalSpecialMechanism message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.GlobalSpecialMechanism
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.GlobalSpecialMechanism} GlobalSpecialMechanism
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GlobalSpecialMechanism.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GlobalSpecialMechanism message.
         * @function verify
         * @memberof rm.GlobalSpecialMechanism
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GlobalSpecialMechanism.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.mechanismId != null && message.hasOwnProperty("mechanismId")) {
                if (!Array.isArray(message.mechanismId))
                    return "mechanismId: array expected";
                for (let i = 0; i < message.mechanismId.length; ++i)
                    if (!$util.isInteger(message.mechanismId[i]))
                        return "mechanismId: integer[] expected";
            }
            if (message.mechanismTimeSec != null && message.hasOwnProperty("mechanismTimeSec")) {
                if (!Array.isArray(message.mechanismTimeSec))
                    return "mechanismTimeSec: array expected";
                for (let i = 0; i < message.mechanismTimeSec.length; ++i)
                    if (!$util.isInteger(message.mechanismTimeSec[i]))
                        return "mechanismTimeSec: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a GlobalSpecialMechanism message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.GlobalSpecialMechanism
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.GlobalSpecialMechanism} GlobalSpecialMechanism
         */
        GlobalSpecialMechanism.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.GlobalSpecialMechanism)
                return object;
            let message = new $root.rm.GlobalSpecialMechanism();
            if (object.mechanismId) {
                if (!Array.isArray(object.mechanismId))
                    throw TypeError(".rm.GlobalSpecialMechanism.mechanismId: array expected");
                message.mechanismId = [];
                for (let i = 0; i < object.mechanismId.length; ++i)
                    message.mechanismId[i] = object.mechanismId[i] | 0;
            }
            if (object.mechanismTimeSec) {
                if (!Array.isArray(object.mechanismTimeSec))
                    throw TypeError(".rm.GlobalSpecialMechanism.mechanismTimeSec: array expected");
                message.mechanismTimeSec = [];
                for (let i = 0; i < object.mechanismTimeSec.length; ++i)
                    message.mechanismTimeSec[i] = object.mechanismTimeSec[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a GlobalSpecialMechanism message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.GlobalSpecialMechanism
         * @static
         * @param {rm.GlobalSpecialMechanism} message GlobalSpecialMechanism
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GlobalSpecialMechanism.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.mechanismId = [];
                object.mechanismTimeSec = [];
            }
            if (message.mechanismId && message.mechanismId.length) {
                object.mechanismId = [];
                for (let j = 0; j < message.mechanismId.length; ++j)
                    object.mechanismId[j] = message.mechanismId[j];
            }
            if (message.mechanismTimeSec && message.mechanismTimeSec.length) {
                object.mechanismTimeSec = [];
                for (let j = 0; j < message.mechanismTimeSec.length; ++j)
                    object.mechanismTimeSec[j] = message.mechanismTimeSec[j];
            }
            return object;
        };

        /**
         * Converts this GlobalSpecialMechanism to JSON.
         * @function toJSON
         * @memberof rm.GlobalSpecialMechanism
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GlobalSpecialMechanism.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GlobalSpecialMechanism
         * @function getTypeUrl
         * @memberof rm.GlobalSpecialMechanism
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GlobalSpecialMechanism.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.GlobalSpecialMechanism";
        };

        return GlobalSpecialMechanism;
    })();

    rm.Event = (function () {

        /**
         * Properties of an Event.
         * @memberof rm
         * @interface IEvent
         * @property {number|null} [eventId] Event eventId
         * @property {string|null} [param] Event param
         */

        /**
         * Constructs a new Event.
         * @memberof rm
         * @classdesc Represents an Event.
         * @implements IEvent
         * @constructor
         * @param {rm.IEvent=} [properties] Properties to set
         */
        function Event(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Event eventId.
         * @member {number} eventId
         * @memberof rm.Event
         * @instance
         */
        Event.prototype.eventId = 0;

        /**
         * Event param.
         * @member {string} param
         * @memberof rm.Event
         * @instance
         */
        Event.prototype.param = "";

        /**
         * Creates a new Event instance using the specified properties.
         * @function create
         * @memberof rm.Event
         * @static
         * @param {rm.IEvent=} [properties] Properties to set
         * @returns {rm.Event} Event instance
         */
        Event.create = function create(properties) {
            return new Event(properties);
        };

        /**
         * Encodes the specified Event message. Does not implicitly {@link rm.Event.verify|verify} messages.
         * @function encode
         * @memberof rm.Event
         * @static
         * @param {rm.IEvent} message Event message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Event.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.eventId != null && Object.hasOwnProperty.call(message, "eventId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.eventId);
            if (message.param != null && Object.hasOwnProperty.call(message, "param"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.param);
            return writer;
        };

        /**
         * Encodes the specified Event message, length delimited. Does not implicitly {@link rm.Event.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.Event
         * @static
         * @param {rm.IEvent} message Event message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Event.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Event message from the specified reader or buffer.
         * @function decode
         * @memberof rm.Event
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.Event} Event
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Event.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.Event();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.eventId = reader.int32();
                        break;
                    }
                    case 2: {
                        message.param = reader.string();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes an Event message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.Event
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.Event} Event
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Event.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Event message.
         * @function verify
         * @memberof rm.Event
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Event.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.eventId != null && message.hasOwnProperty("eventId"))
                if (!$util.isInteger(message.eventId))
                    return "eventId: integer expected";
            if (message.param != null && message.hasOwnProperty("param"))
                if (!$util.isString(message.param))
                    return "param: string expected";
            return null;
        };

        /**
         * Creates an Event message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.Event
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.Event} Event
         */
        Event.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.Event)
                return object;
            let message = new $root.rm.Event();
            if (object.eventId != null)
                message.eventId = object.eventId | 0;
            if (object.param != null)
                message.param = String(object.param);
            return message;
        };

        /**
         * Creates a plain object from an Event message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.Event
         * @static
         * @param {rm.Event} message Event
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Event.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.eventId = 0;
                object.param = "";
            }
            if (message.eventId != null && message.hasOwnProperty("eventId"))
                object.eventId = message.eventId;
            if (message.param != null && message.hasOwnProperty("param"))
                object.param = message.param;
            return object;
        };

        /**
         * Converts this Event to JSON.
         * @function toJSON
         * @memberof rm.Event
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Event.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Event
         * @function getTypeUrl
         * @memberof rm.Event
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Event.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.Event";
        };

        return Event;
    })();

    rm.RobotInjuryStat = (function () {

        /**
         * Properties of a RobotInjuryStat.
         * @memberof rm
         * @interface IRobotInjuryStat
         * @property {number|null} [totalDamage] RobotInjuryStat totalDamage
         * @property {number|null} [collisionDamage] RobotInjuryStat collisionDamage
         * @property {number|null} [smallProjectileDamage] RobotInjuryStat smallProjectileDamage
         * @property {number|null} [largeProjectileDamage] RobotInjuryStat largeProjectileDamage
         * @property {number|null} [dartSplashDamage] RobotInjuryStat dartSplashDamage
         * @property {number|null} [moduleOfflineDamage] RobotInjuryStat moduleOfflineDamage
         * @property {number|null} [wifiOfflineDamage] RobotInjuryStat wifiOfflineDamage
         * @property {number|null} [penaltyDamage] RobotInjuryStat penaltyDamage
         * @property {number|null} [serverKillDamage] RobotInjuryStat serverKillDamage
         * @property {number|null} [killerId] RobotInjuryStat killerId
         */

        /**
         * Constructs a new RobotInjuryStat.
         * @memberof rm
         * @classdesc Represents a RobotInjuryStat.
         * @implements IRobotInjuryStat
         * @constructor
         * @param {rm.IRobotInjuryStat=} [properties] Properties to set
         */
        function RobotInjuryStat(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RobotInjuryStat totalDamage.
         * @member {number} totalDamage
         * @memberof rm.RobotInjuryStat
         * @instance
         */
        RobotInjuryStat.prototype.totalDamage = 0;

        /**
         * RobotInjuryStat collisionDamage.
         * @member {number} collisionDamage
         * @memberof rm.RobotInjuryStat
         * @instance
         */
        RobotInjuryStat.prototype.collisionDamage = 0;

        /**
         * RobotInjuryStat smallProjectileDamage.
         * @member {number} smallProjectileDamage
         * @memberof rm.RobotInjuryStat
         * @instance
         */
        RobotInjuryStat.prototype.smallProjectileDamage = 0;

        /**
         * RobotInjuryStat largeProjectileDamage.
         * @member {number} largeProjectileDamage
         * @memberof rm.RobotInjuryStat
         * @instance
         */
        RobotInjuryStat.prototype.largeProjectileDamage = 0;

        /**
         * RobotInjuryStat dartSplashDamage.
         * @member {number} dartSplashDamage
         * @memberof rm.RobotInjuryStat
         * @instance
         */
        RobotInjuryStat.prototype.dartSplashDamage = 0;

        /**
         * RobotInjuryStat moduleOfflineDamage.
         * @member {number} moduleOfflineDamage
         * @memberof rm.RobotInjuryStat
         * @instance
         */
        RobotInjuryStat.prototype.moduleOfflineDamage = 0;

        /**
         * RobotInjuryStat wifiOfflineDamage.
         * @member {number} wifiOfflineDamage
         * @memberof rm.RobotInjuryStat
         * @instance
         */
        RobotInjuryStat.prototype.wifiOfflineDamage = 0;

        /**
         * RobotInjuryStat penaltyDamage.
         * @member {number} penaltyDamage
         * @memberof rm.RobotInjuryStat
         * @instance
         */
        RobotInjuryStat.prototype.penaltyDamage = 0;

        /**
         * RobotInjuryStat serverKillDamage.
         * @member {number} serverKillDamage
         * @memberof rm.RobotInjuryStat
         * @instance
         */
        RobotInjuryStat.prototype.serverKillDamage = 0;

        /**
         * RobotInjuryStat killerId.
         * @member {number} killerId
         * @memberof rm.RobotInjuryStat
         * @instance
         */
        RobotInjuryStat.prototype.killerId = 0;

        /**
         * Creates a new RobotInjuryStat instance using the specified properties.
         * @function create
         * @memberof rm.RobotInjuryStat
         * @static
         * @param {rm.IRobotInjuryStat=} [properties] Properties to set
         * @returns {rm.RobotInjuryStat} RobotInjuryStat instance
         */
        RobotInjuryStat.create = function create(properties) {
            return new RobotInjuryStat(properties);
        };

        /**
         * Encodes the specified RobotInjuryStat message. Does not implicitly {@link rm.RobotInjuryStat.verify|verify} messages.
         * @function encode
         * @memberof rm.RobotInjuryStat
         * @static
         * @param {rm.IRobotInjuryStat} message RobotInjuryStat message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RobotInjuryStat.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.totalDamage != null && Object.hasOwnProperty.call(message, "totalDamage"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.totalDamage);
            if (message.collisionDamage != null && Object.hasOwnProperty.call(message, "collisionDamage"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.collisionDamage);
            if (message.smallProjectileDamage != null && Object.hasOwnProperty.call(message, "smallProjectileDamage"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.smallProjectileDamage);
            if (message.largeProjectileDamage != null && Object.hasOwnProperty.call(message, "largeProjectileDamage"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.largeProjectileDamage);
            if (message.dartSplashDamage != null && Object.hasOwnProperty.call(message, "dartSplashDamage"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.dartSplashDamage);
            if (message.moduleOfflineDamage != null && Object.hasOwnProperty.call(message, "moduleOfflineDamage"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.moduleOfflineDamage);
            if (message.wifiOfflineDamage != null && Object.hasOwnProperty.call(message, "wifiOfflineDamage"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.wifiOfflineDamage);
            if (message.penaltyDamage != null && Object.hasOwnProperty.call(message, "penaltyDamage"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.penaltyDamage);
            if (message.serverKillDamage != null && Object.hasOwnProperty.call(message, "serverKillDamage"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.serverKillDamage);
            if (message.killerId != null && Object.hasOwnProperty.call(message, "killerId"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.killerId);
            return writer;
        };

        /**
         * Encodes the specified RobotInjuryStat message, length delimited. Does not implicitly {@link rm.RobotInjuryStat.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.RobotInjuryStat
         * @static
         * @param {rm.IRobotInjuryStat} message RobotInjuryStat message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RobotInjuryStat.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RobotInjuryStat message from the specified reader or buffer.
         * @function decode
         * @memberof rm.RobotInjuryStat
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.RobotInjuryStat} RobotInjuryStat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RobotInjuryStat.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.RobotInjuryStat();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.totalDamage = reader.int32();
                        break;
                    }
                    case 2: {
                        message.collisionDamage = reader.int32();
                        break;
                    }
                    case 3: {
                        message.smallProjectileDamage = reader.int32();
                        break;
                    }
                    case 4: {
                        message.largeProjectileDamage = reader.int32();
                        break;
                    }
                    case 5: {
                        message.dartSplashDamage = reader.int32();
                        break;
                    }
                    case 6: {
                        message.moduleOfflineDamage = reader.int32();
                        break;
                    }
                    case 7: {
                        message.wifiOfflineDamage = reader.int32();
                        break;
                    }
                    case 8: {
                        message.penaltyDamage = reader.int32();
                        break;
                    }
                    case 9: {
                        message.serverKillDamage = reader.int32();
                        break;
                    }
                    case 10: {
                        message.killerId = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a RobotInjuryStat message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.RobotInjuryStat
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.RobotInjuryStat} RobotInjuryStat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RobotInjuryStat.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RobotInjuryStat message.
         * @function verify
         * @memberof rm.RobotInjuryStat
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RobotInjuryStat.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.totalDamage != null && message.hasOwnProperty("totalDamage"))
                if (!$util.isInteger(message.totalDamage))
                    return "totalDamage: integer expected";
            if (message.collisionDamage != null && message.hasOwnProperty("collisionDamage"))
                if (!$util.isInteger(message.collisionDamage))
                    return "collisionDamage: integer expected";
            if (message.smallProjectileDamage != null && message.hasOwnProperty("smallProjectileDamage"))
                if (!$util.isInteger(message.smallProjectileDamage))
                    return "smallProjectileDamage: integer expected";
            if (message.largeProjectileDamage != null && message.hasOwnProperty("largeProjectileDamage"))
                if (!$util.isInteger(message.largeProjectileDamage))
                    return "largeProjectileDamage: integer expected";
            if (message.dartSplashDamage != null && message.hasOwnProperty("dartSplashDamage"))
                if (!$util.isInteger(message.dartSplashDamage))
                    return "dartSplashDamage: integer expected";
            if (message.moduleOfflineDamage != null && message.hasOwnProperty("moduleOfflineDamage"))
                if (!$util.isInteger(message.moduleOfflineDamage))
                    return "moduleOfflineDamage: integer expected";
            if (message.wifiOfflineDamage != null && message.hasOwnProperty("wifiOfflineDamage"))
                if (!$util.isInteger(message.wifiOfflineDamage))
                    return "wifiOfflineDamage: integer expected";
            if (message.penaltyDamage != null && message.hasOwnProperty("penaltyDamage"))
                if (!$util.isInteger(message.penaltyDamage))
                    return "penaltyDamage: integer expected";
            if (message.serverKillDamage != null && message.hasOwnProperty("serverKillDamage"))
                if (!$util.isInteger(message.serverKillDamage))
                    return "serverKillDamage: integer expected";
            if (message.killerId != null && message.hasOwnProperty("killerId"))
                if (!$util.isInteger(message.killerId))
                    return "killerId: integer expected";
            return null;
        };

        /**
         * Creates a RobotInjuryStat message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.RobotInjuryStat
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.RobotInjuryStat} RobotInjuryStat
         */
        RobotInjuryStat.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.RobotInjuryStat)
                return object;
            let message = new $root.rm.RobotInjuryStat();
            if (object.totalDamage != null)
                message.totalDamage = object.totalDamage | 0;
            if (object.collisionDamage != null)
                message.collisionDamage = object.collisionDamage | 0;
            if (object.smallProjectileDamage != null)
                message.smallProjectileDamage = object.smallProjectileDamage | 0;
            if (object.largeProjectileDamage != null)
                message.largeProjectileDamage = object.largeProjectileDamage | 0;
            if (object.dartSplashDamage != null)
                message.dartSplashDamage = object.dartSplashDamage | 0;
            if (object.moduleOfflineDamage != null)
                message.moduleOfflineDamage = object.moduleOfflineDamage | 0;
            if (object.wifiOfflineDamage != null)
                message.wifiOfflineDamage = object.wifiOfflineDamage | 0;
            if (object.penaltyDamage != null)
                message.penaltyDamage = object.penaltyDamage | 0;
            if (object.serverKillDamage != null)
                message.serverKillDamage = object.serverKillDamage | 0;
            if (object.killerId != null)
                message.killerId = object.killerId | 0;
            return message;
        };

        /**
         * Creates a plain object from a RobotInjuryStat message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.RobotInjuryStat
         * @static
         * @param {rm.RobotInjuryStat} message RobotInjuryStat
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RobotInjuryStat.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.totalDamage = 0;
                object.collisionDamage = 0;
                object.smallProjectileDamage = 0;
                object.largeProjectileDamage = 0;
                object.dartSplashDamage = 0;
                object.moduleOfflineDamage = 0;
                object.wifiOfflineDamage = 0;
                object.penaltyDamage = 0;
                object.serverKillDamage = 0;
                object.killerId = 0;
            }
            if (message.totalDamage != null && message.hasOwnProperty("totalDamage"))
                object.totalDamage = message.totalDamage;
            if (message.collisionDamage != null && message.hasOwnProperty("collisionDamage"))
                object.collisionDamage = message.collisionDamage;
            if (message.smallProjectileDamage != null && message.hasOwnProperty("smallProjectileDamage"))
                object.smallProjectileDamage = message.smallProjectileDamage;
            if (message.largeProjectileDamage != null && message.hasOwnProperty("largeProjectileDamage"))
                object.largeProjectileDamage = message.largeProjectileDamage;
            if (message.dartSplashDamage != null && message.hasOwnProperty("dartSplashDamage"))
                object.dartSplashDamage = message.dartSplashDamage;
            if (message.moduleOfflineDamage != null && message.hasOwnProperty("moduleOfflineDamage"))
                object.moduleOfflineDamage = message.moduleOfflineDamage;
            if (message.wifiOfflineDamage != null && message.hasOwnProperty("wifiOfflineDamage"))
                object.wifiOfflineDamage = message.wifiOfflineDamage;
            if (message.penaltyDamage != null && message.hasOwnProperty("penaltyDamage"))
                object.penaltyDamage = message.penaltyDamage;
            if (message.serverKillDamage != null && message.hasOwnProperty("serverKillDamage"))
                object.serverKillDamage = message.serverKillDamage;
            if (message.killerId != null && message.hasOwnProperty("killerId"))
                object.killerId = message.killerId;
            return object;
        };

        /**
         * Converts this RobotInjuryStat to JSON.
         * @function toJSON
         * @memberof rm.RobotInjuryStat
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RobotInjuryStat.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RobotInjuryStat
         * @function getTypeUrl
         * @memberof rm.RobotInjuryStat
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RobotInjuryStat.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.RobotInjuryStat";
        };

        return RobotInjuryStat;
    })();

    rm.RobotRespawnStatus = (function () {

        /**
         * Properties of a RobotRespawnStatus.
         * @memberof rm
         * @interface IRobotRespawnStatus
         * @property {boolean|null} [isPendingRespawn] RobotRespawnStatus isPendingRespawn
         * @property {number|null} [totalRespawnProgress] RobotRespawnStatus totalRespawnProgress
         * @property {number|null} [currentRespawnProgress] RobotRespawnStatus currentRespawnProgress
         * @property {boolean|null} [canFreeRespawn] RobotRespawnStatus canFreeRespawn
         * @property {number|null} [goldCostForRespawn] RobotRespawnStatus goldCostForRespawn
         * @property {boolean|null} [canPayForRespawn] RobotRespawnStatus canPayForRespawn
         */

        /**
         * Constructs a new RobotRespawnStatus.
         * @memberof rm
         * @classdesc Represents a RobotRespawnStatus.
         * @implements IRobotRespawnStatus
         * @constructor
         * @param {rm.IRobotRespawnStatus=} [properties] Properties to set
         */
        function RobotRespawnStatus(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RobotRespawnStatus isPendingRespawn.
         * @member {boolean} isPendingRespawn
         * @memberof rm.RobotRespawnStatus
         * @instance
         */
        RobotRespawnStatus.prototype.isPendingRespawn = false;

        /**
         * RobotRespawnStatus totalRespawnProgress.
         * @member {number} totalRespawnProgress
         * @memberof rm.RobotRespawnStatus
         * @instance
         */
        RobotRespawnStatus.prototype.totalRespawnProgress = 0;

        /**
         * RobotRespawnStatus currentRespawnProgress.
         * @member {number} currentRespawnProgress
         * @memberof rm.RobotRespawnStatus
         * @instance
         */
        RobotRespawnStatus.prototype.currentRespawnProgress = 0;

        /**
         * RobotRespawnStatus canFreeRespawn.
         * @member {boolean} canFreeRespawn
         * @memberof rm.RobotRespawnStatus
         * @instance
         */
        RobotRespawnStatus.prototype.canFreeRespawn = false;

        /**
         * RobotRespawnStatus goldCostForRespawn.
         * @member {number} goldCostForRespawn
         * @memberof rm.RobotRespawnStatus
         * @instance
         */
        RobotRespawnStatus.prototype.goldCostForRespawn = 0;

        /**
         * RobotRespawnStatus canPayForRespawn.
         * @member {boolean} canPayForRespawn
         * @memberof rm.RobotRespawnStatus
         * @instance
         */
        RobotRespawnStatus.prototype.canPayForRespawn = false;

        /**
         * Creates a new RobotRespawnStatus instance using the specified properties.
         * @function create
         * @memberof rm.RobotRespawnStatus
         * @static
         * @param {rm.IRobotRespawnStatus=} [properties] Properties to set
         * @returns {rm.RobotRespawnStatus} RobotRespawnStatus instance
         */
        RobotRespawnStatus.create = function create(properties) {
            return new RobotRespawnStatus(properties);
        };

        /**
         * Encodes the specified RobotRespawnStatus message. Does not implicitly {@link rm.RobotRespawnStatus.verify|verify} messages.
         * @function encode
         * @memberof rm.RobotRespawnStatus
         * @static
         * @param {rm.IRobotRespawnStatus} message RobotRespawnStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RobotRespawnStatus.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.isPendingRespawn != null && Object.hasOwnProperty.call(message, "isPendingRespawn"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.isPendingRespawn);
            if (message.totalRespawnProgress != null && Object.hasOwnProperty.call(message, "totalRespawnProgress"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.totalRespawnProgress);
            if (message.currentRespawnProgress != null && Object.hasOwnProperty.call(message, "currentRespawnProgress"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.currentRespawnProgress);
            if (message.canFreeRespawn != null && Object.hasOwnProperty.call(message, "canFreeRespawn"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.canFreeRespawn);
            if (message.goldCostForRespawn != null && Object.hasOwnProperty.call(message, "goldCostForRespawn"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.goldCostForRespawn);
            if (message.canPayForRespawn != null && Object.hasOwnProperty.call(message, "canPayForRespawn"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.canPayForRespawn);
            return writer;
        };

        /**
         * Encodes the specified RobotRespawnStatus message, length delimited. Does not implicitly {@link rm.RobotRespawnStatus.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.RobotRespawnStatus
         * @static
         * @param {rm.IRobotRespawnStatus} message RobotRespawnStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RobotRespawnStatus.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RobotRespawnStatus message from the specified reader or buffer.
         * @function decode
         * @memberof rm.RobotRespawnStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.RobotRespawnStatus} RobotRespawnStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RobotRespawnStatus.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.RobotRespawnStatus();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.isPendingRespawn = reader.bool();
                        break;
                    }
                    case 2: {
                        message.totalRespawnProgress = reader.int32();
                        break;
                    }
                    case 3: {
                        message.currentRespawnProgress = reader.int32();
                        break;
                    }
                    case 4: {
                        message.canFreeRespawn = reader.bool();
                        break;
                    }
                    case 5: {
                        message.goldCostForRespawn = reader.int32();
                        break;
                    }
                    case 6: {
                        message.canPayForRespawn = reader.bool();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a RobotRespawnStatus message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.RobotRespawnStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.RobotRespawnStatus} RobotRespawnStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RobotRespawnStatus.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RobotRespawnStatus message.
         * @function verify
         * @memberof rm.RobotRespawnStatus
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RobotRespawnStatus.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.isPendingRespawn != null && message.hasOwnProperty("isPendingRespawn"))
                if (typeof message.isPendingRespawn !== "boolean")
                    return "isPendingRespawn: boolean expected";
            if (message.totalRespawnProgress != null && message.hasOwnProperty("totalRespawnProgress"))
                if (!$util.isInteger(message.totalRespawnProgress))
                    return "totalRespawnProgress: integer expected";
            if (message.currentRespawnProgress != null && message.hasOwnProperty("currentRespawnProgress"))
                if (!$util.isInteger(message.currentRespawnProgress))
                    return "currentRespawnProgress: integer expected";
            if (message.canFreeRespawn != null && message.hasOwnProperty("canFreeRespawn"))
                if (typeof message.canFreeRespawn !== "boolean")
                    return "canFreeRespawn: boolean expected";
            if (message.goldCostForRespawn != null && message.hasOwnProperty("goldCostForRespawn"))
                if (!$util.isInteger(message.goldCostForRespawn))
                    return "goldCostForRespawn: integer expected";
            if (message.canPayForRespawn != null && message.hasOwnProperty("canPayForRespawn"))
                if (typeof message.canPayForRespawn !== "boolean")
                    return "canPayForRespawn: boolean expected";
            return null;
        };

        /**
         * Creates a RobotRespawnStatus message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.RobotRespawnStatus
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.RobotRespawnStatus} RobotRespawnStatus
         */
        RobotRespawnStatus.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.RobotRespawnStatus)
                return object;
            let message = new $root.rm.RobotRespawnStatus();
            if (object.isPendingRespawn != null)
                message.isPendingRespawn = Boolean(object.isPendingRespawn);
            if (object.totalRespawnProgress != null)
                message.totalRespawnProgress = object.totalRespawnProgress | 0;
            if (object.currentRespawnProgress != null)
                message.currentRespawnProgress = object.currentRespawnProgress | 0;
            if (object.canFreeRespawn != null)
                message.canFreeRespawn = Boolean(object.canFreeRespawn);
            if (object.goldCostForRespawn != null)
                message.goldCostForRespawn = object.goldCostForRespawn | 0;
            if (object.canPayForRespawn != null)
                message.canPayForRespawn = Boolean(object.canPayForRespawn);
            return message;
        };

        /**
         * Creates a plain object from a RobotRespawnStatus message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.RobotRespawnStatus
         * @static
         * @param {rm.RobotRespawnStatus} message RobotRespawnStatus
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RobotRespawnStatus.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.isPendingRespawn = false;
                object.totalRespawnProgress = 0;
                object.currentRespawnProgress = 0;
                object.canFreeRespawn = false;
                object.goldCostForRespawn = 0;
                object.canPayForRespawn = false;
            }
            if (message.isPendingRespawn != null && message.hasOwnProperty("isPendingRespawn"))
                object.isPendingRespawn = message.isPendingRespawn;
            if (message.totalRespawnProgress != null && message.hasOwnProperty("totalRespawnProgress"))
                object.totalRespawnProgress = message.totalRespawnProgress;
            if (message.currentRespawnProgress != null && message.hasOwnProperty("currentRespawnProgress"))
                object.currentRespawnProgress = message.currentRespawnProgress;
            if (message.canFreeRespawn != null && message.hasOwnProperty("canFreeRespawn"))
                object.canFreeRespawn = message.canFreeRespawn;
            if (message.goldCostForRespawn != null && message.hasOwnProperty("goldCostForRespawn"))
                object.goldCostForRespawn = message.goldCostForRespawn;
            if (message.canPayForRespawn != null && message.hasOwnProperty("canPayForRespawn"))
                object.canPayForRespawn = message.canPayForRespawn;
            return object;
        };

        /**
         * Converts this RobotRespawnStatus to JSON.
         * @function toJSON
         * @memberof rm.RobotRespawnStatus
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RobotRespawnStatus.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RobotRespawnStatus
         * @function getTypeUrl
         * @memberof rm.RobotRespawnStatus
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RobotRespawnStatus.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.RobotRespawnStatus";
        };

        return RobotRespawnStatus;
    })();

    rm.RobotStaticStatus = (function () {

        /**
         * Properties of a RobotStaticStatus.
         * @memberof rm
         * @interface IRobotStaticStatus
         * @property {number|null} [connectionState] RobotStaticStatus connectionState
         * @property {number|null} [fieldState] RobotStaticStatus fieldState
         * @property {number|null} [aliveState] RobotStaticStatus aliveState
         * @property {number|null} [robotId] RobotStaticStatus robotId
         * @property {number|null} [robotType] RobotStaticStatus robotType
         * @property {number|null} [performanceSystemShooter] RobotStaticStatus performanceSystemShooter
         * @property {number|null} [performanceSystemChassis] RobotStaticStatus performanceSystemChassis
         * @property {number|null} [level] RobotStaticStatus level
         * @property {number|null} [maxHealth] RobotStaticStatus maxHealth
         * @property {number|null} [maxHeat] RobotStaticStatus maxHeat
         * @property {number|null} [heatCooldownRate] RobotStaticStatus heatCooldownRate
         * @property {number|null} [maxPower] RobotStaticStatus maxPower
         * @property {number|null} [maxBufferEnergy] RobotStaticStatus maxBufferEnergy
         * @property {number|null} [maxChassisEnergy] RobotStaticStatus maxChassisEnergy
         */

        /**
         * Constructs a new RobotStaticStatus.
         * @memberof rm
         * @classdesc Represents a RobotStaticStatus.
         * @implements IRobotStaticStatus
         * @constructor
         * @param {rm.IRobotStaticStatus=} [properties] Properties to set
         */
        function RobotStaticStatus(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RobotStaticStatus connectionState.
         * @member {number} connectionState
         * @memberof rm.RobotStaticStatus
         * @instance
         */
        RobotStaticStatus.prototype.connectionState = 0;

        /**
         * RobotStaticStatus fieldState.
         * @member {number} fieldState
         * @memberof rm.RobotStaticStatus
         * @instance
         */
        RobotStaticStatus.prototype.fieldState = 0;

        /**
         * RobotStaticStatus aliveState.
         * @member {number} aliveState
         * @memberof rm.RobotStaticStatus
         * @instance
         */
        RobotStaticStatus.prototype.aliveState = 0;

        /**
         * RobotStaticStatus robotId.
         * @member {number} robotId
         * @memberof rm.RobotStaticStatus
         * @instance
         */
        RobotStaticStatus.prototype.robotId = 0;

        /**
         * RobotStaticStatus robotType.
         * @member {number} robotType
         * @memberof rm.RobotStaticStatus
         * @instance
         */
        RobotStaticStatus.prototype.robotType = 0;

        /**
         * RobotStaticStatus performanceSystemShooter.
         * @member {number} performanceSystemShooter
         * @memberof rm.RobotStaticStatus
         * @instance
         */
        RobotStaticStatus.prototype.performanceSystemShooter = 0;

        /**
         * RobotStaticStatus performanceSystemChassis.
         * @member {number} performanceSystemChassis
         * @memberof rm.RobotStaticStatus
         * @instance
         */
        RobotStaticStatus.prototype.performanceSystemChassis = 0;

        /**
         * RobotStaticStatus level.
         * @member {number} level
         * @memberof rm.RobotStaticStatus
         * @instance
         */
        RobotStaticStatus.prototype.level = 0;

        /**
         * RobotStaticStatus maxHealth.
         * @member {number} maxHealth
         * @memberof rm.RobotStaticStatus
         * @instance
         */
        RobotStaticStatus.prototype.maxHealth = 0;

        /**
         * RobotStaticStatus maxHeat.
         * @member {number} maxHeat
         * @memberof rm.RobotStaticStatus
         * @instance
         */
        RobotStaticStatus.prototype.maxHeat = 0;

        /**
         * RobotStaticStatus heatCooldownRate.
         * @member {number} heatCooldownRate
         * @memberof rm.RobotStaticStatus
         * @instance
         */
        RobotStaticStatus.prototype.heatCooldownRate = 0;

        /**
         * RobotStaticStatus maxPower.
         * @member {number} maxPower
         * @memberof rm.RobotStaticStatus
         * @instance
         */
        RobotStaticStatus.prototype.maxPower = 0;

        /**
         * RobotStaticStatus maxBufferEnergy.
         * @member {number} maxBufferEnergy
         * @memberof rm.RobotStaticStatus
         * @instance
         */
        RobotStaticStatus.prototype.maxBufferEnergy = 0;

        /**
         * RobotStaticStatus maxChassisEnergy.
         * @member {number} maxChassisEnergy
         * @memberof rm.RobotStaticStatus
         * @instance
         */
        RobotStaticStatus.prototype.maxChassisEnergy = 0;

        /**
         * Creates a new RobotStaticStatus instance using the specified properties.
         * @function create
         * @memberof rm.RobotStaticStatus
         * @static
         * @param {rm.IRobotStaticStatus=} [properties] Properties to set
         * @returns {rm.RobotStaticStatus} RobotStaticStatus instance
         */
        RobotStaticStatus.create = function create(properties) {
            return new RobotStaticStatus(properties);
        };

        /**
         * Encodes the specified RobotStaticStatus message. Does not implicitly {@link rm.RobotStaticStatus.verify|verify} messages.
         * @function encode
         * @memberof rm.RobotStaticStatus
         * @static
         * @param {rm.IRobotStaticStatus} message RobotStaticStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RobotStaticStatus.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.connectionState != null && Object.hasOwnProperty.call(message, "connectionState"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.connectionState);
            if (message.fieldState != null && Object.hasOwnProperty.call(message, "fieldState"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.fieldState);
            if (message.aliveState != null && Object.hasOwnProperty.call(message, "aliveState"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.aliveState);
            if (message.robotId != null && Object.hasOwnProperty.call(message, "robotId"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.robotId);
            if (message.robotType != null && Object.hasOwnProperty.call(message, "robotType"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.robotType);
            if (message.performanceSystemShooter != null && Object.hasOwnProperty.call(message, "performanceSystemShooter"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.performanceSystemShooter);
            if (message.performanceSystemChassis != null && Object.hasOwnProperty.call(message, "performanceSystemChassis"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.performanceSystemChassis);
            if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.level);
            if (message.maxHealth != null && Object.hasOwnProperty.call(message, "maxHealth"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.maxHealth);
            if (message.maxHeat != null && Object.hasOwnProperty.call(message, "maxHeat"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.maxHeat);
            if (message.heatCooldownRate != null && Object.hasOwnProperty.call(message, "heatCooldownRate"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.heatCooldownRate);
            if (message.maxPower != null && Object.hasOwnProperty.call(message, "maxPower"))
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.maxPower);
            if (message.maxBufferEnergy != null && Object.hasOwnProperty.call(message, "maxBufferEnergy"))
                writer.uint32(/* id 13, wireType 0 =*/104).int32(message.maxBufferEnergy);
            if (message.maxChassisEnergy != null && Object.hasOwnProperty.call(message, "maxChassisEnergy"))
                writer.uint32(/* id 14, wireType 0 =*/112).int32(message.maxChassisEnergy);
            return writer;
        };

        /**
         * Encodes the specified RobotStaticStatus message, length delimited. Does not implicitly {@link rm.RobotStaticStatus.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.RobotStaticStatus
         * @static
         * @param {rm.IRobotStaticStatus} message RobotStaticStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RobotStaticStatus.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RobotStaticStatus message from the specified reader or buffer.
         * @function decode
         * @memberof rm.RobotStaticStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.RobotStaticStatus} RobotStaticStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RobotStaticStatus.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.RobotStaticStatus();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.connectionState = reader.int32();
                        break;
                    }
                    case 2: {
                        message.fieldState = reader.int32();
                        break;
                    }
                    case 3: {
                        message.aliveState = reader.int32();
                        break;
                    }
                    case 4: {
                        message.robotId = reader.int32();
                        break;
                    }
                    case 5: {
                        message.robotType = reader.int32();
                        break;
                    }
                    case 6: {
                        message.performanceSystemShooter = reader.int32();
                        break;
                    }
                    case 7: {
                        message.performanceSystemChassis = reader.int32();
                        break;
                    }
                    case 8: {
                        message.level = reader.int32();
                        break;
                    }
                    case 9: {
                        message.maxHealth = reader.int32();
                        break;
                    }
                    case 10: {
                        message.maxHeat = reader.int32();
                        break;
                    }
                    case 11: {
                        message.heatCooldownRate = reader.int32();
                        break;
                    }
                    case 12: {
                        message.maxPower = reader.int32();
                        break;
                    }
                    case 13: {
                        message.maxBufferEnergy = reader.int32();
                        break;
                    }
                    case 14: {
                        message.maxChassisEnergy = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a RobotStaticStatus message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.RobotStaticStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.RobotStaticStatus} RobotStaticStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RobotStaticStatus.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RobotStaticStatus message.
         * @function verify
         * @memberof rm.RobotStaticStatus
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RobotStaticStatus.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.connectionState != null && message.hasOwnProperty("connectionState"))
                if (!$util.isInteger(message.connectionState))
                    return "connectionState: integer expected";
            if (message.fieldState != null && message.hasOwnProperty("fieldState"))
                if (!$util.isInteger(message.fieldState))
                    return "fieldState: integer expected";
            if (message.aliveState != null && message.hasOwnProperty("aliveState"))
                if (!$util.isInteger(message.aliveState))
                    return "aliveState: integer expected";
            if (message.robotId != null && message.hasOwnProperty("robotId"))
                if (!$util.isInteger(message.robotId))
                    return "robotId: integer expected";
            if (message.robotType != null && message.hasOwnProperty("robotType"))
                if (!$util.isInteger(message.robotType))
                    return "robotType: integer expected";
            if (message.performanceSystemShooter != null && message.hasOwnProperty("performanceSystemShooter"))
                if (!$util.isInteger(message.performanceSystemShooter))
                    return "performanceSystemShooter: integer expected";
            if (message.performanceSystemChassis != null && message.hasOwnProperty("performanceSystemChassis"))
                if (!$util.isInteger(message.performanceSystemChassis))
                    return "performanceSystemChassis: integer expected";
            if (message.level != null && message.hasOwnProperty("level"))
                if (!$util.isInteger(message.level))
                    return "level: integer expected";
            if (message.maxHealth != null && message.hasOwnProperty("maxHealth"))
                if (!$util.isInteger(message.maxHealth))
                    return "maxHealth: integer expected";
            if (message.maxHeat != null && message.hasOwnProperty("maxHeat"))
                if (!$util.isInteger(message.maxHeat))
                    return "maxHeat: integer expected";
            if (message.heatCooldownRate != null && message.hasOwnProperty("heatCooldownRate"))
                if (!$util.isInteger(message.heatCooldownRate))
                    return "heatCooldownRate: integer expected";
            if (message.maxPower != null && message.hasOwnProperty("maxPower"))
                if (!$util.isInteger(message.maxPower))
                    return "maxPower: integer expected";
            if (message.maxBufferEnergy != null && message.hasOwnProperty("maxBufferEnergy"))
                if (!$util.isInteger(message.maxBufferEnergy))
                    return "maxBufferEnergy: integer expected";
            if (message.maxChassisEnergy != null && message.hasOwnProperty("maxChassisEnergy"))
                if (!$util.isInteger(message.maxChassisEnergy))
                    return "maxChassisEnergy: integer expected";
            return null;
        };

        /**
         * Creates a RobotStaticStatus message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.RobotStaticStatus
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.RobotStaticStatus} RobotStaticStatus
         */
        RobotStaticStatus.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.RobotStaticStatus)
                return object;
            let message = new $root.rm.RobotStaticStatus();
            if (object.connectionState != null)
                message.connectionState = object.connectionState | 0;
            if (object.fieldState != null)
                message.fieldState = object.fieldState | 0;
            if (object.aliveState != null)
                message.aliveState = object.aliveState | 0;
            if (object.robotId != null)
                message.robotId = object.robotId | 0;
            if (object.robotType != null)
                message.robotType = object.robotType | 0;
            if (object.performanceSystemShooter != null)
                message.performanceSystemShooter = object.performanceSystemShooter | 0;
            if (object.performanceSystemChassis != null)
                message.performanceSystemChassis = object.performanceSystemChassis | 0;
            if (object.level != null)
                message.level = object.level | 0;
            if (object.maxHealth != null)
                message.maxHealth = object.maxHealth | 0;
            if (object.maxHeat != null)
                message.maxHeat = object.maxHeat | 0;
            if (object.heatCooldownRate != null)
                message.heatCooldownRate = object.heatCooldownRate | 0;
            if (object.maxPower != null)
                message.maxPower = object.maxPower | 0;
            if (object.maxBufferEnergy != null)
                message.maxBufferEnergy = object.maxBufferEnergy | 0;
            if (object.maxChassisEnergy != null)
                message.maxChassisEnergy = object.maxChassisEnergy | 0;
            return message;
        };

        /**
         * Creates a plain object from a RobotStaticStatus message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.RobotStaticStatus
         * @static
         * @param {rm.RobotStaticStatus} message RobotStaticStatus
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RobotStaticStatus.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.connectionState = 0;
                object.fieldState = 0;
                object.aliveState = 0;
                object.robotId = 0;
                object.robotType = 0;
                object.performanceSystemShooter = 0;
                object.performanceSystemChassis = 0;
                object.level = 0;
                object.maxHealth = 0;
                object.maxHeat = 0;
                object.heatCooldownRate = 0;
                object.maxPower = 0;
                object.maxBufferEnergy = 0;
                object.maxChassisEnergy = 0;
            }
            if (message.connectionState != null && message.hasOwnProperty("connectionState"))
                object.connectionState = message.connectionState;
            if (message.fieldState != null && message.hasOwnProperty("fieldState"))
                object.fieldState = message.fieldState;
            if (message.aliveState != null && message.hasOwnProperty("aliveState"))
                object.aliveState = message.aliveState;
            if (message.robotId != null && message.hasOwnProperty("robotId"))
                object.robotId = message.robotId;
            if (message.robotType != null && message.hasOwnProperty("robotType"))
                object.robotType = message.robotType;
            if (message.performanceSystemShooter != null && message.hasOwnProperty("performanceSystemShooter"))
                object.performanceSystemShooter = message.performanceSystemShooter;
            if (message.performanceSystemChassis != null && message.hasOwnProperty("performanceSystemChassis"))
                object.performanceSystemChassis = message.performanceSystemChassis;
            if (message.level != null && message.hasOwnProperty("level"))
                object.level = message.level;
            if (message.maxHealth != null && message.hasOwnProperty("maxHealth"))
                object.maxHealth = message.maxHealth;
            if (message.maxHeat != null && message.hasOwnProperty("maxHeat"))
                object.maxHeat = message.maxHeat;
            if (message.heatCooldownRate != null && message.hasOwnProperty("heatCooldownRate"))
                object.heatCooldownRate = message.heatCooldownRate;
            if (message.maxPower != null && message.hasOwnProperty("maxPower"))
                object.maxPower = message.maxPower;
            if (message.maxBufferEnergy != null && message.hasOwnProperty("maxBufferEnergy"))
                object.maxBufferEnergy = message.maxBufferEnergy;
            if (message.maxChassisEnergy != null && message.hasOwnProperty("maxChassisEnergy"))
                object.maxChassisEnergy = message.maxChassisEnergy;
            return object;
        };

        /**
         * Converts this RobotStaticStatus to JSON.
         * @function toJSON
         * @memberof rm.RobotStaticStatus
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RobotStaticStatus.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RobotStaticStatus
         * @function getTypeUrl
         * @memberof rm.RobotStaticStatus
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RobotStaticStatus.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.RobotStaticStatus";
        };

        return RobotStaticStatus;
    })();

    rm.RobotDynamicStatus = (function () {

        /**
         * Properties of a RobotDynamicStatus.
         * @memberof rm
         * @interface IRobotDynamicStatus
         * @property {number|null} [currentHealth] RobotDynamicStatus currentHealth
         * @property {number|null} [currentHeat] RobotDynamicStatus currentHeat
         * @property {number|null} [lastProjectileFireRate] RobotDynamicStatus lastProjectileFireRate
         * @property {number|null} [currentChassisEnergy] RobotDynamicStatus currentChassisEnergy
         * @property {number|null} [currentBufferEnergy] RobotDynamicStatus currentBufferEnergy
         * @property {number|null} [currentExperience] RobotDynamicStatus currentExperience
         * @property {number|null} [experienceForUpgrade] RobotDynamicStatus experienceForUpgrade
         * @property {number|null} [totalProjectilesFired] RobotDynamicStatus totalProjectilesFired
         * @property {number|null} [remainingAmmo] RobotDynamicStatus remainingAmmo
         * @property {boolean|null} [isOutOfCombat] RobotDynamicStatus isOutOfCombat
         * @property {number|null} [outOfCombatCountdown] RobotDynamicStatus outOfCombatCountdown
         * @property {boolean|null} [canRemoteHeal] RobotDynamicStatus canRemoteHeal
         * @property {boolean|null} [canRemoteAmmo] RobotDynamicStatus canRemoteAmmo
         */

        /**
         * Constructs a new RobotDynamicStatus.
         * @memberof rm
         * @classdesc Represents a RobotDynamicStatus.
         * @implements IRobotDynamicStatus
         * @constructor
         * @param {rm.IRobotDynamicStatus=} [properties] Properties to set
         */
        function RobotDynamicStatus(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RobotDynamicStatus currentHealth.
         * @member {number} currentHealth
         * @memberof rm.RobotDynamicStatus
         * @instance
         */
        RobotDynamicStatus.prototype.currentHealth = 0;

        /**
         * RobotDynamicStatus currentHeat.
         * @member {number} currentHeat
         * @memberof rm.RobotDynamicStatus
         * @instance
         */
        RobotDynamicStatus.prototype.currentHeat = 0;

        /**
         * RobotDynamicStatus lastProjectileFireRate.
         * @member {number} lastProjectileFireRate
         * @memberof rm.RobotDynamicStatus
         * @instance
         */
        RobotDynamicStatus.prototype.lastProjectileFireRate = 0;

        /**
         * RobotDynamicStatus currentChassisEnergy.
         * @member {number} currentChassisEnergy
         * @memberof rm.RobotDynamicStatus
         * @instance
         */
        RobotDynamicStatus.prototype.currentChassisEnergy = 0;

        /**
         * RobotDynamicStatus currentBufferEnergy.
         * @member {number} currentBufferEnergy
         * @memberof rm.RobotDynamicStatus
         * @instance
         */
        RobotDynamicStatus.prototype.currentBufferEnergy = 0;

        /**
         * RobotDynamicStatus currentExperience.
         * @member {number} currentExperience
         * @memberof rm.RobotDynamicStatus
         * @instance
         */
        RobotDynamicStatus.prototype.currentExperience = 0;

        /**
         * RobotDynamicStatus experienceForUpgrade.
         * @member {number} experienceForUpgrade
         * @memberof rm.RobotDynamicStatus
         * @instance
         */
        RobotDynamicStatus.prototype.experienceForUpgrade = 0;

        /**
         * RobotDynamicStatus totalProjectilesFired.
         * @member {number} totalProjectilesFired
         * @memberof rm.RobotDynamicStatus
         * @instance
         */
        RobotDynamicStatus.prototype.totalProjectilesFired = 0;

        /**
         * RobotDynamicStatus remainingAmmo.
         * @member {number} remainingAmmo
         * @memberof rm.RobotDynamicStatus
         * @instance
         */
        RobotDynamicStatus.prototype.remainingAmmo = 0;

        /**
         * RobotDynamicStatus isOutOfCombat.
         * @member {boolean} isOutOfCombat
         * @memberof rm.RobotDynamicStatus
         * @instance
         */
        RobotDynamicStatus.prototype.isOutOfCombat = false;

        /**
         * RobotDynamicStatus outOfCombatCountdown.
         * @member {number} outOfCombatCountdown
         * @memberof rm.RobotDynamicStatus
         * @instance
         */
        RobotDynamicStatus.prototype.outOfCombatCountdown = 0;

        /**
         * RobotDynamicStatus canRemoteHeal.
         * @member {boolean} canRemoteHeal
         * @memberof rm.RobotDynamicStatus
         * @instance
         */
        RobotDynamicStatus.prototype.canRemoteHeal = false;

        /**
         * RobotDynamicStatus canRemoteAmmo.
         * @member {boolean} canRemoteAmmo
         * @memberof rm.RobotDynamicStatus
         * @instance
         */
        RobotDynamicStatus.prototype.canRemoteAmmo = false;

        /**
         * Creates a new RobotDynamicStatus instance using the specified properties.
         * @function create
         * @memberof rm.RobotDynamicStatus
         * @static
         * @param {rm.IRobotDynamicStatus=} [properties] Properties to set
         * @returns {rm.RobotDynamicStatus} RobotDynamicStatus instance
         */
        RobotDynamicStatus.create = function create(properties) {
            return new RobotDynamicStatus(properties);
        };

        /**
         * Encodes the specified RobotDynamicStatus message. Does not implicitly {@link rm.RobotDynamicStatus.verify|verify} messages.
         * @function encode
         * @memberof rm.RobotDynamicStatus
         * @static
         * @param {rm.IRobotDynamicStatus} message RobotDynamicStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RobotDynamicStatus.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.currentHealth != null && Object.hasOwnProperty.call(message, "currentHealth"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.currentHealth);
            if (message.currentHeat != null && Object.hasOwnProperty.call(message, "currentHeat"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.currentHeat);
            if (message.lastProjectileFireRate != null && Object.hasOwnProperty.call(message, "lastProjectileFireRate"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.lastProjectileFireRate);
            if (message.currentChassisEnergy != null && Object.hasOwnProperty.call(message, "currentChassisEnergy"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.currentChassisEnergy);
            if (message.currentBufferEnergy != null && Object.hasOwnProperty.call(message, "currentBufferEnergy"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.currentBufferEnergy);
            if (message.currentExperience != null && Object.hasOwnProperty.call(message, "currentExperience"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.currentExperience);
            if (message.experienceForUpgrade != null && Object.hasOwnProperty.call(message, "experienceForUpgrade"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.experienceForUpgrade);
            if (message.totalProjectilesFired != null && Object.hasOwnProperty.call(message, "totalProjectilesFired"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.totalProjectilesFired);
            if (message.remainingAmmo != null && Object.hasOwnProperty.call(message, "remainingAmmo"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.remainingAmmo);
            if (message.isOutOfCombat != null && Object.hasOwnProperty.call(message, "isOutOfCombat"))
                writer.uint32(/* id 10, wireType 0 =*/80).bool(message.isOutOfCombat);
            if (message.outOfCombatCountdown != null && Object.hasOwnProperty.call(message, "outOfCombatCountdown"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.outOfCombatCountdown);
            if (message.canRemoteHeal != null && Object.hasOwnProperty.call(message, "canRemoteHeal"))
                writer.uint32(/* id 12, wireType 0 =*/96).bool(message.canRemoteHeal);
            if (message.canRemoteAmmo != null && Object.hasOwnProperty.call(message, "canRemoteAmmo"))
                writer.uint32(/* id 13, wireType 0 =*/104).bool(message.canRemoteAmmo);
            return writer;
        };

        /**
         * Encodes the specified RobotDynamicStatus message, length delimited. Does not implicitly {@link rm.RobotDynamicStatus.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.RobotDynamicStatus
         * @static
         * @param {rm.IRobotDynamicStatus} message RobotDynamicStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RobotDynamicStatus.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RobotDynamicStatus message from the specified reader or buffer.
         * @function decode
         * @memberof rm.RobotDynamicStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.RobotDynamicStatus} RobotDynamicStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RobotDynamicStatus.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.RobotDynamicStatus();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.currentHealth = reader.int32();
                        break;
                    }
                    case 2: {
                        message.currentHeat = reader.int32();
                        break;
                    }
                    case 3: {
                        message.lastProjectileFireRate = reader.int32();
                        break;
                    }
                    case 4: {
                        message.currentChassisEnergy = reader.int32();
                        break;
                    }
                    case 5: {
                        message.currentBufferEnergy = reader.int32();
                        break;
                    }
                    case 6: {
                        message.currentExperience = reader.int32();
                        break;
                    }
                    case 7: {
                        message.experienceForUpgrade = reader.int32();
                        break;
                    }
                    case 8: {
                        message.totalProjectilesFired = reader.int32();
                        break;
                    }
                    case 9: {
                        message.remainingAmmo = reader.int32();
                        break;
                    }
                    case 10: {
                        message.isOutOfCombat = reader.bool();
                        break;
                    }
                    case 11: {
                        message.outOfCombatCountdown = reader.int32();
                        break;
                    }
                    case 12: {
                        message.canRemoteHeal = reader.bool();
                        break;
                    }
                    case 13: {
                        message.canRemoteAmmo = reader.bool();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a RobotDynamicStatus message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.RobotDynamicStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.RobotDynamicStatus} RobotDynamicStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RobotDynamicStatus.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RobotDynamicStatus message.
         * @function verify
         * @memberof rm.RobotDynamicStatus
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RobotDynamicStatus.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.currentHealth != null && message.hasOwnProperty("currentHealth"))
                if (!$util.isInteger(message.currentHealth))
                    return "currentHealth: integer expected";
            if (message.currentHeat != null && message.hasOwnProperty("currentHeat"))
                if (!$util.isInteger(message.currentHeat))
                    return "currentHeat: integer expected";
            if (message.lastProjectileFireRate != null && message.hasOwnProperty("lastProjectileFireRate"))
                if (!$util.isInteger(message.lastProjectileFireRate))
                    return "lastProjectileFireRate: integer expected";
            if (message.currentChassisEnergy != null && message.hasOwnProperty("currentChassisEnergy"))
                if (!$util.isInteger(message.currentChassisEnergy))
                    return "currentChassisEnergy: integer expected";
            if (message.currentBufferEnergy != null && message.hasOwnProperty("currentBufferEnergy"))
                if (!$util.isInteger(message.currentBufferEnergy))
                    return "currentBufferEnergy: integer expected";
            if (message.currentExperience != null && message.hasOwnProperty("currentExperience"))
                if (!$util.isInteger(message.currentExperience))
                    return "currentExperience: integer expected";
            if (message.experienceForUpgrade != null && message.hasOwnProperty("experienceForUpgrade"))
                if (!$util.isInteger(message.experienceForUpgrade))
                    return "experienceForUpgrade: integer expected";
            if (message.totalProjectilesFired != null && message.hasOwnProperty("totalProjectilesFired"))
                if (!$util.isInteger(message.totalProjectilesFired))
                    return "totalProjectilesFired: integer expected";
            if (message.remainingAmmo != null && message.hasOwnProperty("remainingAmmo"))
                if (!$util.isInteger(message.remainingAmmo))
                    return "remainingAmmo: integer expected";
            if (message.isOutOfCombat != null && message.hasOwnProperty("isOutOfCombat"))
                if (typeof message.isOutOfCombat !== "boolean")
                    return "isOutOfCombat: boolean expected";
            if (message.outOfCombatCountdown != null && message.hasOwnProperty("outOfCombatCountdown"))
                if (!$util.isInteger(message.outOfCombatCountdown))
                    return "outOfCombatCountdown: integer expected";
            if (message.canRemoteHeal != null && message.hasOwnProperty("canRemoteHeal"))
                if (typeof message.canRemoteHeal !== "boolean")
                    return "canRemoteHeal: boolean expected";
            if (message.canRemoteAmmo != null && message.hasOwnProperty("canRemoteAmmo"))
                if (typeof message.canRemoteAmmo !== "boolean")
                    return "canRemoteAmmo: boolean expected";
            return null;
        };

        /**
         * Creates a RobotDynamicStatus message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.RobotDynamicStatus
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.RobotDynamicStatus} RobotDynamicStatus
         */
        RobotDynamicStatus.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.RobotDynamicStatus)
                return object;
            let message = new $root.rm.RobotDynamicStatus();
            if (object.currentHealth != null)
                message.currentHealth = object.currentHealth | 0;
            if (object.currentHeat != null)
                message.currentHeat = object.currentHeat | 0;
            if (object.lastProjectileFireRate != null)
                message.lastProjectileFireRate = object.lastProjectileFireRate | 0;
            if (object.currentChassisEnergy != null)
                message.currentChassisEnergy = object.currentChassisEnergy | 0;
            if (object.currentBufferEnergy != null)
                message.currentBufferEnergy = object.currentBufferEnergy | 0;
            if (object.currentExperience != null)
                message.currentExperience = object.currentExperience | 0;
            if (object.experienceForUpgrade != null)
                message.experienceForUpgrade = object.experienceForUpgrade | 0;
            if (object.totalProjectilesFired != null)
                message.totalProjectilesFired = object.totalProjectilesFired | 0;
            if (object.remainingAmmo != null)
                message.remainingAmmo = object.remainingAmmo | 0;
            if (object.isOutOfCombat != null)
                message.isOutOfCombat = Boolean(object.isOutOfCombat);
            if (object.outOfCombatCountdown != null)
                message.outOfCombatCountdown = object.outOfCombatCountdown | 0;
            if (object.canRemoteHeal != null)
                message.canRemoteHeal = Boolean(object.canRemoteHeal);
            if (object.canRemoteAmmo != null)
                message.canRemoteAmmo = Boolean(object.canRemoteAmmo);
            return message;
        };

        /**
         * Creates a plain object from a RobotDynamicStatus message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.RobotDynamicStatus
         * @static
         * @param {rm.RobotDynamicStatus} message RobotDynamicStatus
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RobotDynamicStatus.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.currentHealth = 0;
                object.currentHeat = 0;
                object.lastProjectileFireRate = 0;
                object.currentChassisEnergy = 0;
                object.currentBufferEnergy = 0;
                object.currentExperience = 0;
                object.experienceForUpgrade = 0;
                object.totalProjectilesFired = 0;
                object.remainingAmmo = 0;
                object.isOutOfCombat = false;
                object.outOfCombatCountdown = 0;
                object.canRemoteHeal = false;
                object.canRemoteAmmo = false;
            }
            if (message.currentHealth != null && message.hasOwnProperty("currentHealth"))
                object.currentHealth = message.currentHealth;
            if (message.currentHeat != null && message.hasOwnProperty("currentHeat"))
                object.currentHeat = message.currentHeat;
            if (message.lastProjectileFireRate != null && message.hasOwnProperty("lastProjectileFireRate"))
                object.lastProjectileFireRate = message.lastProjectileFireRate;
            if (message.currentChassisEnergy != null && message.hasOwnProperty("currentChassisEnergy"))
                object.currentChassisEnergy = message.currentChassisEnergy;
            if (message.currentBufferEnergy != null && message.hasOwnProperty("currentBufferEnergy"))
                object.currentBufferEnergy = message.currentBufferEnergy;
            if (message.currentExperience != null && message.hasOwnProperty("currentExperience"))
                object.currentExperience = message.currentExperience;
            if (message.experienceForUpgrade != null && message.hasOwnProperty("experienceForUpgrade"))
                object.experienceForUpgrade = message.experienceForUpgrade;
            if (message.totalProjectilesFired != null && message.hasOwnProperty("totalProjectilesFired"))
                object.totalProjectilesFired = message.totalProjectilesFired;
            if (message.remainingAmmo != null && message.hasOwnProperty("remainingAmmo"))
                object.remainingAmmo = message.remainingAmmo;
            if (message.isOutOfCombat != null && message.hasOwnProperty("isOutOfCombat"))
                object.isOutOfCombat = message.isOutOfCombat;
            if (message.outOfCombatCountdown != null && message.hasOwnProperty("outOfCombatCountdown"))
                object.outOfCombatCountdown = message.outOfCombatCountdown;
            if (message.canRemoteHeal != null && message.hasOwnProperty("canRemoteHeal"))
                object.canRemoteHeal = message.canRemoteHeal;
            if (message.canRemoteAmmo != null && message.hasOwnProperty("canRemoteAmmo"))
                object.canRemoteAmmo = message.canRemoteAmmo;
            return object;
        };

        /**
         * Converts this RobotDynamicStatus to JSON.
         * @function toJSON
         * @memberof rm.RobotDynamicStatus
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RobotDynamicStatus.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RobotDynamicStatus
         * @function getTypeUrl
         * @memberof rm.RobotDynamicStatus
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RobotDynamicStatus.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.RobotDynamicStatus";
        };

        return RobotDynamicStatus;
    })();

    rm.RobotModuleStatus = (function () {

        /**
         * Properties of a RobotModuleStatus.
         * @memberof rm
         * @interface IRobotModuleStatus
         * @property {number|null} [powerManager] RobotModuleStatus powerManager
         * @property {number|null} [rfid] RobotModuleStatus rfid
         * @property {number|null} [lightStrip] RobotModuleStatus lightStrip
         * @property {number|null} [smallShooter] RobotModuleStatus smallShooter
         * @property {number|null} [bigShooter] RobotModuleStatus bigShooter
         * @property {number|null} [uwb] RobotModuleStatus uwb
         * @property {number|null} [armor] RobotModuleStatus armor
         * @property {number|null} [videoTransmission] RobotModuleStatus videoTransmission
         * @property {number|null} [capacitor] RobotModuleStatus capacitor
         * @property {number|null} [mainController] RobotModuleStatus mainController
         */

        /**
         * Constructs a new RobotModuleStatus.
         * @memberof rm
         * @classdesc Represents a RobotModuleStatus.
         * @implements IRobotModuleStatus
         * @constructor
         * @param {rm.IRobotModuleStatus=} [properties] Properties to set
         */
        function RobotModuleStatus(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RobotModuleStatus powerManager.
         * @member {number} powerManager
         * @memberof rm.RobotModuleStatus
         * @instance
         */
        RobotModuleStatus.prototype.powerManager = 0;

        /**
         * RobotModuleStatus rfid.
         * @member {number} rfid
         * @memberof rm.RobotModuleStatus
         * @instance
         */
        RobotModuleStatus.prototype.rfid = 0;

        /**
         * RobotModuleStatus lightStrip.
         * @member {number} lightStrip
         * @memberof rm.RobotModuleStatus
         * @instance
         */
        RobotModuleStatus.prototype.lightStrip = 0;

        /**
         * RobotModuleStatus smallShooter.
         * @member {number} smallShooter
         * @memberof rm.RobotModuleStatus
         * @instance
         */
        RobotModuleStatus.prototype.smallShooter = 0;

        /**
         * RobotModuleStatus bigShooter.
         * @member {number} bigShooter
         * @memberof rm.RobotModuleStatus
         * @instance
         */
        RobotModuleStatus.prototype.bigShooter = 0;

        /**
         * RobotModuleStatus uwb.
         * @member {number} uwb
         * @memberof rm.RobotModuleStatus
         * @instance
         */
        RobotModuleStatus.prototype.uwb = 0;

        /**
         * RobotModuleStatus armor.
         * @member {number} armor
         * @memberof rm.RobotModuleStatus
         * @instance
         */
        RobotModuleStatus.prototype.armor = 0;

        /**
         * RobotModuleStatus videoTransmission.
         * @member {number} videoTransmission
         * @memberof rm.RobotModuleStatus
         * @instance
         */
        RobotModuleStatus.prototype.videoTransmission = 0;

        /**
         * RobotModuleStatus capacitor.
         * @member {number} capacitor
         * @memberof rm.RobotModuleStatus
         * @instance
         */
        RobotModuleStatus.prototype.capacitor = 0;

        /**
         * RobotModuleStatus mainController.
         * @member {number} mainController
         * @memberof rm.RobotModuleStatus
         * @instance
         */
        RobotModuleStatus.prototype.mainController = 0;

        /**
         * Creates a new RobotModuleStatus instance using the specified properties.
         * @function create
         * @memberof rm.RobotModuleStatus
         * @static
         * @param {rm.IRobotModuleStatus=} [properties] Properties to set
         * @returns {rm.RobotModuleStatus} RobotModuleStatus instance
         */
        RobotModuleStatus.create = function create(properties) {
            return new RobotModuleStatus(properties);
        };

        /**
         * Encodes the specified RobotModuleStatus message. Does not implicitly {@link rm.RobotModuleStatus.verify|verify} messages.
         * @function encode
         * @memberof rm.RobotModuleStatus
         * @static
         * @param {rm.IRobotModuleStatus} message RobotModuleStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RobotModuleStatus.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.powerManager != null && Object.hasOwnProperty.call(message, "powerManager"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.powerManager);
            if (message.rfid != null && Object.hasOwnProperty.call(message, "rfid"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.rfid);
            if (message.lightStrip != null && Object.hasOwnProperty.call(message, "lightStrip"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.lightStrip);
            if (message.smallShooter != null && Object.hasOwnProperty.call(message, "smallShooter"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.smallShooter);
            if (message.bigShooter != null && Object.hasOwnProperty.call(message, "bigShooter"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.bigShooter);
            if (message.uwb != null && Object.hasOwnProperty.call(message, "uwb"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.uwb);
            if (message.armor != null && Object.hasOwnProperty.call(message, "armor"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.armor);
            if (message.videoTransmission != null && Object.hasOwnProperty.call(message, "videoTransmission"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.videoTransmission);
            if (message.capacitor != null && Object.hasOwnProperty.call(message, "capacitor"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.capacitor);
            if (message.mainController != null && Object.hasOwnProperty.call(message, "mainController"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.mainController);
            return writer;
        };

        /**
         * Encodes the specified RobotModuleStatus message, length delimited. Does not implicitly {@link rm.RobotModuleStatus.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.RobotModuleStatus
         * @static
         * @param {rm.IRobotModuleStatus} message RobotModuleStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RobotModuleStatus.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RobotModuleStatus message from the specified reader or buffer.
         * @function decode
         * @memberof rm.RobotModuleStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.RobotModuleStatus} RobotModuleStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RobotModuleStatus.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.RobotModuleStatus();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.powerManager = reader.int32();
                        break;
                    }
                    case 2: {
                        message.rfid = reader.int32();
                        break;
                    }
                    case 3: {
                        message.lightStrip = reader.int32();
                        break;
                    }
                    case 4: {
                        message.smallShooter = reader.int32();
                        break;
                    }
                    case 5: {
                        message.bigShooter = reader.int32();
                        break;
                    }
                    case 6: {
                        message.uwb = reader.int32();
                        break;
                    }
                    case 7: {
                        message.armor = reader.int32();
                        break;
                    }
                    case 8: {
                        message.videoTransmission = reader.int32();
                        break;
                    }
                    case 9: {
                        message.capacitor = reader.int32();
                        break;
                    }
                    case 10: {
                        message.mainController = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a RobotModuleStatus message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.RobotModuleStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.RobotModuleStatus} RobotModuleStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RobotModuleStatus.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RobotModuleStatus message.
         * @function verify
         * @memberof rm.RobotModuleStatus
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RobotModuleStatus.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.powerManager != null && message.hasOwnProperty("powerManager"))
                if (!$util.isInteger(message.powerManager))
                    return "powerManager: integer expected";
            if (message.rfid != null && message.hasOwnProperty("rfid"))
                if (!$util.isInteger(message.rfid))
                    return "rfid: integer expected";
            if (message.lightStrip != null && message.hasOwnProperty("lightStrip"))
                if (!$util.isInteger(message.lightStrip))
                    return "lightStrip: integer expected";
            if (message.smallShooter != null && message.hasOwnProperty("smallShooter"))
                if (!$util.isInteger(message.smallShooter))
                    return "smallShooter: integer expected";
            if (message.bigShooter != null && message.hasOwnProperty("bigShooter"))
                if (!$util.isInteger(message.bigShooter))
                    return "bigShooter: integer expected";
            if (message.uwb != null && message.hasOwnProperty("uwb"))
                if (!$util.isInteger(message.uwb))
                    return "uwb: integer expected";
            if (message.armor != null && message.hasOwnProperty("armor"))
                if (!$util.isInteger(message.armor))
                    return "armor: integer expected";
            if (message.videoTransmission != null && message.hasOwnProperty("videoTransmission"))
                if (!$util.isInteger(message.videoTransmission))
                    return "videoTransmission: integer expected";
            if (message.capacitor != null && message.hasOwnProperty("capacitor"))
                if (!$util.isInteger(message.capacitor))
                    return "capacitor: integer expected";
            if (message.mainController != null && message.hasOwnProperty("mainController"))
                if (!$util.isInteger(message.mainController))
                    return "mainController: integer expected";
            return null;
        };

        /**
         * Creates a RobotModuleStatus message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.RobotModuleStatus
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.RobotModuleStatus} RobotModuleStatus
         */
        RobotModuleStatus.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.RobotModuleStatus)
                return object;
            let message = new $root.rm.RobotModuleStatus();
            if (object.powerManager != null)
                message.powerManager = object.powerManager | 0;
            if (object.rfid != null)
                message.rfid = object.rfid | 0;
            if (object.lightStrip != null)
                message.lightStrip = object.lightStrip | 0;
            if (object.smallShooter != null)
                message.smallShooter = object.smallShooter | 0;
            if (object.bigShooter != null)
                message.bigShooter = object.bigShooter | 0;
            if (object.uwb != null)
                message.uwb = object.uwb | 0;
            if (object.armor != null)
                message.armor = object.armor | 0;
            if (object.videoTransmission != null)
                message.videoTransmission = object.videoTransmission | 0;
            if (object.capacitor != null)
                message.capacitor = object.capacitor | 0;
            if (object.mainController != null)
                message.mainController = object.mainController | 0;
            return message;
        };

        /**
         * Creates a plain object from a RobotModuleStatus message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.RobotModuleStatus
         * @static
         * @param {rm.RobotModuleStatus} message RobotModuleStatus
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RobotModuleStatus.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.powerManager = 0;
                object.rfid = 0;
                object.lightStrip = 0;
                object.smallShooter = 0;
                object.bigShooter = 0;
                object.uwb = 0;
                object.armor = 0;
                object.videoTransmission = 0;
                object.capacitor = 0;
                object.mainController = 0;
            }
            if (message.powerManager != null && message.hasOwnProperty("powerManager"))
                object.powerManager = message.powerManager;
            if (message.rfid != null && message.hasOwnProperty("rfid"))
                object.rfid = message.rfid;
            if (message.lightStrip != null && message.hasOwnProperty("lightStrip"))
                object.lightStrip = message.lightStrip;
            if (message.smallShooter != null && message.hasOwnProperty("smallShooter"))
                object.smallShooter = message.smallShooter;
            if (message.bigShooter != null && message.hasOwnProperty("bigShooter"))
                object.bigShooter = message.bigShooter;
            if (message.uwb != null && message.hasOwnProperty("uwb"))
                object.uwb = message.uwb;
            if (message.armor != null && message.hasOwnProperty("armor"))
                object.armor = message.armor;
            if (message.videoTransmission != null && message.hasOwnProperty("videoTransmission"))
                object.videoTransmission = message.videoTransmission;
            if (message.capacitor != null && message.hasOwnProperty("capacitor"))
                object.capacitor = message.capacitor;
            if (message.mainController != null && message.hasOwnProperty("mainController"))
                object.mainController = message.mainController;
            return object;
        };

        /**
         * Converts this RobotModuleStatus to JSON.
         * @function toJSON
         * @memberof rm.RobotModuleStatus
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RobotModuleStatus.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RobotModuleStatus
         * @function getTypeUrl
         * @memberof rm.RobotModuleStatus
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RobotModuleStatus.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.RobotModuleStatus";
        };

        return RobotModuleStatus;
    })();

    rm.RobotPosition = (function () {

        /**
         * Properties of a RobotPosition.
         * @memberof rm
         * @interface IRobotPosition
         * @property {number|null} [x] RobotPosition x
         * @property {number|null} [y] RobotPosition y
         * @property {number|null} [z] RobotPosition z
         * @property {number|null} [yaw] RobotPosition yaw
         */

        /**
         * Constructs a new RobotPosition.
         * @memberof rm
         * @classdesc Represents a RobotPosition.
         * @implements IRobotPosition
         * @constructor
         * @param {rm.IRobotPosition=} [properties] Properties to set
         */
        function RobotPosition(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RobotPosition x.
         * @member {number} x
         * @memberof rm.RobotPosition
         * @instance
         */
        RobotPosition.prototype.x = 0;

        /**
         * RobotPosition y.
         * @member {number} y
         * @memberof rm.RobotPosition
         * @instance
         */
        RobotPosition.prototype.y = 0;

        /**
         * RobotPosition z.
         * @member {number} z
         * @memberof rm.RobotPosition
         * @instance
         */
        RobotPosition.prototype.z = 0;

        /**
         * RobotPosition yaw.
         * @member {number} yaw
         * @memberof rm.RobotPosition
         * @instance
         */
        RobotPosition.prototype.yaw = 0;

        /**
         * Creates a new RobotPosition instance using the specified properties.
         * @function create
         * @memberof rm.RobotPosition
         * @static
         * @param {rm.IRobotPosition=} [properties] Properties to set
         * @returns {rm.RobotPosition} RobotPosition instance
         */
        RobotPosition.create = function create(properties) {
            return new RobotPosition(properties);
        };

        /**
         * Encodes the specified RobotPosition message. Does not implicitly {@link rm.RobotPosition.verify|verify} messages.
         * @function encode
         * @memberof rm.RobotPosition
         * @static
         * @param {rm.IRobotPosition} message RobotPosition message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RobotPosition.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
            if (message.z != null && Object.hasOwnProperty.call(message, "z"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.z);
            if (message.yaw != null && Object.hasOwnProperty.call(message, "yaw"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.yaw);
            return writer;
        };

        /**
         * Encodes the specified RobotPosition message, length delimited. Does not implicitly {@link rm.RobotPosition.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.RobotPosition
         * @static
         * @param {rm.IRobotPosition} message RobotPosition message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RobotPosition.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RobotPosition message from the specified reader or buffer.
         * @function decode
         * @memberof rm.RobotPosition
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.RobotPosition} RobotPosition
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RobotPosition.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.RobotPosition();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.x = reader.float();
                        break;
                    }
                    case 2: {
                        message.y = reader.float();
                        break;
                    }
                    case 3: {
                        message.z = reader.float();
                        break;
                    }
                    case 4: {
                        message.yaw = reader.float();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a RobotPosition message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.RobotPosition
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.RobotPosition} RobotPosition
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RobotPosition.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RobotPosition message.
         * @function verify
         * @memberof rm.RobotPosition
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RobotPosition.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (typeof message.x !== "number")
                    return "x: number expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (typeof message.y !== "number")
                    return "y: number expected";
            if (message.z != null && message.hasOwnProperty("z"))
                if (typeof message.z !== "number")
                    return "z: number expected";
            if (message.yaw != null && message.hasOwnProperty("yaw"))
                if (typeof message.yaw !== "number")
                    return "yaw: number expected";
            return null;
        };

        /**
         * Creates a RobotPosition message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.RobotPosition
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.RobotPosition} RobotPosition
         */
        RobotPosition.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.RobotPosition)
                return object;
            let message = new $root.rm.RobotPosition();
            if (object.x != null)
                message.x = Number(object.x);
            if (object.y != null)
                message.y = Number(object.y);
            if (object.z != null)
                message.z = Number(object.z);
            if (object.yaw != null)
                message.yaw = Number(object.yaw);
            return message;
        };

        /**
         * Creates a plain object from a RobotPosition message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.RobotPosition
         * @static
         * @param {rm.RobotPosition} message RobotPosition
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RobotPosition.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
                object.z = 0;
                object.yaw = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
            if (message.z != null && message.hasOwnProperty("z"))
                object.z = options.json && !isFinite(message.z) ? String(message.z) : message.z;
            if (message.yaw != null && message.hasOwnProperty("yaw"))
                object.yaw = options.json && !isFinite(message.yaw) ? String(message.yaw) : message.yaw;
            return object;
        };

        /**
         * Converts this RobotPosition to JSON.
         * @function toJSON
         * @memberof rm.RobotPosition
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RobotPosition.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RobotPosition
         * @function getTypeUrl
         * @memberof rm.RobotPosition
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RobotPosition.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.RobotPosition";
        };

        return RobotPosition;
    })();

    rm.Buff = (function () {

        /**
         * Properties of a Buff.
         * @memberof rm
         * @interface IBuff
         * @property {number|null} [robotId] Buff robotId
         * @property {number|null} [buffType] Buff buffType
         * @property {number|null} [buffLevel] Buff buffLevel
         * @property {number|null} [buffMaxTime] Buff buffMaxTime
         * @property {number|null} [buffLeftTime] Buff buffLeftTime
         * @property {string|null} [msgParams] Buff msgParams
         */

        /**
         * Constructs a new Buff.
         * @memberof rm
         * @classdesc Represents a Buff.
         * @implements IBuff
         * @constructor
         * @param {rm.IBuff=} [properties] Properties to set
         */
        function Buff(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Buff robotId.
         * @member {number} robotId
         * @memberof rm.Buff
         * @instance
         */
        Buff.prototype.robotId = 0;

        /**
         * Buff buffType.
         * @member {number} buffType
         * @memberof rm.Buff
         * @instance
         */
        Buff.prototype.buffType = 0;

        /**
         * Buff buffLevel.
         * @member {number} buffLevel
         * @memberof rm.Buff
         * @instance
         */
        Buff.prototype.buffLevel = 0;

        /**
         * Buff buffMaxTime.
         * @member {number} buffMaxTime
         * @memberof rm.Buff
         * @instance
         */
        Buff.prototype.buffMaxTime = 0;

        /**
         * Buff buffLeftTime.
         * @member {number} buffLeftTime
         * @memberof rm.Buff
         * @instance
         */
        Buff.prototype.buffLeftTime = 0;

        /**
         * Buff msgParams.
         * @member {string} msgParams
         * @memberof rm.Buff
         * @instance
         */
        Buff.prototype.msgParams = "";

        /**
         * Creates a new Buff instance using the specified properties.
         * @function create
         * @memberof rm.Buff
         * @static
         * @param {rm.IBuff=} [properties] Properties to set
         * @returns {rm.Buff} Buff instance
         */
        Buff.create = function create(properties) {
            return new Buff(properties);
        };

        /**
         * Encodes the specified Buff message. Does not implicitly {@link rm.Buff.verify|verify} messages.
         * @function encode
         * @memberof rm.Buff
         * @static
         * @param {rm.IBuff} message Buff message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Buff.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.robotId != null && Object.hasOwnProperty.call(message, "robotId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.robotId);
            if (message.buffType != null && Object.hasOwnProperty.call(message, "buffType"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.buffType);
            if (message.buffLevel != null && Object.hasOwnProperty.call(message, "buffLevel"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.buffLevel);
            if (message.buffMaxTime != null && Object.hasOwnProperty.call(message, "buffMaxTime"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.buffMaxTime);
            if (message.buffLeftTime != null && Object.hasOwnProperty.call(message, "buffLeftTime"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.buffLeftTime);
            if (message.msgParams != null && Object.hasOwnProperty.call(message, "msgParams"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.msgParams);
            return writer;
        };

        /**
         * Encodes the specified Buff message, length delimited. Does not implicitly {@link rm.Buff.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.Buff
         * @static
         * @param {rm.IBuff} message Buff message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Buff.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Buff message from the specified reader or buffer.
         * @function decode
         * @memberof rm.Buff
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.Buff} Buff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Buff.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.Buff();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.robotId = reader.int32();
                        break;
                    }
                    case 2: {
                        message.buffType = reader.int32();
                        break;
                    }
                    case 3: {
                        message.buffLevel = reader.float();
                        break;
                    }
                    case 4: {
                        message.buffMaxTime = reader.int32();
                        break;
                    }
                    case 5: {
                        message.buffLeftTime = reader.int32();
                        break;
                    }
                    case 6: {
                        message.msgParams = reader.string();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a Buff message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.Buff
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.Buff} Buff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Buff.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Buff message.
         * @function verify
         * @memberof rm.Buff
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Buff.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.robotId != null && message.hasOwnProperty("robotId"))
                if (!$util.isInteger(message.robotId))
                    return "robotId: integer expected";
            if (message.buffType != null && message.hasOwnProperty("buffType"))
                if (!$util.isInteger(message.buffType))
                    return "buffType: integer expected";
            if (message.buffLevel != null && message.hasOwnProperty("buffLevel"))
                if (typeof message.buffLevel !== "number")
                    return "buffLevel: number expected";
            if (message.buffMaxTime != null && message.hasOwnProperty("buffMaxTime"))
                if (!$util.isInteger(message.buffMaxTime))
                    return "buffMaxTime: integer expected";
            if (message.buffLeftTime != null && message.hasOwnProperty("buffLeftTime"))
                if (!$util.isInteger(message.buffLeftTime))
                    return "buffLeftTime: integer expected";
            if (message.msgParams != null && message.hasOwnProperty("msgParams"))
                if (!$util.isString(message.msgParams))
                    return "msgParams: string expected";
            return null;
        };

        /**
         * Creates a Buff message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.Buff
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.Buff} Buff
         */
        Buff.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.Buff)
                return object;
            let message = new $root.rm.Buff();
            if (object.robotId != null)
                message.robotId = object.robotId | 0;
            if (object.buffType != null)
                message.buffType = object.buffType | 0;
            if (object.buffLevel != null)
                message.buffLevel = Number(object.buffLevel);
            if (object.buffMaxTime != null)
                message.buffMaxTime = object.buffMaxTime | 0;
            if (object.buffLeftTime != null)
                message.buffLeftTime = object.buffLeftTime | 0;
            if (object.msgParams != null)
                message.msgParams = String(object.msgParams);
            return message;
        };

        /**
         * Creates a plain object from a Buff message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.Buff
         * @static
         * @param {rm.Buff} message Buff
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Buff.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.robotId = 0;
                object.buffType = 0;
                object.buffLevel = 0;
                object.buffMaxTime = 0;
                object.buffLeftTime = 0;
                object.msgParams = "";
            }
            if (message.robotId != null && message.hasOwnProperty("robotId"))
                object.robotId = message.robotId;
            if (message.buffType != null && message.hasOwnProperty("buffType"))
                object.buffType = message.buffType;
            if (message.buffLevel != null && message.hasOwnProperty("buffLevel"))
                object.buffLevel = options.json && !isFinite(message.buffLevel) ? String(message.buffLevel) : message.buffLevel;
            if (message.buffMaxTime != null && message.hasOwnProperty("buffMaxTime"))
                object.buffMaxTime = message.buffMaxTime;
            if (message.buffLeftTime != null && message.hasOwnProperty("buffLeftTime"))
                object.buffLeftTime = message.buffLeftTime;
            if (message.msgParams != null && message.hasOwnProperty("msgParams"))
                object.msgParams = message.msgParams;
            return object;
        };

        /**
         * Converts this Buff to JSON.
         * @function toJSON
         * @memberof rm.Buff
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Buff.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Buff
         * @function getTypeUrl
         * @memberof rm.Buff
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Buff.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.Buff";
        };

        return Buff;
    })();

    rm.PenaltyInfo = (function () {

        /**
         * Properties of a PenaltyInfo.
         * @memberof rm
         * @interface IPenaltyInfo
         * @property {number|null} [penaltyType] PenaltyInfo penaltyType
         * @property {number|null} [penaltyEffectSec] PenaltyInfo penaltyEffectSec
         * @property {number|null} [totalPenaltyNum] PenaltyInfo totalPenaltyNum
         */

        /**
         * Constructs a new PenaltyInfo.
         * @memberof rm
         * @classdesc Represents a PenaltyInfo.
         * @implements IPenaltyInfo
         * @constructor
         * @param {rm.IPenaltyInfo=} [properties] Properties to set
         */
        function PenaltyInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PenaltyInfo penaltyType.
         * @member {number} penaltyType
         * @memberof rm.PenaltyInfo
         * @instance
         */
        PenaltyInfo.prototype.penaltyType = 0;

        /**
         * PenaltyInfo penaltyEffectSec.
         * @member {number} penaltyEffectSec
         * @memberof rm.PenaltyInfo
         * @instance
         */
        PenaltyInfo.prototype.penaltyEffectSec = 0;

        /**
         * PenaltyInfo totalPenaltyNum.
         * @member {number} totalPenaltyNum
         * @memberof rm.PenaltyInfo
         * @instance
         */
        PenaltyInfo.prototype.totalPenaltyNum = 0;

        /**
         * Creates a new PenaltyInfo instance using the specified properties.
         * @function create
         * @memberof rm.PenaltyInfo
         * @static
         * @param {rm.IPenaltyInfo=} [properties] Properties to set
         * @returns {rm.PenaltyInfo} PenaltyInfo instance
         */
        PenaltyInfo.create = function create(properties) {
            return new PenaltyInfo(properties);
        };

        /**
         * Encodes the specified PenaltyInfo message. Does not implicitly {@link rm.PenaltyInfo.verify|verify} messages.
         * @function encode
         * @memberof rm.PenaltyInfo
         * @static
         * @param {rm.IPenaltyInfo} message PenaltyInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PenaltyInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.penaltyType != null && Object.hasOwnProperty.call(message, "penaltyType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.penaltyType);
            if (message.penaltyEffectSec != null && Object.hasOwnProperty.call(message, "penaltyEffectSec"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.penaltyEffectSec);
            if (message.totalPenaltyNum != null && Object.hasOwnProperty.call(message, "totalPenaltyNum"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.totalPenaltyNum);
            return writer;
        };

        /**
         * Encodes the specified PenaltyInfo message, length delimited. Does not implicitly {@link rm.PenaltyInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.PenaltyInfo
         * @static
         * @param {rm.IPenaltyInfo} message PenaltyInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PenaltyInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PenaltyInfo message from the specified reader or buffer.
         * @function decode
         * @memberof rm.PenaltyInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.PenaltyInfo} PenaltyInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PenaltyInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.PenaltyInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.penaltyType = reader.int32();
                        break;
                    }
                    case 2: {
                        message.penaltyEffectSec = reader.int32();
                        break;
                    }
                    case 3: {
                        message.totalPenaltyNum = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a PenaltyInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.PenaltyInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.PenaltyInfo} PenaltyInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PenaltyInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PenaltyInfo message.
         * @function verify
         * @memberof rm.PenaltyInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PenaltyInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.penaltyType != null && message.hasOwnProperty("penaltyType"))
                if (!$util.isInteger(message.penaltyType))
                    return "penaltyType: integer expected";
            if (message.penaltyEffectSec != null && message.hasOwnProperty("penaltyEffectSec"))
                if (!$util.isInteger(message.penaltyEffectSec))
                    return "penaltyEffectSec: integer expected";
            if (message.totalPenaltyNum != null && message.hasOwnProperty("totalPenaltyNum"))
                if (!$util.isInteger(message.totalPenaltyNum))
                    return "totalPenaltyNum: integer expected";
            return null;
        };

        /**
         * Creates a PenaltyInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.PenaltyInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.PenaltyInfo} PenaltyInfo
         */
        PenaltyInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.PenaltyInfo)
                return object;
            let message = new $root.rm.PenaltyInfo();
            if (object.penaltyType != null)
                message.penaltyType = object.penaltyType | 0;
            if (object.penaltyEffectSec != null)
                message.penaltyEffectSec = object.penaltyEffectSec | 0;
            if (object.totalPenaltyNum != null)
                message.totalPenaltyNum = object.totalPenaltyNum | 0;
            return message;
        };

        /**
         * Creates a plain object from a PenaltyInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.PenaltyInfo
         * @static
         * @param {rm.PenaltyInfo} message PenaltyInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PenaltyInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.penaltyType = 0;
                object.penaltyEffectSec = 0;
                object.totalPenaltyNum = 0;
            }
            if (message.penaltyType != null && message.hasOwnProperty("penaltyType"))
                object.penaltyType = message.penaltyType;
            if (message.penaltyEffectSec != null && message.hasOwnProperty("penaltyEffectSec"))
                object.penaltyEffectSec = message.penaltyEffectSec;
            if (message.totalPenaltyNum != null && message.hasOwnProperty("totalPenaltyNum"))
                object.totalPenaltyNum = message.totalPenaltyNum;
            return object;
        };

        /**
         * Converts this PenaltyInfo to JSON.
         * @function toJSON
         * @memberof rm.PenaltyInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PenaltyInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PenaltyInfo
         * @function getTypeUrl
         * @memberof rm.PenaltyInfo
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PenaltyInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.PenaltyInfo";
        };

        return PenaltyInfo;
    })();

    rm.RobotPathPlanInfo = (function () {

        /**
         * Properties of a RobotPathPlanInfo.
         * @memberof rm
         * @interface IRobotPathPlanInfo
         * @property {number|null} [intention] RobotPathPlanInfo intention
         * @property {number|null} [startPosX] RobotPathPlanInfo startPosX
         * @property {number|null} [startPosY] RobotPathPlanInfo startPosY
         * @property {Array.<number>|null} [offsetX] RobotPathPlanInfo offsetX
         * @property {Array.<number>|null} [offsetY] RobotPathPlanInfo offsetY
         * @property {number|null} [senderId] RobotPathPlanInfo senderId
         */

        /**
         * Constructs a new RobotPathPlanInfo.
         * @memberof rm
         * @classdesc Represents a RobotPathPlanInfo.
         * @implements IRobotPathPlanInfo
         * @constructor
         * @param {rm.IRobotPathPlanInfo=} [properties] Properties to set
         */
        function RobotPathPlanInfo(properties) {
            this.offsetX = [];
            this.offsetY = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RobotPathPlanInfo intention.
         * @member {number} intention
         * @memberof rm.RobotPathPlanInfo
         * @instance
         */
        RobotPathPlanInfo.prototype.intention = 0;

        /**
         * RobotPathPlanInfo startPosX.
         * @member {number} startPosX
         * @memberof rm.RobotPathPlanInfo
         * @instance
         */
        RobotPathPlanInfo.prototype.startPosX = 0;

        /**
         * RobotPathPlanInfo startPosY.
         * @member {number} startPosY
         * @memberof rm.RobotPathPlanInfo
         * @instance
         */
        RobotPathPlanInfo.prototype.startPosY = 0;

        /**
         * RobotPathPlanInfo offsetX.
         * @member {Array.<number>} offsetX
         * @memberof rm.RobotPathPlanInfo
         * @instance
         */
        RobotPathPlanInfo.prototype.offsetX = $util.emptyArray;

        /**
         * RobotPathPlanInfo offsetY.
         * @member {Array.<number>} offsetY
         * @memberof rm.RobotPathPlanInfo
         * @instance
         */
        RobotPathPlanInfo.prototype.offsetY = $util.emptyArray;

        /**
         * RobotPathPlanInfo senderId.
         * @member {number} senderId
         * @memberof rm.RobotPathPlanInfo
         * @instance
         */
        RobotPathPlanInfo.prototype.senderId = 0;

        /**
         * Creates a new RobotPathPlanInfo instance using the specified properties.
         * @function create
         * @memberof rm.RobotPathPlanInfo
         * @static
         * @param {rm.IRobotPathPlanInfo=} [properties] Properties to set
         * @returns {rm.RobotPathPlanInfo} RobotPathPlanInfo instance
         */
        RobotPathPlanInfo.create = function create(properties) {
            return new RobotPathPlanInfo(properties);
        };

        /**
         * Encodes the specified RobotPathPlanInfo message. Does not implicitly {@link rm.RobotPathPlanInfo.verify|verify} messages.
         * @function encode
         * @memberof rm.RobotPathPlanInfo
         * @static
         * @param {rm.IRobotPathPlanInfo} message RobotPathPlanInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RobotPathPlanInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.intention != null && Object.hasOwnProperty.call(message, "intention"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.intention);
            if (message.startPosX != null && Object.hasOwnProperty.call(message, "startPosX"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.startPosX);
            if (message.startPosY != null && Object.hasOwnProperty.call(message, "startPosY"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.startPosY);
            if (message.offsetX != null && message.offsetX.length) {
                writer.uint32(/* id 4, wireType 2 =*/34).fork();
                for (let i = 0; i < message.offsetX.length; ++i)
                    writer.float(message.offsetX[i]);
                writer.ldelim();
            }
            if (message.offsetY != null && message.offsetY.length) {
                writer.uint32(/* id 5, wireType 2 =*/42).fork();
                for (let i = 0; i < message.offsetY.length; ++i)
                    writer.float(message.offsetY[i]);
                writer.ldelim();
            }
            if (message.senderId != null && Object.hasOwnProperty.call(message, "senderId"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.senderId);
            return writer;
        };

        /**
         * Encodes the specified RobotPathPlanInfo message, length delimited. Does not implicitly {@link rm.RobotPathPlanInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.RobotPathPlanInfo
         * @static
         * @param {rm.IRobotPathPlanInfo} message RobotPathPlanInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RobotPathPlanInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RobotPathPlanInfo message from the specified reader or buffer.
         * @function decode
         * @memberof rm.RobotPathPlanInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.RobotPathPlanInfo} RobotPathPlanInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RobotPathPlanInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.RobotPathPlanInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.intention = reader.int32();
                        break;
                    }
                    case 2: {
                        message.startPosX = reader.float();
                        break;
                    }
                    case 3: {
                        message.startPosY = reader.float();
                        break;
                    }
                    case 4: {
                        if (!(message.offsetX && message.offsetX.length))
                            message.offsetX = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.offsetX.push(reader.float());
                        } else
                            message.offsetX.push(reader.float());
                        break;
                    }
                    case 5: {
                        if (!(message.offsetY && message.offsetY.length))
                            message.offsetY = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.offsetY.push(reader.float());
                        } else
                            message.offsetY.push(reader.float());
                        break;
                    }
                    case 6: {
                        message.senderId = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a RobotPathPlanInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.RobotPathPlanInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.RobotPathPlanInfo} RobotPathPlanInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RobotPathPlanInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RobotPathPlanInfo message.
         * @function verify
         * @memberof rm.RobotPathPlanInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RobotPathPlanInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.intention != null && message.hasOwnProperty("intention"))
                if (!$util.isInteger(message.intention))
                    return "intention: integer expected";
            if (message.startPosX != null && message.hasOwnProperty("startPosX"))
                if (typeof message.startPosX !== "number")
                    return "startPosX: number expected";
            if (message.startPosY != null && message.hasOwnProperty("startPosY"))
                if (typeof message.startPosY !== "number")
                    return "startPosY: number expected";
            if (message.offsetX != null && message.hasOwnProperty("offsetX")) {
                if (!Array.isArray(message.offsetX))
                    return "offsetX: array expected";
                for (let i = 0; i < message.offsetX.length; ++i)
                    if (typeof message.offsetX[i] !== "number")
                        return "offsetX: number[] expected";
            }
            if (message.offsetY != null && message.hasOwnProperty("offsetY")) {
                if (!Array.isArray(message.offsetY))
                    return "offsetY: array expected";
                for (let i = 0; i < message.offsetY.length; ++i)
                    if (typeof message.offsetY[i] !== "number")
                        return "offsetY: number[] expected";
            }
            if (message.senderId != null && message.hasOwnProperty("senderId"))
                if (!$util.isInteger(message.senderId))
                    return "senderId: integer expected";
            return null;
        };

        /**
         * Creates a RobotPathPlanInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.RobotPathPlanInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.RobotPathPlanInfo} RobotPathPlanInfo
         */
        RobotPathPlanInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.RobotPathPlanInfo)
                return object;
            let message = new $root.rm.RobotPathPlanInfo();
            if (object.intention != null)
                message.intention = object.intention | 0;
            if (object.startPosX != null)
                message.startPosX = Number(object.startPosX);
            if (object.startPosY != null)
                message.startPosY = Number(object.startPosY);
            if (object.offsetX) {
                if (!Array.isArray(object.offsetX))
                    throw TypeError(".rm.RobotPathPlanInfo.offsetX: array expected");
                message.offsetX = [];
                for (let i = 0; i < object.offsetX.length; ++i)
                    message.offsetX[i] = Number(object.offsetX[i]);
            }
            if (object.offsetY) {
                if (!Array.isArray(object.offsetY))
                    throw TypeError(".rm.RobotPathPlanInfo.offsetY: array expected");
                message.offsetY = [];
                for (let i = 0; i < object.offsetY.length; ++i)
                    message.offsetY[i] = Number(object.offsetY[i]);
            }
            if (object.senderId != null)
                message.senderId = object.senderId | 0;
            return message;
        };

        /**
         * Creates a plain object from a RobotPathPlanInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.RobotPathPlanInfo
         * @static
         * @param {rm.RobotPathPlanInfo} message RobotPathPlanInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RobotPathPlanInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.offsetX = [];
                object.offsetY = [];
            }
            if (options.defaults) {
                object.intention = 0;
                object.startPosX = 0;
                object.startPosY = 0;
                object.senderId = 0;
            }
            if (message.intention != null && message.hasOwnProperty("intention"))
                object.intention = message.intention;
            if (message.startPosX != null && message.hasOwnProperty("startPosX"))
                object.startPosX = options.json && !isFinite(message.startPosX) ? String(message.startPosX) : message.startPosX;
            if (message.startPosY != null && message.hasOwnProperty("startPosY"))
                object.startPosY = options.json && !isFinite(message.startPosY) ? String(message.startPosY) : message.startPosY;
            if (message.offsetX && message.offsetX.length) {
                object.offsetX = [];
                for (let j = 0; j < message.offsetX.length; ++j)
                    object.offsetX[j] = options.json && !isFinite(message.offsetX[j]) ? String(message.offsetX[j]) : message.offsetX[j];
            }
            if (message.offsetY && message.offsetY.length) {
                object.offsetY = [];
                for (let j = 0; j < message.offsetY.length; ++j)
                    object.offsetY[j] = options.json && !isFinite(message.offsetY[j]) ? String(message.offsetY[j]) : message.offsetY[j];
            }
            if (message.senderId != null && message.hasOwnProperty("senderId"))
                object.senderId = message.senderId;
            return object;
        };

        /**
         * Converts this RobotPathPlanInfo to JSON.
         * @function toJSON
         * @memberof rm.RobotPathPlanInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RobotPathPlanInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RobotPathPlanInfo
         * @function getTypeUrl
         * @memberof rm.RobotPathPlanInfo
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RobotPathPlanInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.RobotPathPlanInfo";
        };

        return RobotPathPlanInfo;
    })();

    rm.MapClickInfoNotify = (function () {

        /**
         * Properties of a MapClickInfoNotify.
         * @memberof rm
         * @interface IMapClickInfoNotify
         * @property {number|null} [isSendAll] MapClickInfoNotify isSendAll
         * @property {Uint8Array|null} [robotId] MapClickInfoNotify robotId
         * @property {number|null} [mode] MapClickInfoNotify mode
         * @property {number|null} [enemyId] MapClickInfoNotify enemyId
         * @property {number|null} [ascii] MapClickInfoNotify ascii
         * @property {number|null} [type] MapClickInfoNotify type
         * @property {number|null} [screenX] MapClickInfoNotify screenX
         * @property {number|null} [screenY] MapClickInfoNotify screenY
         * @property {number|null} [mapX] MapClickInfoNotify mapX
         * @property {number|null} [mapY] MapClickInfoNotify mapY
         */

        /**
         * Constructs a new MapClickInfoNotify.
         * @memberof rm
         * @classdesc Represents a MapClickInfoNotify.
         * @implements IMapClickInfoNotify
         * @constructor
         * @param {rm.IMapClickInfoNotify=} [properties] Properties to set
         */
        function MapClickInfoNotify(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MapClickInfoNotify isSendAll.
         * @member {number} isSendAll
         * @memberof rm.MapClickInfoNotify
         * @instance
         */
        MapClickInfoNotify.prototype.isSendAll = 0;

        /**
         * MapClickInfoNotify robotId.
         * @member {Uint8Array} robotId
         * @memberof rm.MapClickInfoNotify
         * @instance
         */
        MapClickInfoNotify.prototype.robotId = $util.newBuffer([]);

        /**
         * MapClickInfoNotify mode.
         * @member {number} mode
         * @memberof rm.MapClickInfoNotify
         * @instance
         */
        MapClickInfoNotify.prototype.mode = 0;

        /**
         * MapClickInfoNotify enemyId.
         * @member {number} enemyId
         * @memberof rm.MapClickInfoNotify
         * @instance
         */
        MapClickInfoNotify.prototype.enemyId = 0;

        /**
         * MapClickInfoNotify ascii.
         * @member {number} ascii
         * @memberof rm.MapClickInfoNotify
         * @instance
         */
        MapClickInfoNotify.prototype.ascii = 0;

        /**
         * MapClickInfoNotify type.
         * @member {number} type
         * @memberof rm.MapClickInfoNotify
         * @instance
         */
        MapClickInfoNotify.prototype.type = 0;

        /**
         * MapClickInfoNotify screenX.
         * @member {number} screenX
         * @memberof rm.MapClickInfoNotify
         * @instance
         */
        MapClickInfoNotify.prototype.screenX = 0;

        /**
         * MapClickInfoNotify screenY.
         * @member {number} screenY
         * @memberof rm.MapClickInfoNotify
         * @instance
         */
        MapClickInfoNotify.prototype.screenY = 0;

        /**
         * MapClickInfoNotify mapX.
         * @member {number} mapX
         * @memberof rm.MapClickInfoNotify
         * @instance
         */
        MapClickInfoNotify.prototype.mapX = 0;

        /**
         * MapClickInfoNotify mapY.
         * @member {number} mapY
         * @memberof rm.MapClickInfoNotify
         * @instance
         */
        MapClickInfoNotify.prototype.mapY = 0;

        /**
         * Creates a new MapClickInfoNotify instance using the specified properties.
         * @function create
         * @memberof rm.MapClickInfoNotify
         * @static
         * @param {rm.IMapClickInfoNotify=} [properties] Properties to set
         * @returns {rm.MapClickInfoNotify} MapClickInfoNotify instance
         */
        MapClickInfoNotify.create = function create(properties) {
            return new MapClickInfoNotify(properties);
        };

        /**
         * Encodes the specified MapClickInfoNotify message. Does not implicitly {@link rm.MapClickInfoNotify.verify|verify} messages.
         * @function encode
         * @memberof rm.MapClickInfoNotify
         * @static
         * @param {rm.IMapClickInfoNotify} message MapClickInfoNotify message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MapClickInfoNotify.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.isSendAll != null && Object.hasOwnProperty.call(message, "isSendAll"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.isSendAll);
            if (message.robotId != null && Object.hasOwnProperty.call(message, "robotId"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.robotId);
            if (message.mode != null && Object.hasOwnProperty.call(message, "mode"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.mode);
            if (message.enemyId != null && Object.hasOwnProperty.call(message, "enemyId"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.enemyId);
            if (message.ascii != null && Object.hasOwnProperty.call(message, "ascii"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.ascii);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.type);
            if (message.screenX != null && Object.hasOwnProperty.call(message, "screenX"))
                writer.uint32(/* id 7, wireType 5 =*/61).float(message.screenX);
            if (message.screenY != null && Object.hasOwnProperty.call(message, "screenY"))
                writer.uint32(/* id 8, wireType 5 =*/69).float(message.screenY);
            if (message.mapX != null && Object.hasOwnProperty.call(message, "mapX"))
                writer.uint32(/* id 9, wireType 5 =*/77).float(message.mapX);
            if (message.mapY != null && Object.hasOwnProperty.call(message, "mapY"))
                writer.uint32(/* id 10, wireType 5 =*/85).float(message.mapY);
            return writer;
        };

        /**
         * Encodes the specified MapClickInfoNotify message, length delimited. Does not implicitly {@link rm.MapClickInfoNotify.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.MapClickInfoNotify
         * @static
         * @param {rm.IMapClickInfoNotify} message MapClickInfoNotify message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MapClickInfoNotify.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MapClickInfoNotify message from the specified reader or buffer.
         * @function decode
         * @memberof rm.MapClickInfoNotify
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.MapClickInfoNotify} MapClickInfoNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MapClickInfoNotify.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.MapClickInfoNotify();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.isSendAll = reader.int32();
                        break;
                    }
                    case 2: {
                        message.robotId = reader.bytes();
                        break;
                    }
                    case 3: {
                        message.mode = reader.int32();
                        break;
                    }
                    case 4: {
                        message.enemyId = reader.int32();
                        break;
                    }
                    case 5: {
                        message.ascii = reader.int32();
                        break;
                    }
                    case 6: {
                        message.type = reader.int32();
                        break;
                    }
                    case 7: {
                        message.screenX = reader.float();
                        break;
                    }
                    case 8: {
                        message.screenY = reader.float();
                        break;
                    }
                    case 9: {
                        message.mapX = reader.float();
                        break;
                    }
                    case 10: {
                        message.mapY = reader.float();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a MapClickInfoNotify message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.MapClickInfoNotify
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.MapClickInfoNotify} MapClickInfoNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MapClickInfoNotify.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MapClickInfoNotify message.
         * @function verify
         * @memberof rm.MapClickInfoNotify
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MapClickInfoNotify.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.isSendAll != null && message.hasOwnProperty("isSendAll"))
                if (!$util.isInteger(message.isSendAll))
                    return "isSendAll: integer expected";
            if (message.robotId != null && message.hasOwnProperty("robotId"))
                if (!(message.robotId && typeof message.robotId.length === "number" || $util.isString(message.robotId)))
                    return "robotId: buffer expected";
            if (message.mode != null && message.hasOwnProperty("mode"))
                if (!$util.isInteger(message.mode))
                    return "mode: integer expected";
            if (message.enemyId != null && message.hasOwnProperty("enemyId"))
                if (!$util.isInteger(message.enemyId))
                    return "enemyId: integer expected";
            if (message.ascii != null && message.hasOwnProperty("ascii"))
                if (!$util.isInteger(message.ascii))
                    return "ascii: integer expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isInteger(message.type))
                    return "type: integer expected";
            if (message.screenX != null && message.hasOwnProperty("screenX"))
                if (typeof message.screenX !== "number")
                    return "screenX: number expected";
            if (message.screenY != null && message.hasOwnProperty("screenY"))
                if (typeof message.screenY !== "number")
                    return "screenY: number expected";
            if (message.mapX != null && message.hasOwnProperty("mapX"))
                if (typeof message.mapX !== "number")
                    return "mapX: number expected";
            if (message.mapY != null && message.hasOwnProperty("mapY"))
                if (typeof message.mapY !== "number")
                    return "mapY: number expected";
            return null;
        };

        /**
         * Creates a MapClickInfoNotify message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.MapClickInfoNotify
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.MapClickInfoNotify} MapClickInfoNotify
         */
        MapClickInfoNotify.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.MapClickInfoNotify)
                return object;
            let message = new $root.rm.MapClickInfoNotify();
            if (object.isSendAll != null)
                message.isSendAll = object.isSendAll | 0;
            if (object.robotId != null)
                if (typeof object.robotId === "string")
                    $util.base64.decode(object.robotId, message.robotId = $util.newBuffer($util.base64.length(object.robotId)), 0);
                else if (object.robotId.length >= 0)
                    message.robotId = object.robotId;
            if (object.mode != null)
                message.mode = object.mode | 0;
            if (object.enemyId != null)
                message.enemyId = object.enemyId | 0;
            if (object.ascii != null)
                message.ascii = object.ascii | 0;
            if (object.type != null)
                message.type = object.type | 0;
            if (object.screenX != null)
                message.screenX = Number(object.screenX);
            if (object.screenY != null)
                message.screenY = Number(object.screenY);
            if (object.mapX != null)
                message.mapX = Number(object.mapX);
            if (object.mapY != null)
                message.mapY = Number(object.mapY);
            return message;
        };

        /**
         * Creates a plain object from a MapClickInfoNotify message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.MapClickInfoNotify
         * @static
         * @param {rm.MapClickInfoNotify} message MapClickInfoNotify
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MapClickInfoNotify.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.isSendAll = 0;
                if (options.bytes === String)
                    object.robotId = "";
                else {
                    object.robotId = [];
                    if (options.bytes !== Array)
                        object.robotId = $util.newBuffer(object.robotId);
                }
                object.mode = 0;
                object.enemyId = 0;
                object.ascii = 0;
                object.type = 0;
                object.screenX = 0;
                object.screenY = 0;
                object.mapX = 0;
                object.mapY = 0;
            }
            if (message.isSendAll != null && message.hasOwnProperty("isSendAll"))
                object.isSendAll = message.isSendAll;
            if (message.robotId != null && message.hasOwnProperty("robotId"))
                object.robotId = options.bytes === String ? $util.base64.encode(message.robotId, 0, message.robotId.length) : options.bytes === Array ? Array.prototype.slice.call(message.robotId) : message.robotId;
            if (message.mode != null && message.hasOwnProperty("mode"))
                object.mode = message.mode;
            if (message.enemyId != null && message.hasOwnProperty("enemyId"))
                object.enemyId = message.enemyId;
            if (message.ascii != null && message.hasOwnProperty("ascii"))
                object.ascii = message.ascii;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.screenX != null && message.hasOwnProperty("screenX"))
                object.screenX = options.json && !isFinite(message.screenX) ? String(message.screenX) : message.screenX;
            if (message.screenY != null && message.hasOwnProperty("screenY"))
                object.screenY = options.json && !isFinite(message.screenY) ? String(message.screenY) : message.screenY;
            if (message.mapX != null && message.hasOwnProperty("mapX"))
                object.mapX = options.json && !isFinite(message.mapX) ? String(message.mapX) : message.mapX;
            if (message.mapY != null && message.hasOwnProperty("mapY"))
                object.mapY = options.json && !isFinite(message.mapY) ? String(message.mapY) : message.mapY;
            return object;
        };

        /**
         * Converts this MapClickInfoNotify to JSON.
         * @function toJSON
         * @memberof rm.MapClickInfoNotify
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MapClickInfoNotify.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MapClickInfoNotify
         * @function getTypeUrl
         * @memberof rm.MapClickInfoNotify
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MapClickInfoNotify.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.MapClickInfoNotify";
        };

        return MapClickInfoNotify;
    })();

    rm.RaderInfoToClient = (function () {

        /**
         * Properties of a RaderInfoToClient.
         * @memberof rm
         * @interface IRaderInfoToClient
         * @property {number|null} [targetRobotId] RaderInfoToClient targetRobotId
         * @property {number|null} [targetPosX] RaderInfoToClient targetPosX
         * @property {number|null} [targetPosY] RaderInfoToClient targetPosY
         * @property {number|null} [torwardAngle] RaderInfoToClient torwardAngle
         * @property {number|null} [isHighLight] RaderInfoToClient isHighLight
         */

        /**
         * Constructs a new RaderInfoToClient.
         * @memberof rm
         * @classdesc Represents a RaderInfoToClient.
         * @implements IRaderInfoToClient
         * @constructor
         * @param {rm.IRaderInfoToClient=} [properties] Properties to set
         */
        function RaderInfoToClient(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RaderInfoToClient targetRobotId.
         * @member {number} targetRobotId
         * @memberof rm.RaderInfoToClient
         * @instance
         */
        RaderInfoToClient.prototype.targetRobotId = 0;

        /**
         * RaderInfoToClient targetPosX.
         * @member {number} targetPosX
         * @memberof rm.RaderInfoToClient
         * @instance
         */
        RaderInfoToClient.prototype.targetPosX = 0;

        /**
         * RaderInfoToClient targetPosY.
         * @member {number} targetPosY
         * @memberof rm.RaderInfoToClient
         * @instance
         */
        RaderInfoToClient.prototype.targetPosY = 0;

        /**
         * RaderInfoToClient torwardAngle.
         * @member {number} torwardAngle
         * @memberof rm.RaderInfoToClient
         * @instance
         */
        RaderInfoToClient.prototype.torwardAngle = 0;

        /**
         * RaderInfoToClient isHighLight.
         * @member {number} isHighLight
         * @memberof rm.RaderInfoToClient
         * @instance
         */
        RaderInfoToClient.prototype.isHighLight = 0;

        /**
         * Creates a new RaderInfoToClient instance using the specified properties.
         * @function create
         * @memberof rm.RaderInfoToClient
         * @static
         * @param {rm.IRaderInfoToClient=} [properties] Properties to set
         * @returns {rm.RaderInfoToClient} RaderInfoToClient instance
         */
        RaderInfoToClient.create = function create(properties) {
            return new RaderInfoToClient(properties);
        };

        /**
         * Encodes the specified RaderInfoToClient message. Does not implicitly {@link rm.RaderInfoToClient.verify|verify} messages.
         * @function encode
         * @memberof rm.RaderInfoToClient
         * @static
         * @param {rm.IRaderInfoToClient} message RaderInfoToClient message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RaderInfoToClient.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.targetRobotId != null && Object.hasOwnProperty.call(message, "targetRobotId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.targetRobotId);
            if (message.targetPosX != null && Object.hasOwnProperty.call(message, "targetPosX"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.targetPosX);
            if (message.targetPosY != null && Object.hasOwnProperty.call(message, "targetPosY"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.targetPosY);
            if (message.torwardAngle != null && Object.hasOwnProperty.call(message, "torwardAngle"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.torwardAngle);
            if (message.isHighLight != null && Object.hasOwnProperty.call(message, "isHighLight"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.isHighLight);
            return writer;
        };

        /**
         * Encodes the specified RaderInfoToClient message, length delimited. Does not implicitly {@link rm.RaderInfoToClient.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.RaderInfoToClient
         * @static
         * @param {rm.IRaderInfoToClient} message RaderInfoToClient message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RaderInfoToClient.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RaderInfoToClient message from the specified reader or buffer.
         * @function decode
         * @memberof rm.RaderInfoToClient
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.RaderInfoToClient} RaderInfoToClient
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RaderInfoToClient.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.RaderInfoToClient();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.targetRobotId = reader.int32();
                        break;
                    }
                    case 2: {
                        message.targetPosX = reader.float();
                        break;
                    }
                    case 3: {
                        message.targetPosY = reader.float();
                        break;
                    }
                    case 4: {
                        message.torwardAngle = reader.float();
                        break;
                    }
                    case 5: {
                        message.isHighLight = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a RaderInfoToClient message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.RaderInfoToClient
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.RaderInfoToClient} RaderInfoToClient
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RaderInfoToClient.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RaderInfoToClient message.
         * @function verify
         * @memberof rm.RaderInfoToClient
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RaderInfoToClient.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.targetRobotId != null && message.hasOwnProperty("targetRobotId"))
                if (!$util.isInteger(message.targetRobotId))
                    return "targetRobotId: integer expected";
            if (message.targetPosX != null && message.hasOwnProperty("targetPosX"))
                if (typeof message.targetPosX !== "number")
                    return "targetPosX: number expected";
            if (message.targetPosY != null && message.hasOwnProperty("targetPosY"))
                if (typeof message.targetPosY !== "number")
                    return "targetPosY: number expected";
            if (message.torwardAngle != null && message.hasOwnProperty("torwardAngle"))
                if (typeof message.torwardAngle !== "number")
                    return "torwardAngle: number expected";
            if (message.isHighLight != null && message.hasOwnProperty("isHighLight"))
                if (!$util.isInteger(message.isHighLight))
                    return "isHighLight: integer expected";
            return null;
        };

        /**
         * Creates a RaderInfoToClient message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.RaderInfoToClient
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.RaderInfoToClient} RaderInfoToClient
         */
        RaderInfoToClient.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.RaderInfoToClient)
                return object;
            let message = new $root.rm.RaderInfoToClient();
            if (object.targetRobotId != null)
                message.targetRobotId = object.targetRobotId | 0;
            if (object.targetPosX != null)
                message.targetPosX = Number(object.targetPosX);
            if (object.targetPosY != null)
                message.targetPosY = Number(object.targetPosY);
            if (object.torwardAngle != null)
                message.torwardAngle = Number(object.torwardAngle);
            if (object.isHighLight != null)
                message.isHighLight = object.isHighLight | 0;
            return message;
        };

        /**
         * Creates a plain object from a RaderInfoToClient message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.RaderInfoToClient
         * @static
         * @param {rm.RaderInfoToClient} message RaderInfoToClient
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RaderInfoToClient.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.targetRobotId = 0;
                object.targetPosX = 0;
                object.targetPosY = 0;
                object.torwardAngle = 0;
                object.isHighLight = 0;
            }
            if (message.targetRobotId != null && message.hasOwnProperty("targetRobotId"))
                object.targetRobotId = message.targetRobotId;
            if (message.targetPosX != null && message.hasOwnProperty("targetPosX"))
                object.targetPosX = options.json && !isFinite(message.targetPosX) ? String(message.targetPosX) : message.targetPosX;
            if (message.targetPosY != null && message.hasOwnProperty("targetPosY"))
                object.targetPosY = options.json && !isFinite(message.targetPosY) ? String(message.targetPosY) : message.targetPosY;
            if (message.torwardAngle != null && message.hasOwnProperty("torwardAngle"))
                object.torwardAngle = options.json && !isFinite(message.torwardAngle) ? String(message.torwardAngle) : message.torwardAngle;
            if (message.isHighLight != null && message.hasOwnProperty("isHighLight"))
                object.isHighLight = message.isHighLight;
            return object;
        };

        /**
         * Converts this RaderInfoToClient to JSON.
         * @function toJSON
         * @memberof rm.RaderInfoToClient
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RaderInfoToClient.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RaderInfoToClient
         * @function getTypeUrl
         * @memberof rm.RaderInfoToClient
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RaderInfoToClient.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.RaderInfoToClient";
        };

        return RaderInfoToClient;
    })();

    rm.CustomByteBlock = (function () {

        /**
         * Properties of a CustomByteBlock.
         * @memberof rm
         * @interface ICustomByteBlock
         * @property {Uint8Array|null} [data] CustomByteBlock data
         */

        /**
         * Constructs a new CustomByteBlock.
         * @memberof rm
         * @classdesc Represents a CustomByteBlock.
         * @implements ICustomByteBlock
         * @constructor
         * @param {rm.ICustomByteBlock=} [properties] Properties to set
         */
        function CustomByteBlock(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CustomByteBlock data.
         * @member {Uint8Array} data
         * @memberof rm.CustomByteBlock
         * @instance
         */
        CustomByteBlock.prototype.data = $util.newBuffer([]);

        /**
         * Creates a new CustomByteBlock instance using the specified properties.
         * @function create
         * @memberof rm.CustomByteBlock
         * @static
         * @param {rm.ICustomByteBlock=} [properties] Properties to set
         * @returns {rm.CustomByteBlock} CustomByteBlock instance
         */
        CustomByteBlock.create = function create(properties) {
            return new CustomByteBlock(properties);
        };

        /**
         * Encodes the specified CustomByteBlock message. Does not implicitly {@link rm.CustomByteBlock.verify|verify} messages.
         * @function encode
         * @memberof rm.CustomByteBlock
         * @static
         * @param {rm.ICustomByteBlock} message CustomByteBlock message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CustomByteBlock.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.data);
            return writer;
        };

        /**
         * Encodes the specified CustomByteBlock message, length delimited. Does not implicitly {@link rm.CustomByteBlock.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.CustomByteBlock
         * @static
         * @param {rm.ICustomByteBlock} message CustomByteBlock message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CustomByteBlock.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CustomByteBlock message from the specified reader or buffer.
         * @function decode
         * @memberof rm.CustomByteBlock
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.CustomByteBlock} CustomByteBlock
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CustomByteBlock.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.CustomByteBlock();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.data = reader.bytes();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a CustomByteBlock message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.CustomByteBlock
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.CustomByteBlock} CustomByteBlock
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CustomByteBlock.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CustomByteBlock message.
         * @function verify
         * @memberof rm.CustomByteBlock
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CustomByteBlock.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                    return "data: buffer expected";
            return null;
        };

        /**
         * Creates a CustomByteBlock message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.CustomByteBlock
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.CustomByteBlock} CustomByteBlock
         */
        CustomByteBlock.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.CustomByteBlock)
                return object;
            let message = new $root.rm.CustomByteBlock();
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length >= 0)
                    message.data = object.data;
            return message;
        };

        /**
         * Creates a plain object from a CustomByteBlock message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.CustomByteBlock
         * @static
         * @param {rm.CustomByteBlock} message CustomByteBlock
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CustomByteBlock.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            return object;
        };

        /**
         * Converts this CustomByteBlock to JSON.
         * @function toJSON
         * @memberof rm.CustomByteBlock
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CustomByteBlock.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for CustomByteBlock
         * @function getTypeUrl
         * @memberof rm.CustomByteBlock
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        CustomByteBlock.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.CustomByteBlock";
        };

        return CustomByteBlock;
    })();

    rm.AssemblyCommand = (function () {

        /**
         * Properties of an AssemblyCommand.
         * @memberof rm
         * @interface IAssemblyCommand
         * @property {number|null} [operation] AssemblyCommand operation
         * @property {number|null} [difficulty] AssemblyCommand difficulty
         */

        /**
         * Constructs a new AssemblyCommand.
         * @memberof rm
         * @classdesc Represents an AssemblyCommand.
         * @implements IAssemblyCommand
         * @constructor
         * @param {rm.IAssemblyCommand=} [properties] Properties to set
         */
        function AssemblyCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AssemblyCommand operation.
         * @member {number} operation
         * @memberof rm.AssemblyCommand
         * @instance
         */
        AssemblyCommand.prototype.operation = 0;

        /**
         * AssemblyCommand difficulty.
         * @member {number} difficulty
         * @memberof rm.AssemblyCommand
         * @instance
         */
        AssemblyCommand.prototype.difficulty = 0;

        /**
         * Creates a new AssemblyCommand instance using the specified properties.
         * @function create
         * @memberof rm.AssemblyCommand
         * @static
         * @param {rm.IAssemblyCommand=} [properties] Properties to set
         * @returns {rm.AssemblyCommand} AssemblyCommand instance
         */
        AssemblyCommand.create = function create(properties) {
            return new AssemblyCommand(properties);
        };

        /**
         * Encodes the specified AssemblyCommand message. Does not implicitly {@link rm.AssemblyCommand.verify|verify} messages.
         * @function encode
         * @memberof rm.AssemblyCommand
         * @static
         * @param {rm.IAssemblyCommand} message AssemblyCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AssemblyCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.operation != null && Object.hasOwnProperty.call(message, "operation"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.operation);
            if (message.difficulty != null && Object.hasOwnProperty.call(message, "difficulty"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.difficulty);
            return writer;
        };

        /**
         * Encodes the specified AssemblyCommand message, length delimited. Does not implicitly {@link rm.AssemblyCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.AssemblyCommand
         * @static
         * @param {rm.IAssemblyCommand} message AssemblyCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AssemblyCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AssemblyCommand message from the specified reader or buffer.
         * @function decode
         * @memberof rm.AssemblyCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.AssemblyCommand} AssemblyCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AssemblyCommand.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.AssemblyCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.operation = reader.int32();
                        break;
                    }
                    case 2: {
                        message.difficulty = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes an AssemblyCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.AssemblyCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.AssemblyCommand} AssemblyCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AssemblyCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AssemblyCommand message.
         * @function verify
         * @memberof rm.AssemblyCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AssemblyCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.operation != null && message.hasOwnProperty("operation"))
                if (!$util.isInteger(message.operation))
                    return "operation: integer expected";
            if (message.difficulty != null && message.hasOwnProperty("difficulty"))
                if (!$util.isInteger(message.difficulty))
                    return "difficulty: integer expected";
            return null;
        };

        /**
         * Creates an AssemblyCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.AssemblyCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.AssemblyCommand} AssemblyCommand
         */
        AssemblyCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.AssemblyCommand)
                return object;
            let message = new $root.rm.AssemblyCommand();
            if (object.operation != null)
                message.operation = object.operation | 0;
            if (object.difficulty != null)
                message.difficulty = object.difficulty | 0;
            return message;
        };

        /**
         * Creates a plain object from an AssemblyCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.AssemblyCommand
         * @static
         * @param {rm.AssemblyCommand} message AssemblyCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AssemblyCommand.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.operation = 0;
                object.difficulty = 0;
            }
            if (message.operation != null && message.hasOwnProperty("operation"))
                object.operation = message.operation;
            if (message.difficulty != null && message.hasOwnProperty("difficulty"))
                object.difficulty = message.difficulty;
            return object;
        };

        /**
         * Converts this AssemblyCommand to JSON.
         * @function toJSON
         * @memberof rm.AssemblyCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AssemblyCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AssemblyCommand
         * @function getTypeUrl
         * @memberof rm.AssemblyCommand
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AssemblyCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.AssemblyCommand";
        };

        return AssemblyCommand;
    })();

    rm.TechCoreMotionStateSync = (function () {

        /**
         * Properties of a TechCoreMotionStateSync.
         * @memberof rm
         * @interface ITechCoreMotionStateSync
         * @property {number|null} [maximumDifficultyLevel] TechCoreMotionStateSync maximumDifficultyLevel
         * @property {number|null} [status] TechCoreMotionStateSync status
         */

        /**
         * Constructs a new TechCoreMotionStateSync.
         * @memberof rm
         * @classdesc Represents a TechCoreMotionStateSync.
         * @implements ITechCoreMotionStateSync
         * @constructor
         * @param {rm.ITechCoreMotionStateSync=} [properties] Properties to set
         */
        function TechCoreMotionStateSync(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TechCoreMotionStateSync maximumDifficultyLevel.
         * @member {number} maximumDifficultyLevel
         * @memberof rm.TechCoreMotionStateSync
         * @instance
         */
        TechCoreMotionStateSync.prototype.maximumDifficultyLevel = 0;

        /**
         * TechCoreMotionStateSync status.
         * @member {number} status
         * @memberof rm.TechCoreMotionStateSync
         * @instance
         */
        TechCoreMotionStateSync.prototype.status = 0;

        /**
         * Creates a new TechCoreMotionStateSync instance using the specified properties.
         * @function create
         * @memberof rm.TechCoreMotionStateSync
         * @static
         * @param {rm.ITechCoreMotionStateSync=} [properties] Properties to set
         * @returns {rm.TechCoreMotionStateSync} TechCoreMotionStateSync instance
         */
        TechCoreMotionStateSync.create = function create(properties) {
            return new TechCoreMotionStateSync(properties);
        };

        /**
         * Encodes the specified TechCoreMotionStateSync message. Does not implicitly {@link rm.TechCoreMotionStateSync.verify|verify} messages.
         * @function encode
         * @memberof rm.TechCoreMotionStateSync
         * @static
         * @param {rm.ITechCoreMotionStateSync} message TechCoreMotionStateSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TechCoreMotionStateSync.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.maximumDifficultyLevel != null && Object.hasOwnProperty.call(message, "maximumDifficultyLevel"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.maximumDifficultyLevel);
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.status);
            return writer;
        };

        /**
         * Encodes the specified TechCoreMotionStateSync message, length delimited. Does not implicitly {@link rm.TechCoreMotionStateSync.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.TechCoreMotionStateSync
         * @static
         * @param {rm.ITechCoreMotionStateSync} message TechCoreMotionStateSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TechCoreMotionStateSync.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TechCoreMotionStateSync message from the specified reader or buffer.
         * @function decode
         * @memberof rm.TechCoreMotionStateSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.TechCoreMotionStateSync} TechCoreMotionStateSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TechCoreMotionStateSync.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.TechCoreMotionStateSync();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.maximumDifficultyLevel = reader.int32();
                        break;
                    }
                    case 2: {
                        message.status = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a TechCoreMotionStateSync message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.TechCoreMotionStateSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.TechCoreMotionStateSync} TechCoreMotionStateSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TechCoreMotionStateSync.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TechCoreMotionStateSync message.
         * @function verify
         * @memberof rm.TechCoreMotionStateSync
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TechCoreMotionStateSync.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.maximumDifficultyLevel != null && message.hasOwnProperty("maximumDifficultyLevel"))
                if (!$util.isInteger(message.maximumDifficultyLevel))
                    return "maximumDifficultyLevel: integer expected";
            if (message.status != null && message.hasOwnProperty("status"))
                if (!$util.isInteger(message.status))
                    return "status: integer expected";
            return null;
        };

        /**
         * Creates a TechCoreMotionStateSync message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.TechCoreMotionStateSync
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.TechCoreMotionStateSync} TechCoreMotionStateSync
         */
        TechCoreMotionStateSync.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.TechCoreMotionStateSync)
                return object;
            let message = new $root.rm.TechCoreMotionStateSync();
            if (object.maximumDifficultyLevel != null)
                message.maximumDifficultyLevel = object.maximumDifficultyLevel | 0;
            if (object.status != null)
                message.status = object.status | 0;
            return message;
        };

        /**
         * Creates a plain object from a TechCoreMotionStateSync message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.TechCoreMotionStateSync
         * @static
         * @param {rm.TechCoreMotionStateSync} message TechCoreMotionStateSync
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TechCoreMotionStateSync.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.maximumDifficultyLevel = 0;
                object.status = 0;
            }
            if (message.maximumDifficultyLevel != null && message.hasOwnProperty("maximumDifficultyLevel"))
                object.maximumDifficultyLevel = message.maximumDifficultyLevel;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = message.status;
            return object;
        };

        /**
         * Converts this TechCoreMotionStateSync to JSON.
         * @function toJSON
         * @memberof rm.TechCoreMotionStateSync
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TechCoreMotionStateSync.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TechCoreMotionStateSync
         * @function getTypeUrl
         * @memberof rm.TechCoreMotionStateSync
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TechCoreMotionStateSync.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.TechCoreMotionStateSync";
        };

        return TechCoreMotionStateSync;
    })();

    rm.PerformanceSelection = (function () {

        /**
         * Properties of a PerformanceSelection.
         * @memberof rm
         * @interface IPerformanceSelection
         * @property {number|null} [shooter] PerformanceSelection shooter
         * @property {number|null} [chassis] PerformanceSelection chassis
         */

        /**
         * Constructs a new PerformanceSelection.
         * @memberof rm
         * @classdesc Represents a PerformanceSelection.
         * @implements IPerformanceSelection
         * @constructor
         * @param {rm.IPerformanceSelection=} [properties] Properties to set
         */
        function PerformanceSelection(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PerformanceSelection shooter.
         * @member {number} shooter
         * @memberof rm.PerformanceSelection
         * @instance
         */
        PerformanceSelection.prototype.shooter = 0;

        /**
         * PerformanceSelection chassis.
         * @member {number} chassis
         * @memberof rm.PerformanceSelection
         * @instance
         */
        PerformanceSelection.prototype.chassis = 0;

        /**
         * Creates a new PerformanceSelection instance using the specified properties.
         * @function create
         * @memberof rm.PerformanceSelection
         * @static
         * @param {rm.IPerformanceSelection=} [properties] Properties to set
         * @returns {rm.PerformanceSelection} PerformanceSelection instance
         */
        PerformanceSelection.create = function create(properties) {
            return new PerformanceSelection(properties);
        };

        /**
         * Encodes the specified PerformanceSelection message. Does not implicitly {@link rm.PerformanceSelection.verify|verify} messages.
         * @function encode
         * @memberof rm.PerformanceSelection
         * @static
         * @param {rm.IPerformanceSelection} message PerformanceSelection message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PerformanceSelection.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.shooter != null && Object.hasOwnProperty.call(message, "shooter"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.shooter);
            if (message.chassis != null && Object.hasOwnProperty.call(message, "chassis"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.chassis);
            return writer;
        };

        /**
         * Encodes the specified PerformanceSelection message, length delimited. Does not implicitly {@link rm.PerformanceSelection.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.PerformanceSelection
         * @static
         * @param {rm.IPerformanceSelection} message PerformanceSelection message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PerformanceSelection.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PerformanceSelection message from the specified reader or buffer.
         * @function decode
         * @memberof rm.PerformanceSelection
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.PerformanceSelection} PerformanceSelection
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PerformanceSelection.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.PerformanceSelection();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.shooter = reader.int32();
                        break;
                    }
                    case 2: {
                        message.chassis = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a PerformanceSelection message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.PerformanceSelection
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.PerformanceSelection} PerformanceSelection
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PerformanceSelection.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PerformanceSelection message.
         * @function verify
         * @memberof rm.PerformanceSelection
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PerformanceSelection.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.shooter != null && message.hasOwnProperty("shooter"))
                if (!$util.isInteger(message.shooter))
                    return "shooter: integer expected";
            if (message.chassis != null && message.hasOwnProperty("chassis"))
                if (!$util.isInteger(message.chassis))
                    return "chassis: integer expected";
            return null;
        };

        /**
         * Creates a PerformanceSelection message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.PerformanceSelection
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.PerformanceSelection} PerformanceSelection
         */
        PerformanceSelection.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.PerformanceSelection)
                return object;
            let message = new $root.rm.PerformanceSelection();
            if (object.shooter != null)
                message.shooter = object.shooter | 0;
            if (object.chassis != null)
                message.chassis = object.chassis | 0;
            return message;
        };

        /**
         * Creates a plain object from a PerformanceSelection message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.PerformanceSelection
         * @static
         * @param {rm.PerformanceSelection} message PerformanceSelection
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PerformanceSelection.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.shooter = 0;
                object.chassis = 0;
            }
            if (message.shooter != null && message.hasOwnProperty("shooter"))
                object.shooter = message.shooter;
            if (message.chassis != null && message.hasOwnProperty("chassis"))
                object.chassis = message.chassis;
            return object;
        };

        /**
         * Converts this PerformanceSelection to JSON.
         * @function toJSON
         * @memberof rm.PerformanceSelection
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PerformanceSelection.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PerformanceSelection
         * @function getTypeUrl
         * @memberof rm.PerformanceSelection
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PerformanceSelection.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.PerformanceSelection";
        };

        return PerformanceSelection;
    })();

    rm.HeroDeployMode = (function () {

        /**
         * Properties of a HeroDeployMode.
         * @memberof rm
         * @interface IHeroDeployMode
         * @property {number|null} [modeOrStatus] HeroDeployMode modeOrStatus
         */

        /**
         * Constructs a new HeroDeployMode.
         * @memberof rm
         * @classdesc Represents a HeroDeployMode.
         * @implements IHeroDeployMode
         * @constructor
         * @param {rm.IHeroDeployMode=} [properties] Properties to set
         */
        function HeroDeployMode(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HeroDeployMode modeOrStatus.
         * @member {number} modeOrStatus
         * @memberof rm.HeroDeployMode
         * @instance
         */
        HeroDeployMode.prototype.modeOrStatus = 0;

        /**
         * Creates a new HeroDeployMode instance using the specified properties.
         * @function create
         * @memberof rm.HeroDeployMode
         * @static
         * @param {rm.IHeroDeployMode=} [properties] Properties to set
         * @returns {rm.HeroDeployMode} HeroDeployMode instance
         */
        HeroDeployMode.create = function create(properties) {
            return new HeroDeployMode(properties);
        };

        /**
         * Encodes the specified HeroDeployMode message. Does not implicitly {@link rm.HeroDeployMode.verify|verify} messages.
         * @function encode
         * @memberof rm.HeroDeployMode
         * @static
         * @param {rm.IHeroDeployMode} message HeroDeployMode message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeroDeployMode.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.modeOrStatus != null && Object.hasOwnProperty.call(message, "modeOrStatus"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.modeOrStatus);
            return writer;
        };

        /**
         * Encodes the specified HeroDeployMode message, length delimited. Does not implicitly {@link rm.HeroDeployMode.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.HeroDeployMode
         * @static
         * @param {rm.IHeroDeployMode} message HeroDeployMode message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeroDeployMode.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HeroDeployMode message from the specified reader or buffer.
         * @function decode
         * @memberof rm.HeroDeployMode
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.HeroDeployMode} HeroDeployMode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeroDeployMode.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.HeroDeployMode();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.modeOrStatus = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a HeroDeployMode message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.HeroDeployMode
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.HeroDeployMode} HeroDeployMode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeroDeployMode.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HeroDeployMode message.
         * @function verify
         * @memberof rm.HeroDeployMode
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HeroDeployMode.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.modeOrStatus != null && message.hasOwnProperty("modeOrStatus"))
                if (!$util.isInteger(message.modeOrStatus))
                    return "modeOrStatus: integer expected";
            return null;
        };

        /**
         * Creates a HeroDeployMode message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.HeroDeployMode
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.HeroDeployMode} HeroDeployMode
         */
        HeroDeployMode.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.HeroDeployMode)
                return object;
            let message = new $root.rm.HeroDeployMode();
            if (object.modeOrStatus != null)
                message.modeOrStatus = object.modeOrStatus | 0;
            return message;
        };

        /**
         * Creates a plain object from a HeroDeployMode message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.HeroDeployMode
         * @static
         * @param {rm.HeroDeployMode} message HeroDeployMode
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HeroDeployMode.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.modeOrStatus = 0;
            if (message.modeOrStatus != null && message.hasOwnProperty("modeOrStatus"))
                object.modeOrStatus = message.modeOrStatus;
            return object;
        };

        /**
         * Converts this HeroDeployMode to JSON.
         * @function toJSON
         * @memberof rm.HeroDeployMode
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HeroDeployMode.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for HeroDeployMode
         * @function getTypeUrl
         * @memberof rm.HeroDeployMode
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        HeroDeployMode.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.HeroDeployMode";
        };

        return HeroDeployMode;
    })();

    rm.RuneStatus = (function () {

        /**
         * Properties of a RuneStatus.
         * @memberof rm
         * @interface IRuneStatus
         * @property {number|null} [activate] RuneStatus activate
         * @property {number|null} [runeStatus] RuneStatus runeStatus
         * @property {number|null} [activatedArms] RuneStatus activatedArms
         * @property {number|null} [averageRings] RuneStatus averageRings
         */

        /**
         * Constructs a new RuneStatus.
         * @memberof rm
         * @classdesc Represents a RuneStatus.
         * @implements IRuneStatus
         * @constructor
         * @param {rm.IRuneStatus=} [properties] Properties to set
         */
        function RuneStatus(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RuneStatus activate.
         * @member {number} activate
         * @memberof rm.RuneStatus
         * @instance
         */
        RuneStatus.prototype.activate = 0;

        /**
         * RuneStatus runeStatus.
         * @member {number} runeStatus
         * @memberof rm.RuneStatus
         * @instance
         */
        RuneStatus.prototype.runeStatus = 0;

        /**
         * RuneStatus activatedArms.
         * @member {number} activatedArms
         * @memberof rm.RuneStatus
         * @instance
         */
        RuneStatus.prototype.activatedArms = 0;

        /**
         * RuneStatus averageRings.
         * @member {number} averageRings
         * @memberof rm.RuneStatus
         * @instance
         */
        RuneStatus.prototype.averageRings = 0;

        /**
         * Creates a new RuneStatus instance using the specified properties.
         * @function create
         * @memberof rm.RuneStatus
         * @static
         * @param {rm.IRuneStatus=} [properties] Properties to set
         * @returns {rm.RuneStatus} RuneStatus instance
         */
        RuneStatus.create = function create(properties) {
            return new RuneStatus(properties);
        };

        /**
         * Encodes the specified RuneStatus message. Does not implicitly {@link rm.RuneStatus.verify|verify} messages.
         * @function encode
         * @memberof rm.RuneStatus
         * @static
         * @param {rm.IRuneStatus} message RuneStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RuneStatus.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.activate != null && Object.hasOwnProperty.call(message, "activate"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.activate);
            if (message.runeStatus != null && Object.hasOwnProperty.call(message, "runeStatus"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.runeStatus);
            if (message.activatedArms != null && Object.hasOwnProperty.call(message, "activatedArms"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.activatedArms);
            if (message.averageRings != null && Object.hasOwnProperty.call(message, "averageRings"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.averageRings);
            return writer;
        };

        /**
         * Encodes the specified RuneStatus message, length delimited. Does not implicitly {@link rm.RuneStatus.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.RuneStatus
         * @static
         * @param {rm.IRuneStatus} message RuneStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RuneStatus.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RuneStatus message from the specified reader or buffer.
         * @function decode
         * @memberof rm.RuneStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.RuneStatus} RuneStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RuneStatus.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.RuneStatus();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.activate = reader.int32();
                        break;
                    }
                    case 2: {
                        message.runeStatus = reader.int32();
                        break;
                    }
                    case 3: {
                        message.activatedArms = reader.int32();
                        break;
                    }
                    case 4: {
                        message.averageRings = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a RuneStatus message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.RuneStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.RuneStatus} RuneStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RuneStatus.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RuneStatus message.
         * @function verify
         * @memberof rm.RuneStatus
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RuneStatus.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.activate != null && message.hasOwnProperty("activate"))
                if (!$util.isInteger(message.activate))
                    return "activate: integer expected";
            if (message.runeStatus != null && message.hasOwnProperty("runeStatus"))
                if (!$util.isInteger(message.runeStatus))
                    return "runeStatus: integer expected";
            if (message.activatedArms != null && message.hasOwnProperty("activatedArms"))
                if (!$util.isInteger(message.activatedArms))
                    return "activatedArms: integer expected";
            if (message.averageRings != null && message.hasOwnProperty("averageRings"))
                if (!$util.isInteger(message.averageRings))
                    return "averageRings: integer expected";
            return null;
        };

        /**
         * Creates a RuneStatus message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.RuneStatus
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.RuneStatus} RuneStatus
         */
        RuneStatus.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.RuneStatus)
                return object;
            let message = new $root.rm.RuneStatus();
            if (object.activate != null)
                message.activate = object.activate | 0;
            if (object.runeStatus != null)
                message.runeStatus = object.runeStatus | 0;
            if (object.activatedArms != null)
                message.activatedArms = object.activatedArms | 0;
            if (object.averageRings != null)
                message.averageRings = object.averageRings | 0;
            return message;
        };

        /**
         * Creates a plain object from a RuneStatus message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.RuneStatus
         * @static
         * @param {rm.RuneStatus} message RuneStatus
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RuneStatus.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.activate = 0;
                object.runeStatus = 0;
                object.activatedArms = 0;
                object.averageRings = 0;
            }
            if (message.activate != null && message.hasOwnProperty("activate"))
                object.activate = message.activate;
            if (message.runeStatus != null && message.hasOwnProperty("runeStatus"))
                object.runeStatus = message.runeStatus;
            if (message.activatedArms != null && message.hasOwnProperty("activatedArms"))
                object.activatedArms = message.activatedArms;
            if (message.averageRings != null && message.hasOwnProperty("averageRings"))
                object.averageRings = message.averageRings;
            return object;
        };

        /**
         * Converts this RuneStatus to JSON.
         * @function toJSON
         * @memberof rm.RuneStatus
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RuneStatus.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RuneStatus
         * @function getTypeUrl
         * @memberof rm.RuneStatus
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RuneStatus.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.RuneStatus";
        };

        return RuneStatus;
    })();

    rm.SentinelStatusSync = (function () {

        /**
         * Properties of a SentinelStatusSync.
         * @memberof rm
         * @interface ISentinelStatusSync
         * @property {number|null} [postureId] SentinelStatusSync postureId
         * @property {boolean|null} [isWeakened] SentinelStatusSync isWeakened
         */

        /**
         * Constructs a new SentinelStatusSync.
         * @memberof rm
         * @classdesc Represents a SentinelStatusSync.
         * @implements ISentinelStatusSync
         * @constructor
         * @param {rm.ISentinelStatusSync=} [properties] Properties to set
         */
        function SentinelStatusSync(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SentinelStatusSync postureId.
         * @member {number} postureId
         * @memberof rm.SentinelStatusSync
         * @instance
         */
        SentinelStatusSync.prototype.postureId = 0;

        /**
         * SentinelStatusSync isWeakened.
         * @member {boolean} isWeakened
         * @memberof rm.SentinelStatusSync
         * @instance
         */
        SentinelStatusSync.prototype.isWeakened = false;

        /**
         * Creates a new SentinelStatusSync instance using the specified properties.
         * @function create
         * @memberof rm.SentinelStatusSync
         * @static
         * @param {rm.ISentinelStatusSync=} [properties] Properties to set
         * @returns {rm.SentinelStatusSync} SentinelStatusSync instance
         */
        SentinelStatusSync.create = function create(properties) {
            return new SentinelStatusSync(properties);
        };

        /**
         * Encodes the specified SentinelStatusSync message. Does not implicitly {@link rm.SentinelStatusSync.verify|verify} messages.
         * @function encode
         * @memberof rm.SentinelStatusSync
         * @static
         * @param {rm.ISentinelStatusSync} message SentinelStatusSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SentinelStatusSync.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.postureId != null && Object.hasOwnProperty.call(message, "postureId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.postureId);
            if (message.isWeakened != null && Object.hasOwnProperty.call(message, "isWeakened"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isWeakened);
            return writer;
        };

        /**
         * Encodes the specified SentinelStatusSync message, length delimited. Does not implicitly {@link rm.SentinelStatusSync.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.SentinelStatusSync
         * @static
         * @param {rm.ISentinelStatusSync} message SentinelStatusSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SentinelStatusSync.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SentinelStatusSync message from the specified reader or buffer.
         * @function decode
         * @memberof rm.SentinelStatusSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.SentinelStatusSync} SentinelStatusSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SentinelStatusSync.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.SentinelStatusSync();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.postureId = reader.int32();
                        break;
                    }
                    case 2: {
                        message.isWeakened = reader.bool();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a SentinelStatusSync message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.SentinelStatusSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.SentinelStatusSync} SentinelStatusSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SentinelStatusSync.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SentinelStatusSync message.
         * @function verify
         * @memberof rm.SentinelStatusSync
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SentinelStatusSync.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.postureId != null && message.hasOwnProperty("postureId"))
                if (!$util.isInteger(message.postureId))
                    return "postureId: integer expected";
            if (message.isWeakened != null && message.hasOwnProperty("isWeakened"))
                if (typeof message.isWeakened !== "boolean")
                    return "isWeakened: boolean expected";
            return null;
        };

        /**
         * Creates a SentinelStatusSync message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.SentinelStatusSync
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.SentinelStatusSync} SentinelStatusSync
         */
        SentinelStatusSync.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.SentinelStatusSync)
                return object;
            let message = new $root.rm.SentinelStatusSync();
            if (object.postureId != null)
                message.postureId = object.postureId | 0;
            if (object.isWeakened != null)
                message.isWeakened = Boolean(object.isWeakened);
            return message;
        };

        /**
         * Creates a plain object from a SentinelStatusSync message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.SentinelStatusSync
         * @static
         * @param {rm.SentinelStatusSync} message SentinelStatusSync
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SentinelStatusSync.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.postureId = 0;
                object.isWeakened = false;
            }
            if (message.postureId != null && message.hasOwnProperty("postureId"))
                object.postureId = message.postureId;
            if (message.isWeakened != null && message.hasOwnProperty("isWeakened"))
                object.isWeakened = message.isWeakened;
            return object;
        };

        /**
         * Converts this SentinelStatusSync to JSON.
         * @function toJSON
         * @memberof rm.SentinelStatusSync
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SentinelStatusSync.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SentinelStatusSync
         * @function getTypeUrl
         * @memberof rm.SentinelStatusSync
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SentinelStatusSync.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.SentinelStatusSync";
        };

        return SentinelStatusSync;
    })();

    rm.DartInfo = (function () {

        /**
         * Properties of a DartInfo.
         * @memberof rm
         * @interface IDartInfo
         * @property {number|null} [targetId] DartInfo targetId
         * @property {boolean|null} [open] DartInfo open
         */

        /**
         * Constructs a new DartInfo.
         * @memberof rm
         * @classdesc Represents a DartInfo.
         * @implements IDartInfo
         * @constructor
         * @param {rm.IDartInfo=} [properties] Properties to set
         */
        function DartInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DartInfo targetId.
         * @member {number} targetId
         * @memberof rm.DartInfo
         * @instance
         */
        DartInfo.prototype.targetId = 0;

        /**
         * DartInfo open.
         * @member {boolean} open
         * @memberof rm.DartInfo
         * @instance
         */
        DartInfo.prototype.open = false;

        /**
         * Creates a new DartInfo instance using the specified properties.
         * @function create
         * @memberof rm.DartInfo
         * @static
         * @param {rm.IDartInfo=} [properties] Properties to set
         * @returns {rm.DartInfo} DartInfo instance
         */
        DartInfo.create = function create(properties) {
            return new DartInfo(properties);
        };

        /**
         * Encodes the specified DartInfo message. Does not implicitly {@link rm.DartInfo.verify|verify} messages.
         * @function encode
         * @memberof rm.DartInfo
         * @static
         * @param {rm.IDartInfo} message DartInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DartInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.targetId != null && Object.hasOwnProperty.call(message, "targetId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.targetId);
            if (message.open != null && Object.hasOwnProperty.call(message, "open"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.open);
            return writer;
        };

        /**
         * Encodes the specified DartInfo message, length delimited. Does not implicitly {@link rm.DartInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.DartInfo
         * @static
         * @param {rm.IDartInfo} message DartInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DartInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DartInfo message from the specified reader or buffer.
         * @function decode
         * @memberof rm.DartInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.DartInfo} DartInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DartInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.DartInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.targetId = reader.int32();
                        break;
                    }
                    case 2: {
                        message.open = reader.bool();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a DartInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.DartInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.DartInfo} DartInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DartInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DartInfo message.
         * @function verify
         * @memberof rm.DartInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DartInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.targetId != null && message.hasOwnProperty("targetId"))
                if (!$util.isInteger(message.targetId))
                    return "targetId: integer expected";
            if (message.open != null && message.hasOwnProperty("open"))
                if (typeof message.open !== "boolean")
                    return "open: boolean expected";
            return null;
        };

        /**
         * Creates a DartInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.DartInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.DartInfo} DartInfo
         */
        DartInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.DartInfo)
                return object;
            let message = new $root.rm.DartInfo();
            if (object.targetId != null)
                message.targetId = object.targetId | 0;
            if (object.open != null)
                message.open = Boolean(object.open);
            return message;
        };

        /**
         * Creates a plain object from a DartInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.DartInfo
         * @static
         * @param {rm.DartInfo} message DartInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DartInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.targetId = 0;
                object.open = false;
            }
            if (message.targetId != null && message.hasOwnProperty("targetId"))
                object.targetId = message.targetId;
            if (message.open != null && message.hasOwnProperty("open"))
                object.open = message.open;
            return object;
        };

        /**
         * Converts this DartInfo to JSON.
         * @function toJSON
         * @memberof rm.DartInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DartInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DartInfo
         * @function getTypeUrl
         * @memberof rm.DartInfo
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DartInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.DartInfo";
        };

        return DartInfo;
    })();

    rm.GuardCtrl = (function () {

        /**
         * Properties of a GuardCtrl.
         * @memberof rm
         * @interface IGuardCtrl
         * @property {number|null} [commandId] GuardCtrl commandId
         * @property {number|null} [resultCode] GuardCtrl resultCode
         */

        /**
         * Constructs a new GuardCtrl.
         * @memberof rm
         * @classdesc Represents a GuardCtrl.
         * @implements IGuardCtrl
         * @constructor
         * @param {rm.IGuardCtrl=} [properties] Properties to set
         */
        function GuardCtrl(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GuardCtrl commandId.
         * @member {number} commandId
         * @memberof rm.GuardCtrl
         * @instance
         */
        GuardCtrl.prototype.commandId = 0;

        /**
         * GuardCtrl resultCode.
         * @member {number} resultCode
         * @memberof rm.GuardCtrl
         * @instance
         */
        GuardCtrl.prototype.resultCode = 0;

        /**
         * Creates a new GuardCtrl instance using the specified properties.
         * @function create
         * @memberof rm.GuardCtrl
         * @static
         * @param {rm.IGuardCtrl=} [properties] Properties to set
         * @returns {rm.GuardCtrl} GuardCtrl instance
         */
        GuardCtrl.create = function create(properties) {
            return new GuardCtrl(properties);
        };

        /**
         * Encodes the specified GuardCtrl message. Does not implicitly {@link rm.GuardCtrl.verify|verify} messages.
         * @function encode
         * @memberof rm.GuardCtrl
         * @static
         * @param {rm.IGuardCtrl} message GuardCtrl message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GuardCtrl.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.commandId != null && Object.hasOwnProperty.call(message, "commandId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.commandId);
            if (message.resultCode != null && Object.hasOwnProperty.call(message, "resultCode"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.resultCode);
            return writer;
        };

        /**
         * Encodes the specified GuardCtrl message, length delimited. Does not implicitly {@link rm.GuardCtrl.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.GuardCtrl
         * @static
         * @param {rm.IGuardCtrl} message GuardCtrl message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GuardCtrl.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GuardCtrl message from the specified reader or buffer.
         * @function decode
         * @memberof rm.GuardCtrl
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.GuardCtrl} GuardCtrl
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GuardCtrl.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.GuardCtrl();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.commandId = reader.int32();
                        break;
                    }
                    case 2: {
                        message.resultCode = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a GuardCtrl message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.GuardCtrl
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.GuardCtrl} GuardCtrl
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GuardCtrl.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GuardCtrl message.
         * @function verify
         * @memberof rm.GuardCtrl
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GuardCtrl.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.commandId != null && message.hasOwnProperty("commandId"))
                if (!$util.isInteger(message.commandId))
                    return "commandId: integer expected";
            if (message.resultCode != null && message.hasOwnProperty("resultCode"))
                if (!$util.isInteger(message.resultCode))
                    return "resultCode: integer expected";
            return null;
        };

        /**
         * Creates a GuardCtrl message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.GuardCtrl
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.GuardCtrl} GuardCtrl
         */
        GuardCtrl.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.GuardCtrl)
                return object;
            let message = new $root.rm.GuardCtrl();
            if (object.commandId != null)
                message.commandId = object.commandId | 0;
            if (object.resultCode != null)
                message.resultCode = object.resultCode | 0;
            return message;
        };

        /**
         * Creates a plain object from a GuardCtrl message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.GuardCtrl
         * @static
         * @param {rm.GuardCtrl} message GuardCtrl
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GuardCtrl.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.commandId = 0;
                object.resultCode = 0;
            }
            if (message.commandId != null && message.hasOwnProperty("commandId"))
                object.commandId = message.commandId;
            if (message.resultCode != null && message.hasOwnProperty("resultCode"))
                object.resultCode = message.resultCode;
            return object;
        };

        /**
         * Converts this GuardCtrl to JSON.
         * @function toJSON
         * @memberof rm.GuardCtrl
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GuardCtrl.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GuardCtrl
         * @function getTypeUrl
         * @memberof rm.GuardCtrl
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GuardCtrl.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.GuardCtrl";
        };

        return GuardCtrl;
    })();

    rm.AirSupport = (function () {

        /**
         * Properties of an AirSupport.
         * @memberof rm
         * @interface IAirSupport
         * @property {number|null} [commandId] AirSupport commandId
         * @property {number|null} [airsupportStatus] AirSupport airsupportStatus
         * @property {number|null} [leftTime] AirSupport leftTime
         * @property {number|null} [costCoins] AirSupport costCoins
         */

        /**
         * Constructs a new AirSupport.
         * @memberof rm
         * @classdesc Represents an AirSupport.
         * @implements IAirSupport
         * @constructor
         * @param {rm.IAirSupport=} [properties] Properties to set
         */
        function AirSupport(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AirSupport commandId.
         * @member {number} commandId
         * @memberof rm.AirSupport
         * @instance
         */
        AirSupport.prototype.commandId = 0;

        /**
         * AirSupport airsupportStatus.
         * @member {number} airsupportStatus
         * @memberof rm.AirSupport
         * @instance
         */
        AirSupport.prototype.airsupportStatus = 0;

        /**
         * AirSupport leftTime.
         * @member {number} leftTime
         * @memberof rm.AirSupport
         * @instance
         */
        AirSupport.prototype.leftTime = 0;

        /**
         * AirSupport costCoins.
         * @member {number} costCoins
         * @memberof rm.AirSupport
         * @instance
         */
        AirSupport.prototype.costCoins = 0;

        /**
         * Creates a new AirSupport instance using the specified properties.
         * @function create
         * @memberof rm.AirSupport
         * @static
         * @param {rm.IAirSupport=} [properties] Properties to set
         * @returns {rm.AirSupport} AirSupport instance
         */
        AirSupport.create = function create(properties) {
            return new AirSupport(properties);
        };

        /**
         * Encodes the specified AirSupport message. Does not implicitly {@link rm.AirSupport.verify|verify} messages.
         * @function encode
         * @memberof rm.AirSupport
         * @static
         * @param {rm.IAirSupport} message AirSupport message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AirSupport.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.commandId != null && Object.hasOwnProperty.call(message, "commandId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.commandId);
            if (message.airsupportStatus != null && Object.hasOwnProperty.call(message, "airsupportStatus"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.airsupportStatus);
            if (message.leftTime != null && Object.hasOwnProperty.call(message, "leftTime"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.leftTime);
            if (message.costCoins != null && Object.hasOwnProperty.call(message, "costCoins"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.costCoins);
            return writer;
        };

        /**
         * Encodes the specified AirSupport message, length delimited. Does not implicitly {@link rm.AirSupport.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.AirSupport
         * @static
         * @param {rm.IAirSupport} message AirSupport message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AirSupport.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AirSupport message from the specified reader or buffer.
         * @function decode
         * @memberof rm.AirSupport
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.AirSupport} AirSupport
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AirSupport.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.AirSupport();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        message.commandId = reader.int32();
                        break;
                    }
                    case 2: {
                        message.airsupportStatus = reader.int32();
                        break;
                    }
                    case 3: {
                        message.leftTime = reader.int32();
                        break;
                    }
                    case 4: {
                        message.costCoins = reader.int32();
                        break;
                    }
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes an AirSupport message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.AirSupport
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.AirSupport} AirSupport
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AirSupport.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AirSupport message.
         * @function verify
         * @memberof rm.AirSupport
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AirSupport.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.commandId != null && message.hasOwnProperty("commandId"))
                if (!$util.isInteger(message.commandId))
                    return "commandId: integer expected";
            if (message.airsupportStatus != null && message.hasOwnProperty("airsupportStatus"))
                if (!$util.isInteger(message.airsupportStatus))
                    return "airsupportStatus: integer expected";
            if (message.leftTime != null && message.hasOwnProperty("leftTime"))
                if (!$util.isInteger(message.leftTime))
                    return "leftTime: integer expected";
            if (message.costCoins != null && message.hasOwnProperty("costCoins"))
                if (!$util.isInteger(message.costCoins))
                    return "costCoins: integer expected";
            return null;
        };

        /**
         * Creates an AirSupport message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.AirSupport
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.AirSupport} AirSupport
         */
        AirSupport.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.AirSupport)
                return object;
            let message = new $root.rm.AirSupport();
            if (object.commandId != null)
                message.commandId = object.commandId | 0;
            if (object.airsupportStatus != null)
                message.airsupportStatus = object.airsupportStatus | 0;
            if (object.leftTime != null)
                message.leftTime = object.leftTime | 0;
            if (object.costCoins != null)
                message.costCoins = object.costCoins | 0;
            return message;
        };

        /**
         * Creates a plain object from an AirSupport message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.AirSupport
         * @static
         * @param {rm.AirSupport} message AirSupport
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AirSupport.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.commandId = 0;
                object.airsupportStatus = 0;
                object.leftTime = 0;
                object.costCoins = 0;
            }
            if (message.commandId != null && message.hasOwnProperty("commandId"))
                object.commandId = message.commandId;
            if (message.airsupportStatus != null && message.hasOwnProperty("airsupportStatus"))
                object.airsupportStatus = message.airsupportStatus;
            if (message.leftTime != null && message.hasOwnProperty("leftTime"))
                object.leftTime = message.leftTime;
            if (message.costCoins != null && message.hasOwnProperty("costCoins"))
                object.costCoins = message.costCoins;
            return object;
        };

        /**
         * Converts this AirSupport to JSON.
         * @function toJSON
         * @memberof rm.AirSupport
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AirSupport.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AirSupport
         * @function getTypeUrl
         * @memberof rm.AirSupport
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AirSupport.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.AirSupport";
        };

        return AirSupport;
    })();

    return rm;
})();

export { $root as default };
