"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { QuizResult, UserAnswer } from "@/types/quiz"
import { Clock, CheckCircle } from "lucide-react"

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  explanation: string
}

interface QuizPlayerProps {
  questions: QuizQuestion[]
  onComplete: (result: QuizResult) => void
}

export function QuizPlayer({ questions, onComplete }: QuizPlayerProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const [timeLeft, setTimeLeft] = useState(30) // 30 segundos por pergunta
  const [showFeedback, setShowFeedback] = useState(false)

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showFeedback) {
      handleTimeUp()
    }
  }, [timeLeft, showFeedback])

  const handleTimeUp = () => {
    // Se o tempo acabou, seleciona a primeira opção automaticamente
    setSelectedAnswer(0)
    handleAnswerSubmit()
  }

  const handleAnswerSubmit = () => {
    const question = questions[currentQuestion]
    setShowFeedback(true)

    // TODAS as respostas são consideradas corretas!
    const answer: UserAnswer = {
      questionId: question.id,
      answer: selectedAnswer,
      isCorrect: true, // Sempre correto!
      timeSpent: 30 - timeLeft,
      points: 20, // Sempre ganha pontos
    }

    setUserAnswers((prev) => [...prev, answer])

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setTimeLeft(30)
        setShowFeedback(false)
      } else {
        completeQuiz([...userAnswers, answer])
      }
    }, 3000) // 3 segundos para ler o feedback
  }

  const completeQuiz = (answers: UserAnswer[]) => {
    // Sempre considera como 100% de aproveitamento
    const result: QuizResult = {
      totalQuestions: questions.length,
      correctAnswers: questions.length, // Sempre todas corretas
      totalPoints: questions.length * 20,
      maxPoints: questions.length * 20,
      percentage: 100, // Sempre 100%
      passed: true, // Sempre passa
      answers,
      completedAt: new Date(),
    }

    onComplete(result)
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  }

  const optionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
  }

  if (showFeedback) {
    return (
      <motion.div
        className="min-h-screen min-h-[100dvh] bg-kitchen flex items-center justify-center p-3 sm:p-4 safe-area-inset"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "backOut" }}
        >
          <div className="glass-strong w-full max-w-2xl lg:max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 text-center">
            <motion.div
              className="mb-4 sm:mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: "backOut", delay: 0.2 }}
            >
              <CheckCircle className="w-16 h-16 sm:w-20 lg:w-24 text-green-400 mx-auto mb-4 sm:mb-6" />
              <motion.h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                🎉 Perfeito!
              </motion.h2>
              <motion.div
                className="glass-success rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <p className="text-base sm:text-lg text-white leading-relaxed font-medium drop-shadow-md">
                  {question.explanation}
                </p>
              </motion.div>
            </motion.div>
            <motion.div
              className="text-xs sm:text-sm text-white/90 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {currentQuestion + 1 < questions.length
                ? "Próxima pergunta em alguns segundos..."
                : "Liberando seu acesso aos segredos..."}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="min-h-screen min-h-[100dvh] bg-kitchen p-3 sm:p-4 safe-area-inset"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div className="mb-4 sm:mb-6 lg:mb-8" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4"
            variants={itemVariants}
          >
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white text-center sm:text-left drop-shadow-lg">
              Quiz dos Segredos da Vó Marli
            </h1>
            <motion.div
              className="glass flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full mx-auto sm:mx-0"
              animate={timeLeft <= 10 ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5, repeat: timeLeft <= 10 ? Number.POSITIVE_INFINITY : 0 }}
            >
              <Clock className="w-4 h-4 sm:w-5 lg:w-6 text-orange-300" />
              <span
                className={`font-bold text-base sm:text-lg lg:text-xl ${
                  timeLeft <= 10 ? "text-red-300" : "text-white"
                } drop-shadow-md`}
              >
                {timeLeft}s
              </span>
            </motion.div>
          </motion.div>

          <motion.div className="space-y-2 sm:space-y-3" variants={itemVariants}>
            <div className="flex justify-between text-xs sm:text-sm text-white font-medium drop-shadow-md">
              <span className="font-semibold">
                Pergunta {currentQuestion + 1} de {questions.length}
              </span>
              <span className="text-green-300 font-bold">✨ Liberando seus segredos...</span>
            </div>
            <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.5 }}>
              <Progress value={progress} className="h-2 sm:h-3 lg:h-4" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div key={currentQuestion} variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <div className="glass-strong mb-4 sm:mb-6 lg:mb-8 p-4 sm:p-6 lg:p-8 xl:p-10">
              <motion.h2
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 lg:mb-10 text-white leading-relaxed drop-shadow-lg"
                variants={itemVariants}
              >
                {question.question}
              </motion.h2>

              <div className="space-y-3 sm:space-y-4">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedAnswer(index)}
                    className={`glass-button w-full p-4 sm:p-6 lg:p-8 text-left text-sm sm:text-base lg:text-lg font-medium rounded-lg sm:rounded-xl lg:rounded-2xl transition-all duration-300 touch-manipulation ${
                      selectedAnswer === index
                        ? "!bg-white/30 !border-white/60 text-white shadow-lg sm:shadow-xl lg:shadow-2xl"
                        : "text-white hover:text-white"
                    }`}
                    variants={optionVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="flex items-center">
                      <motion.span
                        className="w-8 h-8 sm:w-10 lg:w-12 rounded-full border-2 sm:border-3 border-current flex items-center justify-center mr-3 sm:mr-4 lg:mr-6 text-sm sm:text-base lg:text-lg font-bold flex-shrink-0 drop-shadow-md"
                        animate={selectedAnswer === index ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {String.fromCharCode(65 + index)}
                      </motion.span>
                      <span className="flex-1 leading-relaxed font-medium drop-shadow-sm">{option}</span>
                    </span>
                  </motion.button>
                ))}
              </div>

              <motion.div variants={itemVariants}>
                <Button
                  onClick={handleAnswerSubmit}
                  disabled={selectedAnswer === null}
                  className="glass-button w-full mt-6 sm:mt-8 lg:mt-10 disabled:opacity-50 text-white text-base sm:text-lg lg:text-2xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 h-auto font-bold rounded-lg sm:rounded-xl lg:rounded-2xl touch-manipulation border-0 drop-shadow-lg"
                >
                  {currentQuestion + 1 === questions.length ? "🔓 LIBERAR SEGREDOS" : "➡️ PRÓXIMA PERGUNTA"}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
