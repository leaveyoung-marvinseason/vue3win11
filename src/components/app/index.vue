<!--
  Author: marvin-season
  Created: 2023-11
-->
<script setup lang='ts'>
import { AppProps } from '@/types/app';
import Icon from '@/components/icon/index.vue'
const props = defineProps<{
  app: AppProps,
}>();


const emit = defineEmits<{
  clickApp: []
}>()


const handleClick = () => {
  emit('clickApp')
}
</script>
 
<template>
  <div @click="handleClick" class="flex flex-col items-center gap-2 w-20 p-2 cursor-pointer">
    <Icon :name="props.app.icon" />
    <span class="text-white text-xs break-all">{{ props.app.label }}</span>
  </div>
</template>
 
<style scoped></style>
