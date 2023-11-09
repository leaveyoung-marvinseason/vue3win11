<template>
    <img :src="src" class="w-full h-full"/>
</template>

<script setup lang="ts">
const { src } = defineProps<{ src: string }>()
</script>˝