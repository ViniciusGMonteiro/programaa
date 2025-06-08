"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Mail, ArrowLeft } from "lucide-react"
import { Button } from "./Button"
import BackgroundEffects from "./BackgroundEffect"

function Recover() {
  const [scrollY, setScrollY] = useState(0)
  const [emailSent, setEmailSent] = useState(false)

  // Hook para detectar scroll (usado condicionalmente)
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simular envio de email
    setEmailSent(true)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundEffects />

      {/* Container principal - sem scroll no desktop */}
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        {/* Logo - mantém posição base como referência */}
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

        {/* Formulário de Recuperação */}
        <div className="w-full max-w-md z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
            {/* Botão Voltar */}
            <div className="mb-6">
              <Link
                to="/login"
                className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao login
              </Link>
            </div>

            {!emailSent ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-white mb-2">Recuperar Senha</h1>
                  <p className="text-gray-300">Digite seu email e enviaremos um link para redefinir sua senha</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Campo Email */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      placeholder="Seu email"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  {/* Botão Enviar */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    Enviar Link de Recuperação
                  </Button>
                </form>
              </>
            ) : (
              <>
                {/* Estado após envio do email */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="h-8 w-8 text-green-400" />
                  </div>

                  <h1 className="text-3xl font-bold text-white mb-2">Email Enviado!</h1>
                  <p className="text-gray-300 mb-8">
                    Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
                  </p>

                  <div className="space-y-4">
                    <Button
                      onClick={() => setEmailSent(false)}
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10 transition-all duration-200"
                    >
                      Enviar Novamente
                    </Button>

                    <Link
                      to="/login"
                      className="block w-full text-center text-blue-400 hover:text-blue-300 transition-colors duration-200"
                    >
                      Voltar ao Login
                    </Link>
                  </div>
                </div>
              </>
            )}
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

export default Recover