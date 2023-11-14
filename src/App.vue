<script setup lang="ts">
import Layer from "@/components/layer/index.vue";
import TaskBar from "@/components/task-bar/index.vue";
import Desktop from "@/components/desktop/index.vue";
import AppDialog from "@/components/app-dialog/index.vue";
import unLoginBg from "@/statics/assets/images/wallpaper/ThemeA/img0.jpg";
import loginBg from "@/statics/assets/images/wallpaper/win11Light.jpg";
import { NImage } from "naive-ui";
import { useAuthStore } from "@/store";
import { storeToRefs } from "pinia";
import { useDialogStore } from "@/store/dialog.ts";

const { dialogs } = storeToRefs(useDialogStore());
const { focusDialog, deleteDialog } = useDialogStore()

const { isLogin } = storeToRefs(useAuthStore());
</script>

<template>
  <div class="flex flex-col w-full h-screen">
    <!-- 背景层 -->
    <Layer :z-index="8">
      <template v-slot>
        <NImage :src="isLogin ? loginBg : unLoginBg" />
      </template>
    </Layer>
    <!-- 应用入口层 -->
    <Layer :z-index="9">

      <template v-slot>
        <div class="h-full flex flex-col">
          <Desktop></Desktop>
          <TaskBar v-if="isLogin"></TaskBar>
        </div>
      </template>
    </Layer>

    <!-- app弹窗 -->
    <AppDialog @close="deleteDialog" @click="focusDialog" :dialog="dialog" v-for="dialog in dialogs" :key="dialog.id" />
  </div>
</template>
