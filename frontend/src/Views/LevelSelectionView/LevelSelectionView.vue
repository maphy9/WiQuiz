<script setup lang="ts">
import ReturnButton from '@/components/SharedComponents/ReturnButton.vue'
import { ref } from 'vue'
import LevelCard from './LevelCard.vue'
import LevelRoute from './LevelRoute.vue'

const progress = ref('30%')
</script>

<template>
  <div class="main">
    <div class="progress-bar-outer">
      <div
        :style="{'width': progress}"
        class="progress-bar-inner"
      >
        <span class="progress-bar-text">
          {{ progress }}
        </span>
      </div>
    </div>

    <div class="title-container">
      <h1 class="title-text">
        WYBÓR TEMATÓW
      </h1>
    </div>

    <div class="columns-container">
      <div class="left-column">
        <LevelCard
          card-text="Pochodne"
          state="passed"
        />

        <LevelCard
          card-text="Pochodne"
          state="repeat"
        />

        <LevelCard
          card-text="Pochodne"
          state="locked"
        />
      </div>

      <div class="path-container">
        <div class="first-route">
          <LevelRoute />
        </div>

        <div class="second_route">
          <LevelRoute />
        </div>

        <div class="third_route">
          <LevelRoute />
        </div>

        <div class="fourth_route">
          <LevelRoute />
        </div>
      </div>

      <div class="right-column">
        <LevelCard
          card-text="Pochodne"
          state="passed"
        />

        <LevelCard
          card-text="Pochodne"
          state="locked"
        />
      </div>
    </div>

    <ReturnButton />
  </div>
</template>

<style scoped>
.main {
  min-height: 100vh;
  justify-content: center;
  display: flex;

  background-image: url('@/images/levelBackground.jpg');
  background-size: cover;
  background-position: center;
}

.progress-bar-outer {
  width: calc(40% + 8px);
  height: 40px;

  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  border: 4px solid;
  border-color: rgb(255, 255, 255);

  background-color: gray;
  z-index: 1;
}

.progress-bar-inner {
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #80C997;
  z-index: 1;
}

.title-container {
  position: fixed;
  top: 50px;

  left: 50%;
  transform: translateX(-50%);

  width: calc(40% + 8px);
  height: 100px;

  display: flex;
  justify-content: center;
  align-items: center;

  backdrop-filter: blur(5px);
  background-color: rgba(64, 77, 97, 0.7);

  z-index: 1;
}

.progress-bar-text {
  position: absolute;
  font-size: 36px;
  font-weight: 700;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: white;
  user-select: none;

  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 1px;

  font-family: "Titillium Web", sans-serif;

  z-index: 1;
}

.title-text {
  color: white;
  user-select: none;

  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 1px;

  font-size: 3.5vw;
  font-weight: 700;
  font-family: "Titillium Web", sans-serif;

  z-index: 1;
}

.columns-container {
  width: 950px;

  position: relative;
  display: flex;

  z-index: 0;
}

.right-column {
  margin-top: 33%;
  gap: 80px;
  right: 3vw;

  position: absolute;
  display: flex;
  flex-direction: column;

  z-index: 1;
}

.left-column {
  margin-top: 18%;
  left: 5%;
  gap: 80px;

  z-index: 1;

  position: absolute;
  display: flex;
  flex-direction: column;
}

.path-container {
  height: 950px;
  left: 25%;
  width: 50%;

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
  width: 100%;
  position: absolute;
}

@media(max-width: 550px){
  .main {
    min-height: 150vh;

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

  .title-text {
    font-size: 32px;
  }

  .columns-container{
    padding-top: 100px;
    width: 100%;
  }

  .path-container {
    width: 20%;
    display: none;
  }

  .right-column {
    margin-top: 150px;
    right: 2%;
    gap:90px;

    z-index: 1;

  }
  .left-column {
    margin-top: 0px;
    left: 2%;
    gap: 90px;

    z-index: 1;
  }
}
</style>
