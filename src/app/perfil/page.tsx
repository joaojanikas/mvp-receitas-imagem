"use client"

import { useState } from "react"
import { User, Target, TrendingUp, Award, Heart, Zap, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

interface UserProfile {
  name: string
  age: number
  weight: number
  height: number
  goal: string
  activityLevel: string
}

interface NutritionalGoals {
  calories: number
  protein: number
  carbs: number
  fats: number
}

export default function PerfilPage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "João Silva",
    age: 30,
    weight: 75,
    height: 175,
    goal: "Manter Peso",
    activityLevel: "Moderado"
  })

  const [goals, setGoals] = useState<NutritionalGoals>({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fats: 65
  })

  const [todayProgress, setTodayProgress] = useState({
    calories: 1450,
    protein: 98,
    carbs: 180,
    fats: 48
  })

  const calculateBMI = () => {
    const heightInMeters = profile.height / 100
    const bmi = profile.weight / (heightInMeters * heightInMeters)
    return bmi.toFixed(1)
  }

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { text: "Abaixo do peso", color: "text-blue-600" }
    if (bmi < 25) return { text: "Peso normal", color: "text-green-600" }
    if (bmi < 30) return { text: "Sobrepeso", color: "text-yellow-600" }
    return { text: "Obesidade", color: "text-red-600" }
  }

  const bmi = parseFloat(calculateBMI())
  const bmiStatus = getBMIStatus(bmi)

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100)
  }

  const achievements = [
    { icon: Award, title: "7 Dias Seguidos", description: "Manteve o plano por uma semana", unlocked: true },
    { icon: Heart, title: "Receitas Saudáveis", description: "Preparou 10 receitas saudáveis", unlocked: true },
    { icon: Zap, title: "Chef Rápido", description: "Completou 5 receitas em menos de 15 min", unlocked: true },
    { icon: Target, title: "Meta Atingida", description: "Atingiu suas metas nutricionais 5x", unlocked: false }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Meu Perfil
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Acompanhe suas metas nutricionais e progresso
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Esquerda - Informações Pessoais */}
          <div className="lg:col-span-1 space-y-6">
            {/* Card de Perfil */}
            <Card className="p-6 shadow-lg rounded-2xl border-none bg-white/95 dark:bg-gray-800/95">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {profile.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {profile.age} anos
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                    Peso (kg)
                  </label>
                  <Input
                    type="number"
                    value={profile.weight}
                    onChange={(e) => setProfile({ ...profile, weight: parseFloat(e.target.value) })}
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                    Altura (cm)
                  </label>
                  <Input
                    type="number"
                    value={profile.height}
                    onChange={(e) => setProfile({ ...profile, height: parseFloat(e.target.value) })}
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                    Objetivo
                  </label>
                  <select
                    value={profile.goal}
                    onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
                    className="w-full h-12 px-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                  >
                    <option>Perder Peso</option>
                    <option>Manter Peso</option>
                    <option>Ganhar Massa</option>
                  </select>
                </div>

                <Button className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                  Salvar Alterações
                </Button>
              </div>
            </Card>

            {/* Card IMC */}
            <Card className="p-6 shadow-lg rounded-2xl border-none bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Índice de Massa Corporal
                </h3>
              </div>
              <div className="text-center">
                <p className="text-5xl font-extrabold text-purple-600 mb-2">
                  {calculateBMI()}
                </p>
                <p className={`text-lg font-semibold ${bmiStatus.color}`}>
                  {bmiStatus.text}
                </p>
              </div>
            </Card>
          </div>

          {/* Coluna Direita - Metas e Progresso */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progresso de Hoje */}
            <Card className="p-6 shadow-lg rounded-2xl border-none bg-white/95 dark:bg-gray-800/95">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Progresso de Hoje
                </h3>
              </div>

              <div className="space-y-6">
                {/* Calorias */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">Calorias</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {todayProgress.calories} / {goals.calories} kcal
                    </span>
                  </div>
                  <Progress value={getProgressPercentage(todayProgress.calories, goals.calories)} className="h-3" />
                </div>

                {/* Proteínas */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">Proteínas</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {todayProgress.protein} / {goals.protein}g
                    </span>
                  </div>
                  <Progress value={getProgressPercentage(todayProgress.protein, goals.protein)} className="h-3" />
                </div>

                {/* Carboidratos */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">Carboidratos</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {todayProgress.carbs} / {goals.carbs}g
                    </span>
                  </div>
                  <Progress value={getProgressPercentage(todayProgress.carbs, goals.carbs)} className="h-3" />
                </div>

                {/* Gorduras */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">Gorduras</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {todayProgress.fats} / {goals.fats}g
                    </span>
                  </div>
                  <Progress value={getProgressPercentage(todayProgress.fats, goals.fats)} className="h-3" />
                </div>
              </div>
            </Card>

            {/* Conquistas */}
            <Card className="p-6 shadow-lg rounded-2xl border-none bg-white/95 dark:bg-gray-800/95">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Conquistas
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        achievement.unlocked
                          ? "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-300 dark:border-purple-700"
                          : "bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 opacity-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          achievement.unlocked
                            ? "bg-gradient-to-br from-purple-500 to-pink-600"
                            : "bg-gray-400"
                        }`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                            {achievement.title}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {achievement.description}
                          </p>
                        </div>
                        {achievement.unlocked && (
                          <Badge className="bg-green-500 text-white border-none">
                            ✓
                          </Badge>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Estatísticas */}
            <Card className="p-6 shadow-lg rounded-2xl border-none bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Estatísticas da Semana
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">15</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receitas</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">5</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Dias Ativos</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">92%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Meta Atingida</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
