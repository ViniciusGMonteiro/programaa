"use client"

import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [isToggling, setIsToggling] = useState(false)

  // Verificar se há uma preferência de tema salva
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")

    // Se não houver preferência salva ou a preferência for "dark", ativar o tema escuro
    if (savedTheme === null || savedTheme === "dark") {
      setIsDarkTheme(true)
      document.body.classList.add("dark-theme")

      // Se for a primeira visita, salvar a preferência como "dark"
      if (savedTheme === null) {
        localStorage.setItem("theme", "dark")
      }
    } else {
      // Se a preferência salva for "light", manter o tema claro
      setIsDarkTheme(false)
      document.body.classList.remove("dark-theme")
    }
  }, [])

  // Função para alternar o tema
  const toggleTheme = () => {
    // Se já estiver alternando, ignora
    if (isToggling) return

    // Marca que está alternando
    setIsToggling(true)

    // Adicionar classe de transição
    document.body.classList.add("transitioning")

    // Alternar o tema após um pequeno atraso para sincronizar com a onda
    setTimeout(() => {
      setIsDarkTheme((prev) => {
        const newTheme = !prev

        if (newTheme) {
          document.body.classList.add("dark-theme")
          localStorage.setItem("theme", "dark")
        } else {
          document.body.classList.remove("dark-theme")
          localStorage.setItem("theme", "light")
        }

        return newTheme
      })

      // Remover classe de transição após a conclusão
      setTimeout(() => {
        document.body.classList.remove("transitioning")

        // Marca que terminou de alternar
        setIsToggling(false)
      }, 500)
    }, 300)
  }

  return <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
