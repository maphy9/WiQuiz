<template>
  <div class="main">
    <div class="progress-bar-outer">
      <div class="progress-bar-middle">
        <div class="progress-bar-inner">
        </div>
      </div>
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
}








</style>
