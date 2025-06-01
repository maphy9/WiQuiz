import type { Ref } from 'vue'
import type User from '@/types/User'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { saveUser } from '@/utils/fetchUtils'

export const useUser = defineStore('userStore', () => {
  const user: Ref<User | null> = ref(null)
  const router = useRouter()

  watch(user, () => {
    saveUser(user.value)
    if (!user.value) {
      router.push({ name: 'login' })
    }
  })

  return {
    user,
  }
})
