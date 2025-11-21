"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  Clock, TrendingUp, Heart, ChefHat, Calendar, ShoppingCart, 
  Star, Check, X, Sparkles, ArrowLeft, Play, Lightbulb, Users,
  Flame, Droplet, Timer
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

// Receita de exemplo (em produção viria de API/DB)
const mockRecipe = {
  id: "1",
  title: "Frango Grelhado com Legumes Assados",
  image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&h=600&fit=crop",
  cookTime: "45 min",
  prepTime: "15 min",
  difficulty: "Fácil",
  servings: 4,
  calories: 380,
  category: "Saudável",
  description: "Uma refeição completa, equilibrada e deliciosa. Peito de frango suculento grelhado com perfeição, acompanhado de legumes frescos assados no forno com ervas aromáticas. Ideal para quem procura uma opção saudável sem abrir mão do sabor.",
  ingredients: [
    { name: "Peito de frango", quantity: "600g", category: "Carnes" },
    { name: "Brócolis", quantity: "300g", category: "Vegetais" },
    { name: "Cenoura", quantity: "2 unidades", category: "Vegetais" },
    { name: "Batata doce", quantity: "2 unidades médias", category: "Vegetais" },
    { name: "Azeite extra virgem", quantity: "3 colheres de sopa", category: "Óleos" },
    { name: "Alho", quantity: "4 dentes", category: "Temperos" },
    { name: "Limão", quantity: "1 unidade", category: "Frutas" },
    { name: "Sal marinho", quantity: "a gosto", category: "Temperos" },
    { name: "Pimenta do reino", quantity: "a gosto", category: "Temperos" },
    { name: "Alecrim fresco", quantity: "2 ramos", category: "Ervas" },
    { name: "Tomilho", quantity: "1 colher de chá", category: "Ervas" }
  ],
  steps: [
    {
      number: 1,
      instruction: "Pré-aqueça o forno a 200°C. Enquanto aquece, prepare uma assadeira grande forrada com papel vegetal.",
      time: "5 min",
      tip: "Pré-aquecer o forno garante que os legumes assem uniformemente desde o início."
    },
    {
      number: 2,
      instruction: "Lave bem todos os legumes em água corrente. Corte a batata doce em cubos médios (cerca de 2cm), a cenoura em rodelas grossas e separe os floretes de brócolis.",
      time: "8 min",
      tip: "Corte os legumes em tamanhos similares para que cozinhem ao mesmo tempo."
    },
    {
      number: 3,
      instruction: "Em uma tigela grande, misture os legumes cortados com 2 colheres de sopa de azeite, sal, pimenta, tomilho e metade do alho picado. Misture bem para que todos os legumes fiquem temperados.",
      time: "3 min",
      tip: "Use as mãos para misturar - assim você garante que o tempero cubra todos os legumes uniformemente."
    },
    {
      number: 4,
      instruction: "Espalhe os legumes na assadeira em uma única camada, sem empilhar. Leve ao forno por 25-30 minutos, virando na metade do tempo.",
      time: "30 min",
      tip: "Não empilhe os legumes! Eles precisam de espaço para assar e ficarem crocantes, não cozidos no vapor."
    },
    {
      number: 5,
      instruction: "Enquanto os legumes assam, prepare o frango. Tempere os peitos de frango com sal, pimenta, o restante do alho picado, suco de meio limão e alecrim fresco.",
      time: "5 min",
      tip: "Deixe o frango marinar por alguns minutos enquanto prepara a grelha - isso intensifica o sabor."
    },
    {
      number: 6,
      instruction: "Aqueça uma grelha ou frigideira antiaderente em fogo médio-alto. Adicione um fio de azeite e coloque os peitos de frango.",
      time: "2 min",
      tip: "A grelha deve estar bem quente antes de adicionar o frango para criar aquelas marcas lindas de grelhado."
    },
    {
      number: 7,
      instruction: "Grelhe o frango por 6-7 minutos de cada lado, ou até que esteja completamente cozido (temperatura interna de 75°C). Não mexa constantemente - deixe criar uma crosta dourada.",
      time: "15 min",
      tip: "Para saber se está pronto, pressione levemente o frango - deve estar firme ao toque, não mole."
    },
    {
      number: 8,
      instruction: "Retire o frango da grelha e deixe descansar por 5 minutos coberto com papel alumínio. Isso redistribui os sucos e deixa a carne mais suculenta.",
      time: "5 min",
      tip: "Nunca pule esta etapa! O descanso é essencial para um frango suculento."
    },
    {
      number: 9,
      instruction: "Sirva o frango fatiado sobre os legumes assados. Finalize com um fio de azeite extra virgem, raspas do limão restante e folhas frescas de alecrim.",
      time: "2 min",
      tip: "As raspas de limão adicionam um toque cítrico incrível sem acidez excessiva."
    }
  ],
  nutrition: {
    calories: 380,
    protein: "42g",
    carbs: "28g",
    fat: "12g",
    fiber: "6g"
  },
  tags: ["Saudável", "Sem Glúten", "Rico em Proteína", "Baixo Carboidrato"],
  similarRecipes: [
    {
      id: "2",
      title: "Salmão Grelhado com Aspargos",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop",
      time: "35 min"
    },
    {
      id: "3",
      title: "Peito de Peru com Quinoa",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop",
      time: "40 min"
    },
    {
      id: "4",
      title: "Tofu Grelhado com Vegetais",
      image: "https://images.unsplash.com/photo-1546621845-4d3d4c3d0f0e?w=300&h=200&fit=crop",
      time: "30 min"
    }
  ],
  healthierAlternatives: [
    {
      id: "5",
      title: "Frango ao Vapor com Legumes",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop",
      calories: 320,
      difference: "-60 kcal"
    },
    {
      id: "6",
      title: "Salada de Frango Grelhado",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop",
      calories: 290,
      difference: "-90 kcal"
    }
  ]
}

