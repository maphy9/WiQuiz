import type { Ref } from 'vue'
import type Answer from '@/types/Answer'
import type Level from '@/types/Level'
import type Teammate from '@/types/Teammate'
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useUser } from './userStore'

export const useGame = defineStore('gameStore', () => {
  const { user } = storeToRefs(useUser())

  // WebSocket connection
  const websocket: Ref<WebSocket | null> = ref(null)
  const roomCode: Ref<string | null> = ref(null)
  const isConnected = ref(false)
  const gameStage = ref('main-menu')
  const currentLevelId: Ref<number | null> = ref(null)

  // Stats
  const correctAnswers = ref(0)

  function initStats() {
    correctAnswers.value = 0
  }

  // Team
  const team: Ref<Teammate[]> = ref([])

  // WebSocket Methods
  function connectToRoom(code: string) {
    if (!user.value) {
      console.error('Not logged in')

      return new Promise(reject => reject)
    }

    return new Promise<void>((resolve, reject) => {
      if (websocket.value) {
        websocket.value.close()
      }

      roomCode.value = code
      const wsUrl = `ws://localhost:8000/ws/${code}/${user.value?.id}`

      websocket.value = new WebSocket(wsUrl)

      websocket.value.onopen = () => {
        console.error('Connected to room:', code)
        isConnected.value = true
        resolve()
      }

      websocket.value.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          handleWebSocketMessage(data)
        }
        catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }

      websocket.value.onclose = () => {
        console.error('Disconnected from room')
        isConnected.value = false
        websocket.value = null
      }

      websocket.value.onerror = (error) => {
        console.error('WebSocket error:', error)
        isConnected.value = false
        reject(error)
      }
    })
  }

  function createRoom(): Promise<string> {
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    return connectToRoom(code).then(() => {
      return code
    })
  }

  function joinRoom(code: string) {
    return connectToRoom(code)
  }

  function disconnectFromRoom() {
    if (websocket.value) {
      websocket.value.close()
      websocket.value = null
    }
    isConnected.value = false
    roomCode.value = null
  }

  function sendWebSocketMessage(message: any) {
    if (websocket.value && websocket.value.readyState === WebSocket.OPEN) {
      websocket.value.send(JSON.stringify(message))
    }
    else {
      console.error('WebSocket not connected')
    }
  }

  function handleWebSocketMessage(data: any) {
    console.error('Received message:', data)

    switch (data.type) {
      case 'change_stage':
        gameStage.value = data.stage
        if (data.levelId) {
          currentLevelId.value = data.levelId
        }
        break

      case 'vote':
        handlePlayerVote(data)
        break

      case 'use_bonus':
        handleBonusUsage(data)
        break

      case 'teammates_list':
        team.value = data.teammates
        break

      case 'players_update':
        team.value = data.players.map((player: any) => ({
          user: player,
          isAlive: true,
          selectedAnswer: null,
          score: 0,
        }))
        console.error(team.value)
        break

      default:
        console.warn('Unhandled message type:', data.type)
        break
    }
  }

  function handlePlayerVote(data: any) {
    console.error('Player voted:', data)
  }

  function handleBonusUsage(data: any) {
    console.error('Bonus used:', data)
  }

  function changeStage(stage: string, levelId?: number) {
    const message: any = {
      type: 'change_stage',
      stage,
    }

    if (levelId) {
      message.levelId = levelId
    }

    sendWebSocketMessage(message)
  }

  function startLevel(levelId: number) {
    changeStage('playing', levelId)
  }

  function returnToMainMenu() {
    changeStage('main-menu')
  }

  function submitVote(questionId: number, selectedAnswer: Answer) {
    const message = {
      type: 'vote',
      questionId,
      selectedAnswer,
      playerId: user.value?.id,
    }

    sendWebSocketMessage(message)
    selectAnswer(selectedAnswer)
  }

  function useBonus(bonusId: string, additionalData?: any) {
    const message = {
      type: 'use_bonus',
      bonusId,
      playerId: user.value?.id,
      ...additionalData,
    }

    sendWebSocketMessage(message)
  }

  function selectAnswer(answer: Answer) {
    for (const teammate of team.value) {
      if (teammate.user === user.value) {
        teammate.selectedAnswer = answer
        if (answer.IsCorrect) {
          teammate.score += 5
        }
        break
      }
    }
  }

  function getChosenAnswer() {
    const selectedAnswers: any = {}
    for (const teammate of team.value) {
      if (teammate.selectedAnswer === null) {
        continue
      }
      if (teammate.selectedAnswer.AnswerText in selectedAnswers) {
        selectedAnswers[teammate.selectedAnswer.AnswerText].votes += 1
      }
      else {
        selectedAnswers[teammate.selectedAnswer.AnswerText] = {
          answer: teammate.selectedAnswer,
          votes: 1,
        }
      }
    }

    let maxVotes = 0
    for (const key in selectedAnswers) {
      if (maxVotes < selectedAnswers[key].votes) {
        maxVotes = selectedAnswers[key].votes
      }
    }

    if (maxVotes === 0) {
      return null
    }

    const chosenAnswers = []
    for (const key in selectedAnswers) {
      if (selectedAnswers[key].votes === maxVotes) {
        chosenAnswers.push(selectedAnswers[key].answer)
      }
    }

    const chosenAnswer: Answer = chosenAnswers[Math.floor(Math.random() * chosenAnswers.length)]

    for (const teammate of team.value) {
      if (teammate.selectedAnswer === chosenAnswer) {
        teammate.score += 3
      }
    }

    if (chosenAnswer.IsCorrect) {
      correctAnswers.value += 1
    }

    return chosenAnswers[Math.floor(Math.random() * chosenAnswers.length)]
  }

  function removeSelectedAnswers() {
    for (let i = 0; i < team.value.length; i++) {
      team.value[i].selectedAnswer = null
    }
  }

  function killRandom() {
    const aliveTeammates = team.value.filter((teammate: Teammate) => teammate.isAlive)
    const randomAliveTeammate = aliveTeammates[Math.floor(Math.random() * aliveTeammates.length)]

    for (let i = 0; i < team.value.length; i++) {
      if (team.value[i] === randomAliveTeammate) {
        team.value[i].isAlive = false
        break
      }
    }

    return randomAliveTeammate
  }

  function initTeam() {
    for (let i = 0; i < team.value.length; i++) {
      team.value[i].selectedAnswer = null
      team.value[i].isAlive = true
      team.value[i].score = 0
    }
  }

  // Level
  const levels: Ref<Level[]> = ref([])
  const currentLevel: Ref<Level | null> = ref(null)

  function cleanup() {
    disconnectFromRoom()
  }

  return {
    user,
    team,
    selectAnswer,
    getChosenAnswer,
    removeSelectedAnswers,
    killRandom,
    initTeam,
    currentLevel,
    levels,
    initStats,
    correctAnswers,
    websocket,
    roomCode,
    isConnected,
    gameStage,
    currentLevelId,
    createRoom,
    joinRoom,
    disconnectFromRoom,
    sendWebSocketMessage,
    changeStage,
    startLevel,
    returnToMainMenu,
    submitVote,
    useBonus,
    cleanup,
  }
})
