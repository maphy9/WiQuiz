<script setup lang="ts">
import { computed, ref } from 'vue'
import StudentCard from '@/Views/LevelResultsView/StudentCard.vue'

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
          :class="score >= 90
            ? 'progress-bar-inner-green'
            : 'progress-bar-inner-yellow'"
          :style="{'width': `${score}%`}"
        />

        <span class="progress-bar-label">{{ Math.round(score) }}%</span>
      </div>

      <div class="cards-and-buttons-container">
        <div class="student-cards">
          <StudentCard
            v-for="student in students"
            :key="student.name"
            :name="student.name"
            :score="student.score"
          />
        </div>

        <div class="buttons-list">
          <div
            v-if="score >= 90"
            class="button next-level-button"
          >
            <p class="button-text">
              Następny temat
            </p>

            <img
              src="@/images/arrow.png"
              class="arrow-img"
            >
          </div>

          <p
            v-else
            class="next-level-access-text"
          >
            Żeby otrzymać dostęp do następnego tematu musisz odpowiedzieć na conajmniej 90% poprawnych odpowiedzi.
          </p>

          <div class="button play-again-button">
            <p class="button-text">
              Zagraj ponownie
            </p>

            <img
              src="@/images/circleArrow.png"
              class="circle-arrow-img"
            >
          </div>

          <div class="button choose-level-button">
            <p class="button-text">
              Wybór tematu
            </p>

            <img
              src="@/images/home.png"
              class="home-img"
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
  padding: 10px;
  padding-bottom: 40px;
  width: 70vw;
  background-color: rgba(69, 80, 97, 0.8);
  backdrop-filter: blur(5px);
  min-width: 515px;
}

.title {
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 4vw;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

.text-score {
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 2vw;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

.progress-bar-outer {
  width: 40vw;
  height: 5vh;
  border: 3px solid #fff;
  background: rgba(69, 80, 97, 0.5);
  margin: 1vh auto 0 auto;
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
  font-size: 2vw;
  text-shadow: 1px 1px 2px #fff, 0 0 2px #fff;
  pointer-events: none;
  line-height: normal;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

.next-level-button {
  background-color: #80C997;
}

.next-level-button:hover {
  background-color: #8ad2a1;
}

.play-again-button {
  background-color: #FADA5E;
}

.play-again-button:hover {
  background-color: #ffe16b;
}

.choose-level-button {
  background-color: #8B231D;
}

.choose-level-button:hover {
  background-color: #952823;
}

.cards-and-buttons-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2vw;
  align-items: start;
  margin-top: 2vh;
}

.student-cards {
  display: flex;
  flex-direction: column;
  gap: 2vh;
  margin-left: 3vw;
}

.buttons-list {
  display: flex;
  flex-direction: column;
  gap: 2vh;
  margin-left: 3vw;
}

.student-card {
  margin: 0;
  box-sizing: border-box;
}

.button {
  height: 17vh;
  box-sizing: border-box;
  border: 3px white solid;
  color: white;
  font-size: 5vh;
  font-weight: 700;
  width: 25vw;
  min-width: 10vw;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 200px;
  min-height: 50px;
  -webkit-tap-highlight-color: transparent;
}

.button-text {
  margin-left: 10px;
}

.button:active {
  transform: scale(1.04);
}

.arrow-img {
  height: 8vh;
  width: 8vh;
  transform: rotate(180deg);
  margin-right: 10px;
}

.circle-arrow-img {
  height: 8vh;
  width: 8vh;
  margin-right: 10px;
}

.home-img {
  height: 8vh;
  width: 8vh;
  margin-right: 10px;
}

.next-level-access-text {
  height: 17vh;
  color: white;
  font-size: 2.7vh;
  font-weight: 700;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

@media (max-width: 550px) {
  .background {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
  }

  .cards-and-buttons-container {
    display: flex;
    flex-direction: column;
    gap: 2vh;
    width: 100%;
  }

  .container {
    width: 90vw;
    min-width: unset;
    padding: 15px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .title {
    font-size: 6vw;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .text-score {
    font-size: 5vw;
    margin-bottom: 10px;
  }

  .progress-bar-outer {
    width: 80vw;
    margin-bottom: 15px;
  }

  .progress-bar-label {
    font-size: 20px;
  }

  .button {
    width: 85vw;
    font-size: 30px;
    height: 10vh;
    min-width: unset;
    margin: 0;
  }

  .next-level-access-text {
  height: 10vh;
  color: white;
  font-size: 2.5vh;
  font-weight: 700;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
   text-align: center;
    width: 85vw;
}

  .student-cards {
    margin: 0 auto;
    align-items: center;
    width: 100%;
    padding: 0;
  }

  .buttons-list {
    margin: 0 auto;
    align-items: center;
    width: 100%;
    padding: 0;
  }

  .arrow-img,
  .circle-arrow-img,
  .home-img {
    height: 6vh;
    width: 6vh;
  }
}
</style>
