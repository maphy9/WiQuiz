<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps<{
  bonus: any
}>()

const { bonus } = toRefs(props)
</script>

<template>
  <img
    :class="`bonus-icon ${bonus.isAvailable
      ? 'available'
      : 'unavailable'}`"
    :src="bonus.image"
  >
</template>

<style scoped>
.bonus-icon {
  width: 100%;
  cursor: pointer;
  transition: all 0.3s;
}

.bonus-icon:hover {
  background-color: rgba(69, 80, 97, 0.5);
}

.available {
  opacity: 1;
  cursor: pointer;
  transition: all 0.3s;
}

.unavailable {
  opacity: 0.5;
  cursor: not-allowed;
  transition: all 0.3s;
}

@media only screen and (max-width: 800px) {
  .bonus-icon {
    width: 30vw;
    height: 30vw;
  }
}
</style>
