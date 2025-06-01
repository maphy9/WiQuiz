import type { Ref } from 'vue'
import type Answer from '@/types/Answer'
import type Level from '@/types/Level'
import type Teammate from '@/types/Teammate'
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useUser } from './userStore'

export const useGame = defineStore('gameStore', () => {
  const { user } = storeToRefs(useUser())

  // Stats
  const correctAnswers = ref(0)

  function initStats() {
    correctAnswers.value = 0
  }

  // Team
  const team: Ref<Teammate[]> = ref([])

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
  }
})
