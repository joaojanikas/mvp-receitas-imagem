import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// API para gerenciar assinatura (cancelar, atualizar)
export async function POST(request: Request) {
  try {
    const { action, userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'ID do usuário é obrigatório' },
        { status: 400 }
      )
    }

    switch (action) {
      case 'cancel': {
        // Cancelar assinatura
        const { error } = await supabase
          .from('user_profiles')
          .update({
            is_premium: false,
            premium_expires_at: null,
            subscription_plan: null
          })
          .eq('user_id', userId)

        if (error) {
          console.error('Erro ao cancelar assinatura:', error)
          return NextResponse.json(
            { error: 'Erro ao cancelar assinatura' },
            { status: 500 }
          )
        }

        return NextResponse.json({
          success: true,
          message: 'Assinatura cancelada com sucesso'
        })
      }

      case 'update': {
        // Atualizar plano
        const { planType } = await request.json()
        
        if (!['monthly', 'yearly'].includes(planType)) {
          return NextResponse.json(
            { error: 'Plano inválido' },
            { status: 400 }
          )
        }

        const expiryDate = new Date()
        if (planType === 'yearly') {
          expiryDate.setFullYear(expiryDate.getFullYear() + 1)
        } else {
          expiryDate.setMonth(expiryDate.getMonth() + 1)
        }

        const { error } = await supabase
          .from('user_profiles')
          .update({
            subscription_plan: planType,
            premium_expires_at: expiryDate.toISOString()
          })
          .eq('user_id', userId)

        if (error) {
          console.error('Erro ao atualizar assinatura:', error)
          return NextResponse.json(
            { error: 'Erro ao atualizar assinatura' },
            { status: 500 }
          )
        }

        return NextResponse.json({
          success: true,
          message: 'Assinatura atualizada com sucesso'
        })
      }

      default:
        return NextResponse.json(
          { error: 'Ação inválida' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Erro ao gerenciar assinatura:', error)
    return NextResponse.json(
      { error: 'Erro ao processar solicitação' },
      { status: 500 }
    )
  }
}
