"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { QuizResult as QuizResultType } from "@/types/quiz"

interface QuizResultProps {
  result: QuizResultType
  onRestart: () => void
}

export function QuizResult({ result, onRestart }: QuizResultProps) {
  // Mapeamento de cores
  const colorMap = {
    green: {
      bg: "bg-green-100",
      text: "text-green-700",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-700",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-700",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-700",
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const statsVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "backOut",
      },
    },
  }

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "backOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  }

  return (
    <motion.div
      className="min-h-screen min-h-[100dvh] flex items-center justify-center px-4 py-10 bg-gradient-to-b from-yellow-100 to-green-100 safe-area-inset"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-200"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Cabeçalho */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <motion.div
            className="text-6xl mb-4"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "backOut" }}
          >
            🎉
          </motion.div>
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Parabéns! Você conquistou os segredos da Vó Marli!
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Você demonstrou conhecimento excepcional sobre a culinária tradicional e agora tem acesso completo aos
            segredos mais valiosos da vó Marli!
          </motion.p>
        </motion.div>

        {/* Grid de Estatísticas */}
        <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mt-6" variants={itemVariants}>
          {[
            [result.totalQuestions.toString(), "Perguntas", "green"],
            [result.correctAnswers.toString(), "Acertos", "green"],
            [result.totalPoints.toString(), "Pontos", "red"],
            ["100%", "Dom da Vó Marli", "purple"],
          ].map(([num, label, colorKey], index) => {
            const color = colorMap[colorKey as keyof typeof colorMap]
            return (
              <motion.div
                key={label}
                className={`${color.bg} py-4 rounded-lg transition-all cursor-pointer`}
                variants={statsVariants}
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.p
                  className={`text-2xl font-bold ${color.text}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1, ease: "backOut" }}
                >
                  {num}
                </motion.p>
                <p className="text-sm text-gray-600">{label}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Seção de Conquista */}
        <motion.div
          className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 mt-8 border border-orange-200"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center">
            <motion.div
              className="text-4xl mb-3"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
            >
              🏆
            </motion.div>
            <h3 className="text-xl font-bold text-orange-800 mb-3">ACESSO LIBERADO AOS SEGREDOS EXCLUSIVOS!</h3>
            <p className="text-gray-700 mb-4">
              Você provou que domina os fundamentos da culinária tradicional. Agora você tem direito ao acesso completo
              ao <strong>Caderno Secreto de Receitas da Vó Marli</strong> com mais de 150 receitas exclusivas!
            </p>
          </div>
        </motion.div>

        {/* Benefícios */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6" variants={itemVariants}>
          {[
            ["✅", "Acesso Imediato", "Receba tudo agora", "blue"],
            ["✅", "150+ Receitas", "Segredos exclusivos", "green"],
            ["✅", "Garantia 7 Dias", "Ou dinheiro de volta", "purple"],
          ].map(([icon, title, desc, colorKey], index) => {
            const color = colorMap[colorKey as keyof typeof colorMap]
            return (
              <motion.div
                key={title}
                className={`${color.bg} p-4 rounded-lg text-center cursor-pointer`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="text-2xl mb-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                >
                  {icon}
                </motion.div>
                <p className={`font-semibold ${color.text}`}>{title}</p>
                <p className="text-xs text-gray-600">{desc}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Principal */}
        <motion.div className="mt-8 text-center" variants={itemVariants}>
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button
              asChild
              className="bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-300 focus:ring-offset-2 text-white text-lg font-semibold py-6 px-8 rounded-full transition-all w-full sm:w-auto h-auto shadow-xl touch-manipulation"
            >
              <a href="https://pay.cakto.com.br/w8gwixb_422387" target="_blank" rel="noopener noreferrer">
                👩‍🍳 Quero cozinhar com a Vó Marli!
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Urgência */}
        <motion.div
          className="bg-red-50 border border-red-200 rounded-xl p-4 mt-6 text-center"
          variants={itemVariants}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(239, 68, 68, 0.4)",
              "0 0 0 10px rgba(239, 68, 68, 0)",
              "0 0 0 0 rgba(239, 68, 68, 0)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <p className="text-red-700 font-semibold">🔥 OFERTA POR TEMPO LIMITADO! 🔥</p>
          <p className="text-sm text-red-600 mt-1">
            Aproveite o desconto especial disponível apenas para quem passou no teste!
          </p>
        </motion.div>

        {/* Link para refazer */}
        <motion.div className="text-center mt-6" variants={itemVariants}>
          <motion.button
            onClick={onRestart}
            className="text-sm text-blue-500 hover:underline transition-colors touch-manipulation"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔁 Refazer o Desafio da Vó Marli
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
