"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BookOpen, Code, Trophy, ChevronRight } from "lucide-react"
import Button from "../components-trilhas/ui/Button"
import Header from "../components-home/Header"
import Drawer from "../components-home/Drawer"
import { useTheme } from "../contexts/ThemeContext"

export default function HomePage() {
  const navigate = useNavigate()
  const { isDarkTheme } = useTheme()

  // ESTADO DO DRAWER: Adicionado para controlar abertura/fechamento
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleStartLearning = () => {
    navigate("/modules")
  }

  // FUNÇÃO PARA CONTROLAR O DRAWER: Reutilizada do padrão existente
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  // FUNÇÃO DE LOGOUT: Placeholder para manter consistência com o Drawer
  const handleLogout = () => {
    console.log("Logout - implementar se necessário")
    // navigate("/login") // Descomente se necessário
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkTheme ? "bg-[#2a2550]" : "bg-[#D9F3FF]"}`}>
      {/* HEADER: Importado e inserido com função toggleDrawer */}
      <Header toggleDrawer={toggleDrawer} />

      {/* DRAWER: Adicionado conforme solicitado */}
      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} onLogout={handleLogout} />

      {/* CONTEÚDO PRINCIPAL: Refatorado com as novas cores */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl mx-auto w-full">
          {/* SEÇÃO PRINCIPAL: Card centralizado com cor #E65B02 em ambos os temas */}
          <div
            className={`${isDarkTheme ? "bg-[#FFB244]" : "bg-[#E65B02]"} rounded-lg shadow-lg w-full mx-auto card-animation relative mb-8 transition-colors duration-300`}
          >
            <div className="px-10 py-12 text-center">
              {/* TÍTULO PRINCIPAL: Mantendo estilo do tema escuro */}
              <h1
                className={`${isDarkTheme ? "text-gray-900" : "text-white"} text-4xl font-semibold mb-6 title-animation`}
              >
                Aprenda HTML do Básico ao Avançado
              </h1>

              {/* DESCRIÇÃO: Mantendo estilo do tema escuro */}
              <p
                className={`${isDarkTheme ? "text-gray-800" : "text-gray-200"} text-xl max-w-3xl mx-auto mb-8 leading-relaxed`}
              >
                Domine a linguagem de marcação fundamental da web através de três módulos progressivos, desde os
                conceitos básicos até técnicas avançadas de desenvolvimento.
              </p>

              {/* BOTÃO PRINCIPAL: Estilo dos botões das telas de auth */}
              <div className="form-group-animation" style={{ animationDelay: "300ms" }}>
                <Button
                  onClick={handleStartLearning}
                  className="bg-[#2A2550] text-white py-3 px-8 rounded-md hover:bg-[#1f1d3d] transition-colors font-medium button-animation text-lg"
                >
                  Começar a Aprender HTML
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* SEÇÃO SECUNDÁRIA: Card com cor #E65B02 em ambos os temas */}
          <div
            className={`${isDarkTheme ? "bg-[#FFB244]" : "bg-[#E65B02]"} rounded-lg shadow-lg w-full mx-auto card-animation relative transition-colors duration-300`}
            style={{ animationDelay: "200ms" }}
          >
            <div className="px-10 py-8">
              {/* TÍTULO DA SEÇÃO: Mantendo estilo do tema escuro */}
              <h2
                className={`${isDarkTheme ? "text-gray-900" : "text-white"} text-2xl font-semibold mb-8 text-center title-animation`}
              >
                Por que aprender HTML?
              </h2>

              {/* GRID DE BENEFÍCIOS: Responsivo e com animações */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* CARD 1: Fundação Sólida */}
                <div className="text-center form-group-animation" style={{ animationDelay: "400ms" }}>
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className={`font-semibold ${isDarkTheme ? "text-gray-900" : "text-white"} mb-3 text-lg`}>
                    Fundação Sólida
                  </h3>
                  <p className={`${isDarkTheme ? "text-gray-800" : "text-gray-200"} text-sm leading-relaxed`}>
                    HTML é a base de toda página web. Dominar seus conceitos é essencial para qualquer desenvolvedor.
                  </p>
                </div>

                {/* CARD 2: Carreira Promissora */}
                <div className="text-center form-group-animation" style={{ animationDelay: "500ms" }}>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                    <Code className="w-8 h-8 text-programin-blue" />
                  </div>
                  <h3 className={`font-semibold ${isDarkTheme ? "text-gray-900" : "text-white"} mb-3 text-lg`}>
                    Carreira Promissora
                  </h3>
                  <p className={`${isDarkTheme ? "text-gray-800" : "text-gray-200"} text-sm leading-relaxed`}>
                    Conhecimento em HTML abre portas para desenvolvimento web, mobile e diversas oportunidades.
                  </p>
                </div>

                {/* CARD 3: Projetos Reais */}
                <div className="text-center form-group-animation" style={{ animationDelay: "600ms" }}>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                    <Trophy className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className={`font-semibold ${isDarkTheme ? "text-gray-900" : "text-white"} mb-3 text-lg`}>
                    Projetos Reais
                  </h3>
                  <p className={`${isDarkTheme ? "text-gray-800" : "text-gray-200"} text-sm leading-relaxed`}>
                    Cada módulo inclui projetos práticos para aplicar o conhecimento em situações reais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
