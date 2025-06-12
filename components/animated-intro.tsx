"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
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
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  }

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 relative overflow-hidden safe-area-inset">
      {/* Cooking Pot Animation - Responsive positioning */}
      <motion.div
        className="absolute top-[15%] sm:top-1/4 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: "backOut", delay: 0.5 }}
      >
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
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center min-h-screen min-h-[100dvh] p-4 sm:p-6 md:p-8"
        variants={containerVariants}
        initial="hidden"
        animate={showContent ? "visible" : "hidden"}
      >
        <div className="text-center w-full max-w-4xl mx-auto pt-32 sm:pt-40 md:pt-32">
          <motion.div className="flex items-center justify-center mb-4 sm:mb-6" variants={itemVariants}>
            <motion.div variants={iconVariants}>
              <Lock className="w-8 h-8 sm:w-12 md:w-16 text-yellow-300 mr-2 sm:mr-4" />
            </motion.div>
            <motion.div variants={iconVariants}>
              <BookOpen className="w-8 h-8 sm:w-12 md:w-16 text-white" />
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2"
            variants={itemVariants}
          >
            Segredos Secretos
            <br />
            <motion.span
              className="text-yellow-200"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              da Vó Marli
            </motion.span>
          </motion.h1>

          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 mx-auto max-w-2xl"
            variants={itemVariants}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed">
              🔒 <strong>ACESSO EXCLUSIVO</strong> 🔒
              <br />
              <br />
              Descubra os <span className="text-yellow-200 font-bold">SEGREDOS MAIS VALIOSOS</span> da culinária
              tradicional que transformaram gerações de cozinheiros em verdadeiros chefs!
            </p>
          </motion.div>

          <motion.div
            className="bg-yellow-400/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 mb-6 sm:mb-8 mx-auto max-w-xl border border-yellow-300/30"
            variants={itemVariants}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(255, 255, 0, 0.4)",
                "0 0 0 10px rgba(255, 255, 0, 0)",
                "0 0 0 0 rgba(255, 255, 0, 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            <p className="text-white font-bold text-sm sm:text-base lg:text-lg">
              ✨ Responda 5 perguntas rápidas e ganhe acesso imediato aos segredos!
            </p>
          </motion.div>

          <motion.div className="space-y-3 sm:space-y-4" variants={itemVariants}>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button
                onClick={onComplete}
                className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black text-lg sm:text-xl lg:text-2xl px-8 sm:px-12 lg:px-16 py-4 sm:py-6 lg:py-8 h-auto font-bold rounded-xl sm:rounded-2xl shadow-2xl touch-manipulation"
              >
                🔥 DESCOBRIR OS SEGREDOS 🔥
              </Button>
            </motion.div>

            <motion.p
              className="text-white/80 text-xs sm:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
            >
              Apenas 5 perguntas para liberar seu acesso
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
