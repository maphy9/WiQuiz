import type Question from './Question'

export default interface Level {
  title: string
  orderNumber: number
  questions: Question[]
  state: 'passed' | 'repeat' | 'locked'
}
