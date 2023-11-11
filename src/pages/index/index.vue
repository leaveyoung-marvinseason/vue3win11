<script setup lang="ts">
import App from '@/components/app/index.vue';

import { apps } from "@/config/app";
console.log(apps);

</script>

<template>
    <div>
        <App v-for="(app, appIndex) in apps" :key="appIndex" :app="app"/>
    </div>
</template>

<style scoped></style>
