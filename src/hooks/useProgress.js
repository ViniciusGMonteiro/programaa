"use client"

import { useState } from "react"

export function useProgress() {
  const [moduleProgress, setModuleProgress] = useState(() => {
    const initialProgress = {}
    // This would normally come from your modules data
    const moduleIds = ["beginner", "intermediate", "advanced"]
    moduleIds.forEach((moduleId) => {
      initialProgress[moduleId] = {
        completedLessons: new Set(),
        currentLessonIndex: 0,
        totalStars: 0,
      }
    })
    return initialProgress
  })

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

  const completeLesson = (moduleId, lessonId, stars) => {
    setModuleProgress((prev) => {
      const newProgress = { ...prev }
      const currentProgress = { ...newProgress[moduleId] }

      // Mark lesson as completed
      currentProgress.completedLessons.add(lessonId)
      currentProgress.totalStars += stars

      // Advance to next lesson if not the last one
      // This would need to be updated based on your actual module structure
      const currentLessonIndex = currentProgress.currentLessonIndex
      currentProgress.currentLessonIndex = currentLessonIndex + 1

      newProgress[moduleId] = currentProgress
      return newProgress
    })
  }

  return {
    moduleProgress,
    getProgressPercentage,
    getLessonState,
    completeLesson,
  }
}
