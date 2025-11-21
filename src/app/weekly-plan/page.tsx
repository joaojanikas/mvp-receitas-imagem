"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ChefHat, 
  Calendar, 
  ShoppingCart, 
  TrendingDown, 
  Flame,
  Clock,
  DollarSign,
  Download,
  Share2
} from "lucide-react"

interface WeeklyPlanProps {
  onBack: () => void
}

export default function WeeklyPlanPage({ onBack }: WeeklyPlanProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [plan, setPlan] = useState<any>(null)

  const generatePlan = async () => {
    setIsGenerating(true)
    
    // Simular geração (substituir por chamada real à API)
    setTimeout(() => {
      setPlan({
        weekPlan: [
          {
            day: "Segunda-feira",
            date: "2024-01-15",
            meals: {
              breakfast: {
                title: "Ovos Mexidos com Torrada Integral",
                calories: 350,
                prepTime: "10 min",
                cost: 2.5
              },
              lunch: {
                title: "Frango Grelhado com Legumes",
                calories: 550,
                prepTime: "25 min",
                cost: 4.5
              },
              dinner: {
                title: "Salmão ao Forno com Brócolos",
                calories: 480,
                prepTime: "30 min",
                cost: 6.0
              }
            },
            totalCalories: 1380,
            totalCost: 13.0
          }
          // Mais dias...
        ],
        nutritionSummary: {
          averageCaloriesPerDay: 1950,
          averageProteinPerDay: 120,
          weeklyBudget: 85
        }
      })
      setIsGenerating(false)
    }, 3000)
  }

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 p-6">
        <Card className="max-w-2xl mx-auto p-12 text-center">
          <div className="animate-spin w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-6"></div>
          <h3 className="text-2xl font-bold mb-3">A criar o seu plano semanal...</h3>
          <p className="text-gray-600">Otimizando refeições e lista de compras</p>
        </Card>
      </div>
    )
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" onClick={onBack} className="mb-6">
            ← Voltar
          </Button>

          <Card className="p-8 text-center">
            <div className="bg-gradient-to-br from-orange-100 to-pink-100 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-12 h-12 text-orange-600" />
            </div>

            <h1 className="text-3xl font-bold mb-4">Plano Semanal Automático</h1>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              A IA cria um plano completo de refeições para 7 dias, otimizado para os seus objetivos
              e com lista de compras inteligente.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card className="p-4">
                <TrendingDown className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-bold mb-1">Emagrecer</h3>
                <p className="text-sm text-gray-600">1500 cal/dia</p>
              </Card>
              <Card className="p-4">
                <Flame className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-bold mb-1">Ganhar Massa</h3>
                <p className="text-sm text-gray-600">2500 cal/dia</p>
              </Card>
              <Card className="p-4">
                <DollarSign className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-bold mb-1">Poupar Dinheiro</h3>
                <p className="text-sm text-gray-600">Máx 5€/refeição</p>
              </Card>
            </div>

            <Button
              size="lg"
              onClick={generatePlan}
              className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Gerar Plano Semanal
            </Button>

            <div className="mt-6 p-4 bg-orange-50 rounded-xl">
              <p className="text-sm text-orange-800 font-semibold flex items-center justify-center gap-2">
                <ChefHat className="w-4 h-4" />
                Funcionalidade Premium
              </p>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack}>
            ← Voltar
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Partilhar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar PDF
            </Button>
          </div>
        </div>

        {/* Resumo Nutricional */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Resumo Semanal</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Calorias Médias/Dia</p>
              <p className="text-3xl font-bold text-orange-600">
                {plan.nutritionSummary.averageCaloriesPerDay}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Proteína Média/Dia</p>
              <p className="text-3xl font-bold text-orange-600">
                {plan.nutritionSummary.averageProteinPerDay}g
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Orçamento Semanal</p>
              <p className="text-3xl font-bold text-orange-600">
                {plan.nutritionSummary.weeklyBudget}€
              </p>
            </div>
          </div>
        </Card>

        {/* Plano Diário */}
        <div className="space-y-4">
          {plan.weekPlan.map((day: any, index: number) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{day.day}</h3>
                  <p className="text-sm text-gray-600">{day.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="font-bold">{day.totalCalories} cal • {day.totalCost}€</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-orange-50 rounded-xl">
                  <p className="text-xs font-semibold text-orange-600 mb-2">PEQUENO-ALMOÇO</p>
                  <h4 className="font-bold mb-2">{day.meals.breakfast.title}</h4>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      {day.meals.breakfast.calories} cal
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {day.meals.breakfast.prepTime}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-xl">
                  <p className="text-xs font-semibold text-orange-600 mb-2">ALMOÇO</p>
                  <h4 className="font-bold mb-2">{day.meals.lunch.title}</h4>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      {day.meals.lunch.calories} cal
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {day.meals.lunch.prepTime}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-xl">
                  <p className="text-xs font-semibold text-orange-600 mb-2">JANTAR</p>
                  <h4 className="font-bold mb-2">{day.meals.dinner.title}</h4>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      {day.meals.dinner.calories} cal
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {day.meals.dinner.prepTime}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Lista de Compras */}
        <Card className="p-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingCart className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl font-bold">Lista de Compras</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Todos os ingredientes necessários para a semana, organizados por categoria
          </p>
          <Button className="bg-gradient-to-r from-orange-500 to-pink-600">
            Ver Lista Completa
          </Button>
        </Card>
      </div>
    </div>
  )
}
