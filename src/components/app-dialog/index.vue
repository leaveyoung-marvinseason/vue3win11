<!--
  Author: marvin-season
  Created: 2023-11
-->
<script setup lang="ts">
import { DialogProps } from "@/types/dialog.ts";
import { Ref, toRaw, unref } from "vue";

const { dialog } = defineProps<{
  dialog: DialogProps
}>();

const emit = defineEmits<{
  click: [DialogProps],
  close: [DialogProps]
}>();

const handleClose = (dialog: DialogProps) => {
  emit("close", toRaw(dialog));
};

const handleClick = (dialog: DialogProps) => {
  emit("click", toRaw(dialog));
};

</script>

<template>
  <div class="absolute w-60 h-60 bg-amber-300 opacity-60" @click="handleClick(dialog)"
       :style="{zIndex: dialog.zIndex ?? 10, left: dialog.left + 'px', top: dialog.top + 'px'}">
    <button @click="handleClose(dialog)">close</button>
    {{ dialog.id }}
  </div>
</template>

<style scoped></style>
