<template>
  <div class="background">
    <!-- Эффект падающих зеленых листьев с ветром - равномерное распределение -->
    <div class="falling-leaves">
      <!-- Левая часть экрана -->
      <div v-for="i in 4" :key="`leaf-left-${i}`" class="leaf green-leaf" :style="{
        '--delay': (i * 2) + 's',
        '--duration': (12 + Math.random() * 6) + 's',
        '--x-start': (Math.random() * 40) + '%',
        '--x-end': (Math.random() * 45) + '%',
        '--rotation': (Math.random() * 360) + 'deg',
        '--wind-intensity': (0.3 + Math.random() * 0.5)
      }">🍃</div>
      <div v-for="i in 3" :key="`big-leaf-left-${i}`" class="leaf big-green-leaf" :style="{
        '--delay': (i * 3.5) + 's',
        '--duration': (14 + Math.random() * 4) + 's',
        '--x-start': (Math.random() * 35) + '%',
        '--x-end': (Math.random() * 40) + '%',
        '--rotation': (Math.random() * 360) + 'deg',
        '--wind-intensity': (0.4 + Math.random() * 0.4)
      }">🌿</div>
      
      <!-- Правая часть экрана -->
      <div v-for="i in 4" :key="`leaf-right-${i}`" class="leaf green-leaf" :style="{
        '--delay': (i * 2.2) + 's',
        '--duration': (12 + Math.random() * 6) + 's',
        '--x-start': (55 + Math.random() * 40) + '%',
        '--x-end': (50 + Math.random() * 45) + '%',
        '--rotation': (Math.random() * 360) + 'deg',
        '--wind-intensity': (0.3 + Math.random() * 0.5)
      }">🍃</div>
      <div v-for="i in 3" :key="`big-leaf-right-${i}`" class="leaf big-green-leaf" :style="{
        '--delay': (i * 3.8) + 's',
        '--duration': (14 + Math.random() * 4) + 's',
        '--x-start': (60 + Math.random() * 35) + '%',
        '--x-end': (55 + Math.random() * 40) + '%',
        '--rotation': (Math.random() * 360) + 'deg',
        '--wind-intensity': (0.4 + Math.random() * 0.4)
      }">🌿</div>
    </div>
    
    <LanguageButton />

    <div class="team-card">
      <div class="team-card-top">
        <h3>{{ $t('main-view.your-team') }}</h3>
      </div>

      <div
        v-if="isConnected"
        class="team-members"
      >
        <div
          v-for="(teammate, index) in team"
          :key="index"
          class="member-slot"
          @click="playButtonSound"
        >
          <img
            class="avatar"
            :src="teammate.user.avatar || '/images/emptyPfp.png'"
          >

          <div>{{ teammate.user.name }}</div>
        </div>

        <router-link
          v-for="i in (3 - team.length)"
          :key="i"
          :to="{'name': 'join'}"
          class="member-slot"
          @click="playButtonSound"
        >
          <img
            class="add avatar"
            src="@/images/plus.png"
          >

          <div>{{ $t('main-view.invite-or-join') }}</div>
        </router-link>
      </div>
    </div>

    <div
      class="logo-card"
      @click="handleLogoClick"
    >
      <img
        class="logo-img"
        src="@/images/logo.png"
        :class="{'rotate': rotateLogo}"
      >

      <div class="logo-text">
        WIKQUIZ
      </div>
    </div>

    <div class="buttons-card">
      <router-link :to="{'name': 'level-selection'}">
        <div
          class="button play-button"
          @click="playButtonSound"
        >
          <div>{{ $t('main-view.play') }}</div>

          <img
            class="button-img"
            src="@/images/play.png"
          >
        </div>
      </router-link>

      <router-link :to="{'name': 'about'}">
        <div
          class="about-button button"
          @click="playButtonSound"
        >
          <div>{{ $t('main-view.about') }}</div>

          <img
            class="button-img"
            src="@/images/handshake.png"
          >
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import LanguageButton from '@/components/SharedComponents/LanguageButton.vue'
import { useGame } from '@/stores/gameStore'
import { useSoundStore } from '@/stores/useSoundStore'

