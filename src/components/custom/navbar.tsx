"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  Home, 
  ChefHat, 
  Refrigerator, 
  Calendar, 
  User,
  Menu,
  X,
  Crown,
  ShoppingCart,
  HelpCircle,
  Settings,
  FileText,
  Star,
  LogIn,
  LogOut,
  UserPlus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"

const mainNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/receitas", label: "Receitas", icon: ChefHat },
  { href: "/frigorifico", label: "Frigorífico", icon: Refrigerator },
  { href: "/plano-semanal", label: "Plano Semanal", icon: Calendar },
  { href: "/perfil", label: "Perfil", icon: User, requireAuth: true },
]

const secondaryNavItems = [
  { href: "/premium", label: "Premium", icon: Crown },
  { href: "/lista-compras", label: "Lista de Compras", icon: ShoppingCart },
  { href: "/suporte", label: "Suporte", icon: HelpCircle },
  { href: "/definicoes", label: "Definições", icon: Settings },
  { href: "/termos", label: "Termos", icon: FileText },
  { href: "/avaliar", label: "Avaliar App", icon: Star },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut, isPremium } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    setIsOpen(false)
    router.push("/")
  }

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex items-center gap-1">
        {mainNavItems.map((item) => {
          // Pular item se requer autenticação e usuário não está logado
          if (item.requireAuth && !user) return null
          
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className={`gap-2 ${
                  isActive 
                    ? "bg-gradient-to-r from-orange-500 to-pink-600 text-white hover:from-orange-600 hover:to-pink-700" 
                    : "hover:bg-orange-50 dark:hover:bg-orange-900/20"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{item.label}</span>
              </Button>
            </Link>
          )
        })}

        {/* Botões de Autenticação Desktop */}
        {user ? (
          <div className="flex items-center gap-2 ml-2">
            {isPremium && (
              <Badge className="bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="gap-2 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Sair</span>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2 ml-2">
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 hover:bg-orange-50 dark:hover:bg-orange-900/20"
              >
                <LogIn className="w-4 h-4" />
                <span className="font-medium">Entrar</span>
              </Button>
            </Link>
            <Link href="/registro">
              <Button
                size="sm"
                className="gap-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white hover:from-orange-600 hover:to-pink-700"
              >
                <UserPlus className="w-4 h-4" />
                <span className="font-medium">Criar Conta</span>
              </Button>
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile Hamburger Menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] sm:w-[320px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-orange-400 to-pink-600 p-2 rounded-xl">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent font-bold">
                Chef IA
              </span>
            </SheetTitle>
          </SheetHeader>

          <div className="mt-8 space-y-6">
            {/* Status do Usuário */}
            {user && (
              <div className="p-4 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 rounded-xl border border-orange-200/50 dark:border-orange-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {user.email?.split('@')[0]}
                    </p>
                    {isPremium ? (
                      <Badge className="bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold text-xs mt-1">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    ) : (
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Conta Gratuita
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Botões de Autenticação Mobile (se não logado) */}
            {!user && (
              <div className="space-y-2">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-12 border-2"
                  >
                    <LogIn className="w-5 h-5" />
                    <span className="font-medium">Entrar</span>
                  </Button>
                </Link>
                <Link href="/registro" onClick={() => setIsOpen(false)}>
                  <Button
                    className="w-full justify-start gap-3 h-12 bg-gradient-to-r from-orange-500 to-pink-600 text-white hover:from-orange-600 hover:to-pink-700"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span className="font-medium">Criar Conta</span>
                  </Button>
                </Link>
              </div>
            )}

            {/* Main Navigation */}
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Menu Principal
              </h3>
              {mainNavItems.map((item) => {
                // Pular item se requer autenticação e usuário não está logado
                if (item.requireAuth && !user) return null
                
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start gap-3 ${
                        isActive 
                          ? "bg-gradient-to-r from-orange-500 to-pink-600 text-white" 
                          : "hover:bg-orange-50 dark:hover:bg-orange-900/20"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Button>
                  </Link>
                )
              })}
            </div>

            {/* Secondary Navigation */}
            <div className="space-y-1 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Mais Opções
              </h3>
              {secondaryNavItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start gap-3 ${
                        isActive 
                          ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600" 
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </Button>
                  </Link>
                )
              })}
            </div>

            {/* Botão de Logout (se logado) */}
            {user && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="w-full justify-start gap-3 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sair da Conta</span>
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
