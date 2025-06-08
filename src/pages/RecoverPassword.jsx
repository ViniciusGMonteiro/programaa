"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ThemeToggle from "../components-gerais/ThemeToggle"
import BackgroundEffects from "../components-acesso/BackgroundEffect"
import MascotWithSpeech from "../components-gerais/MascoteWithSpeech"
import { useNotification } from "../contexts/NotificationContext"
import Logo from "../components-gerais/Logo"

function RecoverPassword() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const { showNotification } = useNotification()

  // Hook para detectar scroll (usado condicionalmente)
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      console.log("Tentativa de recuperação de senha para:", email)
      setIsLoading(false)

      showNotification("Link de recuperação enviado para seu e-mail!")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" id="body">
      {/* Logo - mantém posição base como referência */}
      <div
        className="absolute top-4 left-12 z-20 transition-transform duration-500 ease-out"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`, // Movimento mínimo para manter consistência
        }}
      >
        <Logo variant="auth" />
      </div>

      <BackgroundEffects />

      {/* Mascote com ajuste para subir levemente */}
      <div className="fixed bottom-4 right-4 z-20 transform translate-y-[-20px] transition-transform duration-500">
        <MascotWithSpeech />
      </div>

      <div
        className="bg-ice-white rounded-lg shadow-lg w-full max-w-lg mx-auto z-10 my-10 card-animation relative"
        id="login-card"
      >
        <ThemeToggle />

        <div className="px-10 py-8">
          <h1 className="text-[#1a1f36] text-2xl font-semibold text-center mb-8 title-animation" id="login-title">
            Recuperar Senha
          </h1>

          <p className="text-gray-600 mb-6 text-center">
            Digite seu e-mail para receber um link de recuperação de senha.
          </p>

          <form onSubmit={handleSubmit} id="recoverForm">
            <div className="mb-5 form-group-animation">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none input-animation bg-ice-white"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className={`w-full bg-programin-blue text-white py-3 px-4 rounded-md hover:bg-opacity-90 transition-colors font-medium button-animation ${
                isLoading ? "loading" : ""
              }`}
              style={{ animationDelay: "300ms" }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span> Enviando...
                </>
              ) : (
                "Enviar Link de Recuperação"
              )}
            </button>

            <div className="mt-4 text-center">
              <Link to="/login" className="text-programin-blue hover:underline link-animation">
                Voltar para o login
              </Link>
            </div>
          </form>
        </div>

        <div
          className="mt-6 py-4 px-10 bg-programin-light-blue rounded-b-lg text-center footer-animation"
          style={{ animationDelay: "800ms" }}
          id="footer"
        >
          <p className="text-sm text-gray-600">
            Novo na Programin?{" "}
            <Link to="/register" className="text-programin-blue hover:underline link-animation">
              Crie uma conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RecoverPassword