"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle, Star } from "lucide-react"
import { useGameState } from "../hooks/useGameState"
import { useProgress } from "../hooks/useProgress"
import Card from "./ui/Card"
import Button from "./ui/Button"
import Badge from "./ui/Badge"
import Progress from "./ui/Progress"
import HealthBar from "./HealthBar"

export default function ActivityView({ lesson, moduleId }) {
  const navigate = useNavigate()
  const { hearts, maxHearts, loseHeart, resetHearts } = useGameState()
  const { completeLesson } = useProgress()

  const [currentActivity, setCurrentActivity] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [wrongAnswersToRetry, setWrongAnswersToRetry] = useState([])
  const [isRetryPhase, setIsRetryPhase] = useState(false)
  const [totalErrors, setTotalErrors] = useState(0)

  const activities = lesson.activities || []
  const currentActivities = isRetryPhase ? wrongAnswersToRetry : activities
  const activity = currentActivities[currentActivity]

  const handleBackToLessons = () => {
    navigate(`/modules/${moduleId}/lessons`)
  }

  const validateCodeCompletion = (userAnswers, activity) => {
    if (!activity.blanks || !Array.isArray(userAnswers)) return false

    return activity.blanks.every((blank, index) => {
      const userAnswer = userAnswers[index]
      if (!userAnswer) return false

      const normalizedUserAnswer = userAnswer.trim().toLowerCase()
      return blank.correctAnswers.some((correctAnswer) => correctAnswer.toLowerCase() === normalizedUserAnswer)
    })
  }

  const handleAnswer = (answer) => {
    setUserAnswers((prev) => {
      const newAnswers = {
        ...prev,
        [activity.id]: answer,
      }

      let isWrong = false
      if (activity.type === "multiple-choice" && answer !== activity.correct) {
        isWrong = true
      } else if (activity.type === "true-false" && answer !== activity.correct) {
        isWrong = true
      } else if (activity.type === "code-completion") {
        if (!validateCodeCompletion(answer, activity)) {
          isWrong = true
        }
      }

      if (isWrong) {
        loseHeart()
        setTotalErrors((prev) => prev + 1)

        const activityToAdd = { ...activity, originalIndex: currentActivity }
        setWrongAnswersToRetry((prev) => {
          const exists = prev.find((q) => q.id === activity.id && q.question === activity.question)
          if (!exists) {
            return [...prev, activityToAdd]
          }
          return prev
        })
      }

      return newAnswers
    })
  }

  const calculateScore = () => {
    let correct = 0
    const totalQuestions = activities.length

    activities.forEach((act) => {
      const userAnswer = userAnswers[act.id]
      if (act.type === "multiple-choice" && userAnswer === act.correct) correct++
      if (act.type === "true-false" && userAnswer === act.correct) correct++
      if (act.type === "code-completion" && validateCodeCompletion(userAnswer, act)) correct++
    })

    return { correct, totalQuestions }
  }

  const getStars = () => {
    const { totalQuestions } = calculateScore()

    if (totalErrors <= 1) return 3
    if (totalErrors <= Math.floor(totalQuestions / 2)) return 2
    if (totalErrors <= Math.floor((totalQuestions * 2) / 3)) return 1
    return 0
  }

  const handleNext = () => {
    if (currentActivity < currentActivities.length - 1) {
      setCurrentActivity((prev) => prev + 1)
    } else if (!isRetryPhase && wrongAnswersToRetry.length > 0) {
      setIsRetryPhase(true)
      setCurrentActivity(0)
      setUserAnswers({})
    } else if (isRetryPhase) {
      const stillWrongAnswers = wrongAnswersToRetry.filter((q) => {
        const userAnswer = userAnswers[q.id]
        if (q.type === "multiple-choice") {
          return userAnswer !== q.correct
        } else if (q.type === "true-false") {
          return userAnswer !== q.correct
        } else if (q.type === "code-completion") {
          return !validateCodeCompletion(userAnswer, q)
        }
        return false
      })

      if (stillWrongAnswers.length > 0) {
        setWrongAnswersToRetry(stillWrongAnswers)
        setCurrentActivity(0)
        setUserAnswers({})
      } else {
        const stars = getStars()
        completeLesson(moduleId, lesson.id, stars)
        setShowResults(true)
      }
    } else {
      const stars = getStars()
      completeLesson(moduleId, lesson.id, stars)
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentActivity > 0) {
      setCurrentActivity((prev) => prev - 1)
    }
  }

  if (hearts <= 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-white shadow-xl border-red-200">
          <div className="p-6 text-center">
            <h2 className="text-2xl mb-4 text-red-600 font-bold">Game Over!</h2>
            <div className="text-6xl mb-4">💔</div>
            <p className="text-lg text-gray-600 mb-4">
              Você perdeu todas as suas vidas! Não se preocupe, você pode tentar novamente.
            </p>
            <div className="space-y-4">
              <Button
                onClick={() => {
                  resetHearts()
                  setCurrentActivity(0)
                  setUserAnswers({})
                  setShowResults(false)
                  setWrongAnswersToRetry([])
                  setIsRetryPhase(false)
                  setTotalErrors(0)
                }}
                className="mr-4"
              >
                Tentar Novamente
              </Button>
              <Button onClick={handleBackToLessons} variant="outline">
                Voltar às Lições
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (!activity) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Nenhuma atividade disponível para esta lição.</p>
        <Button onClick={handleBackToLessons} className="mt-4">
          Voltar às Lições
        </Button>
      </div>
    )
  }

  if (showResults) {
    const { correct, totalQuestions } = calculateScore()
    const percentage = Math.round((correct / totalQuestions) * 100)
    const stars = getStars()

    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-white shadow-xl">
          <div className="p-6 text-center">
            <h2 className="text-2xl mb-4 font-bold">Resultados da Lição</h2>
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 3 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-8 h-8 ${i < stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <p className="text-xl">
              Você acertou <span className="font-bold text-green-600">{correct}</span> de {totalQuestions} questões
            </p>
            <p className="text-lg text-gray-600">{percentage}% de aproveitamento</p>
            <p className="text-sm text-gray-500 mt-2">
              Total de erros: {totalErrors} | Estrelas: {stars}/3
            </p>
            {wrongAnswersToRetry.length > 0 && (
              <p className="text-sm text-orange-600 mt-2">
                Você refez {wrongAnswersToRetry.length} questão(ões) que havia errado
              </p>
            )}

            <div className="space-y-4 mt-6">
              {stars >= 2 ? (
                <p className="text-green-600 font-semibold">🎉 Excelente desempenho! Você dominou esta lição!</p>
              ) : stars === 1 ? (
                <p className="text-orange-600 font-semibold">👍 Bom trabalho! Continue praticando para melhorar!</p>
              ) : (
                <p className="text-red-600 font-semibold">📚 Continue estudando! A prática leva à perfeição!</p>
              )}
              <div className="flex gap-4 justify-center">
                <Button onClick={handleBackToLessons} variant="outline">
                  Voltar às Lições
                </Button>
                <Button
                  onClick={() => {
                    setCurrentActivity(0)
                    setUserAnswers({})
                    setShowResults(false)
                    setWrongAnswersToRetry([])
                    setIsRetryPhase(false)
                    setTotalErrors(0)
                    resetHearts()
                  }}
                >
                  Refazer Lição
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  const renderActivity = () => {
    switch (activity.type) {
      case "multiple-choice":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">{activity.question}</h3>
            {isRetryPhase && (
              <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-orange-700">
                  <strong>Questão para Revisão:</strong> Esta é uma questão que você errou anteriormente.
                </p>
              </div>
            )}
            <div className="space-y-2">
              {activity.options.map((option, index) => {
                let buttonClass = "w-full p-3 text-left rounded-lg border transition-colors "

                if (userAnswers[activity.id] !== undefined) {
                  if (index === activity.correct) {
                    buttonClass += "border-green-500 bg-green-50 text-green-700"
                  } else if (index === userAnswers[activity.id]) {
                    buttonClass += "border-red-500 bg-red-50 text-red-700"
                  } else {
                    buttonClass += "border-gray-300 bg-gray-50 text-gray-500"
                  }
                } else {
                  if (userAnswers[activity.id] === index) {
                    buttonClass += "border-blue-500 bg-blue-50"
                  } else {
                    buttonClass += "border-gray-300 hover:border-gray-400"
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={userAnswers[activity.id] !== undefined}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {userAnswers[activity.id] !== undefined && (
                        <div className="flex items-center">
                          {index === activity.correct && <CheckCircle className="w-5 h-5 text-green-600 ml-2" />}
                          {index === userAnswers[activity.id] && index !== activity.correct && (
                            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center ml-2">
                              <span className="text-white text-xs font-bold">✕</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )

      case "true-false":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">{activity.question}</h3>
            {isRetryPhase && (
              <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-orange-700">
                  <strong>Questão para Revisão:</strong> Esta é uma questão que você errou anteriormente.
                </p>
              </div>
            )}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleAnswer(true)}
                disabled={userAnswers[activity.id] !== undefined}
                className={`px-8 py-3 rounded-lg border transition-colors flex items-center gap-2 ${
                  userAnswers[activity.id] !== undefined
                    ? activity.correct === true
                      ? "border-green-500 bg-green-50 text-green-700"
                      : userAnswers[activity.id] === true
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-300 bg-gray-50 text-gray-500"
                    : userAnswers[activity.id] === true
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-300 hover:border-gray-400"
                }`}
              >
                Verdadeiro
                {userAnswers[activity.id] !== undefined && (
                  <>
                    {activity.correct === true && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {userAnswers[activity.id] === true && activity.correct !== true && (
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✕</span>
                      </div>
                    )}
                  </>
                )}
              </button>
              <button
                onClick={() => handleAnswer(false)}
                disabled={userAnswers[activity.id] !== undefined}
                className={`px-8 py-3 rounded-lg border transition-colors flex items-center gap-2 ${
                  userAnswers[activity.id] !== undefined
                    ? activity.correct === false
                      ? "border-green-500 bg-green-50 text-green-700"
                      : userAnswers[activity.id] === false
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-300 bg-gray-50 text-gray-500"
                    : userAnswers[activity.id] === false
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-gray-300 hover:border-gray-400"
                }`}
              >
                Falso
                {userAnswers[activity.id] !== undefined && (
                  <>
                    {activity.correct === false && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {userAnswers[activity.id] === false && activity.correct !== false && (
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✕</span>
                      </div>
                    )}
                  </>
                )}
              </button>
            </div>
          </div>
        )

      case "code-completion":
        const renderCodeWithBlanks = () => {
          if (!activity.codeTemplate) return null

          const parts = activity.codeTemplate.split(/(___BLANK_\d+___)/g)
          const currentAnswers = userAnswers[activity.id] || Array(activity.blanks.length).fill("")
          const isAnswered = userAnswers[activity.id] !== undefined

          return (
            <div className="space-y-4">
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative">
                <pre className="whitespace-pre-wrap">
                  {parts.map((part, index) => {
                    const blankMatch = part.match(/___BLANK_(\d+)___/)
                    if (blankMatch) {
                      const blankId = Number.parseInt(blankMatch[1])
                      const blank = activity.blanks.find((b) => b.id === blankId)
                      const userAnswer = currentAnswers[blankId - 1] || ""
                      const isCorrect = isAnswered && blank && validateCodeCompletion([userAnswer], { blanks: [blank] })

                      return (
                        <span key={index} className="relative inline-block">
                          <input
                            type="text"
                            value={userAnswer}
                            onChange={(e) => {
                              const newAnswers = [...currentAnswers]
                              newAnswers[blankId - 1] = e.target.value
                              setUserAnswers((prev) => ({
                                ...prev,
                                [activity.id]: newAnswers,
                              }))
                            }}
                            placeholder={blank?.placeholder || `Espaço ${blankId}`}
                            disabled={isAnswered}
                            className={`bg-gray-800 border-b-2 text-center min-w-[100px] max-w-[200px] outline-none px-2 py-1 rounded ${
                              isAnswered
                                ? isCorrect
                                  ? "border-green-400 text-green-300 bg-green-900/20"
                                  : "border-red-400 text-red-300 bg-red-900/20"
                                : "border-yellow-400 text-yellow-300 focus:border-yellow-200"
                            }`}
                            style={{ width: `${Math.max(userAnswer.length * 8 + 40, 120)}px` }}
                          />
                          {isAnswered && (
                            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                              {isCorrect ? (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              ) : (
                                <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">✕</span>
                                </div>
                              )}
                            </span>
                          )}
                        </span>
                      )
                    }
                    return part
                  })}
                </pre>
              </div>

              {!isAnswered && (
                <div className="flex justify-center">
                  <Button
                    onClick={() => handleAnswer(currentAnswers)}
                    disabled={currentAnswers.some((answer) => !answer.trim())}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                  >
                    Verificar Resposta
                  </Button>
                </div>
              )}
            </div>
          )
        }

        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">{activity.question}</h3>
            {isRetryPhase && (
              <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-orange-700">
                  <strong>Questão para Revisão:</strong> Esta é uma questão que você errou anteriormente.
                </p>
              </div>
            )}
            {renderCodeWithBlanks()}
            <p className="text-sm text-gray-600">
              Preencha os espaços em branco com as respostas corretas e clique em "Verificar Resposta". Use apenas o
              nome do elemento HTML (sem &lt; &gt;).
            </p>
          </div>
        )

      default:
        return <p>Tipo de atividade não reconhecido.</p>
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Button onClick={handleBackToLessons} variant="ghost" className="mb-4">
          ← Voltar às Lições
        </Button>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
          <div className="flex items-center gap-2">
            {isRetryPhase && (
              <Badge variant="destructive" className="mr-2">
                Revisão
              </Badge>
            )}
            <Badge variant="outline">
              {currentActivity + 1} de {currentActivities.length}
            </Badge>
          </div>
        </div>
        <Progress value={((currentActivity + 1) / currentActivities.length) * 100} className="mb-4" />

        {isRetryPhase && (
          <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-700">
              <strong>Fase de Revisão:</strong> Refaça as questões que você errou. As vidas perdidas não serão
              recuperadas.
            </p>
          </div>
        )}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Vidas Restantes</h2>
          <HealthBar hearts={hearts} maxHearts={maxHearts} />
        </div>
      </div>

      <Card className="bg-white shadow-lg">
        <div className="p-6">
          {renderActivity()}

          {activity.explanation && userAnswers[activity.id] !== undefined && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="font-semibold text-blue-800 mb-2">💡 Explicação:</p>
              <p className="text-blue-700">{activity.explanation}</p>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button onClick={handlePrevious} disabled={currentActivity === 0} variant="outline">
              Anterior
            </Button>
            <Button onClick={handleNext} disabled={userAnswers[activity.id] === undefined}>
              {currentActivity === currentActivities.length - 1 ? "Finalizar" : "Próxima"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
