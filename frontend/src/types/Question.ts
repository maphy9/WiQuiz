import type { Answer } from './Answer'

export interface Question {
  title: string
  text: string
  answers: Answer[]
}
