import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useGame } from '@/stores/gameStore'
import { useUser } from '@/stores/userStore'

export function useWebSocket() {
  const gameStore = useGame()
  const { user } = storeToRefs(useUser())
  const {
    isConnected,
    roomCode,
    gameStage,
  } = storeToRefs(gameStore)

  const canConnect = computed(() => !!user.value?.id)
  const connectionStatus = computed(() => {
    if (!canConnect.value)
      return 'no-user'
    if (isConnected.value)
      return 'connected'

    return 'disconnected'
  })

  async function createRoom() {
    if (!canConnect.value) {
      throw new Error('User must be logged in to create a room')
    }

    return await gameStore.createRoom()
  }

  async function joinRoom(code: string) {
    if (!canConnect.value) {
      throw new Error('User must be logged in to join a room')
    }
    if (!code || code.length !== 6) {
      throw new Error('Room code must be 6 digits')
    }

    return await gameStore.connectToRoom(code)
  }

  function leaveRoom() {
    gameStore.disconnectFromRoom()
  }

  function startLevel(levelId: number) {
    if (!isConnected.value) {
      throw new Error('Not connected to a room')
    }
    gameStore.startLevel(levelId)
  }

  function changeGameStage(stage: string, levelId?: number) {
    if (!isConnected.value) {
      throw new Error('Not connected to a room')
    }
    gameStore.changeStage(stage, levelId)
  }

  function returnToMenu() {
    if (!isConnected.value) {
      throw new Error('Not connected to a room')
    }
    gameStore.returnToMainMenu()
  }

  function useBonus(bonusId: string, data?: any) {
    if (!isConnected.value) {
      throw new Error('Not connected to a room')
    }
    gameStore.useBonus(bonusId, data)
  }

  function sendMessage(message: any) {
    if (!isConnected.value) {
      throw new Error('Not connected to a room')
    }
    gameStore.sendWebSocketMessage(message)
  }

  async function connectToRoom(code?: string) {
    try {
      if (code) {
        await joinRoom(code)
      }
      else {
        const newRoomCode = await createRoom()
        console.error('Created new room:', newRoomCode)
      }
    }
    catch (error) {
      console.error('Failed to connect to room:', error)
      throw error
    }
  }

  return {
    isConnected,
    roomCode,
    gameStage,
    canConnect,
    connectionStatus,
    createRoom,
    connectToRoom,
    joinRoom,
    leaveRoom,
    startLevel,
    changeGameStage,
    returnToMenu,
    useBonus,
    sendMessage,
  }
}
