"use client"

import { useState } from "react"
import { Brain, Menu } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"
import ThemeToggle from "../components-home/ThemeToggle"
import Logo from "../components-gerais/Logo"
import AIModal from "./AIModal"
import { useAI } from "./useAI"

const Header = ({ toggleDrawer }) => {
  const { isDarkTheme } = useTheme()
  const [isAIModalOpen, setIsAIModalOpen] = useState(false)
  const { isLoading, response, error, sendMessage, clearResponse } = useAI()

  const bgColor = isDarkTheme ? "bg-slate-800" : "bg-white"
  const textColor = isDarkTheme ? "text-white" : "text-gray-800"
  const borderColor = isDarkTheme ? "border-slate-700" : "border-gray-200"

  const handleOpenAIModal = () => {
    setIsAIModalOpen(true)
    clearResponse()
  }

  const handleCloseAIModal = () => {
    setIsAIModalOpen(false)
    clearResponse()
  }

  const handleSendMessage = async (message) => {
    await sendMessage(message)
  }

  return (
    <>
      <header className={`shadow-lg transition-colors duration-300 ${bgColor} ${textColor} border-b ${borderColor}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center relative min-h-[60px]">
            {/* Aprenda com a IA - Esquerda */}
            <div className="flex-1 flex justify-start">
              <button
                onClick={handleOpenAIModal}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                  isDarkTheme ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
                aria-label="Aprenda com a IA"
              >
                <Brain size={20} className="text-blue-200" />
                <span className="font-medium hidden sm:inline">Aprenda com a IA</span>
                <span className="font-medium sm:hidden">IA</span>
              </button>
            </div>

            {/* Logo Programin - Centro */}
            <div className="flex-1 flex justify-center">
              <Logo variant="home" />
            </div>

            {/* Controles - Direita */}
            <div className="flex-1 flex justify-end items-center space-x-4">
              <div className="mr-2">
                <ThemeToggle />
              </div>
              <button
                className={`flex items-center justify-center h-10 w-10 rounded-lg transition-all duration-300 hover:scale-110 ${
                  isDarkTheme
                    ? "hover:bg-slate-700 text-gray-300 hover:text-white"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                }`}
                onClick={toggleDrawer}
                aria-label="Menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* AI Modal */}
      <AIModal
        isOpen={isAIModalOpen}
        onClose={handleCloseAIModal}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        response={response}
        error={error}
      />
    </>
  )
}

export default Header
