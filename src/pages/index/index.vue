<script setup lang="ts">
import WinApp from "@/components/win-app/index.vue";
import { useAppStore } from "@/store/app";
import { AppProps } from "@/types/app";
import { APPS, FOCUS_DIALOG_Z_INDEX } from "@/constants";
import { inject } from "vue";
import { useDialogStore } from "@/store/dialog.ts";
import { random0_9 } from "@/utils";

const { setSelectedApp } = useAppStore();
const { addDialog } = useDialogStore();

const handleClickApp = (app: AppProps) => {
  addDialog({
    app,
    hide: false,
    id: app.id,
    zIndex: FOCUS_DIALOG_Z_INDEX,
    left: random0_9() * 50,
    top: random0_9() * 20
  });
};

const apps = inject(APPS);

</script>

<template>
  <div class="h-full flex flex-col gap-4 p-2 pt-4 pb-4">
    <WinApp v-for="(app, appIndex) in apps" :key="appIndex" :app="app" @click-app="handleClickApp(app)" />
  </div>
</template>

<style scoped></style>
