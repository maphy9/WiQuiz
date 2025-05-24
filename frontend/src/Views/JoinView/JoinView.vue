<script lang="ts" setup>
import LanguageButton from '@/components/SharedComponents/LanguageButton.vue'
import ReturnButton from '@/components/SharedComponents/ReturnButton.vue'
import { ref } from 'vue'
import { useSound } from '@/composables/useSound'

const { playButtonSound } = useSound()

const codeInput = ref('6  2  3  1  6  2')

function copyCode() {
  if (codeInput.value) {
    navigator.clipboard.writeText(codeInput.value.toString())
  }
}
</script>

<template>
  <div class="main">
    <LanguageButton />

    <div class="container">
      <div>
        <h1 class="title">
          Your code:
        </h1>

        <div class="input-group">
          <div class="code-input">
            <input
              type="text"
              :value="codeInput"
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
          Join team
        </h1>

        <div class="input-group">
          <p class="code-input-label">
            Enter team code:
          </p>

          <div class="code-input">
            <input
              type="text"
              maxlength="6"
              value="1  2  4  5  3  6"
            >

            <button
              type="button"
              @mousedown="playButtonSound"
            >
              <img
                id="paste-button-icon"
                src="@/images/arrow.png"
              >
            </button>
          </div>
        </div>
      </div>
    </div>

    <ReturnButton />
  </div>
</template>

<style scoped>
.input-group {
  display: flex;
  align-items: center;
  justify-content: center;
}

input {
  color: black;
  font-weight: bold;
  font-size: 64px;
  font-family: "Titillium Web";
  text-align: center;
  width: 400px;
  height: 100px;
  border: black;
  background-color: white;
  border-color: black;
  border-width: 1px;
  border-style: solid;
  font-family: "Titillium Web";
  box-sizing: border-box;
}

.code-input {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px;
}

button {
  width: 100px;
  height: 100px;
  border: black;
  background-color: white;
  border: 1px solid black;
  transition: all 0.3s ease;
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
  color: white;
  font-size: 48px;
  font-family: "Titillium Web";
}

.main {
  min-height: 100vh;
  width: 100%;
  margin: auto;
  background-image: url('@/images/mainBackground.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  color: white;
  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 1px;
  font-size: 64px;
  font-weight: 700;
  font-family: "Titillium Web", sans-serif;
}

.container {
  margin-top: 70px;
  margin-bottom: 80px;
  width: 1332px;
  backdrop-filter: blur(5px);
  background-color: rgba(64, 77, 97, 0.7);
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 100px;
}

@media (max-width: 550px) {
  .container {
    margin-top: 80px;
    width: calc(95vw - 2px);
    height: 600px;
  }

  .title {
    font-size: 48px;
    margin-bottom: 4vh;
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
