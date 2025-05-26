import type { Ref } from 'vue'
import type Teammate from '@/types/Teammate'
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useUser } from './userStore'

export const useTeam = defineStore('teamStore', () => {
  const { user } = storeToRefs(useUser())

  const team: Ref<Teammate[]> = ref([
    { user: user.value, isAlive: true, selectedAnswer: null },
  ])

  return {
    team,
  }
})
