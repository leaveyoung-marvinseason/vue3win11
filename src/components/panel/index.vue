<script setup lang="ts">
import TaskBar from './task-bar.vue';
import Desktop from './desktop.vue';
</script>

<template>
  <div class="h-full flex flex-col">
    <Desktop>
      <RouterView />
    </Desktop>
    <TaskBar >bar</TaskBar>
  </div>
</template>

<style scoped></style>
