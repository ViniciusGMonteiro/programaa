"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BookOpen, Code, Trophy, ChevronRight } from "lucide-react"
import { modules } from "../data/modules"
import { useProgress } from "../hooks/useProgress"
import { useTheme } from "../contexts/ThemeContext"
import Badge from "../components-trilhas/ui/Badge"
import Header from "../components-home/Header"
import Drawer from "../components-home/Drawer"

export default function ModulesPage() {
  const navigate = useNavigate()
  const { getProgressPercentage } = useProgress()
  const { isDarkTheme } = useTheme()

  // Estado para controlar o Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleModuleSelect = (module) => {
    navigate(`/modules/${module.id}/lessons`)
  }

  // Função para controlar o Drawer
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  // Função de logout (placeholder)
  const handleLogout = () => {
    console.log("Logout - implementar se necessário")
    // navigate("/login") // Descomente se necessário
  }

  const getLevelColor = (level) => {
    // Cores otimizadas para contraste com fundo #FFB244 no tema escuro e #E65B02 no tema claro
    if (isDarkTheme) {
      switch (level) {
        case "Iniciante":
          return "bg-white bg-opacity-95 text-orange-900 border border-orange-300 hover:bg-orange-50 hover:text-orange-800 hover:border-orange-400 hover:shadow-md transition-all duration-300 cursor-pointer"
        case "Intermediário":
          return "bg-white bg-opacity-95 text-orange-900 border border-orange-300 hover:bg-orange-50 hover:text-orange-800 hover:border-orange-400 hover:shadow-md transition-all duration-300 cursor-pointer"
        case "Avançado":
          return "bg-white bg-opacity-95 text-red-900 border border-red-300 hover:bg-red-50 hover:text-red-800 hover:border-red-400 hover:shadow-md transition-all duration-300 cursor-pointer"
        default:
          return "bg-white bg-opacity-95 text-gray-900 border border-gray-300 hover:bg-gray-50 hover:text-gray-800 hover:border-gray-400 hover:shadow-md transition-all duration-300 cursor-pointer"
      }
    } else {
      switch (level) {
        case "Iniciante":
          return "bg-white bg-opacity-90 text-orange-900 border border-orange-200 hover:bg-orange-50 hover:text-orange-800 hover:border-orange-300 hover:shadow-md transition-all duration-300 cursor-pointer"
        case "Intermediário":
          return "bg-white bg-opacity-90 text-orange-900 border border-orange-200 hover:bg-orange-50 hover:text-orange-800 hover:border-orange-300 hover:shadow-md transition-all duration-300 cursor-pointer"
        case "Avançado":
          return "bg-white bg-opacity-90 text-red-900 border border-red-200 hover:bg-red-50 hover:text-red-800 hover:border-red-300 hover:shadow-md transition-all duration-300 cursor-pointer"
        default:
          return "bg-white bg-opacity-90 text-gray-900 border border-gray-200 hover:bg-gray-50 hover:text-gray-800 hover:border-gray-300 hover:shadow-md transition-all duration-300 cursor-pointer"
      }
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkTheme ? "bg-[#2a2550]" : "bg-[#D3ECF8]"}`}>
      {/* Header importado da Home */}
      <Header toggleDrawer={toggleDrawer} />

      {/* Drawer importado da Home */}
      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} onLogout={handleLogout} />

      <main className="max-w-6xl mx-auto p-4 sm:p-6 pt-8 sm:pt-10">
        <header className="text-center mb-8 sm:mb-12">
          <h1
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 ${isDarkTheme ? "text-white" : "text-gray-900"}`}
          >
            Escolha seu Nível
          </h1>
          <p className={`text-base sm:text-lg ${isDarkTheme ? "text-gray-200" : "text-gray-600"} max-w-2xl mx-auto`}>
            Selecione o módulo adequado ao seu conhecimento atual em HTML
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {modules.map((module) => (
            <article
              key={module.id}
              className={`${isDarkTheme ? "bg-[#FFB244]" : "bg-[#E65B02]"} rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-105 focus-within:ring-4 focus-within:ring-orange-300 focus-within:ring-opacity-50 group`}
              onClick={() => handleModuleSelect(module)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  handleModuleSelect(module)
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Acessar módulo ${module.title} - ${module.level}`}
            >
              <div className="p-4 sm:p-6 h-full flex flex-col">
                {/* Header do Card */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background:
                        module.level === "Iniciante"
                          ? "#FFB347"
                          : module.level === "Intermediário"
                            ? "#FF6F1F"
                            : "#D44700",
                    }}
                    aria-hidden="true"
                  >
                    {module.level === "Iniciante" && <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-white" />}
                    {module.level === "Intermediário" && <Code className="w-6 h-6 sm:w-7 sm:h-7 text-white" />}
                    {module.level === "Avançado" && <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-white" />}
                  </div>
                  <Badge
                    className={`${getLevelColor(module.level)} font-semibold text-xs sm:text-sm px-3 py-1 rounded-full shadow-sm`}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.stopPropagation()
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Nível: ${module.level}`}
                  >
                    {module.level}
                  </Badge>
                </div>

                {/* Conteúdo Principal */}
                <div className="flex-grow">
                  <h3
                    className={`text-lg sm:text-xl font-bold mb-3 leading-tight ${
                      isDarkTheme ? "text-gray-900" : "text-white"
                    } group-hover:text-gray-800 transition-colors duration-300`}
                  >
                    {module.title}
                  </h3>

                  <p
                    className={`text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed ${
                      isDarkTheme ? "text-gray-800" : "text-orange-50"
                    } group-hover:text-gray-700 transition-colors duration-300`}
                  >
                    {module.description}
                  </p>
                </div>

                {/* Seção de Progresso */}
                <div className="space-y-4 sm:space-y-5">
                  <div>
                    <div
                      className={`flex justify-between text-xs sm:text-sm mb-2 ${
                        isDarkTheme ? "text-gray-800" : "text-orange-100"
                      }`}
                    >
                      <span className="font-medium">Progresso</span>
                      <span className="font-semibold">
                        {module.completedLessons}/{module.totalLessons} aulas
                      </span>
                    </div>
                    <div
                      className={`${isDarkTheme ? "bg-white bg-opacity-40" : "bg-white bg-opacity-30"} rounded-full h-2 sm:h-3 overflow-hidden`}
                    >
                      <div
                        className={`${isDarkTheme ? "bg-gray-800" : "bg-white"} h-full rounded-full transition-all duration-500 ease-out shadow-sm`}
                        style={{ width: `${getProgressPercentage(module)}%` }}
                        role="progressbar"
                        aria-valuenow={getProgressPercentage(module)}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-label={`Progresso do módulo: ${getProgressPercentage(module)}%`}
                      />
                    </div>
                  </div>

                  {/* Footer do Card */}
                  <div className="flex justify-between items-center pt-2 sm:pt-3">
                    <span
                      className={`text-xs sm:text-sm font-medium ${isDarkTheme ? "text-gray-800" : "text-orange-100"}`}
                    >
                      {module.totalLessons} aulas disponíveis
                    </span>

                    <button
                      className={`${isDarkTheme ? "bg-gray-800 text-white border-2 border-gray-800 hover:bg-gray-700 hover:border-gray-700" : "bg-white text-[#E65B02] border-2 border-white hover:bg-orange-50 hover:border-orange-100"} focus:ring-4 focus:ring-white focus:ring-opacity-50 px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-1 sm:gap-2 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95`}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleModuleSelect(module)
                      }}
                      aria-label={`${module.completedLessons > 0 ? "Continuar" : "Começar"} módulo ${module.title}`}
                    >
                      {module.completedLessons > 0 ? "Continuar" : "Começar"}
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}
