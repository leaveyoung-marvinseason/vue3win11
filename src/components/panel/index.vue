<script setup lang="ts">
</script>

<template>
  <div class="h-full flex flex-col">
    <Content class="flex-1">
      <RouterView />
    </Content>
    <Bar class="h-12 bg-slate-50 opacity-80">bar</Bar>
  </div>
</template>

<style scoped></style>
