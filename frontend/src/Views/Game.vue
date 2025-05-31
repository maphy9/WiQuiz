<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const mainTheme = ref<HTMLAudioElement | null>(null)
const mainThemeVolume = ref(0.1)

onMounted(() => {
  if (!(window as any).musicIsPlaying) {
    mainTheme.value = new Audio('/src/sounds/mainTheme.mp3')
    mainTheme.value.volume = mainThemeVolume.value
    mainTheme.value.loop = true

    const playMainTheme = () => {
      if (mainTheme.value) {
        mainTheme.value.play().then(() => {
          (window as any).musicIsPlaying = true
        }).catch(() => {
        })
        window.removeEventListener('click', playMainTheme)
      }
    }
    window.addEventListener('click', playMainTheme)
  }
})
</script>
