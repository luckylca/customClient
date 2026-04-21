const PACKET_HEADER = 0xA4;
const PACKET_SIZE = 254;
const PACKET_PAYLOAD_SIZE = 250;
const MAX_STREAM_BUFFER_BYTES = 2 * 1024 * 1024;
const MAX_ACCESS_UNIT_BYTES = 512 * 1024;

type WorkerInMessage = {
    type: 'chunk';
    bytes: ArrayBuffer;
};

type WorkerOutMessage =
    | {
          type: 'stats';
          rawUpdateCount: number;
          lastRawLength: number;
          lastPacketHeader: number | null;
          lastPacketSequence: number | null;
          lastPayloadPreviewHex: string;
          lastReceivedAtText: string;
          packetCount: number;
          droppedPackets: number;
          parserErrors: number;
      }
    | {
          type: 'codec';
          codec: string;
      }
    | {
          type: 'au';
          data: ArrayBuffer;
          isKey: boolean;
      };

let expectedSequence: number | null = null;
let streamBuffer: Uint8Array<ArrayBufferLike> = new Uint8Array(0);
let pendingAccessUnit: Uint8Array[] = [];
let pendingHasVcl = false;
let pendingBytes = 0;
let lastCodec = '';

let rawUpdateCount = 0;
let lastRawLength = 0;
let lastPacketHeader: number | null = null;
let lastPacketSequence: number | null = null;
let lastPayloadPreviewHex = '-';
let lastReceivedAtText = '-';
let packetCount = 0;
let droppedPackets = 0;
let parserErrors = 0;

const startCodeLengthAt = (data: Uint8Array, index: number): number => {
    if (index + 3 < data.length && data[index] === 0 && data[index + 1] === 0 && data[index + 2] === 0 && data[index + 3] === 1) {
        return 4;
    }
    if (index + 2 < data.length && data[index] === 0 && data[index + 1] === 0 && data[index + 2] === 1) {
        return 3;
    }
    return 0;
};

const findStartCode = (data: Uint8Array, from = 0): { index: number; length: number } | null => {
    for (let i = from; i <= data.length - 3; i += 1) {
        const length = startCodeLengthAt(data, i);
        if (length > 0) {
            return { index: i, length };
        }
    }
    return null;
};

const concatBytes = (parts: Uint8Array[]): Uint8Array => {
    const total = parts.reduce((sum, item) => sum + item.length, 0);
    const out = new Uint8Array(total);
    let offset = 0;
    for (const part of parts) {
        out.set(part, offset);
        offset += part.length;
    }
    return out;
};

const appendBytes = (base: Uint8Array, extra: Uint8Array): Uint8Array => {
    if (!base.length) return extra;
    if (!extra.length) return base;
    const out = new Uint8Array(base.length + extra.length);
    out.set(base, 0);
    out.set(extra, base.length);
    return out;
};

const toHexPreview = (bytes: Uint8Array, maxLen = 20): string => {
    if (!bytes.length) return '-';
    const clipped = bytes.subarray(0, maxLen);
    const parts = Array.from(clipped).map((value) => value.toString(16).padStart(2, '0').toUpperCase());
    return bytes.length > maxLen ? `${parts.join(' ')} ...` : parts.join(' ');
};

const toRbsp = (ebsp: Uint8Array): Uint8Array => {
    const out: number[] = [];
    for (let i = 0; i < ebsp.length; i += 1) {
        if (i >= 2 && ebsp[i] === 0x03 && ebsp[i - 1] === 0x00 && ebsp[i - 2] === 0x00) {
            continue;
        }
        out.push(ebsp[i]);
    }
    return new Uint8Array(out);
};

class BitReader {
    private readonly data: Uint8Array;
    private bitOffset = 0;

    constructor(data: Uint8Array) {
        this.data = data;
    }

    readBit(): number {
        if (this.bitOffset >= this.data.length * 8) throw new Error('bit overflow');
        const byte = this.data[this.bitOffset >> 3];
        const bit = 7 - (this.bitOffset & 7);
        this.bitOffset += 1;
        return (byte >> bit) & 1;
    }

