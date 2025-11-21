"use client"

import { Crown, Check, Sparkles, Zap, Calendar, ShoppingCart, ChefHat, Heart, Star, TrendingUp, Users, MessageCircle, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { createCheckoutSession } from "@/lib/payments"

const premiumFeatures = [
  {
    icon: Sparkles,
    title: "Receitas Ilimitadas",
    description: "Gere quantas receitas quiser, sem limites diários. Explore infinitas possibilidades culinárias."
  },
  {
    icon: Calendar,
    title: "Planos Semanais Avançados",
    description: "Planos alimentares completos adaptados aos seus objetivos nutricionais e preferências."
  },
  {
    icon: ShoppingCart,
    title: "Lista de Compras Inteligente",
    description: "Organização automática por categorias, corredores e sincronização com frigorífico."
  },
  {
    icon: ChefHat,
    title: "Modo Cozinha Premium",
    description: "Guia passo-a-passo com comandos de voz, temporizadores inteligentes e dicas em tempo real."
  },
  {
    icon: Heart,
    title: "Receitas Exclusivas de Chefs",
    description: "Acesso a receitas premium de chefs profissionais e restaurantes renomados."
  },
  {
    icon: Zap,
    title: "IA Mais Poderosa",
    description: "Sugestões mais precisas, substituições inteligentes e recomendações personalizadas."
  },
  {
    icon: Star,
    title: "Acesso Prioritário",
    description: "Seja o primeiro a testar novas funcionalidades e receba suporte prioritário."
  },
  {
    icon: TrendingUp,
    title: "Análise Nutricional Completa",
    description: "Acompanhe macros, calorias e objetivos com relatórios detalhados."
  }
]

const plans = [
  {
    id: "monthly",
    name: "Mensal",
    price: "9,99€",
    period: "/mês",
    description: "Perfeito para experimentar",
    popular: false,
    pricePerDay: "0,33€/dia"
  },
  {
    id: "yearly",
    name: "Anual",
    price: "79,99€",
    period: "/ano",
    description: "Economize 33% - Melhor valor!",
    popular: true,
    savings: "Poupe 40€",
    pricePerDay: "0,22€/dia"
  }
]

const testimonials = [
  {
    name: "Maria Silva",
    role: "Mãe de 2 filhos",
    avatar: "👩‍🍳",
    text: "O Chef IA Premium mudou completamente a forma como organizo as refeições da família. O plano semanal poupa-me horas!",
    rating: 5
  },
  {
    name: "João Costa",
    role: "Estudante universitário",
    avatar: "👨‍🎓",
    text: "Finalmente consigo cozinhar refeições saudáveis sem gastar muito. A lista de compras inteligente é genial!",
    rating: 5
  },
  {
    name: "Ana Rodrigues",
    role: "Nutricionista",
    avatar: "👩‍⚕️",
    text: "Recomendo aos meus clientes. As análises nutricionais são precisas e as receitas são equilibradas.",
    rating: 5
  }
]

const faqs = [
  {
    question: "Posso cancelar a qualquer momento?",
    answer: "Sim! Pode cancelar a sua subscrição a qualquer momento sem custos adicionais. Continuará a ter acesso Premium até ao final do período pago."
  },
  {
    question: "As receitas funcionam offline?",
    answer: "Com o Premium, pode guardar receitas para acesso offline. Perfeito para cozinhar sem preocupações com internet."
  },
  {
    question: "Há limite de receitas que posso gerar?",
    answer: "Não! Com o Premium, pode gerar receitas ilimitadas todos os dias. Explore à vontade!"
  },
  {
    question: "O plano familiar está incluído?",
    answer: "Sim! Uma conta Premium pode ser partilhada com até 5 membros da família."
  },
  {
    question: "Que métodos de pagamento aceitam?",
    answer: "Aceitamos cartão de crédito, débito, PayPal e MB Way. Todos os pagamentos são seguros e encriptados."
  }
]

export default function PremiumPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleSubscribe = async (planType: 'monthly' | 'yearly') => {
    setLoadingPlan(planType)
    try {
      await createCheckoutSession(planType)
    } catch (error) {
      console.error('Erro ao processar pagamento:', error)
      alert('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-5 py-2.5 rounded-full font-bold mb-6 shadow-xl animate-pulse">
            <Crown className="w-5 h-5" />
            <span>Oferta Especial - 33% OFF</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-yellow-600 via-orange-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Transforme Sua Cozinha
            <br />
            em Uma Experiência Premium
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Receitas ilimitadas, planos personalizados e IA avançada.
            <br />
            <strong className="text-orange-600">Tudo que você precisa para cozinhar melhor, mais rápido e com mais prazer.</strong>
          </p>
          
          {/* Social Proof */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-600" />
              <span><strong className="text-gray-900 dark:text-white">10.000+</strong> utilizadores ativos</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span><strong className="text-gray-900 dark:text-white">4.9/5</strong> avaliação média</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span><strong className="text-gray-900 dark:text-white">95%</strong> taxa de satisfação</span>
            </div>
          </div>
        </div>

        {/* Planos - Destaque */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-gray-900 dark:text-white">
            Escolha Seu Plano
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-10 text-lg">
            Comece hoje e veja a diferença em sua cozinha
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`p-10 shadow-2xl rounded-[32px] border-none relative overflow-hidden transition-all hover:scale-105 ${
                  plan.popular
                    ? "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 ring-4 ring-orange-400"
                    : "bg-white/95 dark:bg-gray-800/95"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-center py-2 font-bold text-sm">
                    ⭐ MAIS POPULAR - MELHOR VALOR
                  </div>
                )}

                <div className={`text-center ${plan.popular ? 'mt-8' : ''}`}>
                  <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <div className="flex items-baseline justify-center gap-2 mb-1">
                      <span className="text-6xl font-extrabold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                      <span className="text-xl text-gray-600 dark:text-gray-400">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Apenas {plan.pricePerDay} • Menos que um café
                    </p>
                  </div>
                  
                  {plan.savings && (
                    <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-none px-4 py-1.5 text-base font-bold">
                      💰 {plan.savings}
                    </Badge>
                  )}
                  
                  <p className="text-base text-gray-700 dark:text-gray-300 mb-6 font-medium">
                    {plan.description}
                  </p>

                  <Button
                    size="lg"
                    onClick={() => handleSubscribe(plan.id as 'monthly' | 'yearly')}
                    disabled={loadingPlan === plan.id}
                    className={`w-full h-16 text-xl font-extrabold shadow-xl hover:shadow-2xl transition-all hover:scale-105 ${
                      plan.popular
                        ? "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700"
                        : "bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
                    }`}
                  >
                    {loadingPlan === plan.id ? (
                      <>
                        <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <Crown className="w-6 h-6 mr-2" />
                        Assinar {plan.name}
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                    Cancele a qualquer momento • Sem compromisso
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recursos Premium - Grid Melhorado */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-gray-900 dark:text-white">
            Tudo Que Está Incluído
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
            Recursos profissionais para transformar sua experiência culinária
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="p-6 shadow-lg rounded-[24px] border-none bg-white/95 dark:bg-gray-800/95 hover:shadow-2xl transition-all hover:scale-105 group"
                >
                  <div className="mb-4">
                    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-2xl shadow-lg inline-flex group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <h3 className="font-extrabold text-lg text-gray-900 dark:text-white mb-2 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Comparação Gratuito vs Premium */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-gray-900 dark:text-white">
            Gratuito vs Premium
          </h2>
          
          <Card className="p-8 md:p-12 shadow-2xl rounded-[32px] border-none bg-white/95 dark:bg-gray-800/95 max-w-5xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 px-4 font-extrabold text-lg text-gray-900 dark:text-white">
                      Funcionalidade
                    </th>
                    <th className="text-center py-4 px-4 font-extrabold text-lg text-gray-600 dark:text-gray-400">
                      Gratuito
                    </th>
                    <th className="text-center py-4 px-4 font-extrabold text-lg bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                      Premium
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Geração de receitas", free: "5 por dia", premium: "Ilimitado ✨" },
                    { feature: "Plano semanal", free: "Básico", premium: "Personalizado 🎯" },
                    { feature: "Lista de compras", free: "Manual", premium: "Inteligente 🧠" },
                    { feature: "Assistente de voz", free: <X className="w-5 h-5 text-red-500 mx-auto" />, premium: <Check className="w-6 h-6 text-green-600 mx-auto" /> },
                    { feature: "Receitas exclusivas", free: <X className="w-5 h-5 text-red-500 mx-auto" />, premium: <Check className="w-6 h-6 text-green-600 mx-auto" /> },
                    { feature: "Modo offline", free: <X className="w-5 h-5 text-red-500 mx-auto" />, premium: <Check className="w-6 h-6 text-green-600 mx-auto" /> },
                    { feature: "Análise nutricional", free: "Básica", premium: "Completa 📊" },
                    { feature: "Suporte prioritário", free: <X className="w-5 h-5 text-red-500 mx-auto" />, premium: <Check className="w-6 h-6 text-green-600 mx-auto" /> }
                  ].map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">
                        {item.feature}
                      </td>
                      <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-400">
                        {item.free}
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-orange-600">
                        {item.premium}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Testemunhos */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-gray-900 dark:text-white">
            O Que Dizem os Utilizadores
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
            Milhares de pessoas já transformaram sua cozinha
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-8 shadow-lg rounded-[24px] border-none bg-white/95 dark:bg-gray-800/95 hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-20 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-gray-900 dark:text-white">
            Perguntas Frequentes
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="overflow-hidden shadow-lg rounded-2xl border-none bg-white/95 dark:bg-gray-800/95"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </h3>
                  <div className={`transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-gray-700 dark:text-gray-300 leading-relaxed animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Final Forte */}
        <div className="text-center">
          <Card className="p-12 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-pink-900/20 border-4 border-orange-300 dark:border-orange-700 rounded-[32px] shadow-2xl max-w-4xl mx-auto">
            <div className="mb-6">
              <Crown className="w-16 h-16 text-orange-600 mx-auto mb-4" />
              <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
                Pronto Para Cozinhar Melhor?
              </h3>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">
                Junte-se a <strong className="text-orange-600">10.000+ utilizadores</strong> que já transformaram sua cozinha
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Comece hoje e veja resultados imediatos
              </p>
            </div>
            
            <Button
              size="lg"
              onClick={() => handleSubscribe('yearly')}
              disabled={loadingPlan === 'yearly'}
              className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 h-20 px-16 text-2xl font-extrabold shadow-2xl hover:shadow-3xl transition-all hover:scale-105 mb-4"
            >
              {loadingPlan === 'yearly' ? (
                <>
                  <Loader2 className="w-8 h-8 mr-3 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <Crown className="w-8 h-8 mr-3" />
                  Começar Agora - 33% OFF
                </>
              )}
            </Button>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span>Cancele a qualquer momento</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span>Sem compromisso</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span>Garantia de satisfação</span>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
