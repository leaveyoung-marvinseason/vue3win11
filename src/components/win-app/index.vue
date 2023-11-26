<!--
  Author: marvin-season
  Created: 2023-11
-->
<script setup lang='ts'>
import { AppProps } from '@/types/app';
import Icon from '@/components/icon/index.vue'
const props = withDefaults(defineProps<{
  app: AppProps,
  size?: number
}>(), {
  size: 40
})


const emit = defineEmits<{
  clickApp: []
}>()


const handleClick = () => {
  emit('clickApp')
}
</script>
 
<template>
  <div class="flex w-20 flex-col items-center gap-2 inline-block ">
    <Icon class="cursor-pointer" @click="handleClick" :name="props.app.icon" :size="props.size"/>
    <span class="text-white text-xs break-all" v-if="props.app.label">{{ props.app.label }}</span>
  </div>
</template>
 
<style scoped></style>
