<script setup lang="ts">
import type { Ref } from 'vue'
import type Question from '@/types/Question'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, ref, toRefs, watch } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { useSoundStore } from '@/stores/useSoundStore'
import { useGame } from '@/stores/gameStore'
import QuestionView from './QuestionView.vue'

const props = defineProps<{
  levelIndex: string
}>()

const { startMainTheme, stopLevelMusic, playButtonSound, playLevelMusic } = useSoundStore()

const { levelIndex } = toRefs(props)

const router = useRouter()
const currentQuestionIndex = ref(0)
const showExitMenu = ref(false)
const canGoToLevelSelection = ref(false)
const canGoToLevelResults = ref(false)

const gameStore = useGame()
const { initTeam, initStats } = gameStore
const { currentLevel, levels } = storeToRefs(gameStore)
const currentQuestion: Ref<Question | null> = ref(null)

onBeforeRouteLeave((to) => {
  if (canGoToLevelResults.value && to.name === 'level-results') {
    return true
  }

  if (!canGoToLevelSelection.value) {
    showExitMenu.value = true

    return false
  }

  if (to.name === 'level-selection') {
    return true
  }

  return false
})

function exitToLevelSelection() {
  canGoToLevelSelection.value = true
  router.push({ name: 'level-selection' })
}

watch(levelIndex, () => {
  currentLevel.value = levels.value[Number.parseInt(levelIndex.value)]
  initTeam()
  initStats()
}, { immediate: true })

watch(currentQuestionIndex, () => {
  if (!currentLevel.value) {
    return
  }
  if (currentQuestionIndex.value === currentLevel.value.questions.length) {
    canGoToLevelResults.value = true
    router.push({ name: 'level-results' })
  }
  else {
    currentQuestion.value = currentLevel.value.questions[currentQuestionIndex.value]
  }
}, { immediate: true })

onMounted(() => {
  playLevelMusic()
  initTeam()
})

onUnmounted(() => {
  stopLevelMusic()
})
</script>

<template>
  <div
    v-if="currentLevel !== null && currentQuestion !== null"
    class="main"
  >
    <QuestionView
      v-if="currentQuestionIndex < currentLevel.questions.length"
      :question="currentQuestion"
      @next-question="currentQuestionIndex++"
      @game-over="currentQuestionIndex = currentLevel.questions.length"
    />

    <div
      class="exit-button"
      @click="playButtonSound(); showExitMenu = true"
    >
      <img src="@/images/exit.png">
    </div>

    <div
      v-if="showExitMenu"
      class="exit-menu-overlay"
    >
      <div class="exit-menu-container">
        <span class="exit-menu-text">
          {{ $t('level-view.want-to-leave') }}
        </span>

        <div class="exit-menu-buttons">
          <button
            class="exit-menu-button exit-no"
            type="button"
            @click="playButtonSound(); showExitMenu = false"
          >
            {{ $t('level-view.no') }}
          </button>

          <button
            class="exit-menu-button exit-yes"
            type="button"
            @click="playButtonSound(); exitToLevelSelection(); stopLevelMusic(); startMainTheme();"
          >
            {{ $t('level-view.yes') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  background-image: url('@/images/quizBackground.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.exit-button {
  width: calc(7.6vw - 2px);
  height: calc(7.6vw - 2px);
  min-width: 72px;
  min-height: 72px;
  border: 1px solid black;
  background-color: white;
  position: absolute;
  top: 10px;
  right: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 2;
}

.exit-button:hover {
  background-color: rgb(204, 204, 204);
}

.exit-button img {
  width: calc(7.6vw - 10px);
  height: calc(7.6vw - 10px);
  min-width: 64px;
  min-height: 64px;
}

.exit-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.exit-menu-container {
  background: rgba(69, 80, 97, 0.8);
  border-radius: 3px;
  border: 1px solid black;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 0 15px rgba(0,0,0,0.4);
  color: white;
  max-width: 398px;
  width: calc(90% - 2px);
}

.exit-menu-text {
  font-size: 36px;
  font-weight: bold;
}

.exit-menu-buttons {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.exit-menu-button {
  border: 1px solid white;
  font-size: 36px;
  font-weight: bold;
  border-radius: 4px;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  cursor: pointer;
  width: 40%;
  color: white;
}

.exit-yes {
  background-color: #80C997;
}

.exit-no {
  background-color: #E8484B;
}

.exit-yes:hover {
  background-color: rgb(71, 163, 111);
}

.exit-no:hover {
  background-color: rgb(189, 56, 56);
}

@media only screen and (max-width: 800px) {
  .exit-button {
    display: none;
  }
}
</style>
