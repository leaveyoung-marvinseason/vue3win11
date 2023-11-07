<script setup lang="ts">
import { NNumberAnimation } from "naive-ui";
import { logger } from "@/utils";
import { useCounterStore } from '@/store'
// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = useCounterStore()
logger('aa');
</script>

<template>
  <n-number-animation ref="numberAnimationInstRef" :from="0" :to="12039" />
  <h1 class="text-3xl bg-sky-500 text-amber-100 font-bold underline">
    Hello world!
  </h1>
  <div @click="store.increment">{{ store.count }}</div>
</template>
