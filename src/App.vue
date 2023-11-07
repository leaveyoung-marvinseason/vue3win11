<script setup lang="ts">
import { NNumberAnimation } from "naive-ui";
import { logger } from "@/utils";

logger("test");
</script>

<template>
  <n-number-animation ref="numberAnimationInstRef" :from="0" :to="12039" />
  <h1 class="text-3xl bg-sky-500 text-amber-100 font-bold underline">
    Hello world!
  </h1>
</template>
