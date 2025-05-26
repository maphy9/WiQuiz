<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import ReturnButton from '@/components/SharedComponents/ReturnButton.vue'
import LevelCard from './LevelCard.vue'
import LevelRoute from './LevelRoute.vue'

const progress = ref(70)
const CourseName = ref('Analiza Matematyczna')

const router = useRouter()

const cards = ref<{ cardText: string, state: 'passed' | 'repeat' | 'locked' }[]>([
  { cardText: 'Pochodne', state: 'passed' },
  { cardText: 'Pochodne', state: 'passed' },
  { cardText: 'Pochodne', state: 'passed' },
  { cardText: 'Pochodne', state: 'repeat' },
  { cardText: 'Pochodne', state: 'locked' },
  { cardText: 'Pochodne', state: 'locked' },
  { cardText: 'Pochodne', state: 'locked' },
  { cardText: 'Pochodne', state: 'locked' },
  { cardText: 'Pochodne', state: 'locked' },
  { cardText: 'Pochodne', state: 'locked' },
])

const leftCards = computed(() => cards.value.filter((_, i) => i % 2 === 0))
const rightCards = computed(() => cards.value.filter((_, i) => i % 2 !== 0))

const levelRoutes = computed(() => {
  const routes = []

  for (let i = 0; i < cards.value.length - 1; i++) {
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

function handleClick(levelId: number) {
  router.push({ name: 'level', params: { levelId } })
}
</script>

<template>
  <div
    class="main"
  >
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
        {{ CourseName }}
      </h1>
    </div>

    <div class="columns-container">
      <div class="left-column">
        <LevelCard
          v-for="(card, index) in leftCards"
          :key="index"
          :card-text="card.cardText"
          :state="card.state"
          @click="handleClick(index * 2)"
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
          v-for="(card, index) in rightCards"
          :key="index"
          :card-text="card.cardText"
          :state="card.state"
          @click="handleClick(index * 2 + 1)"
        />
      </div>
    </div>

    <ReturnButton />
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
    height: 50px;
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
</style>
