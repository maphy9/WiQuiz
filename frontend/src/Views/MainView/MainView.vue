<!-- eslint-disable max-lines -->
<template>
  <div class="background">
    <LeafesAnimation />

    <LanguageButton />

    <div class="team-card">
      <div
        v-if="isConnected && team.length > 1"
        class="leave-room-mobile"
        @click="createRoom()"
      >
        <img
          class="leave-icon"
          src="@/images/leave.png"
        >

        <span class="leave-text">Leave room</span>
      </div>

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

      <div
        v-if="isConnected && team.length > 1"
        class="leave-room"
        @click="createRoom()"
      >
        <img
          class="leave-icon"
          src="@/images/leave.png"
        >

        <span class="leave-text">Leave room</span>
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
import LeafesAnimation from './LeafesAnimation.vue'

const gameStore = useGame()
const { createRoom } = gameStore
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
.leave-room {
  padding: 10px 0;
  height: 32px;
  display: flex;
  flex-direction: row;
  margin-top: 9vh;
  font-size: 24px;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  background-color: rgba(139, 35, 29, 1);
  cursor: pointer;
}

.leave-room-mobile {
  display: none;
}

.leave-icon {
  height: 100%;
}

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

@keyframes playButtonWave {
  0% {
    transform: rotate(0deg) scale(1);
    box-shadow: 0 0 0 0 rgba(72, 176, 44, 0.6);
  }
  25% {
    transform: rotate(-1deg) scale(1.02);
    box-shadow: 0 0 15px 5px rgba(72, 176, 44, 0.4);
  }
  50% {
    transform: rotate(0deg) scale(1.05);
    box-shadow: 0 0 20px 10px rgba(72, 176, 44, 0.2);
  }
  75% {
    transform: rotate(1deg) scale(1.02);
    box-shadow: 0 0 15px 5px rgba(72, 176, 44, 0.4);
  }
  100% {
    transform: rotate(0deg) scale(1);
    box-shadow: 0 0 0 0 rgba(72, 176, 44, 0);
  }
}

@keyframes aboutButtonWave {
  0% {
    transform: rotate(0deg) scale(1);
    box-shadow: 0 0 0 0 rgba(26, 74, 143, 0.6);
  }
  25% {
    transform: rotate(-2deg) scale(1.02);
    box-shadow: 0 0 15px 5px rgba(26, 74, 143, 0.3);
  }
  50% {
    transform: rotate(0deg) scale(1.05);
    box-shadow: 0 0 20px 10px rgba(26, 74, 143, 0.1);
  }
  75% {
    transform: rotate(2deg) scale(1.02);
    box-shadow: 0 0 15px 5px rgba(26, 74, 143, 0.3);
  }
  100% {
    transform: rotate(0deg) scale(1);
    box-shadow: 0 0 0 0 rgba(26, 74, 143, 0);
  }
}

@keyframes playIconFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-2px) rotate(-3deg);
  }
  50% {
    transform: translateY(-4px) rotate(0deg);
  }
  75% {
    transform: translateY(-2px) rotate(3deg);
  }
}

@keyframes aboutIconFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-3px) rotate(-5deg);
  }
  50% {
    transform: translateY(-6px) rotate(0deg);
  }
  75% {
    transform: translateY(-3px) rotate(5deg);
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
  background-color: rgba(82, 90, 100, 0.85);
  width: 35vw;
  height: 23vh;
  min-width: 400px;
}

.team-card-top {
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: rgba(98, 112, 126, 0.85);
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
}

.button {
  transition: all 0.3s ease !important;
  width: 312px;
  height: 84px;
  min-width: 300px;
  min-height: 40px;
  font-family: "Segoe UI";
  font-weight: 600;
  font-size: 40px;
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

.button-img {
  height: 90px;
  width: 90px;
  margin-left: 60px;
}

.play-button {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background-color: rgba(72, 176, 44, 0.9);
  position: relative;
  overflow: hidden;
  animation: playButtonWave 3s ease-in-out infinite;
}

.play-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s;
}

.play-button:hover::before {
  left: 100%;
}

.play-button .button-img {
  animation: playIconFloat 2s ease-in-out infinite;
  transition: all 0.3s ease;
}

.play-button:hover .button-img {
  transform: scale(1.15) rotate(-5deg);
  filter: brightness(1.3);
}

.play-button:active {
  box-shadow: 0 0 25px rgba(72, 176, 44, 0.7), 0 0 50px rgba(72, 176, 44, 0.5);
  transform: scale(0.98) translateY(2px);
  background-color: rgba(79, 190, 48, 0.9) !important;
  animation: none;
}

.about-button {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background-color: rgba(26, 74, 143, 0.9);
  position: relative;
  overflow: hidden;
  animation: aboutButtonWave 4s ease-in-out infinite;
}

.about-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.8s;
}

.about-button:hover::before {
  left: 100%;
}

.about-button .button-img {
  animation: aboutIconFloat 2.5s ease-in-out infinite;
  transition: all 0.3s ease;
}

.about-button:hover .button-img {
  transform: scale(1.1) rotate(5deg);
  filter: brightness(1.2);
}

.about-button:active {
  box-shadow: 0 0 25px rgba(26, 74, 143, 0.6), 0 0 50px rgba(26, 74, 143, 0.4);
  transform: scale(0.98) translateY(2px);
  background-color: rgba(30, 80, 152, 0.9) !important;
  animation: none;
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
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(72, 176, 44, 0.4);
    animation: none;
  }

  .about-button:hover {
    background-color: rgba(20, 67, 132, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(26, 74, 143, 0.4);
    animation: none;
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
    bottom: 0vh;
    top: auto;
    left: 0;
    width: 100vw;
    height: 18vh;
    padding-bottom: 10px;
  }

  .team-card-top {
    width: 100vw;
    height: 5vh;
    font-family: "Titillium Web";
    font-size: 25px;
    font-weight: 600;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-text-stroke: 1px black;
  }

  .team-members {
    width: 100vw;
    padding: 0;
    margin: 0;
    display: flex;
    margin-top: 5vh;
    align-items: center;
    justify-content: space-between;
  }

  .member-slot {
    padding: 8px 0;
    max-width: calc(100% / 3);
    text-align: center;
    font-size: 3vw;
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
    width: 200px;
    height: 70px;
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
    top: 33vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5vh;
    margin-bottom: 50px;
  }

  .button-img {
    height: 90px;
    width: 90px;
    margin-left: 40px;
  }

  .leave-room {
    display: none;
  }

  .leave-room-mobile {
    position: absolute;
    padding: 4px 0;
    height: 32px;
    width: 100vw;
    bottom: 19vh;
    display: flex;
    flex-direction: row;
    font-size: 20px;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    background-color: rgba(139, 35, 29, 1);
    cursor: pointer;
  }
}
</style>
