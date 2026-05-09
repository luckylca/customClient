<template>
    <transition name="bullet-purchase-fade">
        <div
            v-if="visible"
            class="bullet-purchase-mask"
            @click.self="emit('close')"
        >
            <v-card class="bullet-purchase-panel" rounded="xl" elevation="18">
                <div class="panel-header">
                    <div>
                        <div class="panel-title">购买子弹</div>
                        <div class="panel-subtitle">双击数量项发送补弹指令</div>
                    </div>
                    <v-btn icon="mdi-close" variant="text" @click="emit('close')" />
                </div>

                <div class="panel-meta">
                    <v-chip class="meta-chip" color="primary" variant="tonal">{{ roleLabel }}</v-chip>
                    <v-chip class="meta-chip" color="secondary" variant="tonal">当前子弹 {{ currentAmmo }}</v-chip>
                </div>

                <div v-if="purchaseRole" class="option-grid">
                    <v-card
                        v-for="option in options"
                        :key="option"
                        class="option-card"
                        :class="{ selected: selectedQuantity === option }"
                        rounded="xl"
                        variant="tonal"
                        @click="selectedQuantity = option"
                        @dblclick="handlePurchase(option)"
                    >
                        <div class="option-amount">{{ option }}</div>
                        <div class="option-unit">发</div>
                    </v-card>
                </div>

                <div v-else class="unsupported-state">
                    <v-icon icon="mdi-alert-circle-outline" size="36" />
                    <div class="unsupported-title">当前机型不支持补弹面板</div>
                    <div class="unsupported-subtitle">仅英雄和步兵机型支持该购买遮罩</div>
                </div>

                <div class="panel-footer">
                    <div class="footer-hint">单击高亮，双击立即购买</div>
                    <v-btn variant="text" @click="emit('close')">关闭</v-btn>
                </div>
            </v-card>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRobotStore } from '@/stores/robotData';
import { useSettingStore } from '@/stores/setting';
import { getAmmoPurchaseOptions } from '@/services/AutoTaskServices';

const props = defineProps<{
    visible: boolean;
}>();

void props;

const emit = defineEmits<{
    (e: 'close'): void;
}>();

const robotStore = useRobotStore();
const settingStore = useSettingStore();
const selectedQuantity = ref<number | null>(null);

const purchaseRole = computed(() => robotStore.getAmmoPurchaseRole());

const currentAmmo = computed(() => {
    const dynamic = robotStore.robot.RobotDynamicStatusData as Record<string, unknown> | undefined;
    const ammoRaw = dynamic?.remainingAmmo ?? dynamic?.remaining_ammo;
    return typeof ammoRaw === 'number' ? ammoRaw : 0;
});

const roleLabel = computed(() => {
    if (purchaseRole.value === 'hero') return '英雄补弹';
    if (purchaseRole.value === 'infantry') return '步兵补弹';
    return '暂不可用';
});

const options = computed(() => {
    if (!purchaseRole.value) return [];
    return [...getAmmoPurchaseOptions(purchaseRole.value)];
});

const handlePurchase = (quantity: number) => {
    const result = settingStore.purchaseAmmo(quantity);
    if (result.ok) {
        emit('close');
    }
};
</script>

<style scoped lang="sass">
.bullet-purchase-mask
    position: fixed
    inset: 0
    z-index: 2147482500
    display: flex
    align-items: center
    justify-content: center
    padding: 32px
    background: linear-gradient(180deg, rgba(7, 10, 18, 0.76), rgba(7, 10, 18, 0.86))
    backdrop-filter: blur(16px)

.bullet-purchase-panel
    width: min(760px, calc(100vw - 64px))
    max-width: 100%
    padding: 24px
    color: rgb(var(--v-theme-on-surface))
    background: rgba(18, 22, 32, 0.92)
    border: 1px solid rgba(255, 255, 255, 0.08)

.panel-header
    display: flex
    align-items: flex-start
    justify-content: space-between
    gap: 16px

.panel-title
    font-size: 28px
    font-weight: 700
    line-height: 1.1

.panel-subtitle
    margin-top: 6px
    font-size: 14px
    color: rgba(255, 255, 255, 0.66)

.panel-meta
    display: flex
    flex-wrap: wrap
    gap: 12px
    margin-top: 20px

.meta-chip
    font-weight: 600

.option-grid
    display: grid
    grid-template-columns: repeat(5, minmax(0, 1fr))
    gap: 16px
    margin-top: 24px

.option-card
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    min-height: 132px
    cursor: pointer
    user-select: none
    background: rgba(255, 255, 255, 0.06)
    border: 1px solid rgba(255, 255, 255, 0.08)
    transition: transform 140ms ease, border-color 140ms ease, background 140ms ease, box-shadow 140ms ease

    &:hover
        transform: translateY(-2px)
        border-color: rgba(144, 202, 249, 0.4)
        background: rgba(144, 202, 249, 0.08)

    &.selected
        border-color: rgba(144, 202, 249, 0.7)
        background: rgba(144, 202, 249, 0.14)
        box-shadow: 0 10px 28px rgba(30, 136, 229, 0.18)

.option-amount
    font-size: 42px
    font-weight: 700
    line-height: 1

.option-unit
    margin-top: 10px
    font-size: 14px
    color: rgba(255, 255, 255, 0.7)

.unsupported-state
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    gap: 10px
    min-height: 220px
    margin-top: 24px
    text-align: center
    color: rgba(255, 255, 255, 0.72)

.unsupported-title
    font-size: 20px
    font-weight: 600

.unsupported-subtitle
    font-size: 14px
    color: rgba(255, 255, 255, 0.58)

.panel-footer
    display: flex
    align-items: center
    justify-content: space-between
    gap: 16px
    margin-top: 24px

.footer-hint
    font-size: 13px
    color: rgba(255, 255, 255, 0.58)

.bullet-purchase-fade-enter-active,
.bullet-purchase-fade-leave-active
    transition: opacity 160ms ease

.bullet-purchase-fade-enter-from,
.bullet-purchase-fade-leave-to
    opacity: 0

@media (max-width: 820px)
    .option-grid
        grid-template-columns: repeat(3, minmax(0, 1fr))

@media (max-width: 560px)
    .bullet-purchase-mask
        padding: 16px

    .bullet-purchase-panel
        width: 100%
        padding: 18px

    .option-grid
        grid-template-columns: repeat(2, minmax(0, 1fr))

    .option-card
        min-height: 108px

    .option-amount
        font-size: 34px

    .panel-footer
        flex-direction: column
        align-items: flex-start
</style>
