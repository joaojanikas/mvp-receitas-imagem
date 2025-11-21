// Constantes da aplicação Chef IA

export const APP_CONFIG = {
  name: "Chef IA",
  version: "1.0.0",
  maxHistoryItems: 10,
  maxFridgeItems: 50,
  freeRecipesPerDay: 3,
  premiumRecipesPerDay: -1, // ilimitado
}

export const PREMIUM_PLANS = [
  {
    id: "monthly",
    name: "Premium Mensal",
    price: 9.99,
    interval: "monthly" as const,
    features: [
      "Receitas ilimitadas",
      "Planos semanais automáticos",
      "Lista de compras inteligente",
      "Assistente de cozinha por voz",
      "Frigorífico virtual",
      "Análise nutricional completa",
      "Modo MealMatch",
      "Sem anúncios"
    ]
  },
  {
    id: "annual",
    name: "Premium Anual",
    price: 99.99,
    interval: "annual" as const,
    discount: 17,
    features: [
      "Todos os benefícios do plano mensal",
      "2 meses grátis",
      "Acesso prioritário a novas funcionalidades",
      "Packs de receitas exclusivos"
    ]
  }
]

export const PREMIUM_PACKS = [
  {
    id: "fitness",
    name: "Pack Fitness",
    price: 4.99,
    description: "50 receitas focadas em ganho de massa e perda de peso",
    recipes: 50
  },
  {
    id: "portuguese",
    name: "Pack Receitas Portuguesas",
    price: 4.99,
    description: "Receitas tradicionais portuguesas com toque moderno",
    recipes: 40
  },
  {
    id: "quick",
    name: "Pack Receitas Rápidas",
    price: 3.99,
    description: "30 receitas em menos de 15 minutos",
    recipes: 30
  }
]

export const DIETARY_OPTIONS = [
  { value: "vegan", label: "Vegano", icon: "🌱" },
  { value: "vegetarian", label: "Vegetariano", icon: "🥗" },
  { value: "lactoseFree", label: "Sem Lactose", icon: "🥛" },
  { value: "glutenFree", label: "Sem Glúten", icon: "🌾" },
  { value: "lowCarb", label: "Low Carb", icon: "🥩" },
  { value: "highProtein", label: "Alta Proteína", icon: "💪" }
]

export const COST_CATEGORIES = [
  { value: "até 3€", label: "Até 3€", icon: "💰" },
  { value: "até 5€", label: "Até 5€", icon: "💰💰" },
  { value: "até 10€", label: "Até 10€", icon: "💰💰💰" }
]

export const TIME_CATEGORIES = [
  { value: 5, label: "5 minutos", icon: "⚡" },
  { value: 10, label: "10 minutos", icon: "⚡⚡" },
  { value: 15, label: "15 minutos", icon: "⚡⚡⚡" },
  { value: 30, label: "30 minutos", icon: "🕐" },
  { value: 60, label: "1 hora", icon: "🕐🕐" }
]

export const MEAL_GOALS = [
  { value: "emagrecer", label: "Emagrecer", icon: "📉", targetCalories: 1500 },
  { value: "ganhar massa", label: "Ganhar Massa", icon: "💪", targetCalories: 2500, targetProtein: 150 },
  { value: "poupar dinheiro", label: "Poupar Dinheiro", icon: "💰", maxCostPerMeal: 5 },
  { value: "equilibrado", label: "Equilibrado", icon: "⚖️", targetCalories: 2000 }
]

export const INGREDIENT_CATEGORIES = [
  "Vegetais",
  "Frutas",
  "Carnes",
  "Peixes",
  "Laticínios",
  "Grãos",
  "Temperos",
  "Outros"
]

export const LOADING_MESSAGES = [
  "A analisar os seus ingredientes…",
  "A identificar alimentos…",
  "A avaliar frescura…",
  "A calcular quantidades…",
  "A gerar receita perfeita…",
  "A calcular nutrição…",
  "Quase pronto…"
]

export const ONBOARDING_STEPS = [
  {
    title: "Bem-vindo ao Chef IA",
    description: "Transforme ingredientes em receitas incríveis com inteligência artificial",
    icon: "👋"
  },
  {
    title: "Tire uma foto",
    description: "Fotografe os ingredientes que tem em casa",
    icon: "📸"
  },
  {
    title: "IA identifica tudo",
    description: "Nossa IA reconhece automaticamente cada ingrediente",
    icon: "🤖"
  },
  {
    title: "Receitas personalizadas",
    description: "Receba receitas completas adaptadas aos seus ingredientes",
    icon: "👨‍🍳"
  }
]

export const GAMIFICATION = {
  achievements: [
    { id: "first_recipe", name: "Primeira Receita", icon: "🎉", points: 10 },
    { id: "10_recipes", name: "Chef Iniciante", icon: "👨‍🍳", points: 50 },
    { id: "50_recipes", name: "Chef Experiente", icon: "⭐", points: 200 },
    { id: "zero_waste", name: "Zero Desperdício", icon: "♻️", points: 100 },
    { id: "healthy_week", name: "Semana Saudável", icon: "💚", points: 150 }
  ],
  levels: [
    { level: 1, name: "Aprendiz", minPoints: 0 },
    { level: 2, name: "Cozinheiro", minPoints: 100 },
    { level: 3, name: "Chef", minPoints: 500 },
    { level: 4, name: "Mestre Chef", minPoints: 1000 },
    { level: 5, name: "Lenda Culinária", minPoints: 5000 }
  ]
}
