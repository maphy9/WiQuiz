<script setup lang="ts">
import type Teammate from '@/types/Teammate'
import { storeToRefs } from 'pinia'
import { toRefs } from 'vue'
import { useGame } from '@/stores/gameStore'

const props = defineProps<{
  teammate: Teammate
}>()

const { teammate } = toRefs(props)
const { user } = storeToRefs(useGame())
</script>

<template>
  <div
    :class="`teammate ${teammate.isAlive
      ? 'alive'
      : 'dead'}`"
  >
    <img
      class="teammate-avatar"
      :src="teammate.user.avatar"
    >

    <span
      class="teammate-name"
      :style="{
        'textDecoration': teammate.user.id === user?.id
          ? 'underline'
          : 'none',
      }"
    >
      {{ teammate.user.name }}
    </span>
  </div>
</template>

<style scoped>
.teammate {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.teammate-avatar {
  border-radius: 50%;
  width: 50%;
  height: 50%;
}

.teammate-name {
  font-size: 32px;
  color: white;
}

.alive {
  opacity: 1;
  text-decoration: none;
  transition: all 0.3s;
}

.dead {
  opacity: 0.5;
  text-decoration: line-through;
  transition: all 0.3s;
}

@media only screen and (max-width: 800px) {
  .teammate {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
    width: 25%;
    height: 34px;
  }

  .teammate-avatar {
    border-radius: 50%;
    height: 32px;
    width: 32px;
  }

  .teammate-name {
    font-size: 15px;
    color: white;
  }
}
</style>
