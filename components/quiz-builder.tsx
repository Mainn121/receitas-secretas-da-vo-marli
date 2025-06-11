"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import type { QuizConfig, QuizQuestion, QuestionType } from "@/types/quiz"
import { Plus, Trash2, Settings, Play } from "lucide-react"

interface QuizBuilderProps {
  onQuizStart: (config: QuizConfig) => void
}

export function QuizBuilder({ onQuizStart }: QuizBuilderProps) {
  const [config, setConfig] = useState<QuizConfig>({
    title: "Quiz dos Segredos da Vó Marli",
    description: "Teste seus conhecimentos culinários",
    timeLimit: 30,
    showTimer: true,
    randomizeQuestions: false,
    passingScore: 70,
    questions: [
      {
        id: "1",
        type: "multiple-choice",
        question: "Qual é o segredo para um bolo fofo?",
        options: ["Bater as claras em neve", "Usar fermento em pó", "Adicionar água morna", "Misturar devagar"],
        correctAnswer: 0,
        points: 10,
        feedback: {
          correct: "Perfeito! As claras em neve deixam o bolo mais aerado!",
          incorrect: "Quase lá! O segredo está nas claras em neve.",
        },
      },
    ],
  })

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      points: 10,
      feedback: {
        correct: "Correto!",
        incorrect: "Tente novamente!",
      },
    }
    setConfig((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }))
  }

  const updateQuestion = (index: number, updates: Partial<QuizQuestion>) => {
    setConfig((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) => (i === index ? { ...q, ...updates } : q)),
    }))
  }

  const removeQuestion = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }))
  }

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const question = config.questions[questionIndex]
    const newOptions = [...question.options]
    newOptions[optionIndex] = value
    updateQuestion(questionIndex, { options: newOptions })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-800 mb-4">Configurador de Quiz Profissional</h1>
          <p className="text-orange-600">Crie seu quiz personalizado com configurações avançadas</p>
        </div>

        {/* Quiz Settings */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Configurações Gerais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title">Título do Quiz</Label>
                <Input
                  id="title"
                  value={config.title}
                  onChange={(e) => setConfig((prev) => ({ ...prev, title: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="timeLimit">Tempo por Pergunta (segundos)</Label>
                <Input
                  id="timeLimit"
                  type="number"
                  value={config.timeLimit}
                  onChange={(e) => setConfig((prev) => ({ ...prev, timeLimit: Number.parseInt(e.target.value) }))}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={config.description}
                onChange={(e) => setConfig((prev) => ({ ...prev, description: e.target.value }))}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="showTimer"
                  checked={config.showTimer}
                  onCheckedChange={(checked) => setConfig((prev) => ({ ...prev, showTimer: checked }))}
                />
                <Label htmlFor="showTimer">Mostrar Timer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="randomize"
                  checked={config.randomizeQuestions}
                  onCheckedChange={(checked) => setConfig((prev) => ({ ...prev, randomizeQuestions: checked }))}
                />
                <Label htmlFor="randomize">Embaralhar Perguntas</Label>
              </div>
              <div>
                <Label htmlFor="passingScore">Nota de Aprovação (%)</Label>
                <Input
                  id="passingScore"
                  type="number"
                  value={config.passingScore}
                  onChange={(e) => setConfig((prev) => ({ ...prev, passingScore: Number.parseInt(e.target.value) }))}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="space-y-6">
          {config.questions.map((question, questionIndex) => (
            <Card key={question.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Pergunta {questionIndex + 1}</span>
                  <Button variant="destructive" size="sm" onClick={() => removeQuestion(questionIndex)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Tipo de Pergunta</Label>
                    <Select
                      value={question.type}
                      onValueChange={(value: QuestionType) => updateQuestion(questionIndex, { type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="multiple-choice">Múltipla Escolha</SelectItem>
                        <SelectItem value="true-false">Verdadeiro/Falso</SelectItem>
                        <SelectItem value="text">Texto Livre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Pontos</Label>
                    <Input
                      type="number"
                      value={question.points}
                      onChange={(e) => updateQuestion(questionIndex, { points: Number.parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Pergunta</Label>
                  <Textarea
                    value={question.question}
                    onChange={(e) => updateQuestion(questionIndex, { question: e.target.value })}
                    placeholder="Digite sua pergunta aqui..."
                  />
                </div>

                {question.type === "multiple-choice" && (
                  <div>
                    <Label>Opções de Resposta</Label>
                    <div className="space-y-2 mt-2">
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <Input
                            value={option}
                            onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                            placeholder={`Opção ${optionIndex + 1}`}
                          />
                          <Switch
                            checked={question.correctAnswer === optionIndex}
                            onCheckedChange={(checked) => {
                              if (checked) updateQuestion(questionIndex, { correctAnswer: optionIndex })
                            }}
                          />
                          <Label className="text-sm">Correta</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {question.type === "true-false" && (
                  <div>
                    <Label>Resposta Correta</Label>
                    <Select
                      value={question.correctAnswer?.toString()}
                      onValueChange={(value) =>
                        updateQuestion(questionIndex, { correctAnswer: Number.parseInt(value) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Verdadeiro</SelectItem>
                        <SelectItem value="0">Falso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Feedback - Resposta Correta</Label>
                    <Textarea
                      value={question.feedback.correct}
                      onChange={(e) =>
                        updateQuestion(questionIndex, {
                          feedback: { ...question.feedback, correct: e.target.value },
                        })
                      }
                      placeholder="Mensagem para resposta correta"
                    />
                  </div>
                  <div>
                    <Label>Feedback - Resposta Incorreta</Label>
                    <Textarea
                      value={question.feedback.incorrect}
                      onChange={(e) =>
                        updateQuestion(questionIndex, {
                          feedback: { ...question.feedback, incorrect: e.target.value },
                        })
                      }
                      placeholder="Mensagem para resposta incorreta"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Button onClick={addQuestion} variant="outline" className="flex items-center gap-2 px-8 py-4 h-auto text-lg">
            <Plus className="w-5 h-5" />
            Adicionar Pergunta
          </Button>

          <Button
            onClick={() => onQuizStart(config)}
            className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2 px-12 py-4 h-auto text-xl font-bold rounded-xl"
            disabled={config.questions.length === 0}
          >
            <Play className="w-6 h-6" />
            Iniciar Quiz Profissional
          </Button>
        </div>
      </div>
    </div>
  )
}
