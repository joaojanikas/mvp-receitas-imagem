import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Webhook para processar eventos de pagamento da plataforma Lasy
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, data } = body

    // Processar eventos de pagamento
    switch (event) {
      case 'payment.completed': {
        // Pagamento concluído com sucesso
        const { userId, planType, paymentId } = data
        
        // Atualizar perfil do usuário para Premium
        if (userId) {
          const expiryDate = new Date()
          
          // Determinar data de expiração baseado no plano
          if (planType === 'yearly') {
            expiryDate.setFullYear(expiryDate.getFullYear() + 1)
          } else {
            expiryDate.setMonth(expiryDate.getMonth() + 1)
          }
          
          await supabase
            .from('user_profiles')
            .update({
              is_premium: true,
              premium_expires_at: expiryDate.toISOString(),
              subscription_plan: planType
            })
            .eq('user_id', userId)

          // Atualizar status do pagamento
          await supabase
            .from('payments')
            .update({
              status: 'completed',
              completed_at: new Date().toISOString()
            })
            .eq('id', paymentId)
        }
        break
      }

      case 'subscription.updated': {
        // Subscrição atualizada
        const { userId, planType, status } = data
        
        if (userId) {
          const isActive = status === 'active'
          const expiryDate = new Date()
          
          if (planType === 'yearly') {
            expiryDate.setFullYear(expiryDate.getFullYear() + 1)
          } else {
            expiryDate.setMonth(expiryDate.getMonth() + 1)
          }
          
          await supabase
            .from('user_profiles')
            .update({
              is_premium: isActive,
              premium_expires_at: expiryDate.toISOString(),
              subscription_plan: planType
            })
            .eq('user_id', userId)
        }
        break
      }

      case 'subscription.cancelled': {
        // Subscrição cancelada
        const { userId } = data
        
        // Remover status Premium
        await supabase
          .from('user_profiles')
          .update({
            is_premium: false,
            premium_expires_at: null,
            subscription_plan: null
          })
          .eq('user_id', userId)
        break
      }

      default:
        console.log(`Evento não tratado: ${event}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Erro no webhook:', error)
    return NextResponse.json(
      { error: 'Erro ao processar webhook', details: error.message },
      { status: 500 }
    )
  }
}
