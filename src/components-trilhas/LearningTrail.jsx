"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle, Lock, Star, Play, Trophy } from "lucide-react"
import { useProgress } from "../hooks/useProgress"

export default function LearningTrail({ lessons, moduleId, moduleColor, moduleLevel }) {
  const navigate = useNavigate()
  const { getLessonState } = useProgress()
  const [animatedLessons, setAnimatedLessons] = useState(new Set())

  useEffect(() => {
    // Anima as lições uma por uma quando o componente carrega
    lessons.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedLessons((prev) => new Set([...prev, index]))
      }, index * 150)
    })
  }, [lessons])

  const handleLessonClick = (lesson, state, index) => {
    if (state === "locked") return
    navigate(`/modules/${moduleId}/lessons/${lesson.id}`)
  }

  const getTrailPosition = (index) => {
    const positions = [
      { x: 50, y: 10 }, // Posição 1
      { x: 20, y: 25 }, // Posição 2
      { x: 80, y: 40 }, // Posição 3
      { x: 30, y: 55 }, // Posição 4
      { x: 70, y: 70 }, // Posição 5
      { x: 40, y: 85 }, // Posição 6
      { x: 60, y: 100 }, // Posição 7
      { x: 25, y: 115 }, // Posição 8
      { x: 75, y: 130 }, // Posição 9
      { x: 50, y: 145 }, // Posição 10
      { x: 35, y: 160 }, // Posição 11
      { x: 65, y: 175 }, // Posição 12
    ]

    if (index < positions.length) {
      return positions[index]
    }

    // Para lições extras, continue o padrão
    const extraIndex = index - positions.length
    const baseY = 190
    return {
      x: extraIndex % 2 === 0 ? 30 : 70,
      y: baseY + Math.floor(extraIndex / 2) * 15,
    }
  }

  const getLessonCircleStyle = (lesson, state, index) => {
    const baseStyle =
      "w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-500 transform hover:scale-110 cursor-pointer relative"

    switch (state) {
      case "completed":
        return `${baseStyle} bg-gradient-to-br from-green-400 to-green-600 border-green-300 shadow-lg animate-pulse`
      case "current":
        return `${baseStyle} bg-gradient-to-br from-blue-400 to-blue-600 border-blue-300 shadow-xl animate-bounce`
      case "available":
        return `${baseStyle} bg-gradient-to-br from-orange-400 to-orange-600 border-orange-300 shadow-lg hover:shadow-xl`
      case "locked":
        return `${baseStyle} bg-gradient-to-br from-gray-300 to-gray-500 border-gray-400 opacity-60 cursor-not-allowed`
      default:
        return `${baseStyle} bg-gradient-to-br from-gray-400 to-gray-600 border-gray-300`
    }
  }

  const getLessonIcon = (lesson, state) => {
    if (state === "completed") {
      return <CheckCircle className="w-8 h-8 text-white" />
    }
    if (state === "current") {
      return <Play className="w-8 h-8 text-white" />
    }
    if (state === "locked") {
      return <Lock className="w-6 h-6 text-gray-600" />
    }
    if (lesson.isProject) {
      return <Trophy className="w-8 h-8 text-white" />
    }
    if (lesson.icon) {
      const Icon = lesson.icon
      return <Icon className="w-8 h-8 text-white" />
    }
    return <div className="w-6 h-6 bg-white rounded-full" />
  }

  const getPathColor = (fromIndex, toIndex) => {
    const fromState = getLessonState(lessons[fromIndex], fromIndex, moduleId)
    const toState = getLessonState(lessons[toIndex], toIndex, moduleId)

    if (fromState === "completed" && (toState === "completed" || toState === "current")) {
      return "#10B981" // Verde para caminhos completados
    }
    if (fromState === "completed" && toState === "available") {
      return "#F59E0B" // Laranja para próximo disponível
    }
    return "#D1D5DB" // Cinza para caminhos não disponíveis
  }

  const createPath = (from, to) => {
    const controlPoint1X = from.x + (to.x - from.x) * 0.3
    const controlPoint1Y = from.y + (to.y - from.y) * 0.1
    const controlPoint2X = from.x + (to.x - from.x) * 0.7
    const controlPoint2Y = from.y + (to.y - from.y) * 0.9

    return `M ${from.x} ${from.y} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${to.x} ${to.y}`
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl shadow-lg p-6 min-h-[600px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Trilha de Aprendizado</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>{lessons.filter((_, i) => getLessonState(lessons[i], i, moduleId) === "completed").length}</span>
          <span>/</span>
          <span>{lessons.length}</span>
          <span>lições</span>
        </div>
      </div>

      <div className="relative" style={{ height: `${Math.max(200, lessons.length * 20)}px` }}>
        {/* SVG para as linhas conectoras */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          {lessons.slice(0, -1).map((_, index) => {
            const fromPos = getTrailPosition(index)
            const toPos = getTrailPosition(index + 1)
            const pathColor = getPathColor(index, index + 1)

            return (
              <g key={`path-${index}`}>
                <path
                  d={createPath(fromPos, toPos)}
                  stroke={pathColor}
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  className="transition-all duration-500"
                  style={{
                    filter: pathColor === "#10B981" ? "drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))" : "none",
                  }}
                />
                {/* Animação de progresso */}
                {pathColor === "#10B981" && (
                  <circle r="3" fill="#FFFFFF" className="animate-pulse">
                    <animateMotion dur="3s" repeatCount="indefinite">
                      <path d={createPath(fromPos, toPos)} />
                    </animateMotion>
                  </circle>
                )}
              </g>
            )
          })}
        </svg>

        {/* Lições */}
        {lessons.map((lesson, index) => {
          const position = getTrailPosition(index)
          const state = getLessonState(lesson, index, moduleId)
          const isAnimated = animatedLessons.has(index)

          return (
            <div
              key={lesson.id}
              className={`absolute transition-all duration-700 ${
                isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                left: `${position.x}%`,
                top: `${position.y}px`,
                transform: "translateX(-50%)",
                zIndex: 2,
              }}
              onClick={() => handleLessonClick(lesson, state, index)}
            >
              {/* Círculo da lição */}
              <div className={getLessonCircleStyle(lesson, state, index)}>
                {getLessonIcon(lesson, state)}

                {/* Estrelas para lições completadas */}
                {state === "completed" && lesson.stars > 0 && (
                  <div className="absolute -top-2 -right-2 flex">
                    {[1, 2, 3].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${
                          lesson.stars >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Indicador de projeto */}
                {lesson.isProject && (
                  <div className="absolute -top-1 -left-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                    <Trophy className="w-2 h-2 text-white" />
                  </div>
                )}

                {/* Pulso para lição atual */}
                {state === "current" && (
                  <div className="absolute inset-0 rounded-full border-4 border-blue-400 animate-ping opacity-75"></div>
                )}
              </div>

              {/* Tooltip com informações da lição */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                <div className="bg-white rounded-lg shadow-xl p-3 text-center min-w-[160px] border">
                  <div className="text-sm font-semibold text-gray-800 mb-1">{lesson.title}</div>
                  <div className="text-xs text-gray-600 mb-2">{lesson.description}</div>
                  <div className="text-xs text-gray-500">{lesson.duration}</div>
                  {state === "locked" && <div className="text-xs text-red-500 mt-1">Complete a lição anterior</div>}
                  {state === "available" && (
                    <div className="text-xs text-green-600 mt-1 font-semibold">Clique para começar!</div>
                  )}
                  {state === "completed" && <div className="text-xs text-blue-600 mt-1 font-semibold">Concluído!</div>}
                </div>
              </div>

              {/* Número da lição */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-700 border-2 border-gray-200">
                  {index + 1}
                </div>
              </div>
            </div>
          )
        })}

        {/* Efeitos de partículas para lições completadas */}
        {lessons.map((lesson, index) => {
          const state = getLessonState(lesson, index, moduleId)
          const position = getTrailPosition(index)

          if (state === "completed") {
            return (
              <div
                key={`particles-${lesson.id}`}
                className="absolute pointer-events-none"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}px`,
                  transform: "translateX(-50%)",
                  zIndex: 0,
                }}
              >
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
                    style={{
                      left: `${Math.cos((i * 60 * Math.PI) / 180) * 40}px`,
                      top: `${Math.sin((i * 60 * Math.PI) / 180) * 40}px`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: "2s",
                    }}
                  />
                ))}
              </div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