export default function ReceitaPage() {
  const router = useRouter()
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null)

  const toggleStep = (stepNumber: number) => {
    if (completedSteps.includes(stepNumber)) {
      setCompletedSteps(completedSteps.filter(s => s !== stepNumber))
    } else {
      setCompletedSteps([...completedSteps, stepNumber])
    }
  }

  const handleAddToWeeklyPlan = () => {
    alert("Receita adicionada ao Plano Semanal! 📅")
  }

  const handleAddToShoppingList = () => {
    alert("Ingredientes adicionados à Lista de Compras! 🛒")
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    alert(isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos! ⭐")
  }

  const handleSubstituteIngredient = (ingredientName: string) => {
    setSelectedIngredient(ingredientName)
    // Em produção, abriria um modal com sugestões de substituição
    alert(`Sugestões para substituir "${ingredientName}":\n\n• Frango → Peru, Tofu, Tempeh\n• Batata doce → Batata comum, Abóbora\n• Brócolis → Couve-flor, Couve manteiga`)
  }

  const progress = (completedSteps.length / mockRecipe.steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Botão Voltar */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 hover:bg-orange-100 dark:hover:bg-orange-900/20"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </Button>

        {/* Imagem Principal */}
        <Card className="overflow-hidden rounded-[32px] border-none shadow-[0_20px_60px_rgba(0,0,0,0.12)] mb-8">
          <div className="relative h-[400px] md:h-[500px]">
            <img
              src={mockRecipe.image}
              alt={mockRecipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Informações sobre a imagem */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex flex-wrap gap-3 mb-4">
                {mockRecipe.tags.map((tag, index) => (
                  <Badge key={index} className="bg-white/20 backdrop-blur-md border-none text-white">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                {mockRecipe.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{mockRecipe.cookTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>{mockRecipe.difficulty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5" />
                  <span>{mockRecipe.calories} kcal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{mockRecipe.servings} porções</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Botões de Ação Principais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button
            size="lg"
            onClick={handleAddToWeeklyPlan}
            className="h-16 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Adicionar ao Plano Semanal
          </Button>
          
          <Button
            size="lg"
            onClick={handleAddToShoppingList}
            className="h-16 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Adicionar à Lista de Compras
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={handleToggleFavorite}
            className={`h-16 text-lg font-bold border-2 transition-all hover:scale-105 ${
              isFavorite
                ? "bg-red-50 border-red-500 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                : "border-gray-300 hover:border-red-500"
            }`}
          >
            <Heart className={`w-5 h-5 mr-2 ${isFavorite ? "fill-current" : ""}`} />
            {isFavorite ? "Nos Favoritos" : "Adicionar aos Favoritos"}
          </Button>
        </div>

        {/* Descrição */}
        <Card className="p-8 mb-8 rounded-[24px] border-none shadow-lg bg-white/95 dark:bg-gray-800/95">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Sobre esta receita
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {mockRecipe.description}
          </p>
        </Card>

        {/* Informação Nutricional */}
        <Card className="p-8 mb-8 rounded-[24px] border-none shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-600" />
            Informação Nutricional (por porção)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {mockRecipe.nutrition.calories}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Calorias
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {mockRecipe.nutrition.protein}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Proteína
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {mockRecipe.nutrition.carbs}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Carboidratos
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-1">
                {mockRecipe.nutrition.fat}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Gordura
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {mockRecipe.nutrition.fiber}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Fibra
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Ingredientes */}
          <div className="lg:col-span-1">
            <Card className="p-8 rounded-[24px] border-none shadow-lg bg-white/95 dark:bg-gray-800/95 sticky top-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Ingredientes
              </h2>
              <div className="space-y-4">
                {mockRecipe.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between gap-3 p-3 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors group"
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {ingredient.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {ingredient.quantity}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSubstituteIngredient(ingredient.name)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-600 hover:text-orange-700 hover:bg-orange-100 dark:hover:bg-orange-900/20"
                    >
                      <Sparkles className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                  <Lightbulb className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="font-bold">Dica:</strong> Clique no ícone ✨ para ver substituições inteligentes para cada ingrediente.
                  </span>
                </p>
              </div>
            </Card>
          </div>

          {/* Modo de Preparo */}
          <div className="lg:col-span-2">
            <Card className="p-8 rounded-[24px] border-none shadow-lg bg-white/95 dark:bg-gray-800/95">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Modo de Preparo
                </h2>
                <Link href={`/modo-cozinha/${mockRecipe.id}`}>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                    <Play className="w-4 h-4 mr-2" />
                    Iniciar Modo Cozinha
                  </Button>
                </Link>
              </div>

              {/* Barra de Progresso */}
              {completedSteps.length > 0 && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-green-800 dark:text-green-200">
                      Progresso: {completedSteps.length} de {mockRecipe.steps.length} passos
                    </span>
                    <span className="text-sm font-bold text-green-600">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {mockRecipe.steps.map((step) => {
                  const isCompleted = completedSteps.includes(step.number)
                  
                  return (
                    <div
                      key={step.number}
                      className={`p-6 rounded-2xl border-2 transition-all ${
                        isCompleted
                          ? "bg-green-50 dark:bg-green-900/20 border-green-500"
                          : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <button
                            onClick={() => toggleStep(step.number)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                              isCompleted
                                ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg"
                                : "bg-gradient-to-br from-orange-500 to-pink-600 text-white shadow-md hover:shadow-lg hover:scale-105"
                            }`}
                          >
                            {isCompleted ? <Check className="w-6 h-6" /> : step.number}
                          </button>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className={`text-lg font-bold ${
                              isCompleted
                                ? "text-green-800 dark:text-green-200 line-through"
                                : "text-gray-900 dark:text-white"
                            }`}>
                              Passo {step.number}
                            </h3>
                            {step.time && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Timer className="w-3 h-3" />
                                {step.time}
                              </Badge>
                            )}
                          </div>
                          
                          <p className={`text-base leading-relaxed mb-3 ${
                            isCompleted
                              ? "text-gray-600 dark:text-gray-400"
                              : "text-gray-700 dark:text-gray-300"
                          }`}>
                            {step.instruction}
                          </p>
                          
                          {step.tip && (
                            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                              <p className="text-sm text-blue-800 dark:text-blue-200 flex items-start gap-2">
                                <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                <span><strong>Dica:</strong> {step.tip}</span>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
        </div>

        {/* Receitas Parecidas */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Receitas Parecidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockRecipe.similarRecipes.map((recipe) => (
              <Link key={recipe.id} href={`/receita/${recipe.id}`}>
                <Card className="group overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl border-none shadow-lg">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                      {recipe.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      {recipe.time}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Alternativas Mais Saudáveis */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
            <Heart className="w-8 h-8 text-green-600" />
            Alternativas Mais Saudáveis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockRecipe.healthierAlternatives.map((recipe) => (
              <Link key={recipe.id} href={`/receita/${recipe.id}`}>
                <Card className="group overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl border-none shadow-lg">
                  <div className="flex gap-4 p-5">
                    <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                        {recipe.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          {recipe.calories} kcal
                        </Badge>
                        <Badge variant="outline" className="border-green-500 text-green-700 dark:text-green-400">
                          {recipe.difference}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Versão mais leve da receita original
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
