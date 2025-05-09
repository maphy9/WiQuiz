<script setup lang="ts">
import LevelCardGreen from '@/Views/LevelView/LevelCardGreen.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import LevelCardRed from './LevelCardRed.vue'
import LevelCardYellow from './LevelCardYellow.vue'
import LevelRoute from './LevelRoute.vue'

const isMobile = ref(window.innerWidth <= 550)

function handleResize() {
  isMobile.value = window.innerWidth <= 550
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="main">
    <div class="progress-bar-outer">
      <div class="progress-bar-inner">
        <span class="progress-bar-text">
          70%
        </span>
      </div>
    </div>

    <div class="title-container">
      <h1 class="container-text">
        WYBÓR TEMATÓW
      </h1>
    </div>

    <div class="columns-container">
      <div class="left-column">
        <LevelCardGreen />

        <LevelCardYellow />

        <LevelCardRed />
      </div>

      <div class="path-container">
        <div class="first-route">
          <component
            :is="isMobile
              ? null
              : LevelRoute"
          />
        </div>

        <div class="second_route">
          <component
            :is="isMobile
              ? null
              : LevelRoute"
          />
        </div>

        <div class="third_route">
          <component
            :is="isMobile
              ? null
              : LevelRoute"
          />
        </div>

        <div class="fourth_route">
          <component
            :is="isMobile
              ? null
              : LevelRoute"
          />
        </div>
      </div>

      <div class="right-column">
        <LevelCardGreen />

        <LevelCardRed />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  width: 100%;
  min-height: 100vh;
  position: relative;

  justify-content: center;
  align-items: center;
  display: flex;

  background-image: url('@/images/levelBackground.jpg');
  background-size: cover;
  background-position: center;
}

.progress-bar-outer {
  width: 40%;
  height: 40px;

  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  border-style: solid;;
  border-width: 4px;
  border-color: rgb(255, 255, 255);

  background-color: gray;
}

.progress-bar-inner {
  width: 70%;  /*progress */
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #80C997;
}

.title-container {
  position: fixed;
  top: 50px;

  left: 50%;
  transform: translateX(-50%);

  width: 40%;
  height: 100px;

  display: flex;
  justify-content: center;
  align-items: center;

  backdrop-filter: blur(5px);
  background-color: rgba(64, 77, 97, 0.7);
}

.progress-bar-text {
  color: white;
  user-select: none;

  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 1px;

  font-size: 36px;
  font-weight: 700;
  font-family: "Titillium Web", sans-serif;
}

.container-text {
  color: white;
  user-select: none;

  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 1px;

  font-size: 3.5vw;
  font-weight: 700;
  font-family: "Titillium Web", sans-serif;
}

.columns-container {
  width: 950px;

  position: relative;
  display: flex;
}

.right-column {
  margin-top: 320px;
  gap: 80px;
  right: 3vw;

  position: absolute;
  display: flex;
  flex-direction: column;

  z-index: 1;
}

.left-column {
  margin-top: 170px;
  left: 5%;
  gap: 80px;

  z-index: 1;

  position: absolute;
  display: flex;
  flex-direction: column;
}

.path-container {
  height: 950px;
  left: 230px;;

  z-index: 0;

  position: relative;
}

.first-route {
  bottom: 65%;
  transform: rotate(15deg);
}

.second_route {
  bottom: 49%;
  transform: rotate(-15deg);
}

.third_route {
  bottom: 32%;
  transform: rotate(15deg);

}

.fourth_route {
  bottom: 15%;
  transform: rotate(-15deg);
}

.fourth_route, .third_route, .second_route, .first-route {
  position: absolute;
}

@media(max-width: 550px){
  .main {
    min-height: 100vh;

  }
  .progress-bar-outer {
    width: 80%;
    height: 30px;

    z-index: 2;
  }

  .title-container {
    width: 80%;
    height: 50px;
    top: 40px;

    z-index: 2;
  }

  .progress-bar-text{
    font-size: 32px;
  }

  .container-text {
    font-size: 32px;
  }

  .columns-container{
    padding-top: 100px;
    width: 100%;
  }

  .right-column {
    margin-top: 150px;
    right: 2%;
    gap:200px;

    z-index: 1;

  }
  .left-column {
    margin-top: 0px;
    left: 2%;
    gap: 150px;

    z-index: 1;
  }
}
</style>
