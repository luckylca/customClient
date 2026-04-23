<template>
    <v-app>
        <v-main class="settings-main">
            <div class="settings-layout">
                <div class="left-pane">
                    <div class="settings-topbar">
                        <div class="topbar-title">按键绑定</div>
                        <div class="topbar-actions">
                            <v-btn
                                color="primary"
                                variant="tonal"
                                prepend-icon="mdi-arrow-left"
                                @click="goBack"
                            >
                                返回设置中心
                            </v-btn>
                        </div>
                    </div>

                    <v-card class="panel-card" elevation="10">
                        <div class="panel-title">当前绑定</div>
                        
                        <v-table class="binding-table">
                            <thead>
                                <tr>
                                    <th class="text-left">按键</th>
                                    <th class="text-left">按键码 (Code)</th>
                                    <th class="text-left">绑定功能</th>
                                    <th class="text-right">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in keyBindings" :key="item.key">
                                    <td><v-chip color="accent" variant="tonal" size="small">{{ item.keyName }}</v-chip></td>
                                    <td>{{ item.key }}</td>
                                    <td>{{ getScriptName(item.scriptId) }}</td>
                                    <td class="text-right">
                                        <v-btn
                                            color="error"
                                            variant="text"
                                            icon="mdi-delete"
                                            size="small"
                                            @click="requestDelete(item)"
                                        ></v-btn>
                                    </td>
                                </tr>
                                <tr v-if="keyBindings.length === 0">
                                    <td colspan="4" class="text-center text-hint py-6">暂无绑定的按键</td>
                                </tr>
                            </tbody>
                        </v-table>

                        <div class="add-action text-center mt-6">
                            <v-btn
                                color="primary"
                                variant="elevated"
                                prepend-icon="mdi-plus"
                                size="large"
                                rounded="pill"
                                elevation="4"
                                @click="showAddDialog = true"
                            >
                                添加绑定
                            </v-btn>
                        </div>
                    </v-card>
                </div>
            </div>
        </v-main>

        <!-- 删除确认对话框 -->
        <v-dialog v-model="showConfirmDialog" max-width="400">
            <v-card class="custom-card">
                <v-card-title>删除确认</v-card-title>
                <v-card-text>确定要删除该按键绑定吗？</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn variant="text" @click="showConfirmDialog = false">取消</v-btn>
                    <v-btn color="error" variant="tonal" @click="confirmDelete">确认删除</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- 添加绑定对话框 -->
        <v-dialog v-model="showAddDialog" max-width="600" persistent>
            <v-card class="custom-card">
                <v-card-title class="dialog-title">新增功能按键</v-card-title>
                <v-card-text>
                    <v-row class="mt-2">
                        <v-col cols="6" class="listener-col">
                            <div class="sub-title mb-2">1. 设置按键</div>
                            <div 
                                class="key-listener-box" 
                                :class="{ 'is-listening': isListening, 'has-key': !!newBinding.key }"
                                @click="startListening"
                            >
                                <template v-if="isListening">
                                    <v-icon color="primary" size="32" class="mb-2 spin-anim">mdi-keyboard-outline</v-icon>
                                    <div>请按下任意按键...</div>
                                </template>
                                <template v-else-if="newBinding.keyName">
                                    <div class="recorded-key">{{ newBinding.keyName }}</div>
                                    <div class="recorded-code">{{ newBinding.key }}</div>
                                    <div class="hint-text mt-2">(点击重新录制)</div>
                                </template>
                                <template v-else>
                                    <v-icon color="text-hint" size="32" class="mb-2">mdi-gesture-tap</v-icon>
                                    <div>点击开始录制</div>
                                </template>
                            </div>
                        </v-col>
                        <v-divider vertical class="mx-3 d-none d-sm-block"></v-divider>
                        <v-col cols="12" sm="5">
                            <div class="sub-title mb-2">2. 选择功能</div>
                            <v-select
                                v-model="newBinding.scriptId"
                                :items="availableScripts"
                                item-title="name"
                                item-value="id"
                                label="选择执行脚本"
                                variant="outlined"
                                hide-details
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions class="px-6 pb-6">
                    <v-spacer></v-spacer>
                    <v-btn variant="text" @click="cancelAdd">取消</v-btn>
                    <v-btn color="primary" variant="tonal" :disabled="!isAddValid" @click="saveBinding">保存绑定</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
        <!-- 监听模式全局提示 -->
        <v-snackbar v-model="isListening" color="primary" location="top" timeout="-1">
            正在录制按键，请按下您想要的快捷键...
            <template v-slot:actions>
                <v-btn variant="text" @click="stopListening">退出</v-btn>
            </template>
        </v-snackbar>
    </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSettingStore } from '@/stores/setting';
import type { KeyBinding } from '@/stores/setting';

const router = useRouter();
const route = useRoute();
const settingStore = useSettingStore();

const availableScripts = [
    { id: 'aim_assist', name: '辅助自瞄' },
    { id: 'auto_buy_43mm_5', name: '42mm 5发' },
    { id: 'Hero_Deploy_Mode_Change', name: '英雄部署模式切换' }
];

const keyBindings = computed(() => settingStore.keyBindings);

const showConfirmDialog = ref(false);
const itemToDelete = ref<KeyBinding | null>(null);

const showAddDialog = ref(false);
const isListening = ref(false);

