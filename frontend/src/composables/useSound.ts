import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSoundStore = defineStore('sound', () => {
  const buttonClickSound = new Audio('/src/sounds/buttonClick.mp3')
  const levelMusic = new Audio('/src/sounds/gameInProcess.mp3')
  const incorrectAnswerSound = new Audio('/src/sounds/incorrectAnswer.mp3')
  const correctAnswerSound = new Audio('/src/sounds/correctAnswer.mp3')
  const mainTheme = ref<HTMLAudioElement | null>(null)

  const buttonClickVolume = ref(0.4)
  const levelMusicVolume = ref(0.2)
  const mainThemeVolume = ref(0.1)
  const answerVolume = ref(0.4)

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

  function playCorrectSound() {
    levelMusic.pause()

    correctAnswerSound.volume = answerVolume.value
    correctAnswerSound.currentTime = 0
    correctAnswerSound.play()

    setTimeout(() => {
      levelMusic.play()
    }, 3000)
  }

  function playInCorrectSound() {
    levelMusic.pause()

    incorrectAnswerSound.volume = answerVolume.value
    incorrectAnswerSound.currentTime = 0
    incorrectAnswerSound.play()

    setTimeout(() => {
      levelMusic.play()
    }, 3000)
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
    levelMusic,
    playButtonSound,
    playInCorrectSound,
    playCorrectSound,
    stopLevelMusic,
    playLevelMusic,
    startMainTheme,
    onMountMainTheme,
    stopMainTheme,
  }
})
