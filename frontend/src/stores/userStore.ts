import type { Ref } from 'vue'
import type User from '@/types/User'
import { nanoid } from 'nanoid'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUser = defineStore('userStore', () => {
  const user: Ref<User> = ref({
    id: nanoid(),
    name: 'Robert',
    avatar: '/images/emptyPfp.png',
  })

  return {
    user,
  }
})
