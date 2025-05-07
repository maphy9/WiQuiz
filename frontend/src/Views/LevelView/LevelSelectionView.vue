<script setup lang="ts">
import LevelCardGreen from '@/Views/LevelView/LevelCardGreen.vue';
import LevelCard from '@/Views/LevelView/LevelCardGreen.vue';
import LevelCardYellow from './LevelCardYellow.vue';
import LevelCardRed from './LevelCardRed.vue';
import LevelPaths from './LevelRoute.vue';

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

      <div class="path container">
        <div class="first-route">
        <LevelPaths />
        </div>
        <div class="second_route">
          <LevelPaths />
        </div>
        <div class="third_route">
          <LevelPaths />
        </div>
        <div class="fourth_route">
          <LevelPaths />
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
  background-repeat: no-repeat;
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

  font-size: 42px;
  font-weight: 700;
  font-family: "Titillium Web", sans-serif;
}

.container-text {
  color: white;
  user-select: none;

  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 1px;

  font-size: 64px;
  font-weight: 700;
  font-family: "Titillium Web", sans-serif;
}

.columns-container {
  width: 50vw;
  height: 100vh;

  position: relative;
  display: flex;
}

.right-column {
  margin-top: 320px;
  gap: 80px;
  right: 5%;

  position: absolute;
  display: flex;
  flex-direction: column;
}

.left-column {
  margin-top: 170px;
  left: 5%;
  gap: 80px;

  position: absolute;
  display: flex;
  flex-direction: column;
}

.path.container {
  height: 950px;
  left: 25%;;

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

</style>
