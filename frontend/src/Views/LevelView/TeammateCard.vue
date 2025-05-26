<script setup lang="ts">
import type Teammate from '@/types/Teammate'
import { storeToRefs } from 'pinia'
import { toRefs } from 'vue'
import { useUser } from '@/stores/userStore'

const props = defineProps<{
  teammate: Teammate
}>()

const { teammate } = toRefs(props)
const { user } = storeToRefs(useUser())
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
        'textDecoration': teammate.user === user
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
</style>
