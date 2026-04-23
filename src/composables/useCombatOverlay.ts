import { onMounted, onUnmounted, ref, watch } from 'vue';

// 全局状态，用于跟踪是否有任何遮罩层（如复活遮罩、菜单等）处于激活状态
const isGlobalOverlayActive = ref(false);

if (typeof window !== 'undefined') {
    window.addEventListener('combat-overlay-active', (e: any) => {
        isGlobalOverlayActive.value = !!e.detail?.active;
    });
}

export function useCombatOverlay() {
    const overlay = ref(false);
    const lockTarget = ref<HTMLElement | null>(null);

    const notifyOverlayState = (isOverlayOpen: boolean) => {
        window.dispatchEvent(new CustomEvent('combat-overlay-active', { detail: { active: isOverlayOpen } }));
    };

    const requestPointerLock = () => {
        // 如果当前菜单打开，或者全局有其他遮罩（如复活遮罩），则不请求锁定
        if (overlay.value || isGlobalOverlayActive.value) return;
        
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
        
        // 如果全局遮罩（如复活遮罩）正在显示，Esc 键不应关闭/打开菜单（或者根据需求调整）
        // 这里我们优先让 Esc 切换本地菜单状态
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

    // 监听本地菜单状态
    watch(overlay, (isOverlayOpen) => {
        notifyOverlayState(isOverlayOpen);
        if (isOverlayOpen) {
            exitPointerLock();
        } else {
            requestPointerLock();
        }
    });

    // 监听全局遮罩状态变化
    watch(isGlobalOverlayActive, (isActive) => {
        if (isActive) {
            exitPointerLock();
        } else if (!overlay.value) {
            // 全局遮罩消失且本地菜单也没打开时，尝试恢复锁定
            requestPointerLock();
        }
    });

    onMounted(() => {
        // 初始化时检查一次全局状态
        if (isGlobalOverlayActive.value) {
            exitPointerLock();
        }
        window.addEventListener('keydown', handleGlobalEsc);
    });

    onUnmounted(() => {
        window.removeEventListener('keydown', handleGlobalEsc);
        exitPointerLock();
        // 卸载时不一定要将全局状态设为 false，因为可能还有其他组件在控制它
        // 但 notifyOverlayState(false) 是原有的逻辑，表示当前实例的菜单关闭了
        notifyOverlayState(false);
    });

    return {
        overlay,
        lockTarget,
        handleBattleViewMouseDown,
    };
}