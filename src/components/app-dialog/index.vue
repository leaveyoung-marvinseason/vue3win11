<!--
  Author: marvin-season
  Created: 2023-11
-->
<script setup lang='ts'>
import { NButton, NCard, NModal } from 'naive-ui';
import { useAppStore } from '@/store/app';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
const appStore = useAppStore();
const { selectedApp } = storeToRefs(appStore);
const showDiglog = computed(() => !!selectedApp.value);
const handleClose = () => {
    appStore.setSelectedApp(null)
}

</script>
 
<template>
    <NModal v-model:show="showDiglog">
        <NCard>
            <NButton @click="handleClose">{{ selectedApp?.label }}</NButton>
        </NCard>
    </NModal>
</template>
 
<style scoped></style>
