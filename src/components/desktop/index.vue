<script setup lang="ts">
import gsap from "gsap";

const handleBeforeEnter = (el: Element) => {
    // @ts-ignore
    el.style.opacity = '0'
}

const handleEnter = (el: Element) => {
    gsap.to(el, {
        duration: 0.5,
        y: 0,
        opacity: 1,
    })
}
</script>

<template>
    <div class="flex-1">
      <RouterView v-slot="{ Component }" @before-enter="handleBeforeEnter" @enter="handleEnter">
        <transition>
          <component :is="Component"></component>
        </transition>
      </RouterView>
    </div>
</template>