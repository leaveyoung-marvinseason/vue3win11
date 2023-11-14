<!--
  Author: marvin-season
  Created: 2023-11
-->
<script setup lang="ts">
import { DialogProps } from "@/types/dialog.ts";
import { Ref, toRaw, unref } from "vue";
import { random0_9 } from "@/utils";

const { dialog } = defineProps<{
  dialog: DialogProps
}>();

const emit = defineEmits<{
  click: [DialogProps]
}>();

const handleClose = () => {

};

const handleClick = (dialog: DialogProps) => {
  emit("click", toRaw(dialog));
};

</script>

<template>
  <div class="absolute w-60 h-60 bg-sky-500 opacity-60" @click="handleClick(dialog)"
       :style="{zIndex: dialog.zIndex, left: dialog.left + 'px', top: dialog.top + 'px'}">
    {{ dialog.id }}
  </div>
</template>

<style scoped></style>
