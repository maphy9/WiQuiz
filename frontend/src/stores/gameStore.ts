import type { Ref } from 'vue'
import type { Answer } from '@/types/Answer'
import type Teammate from '@/types/Teammate'
import type User from '@/types/User'
import { nanoid } from 'nanoid'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGame = defineStore('questionStore', () => {
  const user: Ref<User> = ref({
    id: nanoid(),
    name: 'Robert',
    avatar: '/images/emptyPfp.png',
  })

  const team: Ref<Teammate[]> = ref([
    { user: user.value, isAlive: true, selectedAnswer: null, score: 0 },
  ])

  function selectAnswer(answer: Answer) {
    for (const teammate of team.value) {
      if (teammate.user === user.value) {
        teammate.selectedAnswer = answer
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
      if (teammate.selectedAnswer.text in selectedAnswers) {
        selectedAnswers[teammate.selectedAnswer.text].votes += 1
      }
      else {
        selectedAnswers[teammate.selectedAnswer.text] = {
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
    }
  }

  const currentQuestion: Ref<any> = ref(null)

  return {
    user,
    team,
    selectAnswer,
    getChosenAnswer,
    removeSelectedAnswers,
    killRandom,
    initTeam,
    currentQuestion,
  }
})
