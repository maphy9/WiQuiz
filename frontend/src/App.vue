<template>
  <div class="view-wrapper">
    <router-view v-slot="{Component}">
      <transition :name="currentTransition">
        <component
          :is="Component"
          :key="$route.fullPath"
          class="router-view-component"
        />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const currentTransition = computed(() => {
  return route.name === 'main'
    ? 'swipe-down'
    : 'swipe-up'
})
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap");

* {
  padding: 0;
  margin: 0;
  border: 0;
  font-family: "Titillium Web", sans-serif;
  font-style: normal;
}

html,
body,
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.router-view-component {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.swipe-down-enter-active,
.swipe-down-leave-active,
.swipe-left-enter-active,
.swipe-left-leave-active,
.swipe-up-enter-active,
.swipe-up-leave-active,
.swipe-left-enter-active,
.swipe-left-leave-active,
.swipe-right-enter-active,
.swipe-right-leave-active {
  transition: transform 0.5s ease;
}

.swipe-down-enter-from,
.swipe-down-leave-from,
.swipe-down-enter-to,
.swipe-down-leave-to,
.swipe-up-enter-from,
.swipe-up-leave-from,
.swipe-up-enter-to,
.swipe-up-leave-to,
.swipe-left-enter-from,
.swipe-left-leave-from,
.swipe-left-enter-to,
.swipe-left-leave-to,
.swipe-right-enter-to,
.swipe-right-leave-to {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.swipe-down-enter-from {
  transform: translateY(-100%);
  z-index: 2;
}

.swipe-down-enter-to {
  transform: translateY(0);
  z-index: 2;
}

.swipe-down-leave-from {
  transform: translateY(0);
  z-index: 1;
}
.swipe-down-leave-to {
  transform: translateY(100%);
  z-index: 1;
}

.swipe-up-enter-from {
  transform: translateY(100%);
  z-index: 2;
}
.swipe-up-enter-to {
  transform: translateY(0);
  z-index: 2;
}

.swipe-up-leave-from {
  transform: translateY(0);
  z-index: 1;
}
.swipe-up-leave-to {
  transform: translateY(-100%);
  z-index: 1;
}

.swipe-left-enter-from {
  transform: translateX(-100%);
  z-index: 2;
}
.swipe-left-enter-to {
  transform: translateX(0);
  z-index: 2;
}

.swipe-left-leave-from {
  transform: translateX(0);
  z-index: 1;
}
.swipe-left-leave-to {
  transform: translateX(100%);
  z-index: 1;
}

.swipe-right-enter-from {
  transform: translateX(-100%);
  z-index: 2;
}
.swipe-right-enter-to {
  transform: translateX(0);
  z-index: 2;
}

.swipe-right-leave-from {
  transform: translateX(0);
  z-index: 1;
}
.swipe-right-leave-to {
  transform: translateX(100%);
  z-index: 1;
}
</style>
