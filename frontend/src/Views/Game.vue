<template>
  <RouterView />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import { useWebSocketRouting } from '@/composables/useWebSocketRouting'
import { useGame } from '@/stores/gameStore'
import { useUser } from '@/stores/userStore'

const { user } = storeToRefs(useUser())
const gameStore = useGame()
const { createRoom } = gameStore
const { isConnected } = storeToRefs(gameStore)
const router = useRouter()

const mainTheme = ref<HTMLAudioElement | null>(null)
const mainThemeVolume = ref(0.1)

async function initializeWebSocketConnection() {
  if (!user.value?.id) {
    console.error('User not available, skipping WebSocket initialization')

    return
  }

  if (isConnected.value) {
    return
  }

  try {
    const newRoomCode = await createRoom()
    console.error('Created new room:', newRoomCode)
  }
  catch (error) {
    console.error('Failed to create room:', error)
  }
}

function exposeGlobalHelpers() {
  (window as any).gameHelpers = {
    gameStore,
  }
}

const { gotoLevelSelection, gotoMainMenu, gotoLevel } = useWebSocketRouting()

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
})

onMounted(async () => {
  if (!user.value) {
    router.push({ name: 'errorin' })

    return
  }

  // Initialize WebSocket connection
  await initializeWebSocketConnection()

  // Expose global helpers (for debugging)
  exposeGlobalHelpers()

  // Music setup
  if (!(window as any).musicIsPlaying) {
    mainTheme.value = new Audio('/src/sounds/mainTheme.mp3')
    mainTheme.value.volume = mainThemeVolume.value
    mainTheme.value.loop = true

    const playMainTheme = () => {
      if (mainTheme.value) {
        mainTheme.value.play().then(() => {
          (window as any).musicIsPlaying = true
        }).catch(() => {})
        window.removeEventListener('click', playMainTheme)
      }
    }
    window.addEventListener('click', playMainTheme)
  }
})
</script>
