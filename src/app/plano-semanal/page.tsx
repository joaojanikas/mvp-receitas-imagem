"use client"

import { useState } from "react"
import { Calendar, RefreshCw, ChefHat, Clock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Meal {
  name: string
  type: "Pequeno-almoço" | "Almoço" | "Jantar"
  cookTime: string
  calories: string
}

interface DayPlan {
  day: string
  date: string
  meals: Meal[]
}

const mockWeekPlan: DayPlan[] = [
  {
    day: "Segunda-feira",
    date: "22 Jan",
    meals: [
      { name: "Aveia com Frutas", type: "Pequeno-almoço", cookTime: "10 min", calories: "350 kcal" },
      { name: "Frango Grelhado com Arroz", type: "Almoço", cookTime: "30 min", calories: "550 kcal" },
      { name: "Sopa de Legumes", type: "Jantar", cookTime: "25 min", calories: "280 kcal" }
    ]
  },
  {
    day: "Terça-feira",
    date: "23 Jan",
    meals: [
      { name: "Iogurte com Granola", type: "Pequeno-almoço", cookTime: "5 min", calories: "300 kcal" },
      { name: "Massa Carbonara", type: "Almoço", cookTime: "20 min", calories: "600 kcal" },
      { name: "Salada Caesar com Frango", type: "Jantar", cookTime: "15 min", calories: "400 kcal" }
    ]
  },
  {
    day: "Quarta-feira",
    date: "24 Jan",
    meals: [
      { name: "Panquecas Proteicas", type: "Pequeno-almoço", cookTime: "15 min", calories: "380 kcal" },
      { name: "Peixe Assado com Batatas", type: "Almoço", cookTime: "35 min", calories: "520 kcal" },
      { name: "Omelete de Vegetais", type: "Jantar", cookTime: "12 min", calories: "320 kcal" }
    ]
  },
  {
    day: "Quinta-feira",
    date: "25 Jan",
    meals: [
      { name: "Smoothie Bowl", type: "Pequeno-almoço", cookTime: "8 min", calories: "340 kcal" },
      { name: "Risoto de Cogumelos", type: "Almoço", cookTime: "40 min", calories: "580 kcal" },
      { name: "Wrap de Frango", type: "Jantar", cookTime: "18 min", calories: "420 kcal" }
    ]
  },
  {
    day: "Sexta-feira",
    date: "26 Jan",
    meals: [
      { name: "Torradas com Abacate", type: "Pequeno-almoço", cookTime: "10 min", calories: "360 kcal" },
      { name: "Bife com Legumes", type: "Almoço", cookTime: "25 min", calories: "620 kcal" },
      { name: "Pizza Caseira Light", type: "Jantar", cookTime: "30 min", calories: "480 kcal" }
    ]
  },
  {
    day: "Sábado",
    date: "27 Jan",
    meals: [
      { name: "Ovos Mexidos com Bacon", type: "Pequeno-almoço", cookTime: "12 min", calories: "400 kcal" },
      { name: "Lasanha de Carne", type: "Almoço", cookTime: "50 min", calories: "680 kcal" },
      { name: "Hambúrguer Caseiro", type: "Jantar", cookTime: "22 min", calories: "550 kcal" }
    ]
  },
  {
    day: "Domingo",
    date: "28 Jan",
    meals: [
      { name: "Brunch Completo", type: "Pequeno-almoço", cookTime: "25 min", calories: "500 kcal" },
      { name: "Bacalhau à Portuguesa", type: "Almoço", cookTime: "45 min", calories: "600 kcal" },
      { name: "Sopa e Sanduíche", type: "Jantar", cookTime: "20 min", calories: "380 kcal" }
    ]
  }
]

const getMealTypeColor = (type: string) => {
  switch (type) {
    case "Pequeno-almoço":
      return "from-yellow-500 to-orange-500"
    case "Almoço":
      return "from-blue-500 to-cyan-600"
    case "Jantar":
      return "from-purple-500 to-pink-600"
    default:
      return "from-gray-500 to-gray-600"
  }
}

export default function PlanoSemanalPage() {
  const [weekPlan, setWeekPlan] = useState<DayPlan[]>(mockWeekPlan)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateNewPlan = async () => {
    setIsGenerating(true)
    // Simular geração
    await new Promise(resolve => setTimeout(resolve, 2500))
    setIsGenerating(false)
    alert("Novo plano semanal gerado com sucesso!")
  }

  const totalCaloriesPerDay = (meals: Meal[]) => {
    return meals.reduce((sum, meal) => sum + parseInt(meal.calories), 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-3 rounded-xl shadow-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Plano Semanal
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            7 dias de refeições balanceadas geradas automaticamente
          </p>

          <Button
            size="lg"
            onClick={handleGenerateNewPlan}
            disabled={isGenerating}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg h-14 px-8 text-lg font-semibold"
          >
            <RefreshCw className={`w-5 h-5 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? "Gerando..." : "Gerar Novo Plano"}
          </Button>
        </div>

        {/* Grid de Dias */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {weekPlan.map((dayPlan, index) => (
            <Card
              key={index}
              className="p-6 shadow-lg rounded-2xl border-none bg-white/95 dark:bg-gray-800/95 hover:shadow-xl transition-all"
            >
              {/* Cabeçalho do Dia */}
              <div className="mb-5 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {dayPlan.day}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {dayPlan.date}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-base py-2 px-4 font-semibold">
                    {totalCaloriesPerDay(dayPlan.meals)} kcal
                  </Badge>
                </div>
              </div>

              {/* Refeições do Dia */}
              <div className="space-y-4">
                {dayPlan.meals.map((meal, mealIndex) => (
                  <div
                    key={mealIndex}
                    className="group p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <Badge
                          className={`bg-gradient-to-r ${getMealTypeColor(meal.type)} text-white border-none mb-2`}
                        >
                          {meal.type}
                        </Badge>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors">
                          {meal.name}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {meal.cookTime}
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-orange-600">
                        {meal.calories}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Resumo Semanal */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-2xl shadow-lg">
          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-orange-900 dark:text-orange-100 mb-2">
                Resumo da Semana
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Total de Refeições</p>
                  <p className="text-2xl font-bold text-orange-600">21</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Média de Calorias/Dia</p>
                  <p className="text-2xl font-bold text-orange-600">~1,500 kcal</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Tempo Médio de Preparo</p>
                  <p className="text-2xl font-bold text-orange-600">~23 min</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
