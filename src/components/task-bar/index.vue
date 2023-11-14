<script setup lang="ts">
import { BAR_APPS } from '@/constants';
import { inject } from 'vue';
import WinApp from '@/components/win-app/index.vue';
import { useAppStore } from '@/store/app';
import { AppProps } from '@/types/app';
const { setSelectedApp } = useAppStore()


const barApps = inject(BAR_APPS);
const handleClick = (barApp: AppProps) => {
    setSelectedApp(barApp)
}
</script>

<template>
    <div class="h-12 bg-slate-50 opacity-80 flex items-center justify-center p-2">
        <div class="flex gap-1">
            <WinApp v-for="(barApp, index) in barApps" :size="28" :key="index" :app="barApp" @click-app="handleClick(barApp)" />
        </div>
    </div>
</template>