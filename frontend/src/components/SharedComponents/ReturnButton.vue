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
import { useSoundStore } from '@/stores/useSoundStore'

const { playButtonSound } = useSoundStore()
</script>

<style scoped>
.return-button {
  cursor: pointer;
  position: fixed;
  bottom: 12px;
  border: 2px solid white;
  width: 426px;
  height: 70px;
  background-color: #8b231d;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
  box-shadow: 0 4px 15px rgba(139, 35, 29, 0.3);
}

.return-button:hover {
  background-color: #7b1c17;
  transform: rotateY(-8deg) rotateX(5deg) translateY(-8px);
  box-shadow:
    0 15px 35px rgba(139, 35, 29, 0.4),
    0 0 20px rgba(255, 255, 255, 0.1) inset;
  border-color: #ffffff;
}

.return-button:active {
  transform: rotateY(0deg) rotateX(0deg) translateY(-2px) scale(0.98);
  background-color: #9a2c26;
  box-shadow: 0 8px 20px rgba(139, 35, 29, 0.5);
}

.return-button-text {
  text-transform: uppercase;
  color: white;
  font-size: 28px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  transition: all 0.3s ease;
}

.return-button:hover .return-button-text {
  transform: translateY(-2px);
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.return-button-icon {
  width: 60px;
  height: 60px;
  transition: all 0.3s ease;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
}

.return-button:hover .return-button-icon {
  transform: scale(1.1) rotate(-5deg);
  filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.5));
}

a {
  all: unset;
}

@media only screen and (max-width: 550px) {
  .return-button {
    display: none;
  }
}

.return-button {
  animation: buttonAppear 0.8s ease-out forwards;
}

@keyframes buttonAppear {
  0% {
    opacity: 0;
    transform: translateY(100px) rotateX(-30deg);
  }
  60% {
    opacity: 0.8;
    transform: translateY(-10px) rotateX(10deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotateX(0deg);
  }
}

.return-button {
  animation: buttonAppear 0.8s ease-out forwards, pulse 3s ease-in-out infinite 1s;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 4px 15px rgba(139, 35, 29, 0.3);
  }
  50% {
    box-shadow: 0 4px 20px rgba(139, 35, 29, 0.5);
  }
}
</style>
