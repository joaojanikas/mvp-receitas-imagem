// Tipos centralizados da aplicação Chef IA

export interface Ingredient {
  name: string
  quantity?: string
  state?: "fresco" | "maduro" | "estragado" | "verde"
  expiryDate?: string
  category?: string
}

export interface DetectedIngredient extends Ingredient {
  confidence?: number
  suggestions?: string[]
}

export interface Recipe {
  id: string
  title: string
  ingredients: Ingredient[]
  steps: string[]
  cookTime: string
  prepTime: string
  servings: number
  difficulty: "Fácil" | "Médio" | "Difícil"
  detectedIngredients: string[]
  timestamp: number
  
  // Nutrição
  nutrition?: {
    calories: number
    protein: number
    carbs: number
    fat: number
    glycemicIndex?: number
    healthScore?: number
  }
  
  // Variações
  variations?: {
    lowCarb?: Recipe
    highProtein?: Recipe
    vegan?: Recipe
    vegetarian?: Recipe
    lactoseFree?: Recipe
    glutenFree?: Recipe
    quick?: Recipe // ≤10 minutos
  }
  
  // Economia
  estimatedCost?: number
  costCategory?: "até 3€" | "até 5€" | "até 10€"
  
  // Substituições e melhorias
  substitutions?: Array<{
    original: string
    alternative: string
    reason: string
  }>
  optionalIngredients?: Array<{
    name: string
    benefit: string
  }>
  
  // Versões
  healthyVersion?: string
  economicVersion?: string
}

export interface VirtualFridge {
  id: string
  userId: string
  ingredients: DetectedIngredient[]
  lastUpdated: number
  expiringItems: Array<{
    ingredient: string
    daysLeft: number
  }>
}

export interface WeeklyMealPlan {
  id: string
  userId: string
  startDate: string
  endDate: string
  goal: "emagrecer" | "ganhar massa" | "poupar dinheiro" | "equilibrado"
  meals: Array<{
    day: string
    breakfast?: Recipe
    lunch?: Recipe
    dinner?: Recipe
    snacks?: Recipe[]
  }>
  shoppingList: ShoppingList
}

export interface ShoppingList {
  id: string
  items: Array<{
    name: string
    quantity: string
    category: string
    checked: boolean
    estimatedPrice?: number
  }>
  totalEstimatedCost?: number
  createdAt: number
  sharedWith?: string[]
}

export interface UserProfile {
  id: string
  name: string
  email: string
  preferences: {
    allergies: string[]
    dietaryRestrictions: string[]
    favoriteIngredients: string[]
    dislikedIngredients: string[]
    cuisinePreferences: string[]
  }
  goals?: {
    type: "emagrecer" | "ganhar massa" | "manter peso" | "poupar dinheiro"
    targetCalories?: number
    targetProtein?: number
  }
  isPremium: boolean
  premiumExpiry?: number
}

export interface MealMatch {
  id: string
  participants: Array<{
    userId: string
    name: string
    ingredients: string[]
  }>
  matchedRecipes: Recipe[]
  createdAt: number
}

export interface CookingAssistant {
  recipeId: string
  currentStep: number
  timers: Array<{
    id: string
    duration: number
    remaining: number
    label: string
  }>
  voiceEnabled: boolean
  speed: "normal" | "slow" | "fast"
}

export interface Notification {
  id: string
  type: "expiry" | "suggestion" | "reminder" | "achievement"
  title: string
  message: string
  timestamp: number
  read: boolean
  actionUrl?: string
}

export interface PremiumPlan {
  id: string
  name: string
  price: number
  interval: "monthly" | "annual"
  features: string[]
  discount?: number
}

export interface RecipeFilter {
  maxTime?: number
  maxCost?: number
  difficulty?: Recipe["difficulty"]
  dietary?: Array<"vegan" | "vegetarian" | "lactoseFree" | "glutenFree">
  maxCalories?: number
  minProtein?: number
}
