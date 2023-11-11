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
        <transition @before-enter="handleBeforeEnter" @enter="handleEnter">
            <slot></slot>
        </transition>
    </div>
</template>