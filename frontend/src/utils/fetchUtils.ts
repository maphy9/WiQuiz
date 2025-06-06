import type Answer from '@/types/Answer'
import type Level from '@/types/Level'
import type Question from '@/types/Question'
import type User from '@/types/User'

const ip = import.meta.env.VITE_IP
const port = import.meta.env.VITE_PORT
const API_BASE = `http://${ip}:${port}`

// -----------------------
// LEVELS
// -----------------------

export async function addAnswerForBebrik(UserId: number, CourseId: number, IsCorrect: boolean) {
  const res = await fetch(`${API_BASE}/addAnswerForBebrik`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      UserId,
      CourseId,
      IsCorrect,
    }),
  })
  if (!res.ok) {
    throw new Error(`Failed to max order numbers: ${res.status}`)
  }
}

export async function getStats(CourseId: number) {
  const res = await fetch(`${API_BASE}/getStats`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      CourseId,
    }),
  })
  if (!res.ok) {
    throw new Error(`Failed to max order numbers: ${res.status}`)
  }

  return (await res.json()) as any[]
}

export async function getMaxOrderNumber(UserId: number, CourseId: number) {
  const res = await fetch(`${API_BASE}/getMaxOrderNumberForBebrik`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      UserId,
      CourseId,
    }),
  })
  if (!res.ok) {
    throw new Error(`Failed to max order numbers: ${res.status}`)
  }

  return (await res.json()).MaxOrderNumber
}

export async function getLevels(): Promise<Level[]> {
  const res = await fetch(`${API_BASE}/levels`)
  if (!res.ok) {
    throw new Error(`Failed to fetch levels: ${res.status}`)
  }

  return (await res.json()) as Level[]
}

export async function getLevel(levelId: number): Promise<Level> {
  const res = await fetch(`${API_BASE}/level/${levelId}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch level ${levelId}: ${res.status}`)
  }

  return (await res.json()) as Level
}

export interface CreateLevelPayload {
  LevelTitle: string
  OrderNumber: number
  CourseId?: number // Optional, defaults to 1
}

export async function createLevel(payload: CreateLevelPayload): Promise<Level> {
  const res = await fetch(`${API_BASE}/levels/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      CourseId: payload.CourseId ?? 1,
    }),
  })
  if (!res.ok) {
    throw new Error(`Failed to create level: ${res.status}`)
  }

  return await res.json() as Level
}

export interface UpdateLevelPayload {
  LevelTitle: string
  OrderNumber: number
  CourseId?: number
}

export async function updateLevel(levelId: number, payload: UpdateLevelPayload): Promise<void> {
  const res = await fetch(`${API_BASE}/levels/${levelId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      CourseId: payload.CourseId ?? 1,
    }),
  })
  if (!res.ok) {
    throw new Error(`Failed to update level ${levelId}: ${res.status}`)
  }
}

export async function deleteLevel(levelId: number): Promise<void> {
  const res = await fetch(`${API_BASE}/levels/${levelId}`, {
    method: 'DELETE',
  })
  if (res.status !== 204) {
    throw new Error(`Failed to delete level ${levelId}: ${res.status}`)
  }
}

// -----------------------
// QUESTIONS
// -----------------------

export async function getQuestions(levelId: number): Promise<Question[]> {
  const res = await fetch(`${API_BASE}/questions/${levelId}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch questions for level ${levelId}: ${res.status}`)
  }

  return (await res.json()) as Question[]
}

export async function getQuestion(questionId: number): Promise<Question> {
  const res = await fetch(`${API_BASE}/question/${questionId}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch question ${questionId}: ${res.status}`)
  }

  return (await res.json()) as Question
}

export interface CreateQuestionPayload {
  QuestionTitle: string
  QuestionText: string
  OrderNumber: number
  LevelId: number
  answers: CreateAnswerPayload[]
}

export async function createQuestion(payload: CreateQuestionPayload): Promise<Question> {
  const res = await fetch(`${API_BASE}/questions/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    throw new Error(`Failed to create question: ${res.status}`)
  }

  return await res.json() as Question
}

export interface UpdateQuestionPayload {
  QuestionTitle: string
  QuestionText: string
  OrderNumber: number
  LevelId: number
  answers: UpdateAnswerPayload[]
}

export async function updateQuestion(questionId: number, payload: UpdateQuestionPayload): Promise<void> {
  const res = await fetch(`${API_BASE}/questions/${questionId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    throw new Error(`Failed to update question ${questionId}: ${res.status}`)
  }
}

export async function deleteQuestion(questionId: number): Promise<void> {
  const res = await fetch(`${API_BASE}/questions/${questionId}`, {
    method: 'DELETE',
  })
  if (res.status !== 204) {
    throw new Error(`Failed to delete question ${questionId}: ${res.status}`)
  }
}

// -----------------------
// ANSWERS
// -----------------------

export async function getAnswers(questionId: number): Promise<Answer[]> {
  const res = await fetch(`${API_BASE}/answers/${questionId}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch answers for question ${questionId}: ${res.status}`)
  }

  return (await res.json()) as Answer[]
}

export async function getAnswer(answerId: number): Promise<Answer> {
  const res = await fetch(`${API_BASE}/answer/${answerId}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch answer ${answerId}: ${res.status}`)
  }

  return (await res.json()) as Answer
}

export interface CreateAnswerPayload {
  AnswerText: string
  IsCorrect: boolean
  QuestionId: number
}

export async function createAnswer(payload: CreateAnswerPayload): Promise<Answer> {
  const res = await fetch(`${API_BASE}/answers/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    throw new Error(`Failed to create answer: ${res.status}`)
  }

  return await res.json() as Answer
}

export interface UpdateAnswerPayload {
  AnswerText: string
  IsCorrect: boolean
  QuestionId: number
}

export async function updateAnswer(answerId: number, payload: UpdateAnswerPayload): Promise<void> {
  const res = await fetch(`${API_BASE}/answers/${answerId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    throw new Error(`Failed to update answer ${answerId}: ${res.status}`)
  }
}

export async function deleteAnswer(answerId: number): Promise<void> {
  const res = await fetch(`${API_BASE}/answers/${answerId}`, {
    method: 'DELETE',
  })
  if (res.status !== 204) {
    throw new Error(`Failed to delete answer ${answerId}: ${res.status}`)
  }
}

export async function updateMaxLevelId(user: User, courseId: number, newMaxLevelId: number) {
  const res = await fetch(`${API_BASE}/updateMaxLevelId`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      UserId: user.id,
      CourseId: courseId,
      NewMaxLevelId: newMaxLevelId,
    }),
  })

  if (res.status !== 201) {
    const errorText = await res.text()
    throw new Error(`Failed to update max level: ${res.status} - ${errorText}`)
  }
}

export interface LoginPayload {
  name: string
  password: string
}

export async function login(payload: LoginPayload): Promise<User> {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error(`Login failed: ${res.status}`)
  }

  const data = await res.json()

  return {
    id: data.UserId,
    name: data.Name,
    avatar: '',
    maxOrderNumber: data.MaxOrderNumber,
  }
}

const USER_KEY = 'loggedInUser'

export function saveUser(user: User | null): void {
  if (!user) {
    localStorage.removeItem(USER_KEY)
  }
  else {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }
}

export function loadUser(): User | null {
  const stored = localStorage.getItem(USER_KEY)

  return stored
    ? JSON.parse(stored) as User
    : null
}

export function clearUser(): void {
  localStorage.removeItem(USER_KEY)
}
