"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Check, Crown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function PremiumSuccessPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (countdown === 0) {
      router.push('/perfil')
    }
  }, [countdown, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-12 text-center shadow-2xl rounded-[32px] border-none bg-white/95 dark:bg-gray-800/95">
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-yellow-500 to-orange-600 p-6 rounded-full shadow-2xl">
              <Crown className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full font-bold mb-4">
            <Check className="w-5 h-5" />
            <span>Pagamento Confirmado</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-yellow-600 via-orange-600 to-pink-600 bg-clip-text text-transparent">
          Bem-vindo ao Premium!
        </h1>

        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
          Parabéns! Agora você tem acesso a todas as funcionalidades premium do Chef IA.
        </p>

        <div className="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 p-6 rounded-2xl mb-8">
          <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
            O que você desbloqueou:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
            {[
              "Receitas ilimitadas",
              "Planos semanais avançados",
              "Lista de compras inteligente",
              "Modo cozinha premium",
              "Receitas exclusivas de chefs",
              "IA mais poderosa",
              "Acesso prioritário",
              "Análise nutricional completa"
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Link href="/perfil">
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 h-14 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Ir para Meu Perfil
            </Button>
          </Link>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Redirecionando automaticamente em {countdown} segundos...
          </p>
        </div>
      </Card>
    </div>
  )
}
