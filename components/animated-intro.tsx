"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { BookOpen, Lock } from "lucide-react"

interface AnimatedIntroProps {
  onComplete: () => void
}

export function AnimatedIntro({ onComplete }: AnimatedIntroProps) {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 relative overflow-hidden safe-area-inset">
      {/* Cooking Pot Animation - Responsive positioning */}
      <div className="absolute top-[15%] sm:top-1/4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="cooking-animation">
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
      </div>

      {/* Content */}
      <div
        className={`relative z-20 flex flex-col items-center justify-center min-h-screen min-h-[100dvh] p-4 sm:p-6 md:p-8 transition-all duration-1000 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="text-center w-full max-w-4xl mx-auto pt-32 sm:pt-40 md:pt-32">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <Lock className="w-8 h-8 sm:w-12 md:w-16 text-yellow-300 mr-2 sm:mr-4" />
            <BookOpen className="w-8 h-8 sm:w-12 md:w-16 text-white" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
            Segredos Secretos
            <br />
            <span className="text-yellow-200">da Vó Marli</span>
          </h1>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 mx-auto max-w-2xl">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed">
              🔒 <strong>ACESSO EXCLUSIVO</strong> 🔒
              <br />
              <br />
              Descubra os <span className="text-yellow-200 font-bold">SEGREDOS MAIS VALIOSOS</span> da culinária
              tradicional que transformaram gerações de cozinheiros em verdadeiros chefs!
            </p>
          </div>

          <div className="bg-yellow-400/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 mb-6 sm:mb-8 mx-auto max-w-xl border border-yellow-300/30">
            <p className="text-white font-bold text-sm sm:text-base lg:text-lg">
              ✨ Responda 5 perguntas rápidas e ganhe acesso imediato aos segredos!
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <Button
              onClick={onComplete}
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black text-lg sm:text-xl lg:text-2xl px-8 sm:px-12 lg:px-16 py-4 sm:py-6 lg:py-8 h-auto font-bold rounded-xl sm:rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 touch-manipulation"
            >
              🔥 DESCOBRIR OS SEGREDOS 🔥
            </Button>

            <p className="text-white/80 text-xs sm:text-sm">Apenas 5 perguntas para liberar seu acesso</p>
          </div>
        </div>
      </div>
    </div>
  )
}
