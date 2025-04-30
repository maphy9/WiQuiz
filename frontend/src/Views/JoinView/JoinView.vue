<template>
  <div class="join-view">
      <div class="content-square">

        <div class="margin">
            <h1 class="title-text">Twój kod:</h1>
            <div class="input-group">
              <input type="text"
              class="input input-text"
              value=" 6  2  3  1  6  2 "
              readonly />

              <button class="copy-button" />
          </div>
        </div>

        <div class="margin-title">

          <h1 class="title-text">Dołącz do zespołu</h1>

          <div class="input-group">

            <div class="label-and-input">
              <p class="text">Wpisz kod zespołu: </p>
              <input
              type="text"
              class="input input-text"
              value=" 1  2  4  5  3  6 "
              readonly />
            </div>

            <button
            class="paste-button" />
          </div>
        </div>

      </div>
  </div>
</template>

<script lang="ts" setup>

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
  font-family: "Titilium Web";
  letter-spacing: 1px;
}

.label-and-input {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.copy-button{
  width: 100px;
  height: 104px;
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
}

.paste-button{
  width: 100px;
  height: 104px;
  border: black;
  background-color: white;
  background-image: url('@/images/arrowRight.png');
  background-size: 100px;
  background-repeat: no-repeat;
  padding-left: 10px;
  border-color: black;
  border-width: 1px;
  border-style: solid;
  transition: all 0.3s ease;
}
.copy-button:active, .paste-button:active {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
  background-color: rgba(255, 255, 255, 0.9);
}

.text {
  color: white;
  font-size: 48px;
  font-family: "Titilium Web";
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
  -webkit-text-stroke-width: 1.1px;
  font-size: 64px;
  font-weight: 700;
  font-family: "Titilium Web", sans-serif;
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
