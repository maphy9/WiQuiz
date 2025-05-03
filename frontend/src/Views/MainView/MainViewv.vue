<template>
  <div class="background">
    <LanguageButton></LanguageButton>
    <div class="team-card">
      <div class="team-card-top">
        <h3>Your team</h3>
      </div>
      <div class="team-members">
        <div class="member-slot">
          <img class="avatar" src="@/images/emptyPfp.png" />
          <div>{{ player1_name }}</div>
        </div>
        <div class="member-slot">
          <img class="avatar" src="@/images/emptyPfp.png" />
          <div>{{ player2_name }}</div>
        </div>
        <div class="member-slot">
          <img class="avatar add" src="@/images/plus.png" />
          <div>Invite or join</div>
        </div>
      </div>
    </div>
    <div class="logo-card" @click="handleLogoClick">
      <img class="logo-img" src="@/images/logo.png" :class="{ rotate: rotateLogo }" />
      <div class="logo-text">WIKQUIZ</div>
    </div>
    <div class="buttons-card">
      <div class="button play-button">
        <div>Play</div>
        <img class="button-img" src="@/images/play.png" />
      </div>
      <div class="button about-button">
        <div>About</div>
        <img class="button-img" src="@/images/handshake.png" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LanguageButton from "@/components/SharedComponents/LanguageButton.vue";

const player1_name = ref("Bolesław R.");
const player2_name = ref("Adam K.");
const logoClickCount = ref(0);
const rotateLogo = ref(false);

function handleLogoClick() {
  logoClickCount.value++;
  if (logoClickCount.value >= 5) {
    rotateLogo.value = true;
    setTimeout(() => {
      rotateLogo.value = false;
      logoClickCount.value = 0;
    }, 1000);
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

@keyframes flicker {
  0%,
  100% {
    opacity: 1;
    filter: drop-shadow(0 0 5px #48b02c);
  }
  50% {
    opacity: 0.6;
    filter: drop-shadow(0 0 15px #a4f593);
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

.rotate {
  animation: rotate360 1s ease-in-out;
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
  width: 540px;
  height: 204px;
}

.team-card-top {
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: #62707e;
  width: 540px;
  height: 60px;
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
  gap: 12px;
  margin-top: 70px;
  align-items: center;
  justify-content: space-between;
}

.member-slot {
  padding: 8px;
  width: 100px;
  margin-left: 25px;
  margin-right: 25px;
  text-align: center;
  font-size: 18px;
  font-family: "Titillium Web";
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar {
  width: 72px;
  height: 72px;
  background-color: #ccc;
  border-radius: 50%;
  margin-bottom: 4px;
}

.add {
  background-color: #48b02c;
}

.logo-card {
  width: 336px;
  height: 85px;
  position: absolute;
  top: 30vh;
  background-color: rgba(253, 253, 230, 0.7);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 8px;
  border-radius: 10px;
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
}

.buttons-card {
  margin-top: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
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

.button-img {
  height: 72px;
  width: 72px;
  margin-left: 50px;
}

.play-button {
  background-color: rgba(72, 176, 44, 0.9);
}

.about-button {
  background-color: rgba(26, 74, 143, 0.9);
}

.play-button {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: pulse 2.5s infinite;
}

.button:hover {
  transform: scale(1.01);
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.9);
  cursor: pointer;
}

.play-button:hover {
  background-color: rgba(19, 57, 8, 0.9);
}

.about-button:hover {
  background-color: rgba(9, 25, 49, 0.9);
}

.add {
  background-color: #48b02c;
  animation: flicker 2.5s infinite ease-in-out;
}

.add:hover {
  animation-play-state: paused;
  transform: scale(1.05);
  cursor: pointer;
}

.button:active {
  animation-play-state: paused;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
  background-color: rgba(61, 79, 105, 0.7);
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
    margin-left: 15px;
    margin-right: 15px;
    text-align: center;
    font-size: 18px;
    font-family: "Titillium Web";
    color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .logo-card {
    width: 336px;
    height: 85px;
    position: absolute;
    top: 18vh;
    background-color: rgba(253, 253, 230, 0.7);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 8px;
    border-radius: 10px;
  }

  .buttons-card {
    margin-top: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5vh;
  }
}
</style>
