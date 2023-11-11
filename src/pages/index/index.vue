<script setup lang="ts">
import App from '@/components/app/index.vue';
import { useAppStore } from '@/store/app';
import { AppProps } from '@/types/app';
import { APPS } from '@/constants';
import { inject } from 'vue';

const { setSelectedApp } = useAppStore();

const handleClickApp = (app: AppProps) => {
    setSelectedApp(app)
}

const apps = inject(APPS)

</script>

<template>
    <div>
        <App v-for="(app, appIndex) in apps" :key="appIndex" :app="app" @click-app="handleClickApp(app)" />
    </div>
</template>

<style scoped></style>
