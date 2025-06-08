"use client"

import { useEffect, useRef } from "react"

function BackgroundEffects() {
  const symbolsContainerRef = useRef(null)
  const symbolIntervalRef = useRef(null)

  useEffect(() => {
    const caracteres = ["0", "1", "{", "}", "(", ")", "[", "]", ";", ".", "=", "<", ">", "+", "-", "*", "&", "|", "!"]
    const container = symbolsContainerRef.current

    // Aplicar classe de velocidade inicial
    container.classList.add("speed-normal")

    // Função para criar símbolos
    const createSymbol = () => {
      const symbol = document.createElement("div")
      symbol.classList.add("symbol")

      const char = caracteres[Math.floor(Math.random() * caracteres.length)]
      symbol.textContent = char

      // Tamanho reduzido para um valor intermediário
      const size = Math.random() * 10 + 14
      symbol.style.fontSize = `${size}px`

      const left = Math.random() * 100
      symbol.style.left = `${left}vw`

      // Duração base da animação
      const baseDuration = Math.random() * 2.5 + 2.5
      symbol.style.setProperty("--base-duration", `${baseDuration}s`)

      container.appendChild(symbol)

      // Verifica se o elemento passou da metade da tela e troca a cor
      const interval = setInterval(() => {
        const rect = symbol.getBoundingClientRect()
        const middle = window.innerHeight / 2

        if (rect.top > middle) {
          symbol.classList.add("halfway")
          clearInterval(interval) // para de verificar após trocar a cor
        }
      }, 100) // verifica a cada 100ms

      // Remove o símbolo após a animação
      // O tempo depende da velocidade atual
      let duration = baseDuration
      if (container.classList.contains("speed-medium")) {
        duration = baseDuration * 0.7
      } else if (container.classList.contains("speed-fast")) {
        duration = baseDuration * 0.4
      }

      setTimeout(() => {
        symbol.remove()
        clearInterval(interval) // limpar caso ainda ativo
      }, duration * 1000)
    }

    // Função para iniciar a criação de símbolos com frequência baseada na velocidade
    const startSymbolCreation = () => {
      // Limpar intervalo anterior se existir
      if (symbolIntervalRef.current) {
        clearInterval(symbolIntervalRef.current)
      }

      // Definir frequência baseada na velocidade
      let frequency = 100 // Normal: 100ms

      if (container.classList.contains("speed-medium")) {
        frequency = 70 // Médio: 70ms
      } else if (container.classList.contains("speed-fast")) {
        frequency = 40 // Rápido: 40ms
      }

      symbolIntervalRef.current = setInterval(createSymbol, frequency)
    }

    // Iniciar com velocidade normal
    startSymbolCreation()

    // Observar mudanças nas classes para ajustar a velocidade
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          startSymbolCreation()
        }
      })
    })

    observer.observe(container, { attributes: true })

    // Limpar ao desmontar
    return () => {
      if (symbolIntervalRef.current) {
        clearInterval(symbolIntervalRef.current)
      }
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Gradiente de fundo original (Projeto 1) - camada mais baixa */}
      <div className="gradient-bg fixed top-0 left-0 w-full h-full -z-20"></div>

      {/* Novo elemento para o efeito de onda */}
      <div id="wave-effect" className="fixed top-0 left-0 w-full h-full -z-15"></div>

      {/* Animação de chuva de código (Projeto 2) - camada intermediária */}
      <div id="symbols-container" className="fixed top-0 left-0 w-full h-full -z-10" ref={symbolsContainerRef}></div>
    </>
  )
}

export default BackgroundEffects
