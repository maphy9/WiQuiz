import type { Ref } from 'vue'
import type Answer from '@/types/Answer'
import type Level from '@/types/Level'
import type Question from '@/types/Question'
import type Teammate from '@/types/Teammate'
import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useSoundStore } from '@/stores/useSoundStore'
import { addAnswerForBebrik, getLevels } from '@/utils/fetchUtils'
import { useUser } from './userStore'

const ip = import.meta.env.VITE_IP
const port = import.meta.env.VITE_PORT

export const useGame = defineStore('gameStore', () => {
  const { playInCorrectSound, playBonusSound } = useSoundStore()
  const { user } = storeToRefs(useUser())
  const { t } = useI18n()

  // WebSocket connection
  const websocket: Ref<WebSocket | null> = ref(null)
  const roomCode: Ref<string | null> = ref(null)
  const isConnected = ref(false)
  const gameStage = ref('main-menu')
  const currentLevelIndex = ref(0)
  const currentQuestionIndex = ref(0)
  const currentQuestion: Ref<Question | null> = ref(null)

  const canGoToLevel = ref(false)

  const router = useRouter()

  // Messages
  const messages: Ref<any[]> = ref([])

  function showMessage(text: string, color: string) {
    const message = { text, color }
    messages.value.push(message)
    setTimeout(() => {
      messages.value = messages.value.filter((_message: any) => _message.text !== message.text)
    }, 3000)
  }

  watch(gameStage, () => {
    switch (gameStage.value) {
      case 'main-menu':
        router.push({ name: 'main' })
        break
      case 'level-selection':
        router.push({ name: 'level-selection' })
        break
      case 'level':
        canGoToLevel.value = true
        router.push({ name: 'level', params: { levelIndex: currentLevelIndex.value } })
        break
    }
  })

  // Stats
  const correctAnswers = ref(0)

  function initStats() {
    correctAnswers.value = 0
  }

  // Team
  const team: Ref<Teammate[]> = ref([])
  const chosenAnswer: Ref<Answer | null> = ref(null)

  // Bebrik
  const me = computed(() => {
    return team.value.find((teammate: Teammate) => teammate.user.id === user.value?.id)
  })

  // Bonuses
  const bonuses = ref({
    mistakeBonus: { image: '/images/mistakeBonus.png', onClick: useMistakeBonus, isAvailable: true },
    timeBonus: { image: '/images/timeBonus.png', onClick: useTimeBonus, isAvailable: true },
    reviveBonus: { image: '/images/reviveBonus.png', onClick: useReviveBonus, isAvailable: true },
  })

  function initBonuses() {
    bonuses.value = {
      mistakeBonus: { image: '/images/mistakeBonus.png', onClick: useMistakeBonus, isAvailable: true },
      timeBonus: { image: '/images/timeBonus.png', onClick: useTimeBonus, isAvailable: true },
      reviveBonus: { image: '/images/reviveBonus.png', onClick: useReviveBonus, isAvailable: true },
    }
  }

  // Bebra 52
  const answers: Ref<any[]> = ref([])
  const isChosen = ref(false)
  const timeOut = ref(false)

  // Timer
  const initialTime = 60
  const maxTime = ref(initialTime)
  const timeLeft = ref(initialTime)
  const timeLeftFormatted = computed(() => {
    const minutes = Math.floor(timeLeft.value / 60)
    const seconds = timeLeft.value % 60

    return `${minutes}:${seconds < 10
      ? '0'
      : ''}${seconds}`
  })
  const timebarProgress = computed(() => timeLeft.value * 100 / maxTime.value)
  const progressColor = computed(() => {
    if (timebarProgress.value > 60) {
      return '#80C997'
    }

    if (timebarProgress.value > 20) {
      return '#F4D064'
    }

    return '#E4583B'
  })
  const timeLeftInterval: Ref<number | null> = ref(null)

  // Level
  const levels: Ref<Level[]> = ref([])
  const currentLevel: Ref<Level | null> = ref(null)

  async function initLevels() {
    levels.value = await getLevels()
    currentLevel.value = null
  }

  // WebSocket Methods
  function connectToRoom(code: string) {
    if (!user.value) {
      console.error('Not logged in')

      return new Promise(resolve => resolve('Not logged in'))
    }

    return new Promise<void>((resolve, reject) => {
      const setupWebSocket = () => {
        roomCode.value = code
        const wsUrl = `ws://${ip}:${port}/ws/${code}/${user.value?.id}`
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
      }

      if (websocket.value && websocket.value.readyState === WebSocket.OPEN) {
        websocket.value.onclose = () => {
          setupWebSocket()
        }
        websocket.value.close()
      }
      else {
        setupWebSocket()
      }
    })
  }

  async function createRoom() {
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    await connectToRoom(code)

    return code
  }

  async function initializeWebSocketConnection() {
    if (!user.value?.id) {
      console.error('User not available, skipping WebSocket initialization')

      return
    }

    if (isConnected.value) {
      return
    }

    try {
      const newRoomCode = await createRoom()
      console.error('Created new room:', newRoomCode)
    }
    catch (error) {
      console.error('Failed to create room:', error)
    }
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
        if (data.levelIndex) {
          currentLevelIndex.value = data.levelIndex
        }
        break

      case 'vote':
        handlePlayerVote(data)
        break

      case 'choose_answer':
        handleChooseAnswer(data.answer)
        break

      case 'kill_player':
        handleKillPlayer(data.player)
        break

      case 'use_time_bonus':
        handleTimeBonus()
        break

      case 'use_mistake_bonus':
        handleMistakeBonus(data.index)
        break

      case 'use_revive_bonus':
        handleReviveBonus(data.index)
        break

      case 'teammates_list':
        team.value = data.teammates
        break

      case 'players_update':
        handlePlayersUpdate(data.players)
        break

      case 'set_avatar':
        handlePlayerSetAvatar(data.player, data.avatar)
        break

      default:
        console.warn('Unhandled message type:', data.type)
        break
    }
  }

  function handlePlayerSetAvatar(player: any, avatar: string) {
    for (const teammate of team.value) {
      if (player.user.id === teammate.user.id) {
        teammate.user.avatar = avatar
      }
    }
  }

  function getRandomAvailableAvatar() {
    const avatars: any = {}
    for (let i = 0; i < 5; i++) {
      avatars[`/images/avatar${i}.jpg`] = true
    }

    for (const teammate of team.value) {
      avatars[teammate.user.avatar] = undefined
    }

    const availableAvatars = []
    for (const key of Object.keys(avatars)) {
      if (avatars[key]) {
        availableAvatars.push(key)
      }
    }

    const randomIndex = Math.floor(Math.random() * availableAvatars.length)

    return availableAvatars[randomIndex]
  }

  function handlePlayersUpdate(players: any) {
    const newPlayers = players.map((player: any) => ({
      user: {
        ...player,
        avatar: '/images/emptyPfp.png',
      },
      isAlive: true,
      selectedAnswer: null,
      score: 0,
    }))
    for (let i = 0; i < newPlayers.length; i++) {
      const newPlayer = newPlayers[i]
      const oldPlayer = team.value.find((teammate: Teammate) => teammate.user.id === newPlayer.user.id)
      if (oldPlayer) {
        newPlayer.isAlive = oldPlayer.isAlive
        newPlayer.score = oldPlayer.score
        newPlayer.selectedAnswer = oldPlayer.selectedAnswer
        newPlayer.user.avatar = oldPlayer.user.avatar
      }
    }
    team.value = newPlayers

    for (const teammate of team.value) {
      if (user.value?.id === teammate.user.id) {
        sendWebSocketMessage({
          type: 'set_avatar',
          player: teammate,
          avatar: teammate.user.avatar === '/images/emptyPfp.png'
            ? getRandomAvailableAvatar()
            : teammate.user.avatar,
        })
      }
    }

    const answer = getChosenAnswer()
    if (answer) {
      chooseAnswer()
    }
    else {
      handleGameOver()
    }
  }

  function handleGameOver() {
    let areAllDead = true
    for (const teammate of team.value) {
      if (teammate.isAlive) {
        areAllDead = false
        break
      }
    }

    if (areAllDead) {
      if (!bonuses.value.reviveBonus.isAvailable) {
        setTimeout(() => {
          if (!currentLevel.value) {
            return
          }
          currentQuestionIndex.value = currentLevel.value.questions.length
        }, 3000)
      }
      else {
        useReviveBonus()
      }
    }
  }

  function handleKillPlayer(player: Teammate) {
    for (const teammate of team.value) {
      if (teammate.user.id === player.user.id) {
        teammate.isAlive = false
      }
    }

    playInCorrectSound()
    showMessage(`${t('level-view.incorrect-answer')} - ${player.user.name} ${t('level-view.killed')}`, 'RED')

    handleGameOver()
  }

  function handleChooseAnswer(answer: Answer) {
    chosenAnswer.value = answer

    if (chosenAnswer.value?.IsCorrect) {
      for (const teammate of team.value) {
        if (teammate.selectedAnswer?.AnswerId === chosenAnswer.value?.AnswerId) {
          teammate.score += 3
        }
      }
    }
  }

  function chooseAnswer() {
    const answer = getChosenAnswer()
    if (answer) {
      sendWebSocketMessage({ type: 'choose_answer', answer })
      if (!answer.IsCorrect) {
        const player = getRandomAlive()
        sendWebSocketMessage({ type: 'kill_player', player })
      }
    }
  }

  function handlePlayerVote(data: any) {
    let isMe = false
    const { selectedAnswer, playerId } = data
    for (const teammate of team.value) {
      if (teammate.user.id === playerId) {
        teammate.selectedAnswer = selectedAnswer
        if (user.value?.id === teammate.user.id) {
          isMe = true
        }
        if (selectedAnswer.IsCorrect) {
          teammate.score += 5
        }
        break
      }
    }

    if (!isMe) {
      return
    }

    for (const teammate of team.value) {
      if (teammate.isAlive && teammate.selectedAnswer === null) {
        return
      }
    }

    chooseAnswer()
  }

  function handleTimeBonus() {
    if (!bonuses.value.timeBonus.isAvailable) {
      return
    }
    timeLeft.value += 15
    maxTime.value += 15
    bonuses.value.timeBonus.isAvailable = false
  }

  function handleMistakeBonus(index: number) {
    if (!currentQuestion.value || !bonuses.value.mistakeBonus.isAvailable) {
      return
    }
    answers.value[index].isActive = false
    bonuses.value.mistakeBonus.isAvailable = false
  }

  function handleReviveBonus(index: number) {
    if (!bonuses.value.reviveBonus.isAvailable) {
      return
    }
    showMessage(`${team.value[index].user.name} ${t('level-view.was-revived')}`, 'WHITE')
    team.value[index].isAlive = true
    bonuses.value.reviveBonus.isAvailable = false
  }

  async function submitVote(selectedAnswer: Answer) {
    if (!user.value) {
      return
    }

    const message = {
      type: 'vote',
      selectedAnswer,
      playerId: user.value.id,
    }

    await addAnswerForBebrik(user.value.id, 1, selectedAnswer.IsCorrect)

    sendWebSocketMessage(message)
  }

  function useTimeBonus() {
    if (!bonuses.value.timeBonus.isAvailable) {
      return
    }
    playBonusSound()

    const message = {
      type: 'use_time_bonus',
    }

    sendWebSocketMessage(message)
  }

  function useReviveBonus() {
    if (!bonuses.value.reviveBonus.isAvailable) {
      return
    }
    let foundDead = false
    for (const teammate of team.value) {
      if (!teammate.isAlive) {
        foundDead = true
        break
      }
    }
    if (!foundDead) {
      return
    }
    playBonusSound()
    let index = Math.floor(Math.random() * team.value.length)
    while (team.value[index].isAlive) {
      index = Math.floor(Math.random() * team.value.length)
    }

    const message = {
      type: 'use_revive_bonus',
      index,
    }

    sendWebSocketMessage(message)
  }

  function useMistakeBonus() {
    if (!currentQuestion.value || !bonuses.value.mistakeBonus.isAvailable) {
      return
    }
    playBonusSound()
    let index = Math.floor(Math.random() * 4)
    while (currentQuestion.value.answers[index].IsCorrect) {
      index = Math.floor(Math.random() * 4)
    }

    const message = {
      type: 'use_mistake_bonus',
      index,
    }

    sendWebSocketMessage(message)
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

    return chosenAnswers[Math.floor(Math.random() * chosenAnswers.length)]
  }

  function removeSelectedAnswers() {
    for (let i = 0; i < team.value.length; i++) {
      team.value[i].selectedAnswer = null
    }
  }

  function initTeam() {
    for (let i = 0; i < team.value.length; i++) {
      team.value[i].selectedAnswer = null
      team.value[i].isAlive = true
      team.value[i].score = 0
    }
  }

  function getRandomAlive() {
    const aliveTeammates = team.value.filter((teammate: Teammate) => teammate.isAlive)
    const randomAliveTeammate = aliveTeammates[Math.floor(Math.random() * aliveTeammates.length)]

    return randomAliveTeammate
  }

  function initQuestion() {
    if (!currentQuestion.value) {
      return
    }

    if (timeLeftInterval.value) {
      clearInterval(timeLeftInterval.value)
    }

    maxTime.value = initialTime
    timeLeft.value = initialTime
    answers.value = []
    chosenAnswer.value = null
    isChosen.value = false

    const answerProps = [
      { color: 'YELLOW', image: '/images/triangle.png', isActive: true, isChosen: false },
      { color: 'BLUE', image: '/images/circle.png', isActive: true, isChosen: false },
      { color: 'GREEN', image: '/images/rectangle.png', isActive: true, isChosen: false },
      { color: 'RED', image: '/images/rhombus.png', isActive: true, isChosen: false },
    ]

    for (let i = 0; i < 4; i++) {
      answers.value.push({ ...currentQuestion.value.answers[i], ...answerProps[i] })
    }

    timeOut.value = false
    chosenAnswer.value = null
    removeSelectedAnswers()

    timeLeftInterval.value = setInterval(() => {
      if (timeLeft.value === 0 && timeLeftInterval.value) {
        clearInterval(timeLeftInterval.value)
        timeOut.value = true
      }
      else {
        timeLeft.value--
      }
    }, 1000)
  }

  watch(currentQuestion, () => {
    if (currentQuestion.value) {
      initQuestion()
    }
  }, { immediate: true })

  return {
    showMessage,
    messages,
    user,
    team,
    initLevels,
    getChosenAnswer,
    removeSelectedAnswers,
    connectToRoom,
    initTeam,
    currentLevel,
    levels,
    initStats,
    correctAnswers,
    websocket,
    roomCode,
    isConnected,
    gameStage,
    createRoom,
    disconnectFromRoom,
    sendWebSocketMessage,
    submitVote,
    useTimeBonus,
    chosenAnswer,
    timeLeftFormatted,
    timeLeftInterval,
    progressColor,
    timeLeft,
    maxTime,
    bonuses,
    timebarProgress,
    initQuestion,
    timeOut,
    isChosen,
    answers,
    currentQuestionIndex,
    currentQuestion,
    me,
    currentLevelIndex,
    initBonuses,
    canGoToLevel,
    initializeWebSocketConnection,
  }
})
