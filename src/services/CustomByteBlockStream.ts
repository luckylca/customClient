import type { CustomByteBlockStreamEvent } from '@/types/rmType';

type CustomByteBlockListener = (event: CustomByteBlockStreamEvent) => void;

const listeners = new Set<CustomByteBlockListener>();
const STREAM_DEBUG_ENABLED = true;
const STREAM_DEBUG_LOG_INTERVAL_MS = 3000;

let streamRxChunkCount = 0;
let streamRxByteCount = 0;
let lastStreamDebugLogAt = 0;
let firstPacketLogged = false;

const toHexPreview = (bytes: Uint8Array, maxLen = 16): string => {
    if (!bytes.length) return '-';
    const clipped = bytes.subarray(0, maxLen);
    const parts = Array.from(clipped).map((value) => value.toString(16).padStart(2, '0').toUpperCase());
    return bytes.length > maxLen ? `${parts.join(' ')} ...` : parts.join(' ');
};

const logStreamRxIfNeeded = (event: CustomByteBlockStreamEvent) => {
    if (!STREAM_DEBUG_ENABLED) return;

    const bytes = event.data ?? new Uint8Array(0);
    streamRxChunkCount += 1;
    streamRxByteCount += bytes.length;

    const header = bytes.length > 0 ? `0x${bytes[0].toString(16).padStart(2, '0').toUpperCase()}` : '-';
    const sequence = event.sequenceId ?? event.lastFrame?.sequenceId ?? '-';

    if (!firstPacketLogged) {
        firstPacketLogged = true;
        console.log(
            `[CustomByteBlockStream] topic通信成功: 已收到首包 rawLen=${bytes.length} frameCount=${event.frameCount ?? 0} trailing=${event.trailingBytes ?? 0} header=${header} seq=${sequence} preview=${toHexPreview(bytes)}`
        );
    }

    const now = Date.now();
    if (now - lastStreamDebugLogAt < STREAM_DEBUG_LOG_INTERVAL_MS) return;
    lastStreamDebugLogAt = now;

    console.log(
        `[CustomByteBlockStream] topic心跳: 已接收 chunks=${streamRxChunkCount} totalBytes=${streamRxByteCount} lastRawLen=${bytes.length} frameCount=${event.frameCount ?? 0} trailing=${event.trailingBytes ?? 0} lastSeq=${sequence}`
    );
};

export const customByteBlockStream = {
    publish(event: CustomByteBlockStreamEvent) {
        logStreamRxIfNeeded(event);
        for (const listener of listeners) {
            listener(event);
        }
    },
    subscribe(listener: CustomByteBlockListener) {
        listeners.add(listener);
        return () => {
            listeners.delete(listener);
        };
    },
};

export type { CustomByteBlockListener };
