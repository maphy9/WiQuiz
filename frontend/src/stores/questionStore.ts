import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useQuestions = defineStore('questionStore', () => {
  const currentQuestion: Ref<any> = ref(null)

  return {
    currentQuestion,
  }
})
