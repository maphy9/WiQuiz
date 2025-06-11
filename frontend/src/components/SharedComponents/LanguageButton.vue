<template>
  <button
    class="block desktop"
    type="button"
    @click="toggleLanguage"
    @mousedown="playButtonSound"
  >
    <div class="language-button">
      <img
        src="@/images/globe.png"
        alt="globe"
      >
    </div>

    <h1 class="language-text">
      {{ language.name }} ({{ language.code }})
    </h1>
  </button>

  <button
    class="block mobile"
    type="button"
    @click="toggleLanguage"
    @mousedown="playButtonSound"
  >
    <div class="language-button">
      <img
        src="@/images/globe.png"
        alt="globe"
      >
    </div>

    <h1 class="language-text">
      {{ language.code }}
    </h1>
  </button>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSoundStore } from '@/stores/useSoundStore'

const { playButtonSound } = useSoundStore()
const { locale } = useI18n()

const language = ref({
  name: 'English',
  code: 'EN',
})

onMounted(() => {
  if (locale.value === 'pl') {
    language.value = { name: 'Polski', code: 'PL' }
  }
  else {
    language.value = { name: 'English', code: 'EN' }
  }
})

function toggleLanguage() {
  if (language.value.code === 'EN') {
    language.value = { name: 'Polski', code: 'PL' }
    locale.value = 'pl'
  }
  else {
    language.value = { name: 'English', code: 'EN' }
    locale.value = 'en'
  }
}
</script>

<style>
.block {
  top: 0;
  right: 0;
  width: 390px;
  height: 70px;

  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  position: fixed;

  backdrop-filter: blur(5px);
  background-color: rgba(61, 79, 105, 0.7);
  border-width: 2px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.3);
  border-radius: 0 0 0 12px;

  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
  box-shadow: 0 4px 15px rgba(61, 79, 105, 0.3);
}

.language-button {
  width: 74px;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(53, 74, 104, 0.3);
  transition: all 0.3s ease;
  border-radius: 0 0 0 10px;
}

.language-button img {
  width: 80%;
  height: 80%;
  transition: all 0.3s ease;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
}

.block:hover {
  background-color: rgba(61, 79, 105, 0.9);
  transform: rotateY(-6deg) rotateX(3deg) translateY(-3px);
  box-shadow:
    0 10px 25px rgba(61, 79, 105, 0.4),
    0 0 15px rgba(255, 255, 255, 0.1) inset;
  border-color: rgba(255, 255, 255, 0.6);
}

.block:hover .language-button {
  background-color: rgba(53, 74, 104, 0.5);
}

.block:hover .language-button img {
  transform: scale(1.1) rotate(15deg);
  filter: drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.5));
}

.block:hover .language-text {
  transform: translateY(-2px);
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.block:active {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
  transform: rotateY(0deg) rotateX(0deg) translateY(-1px) scale(0.98);
  background-color: rgba(71, 89, 115, 0.9);
}

.language-text {
  color: white;
  -webkit-text-stroke-color: rgb(2, 2, 2);
  -webkit-text-stroke-width: 1px;
  font-size: 50px;
  margin-left: 10px;
  font-weight: 700;
  font-family: "Titillium Web", sans-serif;
  transition: all 0.3s ease;
}

.mobile {
  width: 160px;
  display: none;
}

@media (max-width: 768px) {
  .desktop {
    display: none;
  }
  .mobile {
    display: inline-flex;
  }
}

/* Анимация появления кнопки */
.block {
  animation: buttonSlideIn 0.8s ease-out forwards;
}

@keyframes buttonSlideIn {
  0% {
    opacity: 0;
    transform: translateX(100%) rotateY(-45deg);
  }
  60% {
    opacity: 0.8;
    transform: translateX(-10px) rotateY(10deg);
  }
  100% {
    opacity: 1;
    transform: translateX(0) rotateY(0deg);
  }
}

.block {
  animation: buttonSlideIn 0.8s ease-out forwards, glow 4s ease-in-out infinite 2s;
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 4px 15px rgba(61, 79, 105, 0.3);
  }
  50% {
    box-shadow: 0 4px 20px rgba(61, 79, 105, 0.5), 0 0 15px rgba(255, 255, 255, 0.2);
  }
}
</style>
