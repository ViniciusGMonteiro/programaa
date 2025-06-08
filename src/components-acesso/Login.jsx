"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, User, Lock } from "lucide-react"
import { Button } from "./Button"
import BackgroundEffects from "./BackgroundEffect"

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Hook para detectar scroll (usado condicionalmente)
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)

    // Apenas adiciona listener se necessário (no caso do Login, não é necessário)
    // Mantido para consistência com outras telas
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundEffects />

      {/* Container principal - sem scroll no desktop */}
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        {/* Logo - posição base de referência */}
        <div
          className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-50%) translateY(${scrollY * 0.3}px)`, // Movimento suave com scroll
          }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-2xl font-bold text-white">Programin</span>
          </div>
        </div>

        {/* Formulário de Login */}
        <div className="w-full max-w-md z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Bem-vindo de volta!</h1>
              <p className="text-gray-300">Entre na sua conta para continuar</p>
            </div>

            <form className="space-y-6">
              {/* Campo Email/Usuário */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Email ou usuário"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Campo Senha */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Link Esqueci a senha */}
              <div className="text-right">
                <Link
                  to="/recover"
                  className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200"
                >
                  Esqueci minha senha
                </Link>
              </div>

              {/* Botão Entrar */}
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105">
                Entrar
              </Button>
            </form>

            {/* Link para Registro */}
            <div className="mt-8 text-center">
              <p className="text-gray-300">
                Não tem uma conta?{" "}
                <Link
                  to="/register"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Mascote e Nuvem - Canto inferior esquerdo com ajuste para subir levemente */}
        <div className="fixed bottom-4 left-4 z-10 transform translate-y-[-20px] transition-transform duration-500">
          {/* Nuvem */}
          <div className="relative mb-2">
            <div className="w-16 h-10 bg-white/20 rounded-full backdrop-blur-sm"></div>
            <div className="absolute -top-2 left-2 w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm"></div>
            <div className="absolute -top-1 right-2 w-6 h-6 bg-white/20 rounded-full backdrop-blur-sm"></div>
          </div>

          {/* Mascote */}
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-xl">🤖</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
