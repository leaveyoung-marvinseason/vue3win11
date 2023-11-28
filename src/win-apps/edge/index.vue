<script setup lang="ts">
import { NInput } from "naive-ui";
import { computed, ref } from "vue";
import { HTTP_PREFIX } from "@/constants";

const iframeUrl = ref<string>("www.baidu.com");

// const searchUrl = computed(() => {
//   return iframeUrl.value.replace(/^(HTTP_PREFIX)(.*)/, (match, p1, p2) => {
//     return p1 === HTTP_PREFIX ? p1 + p2 : HTTP_PREFIX + p1 + p2;
//   });
// });
// console.log(searchUrl.value);

// const handleKeyBoard = (e: KeyboardEvent) => {
//   if (e.key === "Enter") {
//     iframeUrl.value = e.target?.value;
//   }
// };
</script>

<template>
  <div class="flex flex-col gap-2 w-full h-full">
    <div class="flex gap-4">
      <div class="flex gap-2">
        <div>L</div>
        <div>R</div>
        <div>refresh</div>
      </div>
      <div>
        <NInput v-model="iframeUrl" />
      </div>
    </div>
    <iframe src="https://bing.com" class="w-full h-full flex-1"></iframe>
  </div>
</template>

<style scoped></style>
