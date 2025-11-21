"use client"

import { DollarSign, TrendingDown, ShoppingCart, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const economicRecipes = [
  {
    id: 1,
    title: "Arroz com Feijão Completo",
    image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=400&h=300&fit=crop",
    cost: "2,50€",
    servings: 4,
    cookTime: "30 min"
  },
  {
    id: 2,
    title: "Sopa de Legumes Caseira",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
    cost: "1,80€",
    servings: 6,
    cookTime: "25 min"
  },
  {
    id: 3,
    title: "Massa com Molho de Tomate",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
    cost: "2,00€",
    servings: 4,
    cookTime: "20 min"
  },
  {
    id: 4,
    title: "Omelete de Batata",
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400&h=300&fit=crop",
    cost: "1,50€",
    servings: 3,
    cookTime: "15 min"
  },
  {
    id: 5,
    title: "Frango Assado com Batatas",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop",
    cost: "3,50€",
    servings: 4,
    cookTime: "45 min"
  },
  {
    id: 6,
    title: "Caldo Verde Tradicional",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
    cost: "2,20€",
    servings: 5,
    cookTime: "35 min"
  }
]

export default function ModoEconomicoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-3 rounded-xl shadow-lg">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Modo Económico
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Receitas deliciosas e baratas para economizar sem perder qualidade
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 shadow-lg rounded-2xl border-none bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
            <div className="flex items-center gap-3 mb-2">
              <TrendingDown className="w-6 h-6 text-yellow-600" />
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                Custo Médio
              </h3>
            </div>
            <p className="text-4xl font-extrabold text-yellow-600">2,25€</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">por refeição</p>
          </Card>

          <Card className="p-6 shadow-lg rounded-2xl border-none bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <div className="flex items-center gap-3 mb-2">
              <ShoppingCart className="w-6 h-6 text-green-600" />
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                Economia Mensal
              </h3>
            </div>
            <p className="text-4xl font-extrabold text-green-600">~150€</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">comparado a restaurantes</p>
          </Card>

          <Card className="p-6 shadow-lg rounded-2xl border-none bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6 text-orange-600" />
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                Receitas
              </h3>
            </div>
            <p className="text-4xl font-extrabold text-orange-600">50+</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">opções económicas</p>
          </Card>
        </div>

        {/* Grid de Receitas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {economicRecipes.map((recipe) => (
            <Card
              key={recipe.id}
              className="group overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl border-none shadow-lg bg-white dark:bg-gray-800"
            >
              {/* Imagem */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-none text-lg font-bold px-3 py-1">
                  {recipe.cost}
                </Badge>
              </div>

              {/* Conteúdo */}
              <div className="p-5 space-y-3">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2">
                  {recipe.title}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>{recipe.servings} porções</span>
                  <span>•</span>
                  <span>{recipe.cookTime}</span>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Custo por porção: <strong className="text-yellow-600">{(parseFloat(recipe.cost.replace('€', '').replace(',', '.')) / recipe.servings).toFixed(2)}€</strong>
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
