<template>
  <div class="join-view">
    <LanguageButton />
      <div class="content-square">

        <div>
          <h1 class="title-text">Your code:</h1>
          <div class="input-group">
            <div class="code-input">
              <input
                type="text"
                class="input input-text"
                :value="codeInput"
                readonly
              />

              <button class="copy-button" @click="copyCode" />
            </div>
          </div>
      </div>

      <div>
        <h1 class="title-text input-group">Join team</h1>
          <div class="input-group">
            <p class="text">Enter team code: </p>
            <div class="code-input">
              <input
                type="text"
                class="input input-text"
                maxlength="6"
                value="1  2  4  5  3  6"
              />

              <button class="paste-button" />
            </div>
          </div>
      </div>

      </div>
      <ReturnButton />
  </div>
</template>

<script lang="ts" setup>
import LanguageButton from '@/components/SharedComponents/LanguageButton.vue';
import ReturnButton from '@/components/SharedComponents/ReturnButton.vue';
import { ref } from 'vue'

const codeInput = ref("6  2  3  1  6  2")

function copyCode() {
  if (codeInput.value) {
    navigator.clipboard.writeText(codeInput.value.toString())
  }
}

</script>

<style scoped>

.input-group {
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-text{
  color: black;
  font-weight: bold;
  font-size: 64px;
  font-family: "Titillium Web";
  text-align: center;
}

.code-input {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px;
}

.copy-button{
  width: 100px;
  height: 100px;
  border: black;
  background-color: white;
  background-image: url('@/images/clipboard.png');
  background-size: 100px;
  background-repeat: no-repeat;
  border-color: black;
  border-width: 1px;
  border-style: solid;
  transition: all 0.3s ease;
  cursor: pointer;
  box-sizing: border-box;
}

.paste-button{
  width: 100px;
  height: 100px;
  border: black;
  background-color: white;
  background-image: url('@/images/arrow.png');
  background-size: 100px;
  background-repeat: no-repeat;
  border-color: black;
  border-width: 1px;
  border-style: solid;
  transition: all 0.3s ease;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  cursor: pointer;
  box-sizing: border-box;
}
.copy-button:active, .paste-button:active {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
  background-color: rgba(255, 255, 255, 0.9);
}
.paste-button:active{
  transform: scaleX(-1) scale(1.05);
}

.text {
  color: white;
  font-size: 48px;
  font-family: "Titillium Web";
}

.input {
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

.join-view {
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

.title-text {
  color: white;
  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 1px;
  font-size: 64px;
  font-weight: 700;
  font-family: "Titillium Web", sans-serif;
}

.content-square {
  margin-top: 70px;
  margin-bottom: 80px;
  width: 1332px;
  backdrop-filter: blur(5px);
  background-color: rgba(64, 77, 97, 0.7);
  border-color: black;
  border-width: 1px;
  border-style: solid;
  display: flex;
  flex-direction: column;
  gap: 100px;
}
@media (max-width: 550px) {
  .content-square {
    margin-top: 80px;
    width: 95vw;
    height: 600px;
    backdrop-filter: blur(3px);
    background-color: rgba(64, 77, 97, 0.7);
    border-width: 0;
  }

  .title-text {
    font-size: 48px;
    -webkit-text-stroke-width: 1px;
    margin-bottom: 4vh;
  }

  .text {
    font-size: 32px;
    text-align: center;
  }

  .input-text {
    font-size: 42px;
    width: 100%;
    padding: 6px 0;
    text-align: center;
  }

  .input {
    width: calc(100% - 70px);
    height: 72px;
  }

  .input-group {
    display: flex;
    flex-direction: column;
  }

  .copy-button,
  .paste-button {
    width: 70px;
    height: 72px;
    background-size: 70px;

  }

  .join-view {
    padding: 0px;
    background-size: cover;
    background-position: center;
  }
}
</style>
