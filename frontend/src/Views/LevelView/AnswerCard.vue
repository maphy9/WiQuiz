<script setup lang="ts">
import type { Answer } from '@/types/Answer'
import type Teammate from '@/types/Teammate'
import { computed, toRefs, watch } from 'vue'
import { useSoundStore } from '@/composables/useSound'

const props = defineProps<{
  answer: any
  chosenAnswer: Answer | null
  isChosen: boolean
  me: Teammate | undefined
}>()

const emit = defineEmits<{
  selectAnswer: [answer: any]
}>()
const { playCorrectSound, playInCorrectSound } = useSoundStore()

const { answer, chosenAnswer, isChosen, me } = toRefs(props)
const answerColor = computed(() => {
  switch (answer.value.color) {
    case 'RED':
      return '#E8484B'
    case 'GREEN':
      return '#2CB688'
    case 'BLUE':
      return '#375D9C'
    default:
      return '#FADA5E'
  }
})

const isSelectable = computed(() => {
  return !isChosen.value && answer.value.isActive && me.value?.isAlive
})

watch(chosenAnswer, (newVal) => {
  if (!newVal)
    return
  if (newVal === answer.value) {
    if (newVal.isCorrect) {
      playCorrectSound()
    }
    else {
      playInCorrectSound()
    }
  }
})
</script>

<template>
  <div
    :class="`answer ${chosenAnswer === null
      ? me?.isAlive && answer.isActive
        ? 'active'
        : 'inactive'
      : ''} ${chosenAnswer === answer
      ? chosenAnswer?.isCorrect
        ? 'correct active'
        : 'incorrect active'
      : isChosen
        ? 'hidden'
        : ''}`"
    :style="{
      'backgroundColor': answerColor,
    }"
    @click="isSelectable
      ? emit('selectAnswer', answer)
      : ''"
  >
    <img
      class="answer-icon"
      :src="answer.image"
    >

    <span class="answer-text">{{ answer.text }}</span>
  </div>
</template>

<style scoped>
.answer {
  width: calc(38vw - 2px);
  height: calc(10vh - 2px);
  border: 1px solid white;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  gap: 6px;
  justify-content: center;
  align-items: center;
  transition: filter 0.3s;
}

.answer:hover {
  filter: brightness(85%);
}

.answer-text {
  font-size: 4vh;
  color: white;
  font-weight: bold;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  white-space: nowrap;
  height: 100%;
  display: flex;
  align-items: center;
  overflow-x: auto;
  overflow: -moz-scrollbars-none;
  scrollbar-width: none;
  overflow-y: hidden;
  -ms-overflow-style: none;
}

.hidden {
  opacity: 0;
}

.answer-icon {
  width: 7.5vh;
  height: 7.5vh;
}

.active {
  opacity: 1;
  cursor: pointer;
  transition: all 0.3s;
}

.inactive {
  opacity: 0.5;
  cursor: not-allowed;
  transition: all 0.3s;
}

@keyframes incorrect-animation {
  0% {
    transform: translateX(-8px);
  }
  10% {
    transform: translateX(8px);
  }
  20% {
    transform: translateX(-8px);
  }
  30% {
    transform: translateX(8px);
  }
  40% {
    transform: translateX(-8px);
  }
  50% {
    transform: translateX(8px);
  }
  60% {
    transform: translateX(-8px);
  }
  70% {
    transform: translateX(8px);
  }
  80% {
    transform: translateX(-8px);
  }
  90% {
    transform: translateX(8px);
  }
  100% {
    transform: translateX(-8px);
  }
}

.incorrect {
  scale: 1.05;
  animation: incorrect-animation 2s;
}

@keyframes correct-animation {
  0% {
    transform: translateY(16px);
  }
  20% {
    transform: translateY(-16px);
  }
  40% {
    transform: translateY(16px);
  }
  60% {
    transform: translateY(-16px);
  }
  80% {
    transform: translateY(16px);
  }
  100% {
    transform: translateY(-16px);
  }
}

.correct {
  scale: 1.05;
  animation: correct-animation 2s;
}

@media only screen and (max-width: 800px) {
  .answer {
    width: calc(90% - 2px);
    height: calc(7vh - 2px);
  }

  .answer-text {
    font-size: 3.5vh;
  }

  .answer-icon {
    width: 5vh;
    height: 5vh;
  }
}
</style>
