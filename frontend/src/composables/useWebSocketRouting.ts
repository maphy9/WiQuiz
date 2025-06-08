import { useGame } from '@/stores/gameStore'

export function useWebSocketRouting() {
  const { sendWebSocketMessage } = useGame()

  function gotoMainMenu() {
    sendWebSocketMessage({
      type: 'change_stage',
      stage: 'main-menu',
    })
  }

  function gotoLevelSelection() {
    sendWebSocketMessage({
      type: 'change_stage',
      stage: 'level-selection',
    })
  }

  function gotoLevel(levelIndex: number) {
    sendWebSocketMessage({
      type: 'change_stage',
      stage: 'level',
      levelIndex,
    })
  }

  function gotoLevelResults() {
    sendWebSocketMessage({
      type: 'change_stage',
      stage: 'level-results',
    })
  }

  return {
    gotoLevel,
    gotoMainMenu,
    gotoLevelSelection,
    gotoLevelResults,
  }
}
