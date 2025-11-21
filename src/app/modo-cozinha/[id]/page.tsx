"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, ArrowRight, Check, Volume2, VolumeX, 
  Timer, Play, Pause, RotateCcw, Lightbulb, ChefHat
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Receita de exemplo (mesma do exemplo anterior)
const mockRecipe = {
  id: "1",
  title: "Frango Grelhado com Legumes Assados",
  steps: [
    {
      number: 1,
      instruction: "Pré-aqueça o forno a 200°C. Enquanto aquece, prepare uma assadeira grande forrada com papel vegetal.",
      time: 5,
      tip: "Pré-aquecer o forno garante que os legumes assem uniformemente desde o início.",
      aiTip: "Não tem papel vegetal? Use um fio de azeite na assadeira para evitar que os legumes grudem."
    },
    {
      number: 2,
      instruction: "Lave bem todos os legumes em água corrente. Corte a batata doce em cubos médios (cerca de 2cm), a cenoura em rodelas grossas e separe os floretes de brócolis.",
      time: 8,
      tip: "Corte os legumes em tamanhos similares para que cozinhem ao mesmo tempo.",
      aiTip: "Primeira vez cortando legumes? Comece devagar e use uma tábua antiderrapante para segurança."
    },
    {
      number: 3,
      instruction: "Em uma tigela grande, misture os legumes cortados com 2 colheres de sopa de azeite, sal, pimenta, tomilho e metade do alho picado. Misture bem para que todos os legumes fiquem temperados.",
      time: 3,
      tip: "Use as mãos para misturar - assim você garante que o tempero cubra todos os legumes uniformemente.",
      aiTip: "Não tem tomilho? Pode usar orégano ou alecrim. O importante é ter uma erva aromática."
    },
    {
      number: 4,
      instruction: "Espalhe os legumes na assadeira em uma única camada, sem empilhar. Leve ao forno por 25-30 minutos, virando na metade do tempo.",
      time: 30,
      tip: "Não empilhe os legumes! Eles precisam de espaço para assar e ficarem crocantes, não cozidos no vapor.",
      aiTip: "Configure um timer para 15 minutos - é hora de virar os legumes para assarem uniformemente."
    },
    {
      number: 5,
      instruction: "Enquanto os legumes assam, prepare o frango. Tempere os peitos de frango com sal, pimenta, o restante do alho picado, suco de meio limão e alecrim fresco.",
      time: 5,
      tip: "Deixe o frango marinar por alguns minutos enquanto prepara a grelha - isso intensifica o sabor.",
      aiTip: "Não tem limão fresco? Limão de garrafa funciona perfeitamente nesta receita."
    },
    {
      number: 6,
      instruction: "Aqueça uma grelha ou frigideira antiaderente em fogo médio-alto. Adicione um fio de azeite e coloque os peitos de frango.",
      time: 2,
      tip: "A grelha deve estar bem quente antes de adicionar o frango para criar aquelas marcas lindas de grelhado.",
      aiTip: "Teste se a frigideira está quente pingando uma gota de água - deve chiar imediatamente."
    },
    {
      number: 7,
      instruction: "Grelhe o frango por 6-7 minutos de cada lado, ou até que esteja completamente cozido (temperatura interna de 75°C). Não mexa constantemente - deixe criar uma crosta dourada.",
      time: 15,
      tip: "Para saber se está pronto, pressione levemente o frango - deve estar firme ao toque, não mole.",
      aiTip: "Não tem termômetro? Corte um pedaço no centro - deve estar branco por dentro, sem partes rosadas."
    },
    {
      number: 8,
      instruction: "Retire o frango da grelha e deixe descansar por 5 minutos coberto com papel alumínio. Isso redistribui os sucos e deixa a carne mais suculenta.",
      time: 5,
      tip: "Nunca pule esta etapa! O descanso é essencial para um frango suculento.",
      aiTip: "Use este tempo para finalizar os legumes ou preparar a mesa."
    },
    {
      number: 9,
      instruction: "Sirva o frango fatiado sobre os legumes assados. Finalize com um fio de azeite extra virgem, raspas do limão restante e folhas frescas de alecrim.",
      time: 2,
      tip: "As raspas de limão adicionam um toque cítrico incrível sem acidez excessiva.",
      aiTip: "Não tem ralador? Corte o limão em fatias finas e use como decoração."
    }
  ]
}

