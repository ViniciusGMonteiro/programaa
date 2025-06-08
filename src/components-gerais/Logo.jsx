"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "../contexts/ThemeContext"
import { useNotification } from "../contexts/NotificationContext"

function Logo({ variant = "home", className = "" }) {
  const starsContainerRef = useRef(null)
  const logoTextRef = useRef(null)
  const { isDarkTheme } = useTheme()
  const { showNotification } = useNotification()

  // Efeito para garantir que a logo seja visível após o carregamento
  useEffect(() => {
    if (logoTextRef.current) {
      logoTextRef.current.style.opacity = "1"
      logoTextRef.current.style.transform = "translateY(0)"
    }
  }, [])

  // Função para criar estrelas
  const createStar = (x, y) => {
    if (!starsContainerRef.current) return

    const star = document.createElement("div")
    star.classList.add("star")

    star.style.left = `${x}px`
    star.style.top = `${y}px`

    const angle = Math.random() * Math.PI * 2
    const distance = 30 + Math.random() * 70
    const tx = Math.cos(angle) * distance
    const ty = Math.sin(angle) * distance
    const rotation = Math.random() * 360

    star.style.setProperty("--tx", `${tx}px`)
    star.style.setProperty("--ty", `${ty}px`)
    star.style.setProperty("--rotation", `${rotation}deg`)

    const size = 6 + Math.random() * 8
    star.style.width = `${size}px`
    star.style.height = `${size}px`

    starsContainerRef.current.appendChild(star)

    setTimeout(() => {
      if (star.parentNode) {
        star.remove()
      }
    }, 800)
  }

  const createStarBurst = () => {
    if (!logoTextRef.current) return

    const logoRect = logoTextRef.current.getBoundingClientRect()

    for (let i = 0; i < 30; i++) {
      const x = Math.random() * logoRect.width
      const y = Math.random() * logoRect.height

      setTimeout(() => {
        createStar(x, y)
      }, i * 15)
    }
  }

  const handleLogoClick = (e) => {
    e.stopPropagation()
    createStarBurst()

    const symbolsContainer = document.getElementById("symbols-container")
    if (symbolsContainer) {
      const currentClass = symbolsContainer.className.match(/speed-\w+/)
      const currentSpeed = currentClass ? currentClass[0] : "speed-normal"

      let nextSpeed
      switch (currentSpeed) {
        case "speed-normal":
          nextSpeed = "speed-medium"
          break
        case "speed-medium":
          nextSpeed = "speed-fast"
          break
        default:
          nextSpeed = "speed-normal"
      }

      symbolsContainer.classList.remove("speed-normal", "speed-medium", "speed-fast")
      symbolsContainer.classList.add(nextSpeed)

      const speedNames = {
        "speed-normal": "normal",
        "speed-medium": "média",
        "speed-fast": "rápida",
      }
      showNotification(`Velocidade ${speedNames[nextSpeed]} ativada`)
    }
  }

  // Definir classes baseadas na variante
  const containerClasses = {
    home: "logo-container",
    auth: "logo-container absolute top-4 left-4 z-20",
  }

  return (
    <div className={`${containerClasses[variant]} ${className}`}>
      <button id="logo-button" className="logo-button" onClick={handleLogoClick}>
        <h1 className="logo" ref={logoTextRef} style={{ opacity: 1, transform: "translateY(0)" }}>
          Programin
        </h1>
        <div id="stars-container" className="stars-container" ref={starsContainerRef}></div>
      </button>
    </div>
  )
}

export default Logo