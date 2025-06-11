export type QuestionType = "multiple-choice" | "true-false" | "text"

export interface QuizQuestion {
  id: string
  type: QuestionType
  question: string
  options: string[]
  correctAnswer: number
  points: number
  feedback: {
    correct: string
    incorrect: string
  }
}

export interface QuizConfig {
  title: string
  description: string
  timeLimit: number
  showTimer: boolean
  randomizeQuestions: boolean
  passingScore: number
  questions: QuizQuestion[]
}

export interface UserAnswer {
  questionId: string
  answer: string | number | null
  isCorrect: boolean
  timeSpent: number
  points: number
}

export interface QuizResult {
  totalQuestions: number
  correctAnswers: number
  totalPoints: number
  maxPoints: number
  percentage: number
  passed: boolean
  answers: UserAnswer[]
  completedAt: Date
}