const gameStore = useGame()
const { team, isConnected } = storeToRefs(gameStore)

const logoClickCount = ref(0)
const rotateLogo = ref(false)
const { playButtonSound } = useSoundStore()
const { onMountMainTheme } = useSoundStore()

onMounted(() => {
  onMountMainTheme()
})

function handleLogoClick() {
  logoClickCount.value++
  if (logoClickCount.value >= 5) {
    rotateLogo.value = true
    setTimeout(() => {
      rotateLogo.value = false
      logoClickCount.value = 0
    }, 1000)
  }
}
</script>

<style scoped>
@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(255, 255, 255, 0.7);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.7);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(255, 255, 255, 0.7);
  }
}

@keyframes rotate360 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Эффект падающих листьев */
.falling-leaves {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}

.leaf {
  position: absolute;
  top: -50px;
  font-size: 28px;
  animation: fallWithWind var(--duration) linear infinite;
  animation-delay: var(--delay);
  opacity: 0.8;
  transform: rotate(var(--rotation));
  left: var(--x-start);
}

.leaf.green-leaf {
  font-size: 32px;
  opacity: 0.9;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
}

.leaf.big-green-leaf {
  font-size: 40px;
  opacity: 0.85;
  filter: drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.3));
}

@keyframes fallWithWind {
  0% {
    transform: translateY(-50px) translateX(0) rotate(var(--rotation)) scale(0.8);
    opacity: 0;
  }
  10% {
    opacity: 1;
    transform: translateY(10vh) translateX(calc(10px * var(--wind-intensity))) rotate(calc(var(--rotation) + 45deg)) scale(1);
  }
  25% {
    transform: translateY(25vh) translateX(calc(-20px * var(--wind-intensity))) rotate(calc(var(--rotation) + 120deg)) scale(1.1);
  }
  40% {
    transform: translateY(40vh) translateX(calc(30px * var(--wind-intensity))) rotate(calc(var(--rotation) + 200deg)) scale(0.9);
  }
  55% {
    transform: translateY(55vh) translateX(calc(-15px * var(--wind-intensity))) rotate(calc(var(--rotation) + 280deg)) scale(1.05);
  }
  70% {
    transform: translateY(70vh) translateX(calc(25px * var(--wind-intensity))) rotate(calc(var(--rotation) + 360deg)) scale(0.95);
  }
  85% {
    transform: translateY(85vh) translateX(calc(-10px * var(--wind-intensity))) rotate(calc(var(--rotation) + 440deg)) scale(1);
  }
  100% {
    transform: translateY(110vh) translateX(calc(5px * var(--wind-intensity))) rotate(calc(var(--rotation) + 520deg)) scale(0.7);
    opacity: 0;
  }
}

