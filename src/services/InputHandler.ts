const { ipcRenderer } = (window as any).require ? (window as any).require('electron') : { ipcRenderer: null };
import { useSettingStore } from '../stores/setting';
import { useInputTelemetryStore } from '../stores/inputTelemetry';

let activeInputHandler: InputHandler | null = null;

export class InputHandler {
    private mouseX: number = 0;
    private mouseY: number = 0;
    private mouseZ: number = 0; // Wheel
    private leftButtonDown: boolean = false;
    private rightButtonDown: boolean = false;
    private midButtonDown: boolean = false;
    private keyboardValue: number = 0;

    // Key mapping for simple WASD demonstration (adjust as needed for full keyboard mapping)
    // In a real scenario, you'd map standard keys to the specific bits required by the protocol.
    // For now, we'll try to map some common keys.
    private keysPressed = new Set<string>();
    private settingStore: ReturnType<typeof useSettingStore> | null = null;
    private telemetryStore: ReturnType<typeof useInputTelemetryStore> | null = null;

    private intervalId: ReturnType<typeof setInterval> | null = null;
    private readonly FREQUENCY_HZ = 75;
    private readonly INTERVAL_MS = 1000 / this.FREQUENCY_HZ;
    private overlayActive: boolean = false;
    private listenersAttached: boolean = false;

    private readonly onMouseMove = (e: MouseEvent) => {
        if (this.overlayActive) return;
        const sensitivity = this.settingStore?.appSettings.mouseSensitivity ?? 1.0;
        this.mouseX = e.movementX * sensitivity;
        this.mouseY = e.movementY * sensitivity;
    };

    private readonly onMouseDown = (e: MouseEvent) => {
        if (this.overlayActive) return;
        if (e.button === 0) this.leftButtonDown = true;
        if (e.button === 2) this.rightButtonDown = true;
        if (e.button === 1) this.midButtonDown = true;
    };

    private readonly onMouseUp = (e: MouseEvent) => {
        if (this.overlayActive) return;
        if (e.button === 0) this.leftButtonDown = false;
        if (e.button === 2) this.rightButtonDown = false;
        if (e.button === 1) this.midButtonDown = false;
    };

    private readonly onWheel = (e: WheelEvent) => {
        if (this.overlayActive) return;
        this.mouseZ = e.deltaY;
    };

    private readonly onKeyDown = (e: KeyboardEvent) => {
        if (this.overlayActive) return;
        if (this.settingStore && !e.repeat) {
            const binding = this.settingStore.keyBindings.find(b => b.key === e.code);
            if (binding) {
                this.settingStore.triggerScript(binding.scriptId);
            }
        }
        this.keysPressed.add(e.code);
        this.updateKeyboardValue();
    };

    private readonly onKeyUp = (e: KeyboardEvent) => {
        if (this.overlayActive) return;
        this.keysPressed.delete(e.code);
        this.updateKeyboardValue();
    };

    private readonly onBlur = () => {
        this.resetControlState();
    };

    private readonly onContextMenu = (e: MouseEvent) => {
        e.preventDefault();
    };

    private readonly onOverlayActive = (event: Event) => {
        const customEvent = event as CustomEvent<{ active?: boolean }>;
        this.overlayActive = !!customEvent.detail?.active;
        if (this.overlayActive) {
            this.resetControlState();
        }
    };

    constructor() {
        if (activeInputHandler && activeInputHandler !== this) {
            activeInputHandler.destroy();
        }
        activeInputHandler = this;

        try {
            this.settingStore = useSettingStore();
            this.telemetryStore = useInputTelemetryStore();
        } catch (e) {
            console.warn("InputHandler could not initialize settingStore");
        }
        this.initListeners();
        this.startSending();
    }

