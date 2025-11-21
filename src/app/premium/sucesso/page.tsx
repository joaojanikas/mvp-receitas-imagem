"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Crown, Check, Sparkles, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"

export default function PremiumSuccessPage() {
  const router = useRouter()
  const { refreshPremiumStatus } = useAuth()
  const [countdown, setCountdown] = useState(5)
  const [isRefreshing, setIsRefreshing] = useState(true)

  useEffect(() => {
    // Atualizar status premium
    const refresh = async () => {
      await refreshPremiumStatus()
      setIsRefreshing(false)
    }
    refresh()
  }, [refreshPremiumStatus])

  useEffect(() => {
    if (isRefreshing) return

    // Countdown para redirecionamento
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push("/")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router, isRefreshing])

  if (isRefreshing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-orange-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-12 shadow-2xl rounded-3xl border-none bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm text-center">
        <div className="space-y-8">
          {/* Ícone de Sucesso Animado */}
          <div className="relative mx-auto w-32 h-32">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl">
              <Crown className="w-16 h-16 text-white animate-bounce" />
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <Check className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Título e Mensagem */}
          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Bem-vindo ao Premium! 🎉
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
              Sua assinatura foi ativada com sucesso. Agora você tem acesso a todos os recursos exclusivos do Chef IA!
            </p>
          </div>

          {/* Recursos Desbloqueados */}
          <div className="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-orange-200/50 dark:border-orange-800/50">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-600" />
              Recursos Desbloqueados
            </h3>
            <div className="grid md:grid-cols-2 gap-3 text-left">
              {[
                "Receitas Ilimitadas",
                "Plano Semanal Automático",
                "Lista de Compras Inteligente",
                "Frigorífico Inteligente",
                "Receitas Exclusivas",
                "Análise Nutricional",
                "Geração Mais Rápida",
                "Suporte Prioritário"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="space-y-4">
            <Link href="/">
              <Button className="w-full h-14 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 font-bold text-base shadow-lg group">
                Começar a Usar Agora
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Redirecionando automaticamente em {countdown} segundo{countdown !== 1 ? 's' : ''}...
            </p>
          </div>

          {/* Mensagem de Agradecimento */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400">
              Obrigado por escolher o Chef IA Premium! 💚
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
