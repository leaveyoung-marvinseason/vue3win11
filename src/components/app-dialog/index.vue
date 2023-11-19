<!--
  Author: marvin-season
  Created: 2023-11
-->
<script setup lang="ts">
import { DialogProps } from "@/types/dialog.ts";
import { computed, defineAsyncComponent, Ref, toRaw, unref } from "vue";

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

const dynamicComp = defineAsyncComponent({
  loader: async () => {
    const url = dialog.app?.name
      ? /* @vite-ignore */
        "../../win-apps/" + dialog.app?.name + "/index.vue"
      : "../../pages/exception/404.vue";
    try {
      const module = await import(url);
      return module.default;
    } catch (e) {
      throw new Error("组件未注册");
    }
  },
  loadingComponent: (props, ctx) => {},
  errorComponent: (props, ctx) => {
    console.log(props);
    return "error";
  },
});

console.log(dialog);
</script>

<template>
  <div
    class="absolute w-1/2 h-2/3 bg-amber-300 opacity-60 flex flex-col items-center gap-4"
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
    <component :is="dynamicComp"></component>
  </div>
</template>

<style scoped></style>
