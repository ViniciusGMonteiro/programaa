"use client"

import { useState } from "react"
import { Star, CheckCircle, Lock } from "lucide-react"
import { useProgress } from "../hooks/useProgress"

export default function RewardChests({ module }) {
  const [openingChest, setOpeningChest] = useState(null)
  const [openedChests, setOpenedChests] = useState(new Set())
  const { moduleProgress } = useProgress()

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
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-md">
              <CheckCircle className="w-2 h-2 text-white" />
            </div>
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
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center animate-pulse border-2 border-white shadow-md">
              <Star className="w-2 h-2 text-white fill-white" />
            </div>
            {openingChest === milestone.id && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-2 py-1 shadow-lg border text-xs font-semibold text-gray-700 whitespace-nowrap">
                Abrindo...
              </div>
            )}
          </div>
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