<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const props = defineProps<{
  name: string;
}>();

const dynamicComp = defineAsyncComponent({
  // @ts-ignore
  loader: async () => {
    try {
      const modules = import.meta.glob("../**/*.vue");
      return await modules[`../${props.name}/index.vue`].call(null);
    } catch (e) {
      console.error(e, props.name);
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