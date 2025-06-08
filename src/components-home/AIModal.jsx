"use client"

import { useState } from "react"
import { X, Send, Brain, Copy, Check } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"

const AIModal = ({ isOpen, onClose, onSendMessage, isLoading, response, error }) => {
  const [message, setMessage] = useState("")
  const [copied, setCopied] = useState(false)
  const { isDarkTheme } = useTheme()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const copyToClipboard = async () => {
    if (response) {
      try {
        await navigator.clipboard.writeText(response)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Erro ao copiar:", err)
      }
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={`w-full max-w-4xl max-h-[90vh] rounded-lg shadow-2xl transform transition-all duration-300 ${
            isDarkTheme ? "bg-gray-900 border border-gray-700" : "bg-white border border-gray-200"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between p-6 border-b ${
              isDarkTheme ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-500">
                <Brain size={24} className="text-white" />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${isDarkTheme ? "text-white" : "text-gray-900"}`}>
                  Assistente de Programação IA
                </h2>
                <p className={`text-sm ${isDarkTheme ? "text-gray-400" : "text-gray-500"}`}>
                  Tire suas dúvidas sobre programação
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                isDarkTheme
                  ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                  : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
              }`}
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col h-[60vh]">
            {/* Response Area */}
            <div className="flex-1 p-6 overflow-y-auto">
              {!response && !isLoading && !error && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className={`p-4 rounded-full mb-4 ${isDarkTheme ? "bg-blue-900" : "bg-blue-100"}`}>
                    <Brain size={48} className="text-blue-500" />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${isDarkTheme ? "text-white" : "text-gray-900"}`}>
                    Como posso ajudar você hoje?
                  </h3>
                  <p className={`text-sm max-w-md ${isDarkTheme ? "text-gray-400" : "text-gray-500"}`}>
                    Faça perguntas sobre HTML, CSS, JavaScript ou qualquer tópico de programação.
                  </p>
                  <div className="mt-4 text-xs text-green-500 font-medium">✅ API do Gemini configurada e pronta!</div>
                </div>
              )}

              {isLoading && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
                    <p className={`text-sm ${isDarkTheme ? "text-gray-400" : "text-gray-500"}`}>
                      Processando sua pergunta...
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-center justify-center h-full">
                  <div
                    className={`text-center p-6 rounded-lg border ${
                      isDarkTheme ? "bg-red-900/20 border-red-800" : "bg-red-50 border-red-200"
                    }`}
                  >
                    <p className={`font-medium mb-2 ${isDarkTheme ? "text-red-400" : "text-red-600"}`}>
                      Ops! Algo deu errado
                    </p>
                    <p className={`text-sm ${isDarkTheme ? "text-red-300" : "text-red-500"}`}>{error}</p>
                  </div>
                </div>
              )}

              {response && !isLoading && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-semibold ${isDarkTheme ? "text-white" : "text-gray-900"}`}>Resposta da IA:</h4>
                    <button
                      onClick={copyToClipboard}
                      className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm transition-colors ${
                        isDarkTheme
                          ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                          : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      <span>{copied ? "Copiado!" : "Copiar"}</span>
                    </button>
                  </div>
                  <div
                    className={`p-4 rounded-lg border ${
                      isDarkTheme
                        ? "bg-gray-800 border-gray-700 text-gray-200"
                        : "bg-gray-50 border-gray-200 text-gray-800"
                    }`}
                  >
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{response}</pre>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className={`p-6 border-t ${isDarkTheme ? "border-gray-700" : "border-gray-200"}`}>
              <form onSubmit={handleSubmit} className="flex space-x-3">
                <div className="flex-1">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite sua pergunta sobre programação..."
                    className={`w-full px-4 py-3 rounded-lg border resize-none transition-colors ${
                      isDarkTheme
                        ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                    rows="3"
                    disabled={isLoading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!message.trim() || isLoading}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    !message.trim() || isLoading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white hover:scale-105 active:scale-95"
                  }`}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </form>
              <p className={`text-xs mt-2 ${isDarkTheme ? "text-gray-500" : "text-gray-400"}`}>
                Pressione Enter para enviar ou Shift+Enter para nova linha
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AIModal