    private resetControlState() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseZ = 0;
        this.leftButtonDown = false;
        this.rightButtonDown = false;
        this.midButtonDown = false;
        this.keysPressed.clear();
        this.updateKeyboardValue();
    }

    private initListeners() {
        if (this.listenersAttached) return;
        this.listenersAttached = true;

        window.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mousemove', this.onMouseMove);

        window.addEventListener('mousedown', this.onMouseDown);
        document.addEventListener('mousedown', this.onMouseDown);

        window.addEventListener('mouseup', this.onMouseUp);
        document.addEventListener('mouseup', this.onMouseUp);

        document.addEventListener('contextmenu', this.onContextMenu);

        window.addEventListener('wheel', this.onWheel);
        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
        window.addEventListener('blur', this.onBlur);
        window.addEventListener('combat-overlay-active', this.onOverlayActive);
    }

    private removeListeners() {
        if (!this.listenersAttached) return;
        this.listenersAttached = false;

        window.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mousemove', this.onMouseMove);

        window.removeEventListener('mousedown', this.onMouseDown);
        document.removeEventListener('mousedown', this.onMouseDown);

        window.removeEventListener('mouseup', this.onMouseUp);
        document.removeEventListener('mouseup', this.onMouseUp);

        document.removeEventListener('contextmenu', this.onContextMenu);

        window.removeEventListener('wheel', this.onWheel);
        window.removeEventListener('keydown', this.onKeyDown);
        window.removeEventListener('keyup', this.onKeyUp);
        window.removeEventListener('blur', this.onBlur);
        window.removeEventListener('combat-overlay-active', this.onOverlayActive);
    }

    private updateKeyboardValue() {
        // Simple mapping example:
        // W: 1, S: 2, A: 4, D: 8, Shift: 16, Ctrl: 32... 
        // This MUST match the server's expected bitmask. 
        // Without specific bit definition, we implement a placeholder mapping.
        let val = 0;
        if (this.keysPressed.has('KeyW')) val |= 1 << 0;
        if (this.keysPressed.has('KeyS')) val |= 1 << 1;
        if (this.keysPressed.has('KeyA')) val |= 1 << 2;
        if (this.keysPressed.has('KeyD')) val |= 1 << 3;
        if (this.keysPressed.has('ShiftLeft') || this.keysPressed.has('ShiftRight')) val |= 1 << 4;
        if (this.keysPressed.has('ControlLeft') || this.keysPressed.has('ControlRight')) val |= 1 << 5;
        if (this.keysPressed.has('KeyQ')) val |= 1 << 6;
        if (this.keysPressed.has('KeyE')) val |= 1 << 7;
        if (this.keysPressed.has('KeyR')) val |= 1 << 8;
        if (this.keysPressed.has('KeyF')) val |= 1 << 9;
        if (this.keysPressed.has('KeyG')) val |= 1 << 10;
        if (this.keysPressed.has('KeyZ')) val |= 1 << 11;
        if (this.keysPressed.has('KeyX')) val |= 1 << 12;
        if (this.keysPressed.has('KeyC')) val |= 1 << 13;
        if (this.keysPressed.has('KeyV')) val |= 1 << 14;
        if (this.keysPressed.has('KeyB')) val |= 1 << 15;
        this.keyboardValue = val;
        this.telemetryStore?.patch({
            keyboardValue: this.keyboardValue,
            keysPressed: Array.from(this.keysPressed),
        });
    }

    private readonly emptyData = new Uint8Array();

    private startSending() {
        this.intervalId = setInterval(() => {
            const data = {
                mouseX: Math.round(this.mouseX),
                mouseY: Math.round(this.mouseY),
                mouseZ: Math.round(this.mouseZ),
                leftButtonDown: this.leftButtonDown,
                rightButtonDown: this.rightButtonDown,
                midButtonDown: this.midButtonDown,
                keyboardValue: this.keyboardValue,
                data: this.emptyData
            };

            // Send to main process
            if (ipcRenderer) {
                ipcRenderer.send('send-remote-control', data);
            }

            this.telemetryStore?.patch(data);

            // Reset deltas after sending (since they represent speed/movement since last frame)
            this.mouseX = 0;
            this.mouseY = 0;
            this.mouseZ = 0;

        }, this.INTERVAL_MS);
    }

    public destroy() {
        this.removeListeners();
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        if (activeInputHandler === this) {
            activeInputHandler = null;
        }
        this.telemetryStore?.reset();
    }
}
