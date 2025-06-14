<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import LanguageButton from '@/components/SharedComponents/LanguageButton.vue'
import ReturnButton from '@/components/SharedComponents/ReturnButton.vue'
import { useGame } from '@/stores/gameStore'
import { useSoundStore } from '@/stores/useSoundStore'
import LeavesAnimation from '@/views/MainView/LeavesAnimation.vue'

const { playButtonSound } = useSoundStore()

const codeInput = ref('')
const codeError = ref('')
const gameStore = useGame()
const { connectToRoom } = gameStore
const { roomCode, team } = storeToRefs(gameStore)

const { t, locale } = useI18n()

const router = useRouter()

watch(locale, () => {
  if (codeError.value) {
    codeError.value = t('Code must be exactly 6 characters')
  }
})

function joinRoom() {
  playButtonSound()
  if (codeInput.value.length !== 6) {
    codeError.value = t('Code must be exactly 6 characters')

    return
  }

  team.value = []
  connectToRoom(codeInput.value)
  router.push({ name: 'main' })
}

function copyCode() {
  if (roomCode.value) {
    const textarea = document.createElement('textarea')
    textarea.value = roomCode.value
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'absolute'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }
}

const { onMountMainTheme } = useSoundStore()

onBeforeRouteLeave((to) => {
  if (to.name === 'main') {
    return true
  }

  return { name: 'main' }
})

onMounted(() => {
  onMountMainTheme()
})
</script>

<template>
  <div class="main">
    <LeavesAnimation />

    <LanguageButton />

    <div class="container">
      <div>
        <h1 class="title">
          {{ $t('join-view.your-code') }}:
        </h1>

        <div class="input-group">
          <div class="code-input">
            <input
              type="text"
              :value="roomCode"
              readonly
            >

            <button
              type="button"
              @click="copyCode"
              @mousedown="playButtonSound"
            >
              <img src="@/images/clipboard.png">
            </button>
          </div>
        </div>
      </div>

      <div>
        <h1 class="title">
          {{ $t('join-view.join-team') }}
        </h1>

        <div class="input-group">
          <p class="code-input-label">
            {{ $t('join-view.enter-team-code') }}:
          </p>

          <div class="bebra">
            <div class="code-input">
              <input
                v-model="codeInput"
                type="text"
                maxlength="6"
                placeholder="000000"
              >

              <button
                type="button"
                @mousedown="joinRoom"
              >
                <img
                  id="paste-button-icon"
                  src="@/images/arrow.png"
                >
              </button>
            </div>

            <p
              v-if="codeError"
              class="error-message"
            >
              {{ codeError }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <ReturnButton />
  </div>
</template>

<style scoped>
.main {
  min-height: 100vh;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: auto;

  background-image: url('@/images/mainBackground.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}

.title {
  font-size: 64px;
  font-weight: 700;
  font-family: "Titillium Web", sans-serif;

  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 1px;

  color: white;
}

.container {
  margin-top: 70px;
  margin-bottom: 80px;
  width: 1332px;
  gap: 100px;

  display: flex;
  flex-direction: column;

  backdrop-filter: blur(5px);
  background-color: rgba(64, 77, 97, 0.7);
  border: 1px solid black;
}

.input-group {
  display: flex;
  align-items: center;
  justify-content: center;
}

input {
  width: 400px;
  height: 100px;
  font-size: 64px;

  font-weight: bold;
  font-family: "Titillium Web";
  text-align: center;

  box-sizing: border-box;
  color: black;

  border: black;
  background-color: white;
  border-color: black;
  border-width: 1px;
  border-style: solid;
}

.error-message {
  color: #ffffff;
  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 1px;
  font-size: 28px;
  font-weight: bold;
  font-family: "Titillium Web";
}

.bebra {
  display: flex;
  flex-direction: column;
}

.code-input {
  margin: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.code-input input {
  letter-spacing: 20px;
}

button {
  width: 100px;
  height: 100px;

  border: black;
  background-color: white;
  border: 1px solid black;

  transition: all 0.3s ease;
  cursor: pointer;
}

button:hover {
  background-color: rgba(237, 240, 243, 0.8);
}

button img {
  width: 100%;
  height: 100%;
}

#paste-button-icon {
  transform: scaleX(-1);
}

button:active {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}

.code-input-label {
  font-size: 48px;
  font-family: "Titillium Web";

  color: white;
}

@media (max-width: 550px) {
  .container {
    flex-direction: column-reverse;
    margin: 0;
    margin-top: 80px;
    width: calc(95vw - 2px);
    gap: 2vh;
    justify-content: space-between;
  }

  .error-message {
    font-size: 24px;
  }

  .title {
    font-size: 48px;
  }

  .code-input-label {
    font-size: 32px;
    text-align: center;
  }

  input {
    font-size: 42px;
    padding: 6px 0;
    width: calc(100% - 70px);
    min-width: 250px;
    height: 72px;
  }

  .input-group {
    flex-direction: column;
  }

  button {
    width: 72px;
    height: 72px;
  }

  .main {
    padding: 0px;
    background-size: cover;
    background-position: center;
  }
}
</style>
