<template>
  <div class="card-container">
    <div class="card-circle">
      <img src="@/images/lock.png" alt="arrow" class="card-img" />
    </div>
    <div class="card-text">
      Pochodne
    </div>
  </div>
</template>


<style scoped>

.card-container {
  width: 180px;
  height: 200px;

  position: relative;
  align-items: center;
  justify-content: center;
  display: flex;

  backdrop-filter: blur(5px);
  background-color: rgba(178, 196, 217, 0.7);

  border-color: black;
  border-width: 2px;
  border-style: solid;
}

.card-container:active {
  transform: scale(1.05);
  background-color: rgba(161, 179, 199, 0.7);
}

.card-circle {
  width: 115px;
  height: 115px;

  position: absolute;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);

  background-color: #8B231D;
  background-size: cover;

  border-radius: 50%;
  bottom: 10%;
}

.card-img {
  width: 100%;
  height: 100%;
  margin-bottom: 5px;
}

.card-text {
  color: white;
  user-select: none;

  position: absolute;
  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 1px;

  font-size: 36px;
  font-weight: 700;
  font-family: "Titillium Web", sans-serif;

  bottom: 65%;
}
</style>
