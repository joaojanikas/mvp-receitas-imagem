"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Crown, 
  Check, 
  Loader2, 
  Sparkles, 
  Calendar,
  ChefHat,
  ShoppingCart,
  Refrigerator,
  TrendingUp,
  Zap,
  Star,
  ArrowRight
} from "lucide-react"
import { PLANS, createCheckoutSession } from "@/lib/payments"
import Link from "next/link"

const premiumFeatures = [
  {
    icon: Sparkles,
    title: "Receitas Ilimitadas",
    description: "Gere quantas receitas quiser, sem limites"
  },
  {
    icon: Calendar,
    title: "Plano Semanal Automático",
    description: "7 dias de refeições planejadas automaticamente"
  },
  {
    icon: ShoppingCart,
    title: "Lista de Compras Inteligente",
    description: "Organizada por categorias e otimizada"
  },
  {
    icon: Refrigerator,
    title: "Frigorífico Inteligente",
    description: "Detecte ingredientes e validade automaticamente"
  },
  {
    icon: ChefHat,
    title: "Receitas Exclusivas",
    description: "Acesso a receitas premium de chefs profissionais"
  },
  {
    icon: TrendingUp,
    title: "Análise Nutricional",
    description: "Informações detalhadas de calorias e nutrientes"
  },
  {
    icon: Zap,
    title: "Geração Mais Rápida",
    description: "Prioridade no processamento de receitas"
  },
  {
    icon: Star,
    title: "Suporte Prioritário",
    description: "Atendimento preferencial e mais rápido"
  }
]

export default function PagamentosPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push("/login")
        return
      }

      setUser(session.user)

      // Verificar se já é premium
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('is_premium, premium_expires_at')
        .eq('user_id', session.user.id)
        .single()

      if (profile?.is_premium) {
        setIsPremium(true)
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubscribe = async (planType: 'monthly' | 'yearly') => {
    if (!user) {
      router.push("/login")
      return
    }

    setIsProcessing(true)
    try {
      await createCheckoutSession(planType)
    } catch (error) {
      console.error("Erro ao processar pagamento:", error)
      alert("Erro ao processar pagamento. Tente novamente.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-orange-600" />
      </div>
    )
  }

  if (isPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-12 text-center shadow-2xl rounded-3xl border-none bg-white/95 dark:bg-gray-800/95">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
              <Crown className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Você já é Premium! 👑
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Aproveite todos os recursos exclusivos do Chef IA
            </p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 h-14 px-8 text-lg font-bold shadow-lg">
                Voltar ao Início
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white px-6 py-2 rounded-full font-bold mb-6 shadow-lg">
            <Crown className="w-5 h-5" />
            <span>Plano Premium</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Desbloqueie Todo o Potencial<br />do Chef IA
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Transforme sua experiência culinária com recursos exclusivos e ilimitados
          </p>
        </div>

        {/* Planos de Preços */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Plano Mensal */}
          <Card 
            className={`p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer ${
              selectedPlan === 'monthly'
                ? 'border-orange-500 shadow-2xl scale-105'
                : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 shadow-lg'
            }`}
            onClick={() => setSelectedPlan('monthly')}
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Plano Mensal
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-gray-900 dark:text-white">
                    €{PLANS.monthly.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">/mês</span>
                </div>
              </div>

              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Todos os recursos Premium</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Cancele quando quiser</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Suporte prioritário</span>
                </li>
              </ul>

              <Button
                onClick={() => handleSubscribe('monthly')}
                disabled={isProcessing}
                className={`w-full h-14 font-bold text-base transition-all ${
                  selectedPlan === 'monthly'
                    ? 'bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  'Assinar Mensal'
                )}
              </Button>
            </div>
          </Card>

          {/* Plano Anual - Recomendado */}
          <Card 
            className={`p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer relative overflow-hidden ${
              selectedPlan === 'yearly'
                ? 'border-orange-500 shadow-2xl scale-105'
                : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 shadow-lg'
            }`}
            onClick={() => setSelectedPlan('yearly')}
          >
            {/* Badge de Desconto */}
            <div className="absolute top-4 right-4">
              <Badge className="bg-green-500 text-white font-bold px-3 py-1">
                Economize 33%
              </Badge>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Plano Anual
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-gray-900 dark:text-white">
                    €{PLANS.yearly.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">/ano</span>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 font-semibold mt-2">
                  Apenas €6.67/mês
                </p>
              </div>

              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Todos os recursos Premium</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Economize €40/ano</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Melhor custo-benefício</span>
                </li>
              </ul>

              <Button
                onClick={() => handleSubscribe('yearly')}
                disabled={isProcessing}
                className={`w-full h-14 font-bold text-base transition-all ${
                  selectedPlan === 'yearly'
                    ? 'bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  'Assinar Anual'
                )}
              </Button>
            </div>
          </Card>
        </div>

        {/* Recursos Premium */}
        <div className="mb-16">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-12">
            O que está incluído no Premium
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="p-6 rounded-2xl border-none shadow-lg hover:shadow-xl transition-all bg-white dark:bg-gray-800">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </Card>
              )
            })}
          </div>
        </div>

        {/* FAQ ou Garantia */}
        <Card className="p-8 rounded-3xl border-none shadow-xl bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Garantia de Satisfação
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Experimente o Chef IA Premium sem riscos. Se não ficar satisfeito, 
            cancele a qualquer momento e receba reembolso proporcional.
          </p>
        </Card>
      </div>
    </div>
  )
}
