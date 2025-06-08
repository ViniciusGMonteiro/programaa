"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../contexts/ThemeContext"
import Header from "../components-home/Header"
import CourseCard from "../components-home/CourseCard"
import Footer from "../components-home/Footer"
import Drawer from "../components-home/Drawer"

const Home = ({ onLogout }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const navigate = useNavigate()
  const { isDarkTheme } = useTheme()

  // ESTADO DE CONTROLE DAS TRILHAS: Gerencia o progresso e desbloqueio (MANTIDO)
  const [trilhas, setTrilhas] = useState([
    {
      id: 1,
      name: "HTML",
      title: "Aprenda HTML",
      description:
        "Domine a linguagem de marcação fundamental para a web. Aprenda a estruturar páginas, criar formulários e entender os elementos semânticos do HTML5.",
      image: "/placeholder.svg?height=200&width=300&text=HTML",
      color: "orange",
      isCompleted: false,
      isUnlocked: true,
      prerequisite: null,
      route: "/trilha-html",
      levels: [
        { name: "Iniciante", questions: 10, progress: 85 },
        { name: "Intermediário", questions: 10, progress: 60 },
        { name: "Avançado", questions: 10, progress: 25 },
      ],
    },
    {
      id: 2,
      name: "CSS",
      title: "Aprenda CSS",
      description:
        "Transforme suas páginas HTML com estilos incríveis. Aprenda layouts flexbox, grid, animações e técnicas de design responsivo para todos os dispositivos.",
      image: "/placeholder.svg?height=200&width=300&text=CSS",
      color: "blue",
      isCompleted: false,
      isUnlocked: false,
      prerequisite: "HTML",
      route: "/trilha-css",
      levels: [
        { name: "Iniciante", questions: 10, progress: 45 },
        { name: "Intermediário", questions: 10, progress: 20 },
        { name: "Avançado", questions: 10, progress: 0 },
      ],
    },
    {
      id: 3,
      name: "JavaScript",
      title: "Aprenda JavaScript",
      description:
        "Dê vida às suas páginas web com interatividade. Aprenda a manipular o DOM, criar animações, validar formulários e construir aplicações dinâmicas.",
      image: "/placeholder.svg?height=200&width=300&text=JS",
      color: "yellow",
      isCompleted: false,
      isUnlocked: false,
      prerequisite: "CSS",
      route: "/trilha-javascript",
      levels: [
        { name: "Iniciante", questions: 10, progress: 15 },
        { name: "Intermediário", questions: 10, progress: 0 },
        { name: "Avançado", questions: 10, progress: 0 },
      ],
    },
  ])

  // FUNÇÃO DE DESBLOQUEIO AUTOMÁTICO (MANTIDA)
  const checkAndUnlockTrilhas = (updatedTrilhas) => {
    return updatedTrilhas.map((trilha) => {
      if (trilha.isUnlocked) return trilha

      if (!trilha.prerequisite) {
        return { ...trilha, isUnlocked: true }
      }

      const prerequisiteTrilha = updatedTrilhas.find((t) => t.name === trilha.prerequisite)
      if (prerequisiteTrilha && prerequisiteTrilha.isCompleted) {
        return { ...trilha, isUnlocked: true }
      }

      return trilha
    })
  }

  // FUNÇÃO PARA MARCAR TRILHA COMO CONCLUÍDA (MANTIDA)
  const completeTrilha = (trilhaName) => {
    setTrilhas((prevTrilhas) => {
      const updatedTrilhas = prevTrilhas.map((trilha) =>
        trilha.name === trilhaName ? { ...trilha, isCompleted: true } : trilha,
      )

      return checkAndUnlockTrilhas(updatedTrilhas)
    })

    console.log(`Trilha ${trilhaName} concluída! Verificando desbloqueios...`)
  }

  // EFEITO PARA VERIFICAR DESBLOQUEIOS NA INICIALIZAÇÃO (MANTIDO)
  useEffect(() => {
    setTrilhas((prevTrilhas) => checkAndUnlockTrilhas(prevTrilhas))
  }, [])

  // FUNÇÃO DE NAVEGAÇÃO (MANTIDA)
  const handleTrilhaClick = (trilha) => {
    if (trilha.isUnlocked) {
      navigate(trilha.route)
    } else {
      console.log(`Trilha ${trilha.name} está bloqueada. Complete ${trilha.prerequisite} primeiro.`)
    }
  }

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 ${
        // NOVA COR: Alterada para #2a2550 no tema escuro
        isDarkTheme ? "bg-[#2a2550]" : "bg-gradient-to-br from-white to-[#BEEBFE]"
      }`}
    >
      <Header toggleDrawer={toggleDrawer} />
      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} onLogout={onLogout} />

      <main className="flex-grow container mx-auto px-6 py-12">
        {/* TÍTULO E DESCRIÇÃO */}
        <div className="text-center mb-12">
          <h2
            className={`text-4xl font-bold mb-6 transition-colors duration-300 ${
              isDarkTheme ? "text-[#F5F5F5]" : "text-gray-900"
            }`}
          >
            Módulos Disponíveis
          </h2>

          <div className="max-w-4xl mx-auto space-y-4">
            <p className={`text-lg leading-relaxed ${isDarkTheme ? "text-[#F5F5F5]" : "text-gray-800"}`}>
              Inicie sua jornada no desenvolvimento web com nossa trilha de aprendizado estruturada e progressiva.
            </p>
            <p className={`text-base leading-relaxed ${isDarkTheme ? "text-gray-200" : "text-gray-700"}`}>
              Cada módulo foi cuidadosamente projetado para construir suas habilidades de forma gradual, desde os
              fundamentos do {/* MELHORIA 1: Destaque aplicado na palavra HTML no tema escuro */}
              <span
                className={`font-semibold ${
                  isDarkTheme ? "text-orange-400 bg-orange-900 bg-opacity-50 px-1 py-0.5 rounded" : "text-orange-600"
                }`}
              >
                HTML
              </span>{" "}
              para estruturação, passando pelo {/* Destaque mantido na palavra CSS */}
              <span
                className={`font-semibold ${
                  isDarkTheme ? "text-blue-400 bg-blue-900 bg-opacity-50 px-1 py-0.5 rounded" : "text-blue-500"
                }`}
              >
                CSS
              </span>{" "}
              para estilização, até o {/* MELHORIA 1: Destaque aplicado na palavra JavaScript no tema escuro */}
              <span
                className={`font-semibold ${
                  isDarkTheme ? "text-yellow-400 bg-yellow-900 bg-opacity-50 px-1 py-0.5 rounded" : "text-yellow-600"
                }`}
              >
                JavaScript
              </span>{" "}
              para interatividade.
            </p>
            <p className={`text-sm ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>
              Complete cada módulo para desbloquear o próximo e avançar em sua carreira como desenvolvedor.
            </p>
          </div>
        </div>

        {/* CARDS DAS TRILHAS (MANTIDOS) */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {trilhas.map((trilha) => (
              <CourseCard
                key={trilha.id}
                title={trilha.title}
                description={trilha.description}
                image={trilha.image}
                color={trilha.color}
                levels={trilha.levels}
                isUnlocked={trilha.isUnlocked}
                isCompleted={trilha.isCompleted}
                prerequisite={trilha.prerequisite}
                onClick={() => handleTrilhaClick(trilha)}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home