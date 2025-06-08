"use client"

import { Star, Users, Trophy } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"

const LevelCard = ({ level, questionsCount, progress, color }) => {
  const { isDarkTheme } = useTheme()

  const getIcon = () => {
    switch (level) {
      case "Iniciante":
        return <Star size={16} />
      case "Intermediário":
        return <Users size={16} />
      case "Avançado":
        return <Trophy size={16} />
      default:
        return <Star size={16} />
    }
  }

  const getColorClasses = () => {
    if (isDarkTheme) {
      // Cores para tema escuro
      switch (color) {
        case "orange":
          return "bg-orange-900 border-orange-700 text-orange-200 hover:bg-orange-800 hover:border-orange-600"
        case "blue":
          return "bg-blue-900 border-blue-700 text-blue-200 hover:bg-blue-800 hover:border-blue-600"
        case "yellow":
          return "bg-yellow-900 border-yellow-700 text-yellow-200 hover:bg-yellow-800 hover:border-yellow-600"
        default:
          return "bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700 hover:border-gray-500"
      }
    } else {
      // Cores para tema claro com ice-white
      switch (color) {
        case "orange":
          return "bg-ice-white border-orange-200 text-orange-800 hover:bg-white hover:border-orange-300 hover:shadow-md"
        case "blue":
          return "bg-ice-white border-blue-200 text-blue-800 hover:bg-white hover:border-blue-300 hover:shadow-md"
        case "yellow":
          return "bg-ice-white border-yellow-200 text-yellow-800 hover:bg-white hover:border-yellow-300 hover:shadow-md"
        default:
          return "bg-ice-white border-gray-200 text-gray-800 hover:bg-white hover:border-gray-300 hover:shadow-md"
      }
    }
  }

  const getProgressColor = () => {
    switch (color) {
      case "orange":
        return "bg-orange-500"
      case "blue":
        return "bg-programin-blue" // Usar cor programin para consistência
      case "yellow":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getProgressBgColor = () => {
    return isDarkTheme ? "bg-gray-700" : "bg-gray-200"
  }

  return (
    <div className={`p-3 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${getColorClasses()}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {getIcon()}
          <span className="font-medium text-sm">{level}</span>
        </div>
        <span className="text-xs font-semibold">{questionsCount} questões</span>
      </div>

      {/* Barra de progresso animada com cores consistentes */}
      <div className={`w-full rounded-full h-2 overflow-hidden ${getProgressBgColor()}`}>
        <div
          className={`h-2 rounded-full transition-all duration-1000 ease-out ${getProgressColor()}`}
          style={{
            width: `${progress}%`,
            animation: "progressFill 1.5s ease-out",
          }}
        />
      </div>
      <p className="text-xs mt-1 text-center font-medium">{progress}% completo</p>
    </div>
  )
}

export default LevelCard