"use client"

import { useState } from "react"
import { sendMessageToGemini } from "./geminiService"

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState("")
  const [error, setError] = useState("")

  // Função de notificação simples
  const showNotification = (message, type = "success") => {
    console.log(`${type.toUpperCase()}: ${message}`)

    // Criar notificação visual simples
    const notification = document.createElement("div")
    notification.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white font-medium z-50 transform transition-all duration-300 ${
      type === "error" ? "bg-red-500" : "bg-green-500"
    }`
    notification.textContent = message

    document.body.appendChild(notification)

    // Remover após 3 segundos
    setTimeout(() => {
      notification.remove()
    }, 3000)
  }

  const sendMessage = async (message) => {
    if (!message.trim()) return

    setIsLoading(true)
    setError("")
    setResponse("")

    try {
      const aiResponse = await sendMessageToGemini(message)
      setResponse(aiResponse)
      showNotification("Resposta gerada com sucesso!")
    } catch (err) {
      const errorMessage = err.message || "Erro ao processar sua solicitação"
      setError(errorMessage)
      showNotification("Erro ao comunicar com a IA", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const clearResponse = () => {
    setResponse("")
    setError("")
  }

  return {
    isLoading,
    response,
    error,
    sendMessage,
    clearResponse,
  }
}
