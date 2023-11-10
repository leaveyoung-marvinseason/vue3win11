<script setup lang="ts">
import { login } from "@/utils/auth";
import { NButton } from "naive-ui";
</script>

<template>
  <NButton @click="login('1', '2')">login</NButton>
</template>

<style scoped></style>