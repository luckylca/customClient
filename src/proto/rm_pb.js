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

    rm.KeyboardMouseControl = (function() {

        /**
         * Properties of a KeyboardMouseControl.
         * @memberof rm
         * @interface IKeyboardMouseControl
         * @property {number|null} [mouseX] KeyboardMouseControl mouseX
         * @property {number|null} [mouseY] KeyboardMouseControl mouseY
         * @property {number|null} [mouseZ] KeyboardMouseControl mouseZ
         * @property {boolean|null} [leftButtonDown] KeyboardMouseControl leftButtonDown
         * @property {boolean|null} [rightButtonDown] KeyboardMouseControl rightButtonDown
         * @property {number|null} [keyboardValue] KeyboardMouseControl keyboardValue
         * @property {boolean|null} [midButtonDown] KeyboardMouseControl midButtonDown
         */

        /**
         * Constructs a new KeyboardMouseControl.
         * @memberof rm
         * @classdesc Represents a KeyboardMouseControl.
         * @implements IKeyboardMouseControl
         * @constructor
         * @param {rm.IKeyboardMouseControl=} [properties] Properties to set
         */
        function KeyboardMouseControl(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * KeyboardMouseControl mouseX.
         * @member {number} mouseX
         * @memberof rm.KeyboardMouseControl
         * @instance
         */
        KeyboardMouseControl.prototype.mouseX = 0;

        /**
         * KeyboardMouseControl mouseY.
         * @member {number} mouseY
         * @memberof rm.KeyboardMouseControl
         * @instance
         */
        KeyboardMouseControl.prototype.mouseY = 0;

        /**
         * KeyboardMouseControl mouseZ.
         * @member {number} mouseZ
         * @memberof rm.KeyboardMouseControl
         * @instance
         */
        KeyboardMouseControl.prototype.mouseZ = 0;

        /**
         * KeyboardMouseControl leftButtonDown.
         * @member {boolean} leftButtonDown
         * @memberof rm.KeyboardMouseControl
         * @instance
         */
        KeyboardMouseControl.prototype.leftButtonDown = false;

        /**
         * KeyboardMouseControl rightButtonDown.
         * @member {boolean} rightButtonDown
         * @memberof rm.KeyboardMouseControl
         * @instance
         */
        KeyboardMouseControl.prototype.rightButtonDown = false;

        /**
         * KeyboardMouseControl keyboardValue.
         * @member {number} keyboardValue
         * @memberof rm.KeyboardMouseControl
         * @instance
         */
        KeyboardMouseControl.prototype.keyboardValue = 0;

        /**
         * KeyboardMouseControl midButtonDown.
         * @member {boolean} midButtonDown
         * @memberof rm.KeyboardMouseControl
         * @instance
         */
        KeyboardMouseControl.prototype.midButtonDown = false;

        /**
         * Creates a new KeyboardMouseControl instance using the specified properties.
         * @function create
         * @memberof rm.KeyboardMouseControl
         * @static
         * @param {rm.IKeyboardMouseControl=} [properties] Properties to set
         * @returns {rm.KeyboardMouseControl} KeyboardMouseControl instance
         */
        KeyboardMouseControl.create = function create(properties) {
            return new KeyboardMouseControl(properties);
        };

        /**
         * Encodes the specified KeyboardMouseControl message. Does not implicitly {@link rm.KeyboardMouseControl.verify|verify} messages.
         * @function encode
         * @memberof rm.KeyboardMouseControl
         * @static
         * @param {rm.IKeyboardMouseControl} message KeyboardMouseControl message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KeyboardMouseControl.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.mouseX != null && Object.hasOwnProperty.call(message, "mouseX"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.mouseX);
            if (message.mouseY != null && Object.hasOwnProperty.call(message, "mouseY"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.mouseY);
            if (message.mouseZ != null && Object.hasOwnProperty.call(message, "mouseZ"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.mouseZ);
            if (message.leftButtonDown != null && Object.hasOwnProperty.call(message, "leftButtonDown"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.leftButtonDown);
            if (message.rightButtonDown != null && Object.hasOwnProperty.call(message, "rightButtonDown"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.rightButtonDown);
            if (message.keyboardValue != null && Object.hasOwnProperty.call(message, "keyboardValue"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.keyboardValue);
            if (message.midButtonDown != null && Object.hasOwnProperty.call(message, "midButtonDown"))
                writer.uint32(/* id 7, wireType 0 =*/56).bool(message.midButtonDown);
            return writer;
        };

        /**
         * Encodes the specified KeyboardMouseControl message, length delimited. Does not implicitly {@link rm.KeyboardMouseControl.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.KeyboardMouseControl
         * @static
         * @param {rm.IKeyboardMouseControl} message KeyboardMouseControl message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KeyboardMouseControl.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a KeyboardMouseControl message from the specified reader or buffer.
         * @function decode
         * @memberof rm.KeyboardMouseControl
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.KeyboardMouseControl} KeyboardMouseControl
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KeyboardMouseControl.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.KeyboardMouseControl();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.mouseX = reader.int32();
                        break;
                    }
                case 2: {
                        message.mouseY = reader.int32();
                        break;
                    }
                case 3: {
                        message.mouseZ = reader.int32();
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
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a KeyboardMouseControl message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.KeyboardMouseControl
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.KeyboardMouseControl} KeyboardMouseControl
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KeyboardMouseControl.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a KeyboardMouseControl message.
         * @function verify
         * @memberof rm.KeyboardMouseControl
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        KeyboardMouseControl.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.mouseX != null && message.hasOwnProperty("mouseX"))
                if (!$util.isInteger(message.mouseX))
                    return "mouseX: integer expected";
            if (message.mouseY != null && message.hasOwnProperty("mouseY"))
                if (!$util.isInteger(message.mouseY))
                    return "mouseY: integer expected";
            if (message.mouseZ != null && message.hasOwnProperty("mouseZ"))
                if (!$util.isInteger(message.mouseZ))
                    return "mouseZ: integer expected";
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
            return null;
        };

        /**
         * Creates a KeyboardMouseControl message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.KeyboardMouseControl
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.KeyboardMouseControl} KeyboardMouseControl
         */
        KeyboardMouseControl.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.KeyboardMouseControl)
                return object;
            let message = new $root.rm.KeyboardMouseControl();
            if (object.mouseX != null)
                message.mouseX = object.mouseX | 0;
            if (object.mouseY != null)
                message.mouseY = object.mouseY | 0;
            if (object.mouseZ != null)
                message.mouseZ = object.mouseZ | 0;
            if (object.leftButtonDown != null)
                message.leftButtonDown = Boolean(object.leftButtonDown);
            if (object.rightButtonDown != null)
                message.rightButtonDown = Boolean(object.rightButtonDown);
            if (object.keyboardValue != null)
                message.keyboardValue = object.keyboardValue >>> 0;
            if (object.midButtonDown != null)
                message.midButtonDown = Boolean(object.midButtonDown);
            return message;
        };

        /**
         * Creates a plain object from a KeyboardMouseControl message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.KeyboardMouseControl
         * @static
         * @param {rm.KeyboardMouseControl} message KeyboardMouseControl
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        KeyboardMouseControl.toObject = function toObject(message, options) {
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
            }
            if (message.mouseX != null && message.hasOwnProperty("mouseX"))
                object.mouseX = message.mouseX;
            if (message.mouseY != null && message.hasOwnProperty("mouseY"))
                object.mouseY = message.mouseY;
            if (message.mouseZ != null && message.hasOwnProperty("mouseZ"))
                object.mouseZ = message.mouseZ;
            if (message.leftButtonDown != null && message.hasOwnProperty("leftButtonDown"))
                object.leftButtonDown = message.leftButtonDown;
            if (message.rightButtonDown != null && message.hasOwnProperty("rightButtonDown"))
                object.rightButtonDown = message.rightButtonDown;
            if (message.keyboardValue != null && message.hasOwnProperty("keyboardValue"))
                object.keyboardValue = message.keyboardValue;
            if (message.midButtonDown != null && message.hasOwnProperty("midButtonDown"))
                object.midButtonDown = message.midButtonDown;
            return object;
        };

        /**
         * Converts this KeyboardMouseControl to JSON.
         * @function toJSON
         * @memberof rm.KeyboardMouseControl
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        KeyboardMouseControl.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for KeyboardMouseControl
         * @function getTypeUrl
         * @memberof rm.KeyboardMouseControl
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        KeyboardMouseControl.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.KeyboardMouseControl";
        };

        return KeyboardMouseControl;
    })();

    rm.CustomControl = (function() {

        /**
         * Properties of a CustomControl.
         * @memberof rm
         * @interface ICustomControl
         * @property {Uint8Array|null} [data] CustomControl data
         */

        /**
         * Constructs a new CustomControl.
         * @memberof rm
         * @classdesc Represents a CustomControl.
         * @implements ICustomControl
         * @constructor
         * @param {rm.ICustomControl=} [properties] Properties to set
         */
        function CustomControl(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CustomControl data.
         * @member {Uint8Array} data
         * @memberof rm.CustomControl
         * @instance
         */
        CustomControl.prototype.data = $util.newBuffer([]);

        /**
         * Creates a new CustomControl instance using the specified properties.
         * @function create
         * @memberof rm.CustomControl
         * @static
         * @param {rm.ICustomControl=} [properties] Properties to set
         * @returns {rm.CustomControl} CustomControl instance
         */
        CustomControl.create = function create(properties) {
            return new CustomControl(properties);
        };

        /**
         * Encodes the specified CustomControl message. Does not implicitly {@link rm.CustomControl.verify|verify} messages.
         * @function encode
         * @memberof rm.CustomControl
         * @static
         * @param {rm.ICustomControl} message CustomControl message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CustomControl.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.data);
            return writer;
        };

        /**
         * Encodes the specified CustomControl message, length delimited. Does not implicitly {@link rm.CustomControl.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.CustomControl
         * @static
         * @param {rm.ICustomControl} message CustomControl message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CustomControl.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CustomControl message from the specified reader or buffer.
         * @function decode
         * @memberof rm.CustomControl
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.CustomControl} CustomControl
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CustomControl.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.CustomControl();
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
         * Decodes a CustomControl message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.CustomControl
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.CustomControl} CustomControl
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CustomControl.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CustomControl message.
         * @function verify
         * @memberof rm.CustomControl
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CustomControl.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                    return "data: buffer expected";
            return null;
        };

        /**
         * Creates a CustomControl message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.CustomControl
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.CustomControl} CustomControl
         */
        CustomControl.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.CustomControl)
                return object;
            let message = new $root.rm.CustomControl();
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length >= 0)
                    message.data = object.data;
            return message;
        };

        /**
         * Creates a plain object from a CustomControl message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.CustomControl
         * @static
         * @param {rm.CustomControl} message CustomControl
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CustomControl.toObject = function toObject(message, options) {
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
         * Converts this CustomControl to JSON.
         * @function toJSON
         * @memberof rm.CustomControl
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CustomControl.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for CustomControl
         * @function getTypeUrl
         * @memberof rm.CustomControl
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        CustomControl.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.CustomControl";
        };

        return CustomControl;
    })();

    rm.GameStatus = (function() {

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
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.currentRound);
            if (message.totalRounds != null && Object.hasOwnProperty.call(message, "totalRounds"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.totalRounds);
            if (message.redScore != null && Object.hasOwnProperty.call(message, "redScore"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.redScore);
            if (message.blueScore != null && Object.hasOwnProperty.call(message, "blueScore"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.blueScore);
            if (message.currentStage != null && Object.hasOwnProperty.call(message, "currentStage"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.currentStage);
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
                        message.currentRound = reader.uint32();
                        break;
                    }
                case 2: {
                        message.totalRounds = reader.uint32();
                        break;
                    }
                case 3: {
                        message.redScore = reader.uint32();
                        break;
                    }
                case 4: {
                        message.blueScore = reader.uint32();
                        break;
                    }
                case 5: {
                        message.currentStage = reader.uint32();
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
                message.currentRound = object.currentRound >>> 0;
            if (object.totalRounds != null)
                message.totalRounds = object.totalRounds >>> 0;
            if (object.redScore != null)
                message.redScore = object.redScore >>> 0;
            if (object.blueScore != null)
                message.blueScore = object.blueScore >>> 0;
            if (object.currentStage != null)
                message.currentStage = object.currentStage >>> 0;
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

    rm.GlobalUnitStatus = (function() {

        /**
         * Properties of a GlobalUnitStatus.
         * @memberof rm
         * @interface IGlobalUnitStatus
         * @property {number|null} [baseHealth] GlobalUnitStatus baseHealth
         * @property {number|null} [baseStatus] GlobalUnitStatus baseStatus
         * @property {number|null} [baseShield] GlobalUnitStatus baseShield
         * @property {number|null} [outpostHealth] GlobalUnitStatus outpostHealth
         * @property {number|null} [outpostStatus] GlobalUnitStatus outpostStatus
         * @property {number|null} [enemyBaseHealth] GlobalUnitStatus enemyBaseHealth
         * @property {number|null} [enemyBaseStatus] GlobalUnitStatus enemyBaseStatus
         * @property {number|null} [enemyBaseShield] GlobalUnitStatus enemyBaseShield
         * @property {number|null} [enemyOutpostHealth] GlobalUnitStatus enemyOutpostHealth
         * @property {number|null} [enemyOutpostStatus] GlobalUnitStatus enemyOutpostStatus
         * @property {Array.<number>|null} [robotHealth] GlobalUnitStatus robotHealth
         * @property {Array.<number>|null} [robotBullets] GlobalUnitStatus robotBullets
         * @property {number|null} [totalDamageAlly] GlobalUnitStatus totalDamageAlly
         * @property {number|null} [totalDamageEnemy] GlobalUnitStatus totalDamageEnemy
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
         * GlobalUnitStatus enemyBaseHealth.
         * @member {number} enemyBaseHealth
         * @memberof rm.GlobalUnitStatus
         * @instance
         */
        GlobalUnitStatus.prototype.enemyBaseHealth = 0;

        /**
         * GlobalUnitStatus enemyBaseStatus.
         * @member {number} enemyBaseStatus
         * @memberof rm.GlobalUnitStatus
         * @instance
         */
        GlobalUnitStatus.prototype.enemyBaseStatus = 0;

        /**
         * GlobalUnitStatus enemyBaseShield.
         * @member {number} enemyBaseShield
         * @memberof rm.GlobalUnitStatus
         * @instance
         */
        GlobalUnitStatus.prototype.enemyBaseShield = 0;

        /**
         * GlobalUnitStatus enemyOutpostHealth.
         * @member {number} enemyOutpostHealth
         * @memberof rm.GlobalUnitStatus
         * @instance
         */
        GlobalUnitStatus.prototype.enemyOutpostHealth = 0;

        /**
         * GlobalUnitStatus enemyOutpostStatus.
         * @member {number} enemyOutpostStatus
         * @memberof rm.GlobalUnitStatus
         * @instance
         */
        GlobalUnitStatus.prototype.enemyOutpostStatus = 0;

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
         * GlobalUnitStatus totalDamageAlly.
         * @member {number} totalDamageAlly
         * @memberof rm.GlobalUnitStatus
         * @instance
         */
        GlobalUnitStatus.prototype.totalDamageAlly = 0;

        /**
         * GlobalUnitStatus totalDamageEnemy.
         * @member {number} totalDamageEnemy
         * @memberof rm.GlobalUnitStatus
         * @instance
         */
        GlobalUnitStatus.prototype.totalDamageEnemy = 0;

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
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.baseHealth);
            if (message.baseStatus != null && Object.hasOwnProperty.call(message, "baseStatus"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.baseStatus);
            if (message.baseShield != null && Object.hasOwnProperty.call(message, "baseShield"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.baseShield);
            if (message.outpostHealth != null && Object.hasOwnProperty.call(message, "outpostHealth"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.outpostHealth);
            if (message.outpostStatus != null && Object.hasOwnProperty.call(message, "outpostStatus"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.outpostStatus);
            if (message.enemyBaseHealth != null && Object.hasOwnProperty.call(message, "enemyBaseHealth"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.enemyBaseHealth);
            if (message.enemyBaseStatus != null && Object.hasOwnProperty.call(message, "enemyBaseStatus"))
                writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.enemyBaseStatus);
            if (message.enemyBaseShield != null && Object.hasOwnProperty.call(message, "enemyBaseShield"))
                writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.enemyBaseShield);
            if (message.enemyOutpostHealth != null && Object.hasOwnProperty.call(message, "enemyOutpostHealth"))
                writer.uint32(/* id 9, wireType 0 =*/72).uint32(message.enemyOutpostHealth);
            if (message.enemyOutpostStatus != null && Object.hasOwnProperty.call(message, "enemyOutpostStatus"))
                writer.uint32(/* id 10, wireType 0 =*/80).uint32(message.enemyOutpostStatus);
            if (message.robotHealth != null && message.robotHealth.length) {
                writer.uint32(/* id 11, wireType 2 =*/90).fork();
                for (let i = 0; i < message.robotHealth.length; ++i)
                    writer.uint32(message.robotHealth[i]);
                writer.ldelim();
            }
            if (message.robotBullets != null && message.robotBullets.length) {
                writer.uint32(/* id 12, wireType 2 =*/98).fork();
                for (let i = 0; i < message.robotBullets.length; ++i)
                    writer.int32(message.robotBullets[i]);
                writer.ldelim();
            }
            if (message.totalDamageAlly != null && Object.hasOwnProperty.call(message, "totalDamageAlly"))
                writer.uint32(/* id 13, wireType 0 =*/104).uint32(message.totalDamageAlly);
            if (message.totalDamageEnemy != null && Object.hasOwnProperty.call(message, "totalDamageEnemy"))
                writer.uint32(/* id 14, wireType 0 =*/112).uint32(message.totalDamageEnemy);
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
                        message.baseHealth = reader.uint32();
                        break;
                    }
                case 2: {
                        message.baseStatus = reader.uint32();
                        break;
                    }
                case 3: {
                        message.baseShield = reader.uint32();
                        break;
                    }
                case 4: {
                        message.outpostHealth = reader.uint32();
                        break;
                    }
                case 5: {
                        message.outpostStatus = reader.uint32();
                        break;
                    }
                case 6: {
                        message.enemyBaseHealth = reader.uint32();
                        break;
                    }
                case 7: {
                        message.enemyBaseStatus = reader.uint32();
                        break;
                    }
                case 8: {
                        message.enemyBaseShield = reader.uint32();
                        break;
                    }
                case 9: {
                        message.enemyOutpostHealth = reader.uint32();
                        break;
                    }
                case 10: {
                        message.enemyOutpostStatus = reader.uint32();
                        break;
                    }
                case 11: {
                        if (!(message.robotHealth && message.robotHealth.length))
                            message.robotHealth = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.robotHealth.push(reader.uint32());
                        } else
                            message.robotHealth.push(reader.uint32());
                        break;
                    }
                case 12: {
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
                case 13: {
                        message.totalDamageAlly = reader.uint32();
                        break;
                    }
                case 14: {
                        message.totalDamageEnemy = reader.uint32();
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
            if (message.enemyBaseHealth != null && message.hasOwnProperty("enemyBaseHealth"))
                if (!$util.isInteger(message.enemyBaseHealth))
                    return "enemyBaseHealth: integer expected";
            if (message.enemyBaseStatus != null && message.hasOwnProperty("enemyBaseStatus"))
                if (!$util.isInteger(message.enemyBaseStatus))
                    return "enemyBaseStatus: integer expected";
            if (message.enemyBaseShield != null && message.hasOwnProperty("enemyBaseShield"))
                if (!$util.isInteger(message.enemyBaseShield))
                    return "enemyBaseShield: integer expected";
            if (message.enemyOutpostHealth != null && message.hasOwnProperty("enemyOutpostHealth"))
                if (!$util.isInteger(message.enemyOutpostHealth))
                    return "enemyOutpostHealth: integer expected";
            if (message.enemyOutpostStatus != null && message.hasOwnProperty("enemyOutpostStatus"))
                if (!$util.isInteger(message.enemyOutpostStatus))
                    return "enemyOutpostStatus: integer expected";
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
            if (message.totalDamageAlly != null && message.hasOwnProperty("totalDamageAlly"))
                if (!$util.isInteger(message.totalDamageAlly))
                    return "totalDamageAlly: integer expected";
            if (message.totalDamageEnemy != null && message.hasOwnProperty("totalDamageEnemy"))
                if (!$util.isInteger(message.totalDamageEnemy))
                    return "totalDamageEnemy: integer expected";
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
                message.baseHealth = object.baseHealth >>> 0;
            if (object.baseStatus != null)
                message.baseStatus = object.baseStatus >>> 0;
            if (object.baseShield != null)
                message.baseShield = object.baseShield >>> 0;
            if (object.outpostHealth != null)
                message.outpostHealth = object.outpostHealth >>> 0;
            if (object.outpostStatus != null)
                message.outpostStatus = object.outpostStatus >>> 0;
            if (object.enemyBaseHealth != null)
                message.enemyBaseHealth = object.enemyBaseHealth >>> 0;
            if (object.enemyBaseStatus != null)
                message.enemyBaseStatus = object.enemyBaseStatus >>> 0;
            if (object.enemyBaseShield != null)
                message.enemyBaseShield = object.enemyBaseShield >>> 0;
            if (object.enemyOutpostHealth != null)
                message.enemyOutpostHealth = object.enemyOutpostHealth >>> 0;
            if (object.enemyOutpostStatus != null)
                message.enemyOutpostStatus = object.enemyOutpostStatus >>> 0;
            if (object.robotHealth) {
                if (!Array.isArray(object.robotHealth))
                    throw TypeError(".rm.GlobalUnitStatus.robotHealth: array expected");
                message.robotHealth = [];
                for (let i = 0; i < object.robotHealth.length; ++i)
                    message.robotHealth[i] = object.robotHealth[i] >>> 0;
            }
            if (object.robotBullets) {
                if (!Array.isArray(object.robotBullets))
                    throw TypeError(".rm.GlobalUnitStatus.robotBullets: array expected");
                message.robotBullets = [];
                for (let i = 0; i < object.robotBullets.length; ++i)
                    message.robotBullets[i] = object.robotBullets[i] | 0;
            }
            if (object.totalDamageAlly != null)
                message.totalDamageAlly = object.totalDamageAlly >>> 0;
            if (object.totalDamageEnemy != null)
                message.totalDamageEnemy = object.totalDamageEnemy >>> 0;
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
                object.enemyBaseHealth = 0;
                object.enemyBaseStatus = 0;
                object.enemyBaseShield = 0;
                object.enemyOutpostHealth = 0;
                object.enemyOutpostStatus = 0;
                object.totalDamageAlly = 0;
                object.totalDamageEnemy = 0;
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
            if (message.enemyBaseHealth != null && message.hasOwnProperty("enemyBaseHealth"))
                object.enemyBaseHealth = message.enemyBaseHealth;
            if (message.enemyBaseStatus != null && message.hasOwnProperty("enemyBaseStatus"))
                object.enemyBaseStatus = message.enemyBaseStatus;
            if (message.enemyBaseShield != null && message.hasOwnProperty("enemyBaseShield"))
                object.enemyBaseShield = message.enemyBaseShield;
            if (message.enemyOutpostHealth != null && message.hasOwnProperty("enemyOutpostHealth"))
                object.enemyOutpostHealth = message.enemyOutpostHealth;
            if (message.enemyOutpostStatus != null && message.hasOwnProperty("enemyOutpostStatus"))
                object.enemyOutpostStatus = message.enemyOutpostStatus;
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
            if (message.totalDamageAlly != null && message.hasOwnProperty("totalDamageAlly"))
                object.totalDamageAlly = message.totalDamageAlly;
            if (message.totalDamageEnemy != null && message.hasOwnProperty("totalDamageEnemy"))
                object.totalDamageEnemy = message.totalDamageEnemy;
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

    rm.GlobalLogisticsStatus = (function() {

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
        GlobalLogisticsStatus.prototype.totalEconomyObtained = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

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
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.remainingEconomy);
            if (message.totalEconomyObtained != null && Object.hasOwnProperty.call(message, "totalEconomyObtained"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.totalEconomyObtained);
            if (message.techLevel != null && Object.hasOwnProperty.call(message, "techLevel"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.techLevel);
            if (message.encryptionLevel != null && Object.hasOwnProperty.call(message, "encryptionLevel"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.encryptionLevel);
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
                        message.remainingEconomy = reader.uint32();
                        break;
                    }
                case 2: {
                        message.totalEconomyObtained = reader.uint64();
                        break;
                    }
                case 3: {
                        message.techLevel = reader.uint32();
                        break;
                    }
                case 4: {
                        message.encryptionLevel = reader.uint32();
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
                message.remainingEconomy = object.remainingEconomy >>> 0;
            if (object.totalEconomyObtained != null)
                if ($util.Long)
                    (message.totalEconomyObtained = $util.Long.fromValue(object.totalEconomyObtained)).unsigned = true;
                else if (typeof object.totalEconomyObtained === "string")
                    message.totalEconomyObtained = parseInt(object.totalEconomyObtained, 10);
                else if (typeof object.totalEconomyObtained === "number")
                    message.totalEconomyObtained = object.totalEconomyObtained;
                else if (typeof object.totalEconomyObtained === "object")
                    message.totalEconomyObtained = new $util.LongBits(object.totalEconomyObtained.low >>> 0, object.totalEconomyObtained.high >>> 0).toNumber(true);
            if (object.techLevel != null)
                message.techLevel = object.techLevel >>> 0;
            if (object.encryptionLevel != null)
                message.encryptionLevel = object.encryptionLevel >>> 0;
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
                    let long = new $util.Long(0, 0, true);
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
                    object.totalEconomyObtained = options.longs === String ? $util.Long.prototype.toString.call(message.totalEconomyObtained) : options.longs === Number ? new $util.LongBits(message.totalEconomyObtained.low >>> 0, message.totalEconomyObtained.high >>> 0).toNumber(true) : message.totalEconomyObtained;
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

    rm.GlobalSpecialMechanism = (function() {

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
                    writer.uint32(message.mechanismId[i]);
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
                                message.mechanismId.push(reader.uint32());
                        } else
                            message.mechanismId.push(reader.uint32());
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
                    message.mechanismId[i] = object.mechanismId[i] >>> 0;
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

    rm.Event = (function() {

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
         * @member {number|null|undefined} eventId
         * @memberof rm.Event
         * @instance
         */
        Event.prototype.eventId = null;

        /**
         * Event param.
         * @member {string|null|undefined} param
         * @memberof rm.Event
         * @instance
         */
        Event.prototype.param = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * Event _eventId.
         * @member {"eventId"|undefined} _eventId
         * @memberof rm.Event
         * @instance
         */
        Object.defineProperty(Event.prototype, "_eventId", {
            get: $util.oneOfGetter($oneOfFields = ["eventId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Event _param.
         * @member {"param"|undefined} _param
         * @memberof rm.Event
         * @instance
         */
        Object.defineProperty(Event.prototype, "_param", {
            get: $util.oneOfGetter($oneOfFields = ["param"]),
            set: $util.oneOfSetter($oneOfFields)
        });

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
            let properties = {};
            if (message.eventId != null && message.hasOwnProperty("eventId")) {
                properties._eventId = 1;
                if (!$util.isInteger(message.eventId))
                    return "eventId: integer expected";
            }
            if (message.param != null && message.hasOwnProperty("param")) {
                properties._param = 1;
                if (!$util.isString(message.param))
                    return "param: string expected";
            }
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
            if (message.eventId != null && message.hasOwnProperty("eventId")) {
                object.eventId = message.eventId;
                if (options.oneofs)
                    object._eventId = "eventId";
            }
            if (message.param != null && message.hasOwnProperty("param")) {
                object.param = message.param;
                if (options.oneofs)
                    object._param = "param";
            }
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

    rm.RobotInjuryStat = (function() {

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
         * @property {number|null} [offlineDamage] RobotInjuryStat offlineDamage
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
         * RobotInjuryStat offlineDamage.
         * @member {number} offlineDamage
         * @memberof rm.RobotInjuryStat
         * @instance
         */
        RobotInjuryStat.prototype.offlineDamage = 0;

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
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.totalDamage);
            if (message.collisionDamage != null && Object.hasOwnProperty.call(message, "collisionDamage"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.collisionDamage);
            if (message.smallProjectileDamage != null && Object.hasOwnProperty.call(message, "smallProjectileDamage"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.smallProjectileDamage);
            if (message.largeProjectileDamage != null && Object.hasOwnProperty.call(message, "largeProjectileDamage"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.largeProjectileDamage);
            if (message.dartSplashDamage != null && Object.hasOwnProperty.call(message, "dartSplashDamage"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.dartSplashDamage);
            if (message.moduleOfflineDamage != null && Object.hasOwnProperty.call(message, "moduleOfflineDamage"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.moduleOfflineDamage);
            if (message.offlineDamage != null && Object.hasOwnProperty.call(message, "offlineDamage"))
                writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.offlineDamage);
            if (message.penaltyDamage != null && Object.hasOwnProperty.call(message, "penaltyDamage"))
                writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.penaltyDamage);
            if (message.serverKillDamage != null && Object.hasOwnProperty.call(message, "serverKillDamage"))
                writer.uint32(/* id 9, wireType 0 =*/72).uint32(message.serverKillDamage);
            if (message.killerId != null && Object.hasOwnProperty.call(message, "killerId"))
                writer.uint32(/* id 10, wireType 0 =*/80).uint32(message.killerId);
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
                        message.totalDamage = reader.uint32();
                        break;
                    }
                case 2: {
                        message.collisionDamage = reader.uint32();
                        break;
                    }
                case 3: {
                        message.smallProjectileDamage = reader.uint32();
                        break;
                    }
                case 4: {
                        message.largeProjectileDamage = reader.uint32();
                        break;
                    }
                case 5: {
                        message.dartSplashDamage = reader.uint32();
                        break;
                    }
                case 6: {
                        message.moduleOfflineDamage = reader.uint32();
                        break;
                    }
                case 7: {
                        message.offlineDamage = reader.uint32();
                        break;
                    }
                case 8: {
                        message.penaltyDamage = reader.uint32();
                        break;
                    }
                case 9: {
                        message.serverKillDamage = reader.uint32();
                        break;
                    }
                case 10: {
                        message.killerId = reader.uint32();
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
            if (message.offlineDamage != null && message.hasOwnProperty("offlineDamage"))
                if (!$util.isInteger(message.offlineDamage))
                    return "offlineDamage: integer expected";
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
                message.totalDamage = object.totalDamage >>> 0;
            if (object.collisionDamage != null)
                message.collisionDamage = object.collisionDamage >>> 0;
            if (object.smallProjectileDamage != null)
                message.smallProjectileDamage = object.smallProjectileDamage >>> 0;
            if (object.largeProjectileDamage != null)
                message.largeProjectileDamage = object.largeProjectileDamage >>> 0;
            if (object.dartSplashDamage != null)
                message.dartSplashDamage = object.dartSplashDamage >>> 0;
            if (object.moduleOfflineDamage != null)
                message.moduleOfflineDamage = object.moduleOfflineDamage >>> 0;
            if (object.offlineDamage != null)
                message.offlineDamage = object.offlineDamage >>> 0;
            if (object.penaltyDamage != null)
                message.penaltyDamage = object.penaltyDamage >>> 0;
            if (object.serverKillDamage != null)
                message.serverKillDamage = object.serverKillDamage >>> 0;
            if (object.killerId != null)
                message.killerId = object.killerId >>> 0;
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
                object.offlineDamage = 0;
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
            if (message.offlineDamage != null && message.hasOwnProperty("offlineDamage"))
                object.offlineDamage = message.offlineDamage;
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

    rm.RobotRespawnStatus = (function() {

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
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.totalRespawnProgress);
            if (message.currentRespawnProgress != null && Object.hasOwnProperty.call(message, "currentRespawnProgress"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.currentRespawnProgress);
            if (message.canFreeRespawn != null && Object.hasOwnProperty.call(message, "canFreeRespawn"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.canFreeRespawn);
            if (message.goldCostForRespawn != null && Object.hasOwnProperty.call(message, "goldCostForRespawn"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.goldCostForRespawn);
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
                        message.totalRespawnProgress = reader.uint32();
                        break;
                    }
                case 3: {
                        message.currentRespawnProgress = reader.uint32();
                        break;
                    }
                case 4: {
                        message.canFreeRespawn = reader.bool();
                        break;
                    }
                case 5: {
                        message.goldCostForRespawn = reader.uint32();
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
                message.totalRespawnProgress = object.totalRespawnProgress >>> 0;
            if (object.currentRespawnProgress != null)
                message.currentRespawnProgress = object.currentRespawnProgress >>> 0;
            if (object.canFreeRespawn != null)
                message.canFreeRespawn = Boolean(object.canFreeRespawn);
            if (object.goldCostForRespawn != null)
                message.goldCostForRespawn = object.goldCostForRespawn >>> 0;
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

    rm.RobotStaticStatus = (function() {

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
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.connectionState);
            if (message.fieldState != null && Object.hasOwnProperty.call(message, "fieldState"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.fieldState);
            if (message.aliveState != null && Object.hasOwnProperty.call(message, "aliveState"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.aliveState);
            if (message.robotId != null && Object.hasOwnProperty.call(message, "robotId"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.robotId);
            if (message.robotType != null && Object.hasOwnProperty.call(message, "robotType"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.robotType);
            if (message.performanceSystemShooter != null && Object.hasOwnProperty.call(message, "performanceSystemShooter"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.performanceSystemShooter);
            if (message.performanceSystemChassis != null && Object.hasOwnProperty.call(message, "performanceSystemChassis"))
                writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.performanceSystemChassis);
            if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.level);
            if (message.maxHealth != null && Object.hasOwnProperty.call(message, "maxHealth"))
                writer.uint32(/* id 9, wireType 0 =*/72).uint32(message.maxHealth);
            if (message.maxHeat != null && Object.hasOwnProperty.call(message, "maxHeat"))
                writer.uint32(/* id 10, wireType 0 =*/80).uint32(message.maxHeat);
            if (message.heatCooldownRate != null && Object.hasOwnProperty.call(message, "heatCooldownRate"))
                writer.uint32(/* id 11, wireType 5 =*/93).float(message.heatCooldownRate);
            if (message.maxPower != null && Object.hasOwnProperty.call(message, "maxPower"))
                writer.uint32(/* id 12, wireType 0 =*/96).uint32(message.maxPower);
            if (message.maxBufferEnergy != null && Object.hasOwnProperty.call(message, "maxBufferEnergy"))
                writer.uint32(/* id 13, wireType 0 =*/104).uint32(message.maxBufferEnergy);
            if (message.maxChassisEnergy != null && Object.hasOwnProperty.call(message, "maxChassisEnergy"))
                writer.uint32(/* id 14, wireType 0 =*/112).uint32(message.maxChassisEnergy);
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
                        message.connectionState = reader.uint32();
                        break;
                    }
                case 2: {
                        message.fieldState = reader.uint32();
                        break;
                    }
                case 3: {
                        message.aliveState = reader.uint32();
                        break;
                    }
                case 4: {
                        message.robotId = reader.uint32();
                        break;
                    }
                case 5: {
                        message.robotType = reader.uint32();
                        break;
                    }
                case 6: {
                        message.performanceSystemShooter = reader.uint32();
                        break;
                    }
                case 7: {
                        message.performanceSystemChassis = reader.uint32();
                        break;
                    }
                case 8: {
                        message.level = reader.uint32();
                        break;
                    }
                case 9: {
                        message.maxHealth = reader.uint32();
                        break;
                    }
                case 10: {
                        message.maxHeat = reader.uint32();
                        break;
                    }
                case 11: {
                        message.heatCooldownRate = reader.float();
                        break;
                    }
                case 12: {
                        message.maxPower = reader.uint32();
                        break;
                    }
                case 13: {
                        message.maxBufferEnergy = reader.uint32();
                        break;
                    }
                case 14: {
                        message.maxChassisEnergy = reader.uint32();
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
                if (typeof message.heatCooldownRate !== "number")
                    return "heatCooldownRate: number expected";
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
                message.connectionState = object.connectionState >>> 0;
            if (object.fieldState != null)
                message.fieldState = object.fieldState >>> 0;
            if (object.aliveState != null)
                message.aliveState = object.aliveState >>> 0;
            if (object.robotId != null)
                message.robotId = object.robotId >>> 0;
            if (object.robotType != null)
                message.robotType = object.robotType >>> 0;
            if (object.performanceSystemShooter != null)
                message.performanceSystemShooter = object.performanceSystemShooter >>> 0;
            if (object.performanceSystemChassis != null)
                message.performanceSystemChassis = object.performanceSystemChassis >>> 0;
            if (object.level != null)
                message.level = object.level >>> 0;
            if (object.maxHealth != null)
                message.maxHealth = object.maxHealth >>> 0;
            if (object.maxHeat != null)
                message.maxHeat = object.maxHeat >>> 0;
            if (object.heatCooldownRate != null)
                message.heatCooldownRate = Number(object.heatCooldownRate);
            if (object.maxPower != null)
                message.maxPower = object.maxPower >>> 0;
            if (object.maxBufferEnergy != null)
                message.maxBufferEnergy = object.maxBufferEnergy >>> 0;
            if (object.maxChassisEnergy != null)
                message.maxChassisEnergy = object.maxChassisEnergy >>> 0;
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
                object.heatCooldownRate = options.json && !isFinite(message.heatCooldownRate) ? String(message.heatCooldownRate) : message.heatCooldownRate;
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

    rm.RobotDynamicStatus = (function() {

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
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.currentHealth);
            if (message.currentHeat != null && Object.hasOwnProperty.call(message, "currentHeat"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.currentHeat);
            if (message.lastProjectileFireRate != null && Object.hasOwnProperty.call(message, "lastProjectileFireRate"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.lastProjectileFireRate);
            if (message.currentChassisEnergy != null && Object.hasOwnProperty.call(message, "currentChassisEnergy"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.currentChassisEnergy);
            if (message.currentBufferEnergy != null && Object.hasOwnProperty.call(message, "currentBufferEnergy"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.currentBufferEnergy);
            if (message.currentExperience != null && Object.hasOwnProperty.call(message, "currentExperience"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.currentExperience);
            if (message.experienceForUpgrade != null && Object.hasOwnProperty.call(message, "experienceForUpgrade"))
                writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.experienceForUpgrade);
            if (message.totalProjectilesFired != null && Object.hasOwnProperty.call(message, "totalProjectilesFired"))
                writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.totalProjectilesFired);
            if (message.remainingAmmo != null && Object.hasOwnProperty.call(message, "remainingAmmo"))
                writer.uint32(/* id 9, wireType 0 =*/72).uint32(message.remainingAmmo);
            if (message.isOutOfCombat != null && Object.hasOwnProperty.call(message, "isOutOfCombat"))
                writer.uint32(/* id 10, wireType 0 =*/80).bool(message.isOutOfCombat);
            if (message.outOfCombatCountdown != null && Object.hasOwnProperty.call(message, "outOfCombatCountdown"))
                writer.uint32(/* id 11, wireType 0 =*/88).uint32(message.outOfCombatCountdown);
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
                        message.currentHealth = reader.uint32();
                        break;
                    }
                case 2: {
                        message.currentHeat = reader.float();
                        break;
                    }
                case 3: {
                        message.lastProjectileFireRate = reader.float();
                        break;
                    }
                case 4: {
                        message.currentChassisEnergy = reader.uint32();
                        break;
                    }
                case 5: {
                        message.currentBufferEnergy = reader.uint32();
                        break;
                    }
                case 6: {
                        message.currentExperience = reader.uint32();
                        break;
                    }
                case 7: {
                        message.experienceForUpgrade = reader.uint32();
                        break;
                    }
                case 8: {
                        message.totalProjectilesFired = reader.uint32();
                        break;
                    }
                case 9: {
                        message.remainingAmmo = reader.uint32();
                        break;
                    }
                case 10: {
                        message.isOutOfCombat = reader.bool();
                        break;
                    }
                case 11: {
                        message.outOfCombatCountdown = reader.uint32();
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
                if (typeof message.currentHeat !== "number")
                    return "currentHeat: number expected";
            if (message.lastProjectileFireRate != null && message.hasOwnProperty("lastProjectileFireRate"))
                if (typeof message.lastProjectileFireRate !== "number")
                    return "lastProjectileFireRate: number expected";
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
                message.currentHealth = object.currentHealth >>> 0;
            if (object.currentHeat != null)
                message.currentHeat = Number(object.currentHeat);
            if (object.lastProjectileFireRate != null)
                message.lastProjectileFireRate = Number(object.lastProjectileFireRate);
            if (object.currentChassisEnergy != null)
                message.currentChassisEnergy = object.currentChassisEnergy >>> 0;
            if (object.currentBufferEnergy != null)
                message.currentBufferEnergy = object.currentBufferEnergy >>> 0;
            if (object.currentExperience != null)
                message.currentExperience = object.currentExperience >>> 0;
            if (object.experienceForUpgrade != null)
                message.experienceForUpgrade = object.experienceForUpgrade >>> 0;
            if (object.totalProjectilesFired != null)
                message.totalProjectilesFired = object.totalProjectilesFired >>> 0;
            if (object.remainingAmmo != null)
                message.remainingAmmo = object.remainingAmmo >>> 0;
            if (object.isOutOfCombat != null)
                message.isOutOfCombat = Boolean(object.isOutOfCombat);
            if (object.outOfCombatCountdown != null)
                message.outOfCombatCountdown = object.outOfCombatCountdown >>> 0;
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
                object.currentHeat = options.json && !isFinite(message.currentHeat) ? String(message.currentHeat) : message.currentHeat;
            if (message.lastProjectileFireRate != null && message.hasOwnProperty("lastProjectileFireRate"))
                object.lastProjectileFireRate = options.json && !isFinite(message.lastProjectileFireRate) ? String(message.lastProjectileFireRate) : message.lastProjectileFireRate;
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

    rm.RobotModuleStatus = (function() {

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
         * @property {number|null} [laserDetectionModule] RobotModuleStatus laserDetectionModule
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
         * RobotModuleStatus laserDetectionModule.
         * @member {number} laserDetectionModule
         * @memberof rm.RobotModuleStatus
         * @instance
         */
        RobotModuleStatus.prototype.laserDetectionModule = 0;

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
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.powerManager);
            if (message.rfid != null && Object.hasOwnProperty.call(message, "rfid"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.rfid);
            if (message.lightStrip != null && Object.hasOwnProperty.call(message, "lightStrip"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.lightStrip);
            if (message.smallShooter != null && Object.hasOwnProperty.call(message, "smallShooter"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.smallShooter);
            if (message.bigShooter != null && Object.hasOwnProperty.call(message, "bigShooter"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.bigShooter);
            if (message.uwb != null && Object.hasOwnProperty.call(message, "uwb"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.uwb);
            if (message.armor != null && Object.hasOwnProperty.call(message, "armor"))
                writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.armor);
            if (message.videoTransmission != null && Object.hasOwnProperty.call(message, "videoTransmission"))
                writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.videoTransmission);
            if (message.capacitor != null && Object.hasOwnProperty.call(message, "capacitor"))
                writer.uint32(/* id 9, wireType 0 =*/72).uint32(message.capacitor);
            if (message.mainController != null && Object.hasOwnProperty.call(message, "mainController"))
                writer.uint32(/* id 10, wireType 0 =*/80).uint32(message.mainController);
            if (message.laserDetectionModule != null && Object.hasOwnProperty.call(message, "laserDetectionModule"))
                writer.uint32(/* id 11, wireType 0 =*/88).uint32(message.laserDetectionModule);
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
                        message.powerManager = reader.uint32();
                        break;
                    }
                case 2: {
                        message.rfid = reader.uint32();
                        break;
                    }
                case 3: {
                        message.lightStrip = reader.uint32();
                        break;
                    }
                case 4: {
                        message.smallShooter = reader.uint32();
                        break;
                    }
                case 5: {
                        message.bigShooter = reader.uint32();
                        break;
                    }
                case 6: {
                        message.uwb = reader.uint32();
                        break;
                    }
                case 7: {
                        message.armor = reader.uint32();
                        break;
                    }
                case 8: {
                        message.videoTransmission = reader.uint32();
                        break;
                    }
                case 9: {
                        message.capacitor = reader.uint32();
                        break;
                    }
                case 10: {
                        message.mainController = reader.uint32();
                        break;
                    }
                case 11: {
                        message.laserDetectionModule = reader.uint32();
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
            if (message.laserDetectionModule != null && message.hasOwnProperty("laserDetectionModule"))
                if (!$util.isInteger(message.laserDetectionModule))
                    return "laserDetectionModule: integer expected";
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
                message.powerManager = object.powerManager >>> 0;
            if (object.rfid != null)
                message.rfid = object.rfid >>> 0;
            if (object.lightStrip != null)
                message.lightStrip = object.lightStrip >>> 0;
            if (object.smallShooter != null)
                message.smallShooter = object.smallShooter >>> 0;
            if (object.bigShooter != null)
                message.bigShooter = object.bigShooter >>> 0;
            if (object.uwb != null)
                message.uwb = object.uwb >>> 0;
            if (object.armor != null)
                message.armor = object.armor >>> 0;
            if (object.videoTransmission != null)
                message.videoTransmission = object.videoTransmission >>> 0;
            if (object.capacitor != null)
                message.capacitor = object.capacitor >>> 0;
            if (object.mainController != null)
                message.mainController = object.mainController >>> 0;
            if (object.laserDetectionModule != null)
                message.laserDetectionModule = object.laserDetectionModule >>> 0;
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
                object.laserDetectionModule = 0;
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
            if (message.laserDetectionModule != null && message.hasOwnProperty("laserDetectionModule"))
                object.laserDetectionModule = message.laserDetectionModule;
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

    rm.RobotPosition = (function() {

        /**
         * Properties of a RobotPosition.
         * @memberof rm
         * @interface IRobotPosition
         * @property {number|null} [x] RobotPosition x
         * @property {number|null} [y] RobotPosition y
         * @property {number|null} [z] RobotPosition z
         * @property {number|null} [yaw] RobotPosition yaw
         * @property {number|null} [robotId] RobotPosition robotId
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
         * RobotPosition robotId.
         * @member {number} robotId
         * @memberof rm.RobotPosition
         * @instance
         */
        RobotPosition.prototype.robotId = 0;

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
            if (message.robotId != null && Object.hasOwnProperty.call(message, "robotId"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.robotId);
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
                case 5: {
                        message.robotId = reader.uint32();
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
            if (message.robotId != null && message.hasOwnProperty("robotId"))
                if (!$util.isInteger(message.robotId))
                    return "robotId: integer expected";
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
            if (object.robotId != null)
                message.robotId = object.robotId >>> 0;
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
                object.robotId = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
            if (message.z != null && message.hasOwnProperty("z"))
                object.z = options.json && !isFinite(message.z) ? String(message.z) : message.z;
            if (message.yaw != null && message.hasOwnProperty("yaw"))
                object.yaw = options.json && !isFinite(message.yaw) ? String(message.yaw) : message.yaw;
            if (message.robotId != null && message.hasOwnProperty("robotId"))
                object.robotId = message.robotId;
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

    rm.Buff = (function() {

        /**
         * Properties of a Buff.
         * @memberof rm
         * @interface IBuff
         * @property {number|null} [robotId] Buff robotId
         * @property {number|null} [buffType] Buff buffType
         * @property {number|null} [buffLevel] Buff buffLevel
         * @property {number|null} [buffMaxTime] Buff buffMaxTime
         * @property {number|null} [buffLeftTime] Buff buffLeftTime
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
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.robotId);
            if (message.buffType != null && Object.hasOwnProperty.call(message, "buffType"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.buffType);
            if (message.buffLevel != null && Object.hasOwnProperty.call(message, "buffLevel"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.buffLevel);
            if (message.buffMaxTime != null && Object.hasOwnProperty.call(message, "buffMaxTime"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.buffMaxTime);
            if (message.buffLeftTime != null && Object.hasOwnProperty.call(message, "buffLeftTime"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.buffLeftTime);
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
                        message.robotId = reader.uint32();
                        break;
                    }
                case 2: {
                        message.buffType = reader.uint32();
                        break;
                    }
                case 3: {
                        message.buffLevel = reader.int32();
                        break;
                    }
                case 4: {
                        message.buffMaxTime = reader.uint32();
                        break;
                    }
                case 5: {
                        message.buffLeftTime = reader.uint32();
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
                if (!$util.isInteger(message.buffLevel))
                    return "buffLevel: integer expected";
            if (message.buffMaxTime != null && message.hasOwnProperty("buffMaxTime"))
                if (!$util.isInteger(message.buffMaxTime))
                    return "buffMaxTime: integer expected";
            if (message.buffLeftTime != null && message.hasOwnProperty("buffLeftTime"))
                if (!$util.isInteger(message.buffLeftTime))
                    return "buffLeftTime: integer expected";
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
                message.robotId = object.robotId >>> 0;
            if (object.buffType != null)
                message.buffType = object.buffType >>> 0;
            if (object.buffLevel != null)
                message.buffLevel = object.buffLevel | 0;
            if (object.buffMaxTime != null)
                message.buffMaxTime = object.buffMaxTime >>> 0;
            if (object.buffLeftTime != null)
                message.buffLeftTime = object.buffLeftTime >>> 0;
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
            }
            if (message.robotId != null && message.hasOwnProperty("robotId"))
                object.robotId = message.robotId;
            if (message.buffType != null && message.hasOwnProperty("buffType"))
                object.buffType = message.buffType;
            if (message.buffLevel != null && message.hasOwnProperty("buffLevel"))
                object.buffLevel = message.buffLevel;
            if (message.buffMaxTime != null && message.hasOwnProperty("buffMaxTime"))
                object.buffMaxTime = message.buffMaxTime;
            if (message.buffLeftTime != null && message.hasOwnProperty("buffLeftTime"))
                object.buffLeftTime = message.buffLeftTime;
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

    rm.PenaltyInfo = (function() {

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
         * @member {number|null|undefined} penaltyType
         * @memberof rm.PenaltyInfo
         * @instance
         */
        PenaltyInfo.prototype.penaltyType = null;

        /**
         * PenaltyInfo penaltyEffectSec.
         * @member {number|null|undefined} penaltyEffectSec
         * @memberof rm.PenaltyInfo
         * @instance
         */
        PenaltyInfo.prototype.penaltyEffectSec = null;

        /**
         * PenaltyInfo totalPenaltyNum.
         * @member {number|null|undefined} totalPenaltyNum
         * @memberof rm.PenaltyInfo
         * @instance
         */
        PenaltyInfo.prototype.totalPenaltyNum = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * PenaltyInfo _penaltyType.
         * @member {"penaltyType"|undefined} _penaltyType
         * @memberof rm.PenaltyInfo
         * @instance
         */
        Object.defineProperty(PenaltyInfo.prototype, "_penaltyType", {
            get: $util.oneOfGetter($oneOfFields = ["penaltyType"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * PenaltyInfo _penaltyEffectSec.
         * @member {"penaltyEffectSec"|undefined} _penaltyEffectSec
         * @memberof rm.PenaltyInfo
         * @instance
         */
        Object.defineProperty(PenaltyInfo.prototype, "_penaltyEffectSec", {
            get: $util.oneOfGetter($oneOfFields = ["penaltyEffectSec"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * PenaltyInfo _totalPenaltyNum.
         * @member {"totalPenaltyNum"|undefined} _totalPenaltyNum
         * @memberof rm.PenaltyInfo
         * @instance
         */
        Object.defineProperty(PenaltyInfo.prototype, "_totalPenaltyNum", {
            get: $util.oneOfGetter($oneOfFields = ["totalPenaltyNum"]),
            set: $util.oneOfSetter($oneOfFields)
        });

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
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.penaltyType);
            if (message.penaltyEffectSec != null && Object.hasOwnProperty.call(message, "penaltyEffectSec"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.penaltyEffectSec);
            if (message.totalPenaltyNum != null && Object.hasOwnProperty.call(message, "totalPenaltyNum"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.totalPenaltyNum);
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
                        message.penaltyType = reader.uint32();
                        break;
                    }
                case 2: {
                        message.penaltyEffectSec = reader.uint32();
                        break;
                    }
                case 3: {
                        message.totalPenaltyNum = reader.uint32();
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
            let properties = {};
            if (message.penaltyType != null && message.hasOwnProperty("penaltyType")) {
                properties._penaltyType = 1;
                if (!$util.isInteger(message.penaltyType))
                    return "penaltyType: integer expected";
            }
            if (message.penaltyEffectSec != null && message.hasOwnProperty("penaltyEffectSec")) {
                properties._penaltyEffectSec = 1;
                if (!$util.isInteger(message.penaltyEffectSec))
                    return "penaltyEffectSec: integer expected";
            }
            if (message.totalPenaltyNum != null && message.hasOwnProperty("totalPenaltyNum")) {
                properties._totalPenaltyNum = 1;
                if (!$util.isInteger(message.totalPenaltyNum))
                    return "totalPenaltyNum: integer expected";
            }
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
                message.penaltyType = object.penaltyType >>> 0;
            if (object.penaltyEffectSec != null)
                message.penaltyEffectSec = object.penaltyEffectSec >>> 0;
            if (object.totalPenaltyNum != null)
                message.totalPenaltyNum = object.totalPenaltyNum >>> 0;
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
            if (message.penaltyType != null && message.hasOwnProperty("penaltyType")) {
                object.penaltyType = message.penaltyType;
                if (options.oneofs)
                    object._penaltyType = "penaltyType";
            }
            if (message.penaltyEffectSec != null && message.hasOwnProperty("penaltyEffectSec")) {
                object.penaltyEffectSec = message.penaltyEffectSec;
                if (options.oneofs)
                    object._penaltyEffectSec = "penaltyEffectSec";
            }
            if (message.totalPenaltyNum != null && message.hasOwnProperty("totalPenaltyNum")) {
                object.totalPenaltyNum = message.totalPenaltyNum;
                if (options.oneofs)
                    object._totalPenaltyNum = "totalPenaltyNum";
            }
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

    rm.RobotPathPlanInfo = (function() {

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
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.intention);
            if (message.startPosX != null && Object.hasOwnProperty.call(message, "startPosX"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.startPosX);
            if (message.startPosY != null && Object.hasOwnProperty.call(message, "startPosY"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.startPosY);
            if (message.offsetX != null && message.offsetX.length) {
                writer.uint32(/* id 4, wireType 2 =*/34).fork();
                for (let i = 0; i < message.offsetX.length; ++i)
                    writer.int32(message.offsetX[i]);
                writer.ldelim();
            }
            if (message.offsetY != null && message.offsetY.length) {
                writer.uint32(/* id 5, wireType 2 =*/42).fork();
                for (let i = 0; i < message.offsetY.length; ++i)
                    writer.int32(message.offsetY[i]);
                writer.ldelim();
            }
            if (message.senderId != null && Object.hasOwnProperty.call(message, "senderId"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.senderId);
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
                        message.intention = reader.uint32();
                        break;
                    }
                case 2: {
                        message.startPosX = reader.uint32();
                        break;
                    }
                case 3: {
                        message.startPosY = reader.uint32();
                        break;
                    }
                case 4: {
                        if (!(message.offsetX && message.offsetX.length))
                            message.offsetX = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.offsetX.push(reader.int32());
                        } else
                            message.offsetX.push(reader.int32());
                        break;
                    }
                case 5: {
                        if (!(message.offsetY && message.offsetY.length))
                            message.offsetY = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.offsetY.push(reader.int32());
                        } else
                            message.offsetY.push(reader.int32());
                        break;
                    }
                case 6: {
                        message.senderId = reader.uint32();
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
                if (!$util.isInteger(message.startPosX))
                    return "startPosX: integer expected";
            if (message.startPosY != null && message.hasOwnProperty("startPosY"))
                if (!$util.isInteger(message.startPosY))
                    return "startPosY: integer expected";
            if (message.offsetX != null && message.hasOwnProperty("offsetX")) {
                if (!Array.isArray(message.offsetX))
                    return "offsetX: array expected";
                for (let i = 0; i < message.offsetX.length; ++i)
                    if (!$util.isInteger(message.offsetX[i]))
                        return "offsetX: integer[] expected";
            }
            if (message.offsetY != null && message.hasOwnProperty("offsetY")) {
                if (!Array.isArray(message.offsetY))
                    return "offsetY: array expected";
                for (let i = 0; i < message.offsetY.length; ++i)
                    if (!$util.isInteger(message.offsetY[i]))
                        return "offsetY: integer[] expected";
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
                message.intention = object.intention >>> 0;
            if (object.startPosX != null)
                message.startPosX = object.startPosX >>> 0;
            if (object.startPosY != null)
                message.startPosY = object.startPosY >>> 0;
            if (object.offsetX) {
                if (!Array.isArray(object.offsetX))
                    throw TypeError(".rm.RobotPathPlanInfo.offsetX: array expected");
                message.offsetX = [];
                for (let i = 0; i < object.offsetX.length; ++i)
                    message.offsetX[i] = object.offsetX[i] | 0;
            }
            if (object.offsetY) {
                if (!Array.isArray(object.offsetY))
                    throw TypeError(".rm.RobotPathPlanInfo.offsetY: array expected");
                message.offsetY = [];
                for (let i = 0; i < object.offsetY.length; ++i)
                    message.offsetY[i] = object.offsetY[i] | 0;
            }
            if (object.senderId != null)
                message.senderId = object.senderId >>> 0;
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
                object.startPosX = message.startPosX;
            if (message.startPosY != null && message.hasOwnProperty("startPosY"))
                object.startPosY = message.startPosY;
            if (message.offsetX && message.offsetX.length) {
                object.offsetX = [];
                for (let j = 0; j < message.offsetX.length; ++j)
                    object.offsetX[j] = message.offsetX[j];
            }
            if (message.offsetY && message.offsetY.length) {
                object.offsetY = [];
                for (let j = 0; j < message.offsetY.length; ++j)
                    object.offsetY[j] = message.offsetY[j];
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

    rm.MapClickInfoNotify = (function() {

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
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.isSendAll);
            if (message.robotId != null && Object.hasOwnProperty.call(message, "robotId"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.robotId);
            if (message.mode != null && Object.hasOwnProperty.call(message, "mode"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.mode);
            if (message.enemyId != null && Object.hasOwnProperty.call(message, "enemyId"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.enemyId);
            if (message.ascii != null && Object.hasOwnProperty.call(message, "ascii"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.ascii);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.type);
            if (message.mapX != null && Object.hasOwnProperty.call(message, "mapX"))
                writer.uint32(/* id 7, wireType 5 =*/61).float(message.mapX);
            if (message.mapY != null && Object.hasOwnProperty.call(message, "mapY"))
                writer.uint32(/* id 8, wireType 5 =*/69).float(message.mapY);
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
                        message.isSendAll = reader.uint32();
                        break;
                    }
                case 2: {
                        message.robotId = reader.bytes();
                        break;
                    }
                case 3: {
                        message.mode = reader.uint32();
                        break;
                    }
                case 4: {
                        message.enemyId = reader.uint32();
                        break;
                    }
                case 5: {
                        message.ascii = reader.uint32();
                        break;
                    }
                case 6: {
                        message.type = reader.uint32();
                        break;
                    }
                case 7: {
                        message.mapX = reader.float();
                        break;
                    }
                case 8: {
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
                message.isSendAll = object.isSendAll >>> 0;
            if (object.robotId != null)
                if (typeof object.robotId === "string")
                    $util.base64.decode(object.robotId, message.robotId = $util.newBuffer($util.base64.length(object.robotId)), 0);
                else if (object.robotId.length >= 0)
                    message.robotId = object.robotId;
            if (object.mode != null)
                message.mode = object.mode >>> 0;
            if (object.enemyId != null)
                message.enemyId = object.enemyId >>> 0;
            if (object.ascii != null)
                message.ascii = object.ascii >>> 0;
            if (object.type != null)
                message.type = object.type >>> 0;
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

    rm.RadarSingleRobotInfo = (function() {

        /**
         * Properties of a RadarSingleRobotInfo.
         * @memberof rm
         * @interface IRadarSingleRobotInfo
         * @property {number|null} [targetPosX] RadarSingleRobotInfo targetPosX
         * @property {number|null} [targetPosY] RadarSingleRobotInfo targetPosY
         * @property {number|null} [isHighLight] RadarSingleRobotInfo isHighLight
         */

        /**
         * Constructs a new RadarSingleRobotInfo.
         * @memberof rm
         * @classdesc Represents a RadarSingleRobotInfo.
         * @implements IRadarSingleRobotInfo
         * @constructor
         * @param {rm.IRadarSingleRobotInfo=} [properties] Properties to set
         */
        function RadarSingleRobotInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RadarSingleRobotInfo targetPosX.
         * @member {number} targetPosX
         * @memberof rm.RadarSingleRobotInfo
         * @instance
         */
        RadarSingleRobotInfo.prototype.targetPosX = 0;

        /**
         * RadarSingleRobotInfo targetPosY.
         * @member {number} targetPosY
         * @memberof rm.RadarSingleRobotInfo
         * @instance
         */
        RadarSingleRobotInfo.prototype.targetPosY = 0;

        /**
         * RadarSingleRobotInfo isHighLight.
         * @member {number} isHighLight
         * @memberof rm.RadarSingleRobotInfo
         * @instance
         */
        RadarSingleRobotInfo.prototype.isHighLight = 0;

        /**
         * Creates a new RadarSingleRobotInfo instance using the specified properties.
         * @function create
         * @memberof rm.RadarSingleRobotInfo
         * @static
         * @param {rm.IRadarSingleRobotInfo=} [properties] Properties to set
         * @returns {rm.RadarSingleRobotInfo} RadarSingleRobotInfo instance
         */
        RadarSingleRobotInfo.create = function create(properties) {
            return new RadarSingleRobotInfo(properties);
        };

        /**
         * Encodes the specified RadarSingleRobotInfo message. Does not implicitly {@link rm.RadarSingleRobotInfo.verify|verify} messages.
         * @function encode
         * @memberof rm.RadarSingleRobotInfo
         * @static
         * @param {rm.IRadarSingleRobotInfo} message RadarSingleRobotInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RadarSingleRobotInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.targetPosX != null && Object.hasOwnProperty.call(message, "targetPosX"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.targetPosX);
            if (message.targetPosY != null && Object.hasOwnProperty.call(message, "targetPosY"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.targetPosY);
            if (message.isHighLight != null && Object.hasOwnProperty.call(message, "isHighLight"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.isHighLight);
            return writer;
        };

        /**
         * Encodes the specified RadarSingleRobotInfo message, length delimited. Does not implicitly {@link rm.RadarSingleRobotInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.RadarSingleRobotInfo
         * @static
         * @param {rm.IRadarSingleRobotInfo} message RadarSingleRobotInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RadarSingleRobotInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RadarSingleRobotInfo message from the specified reader or buffer.
         * @function decode
         * @memberof rm.RadarSingleRobotInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.RadarSingleRobotInfo} RadarSingleRobotInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RadarSingleRobotInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.RadarSingleRobotInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.targetPosX = reader.uint32();
                        break;
                    }
                case 2: {
                        message.targetPosY = reader.uint32();
                        break;
                    }
                case 3: {
                        message.isHighLight = reader.uint32();
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
         * Decodes a RadarSingleRobotInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.RadarSingleRobotInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.RadarSingleRobotInfo} RadarSingleRobotInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RadarSingleRobotInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RadarSingleRobotInfo message.
         * @function verify
         * @memberof rm.RadarSingleRobotInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RadarSingleRobotInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.targetPosX != null && message.hasOwnProperty("targetPosX"))
                if (!$util.isInteger(message.targetPosX))
                    return "targetPosX: integer expected";
            if (message.targetPosY != null && message.hasOwnProperty("targetPosY"))
                if (!$util.isInteger(message.targetPosY))
                    return "targetPosY: integer expected";
            if (message.isHighLight != null && message.hasOwnProperty("isHighLight"))
                if (!$util.isInteger(message.isHighLight))
                    return "isHighLight: integer expected";
            return null;
        };

        /**
         * Creates a RadarSingleRobotInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.RadarSingleRobotInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.RadarSingleRobotInfo} RadarSingleRobotInfo
         */
        RadarSingleRobotInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.RadarSingleRobotInfo)
                return object;
            let message = new $root.rm.RadarSingleRobotInfo();
            if (object.targetPosX != null)
                message.targetPosX = object.targetPosX >>> 0;
            if (object.targetPosY != null)
                message.targetPosY = object.targetPosY >>> 0;
            if (object.isHighLight != null)
                message.isHighLight = object.isHighLight >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a RadarSingleRobotInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.RadarSingleRobotInfo
         * @static
         * @param {rm.RadarSingleRobotInfo} message RadarSingleRobotInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RadarSingleRobotInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.targetPosX = 0;
                object.targetPosY = 0;
                object.isHighLight = 0;
            }
            if (message.targetPosX != null && message.hasOwnProperty("targetPosX"))
                object.targetPosX = message.targetPosX;
            if (message.targetPosY != null && message.hasOwnProperty("targetPosY"))
                object.targetPosY = message.targetPosY;
            if (message.isHighLight != null && message.hasOwnProperty("isHighLight"))
                object.isHighLight = message.isHighLight;
            return object;
        };

        /**
         * Converts this RadarSingleRobotInfo to JSON.
         * @function toJSON
         * @memberof rm.RadarSingleRobotInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RadarSingleRobotInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RadarSingleRobotInfo
         * @function getTypeUrl
         * @memberof rm.RadarSingleRobotInfo
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RadarSingleRobotInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.RadarSingleRobotInfo";
        };

        return RadarSingleRobotInfo;
    })();

    rm.RadarInfoToClient = (function() {

        /**
         * Properties of a RadarInfoToClient.
         * @memberof rm
         * @interface IRadarInfoToClient
         * @property {Array.<rm.IRadarSingleRobotInfo>|null} [RadarSingleRobotInfo] RadarInfoToClient RadarSingleRobotInfo
         */

        /**
         * Constructs a new RadarInfoToClient.
         * @memberof rm
         * @classdesc Represents a RadarInfoToClient.
         * @implements IRadarInfoToClient
         * @constructor
         * @param {rm.IRadarInfoToClient=} [properties] Properties to set
         */
        function RadarInfoToClient(properties) {
            this.RadarSingleRobotInfo = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RadarInfoToClient RadarSingleRobotInfo.
         * @member {Array.<rm.IRadarSingleRobotInfo>} RadarSingleRobotInfo
         * @memberof rm.RadarInfoToClient
         * @instance
         */
        RadarInfoToClient.prototype.RadarSingleRobotInfo = $util.emptyArray;

        /**
         * Creates a new RadarInfoToClient instance using the specified properties.
         * @function create
         * @memberof rm.RadarInfoToClient
         * @static
         * @param {rm.IRadarInfoToClient=} [properties] Properties to set
         * @returns {rm.RadarInfoToClient} RadarInfoToClient instance
         */
        RadarInfoToClient.create = function create(properties) {
            return new RadarInfoToClient(properties);
        };

        /**
         * Encodes the specified RadarInfoToClient message. Does not implicitly {@link rm.RadarInfoToClient.verify|verify} messages.
         * @function encode
         * @memberof rm.RadarInfoToClient
         * @static
         * @param {rm.IRadarInfoToClient} message RadarInfoToClient message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RadarInfoToClient.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RadarSingleRobotInfo != null && message.RadarSingleRobotInfo.length)
                for (let i = 0; i < message.RadarSingleRobotInfo.length; ++i)
                    $root.rm.RadarSingleRobotInfo.encode(message.RadarSingleRobotInfo[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RadarInfoToClient message, length delimited. Does not implicitly {@link rm.RadarInfoToClient.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.RadarInfoToClient
         * @static
         * @param {rm.IRadarInfoToClient} message RadarInfoToClient message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RadarInfoToClient.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RadarInfoToClient message from the specified reader or buffer.
         * @function decode
         * @memberof rm.RadarInfoToClient
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.RadarInfoToClient} RadarInfoToClient
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RadarInfoToClient.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.RadarInfoToClient();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.RadarSingleRobotInfo && message.RadarSingleRobotInfo.length))
                            message.RadarSingleRobotInfo = [];
                        message.RadarSingleRobotInfo.push($root.rm.RadarSingleRobotInfo.decode(reader, reader.uint32()));
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
         * Decodes a RadarInfoToClient message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.RadarInfoToClient
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.RadarInfoToClient} RadarInfoToClient
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RadarInfoToClient.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RadarInfoToClient message.
         * @function verify
         * @memberof rm.RadarInfoToClient
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RadarInfoToClient.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.RadarSingleRobotInfo != null && message.hasOwnProperty("RadarSingleRobotInfo")) {
                if (!Array.isArray(message.RadarSingleRobotInfo))
                    return "RadarSingleRobotInfo: array expected";
                for (let i = 0; i < message.RadarSingleRobotInfo.length; ++i) {
                    let error = $root.rm.RadarSingleRobotInfo.verify(message.RadarSingleRobotInfo[i]);
                    if (error)
                        return "RadarSingleRobotInfo." + error;
                }
            }
            return null;
        };

        /**
         * Creates a RadarInfoToClient message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.RadarInfoToClient
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.RadarInfoToClient} RadarInfoToClient
         */
        RadarInfoToClient.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.RadarInfoToClient)
                return object;
            let message = new $root.rm.RadarInfoToClient();
            if (object.RadarSingleRobotInfo) {
                if (!Array.isArray(object.RadarSingleRobotInfo))
                    throw TypeError(".rm.RadarInfoToClient.RadarSingleRobotInfo: array expected");
                message.RadarSingleRobotInfo = [];
                for (let i = 0; i < object.RadarSingleRobotInfo.length; ++i) {
                    if (typeof object.RadarSingleRobotInfo[i] !== "object")
                        throw TypeError(".rm.RadarInfoToClient.RadarSingleRobotInfo: object expected");
                    message.RadarSingleRobotInfo[i] = $root.rm.RadarSingleRobotInfo.fromObject(object.RadarSingleRobotInfo[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a RadarInfoToClient message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.RadarInfoToClient
         * @static
         * @param {rm.RadarInfoToClient} message RadarInfoToClient
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RadarInfoToClient.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.RadarSingleRobotInfo = [];
            if (message.RadarSingleRobotInfo && message.RadarSingleRobotInfo.length) {
                object.RadarSingleRobotInfo = [];
                for (let j = 0; j < message.RadarSingleRobotInfo.length; ++j)
                    object.RadarSingleRobotInfo[j] = $root.rm.RadarSingleRobotInfo.toObject(message.RadarSingleRobotInfo[j], options);
            }
            return object;
        };

        /**
         * Converts this RadarInfoToClient to JSON.
         * @function toJSON
         * @memberof rm.RadarInfoToClient
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RadarInfoToClient.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RadarInfoToClient
         * @function getTypeUrl
         * @memberof rm.RadarInfoToClient
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RadarInfoToClient.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.RadarInfoToClient";
        };

        return RadarInfoToClient;
    })();

    rm.CustomByteBlock = (function() {

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

    rm.AssemblyCommand = (function() {

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
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.operation);
            if (message.difficulty != null && Object.hasOwnProperty.call(message, "difficulty"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.difficulty);
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
                        message.operation = reader.uint32();
                        break;
                    }
                case 2: {
                        message.difficulty = reader.uint32();
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
                message.operation = object.operation >>> 0;
            if (object.difficulty != null)
                message.difficulty = object.difficulty >>> 0;
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

    rm.TechCoreMotionStateSync = (function() {

        /**
         * Properties of a TechCoreMotionStateSync.
         * @memberof rm
         * @interface ITechCoreMotionStateSync
         * @property {number|null} [maximumDifficultyLevel] TechCoreMotionStateSync maximumDifficultyLevel
         * @property {number|null} [basicState] TechCoreMotionStateSync basicState
         * @property {number|null} [putinState] TechCoreMotionStateSync putinState
         * @property {number|null} [moveState] TechCoreMotionStateSync moveState
         * @property {number|null} [rotateState] TechCoreMotionStateSync rotateState
         * @property {number|null} [enemyCoreStatus] TechCoreMotionStateSync enemyCoreStatus
         * @property {number|null} [remainTimeAll] TechCoreMotionStateSync remainTimeAll
         * @property {number|null} [remainTimeStep] TechCoreMotionStateSync remainTimeStep
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
         * TechCoreMotionStateSync basicState.
         * @member {number} basicState
         * @memberof rm.TechCoreMotionStateSync
         * @instance
         */
        TechCoreMotionStateSync.prototype.basicState = 0;

        /**
         * TechCoreMotionStateSync putinState.
         * @member {number} putinState
         * @memberof rm.TechCoreMotionStateSync
         * @instance
         */
        TechCoreMotionStateSync.prototype.putinState = 0;

        /**
         * TechCoreMotionStateSync moveState.
         * @member {number} moveState
         * @memberof rm.TechCoreMotionStateSync
         * @instance
         */
        TechCoreMotionStateSync.prototype.moveState = 0;

        /**
         * TechCoreMotionStateSync rotateState.
         * @member {number} rotateState
         * @memberof rm.TechCoreMotionStateSync
         * @instance
         */
        TechCoreMotionStateSync.prototype.rotateState = 0;

        /**
         * TechCoreMotionStateSync enemyCoreStatus.
         * @member {number} enemyCoreStatus
         * @memberof rm.TechCoreMotionStateSync
         * @instance
         */
        TechCoreMotionStateSync.prototype.enemyCoreStatus = 0;

        /**
         * TechCoreMotionStateSync remainTimeAll.
         * @member {number} remainTimeAll
         * @memberof rm.TechCoreMotionStateSync
         * @instance
         */
        TechCoreMotionStateSync.prototype.remainTimeAll = 0;

        /**
         * TechCoreMotionStateSync remainTimeStep.
         * @member {number} remainTimeStep
         * @memberof rm.TechCoreMotionStateSync
         * @instance
         */
        TechCoreMotionStateSync.prototype.remainTimeStep = 0;

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
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.maximumDifficultyLevel);
            if (message.basicState != null && Object.hasOwnProperty.call(message, "basicState"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.basicState);
            if (message.putinState != null && Object.hasOwnProperty.call(message, "putinState"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.putinState);
            if (message.moveState != null && Object.hasOwnProperty.call(message, "moveState"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.moveState);
            if (message.rotateState != null && Object.hasOwnProperty.call(message, "rotateState"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.rotateState);
            if (message.enemyCoreStatus != null && Object.hasOwnProperty.call(message, "enemyCoreStatus"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.enemyCoreStatus);
            if (message.remainTimeAll != null && Object.hasOwnProperty.call(message, "remainTimeAll"))
                writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.remainTimeAll);
            if (message.remainTimeStep != null && Object.hasOwnProperty.call(message, "remainTimeStep"))
                writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.remainTimeStep);
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
                        message.maximumDifficultyLevel = reader.uint32();
                        break;
                    }
                case 2: {
                        message.basicState = reader.uint32();
                        break;
                    }
                case 3: {
                        message.putinState = reader.uint32();
                        break;
                    }
                case 4: {
                        message.moveState = reader.uint32();
                        break;
                    }
                case 5: {
                        message.rotateState = reader.uint32();
                        break;
                    }
                case 6: {
                        message.enemyCoreStatus = reader.uint32();
                        break;
                    }
                case 7: {
                        message.remainTimeAll = reader.uint32();
                        break;
                    }
                case 8: {
                        message.remainTimeStep = reader.uint32();
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
            if (message.basicState != null && message.hasOwnProperty("basicState"))
                if (!$util.isInteger(message.basicState))
                    return "basicState: integer expected";
            if (message.putinState != null && message.hasOwnProperty("putinState"))
                if (!$util.isInteger(message.putinState))
                    return "putinState: integer expected";
            if (message.moveState != null && message.hasOwnProperty("moveState"))
                if (!$util.isInteger(message.moveState))
                    return "moveState: integer expected";
            if (message.rotateState != null && message.hasOwnProperty("rotateState"))
                if (!$util.isInteger(message.rotateState))
                    return "rotateState: integer expected";
            if (message.enemyCoreStatus != null && message.hasOwnProperty("enemyCoreStatus"))
                if (!$util.isInteger(message.enemyCoreStatus))
                    return "enemyCoreStatus: integer expected";
            if (message.remainTimeAll != null && message.hasOwnProperty("remainTimeAll"))
                if (!$util.isInteger(message.remainTimeAll))
                    return "remainTimeAll: integer expected";
            if (message.remainTimeStep != null && message.hasOwnProperty("remainTimeStep"))
                if (!$util.isInteger(message.remainTimeStep))
                    return "remainTimeStep: integer expected";
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
                message.maximumDifficultyLevel = object.maximumDifficultyLevel >>> 0;
            if (object.basicState != null)
                message.basicState = object.basicState >>> 0;
            if (object.putinState != null)
                message.putinState = object.putinState >>> 0;
            if (object.moveState != null)
                message.moveState = object.moveState >>> 0;
            if (object.rotateState != null)
                message.rotateState = object.rotateState >>> 0;
            if (object.enemyCoreStatus != null)
                message.enemyCoreStatus = object.enemyCoreStatus >>> 0;
            if (object.remainTimeAll != null)
                message.remainTimeAll = object.remainTimeAll >>> 0;
            if (object.remainTimeStep != null)
                message.remainTimeStep = object.remainTimeStep >>> 0;
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
                object.basicState = 0;
                object.putinState = 0;
                object.moveState = 0;
                object.rotateState = 0;
                object.enemyCoreStatus = 0;
                object.remainTimeAll = 0;
                object.remainTimeStep = 0;
            }
            if (message.maximumDifficultyLevel != null && message.hasOwnProperty("maximumDifficultyLevel"))
                object.maximumDifficultyLevel = message.maximumDifficultyLevel;
            if (message.basicState != null && message.hasOwnProperty("basicState"))
                object.basicState = message.basicState;
            if (message.putinState != null && message.hasOwnProperty("putinState"))
                object.putinState = message.putinState;
            if (message.moveState != null && message.hasOwnProperty("moveState"))
                object.moveState = message.moveState;
            if (message.rotateState != null && message.hasOwnProperty("rotateState"))
                object.rotateState = message.rotateState;
            if (message.enemyCoreStatus != null && message.hasOwnProperty("enemyCoreStatus"))
                object.enemyCoreStatus = message.enemyCoreStatus;
            if (message.remainTimeAll != null && message.hasOwnProperty("remainTimeAll"))
                object.remainTimeAll = message.remainTimeAll;
            if (message.remainTimeStep != null && message.hasOwnProperty("remainTimeStep"))
                object.remainTimeStep = message.remainTimeStep;
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

    rm.RobotPerformanceSelectionCommand = (function() {

        /**
         * Properties of a RobotPerformanceSelectionCommand.
         * @memberof rm
         * @interface IRobotPerformanceSelectionCommand
         * @property {number|null} [shooter] RobotPerformanceSelectionCommand shooter
         * @property {number|null} [chassis] RobotPerformanceSelectionCommand chassis
         * @property {number|null} [sentryControl] RobotPerformanceSelectionCommand sentryControl
         */

        /**
         * Constructs a new RobotPerformanceSelectionCommand.
         * @memberof rm
         * @classdesc Represents a RobotPerformanceSelectionCommand.
         * @implements IRobotPerformanceSelectionCommand
         * @constructor
         * @param {rm.IRobotPerformanceSelectionCommand=} [properties] Properties to set
         */
        function RobotPerformanceSelectionCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RobotPerformanceSelectionCommand shooter.
         * @member {number|null|undefined} shooter
         * @memberof rm.RobotPerformanceSelectionCommand
         * @instance
         */
        RobotPerformanceSelectionCommand.prototype.shooter = null;

        /**
         * RobotPerformanceSelectionCommand chassis.
         * @member {number|null|undefined} chassis
         * @memberof rm.RobotPerformanceSelectionCommand
         * @instance
         */
        RobotPerformanceSelectionCommand.prototype.chassis = null;

        /**
         * RobotPerformanceSelectionCommand sentryControl.
         * @member {number|null|undefined} sentryControl
         * @memberof rm.RobotPerformanceSelectionCommand
         * @instance
         */
        RobotPerformanceSelectionCommand.prototype.sentryControl = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * RobotPerformanceSelectionCommand _shooter.
         * @member {"shooter"|undefined} _shooter
         * @memberof rm.RobotPerformanceSelectionCommand
         * @instance
         */
        Object.defineProperty(RobotPerformanceSelectionCommand.prototype, "_shooter", {
            get: $util.oneOfGetter($oneOfFields = ["shooter"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * RobotPerformanceSelectionCommand _chassis.
         * @member {"chassis"|undefined} _chassis
         * @memberof rm.RobotPerformanceSelectionCommand
         * @instance
         */
        Object.defineProperty(RobotPerformanceSelectionCommand.prototype, "_chassis", {
            get: $util.oneOfGetter($oneOfFields = ["chassis"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * RobotPerformanceSelectionCommand _sentryControl.
         * @member {"sentryControl"|undefined} _sentryControl
         * @memberof rm.RobotPerformanceSelectionCommand
         * @instance
         */
        Object.defineProperty(RobotPerformanceSelectionCommand.prototype, "_sentryControl", {
            get: $util.oneOfGetter($oneOfFields = ["sentryControl"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new RobotPerformanceSelectionCommand instance using the specified properties.
         * @function create
         * @memberof rm.RobotPerformanceSelectionCommand
         * @static
         * @param {rm.IRobotPerformanceSelectionCommand=} [properties] Properties to set
         * @returns {rm.RobotPerformanceSelectionCommand} RobotPerformanceSelectionCommand instance
         */
        RobotPerformanceSelectionCommand.create = function create(properties) {
            return new RobotPerformanceSelectionCommand(properties);
        };

        /**
         * Encodes the specified RobotPerformanceSelectionCommand message. Does not implicitly {@link rm.RobotPerformanceSelectionCommand.verify|verify} messages.
         * @function encode
         * @memberof rm.RobotPerformanceSelectionCommand
         * @static
         * @param {rm.IRobotPerformanceSelectionCommand} message RobotPerformanceSelectionCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RobotPerformanceSelectionCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.shooter != null && Object.hasOwnProperty.call(message, "shooter"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.shooter);
            if (message.chassis != null && Object.hasOwnProperty.call(message, "chassis"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.chassis);
            if (message.sentryControl != null && Object.hasOwnProperty.call(message, "sentryControl"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.sentryControl);
            return writer;
        };

        /**
         * Encodes the specified RobotPerformanceSelectionCommand message, length delimited. Does not implicitly {@link rm.RobotPerformanceSelectionCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.RobotPerformanceSelectionCommand
         * @static
         * @param {rm.IRobotPerformanceSelectionCommand} message RobotPerformanceSelectionCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RobotPerformanceSelectionCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RobotPerformanceSelectionCommand message from the specified reader or buffer.
         * @function decode
         * @memberof rm.RobotPerformanceSelectionCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.RobotPerformanceSelectionCommand} RobotPerformanceSelectionCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RobotPerformanceSelectionCommand.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.RobotPerformanceSelectionCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.shooter = reader.uint32();
                        break;
                    }
                case 2: {
                        message.chassis = reader.uint32();
                        break;
                    }
                case 3: {
                        message.sentryControl = reader.uint32();
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
         * Decodes a RobotPerformanceSelectionCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.RobotPerformanceSelectionCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.RobotPerformanceSelectionCommand} RobotPerformanceSelectionCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RobotPerformanceSelectionCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RobotPerformanceSelectionCommand message.
         * @function verify
         * @memberof rm.RobotPerformanceSelectionCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RobotPerformanceSelectionCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.shooter != null && message.hasOwnProperty("shooter")) {
                properties._shooter = 1;
                if (!$util.isInteger(message.shooter))
                    return "shooter: integer expected";
            }
            if (message.chassis != null && message.hasOwnProperty("chassis")) {
                properties._chassis = 1;
                if (!$util.isInteger(message.chassis))
                    return "chassis: integer expected";
            }
            if (message.sentryControl != null && message.hasOwnProperty("sentryControl")) {
                properties._sentryControl = 1;
                if (!$util.isInteger(message.sentryControl))
                    return "sentryControl: integer expected";
            }
            return null;
        };

        /**
         * Creates a RobotPerformanceSelectionCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.RobotPerformanceSelectionCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.RobotPerformanceSelectionCommand} RobotPerformanceSelectionCommand
         */
        RobotPerformanceSelectionCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.RobotPerformanceSelectionCommand)
                return object;
            let message = new $root.rm.RobotPerformanceSelectionCommand();
            if (object.shooter != null)
                message.shooter = object.shooter >>> 0;
            if (object.chassis != null)
                message.chassis = object.chassis >>> 0;
            if (object.sentryControl != null)
                message.sentryControl = object.sentryControl >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a RobotPerformanceSelectionCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.RobotPerformanceSelectionCommand
         * @static
         * @param {rm.RobotPerformanceSelectionCommand} message RobotPerformanceSelectionCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RobotPerformanceSelectionCommand.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.shooter != null && message.hasOwnProperty("shooter")) {
                object.shooter = message.shooter;
                if (options.oneofs)
                    object._shooter = "shooter";
            }
            if (message.chassis != null && message.hasOwnProperty("chassis")) {
                object.chassis = message.chassis;
                if (options.oneofs)
                    object._chassis = "chassis";
            }
            if (message.sentryControl != null && message.hasOwnProperty("sentryControl")) {
                object.sentryControl = message.sentryControl;
                if (options.oneofs)
                    object._sentryControl = "sentryControl";
            }
            return object;
        };

        /**
         * Converts this RobotPerformanceSelectionCommand to JSON.
         * @function toJSON
         * @memberof rm.RobotPerformanceSelectionCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RobotPerformanceSelectionCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RobotPerformanceSelectionCommand
         * @function getTypeUrl
         * @memberof rm.RobotPerformanceSelectionCommand
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RobotPerformanceSelectionCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.RobotPerformanceSelectionCommand";
        };

        return RobotPerformanceSelectionCommand;
    })();

    rm.RobotPerformanceSelectionSync = (function() {

        /**
         * Properties of a RobotPerformanceSelectionSync.
         * @memberof rm
         * @interface IRobotPerformanceSelectionSync
         * @property {number|null} [shooter] RobotPerformanceSelectionSync shooter
         * @property {number|null} [chassis] RobotPerformanceSelectionSync chassis
         * @property {number|null} [sentryControl] RobotPerformanceSelectionSync sentryControl
         */

        /**
         * Constructs a new RobotPerformanceSelectionSync.
         * @memberof rm
         * @classdesc Represents a RobotPerformanceSelectionSync.
         * @implements IRobotPerformanceSelectionSync
         * @constructor
         * @param {rm.IRobotPerformanceSelectionSync=} [properties] Properties to set
         */
        function RobotPerformanceSelectionSync(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RobotPerformanceSelectionSync shooter.
         * @member {number} shooter
         * @memberof rm.RobotPerformanceSelectionSync
         * @instance
         */
        RobotPerformanceSelectionSync.prototype.shooter = 0;

        /**
         * RobotPerformanceSelectionSync chassis.
         * @member {number} chassis
         * @memberof rm.RobotPerformanceSelectionSync
         * @instance
         */
        RobotPerformanceSelectionSync.prototype.chassis = 0;

        /**
         * RobotPerformanceSelectionSync sentryControl.
         * @member {number} sentryControl
         * @memberof rm.RobotPerformanceSelectionSync
         * @instance
         */
        RobotPerformanceSelectionSync.prototype.sentryControl = 0;

        /**
         * Creates a new RobotPerformanceSelectionSync instance using the specified properties.
         * @function create
         * @memberof rm.RobotPerformanceSelectionSync
         * @static
         * @param {rm.IRobotPerformanceSelectionSync=} [properties] Properties to set
         * @returns {rm.RobotPerformanceSelectionSync} RobotPerformanceSelectionSync instance
         */
        RobotPerformanceSelectionSync.create = function create(properties) {
            return new RobotPerformanceSelectionSync(properties);
        };

        /**
         * Encodes the specified RobotPerformanceSelectionSync message. Does not implicitly {@link rm.RobotPerformanceSelectionSync.verify|verify} messages.
         * @function encode
         * @memberof rm.RobotPerformanceSelectionSync
         * @static
         * @param {rm.IRobotPerformanceSelectionSync} message RobotPerformanceSelectionSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RobotPerformanceSelectionSync.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.shooter != null && Object.hasOwnProperty.call(message, "shooter"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.shooter);
            if (message.chassis != null && Object.hasOwnProperty.call(message, "chassis"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.chassis);
            if (message.sentryControl != null && Object.hasOwnProperty.call(message, "sentryControl"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.sentryControl);
            return writer;
        };

        /**
         * Encodes the specified RobotPerformanceSelectionSync message, length delimited. Does not implicitly {@link rm.RobotPerformanceSelectionSync.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.RobotPerformanceSelectionSync
         * @static
         * @param {rm.IRobotPerformanceSelectionSync} message RobotPerformanceSelectionSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RobotPerformanceSelectionSync.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RobotPerformanceSelectionSync message from the specified reader or buffer.
         * @function decode
         * @memberof rm.RobotPerformanceSelectionSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.RobotPerformanceSelectionSync} RobotPerformanceSelectionSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RobotPerformanceSelectionSync.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.RobotPerformanceSelectionSync();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.shooter = reader.uint32();
                        break;
                    }
                case 2: {
                        message.chassis = reader.uint32();
                        break;
                    }
                case 3: {
                        message.sentryControl = reader.uint32();
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
         * Decodes a RobotPerformanceSelectionSync message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.RobotPerformanceSelectionSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.RobotPerformanceSelectionSync} RobotPerformanceSelectionSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RobotPerformanceSelectionSync.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RobotPerformanceSelectionSync message.
         * @function verify
         * @memberof rm.RobotPerformanceSelectionSync
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RobotPerformanceSelectionSync.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.shooter != null && message.hasOwnProperty("shooter"))
                if (!$util.isInteger(message.shooter))
                    return "shooter: integer expected";
            if (message.chassis != null && message.hasOwnProperty("chassis"))
                if (!$util.isInteger(message.chassis))
                    return "chassis: integer expected";
            if (message.sentryControl != null && message.hasOwnProperty("sentryControl"))
                if (!$util.isInteger(message.sentryControl))
                    return "sentryControl: integer expected";
            return null;
        };

        /**
         * Creates a RobotPerformanceSelectionSync message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.RobotPerformanceSelectionSync
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.RobotPerformanceSelectionSync} RobotPerformanceSelectionSync
         */
        RobotPerformanceSelectionSync.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.RobotPerformanceSelectionSync)
                return object;
            let message = new $root.rm.RobotPerformanceSelectionSync();
            if (object.shooter != null)
                message.shooter = object.shooter >>> 0;
            if (object.chassis != null)
                message.chassis = object.chassis >>> 0;
            if (object.sentryControl != null)
                message.sentryControl = object.sentryControl >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a RobotPerformanceSelectionSync message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.RobotPerformanceSelectionSync
         * @static
         * @param {rm.RobotPerformanceSelectionSync} message RobotPerformanceSelectionSync
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RobotPerformanceSelectionSync.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.shooter = 0;
                object.chassis = 0;
                object.sentryControl = 0;
            }
            if (message.shooter != null && message.hasOwnProperty("shooter"))
                object.shooter = message.shooter;
            if (message.chassis != null && message.hasOwnProperty("chassis"))
                object.chassis = message.chassis;
            if (message.sentryControl != null && message.hasOwnProperty("sentryControl"))
                object.sentryControl = message.sentryControl;
            return object;
        };

        /**
         * Converts this RobotPerformanceSelectionSync to JSON.
         * @function toJSON
         * @memberof rm.RobotPerformanceSelectionSync
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RobotPerformanceSelectionSync.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RobotPerformanceSelectionSync
         * @function getTypeUrl
         * @memberof rm.RobotPerformanceSelectionSync
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RobotPerformanceSelectionSync.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.RobotPerformanceSelectionSync";
        };

        return RobotPerformanceSelectionSync;
    })();

    rm.CommonCommand = (function() {

        /**
         * Properties of a CommonCommand.
         * @memberof rm
         * @interface ICommonCommand
         * @property {number|null} [cmdType] CommonCommand cmdType
         * @property {number|null} [param] CommonCommand param
         */

        /**
         * Constructs a new CommonCommand.
         * @memberof rm
         * @classdesc Represents a CommonCommand.
         * @implements ICommonCommand
         * @constructor
         * @param {rm.ICommonCommand=} [properties] Properties to set
         */
        function CommonCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CommonCommand cmdType.
         * @member {number} cmdType
         * @memberof rm.CommonCommand
         * @instance
         */
        CommonCommand.prototype.cmdType = 0;

        /**
         * CommonCommand param.
         * @member {number} param
         * @memberof rm.CommonCommand
         * @instance
         */
        CommonCommand.prototype.param = 0;

        /**
         * Creates a new CommonCommand instance using the specified properties.
         * @function create
         * @memberof rm.CommonCommand
         * @static
         * @param {rm.ICommonCommand=} [properties] Properties to set
         * @returns {rm.CommonCommand} CommonCommand instance
         */
        CommonCommand.create = function create(properties) {
            return new CommonCommand(properties);
        };

        /**
         * Encodes the specified CommonCommand message. Does not implicitly {@link rm.CommonCommand.verify|verify} messages.
         * @function encode
         * @memberof rm.CommonCommand
         * @static
         * @param {rm.ICommonCommand} message CommonCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CommonCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.cmdType != null && Object.hasOwnProperty.call(message, "cmdType"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.cmdType);
            if (message.param != null && Object.hasOwnProperty.call(message, "param"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.param);
            return writer;
        };

        /**
         * Encodes the specified CommonCommand message, length delimited. Does not implicitly {@link rm.CommonCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.CommonCommand
         * @static
         * @param {rm.ICommonCommand} message CommonCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CommonCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CommonCommand message from the specified reader or buffer.
         * @function decode
         * @memberof rm.CommonCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.CommonCommand} CommonCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CommonCommand.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.CommonCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.cmdType = reader.uint32();
                        break;
                    }
                case 2: {
                        message.param = reader.uint32();
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
         * Decodes a CommonCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.CommonCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.CommonCommand} CommonCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CommonCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CommonCommand message.
         * @function verify
         * @memberof rm.CommonCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CommonCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.cmdType != null && message.hasOwnProperty("cmdType"))
                if (!$util.isInteger(message.cmdType))
                    return "cmdType: integer expected";
            if (message.param != null && message.hasOwnProperty("param"))
                if (!$util.isInteger(message.param))
                    return "param: integer expected";
            return null;
        };

        /**
         * Creates a CommonCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.CommonCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.CommonCommand} CommonCommand
         */
        CommonCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.CommonCommand)
                return object;
            let message = new $root.rm.CommonCommand();
            if (object.cmdType != null)
                message.cmdType = object.cmdType >>> 0;
            if (object.param != null)
                message.param = object.param >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a CommonCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.CommonCommand
         * @static
         * @param {rm.CommonCommand} message CommonCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CommonCommand.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.cmdType = 0;
                object.param = 0;
            }
            if (message.cmdType != null && message.hasOwnProperty("cmdType"))
                object.cmdType = message.cmdType;
            if (message.param != null && message.hasOwnProperty("param"))
                object.param = message.param;
            return object;
        };

        /**
         * Converts this CommonCommand to JSON.
         * @function toJSON
         * @memberof rm.CommonCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CommonCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for CommonCommand
         * @function getTypeUrl
         * @memberof rm.CommonCommand
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        CommonCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.CommonCommand";
        };

        return CommonCommand;
    })();

    rm.HeroDeployModeEventCommand = (function() {

        /**
         * Properties of a HeroDeployModeEventCommand.
         * @memberof rm
         * @interface IHeroDeployModeEventCommand
         * @property {number|null} [mode] HeroDeployModeEventCommand mode
         */

        /**
         * Constructs a new HeroDeployModeEventCommand.
         * @memberof rm
         * @classdesc Represents a HeroDeployModeEventCommand.
         * @implements IHeroDeployModeEventCommand
         * @constructor
         * @param {rm.IHeroDeployModeEventCommand=} [properties] Properties to set
         */
        function HeroDeployModeEventCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HeroDeployModeEventCommand mode.
         * @member {number} mode
         * @memberof rm.HeroDeployModeEventCommand
         * @instance
         */
        HeroDeployModeEventCommand.prototype.mode = 0;

        /**
         * Creates a new HeroDeployModeEventCommand instance using the specified properties.
         * @function create
         * @memberof rm.HeroDeployModeEventCommand
         * @static
         * @param {rm.IHeroDeployModeEventCommand=} [properties] Properties to set
         * @returns {rm.HeroDeployModeEventCommand} HeroDeployModeEventCommand instance
         */
        HeroDeployModeEventCommand.create = function create(properties) {
            return new HeroDeployModeEventCommand(properties);
        };

        /**
         * Encodes the specified HeroDeployModeEventCommand message. Does not implicitly {@link rm.HeroDeployModeEventCommand.verify|verify} messages.
         * @function encode
         * @memberof rm.HeroDeployModeEventCommand
         * @static
         * @param {rm.IHeroDeployModeEventCommand} message HeroDeployModeEventCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeroDeployModeEventCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.mode != null && Object.hasOwnProperty.call(message, "mode"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.mode);
            return writer;
        };

        /**
         * Encodes the specified HeroDeployModeEventCommand message, length delimited. Does not implicitly {@link rm.HeroDeployModeEventCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.HeroDeployModeEventCommand
         * @static
         * @param {rm.IHeroDeployModeEventCommand} message HeroDeployModeEventCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeroDeployModeEventCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HeroDeployModeEventCommand message from the specified reader or buffer.
         * @function decode
         * @memberof rm.HeroDeployModeEventCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.HeroDeployModeEventCommand} HeroDeployModeEventCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeroDeployModeEventCommand.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.HeroDeployModeEventCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.mode = reader.uint32();
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
         * Decodes a HeroDeployModeEventCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.HeroDeployModeEventCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.HeroDeployModeEventCommand} HeroDeployModeEventCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeroDeployModeEventCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HeroDeployModeEventCommand message.
         * @function verify
         * @memberof rm.HeroDeployModeEventCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HeroDeployModeEventCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.mode != null && message.hasOwnProperty("mode"))
                if (!$util.isInteger(message.mode))
                    return "mode: integer expected";
            return null;
        };

        /**
         * Creates a HeroDeployModeEventCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.HeroDeployModeEventCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.HeroDeployModeEventCommand} HeroDeployModeEventCommand
         */
        HeroDeployModeEventCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.HeroDeployModeEventCommand)
                return object;
            let message = new $root.rm.HeroDeployModeEventCommand();
            if (object.mode != null)
                message.mode = object.mode >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a HeroDeployModeEventCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.HeroDeployModeEventCommand
         * @static
         * @param {rm.HeroDeployModeEventCommand} message HeroDeployModeEventCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HeroDeployModeEventCommand.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.mode = 0;
            if (message.mode != null && message.hasOwnProperty("mode"))
                object.mode = message.mode;
            return object;
        };

        /**
         * Converts this HeroDeployModeEventCommand to JSON.
         * @function toJSON
         * @memberof rm.HeroDeployModeEventCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HeroDeployModeEventCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for HeroDeployModeEventCommand
         * @function getTypeUrl
         * @memberof rm.HeroDeployModeEventCommand
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        HeroDeployModeEventCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.HeroDeployModeEventCommand";
        };

        return HeroDeployModeEventCommand;
    })();

    rm.DeployModeStatusSync = (function() {

        /**
         * Properties of a DeployModeStatusSync.
         * @memberof rm
         * @interface IDeployModeStatusSync
         * @property {number|null} [status] DeployModeStatusSync status
         */

        /**
         * Constructs a new DeployModeStatusSync.
         * @memberof rm
         * @classdesc Represents a DeployModeStatusSync.
         * @implements IDeployModeStatusSync
         * @constructor
         * @param {rm.IDeployModeStatusSync=} [properties] Properties to set
         */
        function DeployModeStatusSync(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DeployModeStatusSync status.
         * @member {number} status
         * @memberof rm.DeployModeStatusSync
         * @instance
         */
        DeployModeStatusSync.prototype.status = 0;

        /**
         * Creates a new DeployModeStatusSync instance using the specified properties.
         * @function create
         * @memberof rm.DeployModeStatusSync
         * @static
         * @param {rm.IDeployModeStatusSync=} [properties] Properties to set
         * @returns {rm.DeployModeStatusSync} DeployModeStatusSync instance
         */
        DeployModeStatusSync.create = function create(properties) {
            return new DeployModeStatusSync(properties);
        };

        /**
         * Encodes the specified DeployModeStatusSync message. Does not implicitly {@link rm.DeployModeStatusSync.verify|verify} messages.
         * @function encode
         * @memberof rm.DeployModeStatusSync
         * @static
         * @param {rm.IDeployModeStatusSync} message DeployModeStatusSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeployModeStatusSync.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.status);
            return writer;
        };

        /**
         * Encodes the specified DeployModeStatusSync message, length delimited. Does not implicitly {@link rm.DeployModeStatusSync.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.DeployModeStatusSync
         * @static
         * @param {rm.IDeployModeStatusSync} message DeployModeStatusSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeployModeStatusSync.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DeployModeStatusSync message from the specified reader or buffer.
         * @function decode
         * @memberof rm.DeployModeStatusSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.DeployModeStatusSync} DeployModeStatusSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeployModeStatusSync.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.DeployModeStatusSync();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.status = reader.uint32();
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
         * Decodes a DeployModeStatusSync message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.DeployModeStatusSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.DeployModeStatusSync} DeployModeStatusSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeployModeStatusSync.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DeployModeStatusSync message.
         * @function verify
         * @memberof rm.DeployModeStatusSync
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DeployModeStatusSync.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.status != null && message.hasOwnProperty("status"))
                if (!$util.isInteger(message.status))
                    return "status: integer expected";
            return null;
        };

        /**
         * Creates a DeployModeStatusSync message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.DeployModeStatusSync
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.DeployModeStatusSync} DeployModeStatusSync
         */
        DeployModeStatusSync.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.DeployModeStatusSync)
                return object;
            let message = new $root.rm.DeployModeStatusSync();
            if (object.status != null)
                message.status = object.status >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a DeployModeStatusSync message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.DeployModeStatusSync
         * @static
         * @param {rm.DeployModeStatusSync} message DeployModeStatusSync
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DeployModeStatusSync.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.status = 0;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = message.status;
            return object;
        };

        /**
         * Converts this DeployModeStatusSync to JSON.
         * @function toJSON
         * @memberof rm.DeployModeStatusSync
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DeployModeStatusSync.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DeployModeStatusSync
         * @function getTypeUrl
         * @memberof rm.DeployModeStatusSync
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DeployModeStatusSync.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.DeployModeStatusSync";
        };

        return DeployModeStatusSync;
    })();

    rm.RuneActivateCommand = (function() {

        /**
         * Properties of a RuneActivateCommand.
         * @memberof rm
         * @interface IRuneActivateCommand
         * @property {number|null} [activate] RuneActivateCommand activate
         */

        /**
         * Constructs a new RuneActivateCommand.
         * @memberof rm
         * @classdesc Represents a RuneActivateCommand.
         * @implements IRuneActivateCommand
         * @constructor
         * @param {rm.IRuneActivateCommand=} [properties] Properties to set
         */
        function RuneActivateCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RuneActivateCommand activate.
         * @member {number} activate
         * @memberof rm.RuneActivateCommand
         * @instance
         */
        RuneActivateCommand.prototype.activate = 0;

        /**
         * Creates a new RuneActivateCommand instance using the specified properties.
         * @function create
         * @memberof rm.RuneActivateCommand
         * @static
         * @param {rm.IRuneActivateCommand=} [properties] Properties to set
         * @returns {rm.RuneActivateCommand} RuneActivateCommand instance
         */
        RuneActivateCommand.create = function create(properties) {
            return new RuneActivateCommand(properties);
        };

        /**
         * Encodes the specified RuneActivateCommand message. Does not implicitly {@link rm.RuneActivateCommand.verify|verify} messages.
         * @function encode
         * @memberof rm.RuneActivateCommand
         * @static
         * @param {rm.IRuneActivateCommand} message RuneActivateCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RuneActivateCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.activate != null && Object.hasOwnProperty.call(message, "activate"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.activate);
            return writer;
        };

        /**
         * Encodes the specified RuneActivateCommand message, length delimited. Does not implicitly {@link rm.RuneActivateCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.RuneActivateCommand
         * @static
         * @param {rm.IRuneActivateCommand} message RuneActivateCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RuneActivateCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RuneActivateCommand message from the specified reader or buffer.
         * @function decode
         * @memberof rm.RuneActivateCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.RuneActivateCommand} RuneActivateCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RuneActivateCommand.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.RuneActivateCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.activate = reader.uint32();
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
         * Decodes a RuneActivateCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.RuneActivateCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.RuneActivateCommand} RuneActivateCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RuneActivateCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RuneActivateCommand message.
         * @function verify
         * @memberof rm.RuneActivateCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RuneActivateCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.activate != null && message.hasOwnProperty("activate"))
                if (!$util.isInteger(message.activate))
                    return "activate: integer expected";
            return null;
        };

        /**
         * Creates a RuneActivateCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.RuneActivateCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.RuneActivateCommand} RuneActivateCommand
         */
        RuneActivateCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.RuneActivateCommand)
                return object;
            let message = new $root.rm.RuneActivateCommand();
            if (object.activate != null)
                message.activate = object.activate >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a RuneActivateCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.RuneActivateCommand
         * @static
         * @param {rm.RuneActivateCommand} message RuneActivateCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RuneActivateCommand.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.activate = 0;
            if (message.activate != null && message.hasOwnProperty("activate"))
                object.activate = message.activate;
            return object;
        };

        /**
         * Converts this RuneActivateCommand to JSON.
         * @function toJSON
         * @memberof rm.RuneActivateCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RuneActivateCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RuneActivateCommand
         * @function getTypeUrl
         * @memberof rm.RuneActivateCommand
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RuneActivateCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.RuneActivateCommand";
        };

        return RuneActivateCommand;
    })();

    rm.RuneStatusSync = (function() {

        /**
         * Properties of a RuneStatusSync.
         * @memberof rm
         * @interface IRuneStatusSync
         * @property {number|null} [runeStatus] RuneStatusSync runeStatus
         * @property {number|null} [activatedArms] RuneStatusSync activatedArms
         * @property {number|null} [averageRings] RuneStatusSync averageRings
         */

        /**
         * Constructs a new RuneStatusSync.
         * @memberof rm
         * @classdesc Represents a RuneStatusSync.
         * @implements IRuneStatusSync
         * @constructor
         * @param {rm.IRuneStatusSync=} [properties] Properties to set
         */
        function RuneStatusSync(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RuneStatusSync runeStatus.
         * @member {number} runeStatus
         * @memberof rm.RuneStatusSync
         * @instance
         */
        RuneStatusSync.prototype.runeStatus = 0;

        /**
         * RuneStatusSync activatedArms.
         * @member {number} activatedArms
         * @memberof rm.RuneStatusSync
         * @instance
         */
        RuneStatusSync.prototype.activatedArms = 0;

        /**
         * RuneStatusSync averageRings.
         * @member {number} averageRings
         * @memberof rm.RuneStatusSync
         * @instance
         */
        RuneStatusSync.prototype.averageRings = 0;

        /**
         * Creates a new RuneStatusSync instance using the specified properties.
         * @function create
         * @memberof rm.RuneStatusSync
         * @static
         * @param {rm.IRuneStatusSync=} [properties] Properties to set
         * @returns {rm.RuneStatusSync} RuneStatusSync instance
         */
        RuneStatusSync.create = function create(properties) {
            return new RuneStatusSync(properties);
        };

        /**
         * Encodes the specified RuneStatusSync message. Does not implicitly {@link rm.RuneStatusSync.verify|verify} messages.
         * @function encode
         * @memberof rm.RuneStatusSync
         * @static
         * @param {rm.IRuneStatusSync} message RuneStatusSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RuneStatusSync.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.runeStatus != null && Object.hasOwnProperty.call(message, "runeStatus"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.runeStatus);
            if (message.activatedArms != null && Object.hasOwnProperty.call(message, "activatedArms"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.activatedArms);
            if (message.averageRings != null && Object.hasOwnProperty.call(message, "averageRings"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.averageRings);
            return writer;
        };

        /**
         * Encodes the specified RuneStatusSync message, length delimited. Does not implicitly {@link rm.RuneStatusSync.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.RuneStatusSync
         * @static
         * @param {rm.IRuneStatusSync} message RuneStatusSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RuneStatusSync.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RuneStatusSync message from the specified reader or buffer.
         * @function decode
         * @memberof rm.RuneStatusSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.RuneStatusSync} RuneStatusSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RuneStatusSync.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.RuneStatusSync();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.runeStatus = reader.uint32();
                        break;
                    }
                case 2: {
                        message.activatedArms = reader.uint32();
                        break;
                    }
                case 3: {
                        message.averageRings = reader.float();
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
         * Decodes a RuneStatusSync message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.RuneStatusSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.RuneStatusSync} RuneStatusSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RuneStatusSync.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RuneStatusSync message.
         * @function verify
         * @memberof rm.RuneStatusSync
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RuneStatusSync.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.runeStatus != null && message.hasOwnProperty("runeStatus"))
                if (!$util.isInteger(message.runeStatus))
                    return "runeStatus: integer expected";
            if (message.activatedArms != null && message.hasOwnProperty("activatedArms"))
                if (!$util.isInteger(message.activatedArms))
                    return "activatedArms: integer expected";
            if (message.averageRings != null && message.hasOwnProperty("averageRings"))
                if (typeof message.averageRings !== "number")
                    return "averageRings: number expected";
            return null;
        };

        /**
         * Creates a RuneStatusSync message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.RuneStatusSync
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.RuneStatusSync} RuneStatusSync
         */
        RuneStatusSync.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.RuneStatusSync)
                return object;
            let message = new $root.rm.RuneStatusSync();
            if (object.runeStatus != null)
                message.runeStatus = object.runeStatus >>> 0;
            if (object.activatedArms != null)
                message.activatedArms = object.activatedArms >>> 0;
            if (object.averageRings != null)
                message.averageRings = Number(object.averageRings);
            return message;
        };

        /**
         * Creates a plain object from a RuneStatusSync message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.RuneStatusSync
         * @static
         * @param {rm.RuneStatusSync} message RuneStatusSync
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RuneStatusSync.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.runeStatus = 0;
                object.activatedArms = 0;
                object.averageRings = 0;
            }
            if (message.runeStatus != null && message.hasOwnProperty("runeStatus"))
                object.runeStatus = message.runeStatus;
            if (message.activatedArms != null && message.hasOwnProperty("activatedArms"))
                object.activatedArms = message.activatedArms;
            if (message.averageRings != null && message.hasOwnProperty("averageRings"))
                object.averageRings = options.json && !isFinite(message.averageRings) ? String(message.averageRings) : message.averageRings;
            return object;
        };

        /**
         * Converts this RuneStatusSync to JSON.
         * @function toJSON
         * @memberof rm.RuneStatusSync
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RuneStatusSync.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RuneStatusSync
         * @function getTypeUrl
         * @memberof rm.RuneStatusSync
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RuneStatusSync.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.RuneStatusSync";
        };

        return RuneStatusSync;
    })();

    rm.SentryStatusSync = (function() {

        /**
         * Properties of a SentryStatusSync.
         * @memberof rm
         * @interface ISentryStatusSync
         * @property {number|null} [postureId] SentryStatusSync postureId
         * @property {boolean|null} [isWeakened] SentryStatusSync isWeakened
         */

        /**
         * Constructs a new SentryStatusSync.
         * @memberof rm
         * @classdesc Represents a SentryStatusSync.
         * @implements ISentryStatusSync
         * @constructor
         * @param {rm.ISentryStatusSync=} [properties] Properties to set
         */
        function SentryStatusSync(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SentryStatusSync postureId.
         * @member {number} postureId
         * @memberof rm.SentryStatusSync
         * @instance
         */
        SentryStatusSync.prototype.postureId = 0;

        /**
         * SentryStatusSync isWeakened.
         * @member {boolean} isWeakened
         * @memberof rm.SentryStatusSync
         * @instance
         */
        SentryStatusSync.prototype.isWeakened = false;

        /**
         * Creates a new SentryStatusSync instance using the specified properties.
         * @function create
         * @memberof rm.SentryStatusSync
         * @static
         * @param {rm.ISentryStatusSync=} [properties] Properties to set
         * @returns {rm.SentryStatusSync} SentryStatusSync instance
         */
        SentryStatusSync.create = function create(properties) {
            return new SentryStatusSync(properties);
        };

        /**
         * Encodes the specified SentryStatusSync message. Does not implicitly {@link rm.SentryStatusSync.verify|verify} messages.
         * @function encode
         * @memberof rm.SentryStatusSync
         * @static
         * @param {rm.ISentryStatusSync} message SentryStatusSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SentryStatusSync.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.postureId != null && Object.hasOwnProperty.call(message, "postureId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.postureId);
            if (message.isWeakened != null && Object.hasOwnProperty.call(message, "isWeakened"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isWeakened);
            return writer;
        };

        /**
         * Encodes the specified SentryStatusSync message, length delimited. Does not implicitly {@link rm.SentryStatusSync.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.SentryStatusSync
         * @static
         * @param {rm.ISentryStatusSync} message SentryStatusSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SentryStatusSync.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SentryStatusSync message from the specified reader or buffer.
         * @function decode
         * @memberof rm.SentryStatusSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.SentryStatusSync} SentryStatusSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SentryStatusSync.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.SentryStatusSync();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.postureId = reader.uint32();
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
         * Decodes a SentryStatusSync message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.SentryStatusSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.SentryStatusSync} SentryStatusSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SentryStatusSync.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SentryStatusSync message.
         * @function verify
         * @memberof rm.SentryStatusSync
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SentryStatusSync.verify = function verify(message) {
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
         * Creates a SentryStatusSync message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.SentryStatusSync
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.SentryStatusSync} SentryStatusSync
         */
        SentryStatusSync.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.SentryStatusSync)
                return object;
            let message = new $root.rm.SentryStatusSync();
            if (object.postureId != null)
                message.postureId = object.postureId >>> 0;
            if (object.isWeakened != null)
                message.isWeakened = Boolean(object.isWeakened);
            return message;
        };

        /**
         * Creates a plain object from a SentryStatusSync message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.SentryStatusSync
         * @static
         * @param {rm.SentryStatusSync} message SentryStatusSync
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SentryStatusSync.toObject = function toObject(message, options) {
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
         * Converts this SentryStatusSync to JSON.
         * @function toJSON
         * @memberof rm.SentryStatusSync
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SentryStatusSync.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SentryStatusSync
         * @function getTypeUrl
         * @memberof rm.SentryStatusSync
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SentryStatusSync.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.SentryStatusSync";
        };

        return SentryStatusSync;
    })();

    rm.DartCommand = (function() {

        /**
         * Properties of a DartCommand.
         * @memberof rm
         * @interface IDartCommand
         * @property {number|null} [targetId] DartCommand targetId
         * @property {boolean|null} [open] DartCommand open
         * @property {boolean|null} [launchConfirm] DartCommand launchConfirm
         */

        /**
         * Constructs a new DartCommand.
         * @memberof rm
         * @classdesc Represents a DartCommand.
         * @implements IDartCommand
         * @constructor
         * @param {rm.IDartCommand=} [properties] Properties to set
         */
        function DartCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DartCommand targetId.
         * @member {number} targetId
         * @memberof rm.DartCommand
         * @instance
         */
        DartCommand.prototype.targetId = 0;

        /**
         * DartCommand open.
         * @member {boolean} open
         * @memberof rm.DartCommand
         * @instance
         */
        DartCommand.prototype.open = false;

        /**
         * DartCommand launchConfirm.
         * @member {boolean} launchConfirm
         * @memberof rm.DartCommand
         * @instance
         */
        DartCommand.prototype.launchConfirm = false;

        /**
         * Creates a new DartCommand instance using the specified properties.
         * @function create
         * @memberof rm.DartCommand
         * @static
         * @param {rm.IDartCommand=} [properties] Properties to set
         * @returns {rm.DartCommand} DartCommand instance
         */
        DartCommand.create = function create(properties) {
            return new DartCommand(properties);
        };

        /**
         * Encodes the specified DartCommand message. Does not implicitly {@link rm.DartCommand.verify|verify} messages.
         * @function encode
         * @memberof rm.DartCommand
         * @static
         * @param {rm.IDartCommand} message DartCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DartCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.targetId != null && Object.hasOwnProperty.call(message, "targetId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.targetId);
            if (message.open != null && Object.hasOwnProperty.call(message, "open"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.open);
            if (message.launchConfirm != null && Object.hasOwnProperty.call(message, "launchConfirm"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.launchConfirm);
            return writer;
        };

        /**
         * Encodes the specified DartCommand message, length delimited. Does not implicitly {@link rm.DartCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.DartCommand
         * @static
         * @param {rm.IDartCommand} message DartCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DartCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DartCommand message from the specified reader or buffer.
         * @function decode
         * @memberof rm.DartCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.DartCommand} DartCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DartCommand.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.DartCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.targetId = reader.uint32();
                        break;
                    }
                case 2: {
                        message.open = reader.bool();
                        break;
                    }
                case 3: {
                        message.launchConfirm = reader.bool();
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
         * Decodes a DartCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.DartCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.DartCommand} DartCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DartCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DartCommand message.
         * @function verify
         * @memberof rm.DartCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DartCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.targetId != null && message.hasOwnProperty("targetId"))
                if (!$util.isInteger(message.targetId))
                    return "targetId: integer expected";
            if (message.open != null && message.hasOwnProperty("open"))
                if (typeof message.open !== "boolean")
                    return "open: boolean expected";
            if (message.launchConfirm != null && message.hasOwnProperty("launchConfirm"))
                if (typeof message.launchConfirm !== "boolean")
                    return "launchConfirm: boolean expected";
            return null;
        };

        /**
         * Creates a DartCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.DartCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.DartCommand} DartCommand
         */
        DartCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.DartCommand)
                return object;
            let message = new $root.rm.DartCommand();
            if (object.targetId != null)
                message.targetId = object.targetId >>> 0;
            if (object.open != null)
                message.open = Boolean(object.open);
            if (object.launchConfirm != null)
                message.launchConfirm = Boolean(object.launchConfirm);
            return message;
        };

        /**
         * Creates a plain object from a DartCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.DartCommand
         * @static
         * @param {rm.DartCommand} message DartCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DartCommand.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.targetId = 0;
                object.open = false;
                object.launchConfirm = false;
            }
            if (message.targetId != null && message.hasOwnProperty("targetId"))
                object.targetId = message.targetId;
            if (message.open != null && message.hasOwnProperty("open"))
                object.open = message.open;
            if (message.launchConfirm != null && message.hasOwnProperty("launchConfirm"))
                object.launchConfirm = message.launchConfirm;
            return object;
        };

        /**
         * Converts this DartCommand to JSON.
         * @function toJSON
         * @memberof rm.DartCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DartCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DartCommand
         * @function getTypeUrl
         * @memberof rm.DartCommand
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DartCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.DartCommand";
        };

        return DartCommand;
    })();

    rm.DartSelectTargetStatusSync = (function() {

        /**
         * Properties of a DartSelectTargetStatusSync.
         * @memberof rm
         * @interface IDartSelectTargetStatusSync
         * @property {number|null} [targetId] DartSelectTargetStatusSync targetId
         * @property {number|null} [open] DartSelectTargetStatusSync open
         */

        /**
         * Constructs a new DartSelectTargetStatusSync.
         * @memberof rm
         * @classdesc Represents a DartSelectTargetStatusSync.
         * @implements IDartSelectTargetStatusSync
         * @constructor
         * @param {rm.IDartSelectTargetStatusSync=} [properties] Properties to set
         */
        function DartSelectTargetStatusSync(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DartSelectTargetStatusSync targetId.
         * @member {number} targetId
         * @memberof rm.DartSelectTargetStatusSync
         * @instance
         */
        DartSelectTargetStatusSync.prototype.targetId = 0;

        /**
         * DartSelectTargetStatusSync open.
         * @member {number} open
         * @memberof rm.DartSelectTargetStatusSync
         * @instance
         */
        DartSelectTargetStatusSync.prototype.open = 0;

        /**
         * Creates a new DartSelectTargetStatusSync instance using the specified properties.
         * @function create
         * @memberof rm.DartSelectTargetStatusSync
         * @static
         * @param {rm.IDartSelectTargetStatusSync=} [properties] Properties to set
         * @returns {rm.DartSelectTargetStatusSync} DartSelectTargetStatusSync instance
         */
        DartSelectTargetStatusSync.create = function create(properties) {
            return new DartSelectTargetStatusSync(properties);
        };

        /**
         * Encodes the specified DartSelectTargetStatusSync message. Does not implicitly {@link rm.DartSelectTargetStatusSync.verify|verify} messages.
         * @function encode
         * @memberof rm.DartSelectTargetStatusSync
         * @static
         * @param {rm.IDartSelectTargetStatusSync} message DartSelectTargetStatusSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DartSelectTargetStatusSync.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.targetId != null && Object.hasOwnProperty.call(message, "targetId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.targetId);
            if (message.open != null && Object.hasOwnProperty.call(message, "open"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.open);
            return writer;
        };

        /**
         * Encodes the specified DartSelectTargetStatusSync message, length delimited. Does not implicitly {@link rm.DartSelectTargetStatusSync.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.DartSelectTargetStatusSync
         * @static
         * @param {rm.IDartSelectTargetStatusSync} message DartSelectTargetStatusSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DartSelectTargetStatusSync.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DartSelectTargetStatusSync message from the specified reader or buffer.
         * @function decode
         * @memberof rm.DartSelectTargetStatusSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.DartSelectTargetStatusSync} DartSelectTargetStatusSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DartSelectTargetStatusSync.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.DartSelectTargetStatusSync();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.targetId = reader.uint32();
                        break;
                    }
                case 2: {
                        message.open = reader.uint32();
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
         * Decodes a DartSelectTargetStatusSync message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.DartSelectTargetStatusSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.DartSelectTargetStatusSync} DartSelectTargetStatusSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DartSelectTargetStatusSync.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DartSelectTargetStatusSync message.
         * @function verify
         * @memberof rm.DartSelectTargetStatusSync
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DartSelectTargetStatusSync.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.targetId != null && message.hasOwnProperty("targetId"))
                if (!$util.isInteger(message.targetId))
                    return "targetId: integer expected";
            if (message.open != null && message.hasOwnProperty("open"))
                if (!$util.isInteger(message.open))
                    return "open: integer expected";
            return null;
        };

        /**
         * Creates a DartSelectTargetStatusSync message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.DartSelectTargetStatusSync
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.DartSelectTargetStatusSync} DartSelectTargetStatusSync
         */
        DartSelectTargetStatusSync.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.DartSelectTargetStatusSync)
                return object;
            let message = new $root.rm.DartSelectTargetStatusSync();
            if (object.targetId != null)
                message.targetId = object.targetId >>> 0;
            if (object.open != null)
                message.open = object.open >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a DartSelectTargetStatusSync message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.DartSelectTargetStatusSync
         * @static
         * @param {rm.DartSelectTargetStatusSync} message DartSelectTargetStatusSync
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DartSelectTargetStatusSync.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.targetId = 0;
                object.open = 0;
            }
            if (message.targetId != null && message.hasOwnProperty("targetId"))
                object.targetId = message.targetId;
            if (message.open != null && message.hasOwnProperty("open"))
                object.open = message.open;
            return object;
        };

        /**
         * Converts this DartSelectTargetStatusSync to JSON.
         * @function toJSON
         * @memberof rm.DartSelectTargetStatusSync
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DartSelectTargetStatusSync.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DartSelectTargetStatusSync
         * @function getTypeUrl
         * @memberof rm.DartSelectTargetStatusSync
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DartSelectTargetStatusSync.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.DartSelectTargetStatusSync";
        };

        return DartSelectTargetStatusSync;
    })();

    rm.SentryCtrlCommand = (function() {

        /**
         * Properties of a SentryCtrlCommand.
         * @memberof rm
         * @interface ISentryCtrlCommand
         * @property {number|null} [commandId] SentryCtrlCommand commandId
         */

        /**
         * Constructs a new SentryCtrlCommand.
         * @memberof rm
         * @classdesc Represents a SentryCtrlCommand.
         * @implements ISentryCtrlCommand
         * @constructor
         * @param {rm.ISentryCtrlCommand=} [properties] Properties to set
         */
        function SentryCtrlCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SentryCtrlCommand commandId.
         * @member {number} commandId
         * @memberof rm.SentryCtrlCommand
         * @instance
         */
        SentryCtrlCommand.prototype.commandId = 0;

        /**
         * Creates a new SentryCtrlCommand instance using the specified properties.
         * @function create
         * @memberof rm.SentryCtrlCommand
         * @static
         * @param {rm.ISentryCtrlCommand=} [properties] Properties to set
         * @returns {rm.SentryCtrlCommand} SentryCtrlCommand instance
         */
        SentryCtrlCommand.create = function create(properties) {
            return new SentryCtrlCommand(properties);
        };

        /**
         * Encodes the specified SentryCtrlCommand message. Does not implicitly {@link rm.SentryCtrlCommand.verify|verify} messages.
         * @function encode
         * @memberof rm.SentryCtrlCommand
         * @static
         * @param {rm.ISentryCtrlCommand} message SentryCtrlCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SentryCtrlCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.commandId != null && Object.hasOwnProperty.call(message, "commandId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.commandId);
            return writer;
        };

        /**
         * Encodes the specified SentryCtrlCommand message, length delimited. Does not implicitly {@link rm.SentryCtrlCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.SentryCtrlCommand
         * @static
         * @param {rm.ISentryCtrlCommand} message SentryCtrlCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SentryCtrlCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SentryCtrlCommand message from the specified reader or buffer.
         * @function decode
         * @memberof rm.SentryCtrlCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.SentryCtrlCommand} SentryCtrlCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SentryCtrlCommand.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.SentryCtrlCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.commandId = reader.uint32();
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
         * Decodes a SentryCtrlCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.SentryCtrlCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.SentryCtrlCommand} SentryCtrlCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SentryCtrlCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SentryCtrlCommand message.
         * @function verify
         * @memberof rm.SentryCtrlCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SentryCtrlCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.commandId != null && message.hasOwnProperty("commandId"))
                if (!$util.isInteger(message.commandId))
                    return "commandId: integer expected";
            return null;
        };

        /**
         * Creates a SentryCtrlCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.SentryCtrlCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.SentryCtrlCommand} SentryCtrlCommand
         */
        SentryCtrlCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.SentryCtrlCommand)
                return object;
            let message = new $root.rm.SentryCtrlCommand();
            if (object.commandId != null)
                message.commandId = object.commandId >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a SentryCtrlCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.SentryCtrlCommand
         * @static
         * @param {rm.SentryCtrlCommand} message SentryCtrlCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SentryCtrlCommand.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.commandId = 0;
            if (message.commandId != null && message.hasOwnProperty("commandId"))
                object.commandId = message.commandId;
            return object;
        };

        /**
         * Converts this SentryCtrlCommand to JSON.
         * @function toJSON
         * @memberof rm.SentryCtrlCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SentryCtrlCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SentryCtrlCommand
         * @function getTypeUrl
         * @memberof rm.SentryCtrlCommand
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SentryCtrlCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.SentryCtrlCommand";
        };

        return SentryCtrlCommand;
    })();

    rm.SentryCtrlResult = (function() {

        /**
         * Properties of a SentryCtrlResult.
         * @memberof rm
         * @interface ISentryCtrlResult
         * @property {number|null} [commandId] SentryCtrlResult commandId
         * @property {number|null} [resultCode] SentryCtrlResult resultCode
         */

        /**
         * Constructs a new SentryCtrlResult.
         * @memberof rm
         * @classdesc Represents a SentryCtrlResult.
         * @implements ISentryCtrlResult
         * @constructor
         * @param {rm.ISentryCtrlResult=} [properties] Properties to set
         */
        function SentryCtrlResult(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SentryCtrlResult commandId.
         * @member {number} commandId
         * @memberof rm.SentryCtrlResult
         * @instance
         */
        SentryCtrlResult.prototype.commandId = 0;

        /**
         * SentryCtrlResult resultCode.
         * @member {number} resultCode
         * @memberof rm.SentryCtrlResult
         * @instance
         */
        SentryCtrlResult.prototype.resultCode = 0;

        /**
         * Creates a new SentryCtrlResult instance using the specified properties.
         * @function create
         * @memberof rm.SentryCtrlResult
         * @static
         * @param {rm.ISentryCtrlResult=} [properties] Properties to set
         * @returns {rm.SentryCtrlResult} SentryCtrlResult instance
         */
        SentryCtrlResult.create = function create(properties) {
            return new SentryCtrlResult(properties);
        };

        /**
         * Encodes the specified SentryCtrlResult message. Does not implicitly {@link rm.SentryCtrlResult.verify|verify} messages.
         * @function encode
         * @memberof rm.SentryCtrlResult
         * @static
         * @param {rm.ISentryCtrlResult} message SentryCtrlResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SentryCtrlResult.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.commandId != null && Object.hasOwnProperty.call(message, "commandId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.commandId);
            if (message.resultCode != null && Object.hasOwnProperty.call(message, "resultCode"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.resultCode);
            return writer;
        };

        /**
         * Encodes the specified SentryCtrlResult message, length delimited. Does not implicitly {@link rm.SentryCtrlResult.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.SentryCtrlResult
         * @static
         * @param {rm.ISentryCtrlResult} message SentryCtrlResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SentryCtrlResult.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SentryCtrlResult message from the specified reader or buffer.
         * @function decode
         * @memberof rm.SentryCtrlResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.SentryCtrlResult} SentryCtrlResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SentryCtrlResult.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.SentryCtrlResult();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.commandId = reader.uint32();
                        break;
                    }
                case 2: {
                        message.resultCode = reader.uint32();
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
         * Decodes a SentryCtrlResult message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.SentryCtrlResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.SentryCtrlResult} SentryCtrlResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SentryCtrlResult.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SentryCtrlResult message.
         * @function verify
         * @memberof rm.SentryCtrlResult
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SentryCtrlResult.verify = function verify(message) {
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
         * Creates a SentryCtrlResult message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.SentryCtrlResult
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.SentryCtrlResult} SentryCtrlResult
         */
        SentryCtrlResult.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.SentryCtrlResult)
                return object;
            let message = new $root.rm.SentryCtrlResult();
            if (object.commandId != null)
                message.commandId = object.commandId >>> 0;
            if (object.resultCode != null)
                message.resultCode = object.resultCode >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a SentryCtrlResult message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.SentryCtrlResult
         * @static
         * @param {rm.SentryCtrlResult} message SentryCtrlResult
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SentryCtrlResult.toObject = function toObject(message, options) {
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
         * Converts this SentryCtrlResult to JSON.
         * @function toJSON
         * @memberof rm.SentryCtrlResult
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SentryCtrlResult.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SentryCtrlResult
         * @function getTypeUrl
         * @memberof rm.SentryCtrlResult
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SentryCtrlResult.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.SentryCtrlResult";
        };

        return SentryCtrlResult;
    })();

    rm.AirSupportCommand = (function() {

        /**
         * Properties of an AirSupportCommand.
         * @memberof rm
         * @interface IAirSupportCommand
         * @property {number|null} [commandId] AirSupportCommand commandId
         */

        /**
         * Constructs a new AirSupportCommand.
         * @memberof rm
         * @classdesc Represents an AirSupportCommand.
         * @implements IAirSupportCommand
         * @constructor
         * @param {rm.IAirSupportCommand=} [properties] Properties to set
         */
        function AirSupportCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AirSupportCommand commandId.
         * @member {number} commandId
         * @memberof rm.AirSupportCommand
         * @instance
         */
        AirSupportCommand.prototype.commandId = 0;

        /**
         * Creates a new AirSupportCommand instance using the specified properties.
         * @function create
         * @memberof rm.AirSupportCommand
         * @static
         * @param {rm.IAirSupportCommand=} [properties] Properties to set
         * @returns {rm.AirSupportCommand} AirSupportCommand instance
         */
        AirSupportCommand.create = function create(properties) {
            return new AirSupportCommand(properties);
        };

        /**
         * Encodes the specified AirSupportCommand message. Does not implicitly {@link rm.AirSupportCommand.verify|verify} messages.
         * @function encode
         * @memberof rm.AirSupportCommand
         * @static
         * @param {rm.IAirSupportCommand} message AirSupportCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AirSupportCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.commandId != null && Object.hasOwnProperty.call(message, "commandId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.commandId);
            return writer;
        };

        /**
         * Encodes the specified AirSupportCommand message, length delimited. Does not implicitly {@link rm.AirSupportCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.AirSupportCommand
         * @static
         * @param {rm.IAirSupportCommand} message AirSupportCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AirSupportCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AirSupportCommand message from the specified reader or buffer.
         * @function decode
         * @memberof rm.AirSupportCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.AirSupportCommand} AirSupportCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AirSupportCommand.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.AirSupportCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.commandId = reader.uint32();
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
         * Decodes an AirSupportCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.AirSupportCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.AirSupportCommand} AirSupportCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AirSupportCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AirSupportCommand message.
         * @function verify
         * @memberof rm.AirSupportCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AirSupportCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.commandId != null && message.hasOwnProperty("commandId"))
                if (!$util.isInteger(message.commandId))
                    return "commandId: integer expected";
            return null;
        };

        /**
         * Creates an AirSupportCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.AirSupportCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.AirSupportCommand} AirSupportCommand
         */
        AirSupportCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.AirSupportCommand)
                return object;
            let message = new $root.rm.AirSupportCommand();
            if (object.commandId != null)
                message.commandId = object.commandId >>> 0;
            return message;
        };

        /**
         * Creates a plain object from an AirSupportCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.AirSupportCommand
         * @static
         * @param {rm.AirSupportCommand} message AirSupportCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AirSupportCommand.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.commandId = 0;
            if (message.commandId != null && message.hasOwnProperty("commandId"))
                object.commandId = message.commandId;
            return object;
        };

        /**
         * Converts this AirSupportCommand to JSON.
         * @function toJSON
         * @memberof rm.AirSupportCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AirSupportCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AirSupportCommand
         * @function getTypeUrl
         * @memberof rm.AirSupportCommand
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AirSupportCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.AirSupportCommand";
        };

        return AirSupportCommand;
    })();

    rm.AirSupportStatusSync = (function() {

        /**
         * Properties of an AirSupportStatusSync.
         * @memberof rm
         * @interface IAirSupportStatusSync
         * @property {number|null} [airsupportStatus] AirSupportStatusSync airsupportStatus
         * @property {number|null} [leftTime] AirSupportStatusSync leftTime
         * @property {number|null} [costCoins] AirSupportStatusSync costCoins
         * @property {number|null} [isBeingTargeted] AirSupportStatusSync isBeingTargeted
         * @property {number|null} [shooterStatus] AirSupportStatusSync shooterStatus
         */

        /**
         * Constructs a new AirSupportStatusSync.
         * @memberof rm
         * @classdesc Represents an AirSupportStatusSync.
         * @implements IAirSupportStatusSync
         * @constructor
         * @param {rm.IAirSupportStatusSync=} [properties] Properties to set
         */
        function AirSupportStatusSync(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AirSupportStatusSync airsupportStatus.
         * @member {number} airsupportStatus
         * @memberof rm.AirSupportStatusSync
         * @instance
         */
        AirSupportStatusSync.prototype.airsupportStatus = 0;

        /**
         * AirSupportStatusSync leftTime.
         * @member {number} leftTime
         * @memberof rm.AirSupportStatusSync
         * @instance
         */
        AirSupportStatusSync.prototype.leftTime = 0;

        /**
         * AirSupportStatusSync costCoins.
         * @member {number} costCoins
         * @memberof rm.AirSupportStatusSync
         * @instance
         */
        AirSupportStatusSync.prototype.costCoins = 0;

        /**
         * AirSupportStatusSync isBeingTargeted.
         * @member {number} isBeingTargeted
         * @memberof rm.AirSupportStatusSync
         * @instance
         */
        AirSupportStatusSync.prototype.isBeingTargeted = 0;

        /**
         * AirSupportStatusSync shooterStatus.
         * @member {number} shooterStatus
         * @memberof rm.AirSupportStatusSync
         * @instance
         */
        AirSupportStatusSync.prototype.shooterStatus = 0;

        /**
         * Creates a new AirSupportStatusSync instance using the specified properties.
         * @function create
         * @memberof rm.AirSupportStatusSync
         * @static
         * @param {rm.IAirSupportStatusSync=} [properties] Properties to set
         * @returns {rm.AirSupportStatusSync} AirSupportStatusSync instance
         */
        AirSupportStatusSync.create = function create(properties) {
            return new AirSupportStatusSync(properties);
        };

        /**
         * Encodes the specified AirSupportStatusSync message. Does not implicitly {@link rm.AirSupportStatusSync.verify|verify} messages.
         * @function encode
         * @memberof rm.AirSupportStatusSync
         * @static
         * @param {rm.IAirSupportStatusSync} message AirSupportStatusSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AirSupportStatusSync.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.airsupportStatus != null && Object.hasOwnProperty.call(message, "airsupportStatus"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.airsupportStatus);
            if (message.leftTime != null && Object.hasOwnProperty.call(message, "leftTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.leftTime);
            if (message.costCoins != null && Object.hasOwnProperty.call(message, "costCoins"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.costCoins);
            if (message.isBeingTargeted != null && Object.hasOwnProperty.call(message, "isBeingTargeted"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.isBeingTargeted);
            if (message.shooterStatus != null && Object.hasOwnProperty.call(message, "shooterStatus"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.shooterStatus);
            return writer;
        };

        /**
         * Encodes the specified AirSupportStatusSync message, length delimited. Does not implicitly {@link rm.AirSupportStatusSync.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rm.AirSupportStatusSync
         * @static
         * @param {rm.IAirSupportStatusSync} message AirSupportStatusSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AirSupportStatusSync.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AirSupportStatusSync message from the specified reader or buffer.
         * @function decode
         * @memberof rm.AirSupportStatusSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rm.AirSupportStatusSync} AirSupportStatusSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AirSupportStatusSync.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rm.AirSupportStatusSync();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.airsupportStatus = reader.uint32();
                        break;
                    }
                case 2: {
                        message.leftTime = reader.uint32();
                        break;
                    }
                case 3: {
                        message.costCoins = reader.uint32();
                        break;
                    }
                case 4: {
                        message.isBeingTargeted = reader.uint32();
                        break;
                    }
                case 5: {
                        message.shooterStatus = reader.uint32();
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
         * Decodes an AirSupportStatusSync message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rm.AirSupportStatusSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rm.AirSupportStatusSync} AirSupportStatusSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AirSupportStatusSync.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AirSupportStatusSync message.
         * @function verify
         * @memberof rm.AirSupportStatusSync
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AirSupportStatusSync.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.airsupportStatus != null && message.hasOwnProperty("airsupportStatus"))
                if (!$util.isInteger(message.airsupportStatus))
                    return "airsupportStatus: integer expected";
            if (message.leftTime != null && message.hasOwnProperty("leftTime"))
                if (!$util.isInteger(message.leftTime))
                    return "leftTime: integer expected";
            if (message.costCoins != null && message.hasOwnProperty("costCoins"))
                if (!$util.isInteger(message.costCoins))
                    return "costCoins: integer expected";
            if (message.isBeingTargeted != null && message.hasOwnProperty("isBeingTargeted"))
                if (!$util.isInteger(message.isBeingTargeted))
                    return "isBeingTargeted: integer expected";
            if (message.shooterStatus != null && message.hasOwnProperty("shooterStatus"))
                if (!$util.isInteger(message.shooterStatus))
                    return "shooterStatus: integer expected";
            return null;
        };

        /**
         * Creates an AirSupportStatusSync message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rm.AirSupportStatusSync
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rm.AirSupportStatusSync} AirSupportStatusSync
         */
        AirSupportStatusSync.fromObject = function fromObject(object) {
            if (object instanceof $root.rm.AirSupportStatusSync)
                return object;
            let message = new $root.rm.AirSupportStatusSync();
            if (object.airsupportStatus != null)
                message.airsupportStatus = object.airsupportStatus >>> 0;
            if (object.leftTime != null)
                message.leftTime = object.leftTime >>> 0;
            if (object.costCoins != null)
                message.costCoins = object.costCoins >>> 0;
            if (object.isBeingTargeted != null)
                message.isBeingTargeted = object.isBeingTargeted >>> 0;
            if (object.shooterStatus != null)
                message.shooterStatus = object.shooterStatus >>> 0;
            return message;
        };

        /**
         * Creates a plain object from an AirSupportStatusSync message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rm.AirSupportStatusSync
         * @static
         * @param {rm.AirSupportStatusSync} message AirSupportStatusSync
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AirSupportStatusSync.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.airsupportStatus = 0;
                object.leftTime = 0;
                object.costCoins = 0;
                object.isBeingTargeted = 0;
                object.shooterStatus = 0;
            }
            if (message.airsupportStatus != null && message.hasOwnProperty("airsupportStatus"))
                object.airsupportStatus = message.airsupportStatus;
            if (message.leftTime != null && message.hasOwnProperty("leftTime"))
                object.leftTime = message.leftTime;
            if (message.costCoins != null && message.hasOwnProperty("costCoins"))
                object.costCoins = message.costCoins;
            if (message.isBeingTargeted != null && message.hasOwnProperty("isBeingTargeted"))
                object.isBeingTargeted = message.isBeingTargeted;
            if (message.shooterStatus != null && message.hasOwnProperty("shooterStatus"))
                object.shooterStatus = message.shooterStatus;
            return object;
        };

        /**
         * Converts this AirSupportStatusSync to JSON.
         * @function toJSON
         * @memberof rm.AirSupportStatusSync
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AirSupportStatusSync.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AirSupportStatusSync
         * @function getTypeUrl
         * @memberof rm.AirSupportStatusSync
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AirSupportStatusSync.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rm.AirSupportStatusSync";
        };

        return AirSupportStatusSync;
    })();

    return rm;
})();

export { $root as default };
