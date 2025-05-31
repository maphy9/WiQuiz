<script setup lang="ts">
import type Level from '@/types/Level'
import { computed, toRefs } from 'vue'
import { useSoundStore } from '@/composables/useSound'

const props = defineProps<{
  level: Level
}>()

const { playButtonSound, playLevelMusic } = useSoundStore()
const { level } = toRefs(props)

const bgColour = computed(() => {
  switch (level.value.state) {
    case 'passed': return '#80C997'
    case 'locked': return '#8B231D'
    case 'repeat': return '#FFD966'
    default: return '#ccc'
  }
})

const imageSrc = computed(() => {
  switch (level.value.state) {
    case 'passed': return new URL('@/images/arrow.png', import.meta.url).href
    case 'locked': return new URL('@/images/lock.png', import.meta.url).href
    case 'repeat': return new URL('@/images/circleArrow.png', import.meta.url).href
    default: return ''
  }
})
</script>

<template>
  <div
    class="card-container"
    @click="playButtonSound(); playLevelMusic();"
  >
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

    <span class="card-text">{{ level.title }}</span>
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
  transition: all 0.3s;
  cursor: pointer;

  backdrop-filter: blur(5px);
  background-color: rgba(178, 196, 217, 0.7);

  border: black 2px solid;
}

.card-container:hover {
  background-color: rgba(158, 180, 202, 0.8);
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

@media(max-width: 550px) {
  .card-container {
    width: 160px;
    height: 180px;
  }
}
</style>
