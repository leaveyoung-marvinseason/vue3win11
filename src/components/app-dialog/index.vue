<!--
  Author: marvin-season
  Created: 2023-11
-->
<script setup lang="ts">
import { DialogProps } from "@/types/dialog.ts";
import DynamicWinApp from "@/win-apps/index/index.vue";
import { toRaw } from "vue";

const { dialog } = defineProps<{
  dialog: DialogProps;
}>();

const emit = defineEmits<{
  click: [DialogProps];
  close: [DialogProps];
  hide: [DialogProps];
}>();

const handleClose = (dialog: DialogProps) => {
  emit("close", toRaw(dialog));
};

const handleClick = (dialog: DialogProps) => {
  emit("click", toRaw(dialog));
};
const handleHide = (dialog: DialogProps) => {
  emit("hide", toRaw(dialog));
};
</script>

<template>
  <div
    class="absolute w-1/2 h-2/3 bg-sky-100 opacity-90 flex flex-col items-center gap-4"
    @click="handleClick(dialog)"
    :style="{
      zIndex: dialog.zIndex ?? 10,
      left: dialog.left + 'px',
      top: dialog.top + 'px',
    }"
  >
    <div>
      <button @click="handleClose(dialog)">close</button>
      <button @click="handleHide(dialog)">hide</button>
    </div>
    <DynamicWinApp v-if="dialog.app?.name" :name="dialog.app.name" />
  </div>
</template>

<style scoped></style>
