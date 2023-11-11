<!--
  Author: marvin-season
  Created: 2023-11
-->
<script setup lang='ts'>
import { AppProps } from '@/types/app';
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
  <div @click="handleClick">
    {{ props.app.label }}
  </div>
</template>
 
<style scoped></style>
