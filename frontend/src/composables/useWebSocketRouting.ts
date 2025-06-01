import { useGame } from '@/stores/gameStore'
import { useSound } from './useSound'

export function useWebSocketRouting() {
  const { playButtonSound } = useSound()
  const { sendWebSocketMessage } = useGame()

  function gotoMainMenu() {
    playButtonSound()
    sendWebSocketMessage({
      type: 'change_stage',
      stage: 'main-menu',
    })
  }

  function gotoLevelSelection() {
    playButtonSound()
    sendWebSocketMessage({
      type: 'change_stage',
      stage: 'level-selection',
    })
  }

  function gotoLevel(levelIndex: number) {
    playButtonSound()
    sendWebSocketMessage({
      type: 'change_stage',
      stage: 'level',
      levelIndex,
    })
  }

  return {
    gotoLevel,
    gotoMainMenu,
    gotoLevelSelection,
  }
}
