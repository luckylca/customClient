import { onMounted, onUnmounted, ref, watch } from 'vue';

export function useCombatOverlay() {
    const overlay = ref(false);
    const lockTarget = ref<HTMLElement | null>(null);

    const notifyOverlayState = (isOverlayOpen: boolean) => {
        window.dispatchEvent(new CustomEvent('combat-overlay-active', { detail: { active: isOverlayOpen } }));
    };

    const requestPointerLock = () => {
        if (overlay.value) return;
        const target = lockTarget.value;
        if (!target) return;
        if (document.pointerLockElement === target) return;

        const maybePromise = target.requestPointerLock();
        if (maybePromise && typeof (maybePromise as Promise<void>).catch === 'function') {
            (maybePromise as Promise<void>).catch((error) => {
                console.warn('requestPointerLock failed:', error);
            });
        }
    };

    const exitPointerLock = () => {
        if (document.pointerLockElement) {
            document.exitPointerLock();
        }
    };

    const handleGlobalEsc = (event: KeyboardEvent) => {
        if (event.key !== 'Escape' && event.key !== 'Esc') return;
        overlay.value = !overlay.value;

        if (overlay.value) {
            exitPointerLock();
        } else {
            requestPointerLock();
        }
    };

    const handleBattleViewMouseDown = () => {
        requestPointerLock();
    };

    watch(overlay, (isOverlayOpen) => {
        notifyOverlayState(isOverlayOpen);
        if (isOverlayOpen) {
            exitPointerLock();
        }
    });

    onMounted(() => {
        notifyOverlayState(false);
        window.addEventListener('keydown', handleGlobalEsc);
    });

    onUnmounted(() => {
        window.removeEventListener('keydown', handleGlobalEsc);
        exitPointerLock();
        notifyOverlayState(false);
    });

    return {
        overlay,
        lockTarget,
        handleBattleViewMouseDown,
    };
}