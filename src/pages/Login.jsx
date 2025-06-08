"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Logo from "../components-gerais/Logo"
import ThemeToggle from "../components-gerais/ThemeToggle"
import BackgroundEffects from "../components-acesso/BackgroundEffect"
import MascotWithSpeech from "../components-gerais/MascoteWithSpeech"
import { useNotification } from "../contexts/NotificationContext"

function Login({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const { showNotification } = useNotification()
  const navigate = useNavigate()

  // Hook para detectar scroll - usado para animação da logo
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulando envio do formulário
    setTimeout(() => {
      console.log("Tentativa de login:", { email, password, remember })
      setIsLoading(false)
      showNotification("Login realizado com sucesso!")
      onLogin() // isso define isAuthenticated como true
      navigate("/") // redireciona para Home
    }, 1500)
  }

  const handleSocialLogin = (provider) => {
    showNotification(`Redirecionando para o ${provider}...`)

    setTimeout(() => {
      // URLs de redirecionamento conforme o original
      const urls = {
        Google:
          "https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email%20profile",
        GitHub:
          "https://github.com/login/oauth/authorize?client_id=YOUR_GITHUB_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=user:email",
        LinkedIn:
          "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_LINKEDIN_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=r_liteprofile%20r_emailaddress",
      }

      window.location.href = urls[provider]
    }, 1000)
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    showNotification("Redirecionando para recuperação de senha...")

    setTimeout(() => {
      navigate("/recover-password")
    }, 1000)
  }

  return (
    <div className="h-screen flex items-center justify-center relative overflow-hidden" id="body">
      {/* Logo original - posição base de referência, sem movimento no Login */}
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
        className="bg-ice-white rounded-lg shadow-lg w-full max-w-md mx-auto z-10 px-4 card-animation relative"
        id="login-card"
      >
        {/* Switch de tema no canto superior direito */}
        <ThemeToggle />

        <div className="px-10 py-8">
          <h1 className="text-[#1a1f36] text-2xl font-semibold text-center mb-8 title-animation" id="login-title">
            Acesse sua conta
          </h1>

          <form onSubmit={handleSubmit} id="loginForm">
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

            <div className="mb-5 form-group-animation" style={{ animationDelay: "100ms" }}>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <a
                  href="#"
                  className="text-sm text-programin-blue hover:underline link-animation"
                  onClick={handleForgotPassword}
                >
                  Esqueceu sua senha?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none input-animation bg-ice-white"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="eye-off-icon"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="eye-icon"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="mb-6 form-group-animation" style={{ animationDelay: "200ms" }}>
              <label className="flex items-center checkbox-container">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    className="form-checkbox h-5 w-5 text-programin-blue rounded"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                </div>
                <span className="ml-2 text-sm text-gray-700">Lembrar de mim neste dispositivo</span>
              </label>
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
                  <span className="loading-spinner"></span> Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          <div className="flex items-center my-6 divider-animation" style={{ animationDelay: "400ms" }}>
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">OU</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="space-y-3">
            <button
              className="w-full border border-gray-300 rounded-md py-2 px-4 flex items-center justify-center hover:bg-gray-50 transition-colors alt-button-animation bg-ice-white"
              style={{ animationDelay: "500ms" }}
              onClick={() => handleSocialLogin("Google")}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" className="mr-2">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Entrar com o Google
            </button>

            <button
              className="w-full border border-gray-300 rounded-md py-2 px-4 flex items-center justify-center hover:bg-gray-50 transition-colors alt-button-animation bg-ice-white"
              style={{ animationDelay: "600ms" }}
              onClick={() => handleSocialLogin("GitHub")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              Entrar com GitHub
            </button>

            <button
              className="w-full border border-gray-300 rounded-md py-2 px-4 flex items-center justify-center hover:bg-gray-50 transition-colors alt-button-animation bg-ice-white"
              style={{ animationDelay: "700ms" }}
              onClick={() => handleSocialLogin("LinkedIn")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#0A66C2"
                className="mr-2"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Entrar com LinkedIn
            </button>
          </div>
        </div>

        <div
          className="mt-6 py-2 px-10 bg-programin-light-blue rounded-b-lg text-center footer-animation"
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

export default Login
