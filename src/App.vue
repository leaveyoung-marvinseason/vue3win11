<script setup lang="ts">
console.log('1');

</script>

<template>
  <div class="flex flex-col">
    <div class="flex gap-2">
      <RouterLink class="text-blue-500 underline" to="/index">Index</RouterLink>
      <RouterLink class="text-blue-500 underline" to="/home">Home</RouterLink>
    </div>
    <RouterView />
  </div>
</template>
