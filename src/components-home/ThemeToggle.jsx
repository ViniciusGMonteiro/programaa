"use client"

import { useEffect } from "react"
import { useTheme } from "../contexts/ThemeContext"
import { useNotification } from "../contexts/NotificationContext"
import { Moon, Sun } from "lucide-react"

function ThemeToggle() {
  const { isDarkTheme, toggleTheme } = useTheme()
  const { showNotification } = useNotification()

  // Função para acionar o efeito de onda
  const triggerWaveEffect = () => {
    const waveEffect = document.getElementById("wave-effect")
    if (waveEffect) {
      // Remover classes anteriores para reiniciar a animação
      waveEffect.classList.remove("wave-animation")

      // Forçar um reflow para que a animação reinicie
      void waveEffect.offsetWidth

      // Adicionar a classe de animação
      waveEffect.classList.add("wave-animation")
    }
  }

  // Acionar o efeito de onda na carga inicial da página
  useEffect(() => {
    setTimeout(() => {
      triggerWaveEffect()
    }, 500)
  }, [])

  const handleToggle = () => {
    // Acionar o efeito de onda
    triggerWaveEffect()

    // Alternar o tema
    toggleTheme()

    // Mostrar notificação após a transição
    setTimeout(() => {
      showNotification(isDarkTheme ? "Tema claro ativado" : "Tema escuro ativado")
    }, 800)
  }

  return (
  <div className="flex items-center">
      <span className="mr-2 text-sm text-gray-600">
        <Moon className="moon-icon w-4 h-4" />
      </span>
      <label className="theme-switch">
        <input type="checkbox" id="theme-toggle" checked={!isDarkTheme} onChange={handleToggle} />
        <span className="slider round"></span>
      </label>
      <span className="ml-2 text-sm text-gray-600">
        <Sun className="sun-icon w-4 h-4" />
      </span>
    </div>
  )
}

export default ThemeToggle