export default function ModoCozinhaPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [showTip, setShowTip] = useState(false)

  const step = mockRecipe.steps[currentStep]
  const progress = ((currentStep + 1) / mockRecipe.steps.length) * 100

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false)
            // Som de notificação (em produção)
            alert("⏰ Timer finalizado!")
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerRunning, timerSeconds])

  // Leitura por voz (simulada)
  const handleReadStep = () => {
    if (isVoiceEnabled) {
      // Em produção, usaria Web Speech API
      alert(`🔊 Lendo passo ${step.number}:\n\n${step.instruction}`)
    }
    setIsVoiceEnabled(!isVoiceEnabled)
  }

  const handleNextStep = () => {
    if (currentStep < mockRecipe.steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setShowTip(false)
      setTimerSeconds(0)
      setIsTimerRunning(false)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setShowTip(false)
      setTimerSeconds(0)
      setIsTimerRunning(false)
    }
  }

  const handleStartTimer = () => {
    if (step.time) {
      setTimerSeconds(step.time * 60)
      setIsTimerRunning(true)
    }
  }

  const handleToggleTimer = () => {
    setIsTimerRunning(!isTimerRunning)
  }

  const handleResetTimer = () => {
    if (step.time) {
      setTimerSeconds(step.time * 60)
      setIsTimerRunning(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleFinish = () => {
    alert("🎉 Parabéns! Receita concluída com sucesso!")
    router.push("/receitas")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header fixo */}
      <div className="sticky top-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="container mx-auto px-4 py-4 max-w-5xl">
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="hover:bg-purple-100 dark:hover:bg-purple-900/20"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Sair do Modo Cozinha
            </Button>
            
            <div className="flex items-center gap-3">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-base px-4 py-2">
                <ChefHat className="w-4 h-4 mr-2" />
                Passo {currentStep + 1} de {mockRecipe.steps.length}
              </Badge>
            </div>
          </div>

          {/* Barra de progresso */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Card Principal do Passo */}
        <Card className="p-12 md:p-16 rounded-[32px] border-none shadow-[0_20px_60px_rgba(0,0,0,0.12)] bg-white/98 dark:bg-gray-800/98 backdrop-blur-md mb-8">
          <div className="space-y-8">
            {/* Número do passo */}
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-4xl font-extrabold text-white">
                  {step.number}
                </span>
              </div>
            </div>

            {/* Instrução */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                {step.instruction}
              </h2>
            </div>

            {/* Timer integrado */}
            {step.time && (
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 text-blue-800 dark:text-blue-200">
                    <Timer className="w-6 h-6" />
                    <span className="text-lg font-semibold">
                      Tempo estimado: {step.time} min
                    </span>
                  </div>

                  {timerSeconds > 0 ? (
                    <>
                      <div className="text-6xl font-extrabold text-blue-600 dark:text-blue-400">
                        {formatTime(timerSeconds)}
                      </div>
                      <div className="flex gap-3 justify-center">
                        <Button
                          size="lg"
                          onClick={handleToggleTimer}
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                        >
                          {isTimerRunning ? (
                            <>
                              <Pause className="w-5 h-5 mr-2" />
                              Pausar
                            </>
                          ) : (
                            <>
                              <Play className="w-5 h-5 mr-2" />
                              Continuar
                            </>
                          )}
                        </Button>
                        <Button
                          size="lg"
                          variant="outline"
                          onClick={handleResetTimer}
                          className="border-2 border-blue-500"
                        >
                          <RotateCcw className="w-5 h-5 mr-2" />
                          Reiniciar
                        </Button>
                      </div>
                    </>
                  ) : (
                    <Button
                      size="lg"
                      onClick={handleStartTimer}
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                    >
                      <Timer className="w-5 h-5 mr-2" />
                      Iniciar Timer ({step.time} min)
                    </Button>
                  )}
                </div>
              </Card>
            )}

            {/* Dica do passo */}
            {step.tip && (
              <Card className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-2xl">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-orange-900 dark:text-orange-100 mb-2">
                      Dica Profissional
                    </h3>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      {step.tip}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Dica da IA */}
            {showTip && step.aiTip && (
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-2xl animate-fade-in">
                <div className="flex items-start gap-3">
                  <ChefHat className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-purple-900 dark:text-purple-100 mb-2">
                      Dica Inteligente da IA
                    </h3>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      {step.aiTip}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Botão para mostrar dica da IA */}
            {!showTip && step.aiTip && (
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => setShowTip(true)}
                  className="border-2 border-purple-500 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                >
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Ver Dica Inteligente
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Controles de navegação */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            size="lg"
            variant="outline"
            onClick={handlePreviousStep}
            disabled={currentStep === 0}
            className="h-16 text-lg font-bold border-2 disabled:opacity-50"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Passo Anterior
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={handleReadStep}
            className={`h-16 text-lg font-bold border-2 ${
              isVoiceEnabled
                ? "bg-purple-50 border-purple-500 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"
                : ""
            }`}
          >
            {isVoiceEnabled ? (
              <>
                <Volume2 className="w-5 h-5 mr-2" />
                Voz Ativada
              </>
            ) : (
              <>
                <VolumeX className="w-5 h-5 mr-2" />
                Ativar Leitura
              </>
            )}
          </Button>

          {currentStep === mockRecipe.steps.length - 1 ? (
            <Button
              size="lg"
              onClick={handleFinish}
              className="h-16 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Check className="w-5 h-5 mr-2" />
              Finalizar Receita
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={handleNextStep}
              className="h-16 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Próximo Passo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}
        </div>

        {/* Informação adicional */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-blue-900 dark:text-blue-100 mb-2">
                Modo Cozinha Ativo
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Interface otimizada para cozinhar. Navegue pelos passos, use timers integrados e ative a leitura por voz para uma experiência hands-free.
              </p>
            </div>
          </div>
        </Card>
      </main>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
