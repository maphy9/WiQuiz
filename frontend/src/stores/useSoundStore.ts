import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSoundStore = defineStore('sound', () => {
  const levelMusic = ref<HTMLAudioElement | null>(null)
  const mainTheme = ref<HTMLAudioElement | null>(null)
  const buttonClickSound = ref<HTMLAudioElement | null>(null)
  const incorrectAnswerSound = ref<HTMLAudioElement | null>(null)
  const correctAnswerSound = ref<HTMLAudioElement | null>(null)
  const bonusSound = ref<HTMLAudioElement | null>(null)
  const timeBonusSound = ref<HTMLAudioElement | null>(null)
  const mistakeBonusSound = ref<HTMLAudioElement | null>(null)
  const reviveBonusSound = ref<HTMLAudioElement | null>(null)
  const resultsMusic = ref<HTMLAudioElement | null>(null)

  buttonClickSound.value = new Audio('/src/sounds/buttonClick.mp3')
  incorrectAnswerSound.value = new Audio('/src/sounds/incorrectAnswer.mp3')
  correctAnswerSound.value = new Audio('/src/sounds/correctAnswer.mp3')
  bonusSound.value = new Audio('/src/sounds/bonusSound.wav')
  timeBonusSound.value = new Audio('/src/sounds/bonusSound.wav')
  mistakeBonusSound.value = new Audio('/src/sounds/bonusSound.wav')
  reviveBonusSound.value = new Audio('/src/sounds/bonusSound.wav')
  resultsMusic.value = new Audio('/src/sounds/resultsMusic.mp3')
  levelMusic.value = new Audio('/src/sounds/gameInProcess.mp3')
  mainTheme.value = new Audio('/src/sounds/mainTheme.mp3')

  const buttonClickVolume = ref(0.4)
  const levelMusicVolume = ref(0.1)
  const mainThemeVolume = ref(0.1)
  const answerVolume = ref(0.4)
  const resultsMusicVolume = ref(0.1)

  function onMountMainTheme() {
    if (!(window as any).musicIsPlaying && mainTheme.value) {
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
    stopLevelMusic()

    if (correctAnswerSound.value) {
      correctAnswerSound.value.volume = answerVolume.value
      correctAnswerSound.value.currentTime = 0
      correctAnswerSound.value.play()
    }
    if (correctAnswerSound.value) {
      correctAnswerSound.value.onended = () => {
        if (resultsMusic.value && resultsMusic.value.paused && levelMusic.value) {
          levelMusic.value.play()
        }
      }
    }
  }

  function playInCorrectSound() {
    stopLevelMusic()

    if (incorrectAnswerSound.value) {
      incorrectAnswerSound.value.volume = answerVolume.value
      incorrectAnswerSound.value.currentTime = 0
      incorrectAnswerSound.value.play()
    }

    if (incorrectAnswerSound.value) {
      incorrectAnswerSound.value.onended = () => {
        if (resultsMusic.value && resultsMusic.value.paused && levelMusic.value) {
          levelMusic.value.play()
        }
      }
    }
  }

  function playResultsMusic() {
    stopLevelMusic()

    setTimeout(() => {
      if (resultsMusic.value) {
        resultsMusic.value.volume = resultsMusicVolume.value
        resultsMusic.value.currentTime = 0
        resultsMusic.value.loop = true
        resultsMusic.value.play()
      }
    }, 800)
  }

  function playButtonSound() {
    if (levelMusic.value && buttonClickSound.value) {
      buttonClickSound.value.volume = buttonClickVolume.value
      buttonClickSound.value.currentTime = 0
      buttonClickSound.value.play()
    }
  }
  function playBonusSound() {
    if (bonusSound.value) {
      bonusSound.value.volume = buttonClickVolume.value
      bonusSound.value.currentTime = 0
      bonusSound.value.play()
    }
  }

  function playTimeBonusSound() {
    if (timeBonusSound.value) {
      timeBonusSound.value.volume = buttonClickVolume.value
      timeBonusSound.value.currentTime = 0
      timeBonusSound.value.play()
    }
  }

  function playMistakeBonusSound() {
    if (mistakeBonusSound.value) {
      mistakeBonusSound.value.volume = buttonClickVolume.value
      mistakeBonusSound.value.currentTime = 0
      mistakeBonusSound.value.play()
    }
  }

  function playReviveBonusSound() {
    if (reviveBonusSound.value) {
      reviveBonusSound.value.volume = buttonClickVolume.value
      reviveBonusSound.value.currentTime = 0
      reviveBonusSound.value.play()
    }
  }

  function playLevelMusic() {
    stopMainTheme()

    setTimeout(() => {
      if (levelMusic.value) {
        levelMusic.value.volume = levelMusicVolume.value
        levelMusic.value.currentTime = 0
        levelMusic.value.loop = true
        levelMusic.value.play()
      }
    }, 800)
  }
  function startMainTheme() {
    if (mainTheme.value) {
      mainTheme.value.play()
      mainTheme.value.currentTime = 0;
      (window as any).musicIsPlaying = true
    }
  }

  function stopLevelMusic() {
    if (levelMusic.value) {
      levelMusic.value.pause()
      levelMusic.value.currentTime = 0;
      (window as any).musicIsPlaying = false
    }
  }

  function stopMainTheme() {
    if (mainTheme.value) {
      mainTheme.value.pause()
      mainTheme.value.currentTime = 0;
      (window as any).musicIsPlaying = false
    }
  }

  function stopResultsMusic() {
    if (resultsMusic.value) {
      resultsMusic.value.pause()
      resultsMusic.value.currentTime = 0
    }
  }

  return {
    levelMusic,
    playButtonSound,
    stopResultsMusic,
    playInCorrectSound,
    playCorrectSound,
    playResultsMusic,
    stopLevelMusic,
    playLevelMusic,
    startMainTheme,
    onMountMainTheme,
    stopMainTheme,
    playBonusSound,
    playTimeBonusSound,
    playMistakeBonusSound,
    playReviveBonusSound,
  }
})
