"use client"

import { useState } from "react"
import { Mic, MicOff, Play, Pause, RotateCcw, ChefHat, Clock, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const mockRecipe = {
  title: "Massa Carbonara Tradicional",
  steps: [
    "Coloque água para ferver em uma panela grande com sal",
    "Corte o bacon em cubos pequenos",
    "Frite o bacon em fogo médio até ficar crocante",
    "Bata os ovos com queijo parmesão ralado",
    "Cozinhe a massa al dente conforme instruções da embalagem",
    "Escorra a massa reservando um pouco da água do cozimento",
    "Misture a massa quente com o bacon",
    "Adicione a mistura de ovos mexendo rapidamente",
    "Ajuste o cremoso com a água reservada se necessário",
    "Sirva imediatamente com parmesão extra"
  ],
  totalTime: 25
}

export default function AssistentePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [timer, setTimer] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)

  const handleNext = () => {
    if (currentStep < mockRecipe.steps.length - 1) {
      setCurrentStep(currentStep + 1)
      if (voiceEnabled) {
        speakStep(currentStep + 1)
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      if (voiceEnabled) {
        speakStep(currentStep - 1)
      }
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setIsPlaying(false)
    setTimer(0)
    setTimerRunning(false)
  }

  const speakStep = (stepIndex: number) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(mockRecipe.steps[stepIndex])
      utterance.lang = 'pt-BR'
      window.speechSynthesis.speak(utterance)
    }
  }

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled)
    if (!voiceEnabled) {
      speakStep(currentStep)
    } else {
      window.speechSynthesis.cancel()
    }
  }

  const progress = ((currentStep + 1) / mockRecipe.steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full font-semibold mb-4 shadow-lg">
            <ChefHat className="w-5 h-5" />
            <span>Assistente de Cozinha</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {mockRecipe.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-5 h-5" />
              {mockRecipe.totalTime} min
            </span>
            <span>•</span>
            <span>{mockRecipe.steps.length} passos</span>
          </div>
        </div>

        {/* Progresso */}
        <Card className="p-6 mb-6 shadow-lg rounded-2xl border-none bg-white/95 dark:bg-gray-800/95">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Passo {currentStep + 1} de {mockRecipe.steps.length}
            </span>
            <span className="text-2xl font-bold text-indigo-600">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </Card>

        {/* Passo Atual */}
        <Card className="p-8 md:p-12 mb-6 shadow-2xl rounded-3xl border-none bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
              {currentStep + 1}
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-relaxed">
              {mockRecipe.steps[currentStep]}
            </p>
          </div>

          {/* Controles de Voz */}
          <div className="flex justify-center mb-6">
            <Button
              size="lg"
              variant={voiceEnabled ? "default" : "outline"}
              onClick={toggleVoice}
              className={`h-16 px-8 ${
                voiceEnabled
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  : "border-2 border-indigo-500"
              }`}
            >
              {voiceEnabled ? (
                <>
                  <Volume2 className="w-6 h-6 mr-2" />
                  Voz Ativa
                </>
              ) : (
                <>
                  <MicOff className="w-6 h-6 mr-2" />
                  Ativar Voz
                </>
              )}
            </Button>
          </div>

          {/* Navegação */}
          <div className="grid grid-cols-3 gap-4">
            <Button
              size="lg"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="h-14 border-2 border-indigo-500 disabled:opacity-50"
            >
              Anterior
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={handleReset}
              className="h-14 border-2 border-gray-400"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>

            <Button
              size="lg"
              onClick={handleNext}
              disabled={currentStep === mockRecipe.steps.length - 1}
              className="h-14 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50"
            >
              Próximo
            </Button>
          </div>
        </Card>

        {/* Temporizador */}
        <Card className="p-6 shadow-lg rounded-2xl border-none bg-white/95 dark:bg-gray-800/95">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                Temporizador
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Configure um timer para este passo
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-indigo-600">
                {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
              </div>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setTimerRunning(!timerRunning)}
                className="border-2 border-indigo-500"
              >
                {timerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </Card>

        {/* Lista de Passos */}
        <Card className="mt-6 p-6 shadow-lg rounded-2xl border-none bg-white/95 dark:bg-gray-800/95">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Todos os Passos
          </h3>
          <div className="space-y-3">
            {mockRecipe.steps.map((step, index) => (
              <div
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  index === currentStep
                    ? "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-2 border-indigo-500"
                    : index < currentStep
                    ? "bg-green-50 dark:bg-green-900/20 border-2 border-green-500"
                    : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Badge
                    className={`${
                      index === currentStep
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600"
                        : index < currentStep
                        ? "bg-green-500"
                        : "bg-gray-400"
                    } text-white border-none`}
                  >
                    {index + 1}
                  </Badge>
                  <p className={`flex-1 ${
                    index < currentStep
                      ? "line-through text-gray-500 dark:text-gray-400"
                      : "text-gray-900 dark:text-white"
                  }`}>
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  )
}
