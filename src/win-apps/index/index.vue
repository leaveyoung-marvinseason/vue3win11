<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const props = defineProps<{
  name: string;
}>();

const dynamicComp = defineAsyncComponent({
  loader: async () => {
    const url = props.name
      ? /* @vite-ignore */
        "../" + props.name + "/index.vue"
      : "../exception/404.vue";
    try {
      /* @vite-ignore */
      const module = await import(url);
      return module.default;
    } catch (e) {
      throw new Error("组件未注册");
    }
  },
  loadingComponent: (props, ctx) => {},
  errorComponent: (props, ctx) => {
    return `${props.error}`;
  },
});
</script>

<template>
  <component :is="dynamicComp"></component>
</template>

<style scoped></style>
