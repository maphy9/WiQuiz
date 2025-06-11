<script setup lang="ts">
import type Answer from '@/types/Answer'
import type Question from '@/types/Question'
import { storeToRefs } from 'pinia'
import { toRefs, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGame } from '@/stores/gameStore'
import { useSoundStore } from '@/stores/useSoundStore'
import AnswerCard from './AnswerCard.vue'
import BonusCard from './BonusCard.vue'
import MessageCard from './MessageCard.vue'

import TeammateCard from './TeammateCard.vue'

const props = defineProps<{
  question: Question
}>()

const emit = defineEmits<{
  nextQuestion: []
  gameOver: []
}>()

const { t } = useI18n()

const gameStore = useGame()
const { playCorrectSound, playInCorrectSound } = useSoundStore()

// Question
const { question } = toRefs(props)

// Team
const {
  submitVote,
  showMessage,
} = gameStore
const {
  team,
  timebarProgress,
  timeLeftFormatted,
  progressColor,
  bonuses,
  me,
  chosenAnswer,
  correctAnswers,
  messages,
  isChosen,
  answers,
  timeOut,
  timeLeftInterval,
} = storeToRefs(gameStore)

// Handlers
watch([chosenAnswer, timeOut], () => {
  const answer = chosenAnswer.value

  if (!answer && !timeOut.value) {
    return
  }
  if (!answer) {
    playInCorrectSound()
    showMessage(t('level-view.no-answer'), 'WHITE')
  }
  else if (answer.IsCorrect) {
    playCorrectSound()
    showMessage(t('level-view.correct-answer'), 'GREEN')
  }
  if (timeLeftInterval.value) {
    clearInterval(timeLeftInterval.value)
  }
  isChosen.value = true

  if (answer?.IsCorrect) {
    correctAnswers.value += 1
  }

  setTimeout(() => {
    emit('nextQuestion')
  }, 3000)
})

function handleSelect(answer: any) {
  for (let i = 0; i < question.value.answers.length; i++) {
    if (answers.value[i] !== answer) {
      answers.value[i].isActive = false
    }
  }

  submitVote(question.value.answers.find(a => a.AnswerId === answer.AnswerId) as Answer)
}
</script>

<template>
  <div class="main">
    <div class="timebar">
      <div
        :style="{'width': `${timebarProgress}%`,
                 'background-color': progressColor}"
        class="timebar-progress"
      />

      <span class="timebar-time-left">{{ timeLeftFormatted }}</span>
    </div>

    <div class="question">
      <div class="question-title">
        {{ question.QuestionTitle }}
      </div>

      <div class="question-text">
        {{ question.QuestionText }}
      </div>

      <div class="messages">
        <MessageCard
          v-for="(message, index) in messages"
          :key="index"
          :message="message"
        />
      </div>
    </div>

    <div class="team">
      <TeammateCard
        v-for="(teammate, index) in team"
        :key="index"
        :teammate="teammate"
      />
    </div>

    <div class="bonuses">
      <BonusCard
        v-for="(bonus, index) in bonuses"
        :key="index"
        :bonus="bonus"
        @click="bonus.onClick"
      />
    </div>

    <div class="answers">
      <AnswerCard
        v-for="(answer, index) in answers"
        :key="index"
        :answer="answer"
        :me="me"
        :chosen-answer="chosenAnswer"
        :is-chosen="isChosen"
        @select-answer="handleSelect"
      />
    </div>
  </div>
</template>

<style scoped>
.main {
  width: 100%;
  height: calc(100% - 12px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 0;
  overflow-y: auto;
}

.timebar {
  width: calc(67.5% - 6px);
  position: absolute;
  top: 0;
  height: 48px;
  border: solid white 3px;
  background-color: #636B73;
  display: flex;
  align-items: center;
}

.timebar-progress {
  position: absolute;
  background-color: #80C997;
  height: 100%;
}

.timebar-time-left {
  font-size: 36px;
  font-weight: bold;
  color: white;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}

.question {
  position: absolute;
  top: 8.5vh;
  width: 75vw;
  min-height: 60vh;
  background: url('@/images/questionBoard.png') no-repeat;
  background-size: 100% 100%;
  background-position: center;
}

.question-title {
  margin-top: 40px;
  width: calc(100% - 12vw);
  padding: 0 6vw;
  font-size: 5.8vh;
  text-align: center;
  color: black;
  font-weight: bold;
}

.question-text {
  width: calc(100% - 12vw);
  padding: 0 6vw;
  font-size: 3.8vh;
  color: black;
}

.messages {
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  width: calc(100% - 12vw);
  padding: 0 6vw;
  margin-top: 20px;
}

.team {
  width: 10%;
  min-width: 100px;
  padding: 12px;
  background-color: rgba(69, 80, 97, 0.8);
  backdrop-filter: blur(5px);
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.bonuses {
  width: 10%;
  min-width: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.answers {
  position: absolute;
  bottom: 8px;
  display: grid;
  grid-template-columns: repeat(2, 38vw);
  grid-template-rows: repeat(2, 10vh);
  grid-column-gap: 32px;
  grid-row-gap: 4vh;
}

@media only screen and (max-width: 800px) {
  .timebar {
    width: calc(100% - 6px);
    height: 34px;
  }

  .timebar-time-left {
    font-size: 24px;
  }

  .team {
    width: calc(100% - 24px);
    padding: 0 12px;
    height: 50px;
    top: 48px;
    display: flex;
    flex-direction: row;
    transform: translate(0, 0);
    gap: 4px;
  }

  .question {
    position: inherit;
    margin-top: 100px;
    width: 100%;
    max-height: 35vh;
    min-height: 35vh;
  }

  .question-title {
    margin-top: 32px;
    width: calc(100% - 14%);
    padding: 0 7%;
    font-size: 28px;
  }

  .question-text {
    width: calc(100% - 14%);
    padding: 0 7%;
    font-size: 2.5vh;
  }

  .messages {
    width: calc(100% - 14vw);
    padding: 0 7vw;
    margin-top: 10px;
  }

  .answers {
    position: inherit;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1vh;
    width: 100%;
  }

  .bonuses {
    width: 100%;
    height: 30vw;
    top: initial;
    bottom: 0;
    transform: translate(0, 0);
    flex-direction: row;
    gap: 10px;
  }
}
</style>
