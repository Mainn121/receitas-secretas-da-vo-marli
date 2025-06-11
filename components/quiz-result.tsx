"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { QuizResult as QuizResultType } from "@/types/quiz"
import { Crown, Sparkles, Gift } from "lucide-react"

interface QuizResultProps {
  result: QuizResultType
  onRestart: () => void
}

export function QuizResult({ result, onRestart }: QuizResultProps) {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 flex items-center justify-center p-3 sm:p-4 safe-area-inset">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center pb-2 sm:pb-4 p-4 sm:p-6">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative">
              <Crown className="w-20 h-20 sm:w-24 lg:w-32 text-yellow-400" />
              <div className="absolute inset-0 animate-pulse">
                <Crown className="w-20 h-20 sm:w-24 lg:w-32 text-yellow-300" />
              </div>
            </div>
          </div>
          <CardTitle className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800 mb-2 sm:mb-4">
            🎉 PARABÉNS! 🎉
          </CardTitle>
          <p className="text-lg sm:text-xl lg:text-2xl text-green-700 font-bold">
            Você Conquistou os Segredos da Vó Marli!
          </p>
        </CardHeader>

        <CardContent className="space-y-4 sm:space-y-6 lg:space-y-8 p-4 sm:p-6">
          {/* Success Message */}
          <div className="text-center bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Gift className="w-12 h-12 sm:w-14 lg:w-16 text-orange-500 animate-bounce" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-800 mb-3 sm:mb-4">
              ACESSO LIBERADO! 🔓
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
              Você demonstrou interesse genuíno pela culinária tradicional!
              <br />
              <strong>Agora você tem direito ao acesso completo aos segredos e receitas exclusivas da vó Marli!</strong>
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <div className="text-center p-3 sm:p-4 lg:p-6 bg-green-50 rounded-lg sm:rounded-xl lg:rounded-2xl">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600">{result.totalQuestions}</div>
              <div className="text-xs sm:text-sm text-gray-600">Perguntas</div>
            </div>
            <div className="text-center p-3 sm:p-4 lg:p-6 bg-yellow-50 rounded-lg sm:rounded-xl lg:rounded-2xl">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-600">{result.correctAnswers}</div>
              <div className="text-xs sm:text-sm text-gray-600">Acertos</div>
            </div>
            <div className="text-center p-3 sm:p-4 lg:p-6 bg-orange-50 rounded-lg sm:rounded-xl lg:rounded-2xl">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-600">{result.totalPoints}</div>
              <div className="text-xs sm:text-sm text-gray-600">Pontos</div>
            </div>
            <div className="text-center p-3 sm:p-4 lg:p-6 bg-purple-50 rounded-lg sm:rounded-xl lg:rounded-2xl">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600">100%</div>
              <div className="text-xs sm:text-sm text-gray-600">Sucesso</div>
            </div>
          </div>

          {/* Main CTA */}
          <div className="text-center bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-10">
            <div className="mb-4 sm:mb-6">
              <div className="flex justify-center mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} className="w-6 h-6 sm:w-7 lg:w-8 text-yellow-500 mx-1 animate-pulse" />
                ))}
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                🔥 CADERNO COMPLETO DE RECEITAS SECRETAS 🔥
              </h3>
              <p className="text-sm sm:text-base lg:text-xl text-gray-700 leading-relaxed mb-4 sm:mb-6">
                Mais de <strong>150 receitas exclusivas</strong>, técnicas secretas e dicas que transformarão sua
                cozinha!
                <br />
                <span className="text-red-600 font-bold text-base sm:text-lg lg:text-2xl">
                  🎁 OFERTA ESPECIAL POR TEMPO LIMITADO! 🎁
                </span>
              </p>
            </div>

            <Button
              asChild
              className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white text-lg sm:text-xl lg:text-3xl px-6 sm:px-12 lg:px-20 py-4 sm:py-6 lg:py-10 h-auto font-bold rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl sm:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse touch-manipulation"
            >
              <a href="https://pay.cakto.com.br/w8gwixb_422387" target="_blank" rel="noopener noreferrer">
                🎁 QUERO MEU ACESSO AGORA 🎁
              </a>
            </Button>

            <div className="mt-4 sm:mt-6 lg:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
              <div className="bg-white/50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                <p className="text-green-600 font-bold text-sm sm:text-base lg:text-lg">✅ Acesso Imediato</p>
                <p className="text-xs sm:text-sm text-gray-600">Receba tudo na hora</p>
              </div>
              <div className="bg-white/50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                <p className="text-green-600 font-bold text-sm sm:text-base lg:text-lg">✅ Garantia 7 Dias</p>
                <p className="text-xs sm:text-sm text-gray-600">Ou seu dinheiro de volta</p>
              </div>
              <div className="bg-white/50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                <p className="text-green-600 font-bold text-sm sm:text-base lg:text-lg">✅ Suporte Total</p>
                <p className="text-xs sm:text-sm text-gray-600">Ajuda com todas as receitas</p>
              </div>
            </div>
          </div>

          {/* Secondary Actions */}
          <div className="flex justify-center pt-4 sm:pt-6 border-t">
            <Button
              onClick={onRestart}
              variant="outline"
              className="flex items-center gap-2 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 h-auto text-sm sm:text-base lg:text-lg touch-manipulation"
            >
              🔄 Fazer Quiz Novamente
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
