"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Loader2, ChefHat, Clock, TrendingUp, History, X, Sparkles, Trash2, Zap, Heart, Star, RefreshCw, Refrigerator, Calendar, ShoppingCart, DollarSign, Timer, Apple, ArrowRight, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

interface Ingredient {
  name: string
  quantity?: string
}

interface Recipe {
  id: string
  title: string
  ingredients: Ingredient[]
  steps: string[]
  cookTime: string
  difficulty: "Fácil" | "Médio" | "Difícil"
  detectedIngredients: string[]
  recipeType?: string
  timestamp: number
}

const loadingMessages = [
  "🔍 A analisar ingredientes...",
  "🧠 A processar lista...",
  "👨‍🍳 A gerar receita perfeita...",
  "✨ Quase pronto..."
]

const recipeTypes = [
  { id: "saudavel", label: "Receita Saudável", icon: Heart, color: "from-green-500 to-emerald-600" },
  { id: "rapida", label: "Receita Rápida", icon: Zap, color: "from-yellow-500 to-orange-600" },
  { id: "chef", label: "Receita de Chef", icon: Star, color: "from-purple-500 to-pink-600" },
  { id: "tradicional", label: "Receita Tradicional", icon: ChefHat, color: "from-blue-500 to-indigo-600" }
]

// Sugestões rápidas de ingredientes populares
const quickIngredientSuggestions = [
  "Frango", "Tomate", "Cebola", "Alho", "Arroz", 
  "Batata", "Cenoura", "Ovo", "Queijo", "Massa"
]

const quickAccessFeatures = [
  {
    title: "Frigorífico Inteligente",
    description: "Detecte ingredientes e validade",
    icon: Refrigerator,
    color: "from-blue-500 to-cyan-600",
    href: "/frigorifico"
  },
  {
    title: "MealMatch",
    description: "Combine fotos e crie receitas",
    icon: Sparkles,
    color: "from-purple-500 to-pink-600",
    href: "/mealmatch"
  },
  {
    title: "Plano Semanal",
    description: "7 dias de refeições automáticas",
    icon: Calendar,
    color: "from-orange-500 to-red-600",
    href: "/plano-semanal"
  },
  {
    title: "Lista de Compras",
    description: "Organizada inteligentemente",
    icon: ShoppingCart,
    color: "from-green-500 to-emerald-600",
    href: "/lista-compras"
  },
  {
    title: "Modo Económico",
    description: "Receitas baratas e deliciosas",
    icon: DollarSign,
    color: "from-yellow-500 to-orange-600",
    href: "/modo-economico"
  },
  {
    title: "Receitas Rápidas",
    description: "Pronto em menos de 30 min",
    icon: Timer,
    color: "from-red-500 to-pink-600",
    href: "/receitas-rapidas"
  },
  {
    title: "Receitas Saudáveis",
    description: "Nutrição e sabor equilibrados",
    icon: Apple,
    color: "from-green-400 to-teal-600",
    href: "/receitas-saudaveis"
  },
  {
    title: "Assistente de Cozinha",
    description: "Guia passo-a-passo com voz",
    icon: ChefHat,
    color: "from-indigo-500 to-purple-600",
    href: "/assistente"
  }
]

