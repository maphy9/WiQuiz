<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useGame } from '@/stores/gameStore'
import { useUser } from '@/stores/userStore'
import { useSoundStore } from '@/stores/useSoundStore'
import { updateMaxLevelId } from '@/utils/fetchUtils'
import StudentCard from '@/Views/LevelResultsView/StudentCard.vue'

const { t } = useI18n()
const { playResultsMusic, playButtonSound, stopLevelMusic, playLevelMusic, stopResultsMusic } = useSoundStore()
const router = useRouter()
const { user } = storeToRefs(useUser())
const { currentLevel, currentLevelIndex, correctAnswers, levels, team, me } = storeToRefs(useGame())

const level = computed(() => {
  return `${t('result-view.topic')} ${currentLevel.value?.OrderNumber as number + 1} - ${currentLevel.value?.LevelTitle}`
})

const levelProgress = computed(() => {
  if (!currentLevel.value) {
    return 0
  }

  return (100 * correctAnswers.value) / currentLevel.value?.questions.length
})

const nextLevel = computed(() => {
  if (currentLevelIndex.value < levels.value.length - 1) {
    return levels.value[currentLevelIndex.value + 1]
  }

  return null
})

watch(levelProgress, async () => {
  if (user.value && nextLevel.value && user.value?.maxOrderNumber < nextLevel.value?.OrderNumber && levelProgress.value >= 90 && nextLevel.value && me.value && currentLevel.value) {
    await updateMaxLevelId(me.value.user, currentLevel.value?.CourseId, nextLevel.value.LevelId)
    if (user.value) {
      user.value.maxOrderNumber = nextLevel.value.LevelId
    }
  }
}, { immediate: true })

const textScore = computed(() => {
  return `${correctAnswers.value} ${t('result-view.correct-answers-from')} ${currentLevel.value?.questions.length}`
})

onMounted(() => {
  playResultsMusic()
})

onUnmounted(() => {
  stopLevelMusic()
  stopResultsMusic()
})
</script>

<template>
  <div class="background">
    <div class="container">
      <h1 class="title">
        {{ level }}
      </h1>

      <span class="text-score">{{ textScore }}</span>

      <div class="progress-bar-outer">
        <div
          :class="levelProgress >= 90
            ? 'progress-bar-inner-green'
            : 'progress-bar-inner-yellow'"
          :style="{'width': `${levelProgress}%`}"
        />

        <span class="progress-bar-label">{{ Math.round(levelProgress) }}%</span>
      </div>

      <div class="cards-and-buttons-container">
        <div class="student-cards">
          <StudentCard
            v-for="teammate in team"
            :key="teammate.user.name"
            :teammate="teammate"
          />
        </div>

        <div class="buttons-list">
          <div
            v-if="levelProgress >= 90"
            class="button next-level-button"
            @click="playButtonSound(); router.push({'name': 'level',
                                                    'params': {'levelIndex': currentLevelIndex + 1}})"
          >
            <p class="button-text">
              {{ $t('result-view.next-level') }}
            </p>

            <img
              src="@/images/arrow.png"
              class="button-icon"
              :style="{'transform': 'rotate(180deg)'}"
            >
          </div>

          <p
            v-else
            class="next-level-access-text"
          >
            {{ nextLevel
              ? $t('result-view.access-message')
              : $t('All levels completed') }}
          </p>

          <div
            class="button play-again-button"
            @click="playButtonSound(); playLevelMusic(); router.push({'name': 'level',
                                                                      'params': {'levelIndex': currentLevelIndex}})"
          >
            <p class="button-text">
              {{ $t('result-view.play-again') }}
            </p>

            <img
              src="@/images/circleArrow.png"
              class="button-icon"
            >
          </div>

          <div
            class="button choose-level-button"
            @click="playButtonSound(); router.push({'name': 'level-selection'})"
          >
            <p class="button-text">
              {{ $t('result-view.choose-level') }}
            </p>

            <img
              src="@/images/home.png"
              class="button-icon"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  background-image: url("@/images/quizBackground.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  user-select: none;
}

