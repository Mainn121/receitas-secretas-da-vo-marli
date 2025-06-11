"use client"

import { useState } from "react"
import { AnimatedIntro } from "@/components/animated-intro"
import { QuizPlayer } from "@/components/quiz-player"
import { QuizResult } from "@/components/quiz-result"
import type { QuizResult as QuizResultType } from "@/types/quiz"

const QUIZ_QUESTIONS = [
  {
    id: "1",
    question: "Qual é o segredo para um bolo ficar fofo e macio como o da vó Marli?",
    options: [
      "Bater as claras em neve e adicionar por último",
      "Usar fermento químico em excesso",
      "Misturar tudo junto rapidamente",
      "Usar farinha comum sem peneirar",
    ],
    explanation: "Perfeito! Você conhece os segredos da culinária tradicional!",
  },
  {
    id: "2",
    question: "Como a vó Marli consegue fazer um feijão sempre cremoso e saboroso?",
    options: [
      "Cozinha em panela de pressão por muito tempo",
      "Deixa de molho por 12h e refoga os temperos antes",
      "Adiciona bicarbonato de sódio na água",
      "Usa apenas sal e cebola",
    ],
    explanation: "Excelente! Você tem o dom da culinária da vó Marli!",
  },
  {
    id: "3",
    question: "Qual é o truque da vó Marli para o arroz ficar sempre soltinho?",
    options: [
      "Usar bastante óleo na panela",
      "Lavar o arroz até a água sair clara e dourar no alho",
      "Cozinhar em fogo alto o tempo todo",
      "Adicionar vinagre na água do cozimento",
    ],
    explanation: "Fantástico! Você entende os fundamentos da boa cozinha!",
  },
  {
    id: "4",
    question: "Como fazer o brigadeiro da vó Marli que nunca desanda?",
    options: [
      "Cozinhar em fogo alto mexendo rápido",
      "Usar leite condensado gelado direto da lata",
      "Cozinhar em fogo baixo mexendo sempre na mesma direção",
      "Adicionar leite em pó para engrossar",
    ],
    explanation: "Incrível! Você tem talento natural para a culinária!",
  },
  {
    id: "5",
    question: "Qual é o segredo do tempero especial da vó Marli que deixa tudo mais gostoso?",
    options: [
      "Usar apenas sal refinado e pimenta",
      "Misturar ervas frescas com alho dourado",
      "Uma pitada de açúcar em pratos salgados",
      "Temperos industrializados prontos",
    ],
    explanation: "Maravilhoso! Você está pronto para os segredos mais avançados!",
  },
]

export default function QuizFunil() {
  const [currentView, setCurrentView] = useState<"intro" | "quiz" | "result">("intro")
  const [quizResult, setQuizResult] = useState<QuizResultType | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleIntroComplete = () => {
    setIsLoading(true)

    // Loading com animação de cozinha
    setTimeout(() => {
      setIsLoading(false)
      setCurrentView("quiz")
    }, 4000)
  }

  const handleQuizComplete = (result: QuizResultType) => {
    setQuizResult(result)
    setCurrentView("result") // Sempre vai para resultado de sucesso
  }

  const handleRestart = () => {
    setCurrentView("intro")
    setQuizResult(null)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen min-h-[100dvh] bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center p-4 safe-area-inset">
        <div className="text-center w-full max-w-sm mx-auto">
          <div className="cooking-pot mb-6 sm:mb-8">
            <div className="pot-container">
              <div className="pot"></div>
              <div className="lid"></div>
              <div className="steam steam1"></div>
              <div className="steam steam2"></div>
              <div className="steam steam3"></div>
              <div className="steam steam4"></div>
              <div className="bubbles">
                <div className="bubble bubble1"></div>
                <div className="bubble bubble2"></div>
                <div className="bubble bubble3"></div>
              </div>
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 px-2">
            Preparando os segredos da vó Marli...
          </h2>
          <div className="loading-bar mb-3 sm:mb-4">
            <div className="loading-progress"></div>
          </div>
          <p className="text-white/80 text-sm sm:text-base">Aquecendo o fogão... 🔥</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen min-h-[100dvh] safe-area-inset">
      {currentView === "intro" && <AnimatedIntro onComplete={handleIntroComplete} />}
      {currentView === "quiz" && <QuizPlayer questions={QUIZ_QUESTIONS} onComplete={handleQuizComplete} />}
      {currentView === "result" && quizResult && <QuizResult result={quizResult} onRestart={handleRestart} />}
    </div>
  )
}
