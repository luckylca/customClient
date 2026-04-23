const { ipcRenderer } = (window as any).require ? (window as any).require('electron') : { ipcRenderer: null };
import { useSettingStore } from '../stores/setting';
import { useInputTelemetryStore } from '../stores/inputTelemetry';
import { useRobotStore } from '../stores/robotData';


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
    private robotStore: ReturnType<typeof useRobotStore> | null = null;

    private intervalId: ReturnType<typeof setInterval> | null = null;
    private readonly FREQUENCY_HZ = 75;
    private readonly INTERVAL_MS = 1000 / this.FREQUENCY_HZ;
    private overlayActive: boolean = false;
    private removeListenerFns: Array<() => void> = [];
    private listenersInitialized: boolean = false;

    constructor() {
        try {
            this.settingStore = useSettingStore();
            this.telemetryStore = useInputTelemetryStore();
            this.robotStore = useRobotStore();
        } catch (e) {
            console.warn("InputHandler could not initialize stores");
        }
        this.initListeners();
        this.startSending();
    }

    private addManagedListener(
        target: Window | Document,
        type: string,
        listener: (event: any) => void,
        options?: AddEventListenerOptions | boolean,
    ) {
        target.addEventListener(type, listener as EventListener, options);
        this.removeListenerFns.push(() => {
            target.removeEventListener(type, listener as EventListener, options);
        });
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
        if (this.listenersInitialized) return;
        this.listenersInitialized = true;

        const onMouseMove = (e: MouseEvent) => {
            if (this.overlayActive) return;
            // Normalize or map coordinates as needed. 
            // The protocol asks for "mouse moving speed" or similar, 
            // but often in these comps it might be delta or absolute position suitable for control.
            // Requirement says: "mouse x axis moving speed".
            // We correspond movementX/Y to speed for now.
            const sensitivity = this.settingStore?.appSettings.mouseSensitivity ?? 1.0;
            this.mouseX = e.movementX * sensitivity;
            this.mouseY = e.movementY * sensitivity;
        };
        this.addManagedListener(window, 'mousemove', onMouseMove);
        this.addManagedListener(document, 'mousemove', onMouseMove);

        const onMouseDown = (e: MouseEvent) => {
            if (this.overlayActive) return;
            if (e.button === 0) this.leftButtonDown = true;
            if (e.button === 2) this.rightButtonDown = true;
            if (e.button === 1) this.midButtonDown = true;
        };
        this.addManagedListener(window, 'mousedown', onMouseDown);
        this.addManagedListener(document, 'mousedown', onMouseDown);

        const onMouseUp = (e: MouseEvent) => {
            if (this.overlayActive) return;
            if (e.button === 0) this.leftButtonDown = false;
            if (e.button === 2) this.rightButtonDown = false;
            if (e.button === 1) this.midButtonDown = false;
        };
        this.addManagedListener(window, 'mouseup', onMouseUp);
        this.addManagedListener(document, 'mouseup', onMouseUp);

        this.addManagedListener(document, 'contextmenu', (e: Event) => {
            e.preventDefault();
        });

        this.addManagedListener(window, 'wheel', (e: Event) => {
            if (this.overlayActive) return;
            this.mouseZ = (e as WheelEvent).deltaY;
        });

        const onKeyDown = (e: KeyboardEvent) => {
            if (this.overlayActive) return;
            const alreadyPressed = this.keysPressed.has(e.code);
            if (this.settingStore && !e.repeat && !alreadyPressed) {
                const binding = this.settingStore.keyBindings.find(b => b.key === e.code);
                if (binding) {
                    this.settingStore.triggerScript(binding.scriptId);
                }
            }
            this.keysPressed.add(e.code);
            this.updateKeyboardValue();
        };
        this.addManagedListener(window, 'keydown', onKeyDown);

        const onKeyUp = (e: KeyboardEvent) => {
            if (this.overlayActive) return;
            this.keysPressed.delete(e.code);
            this.updateKeyboardValue();
        };
        this.addManagedListener(window, 'keyup', onKeyUp);

        this.addManagedListener(window, 'blur', () => {
            this.resetControlState();
        });

        this.addManagedListener(window, 'combat-overlay-active', (event: Event) => {
            const customEvent = event as CustomEvent<{ active?: boolean }>;
            this.overlayActive = !!customEvent.detail?.active;
            if (this.overlayActive) {
                this.resetControlState();
            }
        });

        // Reset speed each frame/tick? 
        // If it's speed, it should potentially decay or be reset after read.
        // For simplicity, we send the value captured since last tick, then reset.
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
                
                // Construct CustomControl data
                // Frame header 0xA3, followed by HeroDeployMode status (1 for deploy, 0 for not)
                // This struct can be expanded in the future
                const deployModeStatus = this.robotStore?.robot?.HeroDeployModeData?.status === 1 ? 1 : 0;
                const customData = new Uint8Array([0xA3, deployModeStatus]);
                ipcRenderer.send('send-custom-control', customData);
            }

            this.telemetryStore?.patch(data);

            // Reset deltas after sending (since they represent speed/movement since last frame)
            this.mouseX = 0;
            this.mouseY = 0;
            this.mouseZ = 0;

        }, this.INTERVAL_MS);
    }

    public destroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        for (const remove of this.removeListenerFns) {
            remove();
        }
        this.removeListenerFns = [];
        this.listenersInitialized = false;
        this.telemetryStore?.reset();
    }
}
