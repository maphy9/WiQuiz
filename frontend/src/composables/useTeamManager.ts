import type { Answer } from '@/types/Answer'
import type Teammate from '@/types/Teammate'
import { storeToRefs } from 'pinia'
import { useTeam } from '@/stores/teamStore'
import { useUser } from '@/stores/userStore'

export default function useTeamManager() {
  const { team } = storeToRefs(useTeam())
  const { user } = storeToRefs(useUser())

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

  return {
    initTeam,
    removeSelectedAnswers,
    killRandom,
    selectAnswer,
    getChosenAnswer,
  }
}
