<script setup lang="ts">
import gsap from "gsap";

const handleBeforeEnter = (el: HTMLElement) => {
  el.style.opacity = '0'
  el.style.transform = 'translateY(100px)'
}

const handleEnter = (el: HTMLElement) => {
  gsap.to(el, {
    duration: 0.8,
    y: 0,
    opacity: 1,
  })
}
</script>

<template>
  <!-- @vue-ignore -->
  <transition @before-enter="handleBeforeEnter" @enter="handleEnter" @before-leave="handleBeforeLeave"
    @leave="handleLeave">
    <RouterView />
  </transition>
</template>

<style scoped></style>
