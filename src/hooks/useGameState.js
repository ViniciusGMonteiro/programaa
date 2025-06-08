"use client"

import { useState } from "react"

export function useGameState() {
  const [hearts, setHearts] = useState(5)
  const maxHearts = 5

  const loseHeart = () => {
    setHearts((prev) => Math.max(0, prev - 1))
  }

  const resetHearts = () => {
    setHearts(maxHearts)
  }

  return {
    hearts,
    maxHearts,
    loseHeart,
    resetHearts,
  }
}
