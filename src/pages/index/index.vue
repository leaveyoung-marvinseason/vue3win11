<script setup lang="ts">
import WinApp from "@/components/win-app/index.vue";
import { useAppStore } from "@/store/app";
import { AppProps } from "@/types/app";
import { APP_HEIGHT, APP_WIDTH, APPS } from "@/constants";
import { inject, onBeforeMount, onMounted, ref } from "vue";
import { useDialogStore } from "@/store/dialog.ts";
import { random0_9 } from "@/utils";
import { GridLayout, GridItem } from "vue3-grid-layout-next";

const { openDialog } = useDialogStore();

const apps = inject<AppProps[]>(APPS);

const layouts = ref<any>([]);

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

onBeforeMount(() => {
  let x = 0,
    y = 0,
    i = 0;
  apps?.forEach((app) => {
    const layout = {
      x: x,
      y: ++y,
      i: ++i,
      w: APP_WIDTH,
      h: APP_HEIGHT,
      app,
      static: false,
    };
    layouts.value.push(layout);
  });
});
</script>

<template>
  <div class="h-full flex flex-col gap-4 p-2 pt-4 pb-4">
    <grid-layout
      :col-num="48"
      :preventCollision="true"
      :is-resizable="false"
      :vertical-compact="false"
      v-model:layout="layouts"
      :row-height="30"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="(item, index) in layouts"
        :key="index"
        :static="item.static"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
      >
        <WinApp :app="item.app" @click-app="handleClickApp(item.app)" />
      </grid-item>
    </grid-layout>
  </div>
</template>

<style scoped></style>