// Função para gerar receita simulada baseada nos ingredientes e tipo
const generateMockRecipe = (ingredients: string[], recipeType: string): Omit<Recipe, 'id' | 'timestamp' | 'detectedIngredients'> => {
  const recipeTypeLabel = recipeTypes.find(t => t.id === recipeType)?.label || "Receita"
  
  // Títulos baseados no tipo de receita
  const titles: Record<string, string[]> = {
    saudavel: [
      `Salada Nutritiva com ${ingredients[0]}`,
      `Bowl Saudável de ${ingredients[0]} e ${ingredients[1] || 'Vegetais'}`,
      `${ingredients[0]} Grelhado com Legumes`
    ],
    rapida: [
      `${ingredients[0]} Rápido em 15 Minutos`,
      `Express de ${ingredients[0]} e ${ingredients[1] || 'Temperos'}`,
      `${ingredients[0]} Prático do Dia a Dia`
    ],
    chef: [
      `${ingredients[0]} ao Molho Especial`,
      `Medalhões de ${ingredients[0]} com Redução`,
      `${ingredients[0]} Gourmet com Toque de Chef`
    ],
    tradicional: [
      `${ingredients[0]} à Moda da Avó`,
      `${ingredients[0]} Tradicional Português`,
      `Receita Clássica de ${ingredients[0]}`
    ]
  }

  const selectedTitles = titles[recipeType] || titles.tradicional
  const title = selectedTitles[Math.floor(Math.random() * selectedTitles.length)]

  // Gerar ingredientes com quantidades
  const recipeIngredients: Ingredient[] = ingredients.map(ing => ({
    name: ing,
    quantity: ["200g", "1 unidade", "2 colheres", "1 xícara", "3 unidades"][Math.floor(Math.random() * 5)]
  }))

  // Adicionar ingredientes complementares baseados no tipo
  const complementaryIngredients: Record<string, Ingredient[]> = {
    saudavel: [
      { name: "Azeite extra virgem", quantity: "2 colheres" },
      { name: "Limão", quantity: "1 unidade" },
      { name: "Sal marinho", quantity: "a gosto" }
    ],
    rapida: [
      { name: "Alho", quantity: "2 dentes" },
      { name: "Sal", quantity: "a gosto" },
      { name: "Pimenta", quantity: "a gosto" }
    ],
    chef: [
      { name: "Vinho branco", quantity: "100ml" },
      { name: "Manteiga", quantity: "50g" },
      { name: "Ervas finas", quantity: "a gosto" }
    ],
    tradicional: [
      { name: "Cebola", quantity: "1 unidade" },
      { name: "Alho", quantity: "3 dentes" },
      { name: "Louro", quantity: "2 folhas" }
    ]
  }

  recipeIngredients.push(...(complementaryIngredients[recipeType] || complementaryIngredients.tradicional))

  // Gerar passos baseados no tipo
  const stepsTemplates: Record<string, string[]> = {
    saudavel: [
      `Lave bem todos os ingredientes em água corrente.`,
      `Corte ${ingredients[0]} em pedaços médios e reserve.`,
      `Em uma tigela, misture todos os ingredientes.`,
      `Tempere com azeite, limão e sal marinho a gosto.`,
      `Sirva imediatamente para preservar os nutrientes.`
    ],
    rapida: [
      `Prepare todos os ingredientes cortados e separados.`,
      `Em uma frigideira quente, adicione um fio de azeite.`,
      `Refogue ${ingredients[0]} por 5 minutos em fogo alto.`,
      `Adicione os temperos e misture bem.`,
      `Sirva quente e aproveite!`
    ],
    chef: [
      `Prepare uma mise en place com todos os ingredientes.`,
      `Sele ${ingredients[0]} em fogo alto até dourar.`,
      `Deglaceie com vinho branco e deixe reduzir.`,
      `Adicione manteiga e ervas finas, criando um molho aveludado.`,
      `Finalize com um toque de flor de sal e sirva imediatamente.`
    ],
    tradicional: [
      `Refogue a cebola e o alho em azeite até ficarem dourados.`,
      `Adicione ${ingredients[0]} e deixe cozinhar em fogo médio.`,
      `Acrescente as folhas de louro e temperos.`,
      `Deixe cozinhar lentamente por 30-40 minutos.`,
      `Sirva quente acompanhado de arroz branco.`
    ]
  }

  const steps = stepsTemplates[recipeType] || stepsTemplates.tradicional

  // Tempo e dificuldade baseados no tipo
  const cookTimeMap: Record<string, string> = {
    saudavel: "20 min",
    rapida: "15 min",
    chef: "45 min",
    tradicional: "40 min"
  }

  const difficultyMap: Record<string, "Fácil" | "Médio" | "Difícil"> = {
    saudavel: "Fácil",
    rapida: "Fácil",
    chef: "Difícil",
    tradicional: "Médio"
  }

  return {
    title,
    ingredients: recipeIngredients,
    steps,
    cookTime: cookTimeMap[recipeType] || "30 min",
    difficulty: difficultyMap[recipeType] || "Médio",
    recipeType
  }
}

