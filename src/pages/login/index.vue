<script setup lang="ts">
import { useAuthStore } from "@/store";
import { NGradientText, NImage } from "naive-ui";
import { useRouter } from "vue-router";
const router = useRouter()

const { login } = useAuthStore()
const handleLogin = async () => {
  await login();
  router.replace({
    path: '/index'
  })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full" @click="handleLogin">
    <NImage class="rounded-full" width="200"
      src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"></NImage>
    <NGradientText :size="24" gradient="linear-gradient(90deg, green 0%, yellow 50%, blue 100%)">
      Welcome To Windows
    </NGradientText>
  </div>
</template>

<style scoped></style>