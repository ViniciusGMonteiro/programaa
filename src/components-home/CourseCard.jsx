"use client"

import { useTheme } from "../contexts/ThemeContext"
import { Star, Users, Trophy, Lock, CheckCircle } from "lucide-react"

const CourseCard = ({
  title,
  description,
  image,
  levels,
  onClick,
  color,
  isUnlocked = true,
  isCompleted = false,
  prerequisite,
}) => {
  const { isDarkTheme } = useTheme()

  const getCardColorClasses = () => {
    const baseClasses = "rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl relative"

    // LÓGICA DE INTERAÇÃO: Define cursor e hover baseado no status da trilha (MANTIDA)
    let interactionClasses = ""
    if (isCompleted) {
      interactionClasses = "cursor-pointer hover:-translate-y-2 ring-2 ring-green-500"
    } else if (isUnlocked) {
      interactionClasses = "cursor-pointer hover:-translate-y-2"
    } else {
      interactionClasses = "cursor-not-allowed opacity-60"
    }

    // NOVA COR: Card HTML agora usa #FFB244 em ambos os temas
    switch (color) {
      case "orange":
        return `${baseClasses} ${interactionClasses} bg-[#FFB244] border-2 border-orange-400`
      case "blue":
        return `${baseClasses} ${interactionClasses} bg-gradient-to-br from-blue-900 to-blue-800 border-2 border-blue-700`
      case "yellow":
        return `${baseClasses} ${interactionClasses} bg-gradient-to-br from-yellow-900 to-yellow-800 border-2 border-yellow-700`
      default:
        return `${baseClasses} ${interactionClasses} bg-gray-800 border border-gray-700`
    }
  }

  const getTitleColor = () => {
    // AJUSTE: Texto escuro para card HTML (#FFB244) para melhor contraste
    if (color === "orange") {
      return isUnlocked ? "text-gray-900" : "text-gray-600"
    }
    return isUnlocked ? "text-[#F5F5F5]" : "text-gray-400"
  }

  const getDescriptionColor = () => {
    // AJUSTE: Texto escuro para card HTML (#FFB244) para melhor contraste
    if (color === "orange") {
      return isUnlocked ? "text-gray-800" : "text-gray-600"
    }
    return isUnlocked ? "text-gray-200" : "text-gray-500"
  }

  const getDefaultImage = () => {
    if (title.includes("HTML")) {
      return "src/assets/como-funciona-html-1-.jpg"
    } else if (title.includes("CSS")) {
      return "src/assets/aplicando-estilos-css-1521410533.png"
    } else if (title.includes("JavaScript")) {
      return "src/assets/photo-1687603917313-ccae1a289a9d.jpg"
    }
    return "/placeholder.svg?height=200&width=300&text=Code"
  }

  const getLevelIcon = (levelName) => {
    switch (levelName) {
      case "Iniciante":
        return <Star size={14} />
      case "Intermediário":
        return <Users size={14} />
      case "Avançado":
        return <Trophy size={14} />
      default:
        return <Star size={14} />
    }
  }

  const getChipClasses = (levelName) => {
    const baseClasses =
      "flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200"

    // CHIPS COM CONTROLE DE ESTADO: Diferentes estilos baseados no status da trilha (MANTIDO)
    const interactionClasses = isUnlocked ? "hover:scale-105" : "opacity-50 cursor-not-allowed"

    // AJUSTE: Chips do card HTML com cores adaptadas para fundo #FFB244
    if (color === "orange") {
      return `${baseClasses} ${interactionClasses} bg-white bg-opacity-90 text-orange-900 border border-orange-300 hover:bg-orange-50 hover:border-orange-400`
    }

    // Outros cards mantêm as cores originais
    switch (color) {
      case "blue":
        return `${baseClasses} ${interactionClasses} bg-blue-800 text-blue-200 border border-blue-600 hover:bg-blue-700`
      case "yellow":
        return `${baseClasses} ${interactionClasses} bg-yellow-800 text-yellow-200 border border-yellow-600 hover:bg-yellow-700`
      default:
        return `${baseClasses} ${interactionClasses} bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600`
    }
  }

  return (
    <div className={`w-full max-w-sm ${getCardColorClasses()}`} onClick={isUnlocked ? onClick : undefined}>
      {/* INDICADOR DE STATUS: Overlay para trilhas bloqueadas (MANTIDO) */}
      {!isUnlocked && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10 rounded-xl">
          <div className="text-center text-white">
            <Lock size={48} className="mx-auto mb-2 opacity-80" />
            <p className="text-sm font-medium">Bloqueado</p>
            {prerequisite && <p className="text-xs opacity-75">Complete {prerequisite} primeiro</p>}
          </div>
        </div>
      )}

      {/* BADGE DE CONCLUSÃO: Indicador visual para trilhas concluídas (MANTIDO) */}
      {isCompleted && (
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-green-600 text-white p-2 rounded-full shadow-lg">
            <CheckCircle size={24} />
          </div>
        </div>
      )}

      {/* Imagem com overlay colorido sutil baseado na cor do curso */}
      <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden relative">
        <img
          src={image || getDefaultImage()}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isUnlocked ? "hover:scale-110" : ""
          }`}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = getDefaultImage()
          }}
        />
        {/* Overlay sutil com a cor do curso */}
        <div
          className={`absolute inset-0 opacity-10 ${
            color === "orange"
              ? "bg-orange-500"
              : color === "blue"
                ? "bg-blue-500"
                : color === "yellow"
                  ? "bg-yellow-500"
                  : "bg-gray-500"
          }`}
        />
      </div>

      {/* Conteúdo com padding consistente */}
      <div className="p-6 relative">
        {/* Título com indicador de status e cores melhoradas */}
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-xl font-semibold transition-colors ${getTitleColor()}`}>{title}</h3>
          {isCompleted && <span className="text-green-400 text-sm font-medium">✅ Concluído</span>}
        </div>

        {/* Descrição com controle de estado e cores melhoradas */}
        <p className={`text-sm leading-relaxed mb-6 ${getDescriptionColor()}`}>{description}</p>

        {/* Mini botões horizontais (chips) representando os níveis (MANTIDOS) */}
        <div className="flex justify-between space-x-2">
          {levels.map((level, index) => (
            <button
              key={index}
              className={getChipClasses(level.name)}
              onClick={(e) => {
                e.stopPropagation()
                if (isUnlocked) {
                  console.log(`Acessando nível ${level.name} da trilha ${title}`)
                }
              }}
              disabled={!isUnlocked}
            >
              {getLevelIcon(level.name)}
              <span>{level.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CourseCard
