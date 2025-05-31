<template>
  <router-link
    :to="{'name': 'main'}"
    class="return-button"
    @click="playButtonSound"
  >
    <span class="return-button-text">{{ $t('return-button.go-back-to-main-menu') }}</span>

    <img
      class="return-button-icon"
      src="@/images/home.png"
    >
  </router-link>
</template>

<script setup lang="ts">
import { useSoundStore } from '@/composables/useSound'

const { playButtonSound } = useSoundStore()
</script>

<style scoped>
.return-button {
  cursor: pointer;
  position: fixed;
  bottom: 12px;
  border: 1px solid white;
  width: 426px;
  height: 70px;
  background-color: #8b231d;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.return-button:hover {
  background-color: #7b1c17;
}

.return-button:active {
  transform: scale(1.05);
  background-color: #9a2c26;
}

.return-button-text {
  text-transform: upper;
  color: white;
  font-size: 28px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

.return-button-icon {
  width: 70px;
  height: 70px;
}

a {
  all: unset;
}

@media only screen and (max-width: 550px) {
  .return-button {
    display: none;
  }
}
</style>
