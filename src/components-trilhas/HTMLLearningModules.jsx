"use client"

import { useState, Fragment, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Code, Trophy, ChevronRight, Play, Home, Star, FileText, Lock, CheckCircle } from "lucide-react"

const modules = [
  {
    id: "beginner",
    title: "HTML Iniciante",
    description: "Fundamentos básicos do HTML para começar sua jornada na programação web",
    level: "Iniciante",
    color: "bg-orange-400",
    totalLessons: 12,
    completedLessons: 0,
    lessons: [
      {
        id: "intro",
        title: "Introdução ao HTML",
        description: "O que é HTML, história e importância no desenvolvimento web",
        duration: "15 min",
        completed: false,
        current: true,
        icon: BookOpen,
        stars: 0,
        activities: [
          {
            id: 1,
            type: "multiple-choice",
            question: "O que significa a sigla HTML?",
            options: [
              "HyperText Markup Language",
              "High Tech Modern Language",
              "Home Tool Markup Language",
              "HyperText Modern Language",
            ],
            correct: 0,
            explanation: "HTML significa HyperText Markup Language, uma linguagem de marcação para criar páginas web.",
          },
        ],
      },
      {
        id: "structure",
        title: "Estrutura Básica",
        description: "DOCTYPE, html, head, body e elementos fundamentais",
        duration: "20 min",
        completed: false,
        icon: FileText,
        stars: 0,
        activities: [
          {
            id: 1,
            type: "multiple-choice",
            question: "Qual declaração deve aparecer no início de todo documento HTML5?",
            options: ["<!DOCTYPE html>", "<html>", "<head>", "<!DOCTYPE HTML5>"],
            correct: 0,
            explanation: "<!DOCTYPE html> declara que o documento usa HTML5 e deve ser a primeira linha.",
          },
        ],
      },
    ],
  },
  {
    id: "intermediate",
    title: "HTML Intermediário",
    description: "Aprofunde seus conhecimentos com elementos mais complexos e semântica",
    level: "Intermediário",
    color: "bg-orange-500",
    totalLessons: 15,
    completedLessons: 0,
    lessons: [
      {
        id: "semantic-html",
        title: "HTML Semântico",
        description: "Header, nav, main, section, article, aside, footer",
        duration: "35 min",
        completed: false,
        current: true,
        icon: Code,
        stars: 0,
        activities: [],
      },
    ],
  },
  {
    id: "advanced",
    title: "HTML Avançado",
    description: "Técnicas avançadas, Web Components e padrões modernos",
    level: "Avançado",
    color: "bg-red-600",
    totalLessons: 18,
    completedLessons: 0,
    lessons: [
      {
        id: "web-components",
        title: "Web Components",
        description: "Custom Elements, Shadow DOM, Templates",
        duration: "60 min",
        completed: false,
        current: true,
        icon: Code,
        stars: 0,
        activities: [],
      },
    ],
  },
]