.container {
  border: 1px solid black;
  padding: 0 10px;
  padding-bottom: 6vh;
  width: calc(80vw - 22px);
  background-color: rgba(69, 80, 97, 0.8);
  backdrop-filter: blur(5px);
  min-width: 515px;
}

.title {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 48px;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

.text-score {
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 36px;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

.progress-bar-outer {
  width: 52vw;
  height: 62px;
  border: 3px solid #fff;
  margin: 0 auto 0 auto;
  background: rgba(69, 80, 97, 0.5);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.progress-bar-inner-yellow {
  height: 100%;
  background: #ffe082;
  position: relative;
}

.progress-bar-inner-green {
  height: 100%;
  background: #80C997;
  position: relative;
}

.progress-bar-label {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: bold;
  font-size: 48px;
  pointer-events: none;
  line-height: normal;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

.next-level-button {
  background-color: #80C997;
}

.next-level-button:hover {
  background-color: rgb(112, 182, 134)
}

.play-again-button {
  background-color: #FADA5E;
}

.play-again-button:hover {
  background-color: rgb(230, 202, 91);
}

.choose-level-button {
  background-color: #8B231D;
}

.choose-level-button:hover {
 background-color: #7f1e19;
}

.cards-and-buttons-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 32px;
  width: calc(100% - 4vw);
  padding: 0 2vw;
  margin-top: 2vh;
}

.student-cards {
  width: 40vw;
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.buttons-list {
  display: flex;
  flex-direction: column;
  width: calc(100% - 40vw - 32px);
  gap: 36px;
}

.button {
  height: 112px;
  border: 3px white solid;
  box-sizing: border-box;
  border-radius: 3px;
  font-weight: bold;
  width: calc(100% - 20px);
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 200px;
  min-height: 50px;
  -webkit-tap-highlight-color: transparent;
}

.button-text {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
  font-size: 32px;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

.button:active {
  transform: scale(1.04);
}

.button-icon {
  height: 64px;
  width: 64px;
}

.next-level-access-text {
  height: 112px;
  font-size: 25px;
  color: white;
  font-weight: 700;
  text-align: left;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

@media (max-width: 1300px) {
  .next-level-access-text {
    font-size: 20px;
  }
}

@media (max-width: 1100px) {
  .background {
    height: 100vh;
    width: 100vw;
  }

  .cards-and-buttons-container {
    flex-direction: column;
    gap: 2vh;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .container {
    width: calc(95vw - 30px);
    min-width: unset;
    justify-content: start !important;
    overflow-y: auto !important;
    overflow-x: hidden;
    scrollbar-width: none;
    max-height: 90vh;
    padding: 30px 15px;
  }

  .title {
    -webkit-text-stroke-width: 0;
    font-size: 24px;
    margin-bottom: 10px;
  }

  .text-score {
    font-size: 20px;
    font-weight: bold;
    -webkit-text-stroke-width: 0;
  }

  .progress-bar-outer {
    width: 100%;
    height: 48px;
  }

  .progress-bar-label {
    font-size: 32px;
  }

  .button {
    width: 100%;
    height: 72px;
    min-width: unset;
    margin: 0;
  }

  .button-text {
    font-size: 32px !important;
  }

  .next-level-access-text {
    height: fit-content;
    font-size: 24px;
    font-weight: 700;
    padding: 0 10px;
  }

  .student-cards {
    align-items: center;
    margin-top: 20px;
    width: 100%;
    gap: 1.5vh;
    padding: 0;
  }

  .buttons-list {
    align-items: center;
    width: 100%;
    gap: 1.5vh;
    padding: 0;
  }

  .button-icon {
    height: 48px;
    width: 48px;
  }
}

@media (max-width: 400px) {
    .button-text {
    font-size: 24px !important;
  }
}
</style>
