import type Question from './Question'

export default interface Level {
  LevelId: number
  LevelTitle: string
  OrderNumber: number
  CourseId: number
  questions: Question[]
}
