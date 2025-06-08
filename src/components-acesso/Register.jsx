"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, User, Mail, Lock, Phone } from "lucide-react"
import { Button } from "./Button"
import BackgroundEffects from "./BackgroundEffect"

function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Hook para detectar scroll - ATIVO para Register pois tem rolagem
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen relative">
      <BackgroundEffects />

      {/* Container principal - COM scroll para Register */}
      <div className="flex flex-col items-center justify-start min-h-screen px-4 py-8">
        {/* Logo - desce suavemente com o scroll */}
        <div
          className="sticky top-8 z-20 mb-8 transition-transform duration-500 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`, // Movimento suave seguindo o scroll
          }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-2xl font-bold text-white">Programin</span>
          </div>
        </div>

        {/* Formulário de Registro */}
        <div className="w-full max-w-md z-10 mb-20">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Criar Conta</h1>
              <p className="text-gray-300">Junte-se à comunidade Programin</p>
            </div>

            <form className="space-y-6">
              {/* Campo Nome */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Nome completo"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Campo Email */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Campo Telefone */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  placeholder="Telefone (opcional)"
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

              {/* Campo Confirmar Senha */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmar senha"
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Checkbox Termos */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="terms" className="text-sm text-gray-300">
                  Eu concordo com os{" "}
                  <Link to="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">
                    Termos de Uso
                  </Link>{" "}
                  e{" "}
                  <Link to="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
                    Política de Privacidade
                  </Link>
                </label>
              </div>

              {/* Botão Cadastrar */}
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105">
                Criar Conta
              </Button>
            </form>

            {/* Link para Login */}
            <div className="mt-8 text-center">
              <p className="text-gray-300">
                Já tem uma conta?{" "}
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200"
                >
                  Faça login
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

export default Register
