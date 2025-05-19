<script setup lang="ts">
import { computed, ref } from 'vue'
import StudentCard from './studentCard.vue'

interface Student {
  name: string
  score: number
}

const levelNumber = ref(1)
const levelTitle = ref('Funkcja wykładnicza')
const correctAnswers = ref(11)
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

const textScore = computed(() => {
  return `${correctAnswers.value} poprawnych odpowiedzi z ${numberAnswers.value}`
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
          :class="score >= 90 ? 'progress-bar-inner-green' : 'progress-bar-inner-yellow'"
          :style="{'width': `${score}%`}"
        />

        <span class="progress-bar-label">{{ Math.round(score) }}%</span>
      </div>

      <div class="cards-and-buttons-grid">
        <div class="student-cards">
          <StudentCard
            v-for="student in students"
            :key="student.name"
            :name="student.name"
            :score="student.score"
          />
        </div>
        <div class="buttons-list">
          <div v-if="score>=90" class="button next-level-button">
            <p>Następny temat</p>
            <img src="@/images/arrow.png" class="arrow-img"/>
          </div>
          <p v-else class="next-level-access-text">Żeby otrzymać dostęp do następnego tematu musisz odpowiedzieć na conajmniej 90% poprawnych odpowiedzi.</p>
          <div class="button play-again-button">
            <p>Zagraj ponownie</p>
            <img src="@/images/circleArrow.png" class="circle-arrow-img"/>
          </div>
          <div class="button choose-level-button">
            <p>Wybór tematu</p>
            <img src="@/images/home.png" class="home-img"/>
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
  padding: 10px;
  padding-bottom: 2rem;
  width: calc(72.5% - 22px);
  background-color: rgba(69, 80, 97, 0.8);
  backdrop-filter: blur(5px);
}

.title {
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 4rem;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

.text-score {
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

.progress-bar-outer {
  width: 40rem;
  height: 3rem;
  border: 3px solid #fff;
  background: rgba(69, 80, 97, 0.5);
  margin: 1rem auto 0 auto;
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
  font-size: 2rem;
  text-shadow: 1px 1px 2px #fff, 0 0 2px #fff;
  pointer-events: none;
  line-height: normal;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

.next-level-button{
  background-color: #80C997;
}

.next-level-button:hover{
  background-color: #8ad2a1;
}

.play-again-button{
  background-color: #FADA5E;
}

.play-again-button:hover{
  background-color: #ffe16b;
}

.choose-level-button{
  background-color: #8B231D;
}

.choose-level-button:hover{
background-color: #952823;
}

.cards-and-buttons-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
  margin-top: 2rem;
}

.student-cards{
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-left: 3rem;
}

.buttons-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.student-card{
  margin: 0;
  box-sizing: border-box;
}

.button {
  height: 7rem;
  margin: 0 2rem;
  box-sizing: border-box;
  border: 3px white solid;
  color: white;
  font-size: 2rem;
  font-weight: 700;
  width: 25rem;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.3s;
}

.button:active {
  transform: scale(1.04);
}

.arrow-img{
  height: 5rem;
  width: 5rem;
  margin: 0 0 0 2rem;
  transform: rotate(180deg);
}

.circle-arrow-img{
  height: 5rem;
  width: 5rem;
  margin: 0 0 0 1.7rem;
}

.home-img{
  height: 5rem;
  width: 5rem;
  margin: 0 0 0 4rem;
}

.next-level-access-text{
  height: 7rem;
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}
</style>
