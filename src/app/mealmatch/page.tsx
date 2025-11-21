"use client"

import { useState } from "react"
import { Sparkles, Plus, X, Loader2, Users, ShoppingCart, Lightbulb, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface MatchResult {
  possibleRecipes: {
    title: string
    ingredients: string[]
    matchPercentage: number
  }[]
  missingIngredients: {
    name: string
    priority: "essential" | "optional"
  }[]
  suggestions: string[]
}

export default function MealMatchPage() {
  const [userAIngredients, setUserAIngredients] = useState<string[]>([])
  const [userBIngredients, setUserBIngredients] = useState<string[]>([])
  const [inputA, setInputA] = useState("")
  const [inputB, setInputB] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<MatchResult | null>(null)

  const handleAddIngredientA = () => {
    if (inputA.trim() && !userAIngredients.includes(inputA.trim())) {
      setUserAIngredients([...userAIngredients, inputA.trim()])
      setInputA("")
    }
  }

  const handleAddIngredientB = () => {
    if (inputB.trim() && !userBIngredients.includes(inputB.trim())) {
      setUserBIngredients([...userBIngredients, inputB.trim()])
      setInputB("")
    }
  }

  const handleRemoveIngredientA = (ingredient: string) => {
    setUserAIngredients(userAIngredients.filter(i => i !== ingredient))
  }

  const handleRemoveIngredientB = (ingredient: string) => {
    setUserBIngredients(userBIngredients.filter(i => i !== ingredient))
  }

  const handleGenerate = async () => {
    if (userAIngredients.length === 0 || userBIngredients.length === 0) {
      alert("Ambos os utilizadores precisam adicionar ingredientes!")
      return
    }

    setIsGenerating(true)
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 2500))

    // Resultado simulado
    const mockResult: MatchResult = {
      possibleRecipes: [
        {
          title: "Massa Carbonara Criativa",
          ingredients: [...userAIngredients, ...userBIngredients].slice(0, 6),
          matchPercentage: 95
        },
        {
          title: "Salada Completa de Frango",
          ingredients: [...userAIngredients, ...userBIngredients].slice(0, 5),
          matchPercentage: 85
        },
        {
          title: "Risoto de Legumes",
          ingredients: [...userAIngredients, ...userBIngredients].slice(0, 7),
          matchPercentage: 78
        }
      ],
      missingIngredients: [
        { name: "Cebola", priority: "essential" },
        { name: "Queijo parmesão", priority: "essential" },
        { name: "Manjericão", priority: "optional" }
      ],
      suggestions: [
        "Com apenas cebola e queijo, vocês podem fazer uma Massa Carbonara perfeita!",
        "Combinando os ingredientes de ambos, têm tudo para um jantar completo.",
        "Sugestão: Façam a Salada de Frango como entrada e a Massa como prato principal."
      ]
    }

    setResult(mockResult)
    setIsGenerating(false)
  }

  const handleReset = () => {
    setUserAIngredients([])
    setUserBIngredients([])
    setInputA("")
    setInputB("")
    setResult(null)
  }

  const handleKeyPressA = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAddIngredientA()
  }

  const handleKeyPressB = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAddIngredientB()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full font-semibold mb-4 shadow-lg">
            <Sparkles className="w-5 h-5" />
            <span>MealMatch</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Combine Ingredientes com Amigos
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Cada pessoa adiciona seus ingredientes e a IA cria receitas perfeitas combinando tudo que vocês têm!
          </p>
        </div>

        {!result && !isGenerating && (
          <>
            {/* Inputs de Ingredientes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Utilizador A */}
              <Card className="p-8 shadow-lg rounded-[24px] border-none bg-white/95 dark:bg-gray-800/95">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Utilizador A
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {userAIngredients.length} ingredientes
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Input
                      type="text"
                      placeholder="Ex: Frango, Tomate, Alho..."
                      value={inputA}
                      onChange={(e) => setInputA(e.target.value)}
                      onKeyPress={handleKeyPressA}
                      className="flex-1 h-12 text-base"
                    />
                    <Button
                      onClick={handleAddIngredientA}
                      disabled={!inputA.trim()}
                      className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 h-12 px-6"
                    >
                      <Plus className="w-5 h-5" />
                    </Button>
                  </div>

                  {userAIngredients.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                        Ingredientes adicionados:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {userAIngredients.map((ingredient, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-sm py-2 px-4 flex items-center gap-2 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800"
                          >
                            {ingredient}
                            <button
                              onClick={() => handleRemoveIngredientA(ingredient)}
                              className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Utilizador B */}
              <Card className="p-8 shadow-lg rounded-[24px] border-none bg-white/95 dark:bg-gray-800/95">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Utilizador B
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {userBIngredients.length} ingredientes
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Input
                      type="text"
                      placeholder="Ex: Massa, Queijo, Ovos..."
                      value={inputB}
                      onChange={(e) => setInputB(e.target.value)}
                      onKeyPress={handleKeyPressB}
                      className="flex-1 h-12 text-base"
                    />
                    <Button
                      onClick={handleAddIngredientB}
                      disabled={!inputB.trim()}
                      className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 h-12 px-6"
                    >
                      <Plus className="w-5 h-5" />
                    </Button>
                  </div>

                  {userBIngredients.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                        Ingredientes adicionados:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {userBIngredients.map((ingredient, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-sm py-2 px-4 flex items-center gap-2 bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border border-pink-200 dark:border-pink-800"
                          >
                            {ingredient}
                            <button
                              onClick={() => handleRemoveIngredientB(ingredient)}
                              className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Botão Gerar */}
            <Button
              size="lg"
              onClick={handleGenerate}
              disabled={userAIngredients.length === 0 || userBIngredients.length === 0}
              className="w-full h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 hover:from-purple-600 hover:via-pink-600 hover:to-pink-700 text-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-6 h-6 mr-2" />
              Combinar e Criar Receitas
            </Button>
          </>
        )}

        {/* Loading */}
        {isGenerating && (
          <Card className="p-16 text-center shadow-2xl rounded-3xl border-none bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <Loader2 className="w-20 h-20 animate-spin text-purple-600 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
              Combinando ingredientes...
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A IA está criando receitas perfeitas para vocês
            </p>
          </Card>
        )}

        {/* Resultado */}
        {result && !isGenerating && (
          <div className="space-y-8 animate-fade-in">
            {/* Sugestões Inteligentes */}
            <Card className="p-8 shadow-lg rounded-[24px] border-none bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Sugestões Inteligentes
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Baseado nos ingredientes combinados de ambos
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {result.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                    <span className="text-2xl">💡</span>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      {suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Receitas Possíveis */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <ChefHat className="w-8 h-8 text-purple-600" />
                Receitas Possíveis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {result.possibleRecipes.map((recipe, index) => (
                  <Card key={index} className="p-6 shadow-lg rounded-[24px] border-none bg-white/95 dark:bg-gray-800/95 hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                          {recipe.matchPercentage}% Match
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {recipe.title}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        Ingredientes usados:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {recipe.ingredients.map((ing, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {ing}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Ingredientes em Falta */}
            <Card className="p-8 shadow-lg rounded-[24px] border-none bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Para Completar as Receitas
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Basta comprar estes ingredientes
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.missingIngredients.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {item.name}
                    </span>
                    <Badge variant={item.priority === "essential" ? "destructive" : "secondary"}>
                      {item.priority === "essential" ? "Essencial" : "Opcional"}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Botão Reset */}
            <Button
              size="lg"
              onClick={handleReset}
              className="w-full h-16 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-xl font-bold shadow-lg"
            >
              <Plus className="w-6 h-6 mr-2" />
              Criar Nova Combinação
            </Button>
          </div>
        )}
      </main>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
