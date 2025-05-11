<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  cardText: string
  state: 'passed' | 'locked' | 'repeat'
}>()

const bgColour = computed(() => {
  switch (props.state) {
    case 'passed': return '#80C997'
    case 'locked': return '#8B231D'
    case 'repeat': return '#FFD966'
    default: return '#ccc'
  }
})

const imageSrc = computed(() => {
  switch (props.state) {
    case 'passed': return new URL('@/images/arrow.png', import.meta.url).href
    case 'locked': return new URL('@/images/lock.png', import.meta.url).href
    case 'repeat': return new URL('@/images/circleArrow.png', import.meta.url).href
    default: return ''
  }
})
</script>

<template>
  <div class="card-container">
    <div
      class="card-circle"
      :style="{'backgroundColor': bgColour}"
    >
      <img
        :src="imageSrc"
        alt="arrow"
        class="card-img"
      >
    </div>

    <span class="card-text">{{ cardText }}</span>
  </div>
</template>

<style scoped>
.card-container {
  width: 180px;
  height: 200px;

  position: relative;
  align-items: center;
  justify-content: center;
  display: flex;

  backdrop-filter: blur(5px);
  background-color: rgba(178, 196, 217, 0.7);
  transition: all 0.3s;
  cursor: pointer;

  border: black 2px solid;
}

.card-container:active {
  transform: scale(1.05);
  background-color: rgba(141, 155, 170, 0.8);
}

.card-circle {
  width: 115px;
  height: 115px;

  position: absolute;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);

  background-size: cover;
  border-radius: 50%;

  bottom: 10%;
}

.card-img {
  width: 100%;
  height: 100%;
  margin-bottom: 5px;
}

.card-text {
  color: white;
  user-select: none;

  position: absolute;
  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 1px;

  font-size: 36px;
  font-weight: 700;
  font-family: "Titillium Web", sans-serif;

  bottom: 65%;
}

@media(max-width: 375px) {
  .card-container {
    width: 160px;
    height: 180px;
  }
}
</style>
