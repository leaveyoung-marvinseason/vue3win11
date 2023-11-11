<!--
  Author: marvin-season
  Created: 2023-11
-->
<script setup lang='ts'>
import { NImage } from 'naive-ui';
import { onBeforeMount, ref } from 'vue';
const props = withDefaults(defineProps<{
    name: string,
    size: number
}>(), {
    size: 40
})

const lazyImage = ref(null)

onBeforeMount(async () => {
    try {
        const dynamicImport = await import(`/src/statics/assets/images/icons/${props.name}.png`)
        lazyImage.value = dynamicImport.default
        console.log(lazyImage.value);
    } catch (error) {
        console.log(error);
    }

})

</script>
 
<template>
    <NImage :width="props.size" :height="props.size" :src="lazyImage"></NImage>
</template>
 
<style scoped></style>
