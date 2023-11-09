<script setup lang="ts">
import Layer from '@/components/layer/index.vue'
import Image from '@/components/image/index.vue'
import bgImage from '@/statics/assets/wallpaper/dark/img0.jpg'
</script>

<template>
  <div class="flex flex-col w-full h-screen">
    <!-- 背景层 -->
    <Layer :z-index="8">
      <template #default="">
        <Image :src="bgImage"/>
      </template>
    </Layer>
    <!-- app层 -->
    <Layer :z-index="9">
      <template #default="">
        <div class="opacity-90 text-amber-100">asas</div>
      </template>
    </Layer>
  </div>
</template>