    readUE(): number {
        let zeroCount = 0;
        while (this.readBit() === 0) {
            zeroCount += 1;
            if (zeroCount > 31) throw new Error('ue overflow');
        }
        let value = 1;
        for (let i = 0; i < zeroCount; i += 1) {
            value = (value << 1) | this.readBit();
        }
        return value - 1;
    }
}

const getNalType = (nal: Uint8Array): number => {
    const startLen = startCodeLengthAt(nal, 0);
    if (!startLen || startLen >= nal.length) return -1;
    return nal[startLen] & 0x1f;
};

const getNalPayload = (nal: Uint8Array): Uint8Array => {
    const startLen = startCodeLengthAt(nal, 0);
    if (!startLen || startLen + 1 >= nal.length) return new Uint8Array(0);
    return nal.subarray(startLen + 1);
};

const isVclNal = (nalType: number): boolean => nalType >= 1 && nalType <= 5;

const isFirstSlice = (nal: Uint8Array): boolean => {
    try {
        const payload = getNalPayload(nal);
        if (!payload.length) return true;
        const rbsp = toRbsp(payload);
        if (!rbsp.length) return true;
        const reader = new BitReader(rbsp);
        const firstMbInSlice = reader.readUE();
        return firstMbInSlice === 0;
    } catch {
        return true;
    }
};

const parseAvcCodecFromSps = (nal: Uint8Array): string | null => {
    const payload = getNalPayload(nal);
    if (payload.length < 3) return null;
    const rbsp = toRbsp(payload);
    if (rbsp.length < 3) return null;
    const h = (value: number) => value.toString(16).padStart(2, '0');
    return `avc1.${h(rbsp[0])}${h(rbsp[1])}${h(rbsp[2])}`;
};

const postWorkerMessage = (message: WorkerOutMessage) => {
    (self as { postMessage: (data: WorkerOutMessage) => void }).postMessage(message);
};

const postStats = () => {
    postWorkerMessage({
        type: 'stats',
        rawUpdateCount,
        lastRawLength,
        lastPacketHeader,
        lastPacketSequence,
        lastPayloadPreviewHex,
        lastReceivedAtText,
        packetCount,
        droppedPackets,
        parserErrors,
    });
};

const emitCodec = (codec: string) => {
    if (!codec || codec === lastCodec) return;
    lastCodec = codec;
    postWorkerMessage({ type: 'codec', codec });
};

const emitAccessUnit = (nals: Uint8Array[], hasVcl: boolean) => {
    if (!hasVcl || !nals.length) return;
    const isKey = nals.some((nal) => getNalType(nal) === 5);
    const data = concatBytes(nals);
    const transferable = data.buffer;
    (self as { postMessage: (data: WorkerOutMessage, transfer?: Transferable[]) => void }).postMessage(
        {
            type: 'au',
            data: transferable,
            isKey,
        },
        [transferable]
    );
};

const flushPendingAccessUnit = () => {
    if (!pendingAccessUnit.length) return;
    const nals = pendingAccessUnit;
    const hasVcl = pendingHasVcl;
    pendingAccessUnit = [];
    pendingHasVcl = false;
    pendingBytes = 0;
    emitAccessUnit(nals, hasVcl);
};

const handleNal = (nal: Uint8Array) => {
    const nalType = getNalType(nal);
    if (nalType < 0) return;

    if (nalType === 7) {
        const codec = parseAvcCodecFromSps(nal);
        if (codec) emitCodec(codec);
    }

    if (nalType === 9 && pendingAccessUnit.length) {
        flushPendingAccessUnit();
    }

    if (isVclNal(nalType)) {
        const firstSlice = isFirstSlice(nal);
        if (pendingHasVcl && firstSlice) {
            flushPendingAccessUnit();
        }
        pendingHasVcl = true;
        pendingAccessUnit.push(nal);
        pendingBytes += nal.length;
    } else {
        if (pendingHasVcl && (nalType === 6 || nalType === 7 || nalType === 8 || nalType === 9)) {
            flushPendingAccessUnit();
        }
        pendingAccessUnit.push(nal);
        pendingBytes += nal.length;
    }

    if (pendingBytes > MAX_ACCESS_UNIT_BYTES) {
        flushPendingAccessUnit();
    }
};