.background {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  background-image: url("@/images/mainBackground.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  user-select: none;
}

.team-card {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #525a64;
  width: 35vw;
  height: 23vh;
  min-width: 400px;
  z-index: 10;
}

.team-card-top {
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: #62707e;
  width: 35vw;
  height: 7vh;
  font-family: "Titillium Web";
  font-size: 4vh;
  font-weight: 600;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-text-stroke: 1px black;
  min-width: 400px;
}

.team-members {
  display: flex;
  gap: 2vw;
  margin-top: 8vh;
  align-items: center;
  justify-content: space-between;
  margin-left: 2vw;
  margin-right: 2vw;
}

.member-slot {
  width: 15vh;
  height: 6vh;
  text-align: center;
  font-size: 2vh;
  font-family: "Titillium Web";
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar {
  width: 9vh;
  height: 9vh;
  background-color: #ccc;
  border-radius: 50%;
  margin-bottom: 4px;
  transition: all 0.3s ease !important;
}

.avatar:active {
  opacity: 0.8;
  transform: scale(1.05);
}

.add {
  background-color: #48b02c;
}

.add:active {
  background-color: rgba(79, 190, 48, 1) !important;
}

.logo-card {
  width: 336px;
  height: 86px;
  position: absolute;
  top: 25vh;
  background-color: rgba(253, 253, 230, 0.7);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-radius: 5px;
  z-index: 10;
}

.rotate {
  animation: rotate360 1s ease-in-out;
}

.logo-img {
  width: 84px;
  height: 84px;
}

.logo-text {
  font-size: 50px;
  font-family: "Segoe UI";
  font-weight: 600;
  color: #ff0000;
  margin-right: 2vw;
}

.buttons-card {
  position: fixed;
  margin-top: 10vh;
  top: 35vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12vh;
  z-index: 10;
}

.button {
  transition: all 0.3s ease !important;
  width: 312px;
  height: 84px;
  min-width: 300px;
  min-height: 40px;
  font-family: "Segoe UI";
  font-weight: 600;
  font-size: clamp(35px, 3vw, 40px);
  color: #ffffff;
  -webkit-text-stroke: 1px black;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 2px solid #ffffff;
  gap: 3vw;
}

.button-img {
  height: 10vh;
  width: 10vh;
  margin-left: 2vw;
}

.play-button {
  animation: pulse 2.5s infinite;
  background-color: rgba(72, 176, 44, 0.9);
}

.play-button:active {
  animation: none;
  transform: scale(1.05);
  background-color: rgba(79, 190, 48, 0.9) !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.about-button {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: rgba(26, 74, 143, 0.9);
}

.about-button:active {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
  background-color: rgba(30, 80, 152, 0.9) !important;
}

@media (hover: hover) {
  .avatar:hover {
    cursor: pointer;
    opacity: 0.7;
  }

  .add:hover {
    opacity: 1;
    background-color: rgba(59, 158, 32);
  }

  .play-button:hover {
    background-color: rgba(59, 158, 32, 0.9);
    animation: none;
  }

  .about-button:hover {
    background-color: rgba(20, 67, 132, 0.9);
  }

  .button:hover {
    cursor: pointer;
  }
}

a {
  all: unset;
}

@media (max-width: 550px) {
  .team-card {
    position: fixed;
    bottom: 8vh;
    top: auto;
    left: 0;
    width: 100vw;
    height: 20vh;
    background-color: #525a64;
  }

  .team-card {
    position: fixed;
    bottom: 5vh;
    background-color: #525a64;
    width: 100vw;
    height: 20vh;
  }

  .team-card-top {
    background-color: #62707e;
    width: 100vw;
    height: 5vh;
    font-family: "Titillium Web";
    font-size: 30px;
    font-weight: 600;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-text-stroke: 1px black;
  }

  .team-members {
    display: flex;
    gap: 5px;
    margin-top: 7vh;
    align-items: center;
    justify-content: space-between;
  }

  .member-slot {
    padding: 8px;
    width: 100px;
    text-align: center;
    font-size: 15px;
    font-family: "Titillium Web";
    color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .avatar {
    width: 15vw;
    height: 15vw;
  }

  .logo-card {
    width: 336px;
    height: 85px;
    position: absolute;
    background-color: rgba(253, 253, 230, 0.7);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 8px;
  }

  .logo-img {
    width: 90px;
    height: 90px;
  }

  .logo-text {
    font-size: 50px;
    font-family: "Segoe UI";
    font-weight: 600;
    color: #ff0000;
  }

  .button {
    width: 312px;
    height: 84px;
    font-family: "Segoe UI";
    font-weight: 600;
    font-size: 48px;
    color: #ffffff;
    -webkit-text-stroke: 1px black;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    border: 2px solid #ffffff;
    gap: 10px;
  }

  .buttons-card {
    top: 35vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5vh;
    margin-bottom: 50px;
  }
}
</style>
