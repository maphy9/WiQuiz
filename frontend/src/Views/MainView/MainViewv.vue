<template>
  <div class="background">
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
    <div class="logo-card">
      <img class="logo-img" src="@/images/logo.png" />
      <div class="logo-text">WIKQUIZ</div>
    </div>
    <div class="play-button">
      <div>Play</div>
      <img class="play-img" src="@/images/play.png" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const player1_name = ref("Bolesław R.");
const player2_name = ref("Adam K.");
</script>

<style scoped>
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
}

.team-card {
  position: absolute;
  top: 0px;
  left: 0px;
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
  top: 254px;
  left: 552px;
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

.play-img {
  height: 72px;
  width: 72px;
  margin-left: 50px;
}

.play-button {
  background-color: rgba(72, 176, 44, 0.9);
  width: 312px;
  height: 84px;
  font-family: 'Segoe UI';
  font-weight: 600;
  font-size: 48px;
  color: #ffffff;
  -webkit-text-stroke: 1px black;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