const extractNalUnits = (): Uint8Array[] => {
    const first = findStartCode(streamBuffer, 0);
    if (!first) {
        if (streamBuffer.length > 4) {
            streamBuffer = streamBuffer.slice(streamBuffer.length - 4);
        }
        return [];
    }

    let start = first.index;
    let cursor = first.index + first.length;
    const out: Uint8Array[] = [];

    while (true) {
        const next = findStartCode(streamBuffer, cursor);
        if (!next) break;
        out.push(streamBuffer.slice(start, next.index));
        start = next.index;
        cursor = next.index + next.length;
    }

    streamBuffer = streamBuffer.slice(start);
    return out;
};

const appendStreamPayload = (payload: Uint8Array) => {
    streamBuffer = appendBytes(streamBuffer, payload);
    if (streamBuffer.length > MAX_STREAM_BUFFER_BYTES) {
        parserErrors += 1;
        streamBuffer = streamBuffer.slice(streamBuffer.length - MAX_STREAM_BUFFER_BYTES);
    }

    const nalUnits = extractNalUnits();
    for (const nal of nalUnits) {
        handleNal(nal);
    }
};

const parseCustomPacket = (packet: Uint8Array) => {
    if (packet.length < PACKET_SIZE) {
        parserErrors += 1;
        return;
    }

    if (packet[0] !== PACKET_HEADER) {
        parserErrors += 1;
        return;
    }

    packetCount += 1;
    lastPacketHeader = packet[0];

    const sequence = packet[1];
    lastPacketSequence = sequence;
    if (expectedSequence !== null) {
        const gap = (sequence - expectedSequence + 256) % 256;
        if (gap !== 0) {
            droppedPackets += gap;
        }
    }
    expectedSequence = (sequence + 1) % 256;

    const payload = packet.subarray(2, 2 + PACKET_PAYLOAD_SIZE);
    appendStreamPayload(payload);
};

const ingestCustomBytes = (bytes: Uint8Array) => {
    if (!bytes.length) return;

    rawUpdateCount += 1;
    lastRawLength = bytes.length;
    if (bytes.length >= 1) {
        lastPacketHeader = bytes[0];
    }
    if (bytes.length >= 2) {
        lastPacketSequence = bytes[1];
    }
    lastPayloadPreviewHex = toHexPreview(bytes);
    lastReceivedAtText = new Date().toLocaleTimeString();

    if (bytes.length >= PACKET_SIZE && bytes[0] === PACKET_HEADER) {
        const packetCountInBlob = Math.floor(bytes.length / PACKET_SIZE);
        for (let i = 0; i < packetCountInBlob; i += 1) {
            const start = i * PACKET_SIZE;
            parseCustomPacket(bytes.subarray(start, start + PACKET_SIZE));
        }
        return;
    }

    if (bytes.length === PACKET_PAYLOAD_SIZE) {
        appendStreamPayload(bytes);
        return;
    }

    parserErrors += 1;
    appendStreamPayload(bytes);
};

const toByteArray = (input: unknown): Uint8Array | null => {
    if (!input) return null;
    if (input instanceof Uint8Array) return input;
    if (input instanceof ArrayBuffer) return new Uint8Array(input);
    return null;
};

const workerGlobal = self as {
    onmessage: ((event: MessageEvent<WorkerInMessage>) => void) | null;
};

workerGlobal.onmessage = (event: MessageEvent<WorkerInMessage>) => {
    const message = event.data;
    if (!message || message.type !== 'chunk') return;

    const bytes = toByteArray(message.bytes);
    if (!bytes) {
        parserErrors += 1;
        postStats();
        return;
    }

    ingestCustomBytes(bytes);
    postStats();
};