export default function Home() {
  const [ingredientInput, setIngredientInput] = useState("")
  const [ingredientsList, setIngredientsList] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("")
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [history, setHistory] = useState<Recipe[]>([])
  const [showRecipeTypeMenu, setShowRecipeTypeMenu] = useState(false)
  const [activeTab, setActiveTab] = useState("ingredients")
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [suggestionText, setSuggestionText] = useState("")

  // Carregar histórico do Local Storage
  useEffect(() => {
    const savedHistory = localStorage.getItem("recipeHistory")
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  // Animação de loading messages
  useEffect(() => {
    if (isGenerating) {
      let index = 0
      setLoadingMessage(loadingMessages[0])
      
      const interval = setInterval(() => {
        index = (index + 1) % loadingMessages.length
        setLoadingMessage(loadingMessages[index])
      }, 1500)

      return () => clearInterval(interval)
    }
  }, [isGenerating])

  // Sugestão inteligente baseada em ingredientes
  useEffect(() => {
    if (ingredientsList.length > 0) {
      const lastIngredient = ingredientsList[ingredientsList.length - 1].toLowerCase()
      
      // Sugestões contextuais
      if (lastIngredient.includes("frango") || lastIngredient.includes("galinha")) {
        setSuggestionText("Parece que quer cozinhar frango — quer ver receitas populares?")
        setShowSuggestion(true)
      } else if (lastIngredient.includes("massa") || lastIngredient.includes("esparguete")) {
        setSuggestionText("Massa detectada! Que tal uma receita italiana rápida?")
        setShowSuggestion(true)
      } else if (lastIngredient.includes("peixe") || lastIngredient.includes("salmão")) {
        setSuggestionText("Peixe fresco! Receitas saudáveis são perfeitas para si.")
        setShowSuggestion(true)
      } else {
        setShowSuggestion(false)
      }
    } else {
      setShowSuggestion(false)
    }
  }, [ingredientsList])

  // Salvar no histórico
  const saveToHistory = (newRecipe: Recipe) => {
    const updatedHistory = [newRecipe, ...history].slice(0, 10)
    setHistory(updatedHistory)
    localStorage.setItem("recipeHistory", JSON.stringify(updatedHistory))
  }

  // Adicionar ingrediente à lista
  const addIngredient = () => {
    const trimmed = ingredientInput.trim()
    if (trimmed && !ingredientsList.includes(trimmed)) {
      setIngredientsList([...ingredientsList, trimmed])
      setIngredientInput("")
    }
  }

  // Adicionar sugestão rápida
  const addQuickSuggestion = (ingredient: string) => {
    if (!ingredientsList.includes(ingredient)) {
      setIngredientsList([...ingredientsList, ingredient])
    }
  }

  // Remover ingrediente da lista
  const removeIngredient = (ingredient: string) => {
    setIngredientsList(ingredientsList.filter(item => item !== ingredient))
  }

  // Mostrar menu de tipos de receita
  const handleGenerateRecipeClick = () => {
    if (ingredientsList.length === 0) {
      alert("Adicione pelo menos um ingrediente para gerar uma receita!")
      return
    }
    setShowRecipeTypeMenu(true)
  }

  // Gerar receita com tipo selecionado
  const generateRecipeWithType = async (recipeType: string) => {
    setShowRecipeTypeMenu(false)
    setIsGenerating(true)
    setRecipe(null)

    try {
      // Simular delay de processamento
      await new Promise(resolve => setTimeout(resolve, 2500))

      // Gerar receita simulada
      const generatedRecipe = generateMockRecipe(ingredientsList, recipeType)
      
      const newRecipe: Recipe = {
        id: Date.now().toString(),
        ...generatedRecipe,
        detectedIngredients: ingredientsList,
        timestamp: Date.now()
      }

      console.log("✅ Receita gerada:", newRecipe.title)
      
      setRecipe(newRecipe)
      saveToHistory(newRecipe)
      console.log("✅ Receita salva no histórico!")
    } catch (error) {
      console.error("❌ Erro ao gerar receita:", error)
      alert("Erro ao gerar receita. Tente novamente.")
    } finally {
      setIsGenerating(false)
    }
  }

  // Trocar tipo de receita (mantém os mesmos ingredientes)
  const changeRecipeType = () => {
    setShowRecipeTypeMenu(true)
    setRecipe(null)
  }

  // Resetar
  const reset = () => {
    setIngredientsList([])
    setIngredientInput("")
    setRecipe(null)
    setShowRecipeTypeMenu(false)
  }

  // Visualizar receita do histórico
  const viewHistoryRecipe = (historyRecipe: Recipe) => {
    setRecipe(historyRecipe)
    setIngredientsList(historyRecipe.detectedIngredients)
    setActiveTab("ingredients")
  }

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addIngredient()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Hero Header com ilustrações suavizadas */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-orange-50/30 to-transparent dark:from-orange-900/5 pointer-events-none overflow-hidden">
        <div className="absolute top-6 left-[10%] text-4xl opacity-10 animate-float">🍅</div>
        <div className="absolute top-10 right-[15%] text-3xl opacity-8 animate-float-delayed">🥕</div>
        <div className="absolute top-8 left-[70%] text-3xl opacity-10 animate-float-slow">🥦</div>
        <div className="absolute top-12 left-[30%] text-2xl opacity-6 animate-float">🧅</div>
        <div className="absolute top-4 right-[40%] text-3xl opacity-8 animate-float-delayed">🌶️</div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8 max-w-6xl relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 h-11 bg-white/90 dark:bg-gray-800/90 shadow-md border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm rounded-xl">
            <TabsTrigger value="ingredients" className="text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-600 data-[state=active]:text-white transition-all rounded-lg">
              <Plus className="w-4 h-4 mr-1.5" />
              Nova Receita
            </TabsTrigger>
            <TabsTrigger value="history" className="text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-600 data-[state=active]:text-white transition-all rounded-lg">
              <History className="w-4 h-4 mr-1.5" />
              Histórico ({history.length})
            </TabsTrigger>
          </TabsList>

          {/* Tab: Nova Receita */}
          <TabsContent value="ingredients" className="space-y-8 animate-fade-in">
            {!recipe && !isGenerating && !showRecipeTypeMenu && (
              <>
                {/* Card Principal - Inserção de Ingredientes */}
                <Card className="p-8 md:p-10 border-none shadow-[0_10px_40px_rgba(251,146,60,0.12)] rounded-[32px] bg-white/98 dark:bg-gray-800/98 backdrop-blur-md hover:shadow-[0_15px_50px_rgba(251,146,60,0.18)] transition-all duration-500 max-w-3xl mx-auto">
                  <div className="space-y-7">
                    {/* Ícone principal melhorado */}
                    <div className="relative mx-auto w-28 h-28">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-500 rounded-[28px] blur-xl opacity-30 animate-pulse"></div>
                      <div className="relative bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-900/30 dark:to-pink-900/30 w-full h-full rounded-[28px] flex items-center justify-center shadow-[0_8px_30px_rgba(251,146,60,0.2)] border-2 border-orange-100/50 dark:border-orange-800/50">
                        <ChefHat className="w-14 h-14 text-orange-600 dark:text-orange-500" />
                      </div>
                    </div>
                    
                    {/* Tipografia melhorada */}
                    <div className="space-y-3 text-center">
                      <h2 className="text-[26px] md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
                        Que ingredientes tem hoje?
                      </h2>
                      <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto">
                        Adicione os ingredientes disponíveis e descubra receitas incríveis personalizadas para si.
                      </p>
                    </div>

                    {/* Input de ingredientes melhorado */}
                    <div className="space-y-5">
                      <div className="flex gap-3">
                        <Input
                          type="text"
                          placeholder="Ex: Frango, Tomate, Alho..."
                          value={ingredientInput}
                          onChange={(e) => setIngredientInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="flex-1 h-14 text-base border-2 border-gray-200 dark:border-gray-700 focus:border-orange-500 dark:focus:border-orange-500 transition-all rounded-xl shadow-sm focus:shadow-md px-5 font-medium"
                        />
                        <Button
                          onClick={addIngredient}
                          disabled={!ingredientInput.trim()}
                          className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 h-14 px-7 font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                          <Plus className="w-5 h-5" />
                        </Button>
                      </div>

                      {/* Sugestões rápidas de ingredientes */}
                      {ingredientsList.length === 0 && (
                        <div className="space-y-3">
                          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-orange-500" />
                            Sugestões populares:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {quickIngredientSuggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => addQuickSuggestion(suggestion)}
                                className="px-4 py-2 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 hover:from-orange-100 hover:to-pink-100 dark:hover:from-orange-900/30 dark:hover:to-pink-900/30 border border-orange-200/50 dark:border-orange-800/50 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-200 hover:scale-105 hover:shadow-md"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Lista de ingredientes adicionados */}
                      {ingredientsList.length > 0 && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                              Ingredientes ({ingredientsList.length})
                            </h3>
                            {ingredientsList.length < 3 && (
                              <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                                Adicione mais para melhores resultados
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2.5">
                            {ingredientsList.map((ingredient, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-sm py-2.5 px-4 flex items-center gap-2.5 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 border border-orange-200/50 dark:border-orange-800/50 hover:from-red-50 hover:to-red-100 dark:hover:from-red-900/30 dark:hover:to-red-900/30 transition-all duration-200 rounded-full font-medium shadow-sm hover:shadow-md animate-scale-in"
                              >
                                {ingredient}
                                <button
                                  onClick={() => removeIngredient(ingredient)}
                                  className="hover:text-red-600 dark:hover:text-red-400 transition-colors ml-1"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Sugestão inteligente contextual */}
                    {showSuggestion && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-2xl border-2 border-blue-200/50 dark:border-blue-800/50 shadow-sm animate-slide-down">
                        <p className="text-sm text-blue-800 dark:text-blue-200 flex items-start gap-3 font-medium">
                          <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                          <span>{suggestionText}</span>
                        </p>
                      </div>
                    )}

                    {/* Aviso útil melhorado */}
                    <div className="bg-gradient-to-r from-orange-50/80 to-pink-50/80 dark:from-orange-900/15 dark:to-pink-900/15 p-5 rounded-2xl border-2 border-orange-100/50 dark:border-orange-900/30 shadow-sm">
                      <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-3 font-medium leading-relaxed">
                        <Sparkles className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong className="font-bold text-orange-700 dark:text-orange-400">Dica profissional:</strong> Recomendamos pelo menos 3 ingredientes para receitas mais completas e saborosas.
                        </span>
                      </p>
                    </div>

                    {/* Botão gerar receita destacado */}
                    <Button
                      size="lg"
                      onClick={handleGenerateRecipeClick}
                      disabled={ingredientsList.length === 0}
                      className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-pink-600 hover:from-orange-600 hover:via-orange-700 hover:to-pink-700 shadow-[0_8px_30px_rgba(251,146,60,0.3)] hover:shadow-[0_12px_40px_rgba(251,146,60,0.4)] transition-all duration-300 hover:scale-[1.02] text-base font-bold h-16 px-8 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 rounded-2xl group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <ChefHat className="w-6 h-6 mr-3 relative z-10" />
                      <span className="relative z-10">Gerar Receita Personalizada</span>
                      <ArrowRight className="w-5 h-5 ml-3 relative z-10 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>

                {/* Seção de Ações Rápidas */}
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Ações Rápidas</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Acesso direto às funcionalidades principais</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Link href="/receitas">
                      <Card className="p-4 text-center cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl border-none shadow-md bg-white dark:bg-gray-800 group">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                          <ChefHat className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">Criar Receita</p>
                      </Card>
                    </Link>
                    <Link href="/frigorifico">
                      <Card className="p-4 text-center cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl border-none shadow-md bg-white dark:bg-gray-800 group">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                          <Refrigerator className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">Frigorífico</p>
                      </Card>
                    </Link>
                    <Link href="/frigorifico">
                      <Card className="p-4 text-center cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl border-none shadow-md bg-white dark:bg-gray-800 group">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                          <Apple className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">Ingredientes</p>
                      </Card>
                    </Link>
                    <Link href="/plano-semanal">
                      <Card className="p-4 text-center cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl border-none shadow-md bg-white dark:bg-gray-800 group">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">Plano Semanal</p>
                      </Card>
                    </Link>
                  </div>
                </div>

                {/* Explore Todas as Funcionalidades - Melhorado */}
                <div className="mt-16">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
                      Explore Todas as Funcionalidades
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                      Ferramentas inteligentes para transformar a sua experiência na cozinha
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {quickAccessFeatures.map((feature) => {
                      const Icon = feature.icon
                      return (
                        <Link key={feature.href} href={feature.href}>
                          <Card className="group p-7 h-full cursor-pointer hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-500 hover:scale-[1.03] rounded-[24px] border-none shadow-[0_8px_30px_rgba(0,0,0,0.08)] bg-white dark:bg-gray-800 relative overflow-hidden">
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`}></div>
                            <div className="relative z-10 space-y-5">
                              <div className={`w-16 h-16 rounded-[20px] bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.15)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                <Icon className="w-8 h-8 text-white" />
                              </div>
                              <div className="space-y-2">
                                <h3 className="font-extrabold text-lg text-gray-900 dark:text-white leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-orange-600 group-hover:to-pink-600 transition-all duration-300">
                                  {feature.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </>
            )}

            {/* Menu de seleção de tipo de receita */}
            {showRecipeTypeMenu && !isGenerating && (
              <Card className="p-8 md:p-10 border-none shadow-[0_10px_40px_rgba(251,146,60,0.12)] rounded-[32px] bg-white/98 dark:bg-gray-800/98 backdrop-blur-md max-w-3xl mx-auto animate-fade-in">
                <div className="space-y-7">
                  <div className="text-center space-y-3">
                    <h2 className="text-[26px] md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
                      Que tipo de receita prefere?
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto">
                      Escolha o estilo perfeito para a sua receita personalizada
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {recipeTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <button
                          key={type.id}
                          onClick={() => generateRecipeWithType(type.id)}
                          className="group relative p-7 rounded-[24px] border-2 border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-500 hover:scale-105 hover:shadow-[0_15px_50px_rgba(0,0,0,0.15)] bg-white dark:bg-gray-800"
                        >
                          <div className={`absolute inset-0 rounded-[24px] bg-gradient-to-br ${type.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                          <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                            <div className={`w-16 h-16 rounded-[20px] bg-gradient-to-br ${type.color} flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.15)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                            <span className="font-extrabold text-lg text-gray-900 dark:text-white group-hover:text-white transition-colors duration-500">
                              {type.label}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setShowRecipeTypeMenu(false)}
                    className="w-full h-14 font-bold text-base rounded-xl border-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    Voltar
                  </Button>
                </div>
              </Card>
            )}

            {/* Geração em progresso */}
            {isGenerating && (
              <Card className="p-16 text-center shadow-[0_20px_60px_rgba(251,146,60,0.2)] rounded-[32px] border-none bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-orange-900/20 animate-fade-in">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 bg-gradient-to-r from-orange-400 to-pink-600 rounded-full opacity-20 animate-ping"></div>
                  </div>
                  <Loader2 className="w-20 h-20 animate-spin text-orange-600 mx-auto mb-8 relative z-10" />
                </div>
                <h3 className="text-3xl font-extrabold mb-4 text-gray-900 dark:text-white">{loadingMessage}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xl font-medium">
                  Criando sua receita perfeita...
                </p>
              </Card>
            )}

            {/* Receita gerada */}
            {recipe && !isGenerating && (
              <div className="space-y-8 animate-fade-in">
                <Card className="p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.12)] rounded-[32px] border-none bg-white/98 dark:bg-gray-800/98 backdrop-blur-md">
                  <div className="space-y-8">
                    {/* Título e Info */}
                    <div>
                      <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                        {recipe.title}
                      </h2>
                      
                      <div className="flex flex-wrap gap-4">
                        <Badge variant="outline" className="flex items-center gap-2 text-base py-2 px-4 font-semibold border-2">
                          <Clock className="w-5 h-5" />
                          {recipe.cookTime}
                        </Badge>
                        <Badge 
                          variant={recipe.difficulty === "Fácil" ? "default" : recipe.difficulty === "Médio" ? "secondary" : "destructive"}
                          className="flex items-center gap-2 text-base py-2 px-4 font-semibold"
                        >
                          <TrendingUp className="w-5 h-5" />
                          {recipe.difficulty}
                        </Badge>
                        {recipe.recipeType && (
                          <Badge variant="outline" className="flex items-center gap-2 text-base py-2 px-4 font-semibold border-2 border-purple-500 text-purple-700 dark:text-purple-400">
                            <Sparkles className="w-5 h-5" />
                            {recipeTypes.find(t => t.id === recipe.recipeType)?.label || recipe.recipeType}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Ingredientes usados */}
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl">
                      <h4 className="text-sm font-semibold text-orange-900 dark:text-orange-100 mb-2">
                        Ingredientes que você tinha:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {recipe.detectedIngredients.map((ing, idx) => (
                          <Badge key={idx} variant="secondary" className="text-sm">
                            {ing}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Ingredientes */}
                    <div>
                      <h3 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white">Ingredientes</h3>
                      <ul className="space-y-3">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-start gap-3 text-lg">
                            <span className="text-orange-600 mt-1 text-xl font-bold">•</span>
                            <span className="text-gray-700 dark:text-gray-300">
                              {ingredient.quantity && (
                                <strong className="text-orange-600 font-bold">{ingredient.quantity}</strong>
                              )}{" "}
                              {ingredient.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Modo de Preparo */}
                    <div>
                      <h3 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white">Modo de Preparo</h3>
                      <ol className="space-y-5">
                        {recipe.steps.map((step, index) => (
                          <li key={index} className="flex gap-4">
                            <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                              {index + 1}
                            </span>
                            <p className="pt-2 text-lg text-gray-700 dark:text-gray-300">{step}</p>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Botões de ação */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={changeRecipeType}
                        variant="outline"
                        size="lg"
                        className="flex-1 h-14 text-base font-semibold border-2 border-orange-500 text-orange-700 dark:text-orange-400 hover:bg-orange-500 hover:text-white transition-all"
                      >
                        <RefreshCw className="w-5 h-5 mr-2" />
                        Trocar Tipo de Receita
                      </Button>
                      
                      <Button
                        onClick={reset}
                        size="lg"
                        className="flex-1 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-bold h-14 text-base"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Criar Nova Receita
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Tab: Histórico */}
          <TabsContent value="history" className="animate-fade-in">
            {history.length === 0 ? (
              <Card className="p-16 text-center shadow-2xl rounded-3xl border-none">
                <History className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Nenhuma receita ainda</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  As suas receitas geradas aparecerão aqui
                </p>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {history.map((item) => (
                  <Card
                    key={item.id}
                    className="p-6 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl border-none shadow-lg bg-white dark:bg-gray-800"
                    onClick={() => viewHistoryRecipe(item)}
                  >
                    <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">{item.title}</h3>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.detectedIngredients.slice(0, 3).map((ing, idx) => (
                        <Badge key={idx} variant="secondary" className="text-sm font-semibold">
                          {ing}
                        </Badge>
                      ))}
                      {item.detectedIngredients.length > 3 && (
                        <Badge variant="secondary" className="text-sm font-semibold">
                          +{item.detectedIngredients.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {item.cookTime}
                      </span>
                      <span>•</span>
                      <span>{item.difficulty}</span>
                      {item.recipeType && (
                        <>
                          <span>•</span>
                          <span className="text-purple-600 dark:text-purple-400 font-semibold">
                            {recipeTypes.find(t => t.id === item.recipeType)?.label || item.recipeType}
                          </span>
                        </>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Card Premium Melhorado */}
        <div className="mt-16 mb-6">
          <Card className="relative p-8 md:p-10 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-orange-900/20 dark:via-pink-900/20 dark:to-purple-900/20 border-2 border-orange-200/50 dark:border-orange-800/30 rounded-[28px] shadow-[0_15px_50px_rgba(251,146,60,0.15)] overflow-hidden group hover:shadow-[0_20px_60px_rgba(251,146,60,0.25)] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-5 flex-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-500 rounded-[20px] blur-xl opacity-40 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-orange-500 to-pink-600 p-4 rounded-[20px] shadow-[0_8px_30px_rgba(251,146,60,0.3)]">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-extrabold text-2xl text-gray-900 dark:text-white mb-3 leading-tight">
                    Desbloqueie o Chef IA Premium
                  </h4>
                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                    Receitas ilimitadas, planos semanais personalizados e lista de compras inteligente. Transforme sua cozinha hoje.
                  </p>
                </div>
              </div>
              <Link href="/premium">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 border-none text-white font-bold transition-all hover:scale-105 whitespace-nowrap h-14 px-8 text-base shadow-[0_8px_30px_rgba(251,146,60,0.3)] hover:shadow-[0_12px_40px_rgba(251,146,60,0.4)] rounded-xl group/btn"
                >
                  Saber mais
                  <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}
