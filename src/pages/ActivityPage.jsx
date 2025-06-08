"use client"

import { useParams, useNavigate } from "react-router-dom"
import { Home } from "lucide-react"
import { modules } from "../data/modules"
import ActivityView from "../components-trilhas/ActivityView"
import Button from "../components-trilhas/ui/Button"

export default function ActivityPage() {
  const { moduleId, lessonId } = useParams()
  const navigate = useNavigate()

  const selectedModule = modules.find((m) => m.id === moduleId)
  const selectedLesson = selectedModule?.lessons.find((l) => l.id === lessonId)

  if (!selectedModule || !selectedLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Lição não encontrada</h1>
          <button onClick={() => navigate("/modules")} className="text-blue-600 hover:text-blue-800">
            Voltar aos módulos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate(`/modules/${moduleId}/lessons`)}>
              <Home className="w-5 h-5 mr-2" />
              {selectedModule.title}
            </Button>
            <span className="text-gray-400">/</span>
            <span className="font-medium">{selectedLesson.title}</span>
          </div>
        </div>
      </nav>
      <ActivityView lesson={selectedLesson} moduleId={moduleId} />
    </div>
  )
}