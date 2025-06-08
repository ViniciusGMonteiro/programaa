"use client"

import Logo from "../components-gerais/Logo"
import ThemeToggle from "../components-gerais/ThemeToggle"
import BackgroundEffects from "../components-acesso/BackgroundEffect"
import MascotWithSpeech from "../components-gerais/MascoteWithSpeech"

function AuthLayout({ children, title }) {
  return (
    <div className="min-h-screen flex items-center justify-center relative" id="body">
      {/* Logo no topo à esquerda */}
      <Logo variant="auth" />

      {/* Efeitos de fundo */}
      <BackgroundEffects />

      {/* Mascote no canto inferior esquerdo */}
      <div className="fixed bottom-4 left-4 z-20">
        <MascotWithSpeech />
      </div>

      {/* Card principal */}
      <div className="bg-ice-white rounded-lg shadow-lg w-full max-w-md mx-auto z-10 my-10 card-animation relative">
        {/* ThemeToggle no canto superior direito do card */}
        <div className="absolute top-4 right-4 z-30">
          <ThemeToggle />
        </div>

        <div className="px-10 py-8">
          {title && <h1 className="text-[#1a1f36] text-2xl font-semibold text-center mb-8 title-animation">{title}</h1>}
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
