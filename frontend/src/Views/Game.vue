<template>
  <RouterView />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import { useWebSocketRouting } from '@/composables/useWebSocketRouting'
import { useGame } from '@/stores/gameStore'
import { useUser } from '@/stores/userStore'

const { user } = storeToRefs(useUser())
const { initializeWebSocketConnection } = useGame()
const router = useRouter()

const { gotoLevelSelection, gotoMainMenu, gotoLevel, gotoLevelResults } = useWebSocketRouting()

onBeforeRouteUpdate((to) => {
  if (to.name === 'main') {
    gotoMainMenu()
  }
  else if (to.name === 'level-selection') {
    gotoLevelSelection()
  }
  else if (to.name === 'level') {
    const levelIndex = Number.parseInt(to.params.levelIndex as string)
    gotoLevel(levelIndex)
  }
  else if (to.name === 'level-results') {
    gotoLevelResults()
  }
})

onMounted(async () => {
  if (!user.value) {
    router.push({ name: 'errorin' })

    return
  }

  // Initialize WebSocket connection
  await initializeWebSocketConnection()
})
</script>
