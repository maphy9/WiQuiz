<template>
  <div class="route-container">
    <div
      v-for="i in 3"
      :key="i"
      class="route-rectangle"
    />
  </div>
</template>

<style scoped>
.route-container {
  display: flex;
  gap:24px;
}

.route-rectangle {
  width: 60%;
  height: 20px;

  border-style: solid;;
  border-width: 4px;
  border-radius: 7px;
  border-color: black;

  background-color: white;
}
</style>
