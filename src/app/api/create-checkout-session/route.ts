import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { PLANS } from '@/lib/payments'

export async function POST(request: NextRequest) {
  try {
    const { planType } = await request.json()

    // Verificar se o plano é válido
    if (!planType || !PLANS[planType as keyof typeof PLANS]) {
      return NextResponse.json(
        { error: 'Plano inválido' },
        { status: 400 }
      )
    }

    // Obter usuário autenticado
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      )
    }

    const plan = PLANS[planType as keyof typeof PLANS]

    // Criar registro de assinatura pendente
    const expiresAt = new Date()
    if (planType === 'monthly') {
      expiresAt.setMonth(expiresAt.getMonth() + 1)
    } else {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1)
    }

    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .insert({
        user_id: user.id,
        plan_type: planType,
        status: 'pending',
        expires_at: expiresAt.toISOString()
      })
      .select()
      .single()

    if (subError) {
      console.error('Erro ao criar assinatura:', subError)
      return NextResponse.json(
        { error: 'Erro ao processar assinatura' },
        { status: 500 }
      )
    }

    // Criar registro de pagamento pendente
    await supabase
      .from('payments')
      .insert({
        user_id: user.id,
        subscription_id: subscription.id,
        amount: plan.price,
        currency: 'EUR',
        status: 'pending',
        payment_provider: 'lasy'
      })

    // Simular URL de checkout da plataforma Lasy
    // Em produção, aqui você faria a integração real com a API de pagamentos da Lasy
    const checkoutUrl = `${process.env.NEXT_PUBLIC_APP_URL}/pagamentos/checkout?subscription_id=${subscription.id}&plan=${planType}`

    return NextResponse.json({
      url: checkoutUrl,
      subscription_id: subscription.id
    })
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
