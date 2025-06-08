"use client"

import { useParams, useNavigate } from "react-router-dom"
import { Code } from "lucide-react"
import { modules } from "../data/modules"
import { useProgress } from "../hooks/useProgress"
import { useGameState } from "../hooks/useGameState"
import ModulesNavigation from "../components-trilhas/ModulesNavigation"
import LearningTrail from "../components-trilhas/LearningTrail"
import RewardChests from "../components-trilhas/RewardChests"
import HealthBar from "../components-trilhas/HealthBar"
import Badge from "../components-trilhas/ui/Badge"

export default function LessonsPage() {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  const { getProgressPercentage } = useProgress()
  const { hearts, maxHearts } = useGameState()

  const selectedModule = modules.find((m) => m.id === moduleId)

  if (!selectedModule) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Módulo não encontrado</h1>
          <button onClick={() => navigate("/modules")} className="text-blue-600 hover:text-blue-800">
            Voltar aos módulos
          </button>
        </div>
      </div>
    )
  }

  const getPageBackgroundGradient = (level) => {
    switch (level) {
      case "Iniciante":
        return { background: "linear-gradient(90deg, #FFB347 0%, #FF9500 100%)" }
      case "Intermediário":
        return { background: "linear-gradient(90deg, #FF6F1F 0%, #E55A00 100%)" }
      case "Avançado":
        return { background: "linear-gradient(90deg, #D44700 0%, #B83800 100%)" }
      default:
        return { background: "linear-gradient(to bottom right, #f8fafc, #e2e8f0)" }
    }
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

  return (
    <div className="min-h-screen" style={getPageBackgroundGradient(selectedModule.level)}>
      <ModulesNavigation selectedModule={selectedModule} />

      <div className="max-w-6xl mx-auto p-6">
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

        <div className="bg-slate-50 rounded-xl shadow-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Vidas</h3>
            <HealthBar hearts={hearts} maxHearts={maxHearts} showInTrail={true} />
          </div>
        </div>

        <RewardChests module={selectedModule} />

        <LearningTrail
          lessons={selectedModule.lessons}
          moduleColor={selectedModule.color}
          moduleLevel={selectedModule.level}
          moduleId={selectedModule.id}
        />
      </div>
    </div>
  )
}