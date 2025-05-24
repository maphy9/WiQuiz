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
import { ref } from 'vue'
import { useSound } from '@/composables/useSound'

const { playButtonSound } = useSound()

const language = ref({
  name: 'English',
  code: 'EN',
})

function toggleLanguage() {
  if (language.value.name === 'English') {
    language.value.name = 'Polski'
    language.value.code = 'PL'
  }
  else {
    language.value.name = 'English'
    language.value.code = 'EN'
  }
}
</script>

<style>
.language-button {
  width: 74px;
  height: 100%;
  background-color: rgba(53, 74, 104, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.language-button img {
  width: 100%;
  height: 100%;
}

.block:active {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
  background-color: rgba(61, 79, 105, 0.7);
}

.block {
  position: fixed;
  top: 0;
  right: 0;
  width: 390px;
  height: 70px;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  backdrop-filter: blur(5px);
  background-color: rgba(61, 79, 105, 0.7);
  border-width: 1px;
}

.language-text {
  color: white;
  -webkit-text-stroke-color: rgb(2, 2, 2);
  -webkit-text-stroke-width: 1px;
  font-size: 50px;
  margin-left: 10px;
  font-weight: 700;
  font-family: "Titillium Web", sans-serif;
}

.desktop {
  width: 390px;
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
</style>
