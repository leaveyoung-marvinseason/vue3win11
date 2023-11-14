<!--
  Author: marvin-season
  Created: 2023-11
-->
<script setup lang="ts">
import { DialogProps } from "@/types/dialog.ts";

const props = defineProps<{
  dialog: DialogProps
}>();

const handleClose = () => {

};

</script>

<template>
  <div class="absolute w-6 h-10" :style="{zIndex: props.dialog.zIndex}">
    {{ props.dialog.id }}
  </div>
</template>

<style scoped></style>