const newBinding = ref<{ key: string, keyName: string, scriptId: string }>({
    key: '',
    keyName: '',
    scriptId: ''
});

const isAddValid = computed(() => {
    return newBinding.value.key !== '' && newBinding.value.scriptId !== '';
});

const getScriptName = (id: string) => {
    const s = availableScripts.find(x => x.id === id);
    return s ? s.name : '未知';
};

const goBack = () => {
    router.push({ name: 'setting', query: route.query });
};

const requestDelete = (item: KeyBinding) => {
    itemToDelete.value = item;
    showConfirmDialog.value = true;
};

const confirmDelete = () => {
    if (itemToDelete.value) {
        settingStore.keyBindings = settingStore.keyBindings.filter(
            b => b.key !== itemToDelete.value!.key
        );
    }
    showConfirmDialog.value = false;
    itemToDelete.value = null;
};

const handleKeyDown = (e: KeyboardEvent) => {
    if (isListening.value) {
        e.preventDefault();
        e.stopPropagation();
        
        // Ignore modifiers if they are pressed alone
        if (['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) {
            return;
        }

        let name = e.key.toUpperCase();
        if (e.code.startsWith('Key')) name = e.code.replace('Key', '');
        if (e.code.startsWith('Digit')) name = e.code.replace('Digit', '');

        newBinding.value.key = e.code;
        newBinding.value.keyName = name;
        stopListening();
    }
};

const startListening = () => {
    newBinding.value.key = '';
    newBinding.value.keyName = '';
    isListening.value = true;
    window.addEventListener('keydown', handleKeyDown, { capture: true });
};

const stopListening = () => {
    isListening.value = false;
    window.removeEventListener('keydown', handleKeyDown, { capture: true });
};

const cancelAdd = () => {
    stopListening();
    showAddDialog.value = false;
    newBinding.value = { key: '', keyName: '', scriptId: '' };
};

const saveBinding = () => {
    // Check if key is already bound
    const index = settingStore.keyBindings.findIndex(b => b.key === newBinding.value.key);
    if (index !== -1) {
        settingStore.keyBindings[index] = { ...newBinding.value };
    } else {
        settingStore.keyBindings.push({ ...newBinding.value });
    }
    
    showAddDialog.value = false;
    newBinding.value = { key: '', keyName: '', scriptId: '' };
};

onUnmounted(() => {
    stopListening();
});
</script>

<style scoped lang="sass">
$bg-base: #F8F7FC
$bg-surface: #FFFFFF
$bg-surface-variant: #F3EDF7
$text-primary: #1C1B1F
$text-secondary: #49454F
$text-hint: #79747E
$accent: #6750A4
$border-light: #E7E0EC
$shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06)

.settings-main
    padding: 0 !important
    background: linear-gradient(135deg, $bg-base 0%, #F0EBF5 100%)
    color: $text-primary
    font-family: 'Roboto', 'Noto Sans SC', sans-serif
    min-height: 100vh
    height: 100vh
    overflow-y: auto

.settings-layout
    padding: 40px 48px
    max-width: 1000px
    margin: 0 auto

.settings-topbar
    display: flex
    align-items: center
    justify-content: space-between
    margin-bottom: 24px

.topbar-title
    font-size: 28px
    font-weight: 500
    color: $text-primary
    background: linear-gradient(90deg, $accent, #9A82DB)
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent

.panel-card
    padding: 36px 40px
    background: $bg-surface
    border-radius: 28px
    border: 1px solid $border-light
    box-shadow: $shadow-sm

.panel-title
    font-size: 20px
    font-weight: 500
    margin-bottom: 24px
    display: flex
    align-items: center
    gap: 10px

    &::before
        content: ''
        width: 4px
        height: 24px
        background: linear-gradient(180deg, $accent, #9A82DB)
        border-radius: 2px

.binding-table
    background: transparent !important
    border-radius: 12px
    border: 1px solid $border-light
    
    th
        font-weight: 600
        color: $text-secondary
        background: $bg-surface-variant
        padding: 12px 16px !important
    td
        padding: 12px 16px !important
        border-bottom: 1px solid $border-light

.custom-card
    background: $bg-surface !important
    border-radius: 24px !important

.dialog-title
    padding: 24px 28px 16px !important

.sub-title
    font-size: 15px
    font-weight: 500
    color: $text-secondary

.key-listener-box
    height: 140px
    border: 2px dashed $border-light
    border-radius: 16px
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    cursor: pointer
    transition: all 0.3s ease
    color: $text-hint
    background: $bg-surface-variant

    &:hover
        border-color: $accent
        background: rgba(103, 80, 164, 0.04)

    &.is-listening
        border-color: $accent
        border-style: solid
        background: rgba(103, 80, 164, 0.08)
        color: $accent

    &.has-key
        border-color: $accent
        border-style: solid
        color: $text-primary

.recorded-key
    font-size: 32px
    font-weight: bold
    color: $accent

.recorded-code
    font-size: 13px
    color: $text-secondary

.hint-text
    font-size: 12px
    color: $text-hint

.spin-anim
    animation: pulse 1.5s infinite ease-in-out

@keyframes pulse
    0%
        transform: scale(0.95)
        opacity: 0.8
    50%
        transform: scale(1.05)
        opacity: 1
    100%
        transform: scale(0.95)
        opacity: 0.8
</style>
