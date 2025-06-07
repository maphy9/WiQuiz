import type Answer from './Answer'

export default interface Question {
  QuestionId: number
  QuestionTitle: string
  QuestionText: string
  OrderNumber: number
  LevelId: number
  answers: Answer[]
}
