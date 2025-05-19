<script setup lang="ts">
import { computed, ref } from 'vue'
import StudentCard from './studentCard.vue'

interface Student {
  name: string
  score: number
}

const levelNumber = ref(1)
const levelTitle = ref('Funkcja wykładnicza')
const correctAnswers = ref(8)
const numberAnswers = ref(12)
const students = ref<Student[]>([
  { name: 'Bolesław R.', score: 386 },
  { name: 'Adam K.', score: 222 },
  { name: 'Ewelina J.', score: 215 },
])

const level = computed(() => {
  return `Temat${levelNumber.value} - ${levelTitle.value}`
})

const score = computed(() => {
  return (100 * correctAnswers.value) / numberAnswers.value
})
</script>

<template>
  <div class="background">
    <div class="container">
      <h1 class="title">
        {{ level }}
      </h1>

      <div class="progress-bar-outer">
        <div
          class="progress-bar-inner"
          :style="{'width': `${score}%`}"
        />

        <span class="progress-bar-label">{{ Math.round(score) }}%</span>
      </div>

      <div class="student-cards">
        <StudentCard
          v-for="student in students"
          :key="student.name"
          :name="student.name"
          :score="student.score"
        />
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
  padding: 10px;
  padding-bottom: 64px;
  width: calc(92.5% - 22px);
  background-color: rgba(69, 80, 97, 0.8);
  backdrop-filter: blur(5px);
}

.title {
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 64px;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

.progress-bar-outer {
  width: 40rem;
  height: 3rem;
  border: 4px solid #fff;
  background: rgba(69, 80, 97, 0.5);
  margin: 32px auto 0 auto;
  position: relative;
  box-sizing: border-box;
  border-radius: 0px;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.progress-bar-inner {
  height: 100%;
  background: #ffe082;
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
  font-size: 2rem;
  text-shadow: 1px 1px 2px #fff, 0 0 2px #fff;
  pointer-events: none;
  line-height: normal;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

.student-cards{
  margin-top: 3rem;
}
</style>
