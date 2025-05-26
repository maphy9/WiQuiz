<script setup lang="ts">
import type { Ref } from 'vue'
import type { Question } from '@/types/Question'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import useTeamManager from '@/composables/useTeamManager'
import { useQuestions } from '@/stores/questionStore'
import QuestionView from './QuestionView.vue'

// const props = defineProps<{
//   levelId: string
// }>()

// const { levelId } = toRefs(props) // for fetching data

const router = useRouter()
const questions: Ref<Question[]> = ref([
  {
    title: 'Variable Declaration',
    text: 'Which keyword is used to declare a constant in JavaScript?',
    answers: [
      { text: 'var', isCorrect: false },
      { text: 'let', isCorrect: false },
      { text: 'const', isCorrect: true },
      { text: 'define', isCorrect: false },
    ],
  },
  {
    title: 'Strict Equality',
    text: 'What does the "===" operator do in JavaScript?',
    answers: [
      { text: 'Compares only values', isCorrect: false },
      { text: 'Assigns a value', isCorrect: false },
      { text: 'Compares value and type', isCorrect: true },
      { text: 'Checks for null or undefined', isCorrect: false },
    ],
  },
  {
    title: 'Data Types',
    text: 'Which of the following is NOT a JavaScript data type?',
    answers: [
      { text: 'String', isCorrect: false },
      { text: 'Number', isCorrect: false },
      { text: 'Character', isCorrect: true },
      { text: 'Boolean', isCorrect: false },
    ],
  },
  {
    title: 'Arrow Functions',
    text: 'How do you define an arrow function in JavaScript?',
    answers: [
      { text: 'function => {}', isCorrect: false },
      { text: '() => {}', isCorrect: true },
      { text: '=> () {}', isCorrect: false },
      { text: 'func => () {}', isCorrect: false },
    ],
  },
  {
    title: 'Falsy Values',
    text: 'Which of these is a falsy value in JavaScript?',
    answers: [
      { text: '[]', isCorrect: false },
      { text: '{}', isCorrect: false },
      { text: '0', isCorrect: true },
      { text: '"false"', isCorrect: false },
    ],
  },
])
const currentQuestionIndex = ref(0)
const showExitMenu = ref(false)
const canExit = ref(false)
const { currentQuestion } = storeToRefs(useQuestions())
const { initTeam } = useTeamManager()

onBeforeRouteLeave((to) => {
  if (!canExit.value) {
    showExitMenu.value = true

    return false
  }

  if (to.name !== 'levelselection') {
    return { name: 'levelselection' }
  }

  return undefined
})

function exitToLevelSelection() {
  canExit.value = true
  router.push({ name: 'levelselection' })
}

watch(currentQuestionIndex, () => {
  currentQuestion.value = questions.value[currentQuestionIndex.value]
}, { immediate: true })

onMounted(() => {
  initTeam()
})
</script>

<template>
  <div class="main">
    <QuestionView
      v-if="currentQuestionIndex < questions.length"
      @next-question="currentQuestionIndex++"
      @game-over="currentQuestionIndex = questions.length"
    />

    <div
      class="exit-button"
      @click="showExitMenu = true"
    >
      <img src="@/images/exit.png">
    </div>

    <div
      v-if="showExitMenu"
      class="exit-menu-overlay"
    >
      <div class="exit-menu-container">
        <span class="exit-menu-text">
          Do you want to leave?
        </span>

        <div class="exit-menu-buttons">
          <button
            class="exit-menu-button exit-no"
            type="button"
            @click="showExitMenu = false"
          >
            No
          </button>

          <button
            class="exit-menu-button exit-yes"
            type="button"
            @click="exitToLevelSelection"
          >
            Yes
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
</style>
