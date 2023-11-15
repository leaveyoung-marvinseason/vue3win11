<!--
  Author: marvin-season
  Created: 2023-11
-->
<script setup lang="ts">
import { NImage } from "naive-ui";
import { onBeforeMount, ref } from "vue";

const props = withDefaults(
  defineProps<{
    name: string;
    size?: number;
  }>(),
  {
    size: 40,
  },
);

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <svg :height="size" :width="size" @click="emit('click')">
    <use :xlink:href="`#${name}`" :height="size" :width="size"></use>
  </svg>
</template>

<style scoped></style>