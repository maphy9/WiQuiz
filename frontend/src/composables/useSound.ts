import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSoundStore = defineStore('sound', () => {
  const buttonClickSound = new Audio('/src/sounds/buttonClick.mp3')
  const levelMusic = new Audio('/src/sounds/gameInProcess.mp3')
  const mainTheme = ref<HTMLAudioElement | null>(null)

  const buttonClickVolume = ref(0.4)
  const levelMusicVolume = ref(0.2)
  const mainThemeVolume = ref(0.1)

  function onMountMainTheme() {
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
  }

  function playButtonSound() {
    buttonClickSound.volume = buttonClickVolume.value
    buttonClickSound.currentTime = 0
    buttonClickSound.play()
  }

  function playLevelMusic() {
    stopMainTheme()

    setTimeout(() => {
      levelMusic.volume = levelMusicVolume.value
      levelMusic.currentTime = 0
      levelMusic.loop = true
      levelMusic.play()
    }, 800)
  }

  function stopLevelMusic() {
    if (levelMusic) {
      levelMusic.pause()
      levelMusic.currentTime = 0;
      (window as any).musicIsPlaying = false
    }
  }

  function startMainTheme() {
    if (mainTheme.value) {
      mainTheme.value.play()
      mainTheme.value.currentTime = 0;
      (window as any).musicIsPlaying = true
    }
  }

  function stopMainTheme() {
    if (mainTheme.value) {
      mainTheme.value.pause()
      mainTheme.value.currentTime = 0;
      (window as any).musicIsPlaying = false
    }
  }

  return {
    playButtonSound,
    stopLevelMusic,
    playLevelMusic,
    startMainTheme,
    onMountMainTheme,
    stopMainTheme,
  }
})
