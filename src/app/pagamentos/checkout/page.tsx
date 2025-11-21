"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, CreditCard, Check, X } from "lucide-react"
import { PLANS } from "@/lib/payments"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const subscriptionId = searchParams.get('subscription_id')
  const planType = searchParams.get('plan') as 'monthly' | 'yearly'
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!subscriptionId || !planType) {
      router.push("/pagamentos")
    }
  }, [subscriptionId, planType, router])

  const handlePayment = async (paymentSuccess: boolean) => {
    setIsProcessing(true)
    setError("")

    try {
      if (!subscriptionId) return

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
        return
      }

      if (paymentSuccess) {
        // Atualizar status da assinatura para ativa
        const { error: subError } = await supabase
          .from('subscriptions')
          .update({ 
            status: 'active',
            started_at: new Date().toISOString()
          })
          .eq('id', subscriptionId)

        if (subError) throw subError

        // Atualizar perfil do usuário para premium
        const expiresAt = new Date()
        if (planType === 'monthly') {
          expiresAt.setMonth(expiresAt.getMonth() + 1)
        } else {
          expiresAt.setFullYear(expiresAt.getFullYear() + 1)
        }

        const { error: profileError } = await supabase
          .from('user_profiles')
          .update({
            is_premium: true,
            premium_expires_at: expiresAt.toISOString()
          })
          .eq('user_id', user.id)

        if (profileError) throw profileError

        // Atualizar pagamento para completo
        const { error: paymentError } = await supabase
          .from('payments')
          .update({ status: 'completed' })
          .eq('subscription_id', subscriptionId)

        if (paymentError) throw paymentError

        setSuccess(true)
        
        // Redirecionar para página de sucesso
        setTimeout(() => {
          router.push("/premium/sucesso")
        }, 2000)
      } else {
        // Pagamento falhou
        const { error: subError } = await supabase
          .from('subscriptions')
          .update({ status: 'cancelled' })
          .eq('id', subscriptionId)

        if (subError) throw subError

        const { error: paymentError } = await supabase
          .from('payments')
          .update({ status: 'failed' })
          .eq('subscription_id', subscriptionId)

        if (paymentError) throw paymentError

        setError("Pagamento cancelado ou falhou")
        
        setTimeout(() => {
          router.push("/pagamentos")
        }, 3000)
      }
    } catch (err: any) {
      console.error("Erro ao processar pagamento:", err)
      setError(err.message || "Erro ao processar pagamento")
    } finally {
      setIsProcessing(false)
    }
  }

  if (!planType || !PLANS[planType]) {
    return null
  }

  const plan = PLANS[planType]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-2xl rounded-3xl border-none bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
        {success ? (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                Pagamento Confirmado!
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Redirecionando...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-red-500 rounded-full flex items-center justify-center">
              <X className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                Pagamento Falhou
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {error}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center">
                <CreditCard className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                Finalizar Pagamento
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Confirme sua assinatura
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-orange-200/50 dark:border-orange-800/50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Plano:</span>
                <span className="text-gray-900 dark:text-white font-bold">{plan.name}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Período:</span>
                <span className="text-gray-900 dark:text-white font-bold">{plan.description}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-orange-200 dark:border-orange-800">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Total:</span>
                <span className="text-2xl text-gray-900 dark:text-white font-extrabold">
                  €{plan.price}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                Esta é uma simulação de pagamento para demonstração
              </p>
              
              <Button
                onClick={() => handlePayment(true)}
                disabled={isProcessing}
                className="w-full h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 font-bold text-base shadow-lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Simular Pagamento Bem-Sucedido
                  </>
                )}
              </Button>

              <Button
                onClick={() => handlePayment(false)}
                disabled={isProcessing}
                variant="outline"
                className="w-full h-14 border-2 font-bold text-base"
              >
                <X className="w-5 h-5 mr-2" />
                Simular Pagamento Falhou
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
