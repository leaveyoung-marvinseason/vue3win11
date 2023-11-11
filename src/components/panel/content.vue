<script setup lang="ts">
import gsap from "gsap";

const handleBeforeEnter = (el: Element) => {
    // @ts-ignore
    el.style.opacity = '0'
    // @ts-ignore
    el.style.transform = 'translateY(100px)'
}

const handleEnter = (el: Element) => {
    gsap.to(el, {
        duration: 0.8,
        y: 0,
        opacity: 1,
    })
}
</script>

<template>
    <transition @before-enter="handleBeforeEnter" @enter="handleEnter">
        <slot></slot>
    </transition>
</template>