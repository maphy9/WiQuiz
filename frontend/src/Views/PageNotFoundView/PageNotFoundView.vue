<template>
  <div class="main-container">
    <div class="error-404">
      <span>4</span>

      <span>0</span>

      <span>4</span>
    </div>

    <div class="error-img">
      <img
        src="@/images/okak.png"
        alt="Error Image"
      >

      <h1 class="error-msg">
        Masakra
      </h1>
    </div>
  </div>
</template>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Titillium Web", sans-serif;
}
.main-container {
  position: relative;
  height: 100vh;
  background: #080607;
  overflow: hidden;
  color: #fff;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.error-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 100px;
  font-weight: bold;
}
.error-img {
  position: relative;
  bottom: 0;
  max-width: 100vw;
  margin-top: 150px;
  animation: catAnim 1.5s ease forwards;
}
.error-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.error-img h1{
  font-size: 80px;
  text-align: center;
  font-family: sans-serif;
}
.error-msg {
  position: absolute;
  bottom: 100px;
  top: 60%;
  left: 50%;
  translate: -50% 0;
  font-weight: 900;
  font-size: 115px;
}
.error-404 {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 600px;
  font-weight: 800;
  transform: translate(-50%, 800px);
  animation: errorAnim 1.5s ease forwards;
  display:flex;
  gap: 125px;
}
@keyframes errorAnim {
    100% {
        transform: translate(-50%, -400px);
    }
}
@keyframes catAnim {
  0% {
    translate: 0 50%;
  }
  100% {
    translate: 0 0;
  }
}
@media (max-width: 600px) {
  .error-404 {
    margin-top: 100px;
    font-size: 60px;
    gap: 50px;
  }
  .error-msg {
    font-size: 40px;
    font-weight: 400;;
  }
  .error-img {
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100vw;
    height: 80vh;
    text-align: center;
    margin: 0;
    padding: 0;
  }
  .error-img img {
    width: 100vw;
    height: 100%;
    object-fit: cover;
    display: block;
  }

}
</style>
