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
const { initializeWebSocketConnection } = useGame()
const router = useRouter()

const mainTheme = ref<HTMLAudioElement | null>(null)
const mainThemeVolume = ref(0.1)

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
    router.push({ name: 'login' })

    return
  }

  // Initialize WebSocket connection
  await initializeWebSocketConnection()

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
