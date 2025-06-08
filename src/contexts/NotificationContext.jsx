"use client"

import { createContext, useContext, useState, useRef, useEffect } from "react"

const NotificationContext = createContext()

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const timeoutRef = useRef(null)

  // Processar a fila de notificações
  useEffect(() => {
    const processQueue = () => {
      if (notifications.length === 0) {
        setIsProcessing(false)
        return
      }

      setIsProcessing(true)

      // Remover qualquer notificação existente no DOM
      const existingNotifications = document.querySelectorAll(".notification")
      existingNotifications.forEach((notification) => {
        notification.classList.remove("show")
        setTimeout(() => notification.remove(), 300)
      })

      // Esperar um pouco para garantir que a notificação anterior foi removida
      setTimeout(() => {
        // Pegar a próxima mensagem da fila
        const message = notifications[0]

        // Cria e exibe a notificação
        const notification = document.createElement("div")
        notification.classList.add("notification")
        notification.textContent = message
        document.body.appendChild(notification)

        // Pequeno atraso para garantir que a animação funcione
        setTimeout(() => notification.classList.add("show"), 10)

        // Remove a notificação após 1.5 segundos
        timeoutRef.current = setTimeout(() => {
          notification.classList.remove("show")

          // Após a animação de saída, remove o elemento e processa a próxima notificação
          setTimeout(() => {
            notification.remove()
            setNotifications((prev) => prev.slice(1))
          }, 300)
        }, 1500)
      }, 300)
    }

    if (notifications.length > 0 && !isProcessing) {
      processQueue()
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [notifications, isProcessing])

  // Função para adicionar uma notificação à fila
  const showNotification = (message) => {
    setNotifications((prev) => [...prev, message])
  }

  return <NotificationContext.Provider value={{ showNotification }}>{children}</NotificationContext.Provider>
}

export function useNotification() {
  return useContext(NotificationContext)
}
"use client"