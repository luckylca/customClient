<template>
    <div class="control-hints">
        <div class="hint">按 P 打开菜单，连接图传源</div>
        <div class="hint">按 ESC 打开比赛菜单</div>
        <div class="hint">按 Ctrl+E 进入 HUD 编辑模式</div>
        <div class="hint">拖动标题栏移动，拖动角标调整大小</div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="sass">
.control-hints
    display: flex
    flex-direction: column
    gap: 8px
    font-size: 12px
    color: var(--hud-text-secondary)
    padding: 4px

.hint
    padding: 8px 10px
    border-radius: 10px
    background: rgba(255, 255, 255, 0.08)
    border: 1px solid rgba(255, 255, 255, 0.08)
</style>
