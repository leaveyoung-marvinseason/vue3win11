<script setup lang="ts">
import Layer from '@/components/layer/index.vue'
import Image from '@/components/image/index.vue'
import Panel from '@/components/panel/index.vue'
import unLoginBg from '@/statics/assets/wallpaper/win11Dark.jpg'
import loginBg from '@/statics/assets/wallpaper/win11Light.jpg'
import { useAuthStore } from '@/store'
import { storeToRefs } from 'pinia'

const { isLogin } = storeToRefs(useAuthStore())

</script>

<template>
  <div class="flex flex-col w-full h-screen">
    <!-- 背景层 -->
    <Layer :z-index="8">
      <template #default="">
        <Image :src="isLogin ? loginBg : unLoginBg" />
      </template>
    </Layer>
    <!-- 应用入口层 -->
    <Layer :z-index="9">
      <template #default="">
        <Panel />
      </template>
    </Layer>
  </div>
</template>
