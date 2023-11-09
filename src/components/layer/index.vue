<template>
    <div class="absolute top-0 left-0 bottom-0 right-0" :style="{ 'z-index': zIndex }">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
const { zIndex } = defineProps<{
    zIndex: number
}>()
</script>