const { ipcRenderer } = (window as any).require ? (window as any).require('electron') : { ipcRenderer: null };

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

    private intervalId: ReturnType<typeof setInterval> | null = null;
    private readonly FREQUENCY_HZ = 75;
    private readonly INTERVAL_MS = 1000 / this.FREQUENCY_HZ;

    constructor() {
        this.initListeners();
        this.startSending();
    }

    private initListeners() {
        window.addEventListener('mousemove', (e) => {
            // Normalize or map coordinates as needed. 
            // The protocol asks for "mouse moving speed" or similar, 
            // but often in these comps it might be delta or absolute position suitable for control.
            // Requirement says: "mouse x axis moving speed".
            // We correspond movementX/Y to speed for now.
            this.mouseX = e.movementX;
            this.mouseY = e.movementY;
        });

        window.addEventListener('mousedown', (e) => {
            if (e.button === 0) this.leftButtonDown = true;
            if (e.button === 2) this.rightButtonDown = true;
            if (e.button === 1) this.midButtonDown = true;
        });

        window.addEventListener('mouseup', (e) => {
            if (e.button === 0) this.leftButtonDown = false;
            if (e.button === 2) this.rightButtonDown = false;
            if (e.button === 1) this.midButtonDown = false;
        });

        window.addEventListener('wheel', (e) => {
            this.mouseZ = e.deltaY;
        });

        window.addEventListener('keydown', (e) => {
            this.keysPressed.add(e.code);
            this.updateKeyboardValue();
        });

        window.addEventListener('keyup', (e) => {
            this.keysPressed.delete(e.code);
            this.updateKeyboardValue();
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
        if (this.keysPressed.has('ShiftLeft')) val |= 1 << 4;
        if (this.keysPressed.has('ControlLeft')) val |= 1 << 5;
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
    }
}
