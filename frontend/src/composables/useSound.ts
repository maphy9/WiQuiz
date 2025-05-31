import { ref } from 'vue'

export function useSound() {
  const buttonClickSound = new Audio('/src/sounds/buttonClick.mp3')
  const buttonClickVolume = ref(0.4)

  function playButtonSound() {
    buttonClickSound.volume = buttonClickVolume.value
    buttonClickSound.currentTime = 0
    buttonClickSound.play()
  }

  return {
    playButtonSound,
  }
}
