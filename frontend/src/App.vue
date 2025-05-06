<template>
  <div class="view-wrapper">
    <router-view v-slot="{ Component }">
      <transition name="swipe-down">
        <component :is="Component" :key="$route.fullPath" class="view" />
      </transition>
    </router-view>
  </div>
</template>

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

.view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.swipe-down-enter-active,
.swipe-down-leave-active {
  transition: transform 0.5s ease;
}
.swipe-down-enter-from,
.swipe-down-leave-from,
.swipe-down-enter-to,
.swipe-down-leave-to {
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
</style>
