<script setup lang="ts">
import type { Answer } from '@/types/Answer'
import type Teammate from '@/types/Teammate'
import { computed, toRefs } from 'vue'

const props = defineProps<{
  answer: any
  chosenAnswer: Answer | null
  me: Teammate | undefined
}>()

const emit = defineEmits<{
  selectAnswer: [answer: any]
}>()

const { answer, chosenAnswer, me } = toRefs(props)
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
  return chosenAnswer.value === null && answer.value.isActive && me.value?.isAlive
})
</script>

<template>
  <div
    :class="`answer ${chosenAnswer === null
      ? answer.isActive && me?.isAlive
        ? 'active'
        : 'inactive'
      : ''} ${chosenAnswer === answer
      ? chosenAnswer?.isCorrect
        ? 'correct active'
        : 'incorrect active'
      : chosenAnswer === null
        ? ''
        : 'inactive'}`"
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
  height: 98px;
  border: 1px solid white;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  gap: 6px;
  justify-content: center;
  align-items: center;
  transition: filter 0.3s;
  overflow-y: auto;
  scrollbar-width: thin;
}

.answer::-webkit-scrollbar {
  width: 8px;
}

.answer::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 8px;
}

.answer::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 8px;
  border: 2px solid #f0f0f0;
}

.answer::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.answer:hover {
  filter: brightness(85%);
}

.answer-icon {
  width: 72px;
  height: 72px;
}

.answer-text {
  font-size: 40px;
  color: white;
  font-weight: bold;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

.active {
  opacity: 1;
  cursor: pointer;
  transition: all 0.3s;
}

.inactive {
  opacity: 0;
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
</style>
