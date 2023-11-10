<script setup lang="ts">
import { useAuthStore } from "@/store";
import { NButton } from "naive-ui";
const { login } = useAuthStore()
</script>

<template>
  <NButton @click="login">login</NButton>
</template>

<style scoped></style>