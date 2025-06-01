import type { Ref } from 'vue'
import type User from '@/types/User'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { saveUser } from '@/utils/fetchUtils'

export const useUser = defineStore('userStore', () => {
  const user: Ref<User | null> = ref(null)

  watch(user, () => {
    saveUser(user.value)
  })

  return {
    user,
  }
})
