<template>
  <div class="join-view">
    <LanguageButton />
      <div class="content-square">

        <div class="margin">
          <h1 class="title-text">Your code:</h1>
          <div class="input-group">
            <div class="code-input">
              <input type="text"
              class="input input-text"
              value="623162"
              readonly />

              <button class="copy-button" />
            </div>
          </div>
        </div>

        <div class="margin-title">

          <h1 class="title-text">Join team</h1>

          <div class="input-group">
            <p class="text">Enter team code: </p>
            <div class="code-input">
            
            <input
              type="text"
              class="input input-text"
              maxlength="6"
              inputmode="numeric"
              value="124536"
              pattern="\d*"
              oninput="this.value = this.value.replace(/[^0-9]/g, '')"
            />
            
            <button
            class="paste-button" />
            </div>
          </div>
            
        </div>

      </div>
  </div>
</template>

<script lang="ts" setup>
import LanguageButton from '@/components/SharedComponents/LanguageButton.vue';


</script>

<style>

.margin{
  margin-top: 85px;
}
.margin-title{
  margin-top: 100px;
}
.input-group {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.input-text{
  color: black;
  font-weight: bold;
  font-size: 64px;
  font-family: "Titillium Web";
  letter-spacing: 30px;
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
  height: 102px;
  border: black;
  background-color: white;
  background-image: url('@/images/clipboard.png');
  background-size: 95px;
  background-repeat: no-repeat;
  padding-left: 10px;
  border-color: black;
  border-width: 1px;
  border-style: solid;
  transition: all 0.3s ease;
  cursor: pointer;
}

.paste-button{
  width: 100px;
  height: 102px;
  border: black;
  background-color: white;
  background-image: url('@/images/arrow.png');
  background-size: 100px;
  background-repeat: no-repeat;
  padding-left: 10px;
  border-color: black;
  border-width: 1px;
  border-style: solid;
  transition: all 0.3s ease;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  cursor: pointer;
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
  padding-left: 10px;
  border-color: black;
  border-width: 1px;
  border-style: solid;
  font-family: "Titillium Web";
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
  height: 715px;
  width: 1332px;
  backdrop-filter: blur(5px);
  background-color: rgba(64, 77, 97, 0.7);
  border-color: black;
  border-width: 1px;
  border-style: solid;
}
</style>
