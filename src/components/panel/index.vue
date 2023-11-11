<script setup lang="ts">
import TaskBar from './task-bar.vue';
import Desktop from './desktop.vue';
</script>

<template>
  <div class="h-full flex flex-col">
    <Desktop class="flex-1">
      <RouterView />
    </Desktop>
    <TaskBar class="h-12 bg-slate-50 opacity-80">bar</TaskBar>
  </div>
</template>

<style scoped></style>
