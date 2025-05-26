import type { Answer } from './Answer'
import type User from './User'

export default interface Teammate {
  user: User
  isAlive: boolean
  selectedAnswer: Answer | null
}
