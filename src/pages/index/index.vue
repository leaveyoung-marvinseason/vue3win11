<script setup lang="ts">
import WinApp from "@/components/win-app/index.vue";
import { useAppStore } from "@/store/app";
import { AppProps } from "@/types/app";
import { APPS } from "@/constants";
import { inject } from "vue";
import { useDialogStore } from "@/store/dialog.ts";
import { random0_9 } from "@/utils";

const { openDialog } = useDialogStore();

const handleClickApp = (app: AppProps) => {
  openDialog({
    id: app.id,
    left: random0_9() * 50,
    top: random0_9() * 20,
    zIndex: -1,
    hide: false,
    app,
  });
};

const apps = inject(APPS);
</script>

<template>
  <div class="h-full flex flex-col gap-4 p-2 pt-4 pb-4">
    <WinApp
      v-for="(app, appIndex) in apps"
      :key="appIndex"
      :app="app"
      @click-app="handleClickApp(app)"
    />
  </div>
</template>

<style scoped></style>
