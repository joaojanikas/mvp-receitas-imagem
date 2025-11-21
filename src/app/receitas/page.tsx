"use client"

import { useState } from "react"
import { Search, Filter, Clock, TrendingUp, Heart, Zap, Star, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const mockRecipes = [
  {
    id: 1,
    title: "Frango Grelhado com Legumes",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop",
    cookTime: "30 min",
    difficulty: "Fácil",
    category: "Saudável",
    icon: Heart,
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 2,
    title: "Massa Carbonara Express",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop",
    cookTime: "15 min",
    difficulty: "Fácil",
    category: "Rápida",
    icon: Zap,
    color: "from-yellow-500 to-orange-600"
  },
  {
    id: 3,
    title: "Risoto de Cogumelos Gourmet",
    image: "https://images.unsplash.com/photo-1476124369491-c1ca7b8b5faf?w=400&h=300&fit=crop",
    cookTime: "45 min",
    difficulty: "Difícil",
    category: "Chef",
    icon: Star,
    color: "from-purple-500 to-pink-600"
  },
  {
    id: 4,
    title: "Bacalhau à Portuguesa",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop",
    cookTime: "40 min",
    difficulty: "Médio",
    category: "Tradicional",
    icon: ChefHat,
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: 5,
    title: "Salada Caesar Completa",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    cookTime: "20 min",
    difficulty: "Fácil",
    category: "Saudável",
    icon: Heart,
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 6,
    title: "Omelete Rápida de Queijo",
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400&h=300&fit=crop",
    cookTime: "10 min",
    difficulty: "Fácil",
    category: "Rápida",
    icon: Zap,
    color: "from-yellow-500 to-orange-600"
  },
  {
    id: 7,
    title: "Bife Wellington Premium",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop",
    cookTime: "60 min",
    difficulty: "Difícil",
    category: "Chef",
    icon: Star,
    color: "from-purple-500 to-pink-600"
  },
  {
    id: 8,
    title: "Caldo Verde Tradicional",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
    cookTime: "35 min",
    difficulty: "Médio",
    category: "Tradicional",
    icon: ChefHat,
    color: "from-blue-500 to-indigo-600"
  }
]

const categories = [
  { value: "all", label: "Todas" },
  { value: "saudavel", label: "Saudável" },
  { value: "rapida", label: "Rápida" },
  { value: "chef", label: "Chef" },
  { value: "tradicional", label: "Tradicional" }
]

const difficulties = [
  { value: "all", label: "Todas" },
  { value: "facil", label: "Fácil" },
  { value: "medio", label: "Médio" },
  { value: "dificil", label: "Difícil" }
]

export default function ReceitasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const filteredRecipes = mockRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || recipe.category.toLowerCase() === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || recipe.difficulty.toLowerCase() === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            Receitas Disponíveis
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore nossa coleção de receitas deliciosas e fáceis de fazer
          </p>
        </div>

        {/* Filtros */}
        <Card className="p-6 mb-8 shadow-lg rounded-2xl border-none bg-white/95 dark:bg-gray-800/95">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Busca */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Buscar receitas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
            </div>

            {/* Categoria */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px] h-12">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Dificuldade */}
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-full md:w-[200px] h-12">
                <SelectValue placeholder="Dificuldade" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map(diff => (
                  <SelectItem key={diff.value} value={diff.value}>
                    {diff.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Grid de Receitas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => {
            const Icon = recipe.icon
            return (
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
                  <div className={`absolute top-3 right-3 w-10 h-10 rounded-full bg-gradient-to-r ${recipe.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2">
                    {recipe.title}
                  </h3>

                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {recipe.cookTime}
                    </span>
                    <span>•</span>
                    <span>{recipe.difficulty}</span>
                  </div>

                  <Badge
                    variant="outline"
                    className={`bg-gradient-to-r ${recipe.color} text-white border-none`}
                  >
                    {recipe.category}
                  </Badge>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Mensagem quando não há resultados */}
        {filteredRecipes.length === 0 && (
          <Card className="p-16 text-center shadow-2xl rounded-3xl border-none">
            <Search className="w-20 h-20 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
              Nenhuma receita encontrada
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Tente ajustar os filtros ou buscar por outro termo
            </p>
          </Card>
        )}
      </main>
    </div>
  )
}
