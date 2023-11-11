<!--
  Author: marvin-season
  Created: 2023-11
-->
<script setup lang='ts'>
import { AppProps } from '@/types/app';
import { NButton, NModal } from 'naive-ui';
import { ref } from 'vue';
const props = defineProps<{
  app: AppProps
}>();
const showModal = ref(false)

const handleClick = ($event: Event) => {
  showModal.value = true
  props.app.onClick($event)
}

</script>
 
<template>
  <div @click="handleClick">
    {{ props.app.label }}
  </div>
  <NModal v-model:show="showModal">
    <NButton @click="showModal = false">
    关闭
    </NButton>
  </NModal>
</template>
 
<style scoped></style>