export default function HTMLLearningModules({
  initialView = "home",
  initialModule = null,
  initialLesson = null,
  onViewChange = () => {},
}) {
  // Estados principais
  const [currentView, setCurrentView] = useState(initialView)
  const [selectedModule, setSelectedModule] = useState(initialModule)
  const [selectedLesson, setSelectedLesson] = useState(initialLesson)
  const [isLoading, setIsLoading] = useState(false)

  // Estados das atividades
  const [currentActivity, setCurrentActivity] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [hearts, setHearts] = useState(5)
  const [maxHearts] = useState(5)
  const [wrongAnswersToRetry, setWrongAnswersToRetry] = useState([])
  const [isRetryPhase, setIsRetryPhase] = useState(false)
  const [totalErrors, setTotalErrors] = useState(0)

  // Estado para controlar o progresso das lições
  const [moduleProgress, setModuleProgress] = useState(() => {
    const initialProgress = {}
    modules.forEach((module) => {
      initialProgress[module.id] = {
        completedLessons: new Set(),
        currentLessonIndex: 0,
        totalStars: 0,
      }
    })
    return initialProgress
  })

  // Sincronizar com props iniciais
  useEffect(() => {
    setCurrentView(initialView)
    setSelectedModule(initialModule)
    setSelectedLesson(initialLesson)
  }, [initialView, initialModule, initialLesson])

  // Notificar mudanças de view para o componente pai
  useEffect(() => {
    onViewChange(currentView, selectedModule, selectedLesson)
  }, [currentView, selectedModule, selectedLesson, onViewChange])

  // Debug: Log do estado atual
  useEffect(() => {
    console.log("Estado atual:", {
      currentView,
      selectedModule: selectedModule?.id,
      selectedLesson: selectedLesson?.id,
      isLoading,
    })
  }, [currentView, selectedModule, selectedLesson, isLoading])

  // Função para validar respostas de code-completion
  const validateCodeCompletion = (userAnswers, activity) => {
    if (!activity.blanks || !Array.isArray(userAnswers)) return false

    return activity.blanks.every((blank, index) => {
      const userAnswer = userAnswers[index]
      if (!userAnswer) return false

      const normalizedUserAnswer = userAnswer.trim().toLowerCase()
      return blank.correctAnswers.some((correctAnswer) => correctAnswer.toLowerCase() === normalizedUserAnswer)
    })
  }

  const getLevelColor = (level) => {
    switch (level) {
      case "Iniciante":
        return "bg-orange-100 text-orange-800"
      case "Intermediário":
        return "bg-orange-100 text-orange-800"
      case "Avançado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProgressPercentage = (module) => {
    const progress = moduleProgress[module.id]
    if (!progress) return 0
    return (progress.completedLessons.size / module.totalLessons) * 100
  }

  const getLessonState = (lesson, index, moduleId) => {
    const progress = moduleProgress[moduleId]
    if (!progress) return "locked"

    if (progress.completedLessons.has(lesson.id)) return "completed"
    if (index === progress.currentLessonIndex) return "current"
    if (index < progress.currentLessonIndex) return "available"

    return "locked"
  }

  const completeLesson = (stars) => {
    setModuleProgress((prev) => {
      const newProgress = { ...prev }
      const moduleId = selectedModule.id
      const currentProgress = { ...newProgress[moduleId] }

      currentProgress.completedLessons.add(selectedLesson.id)
      currentProgress.totalStars += stars

      const currentLessonIndex = selectedModule.lessons.findIndex((l) => l.id === selectedLesson.id)
      if (currentLessonIndex < selectedModule.lessons.length - 1) {
        currentProgress.currentLessonIndex = currentLessonIndex + 1
      }

      newProgress[moduleId] = currentProgress
      return newProgress
    })
  }

  // Handlers de navegação
  const handleStartLearning = () => {
    setIsLoading(true)
    setTimeout(() => {
      setCurrentView("modules")
      setIsLoading(false)
    }, 100)
  }

  const handleModuleSelect = (module) => {
    setIsLoading(true)
    setTimeout(() => {
      setSelectedModule(module)
      setCurrentView("lesson")
      setIsLoading(false)
    }, 100)
  }

  const handleBackToModules = () => {
    setSelectedModule(null)
    setCurrentView("modules")
  }

  const handleBackToHome = () => {
    setCurrentView("home")
    setSelectedModule(null)
    setSelectedLesson(null)
  }

  const handleLessonClick = (lesson, lessonIndex, moduleId) => {
    const state = getLessonState(lesson, lessonIndex, moduleId)

    if (state === "available" || state === "current" || state === "completed") {
      setSelectedLesson(lesson)
      setCurrentView("activity")
      setCurrentActivity(0)
      setUserAnswers({})
      setShowResults(false)
      setWrongAnswersToRetry([])
      setIsRetryPhase(false)
      setTotalErrors(0)
    }
  }

  const handleBackToLessons = () => {
    setSelectedLesson(null)
    setCurrentView("lesson")
  }

  // Componente da Barra de Vida
  const HealthBar = ({ hearts, maxHearts, showInTrail = false }) => {
    const renderHeart = (index, filled) => (
      <div key={index} className="relative">
        {filled ? (
          <div className="w-6 h-6 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-red-400 to-red-600 rounded-full transform rotate-45 shadow-lg"></div>
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-gradient-to-b from-red-400 to-red-600 rounded-full transform -translate-x-1/2 shadow-lg"></div>
            <div className="absolute top-0 right-0 w-3 h-3 bg-gradient-to-b from-red-400 to-red-600 rounded-full shadow-lg"></div>
            <div className="absolute top-1 left-1/2 w-1.5 h-1.5 bg-red-200 rounded-full transform -translate-x-1/2 opacity-70"></div>
          </div>
        ) : (
          <div className="w-6 h-6 relative opacity-40">
            <div className="absolute inset-0 border-2 border-gray-400 rounded-full transform rotate-45"></div>
            <div className="absolute top-0 left-1/2 w-3 h-3 border-2 border-gray-400 rounded-full transform -translate-x-1/2"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-2 border-gray-400 rounded-full"></div>
          </div>
        )}
      </div>
    )

    return (
      <div
        className={`flex items-center gap-2 ${showInTrail ? "bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border" : ""}`}
      >
        <div className="flex items-center gap-1">
          {Array.from({ length: maxHearts }, (_, index) => renderHeart(index, index < hearts))}
        </div>
        <span className={`text-sm font-semibold ${showInTrail ? "text-gray-700" : "text-gray-600"}`}>
          {hearts}/{maxHearts}
        </span>
      </div>
    )
  }

  // Componente dos Baús de Recompensas
  const RewardChests = ({ module }) => {
    const [openingChest, setOpeningChest] = useState(null)
    const [openedChests, setOpenedChests] = useState(new Set())

    const progress = moduleProgress[module.id]
    const totalStars = progress ? progress.totalStars : 0
    const maxStars = module.totalLessons * 3

    const chestMilestones = [
      { id: 1, starsRequired: Math.ceil(maxStars * 0.14), reward: "25 Gemas", type: "gems" },
      { id: 2, starsRequired: Math.ceil(maxStars * 0.28), reward: "50 Gemas", type: "gems" },
      { id: 3, starsRequired: Math.ceil(maxStars * 0.42), reward: "Boost de XP", type: "boost" },
      { id: 4, starsRequired: Math.ceil(maxStars * 0.56), reward: "75 Gemas", type: "gems" },
      { id: 5, starsRequired: Math.ceil(maxStars * 0.7), reward: "100 Gemas", type: "gems" },
      { id: 6, starsRequired: Math.ceil(maxStars * 0.84), reward: "Boost Duplo", type: "boost" },
      { id: 7, starsRequired: Math.ceil(maxStars * 0.98), reward: "Conquista Especial", type: "achievement" },
    ]

    const getChestState = (milestone) => {
      if (openedChests.has(milestone.id)) return "opened"
      if (totalStars >= milestone.starsRequired) return "available"
      return "locked"
    }

    const handleChestClick = (milestone) => {
      const state = getChestState(milestone)
      if (state === "available") {
        setOpeningChest(milestone.id)
        setTimeout(() => {
          setOpenedChests((prev) => new Set([...prev, milestone.id]))
          setOpeningChest(null)
        }, 1000)
      }
    }

    const getChestIcon = (milestone, state) => {
      const chestSize = "w-10 h-10"

      if (state === "opened") {
        return (
          <div className="relative">
            <div className={`${chestSize} relative`}>
              <div className="absolute inset-0 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 rounded-lg shadow-lg border-2 border-amber-500">
                <div className="absolute -top-1 left-0 right-0 h-4 bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 rounded-t-lg transform -rotate-12 origin-bottom shadow-md border border-amber-400"></div>
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-900 rounded-b-lg">
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full border border-yellow-600"></div>
                </div>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-md">
              <CheckCircle className="w-2 h-2 text-white" />
            </div>
          </div>
        )
      }

      if (state === "available") {
        return (
          <div
            className={`relative ${openingChest === milestone.id ? "animate-bounce" : "hover:scale-110"} transition-transform cursor-pointer`}
          >
            <div className={`${chestSize} relative`}>
              <div className="absolute inset-0 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 rounded-lg shadow-lg border-2 border-amber-500">
                <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 rounded-t-lg border border-amber-400">
                  <div className="absolute top-1 left-1 w-1 h-2 bg-amber-800 rounded-sm"></div>
                  <div className="absolute top-1 right-1 w-1 h-2 bg-amber-800 rounded-sm"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-900 rounded-b-lg">
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full border border-yellow-600 shadow-inner"></div>
                </div>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center animate-pulse border-2 border-white shadow-md">
              <Star className="w-2 h-2 text-white fill-white" />
            </div>
            {openingChest === milestone.id && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-2 py-1 shadow-lg border text-xs font-semibold text-gray-700 whitespace-nowrap">
                Abrindo...
              </div>
            )}
          </div>
        )
      }

      return (
        <div className="relative opacity-60">
          <div className={`${chestSize} relative`}>
            <div className="absolute inset-0 bg-gradient-to-b from-gray-500 via-gray-600 to-gray-700 rounded-lg shadow-lg border-2 border-gray-400">
              <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 rounded-t-lg border border-gray-300">
                <div className="absolute top-1 left-1 w-1 h-2 bg-gray-700 rounded-sm"></div>
                <div className="absolute top-1 right-1 w-1 h-2 bg-gray-700 rounded-sm"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800 rounded-b-lg">
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-400 rounded-full border border-gray-600"></div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Lock className="w-3 h-3 text-gray-600" />
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Progresso de Recompensas</h3>
          <div className="flex items-center gap-4">
            <div className="text-sm font-semibold text-gray-700">
              Progresso: {Math.round((totalStars / maxStars) * 100)}%
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span>
                {totalStars} de {maxStars} estrelas
              </span>
            </div>
          </div>
        </div>

        <div className="relative bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200">
          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden mx-4">
            <div
              className="h-full transition-all duration-500 ease-out rounded-full relative overflow-hidden"
              style={{
                width: `${Math.min((totalStars / maxStars) * 100, 100)}%`,
                background: "linear-gradient(90deg, #FCD34D 0%, #F59E0B 50%, #D97706 100%)",
                boxShadow: "inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>

            {chestMilestones.map((milestone) => {
              const position = (milestone.starsRequired / maxStars) * 100
              return (
                <div
                  key={milestone.id}
                  className="absolute top-0 h-full w-0.5 bg-blue-300 opacity-50"
                  style={{ left: `${Math.min(position, 100)}%` }}
                />
              )
            })}
          </div>

          <div className="relative -mt-3 mx-4">
            {chestMilestones.map((milestone) => {
              const state = getChestState(milestone)
              const position = (milestone.starsRequired / maxStars) * 100

              return (
                <div
                  key={milestone.id}
                  className="absolute transform -translate-x-1/2"
                  style={{ left: `${Math.min(position, 100)}%`, top: "-20px" }}
                >
                  <div onClick={() => handleChestClick(milestone)} className="mb-2">
                    {getChestIcon(milestone, state)}
                  </div>

                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
                    <div className="text-xs font-semibold text-gray-700 text-center bg-white rounded px-1 py-0.5 shadow-sm border">
                      {milestone.starsRequired}⭐
                    </div>
                  </div>

                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-8 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    <div className="bg-white rounded-lg shadow-xl p-3 text-center min-w-[120px] border">
                      <div className="text-xs font-semibold text-gray-700 mb-1">{milestone.reward}</div>
                      {state === "locked" && (
                        <div className="text-xs text-red-500">
                          {milestone.starsRequired - totalStars} estrelas restantes
                        </div>
                      )}
                      {state === "available" && (
                        <div className="text-xs text-green-600 font-semibold">Clique para abrir!</div>
                      )}
                      {state === "opened" && <div className="text-xs text-blue-600 font-semibold">Coletado!</div>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8 mx-4">
            <div className="text-xs text-gray-600 flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span>{totalStars} estrelas coletadas</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Componente da trilha de aprendizado - CORRIGIDO
  const LearningTrail = ({ lessons, moduleColor, moduleLevel }) => {
    // Verificação de segurança
    if (!lessons || !Array.isArray(lessons) || lessons.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-600">Nenhuma lição disponível para este módulo.</p>
        </div>
      )
    }

    const getTrailPosition = (index) => {
      const row = Math.floor(index / 3)
      const col = index % 3
      const isEvenRow = row % 2 === 0

      const positions = [8, 50, 92]

      return {
        x: `${isEvenRow ? positions[col] : positions[2 - col]}%`,
        y: row * 180 + 100,
      }
    }

    const renderStars = (count) => {
      return Array.from({ length: 3 }, (_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < count ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
      ))
    }

    const getLessonButtonStyle = (state, moduleLevel) => {
      const baseClasses =
        "w-24 h-24 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border-4 relative overflow-hidden"

      const threeDEffects =
        "shadow-[0_8px_16px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2)] hover:translate-y-1 active:translate-y-2 hover:shadow-[0_6px_12px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.3)]"

      switch (state) {
        case "completed":
          switch (moduleLevel) {
            case "Iniciante":
              return `${baseClasses} ${threeDEffects} text-white border-yellow-600`
            case "Intermediário":
              return `${baseClasses} ${threeDEffects} text-white border-orange-700`
            case "Avançado":
              return `${baseClasses} ${threeDEffects} text-white border-red-800`
          }
          break
        case "current":
          switch (moduleLevel) {
            case "Iniciante":
              return `${baseClasses} ${threeDEffects} text-white border-yellow-600 ring-4 ring-yellow-300 ring-opacity-50`
            case "Intermediário":
              return `${baseClasses} ${threeDEffects} text-white border-orange-700 ring-4 ring-orange-300 ring-opacity-50`
            case "Avançado":
              return `${baseClasses} ${threeDEffects} text-white border-red-800 ring-4 ring-red-300 ring-opacity-50`
          }
          break
        case "available":
          return `${baseClasses} ${threeDEffects} bg-white border-gray-400 text-gray-600 hover:bg-gray-50 hover:border-gray-500`
        case "locked":
        default:
          return `${baseClasses} bg-gray-200 border-gray-400 text-gray-400 cursor-not-allowed shadow-[0_4px_8px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.1)]`
      }
    }

    const getLessonButtonBackground = (state, moduleLevel) => {
      if (state === "completed" || state === "current") {
        switch (moduleLevel) {
          case "Iniciante":
            return {
              background: "linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)",
              borderColor: "#B8860B",
            }
          case "Intermediário":
            return {
              background: "linear-gradient(135deg, #FF8C42 0%, #FF6B35 50%, #CC5500 100%)",
              borderColor: "#8B4513",
            }
          case "Avançado":
            return {
              background: "linear-gradient(135deg, #FF6B47 0%, #E55039 50%, #AA3300 100%)",
              borderColor: "#8B0000",
            }
        }
      }
      return {}
    }

    const renderLessonIcon = (lesson, state) => {
      if (state === "completed") {
        return <CheckCircle className="w-10 h-10" />
      }
      if (state === "current") {
        return <Play className="w-10 h-10" />
      }
      if (state === "locked") {
        return <Lock className="w-8 h-8" />
      }

      const IconComponent = lesson.icon || BookOpen
      return <IconComponent className="w-8 h-8" />
    }

    const getPixelPosition = (percentageX, y) => {
      const containerWidth = 1000
      const x = (Number.parseFloat(percentageX) / 100) * containerWidth
      return { x, y }
    }

    return (
      <div className="relative w-full min-h-[1200px] p-4 overflow-hidden">
        {/* SVG para as linhas de conexão */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          {lessons.map((lesson, index) => {
            if (index === lessons.length - 1) return null

            const currentPos = getTrailPosition(index)
            const nextPos = getTrailPosition(index + 1)

            const current = getPixelPosition(currentPos.x, currentPos.y)
            const next = getPixelPosition(nextPos.x, nextPos.y)

            return (
              <path
                key={`path-${index}`}
                d={`M ${current.x} ${current.y} Q ${(current.x + next.x) / 2} ${current.y + (next.y - current.y) / 2 + 30} ${next.x} ${next.y}`}
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
                opacity="0.6"
                strokeDasharray="10,5"
              />
            )
          })}
        </svg>

        {/* Container das lições */}
        <div className="relative" style={{ zIndex: 2 }}>
          {lessons.map((lesson, index) => {
            const position = getTrailPosition(index)
            const state = getLessonState(lesson, index, selectedModule?.id)
            const progress = moduleProgress[selectedModule?.id]
            const lessonStars =
              progress && progress.completedLessons.has(lesson.id)
                ? lesson.stars || Math.min(3, Math.max(1, 3 - Math.floor(totalErrors / 2)))
                : 0

            return (
              <div
                key={lesson.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: position.x,
                  top: `${position.y}px`,
                }}
              >
                {/* Estrelas para lições completadas */}
                {state === "completed" && lessonStars > 0 && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex gap-1">
                    {renderStars(lessonStars)}
                  </div>
                )}

                {/* Indicador de lição atual */}
                {state === "current" && (
                  <div
                    className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-slate-50 rounded-lg px-3 py-1 shadow-lg border animate-float"
                    style={{
                      animation: "float 2s ease-in-out infinite",
                    }}
                  >
                    <span className="text-xs font-semibold text-gray-700">COMEÇAR</span>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-50"></div>
                  </div>
                )}

                {/* Botão da lição */}
                <div
                  className={getLessonButtonStyle(state, moduleLevel)}
                  style={getLessonButtonBackground(state, moduleLevel)}
                  onClick={() => handleLessonClick(lesson, index, selectedModule?.id)}
                >
                  {(state === "completed" || state === "current") && (
                    <div className="absolute inset-1 rounded-full bg-gradient-to-t from-transparent via-white/20 to-white/40 pointer-events-none" />
                  )}
                  {renderLessonIcon(lesson, state)}
                </div>

                {/* Número da lição */}
                <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-slate-50 rounded-full border-2 border-gray-200 flex items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-gray-600">{index + 1}</span>
                </div>

                {/* Indicador de projeto */}
                {lesson.isProject && (
                  <div className="absolute -top-3 -left-3 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Trophy className="w-3 h-3 text-white" />
                  </div>
                )}

                {/* Tooltip da lição */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                  <div className="bg-slate-50 rounded-lg shadow-xl p-4 text-center min-w-[220px] border">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{lesson.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">{lesson.description}</p>
                    <div className="flex items-center justify-center gap-2">
                      <Play className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-500">{lesson.duration}</span>
                    </div>
                    {state === "locked" && <div className="mt-2 text-xs text-red-500">Complete a lição anterior</div>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CSS para animação */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) translateX(-50%); 
            }
            50% { 
              transform: translateY(-8px) translateX(-50%); 
            }
          }
          .animate-float {
            animation: float 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    )
  }

  // Navegação superior
  const ModulesNavigation = () => (
    <nav className="bg-slate-50 shadow-sm border-b sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-center w-full">
          <Button variant="ghost" onClick={handleBackToHome} className="flex items-center gap-2 text-base mr-6">
            <Home className="w-5 h-5" />
            Início
          </Button>

          <div className="flex-1 flex items-center">
            {modules.map((module, index) => (
              <Fragment key={module.id}>
                <Button
                  variant={selectedModule?.id === module.id ? "default" : "outline"}
                  size="lg"
                  onClick={() => handleModuleSelect(module)}
                  className={`flex items-center justify-center gap-3 px-6 py-3 text-base font-medium flex-1 rounded-lg ${
                    module.level === "Iniciante"
                      ? selectedModule?.id === module.id
                        ? "text-white border-orange-400"
                        : "border-orange-300 text-orange-700 hover:bg-orange-50"
                      : module.level === "Intermediário"
                        ? selectedModule?.id === module.id
                          ? "text-white border-orange-500"
                          : "border-orange-400 text-orange-700 hover:bg-orange-50"
                        : selectedModule?.id === module.id
                          ? "text-white border-red-600"
                          : "border-red-400 text-red-700 hover:bg-red-50"
                  }`}
                  style={
                    selectedModule?.id === module.id
                      ? module.level === "Iniciante"
                        ? { background: "#FFB347" }
                        : module.level === "Intermediário"
                          ? { background: "#FF6F1F" }
                          : { background: "#D44700" }
                      : {}
                  }
                >
                  {module.level === "Iniciante" && <BookOpen className="w-5 h-5" />}
                  {module.level === "Intermediário" && <Code className="w-5 h-5" />}
                  {module.level === "Avançado" && <Trophy className="w-5 h-5" />}
                  {module.level}
                </Button>
                {index < modules.length - 1 && (
                  <div className="flex items-center justify-center px-3">
                    <span className="text-gray-400 text-lg font-light">/</span>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  // Página inicial
  if (currentView === "home") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Aprenda HTML do Básico ao Avançado</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Domine a linguagem de marcação fundamental da web através de três módulos progressivos, desde os conceitos
              básicos até técnicas avançadas de desenvolvimento.
            </p>
            <Button onClick={handleStartLearning} size="lg" className="text-lg px-8 py-3">
              Começar a Aprender HTML
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <div className="mt-16 bg-slate-50 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Por que aprender HTML?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Fundação Sólida</h3>
                <p className="text-gray-600 text-sm">
                  HTML é a base de toda página web. Dominar seus conceitos é essencial para qualquer desenvolvedor.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Carreira Promissora</h3>
                <p className="text-gray-600 text-sm">
                  Conhecimento em HTML abre portas para desenvolvimento web, mobile e diversas oportunidades.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Projetos Reais</h3>
                <p className="text-gray-600 text-sm">
                  Cada módulo inclui projetos práticos para aplicar o conhecimento em situações reais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Vista dos módulos
  if (currentView === "modules") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <ModulesNavigation />

        <div className="max-w-6xl mx-auto p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Escolha seu Nível</h1>
            <p className="text-lg text-gray-600">Selecione o módulo adequado ao seu conhecimento atual em HTML</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {modules.map((module) => (
              <Card
                key={module.id}
                className="bg-slate-50 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                onClick={() => handleModuleSelect(module)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{
                        background:
                          module.level === "Iniciante"
                            ? "#FFB347"
                            : module.level === "Intermediário"
                              ? "#FF6F1F"
                              : "#D44700",
                      }}
                    >
                      {module.level === "Iniciante" && <BookOpen className="w-6 h-6 text-white" />}
                      {module.level === "Intermediário" && <Code className="w-6 h-6 text-white" />}
                      {module.level === "Avançado" && <Trophy className="w-6 h-6 text-white" />}
                    </div>
                    <Badge className={getLevelColor(module.level)}>{module.level}</Badge>
                  </div>
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                  <CardDescription className="text-sm">{module.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progresso</span>
                        <span>
                          {module.completedLessons}/{module.totalLessons} aulas
                        </span>
                      </div>
                      <Progress value={getProgressPercentage(module)} className="h-2" />
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-gray-500">{module.totalLessons} aulas</span>
                      <Button variant="outline" size="sm">
                        {module.completedLessons > 0 ? "Continuar" : "Começar"}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Vista das aulas com trilha de aprendizado - CORRIGIDA
  if (currentView === "lesson" && selectedModule) {
    const getPageBackgroundGradient = (level) => {
      switch (level) {
        case "Iniciante":
          return {
            background: "linear-gradient(90deg, #FFB347 0%, #FF9500 100%)",
          }
        case "Intermediário":
          return {
            background: "linear-gradient(90deg, #FF6F1F 0%, #E55A00 100%)",
          }
        case "Avançado":
          return {
            background: "linear-gradient(90deg, #D44700 0%, #B83800 100%)",
          }
        default:
          return {
            background: "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
          }
      }
    }

    return (
      <div className="min-h-screen" style={getPageBackgroundGradient(selectedModule.level)}>
        <ModulesNavigation />

        <div className="max-w-6xl mx-auto p-6">
          {/* Cabeçalho do módulo */}
          <div className="bg-slate-50 rounded-xl shadow-lg p-4 mb-4">
            <div className="flex items-center gap-4 mb-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background:
                    selectedModule.level === "Iniciante"
                      ? "#FFB347"
                      : selectedModule.level === "Intermediário"
                        ? "#FF6F1F"
                        : "#D44700",
                }}
              >
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{selectedModule.title}</h1>
                <p className="text-gray-600 mt-2">{selectedModule.description}</p>
                <Badge className={`mt-2 ${getLevelColor(selectedModule.level)}`}>{selectedModule.level}</Badge>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progresso do Módulo</span>
                <span>
                  {selectedModule.completedLessons}/{selectedModule.totalLessons} aulas
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${getProgressPercentage(selectedModule)}%`,
                    background:
                      selectedModule.level === "Iniciante"
                        ? "linear-gradient(90deg, #FFB347 0%, #FF9500 100%)"
                        : selectedModule.level === "Intermediário"
                          ? "linear-gradient(90deg, #FF6F1F 0%, #E55A00 100%)"
                          : "linear-gradient(90deg, #D44700 0%, #B83800 100%)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Barra de vidas */}
          <div className="bg-slate-50 rounded-xl shadow-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Vidas</h3>
              <HealthBar hearts={hearts} maxHearts={maxHearts} showInTrail={true} />
            </div>
          </div>

          {/* Progresso de recompensas */}
          <RewardChests module={selectedModule} />

          {/* Trilha de aprendizado - GARANTINDO QUE SEJA RENDERIZADA */}
          <div className="bg-slate-50 rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trilha de Aprendizado</h3>
            <LearningTrail
              lessons={selectedModule.lessons}
              moduleColor={selectedModule.color}
              moduleLevel={selectedModule.level}
            />
          </div>
        </div>
      </div>
    )
  }

  // Vista das atividades
  if (currentView === "activity" && selectedLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={handleBackToLessons}>
                <Home className="w-5 h-5 mr-2" />
                {selectedModule?.title}
              </Button>
              <span className="text-gray-400">/</span>
              <span className="font-medium">{selectedLesson.title}</span>
            </div>
          </div>
        </nav>
        <div className="max-w-4xl mx-auto p-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">{selectedLesson.title}</h2>
              <p className="text-gray-600 mb-4">{selectedLesson.description}</p>
              <p className="text-sm text-gray-500">Duração: {selectedLesson.duration}</p>

              {selectedLesson.activities && selectedLesson.activities.length > 0 ? (
                <div className="mt-6">
                  <p className="text-green-600">
                    ✅ Esta lição tem {selectedLesson.activities.length} atividades disponíveis!
                  </p>
                </div>
              ) : (
                <div className="mt-6">
                  <p className="text-orange-600">⚠️ Esta lição ainda não possui atividades.</p>
                </div>
              )}

              <div className="mt-6 flex gap-4">
                <Button onClick={handleBackToLessons} variant="outline">
                  Voltar às Lições
                </Button>
                <Button disabled={!selectedLesson.activities || selectedLesson.activities.length === 0}>
                  Iniciar Atividades
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Fallback
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Estado não reconhecido</h2>
        <p className="text-gray-600 mb-4">currentView: {currentView}</p>
        <Button onClick={handleBackToHome}>Voltar ao Início</Button>
      </div>
    </div>
  )
}
