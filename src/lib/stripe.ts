// Configuração de Pagamentos - Plataforma Lasy
export const PLANS = {
  monthly: {
    id: 'monthly',
    price: 9.99,
    interval: 'month',
    name: 'Mensal',
    description: 'Plano mensal renovável'
  },
  yearly: {
    id: 'yearly',
    price: 79.99,
    interval: 'year',
    name: 'Anual',
    description: 'Plano anual com 33% de desconto'
  }
}

// Função para criar sessão de checkout usando plataforma Lasy
export async function createCheckoutSession(planType: 'monthly' | 'yearly') {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        planType
      }),
    })

    const data = await response.json()
    
    if (data.url) {
      window.location.href = data.url
    }
    
    return data
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error)
    throw error
  }
}

// Função para gerenciar assinatura (cancelar, atualizar)
export async function manageSubscription() {
  try {
    const response = await fetch('/api/manage-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    
    if (data.url) {
      window.location.href = data.url
    }
    
    return data
  } catch (error) {
    console.error('Erro ao acessar gerenciamento de assinatura:', error)
    throw error
  }
}

// Função para verificar status da assinatura
export async function checkSubscriptionStatus() {
  try {
    const response = await fetch('/api/subscription-status', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao verificar status da assinatura:', error)
    throw error
  }
}
