<script setup lang="ts">
import LevelCardGreen from '@/Views/LevelView/LevelCardGreen.vue';
import LevelCard from '@/Views/LevelView/LevelCardGreen.vue';
import LevelCardYellow from './LevelCardYellow.vue';
import LevelCardRed from './LevelCardRed.vue';

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

    <div class="levels-group">
    <div class="left-column">
      <LevelCardGreen />
      <div class="path-vertical"></div>
      <LevelCardGreen />
      <div class="path-vertical"></div>
      <LevelCardRed />
    </div>
    <div class="right-column">
      <LevelCardGreen />
      <div class="path-vertical"></div>
      <LevelCardYellow />
      <div class="path-vertical"></div>
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

.levels-group {
  margin-top: 150px;
  gap: 30vw;

  display: flex;
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: 0; /* gap controlled by path-vertical */
}

.path-vertical {
  width: 30px;
  height: 80px; /* space between cards */

  justify-items: center;
  align-items: center;
  margin-left: 70px;
  border-style: solid;;
  border-width: 4px;
  border-radius: 10px;
  border-color: black;

  background-color: #ffffff;

}


</style>
