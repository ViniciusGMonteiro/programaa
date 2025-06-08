"use client"

import { Fragment } from "react"
import { useNavigate } from "react-router-dom"
import { Home, BookOpen, Code, Trophy } from "lucide-react"
import { modules } from "../data/modules"
import Button from "./ui/Button"

export default function ModulesNavigation({ selectedModule }) {
  const navigate = useNavigate()

  const handleBackToHome = () => {
    navigate("/")
  }

  const handleModuleSelect = (module) => {
    navigate(`/modules/${module.id}/lessons`)
  }

  return (
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
}
