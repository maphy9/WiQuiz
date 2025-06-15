<script setup lang="ts">
import type Level from '@/types/Level'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import ReturnButton from '@/components/SharedComponents/ReturnButton.vue'
import { useGame } from '@/stores/gameStore'
import { useSoundStore } from '@/stores/useSoundStore'
import { getCourseName, getMaxOrderNumber } from '@/utils/fetchUtils'
import LevelCard from './LevelCard.vue'
import LevelRoute from './LevelRoute.vue'

const progress = ref(0)
const isTransitioning = ref(false)
const courseTitle = ref('')

const router = useRouter()
const gameStore = useGame()
const { initLevels } = gameStore
const { canGoToLevel, levels, team } = storeToRefs(gameStore)
const { onMountMainTheme, stopMainTheme } = useSoundStore()

const maxOrderNumbers = ref<(number)[]>([Infinity, Infinity, Infinity])
const processedLevels = ref<any>([])

watch([levels, maxOrderNumbers], () => {
  let maxOrderNumber = Infinity
  for (const _maxOrderNumber of maxOrderNumbers.value) {
    if (_maxOrderNumber === -1) {
      continue
    }
    if (_maxOrderNumber < maxOrderNumber) {
      maxOrderNumber = _maxOrderNumber
    }
  }
  if (maxOrderNumber === Infinity) {
    maxOrderNumber = processedLevels.value.length + 1
  }

  processedLevels.value = levels.value.map((level: Level) => ({
    ...level,
    state:
      level.OrderNumber < maxOrderNumber
        ? 'passed'
        : (level.OrderNumber === maxOrderNumber
            ? 'repeat'
            : 'locked'),
  }))

  progress.value = (maxOrderNumber - 1) / processedLevels.value.length * 100
}, { deep: true, immediate: true })

const leftCards = computed(() => processedLevels.value.filter((_: any, i: any) => i % 2 === 0))
const rightCards = computed(() => processedLevels.value.filter((_: any, i: any) => i % 2 !== 0))

const levelRoutes = computed(() => {
  const routes = []

  for (let i = 0; i < processedLevels.value.length - 1; i++) {
    const offset = 65 - i * 15
    const rotation = (i % 2 === 0)
      ? 15
      : -15
    routes.push({
      style: {
        bottom: `${offset}%`,
        transform: `rotate(${rotation}deg)`,
      },
    })
  }

  return routes
})

function handleClick(levelIndex: number) {
  const level = processedLevels.value[levelIndex]
  if (level.state === 'locked')
    return

  stopMainTheme()

  isTransitioning.value = true

  setTimeout(() => {
    canGoToLevel.value = true
    router.push({ name: 'level', params: { levelIndex } })
  }, 800)
}

onBeforeRouteLeave((to) => {
  if (to.name === 'main') {
    return true
  }

  if (canGoToLevel.value && to.name === 'level') {
    canGoToLevel.value = false

    return true
  }

  return { name: 'main' }
})

async function fetchMaxOrderNumbers() {
  const newMaxOrderNumbers = maxOrderNumbers.value
  for (let i = 0; i < team.value.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    newMaxOrderNumbers[i] = await getMaxOrderNumber(team.value[i].user.id, 1)
  }
  maxOrderNumbers.value = newMaxOrderNumbers
}

watch(team, () => {
  fetchMaxOrderNumbers()
}, { immediate: true, deep: true })

onMounted(async () => {
  onMountMainTheme()
  canGoToLevel.value = false
  initLevels()
  courseTitle.value = await getCourseName()
})
</script>

<template>
  <div class="main">
    <div class="progress-bar-outer">
      <div
        :style="{'width': `${progress}%`}"
        class="progress-bar-inner"
      >
        <span class="progress-bar-text">
          {{ progress }}%
        </span>
      </div>
    </div>

    <div class="title-container">
      <h1 class="title-text">
        {{ courseTitle }}
      </h1>
    </div>

    <div class="columns-container">
      <div class="left-column">
        <LevelCard
          v-for="(level, index) in leftCards"
          :key="index"
          :level="level"
          @level-clicked="handleClick"
        />
      </div>

      <div class="path-container">
        <div
          v-for="(route, index) in levelRoutes"
          :key="index"
          class="route"
          :style="route.style"
        >
          <LevelRoute />
        </div>
      </div>

      <div class="right-column">
        <LevelCard
          v-for="(level, index) in rightCards"
          :key="index"
          :level="level"
          @level-clicked="handleClick"
        />
      </div>
    </div>

    <ReturnButton />

    <div
      v-if="isTransitioning"
      class="transition-overlay"
    >
      <div class="loading-spinner" />

      <div class="transition-text">
        Loading Level...
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  height: 100vh;
  overflow-y: scroll;

  background-image: url('@/images/levelBackground.jpg');
  background-repeat: repeat-y;
  background-position: center top;
  background-size: 100%;
}

.progress-bar-outer {
  width: calc(40% - 8px);
  height: 40px;

  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  border: 4px solid white;

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

  width: 40%;
  /* height: 100px; */
  height: fit-content;

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

  font-size: 2vw;
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

.route {
  width: 100%;
  position: absolute;
}

@media(max-width: 550px){
  .main {
    min-height: auto;

  }
  .progress-bar-outer {
    width: calc(80% - 8px);
    height: 30px;

    z-index: 2;
  }

  .title-container {
    width: calc(80% - 8px);
    text-align: center;
    /* height: 50px; */
    top: 40px;

    z-index: 2;
  }

  .progress-bar-text{
    font-size: 32px;
  }

  .title-text {
    font-size: 28px;
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

.transition-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle at center,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.7) 50%,
    rgba(0, 0, 0, 0.95) 100%);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: overlayFadeIn 0.6s ease-out forwards;
}

@keyframes overlayFadeIn {
  0% {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  100% {
    opacity: 1;
    backdrop-filter: blur(8px);
  }
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #80C997;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.transition-text {
  color: white;
  font-size: 24px;
  font-weight: bold;
  font-family: "Titillium Web", sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  -webkit-text-stroke: 1px black;
  -webkit-text-stroke-width: 0.5px;
  animation: textPulse 2s ease-in-out infinite;
}

@keyframes textPulse {
  0%, 100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}
</style>
