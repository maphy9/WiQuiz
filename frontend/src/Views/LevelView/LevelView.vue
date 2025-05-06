<template>
  <div class="main">
    <div class="progress-bar-outer">
      <div class="progress-bar-middle">
        <div class="progress-bar-inner">
          <span class="common-text">
            70%
          </span>

        </div>
      </div>
    </div>
    <div class="title-container">
      <h1 class="title-text">
        WYBÓR TEMATÓW
      </h1>
    </div>
  </div>

</template>

<style scoped>

.main {
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
  background-image: url('@/images/levelBackground.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.progress-bar-outer {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  height: 40px;
  background-color: white;
  padding: 3px;
}

.progress-bar-middle {
  width: 100%;
  height: 100%;
  background-color: gray;
}

.progress-bar-inner {
  width: 70%;  /*progress */
  height: 100%;
  background-color: #80C997;

  display: flex;
  justify-content: center;
  align-items: center;
}

.title-container {
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  height: 100px;
  backdrop-filter: blur(5px);
  background-color: rgba(64, 77, 97, 0.7);

  display: flex;
  justify-content: center;
  align-items: center;
}

.common-text {
  color: white;
  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 1px;
  font-size: 42px;
  font-weight: 700;
  font-family: "Titillium Web", sans-serif;
}

.title-text {
  color: white;
  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 1px;
  font-size: 64px;
  font-weight: 700;
  font-family: "Titillium Web", sans-serif;
}

</style>
