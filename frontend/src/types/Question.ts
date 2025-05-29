import type Answer from './Answer'

export default interface Question {
  title: string
  text: string
  answers: Answer[]
}
