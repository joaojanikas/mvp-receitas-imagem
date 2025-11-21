"use client"

import { useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ChefHat, Mail, Loader2, ArrowLeft, Check } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess(false)

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/redefinir-senha`,
      })

      if (resetError) throw resetError

      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "Erro ao enviar email de recuperação. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-2xl rounded-3xl border-none bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
        <div className="space-y-6">
          {/* Logo e Título */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-lg">
              <ChefHat className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                Recuperar Senha
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Enviaremos um link para redefinir sua senha
              </p>
            </div>
          </div>

          {/* Formulário */}
          {!success ? (
            <form onSubmit={handleResetPassword} className="space-y-5">
              {error && (
                <Alert variant="destructive" className="animate-shake">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-11 h-12 border-2 focus:border-orange-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 font-bold text-base shadow-lg hover:shadow-xl transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar Link de Recuperação"
                )}
              </Button>
            </form>
          ) : (
            <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200">
              <Check className="w-4 h-4" />
              <AlertDescription>
                Email enviado com sucesso! Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
              </AlertDescription>
            </Alert>
          )}

          {/* Link para Voltar */}
          <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Login
            </Link>
          </div>
        </div>
      </Card>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}
