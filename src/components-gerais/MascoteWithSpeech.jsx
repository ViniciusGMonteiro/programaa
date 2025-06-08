"use client"

import { useState, useRef } from "react"
import Mascot from "./Mascot"

const MascotWithSpeech = () => {
  const [showSpeech, setShowSpeech] = useState(false)
  const [speechText, setSpecchText] = useState("")
  const speechRef = useRef(null)

  const messages = [
    "Olá! Vamos aprender a programar?",
    "Que tal começar com HTML hoje?",
    "CSS é incrível para estilizar suas páginas!",
    "JavaScript dá vida aos seus projetos!",
    "Não esqueça de praticar todos os dias!",
    "Você está indo muito bem!",
    "Programação é como um superpoder!",
    "Vamos continuar aprendendo juntos?",
    "Tente completar um desafio hoje!",
  ]

  const handleMascotClick = () => {
    // Get random message
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    setSpecchText(randomMessage)

    // Show speech bubble
    setShowSpeech(true)

    // Hide after 4 seconds
    setTimeout(() => {
      setShowSpeech(false)
    }, 4000)
  }

  return (
    <div className="mascot-speech-container">
      <Mascot onClick={handleMascotClick} />

      {/* Speech bubble - nuvem acima do mascote */}
      <div ref={speechRef} className={`speech-bubble ${showSpeech ? "visible" : ""}`}>
        <p>{speechText}</p>
      </div>

      <style jsx>{`
        .mascot-speech-container {
          position: relative;
        }

        .speech-bubble {
          position: fixed;
          bottom: 270px;
          right: 50px;
          background-color: white;
          border-radius: 20px;
          padding: 12px 16px;
          min-width: 200px;
          max-width: 280px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 60;
          border: 2px solid #e5e7eb;
        }

        @media (max-width: 768px) {
          .speech-bubble {
            bottom: 220px;
            right: 30px;
            min-width: 160px;
            max-width: 220px;
            padding: 10px 12px;
          }
        }

        .speech-bubble:after {
          content: "";
          position: absolute;
          bottom: -12px;
          right: 50px;
          width: 0;
          height: 0;
          border-left: 12px solid transparent;
          border-right: 12px solid transparent;
          border-top: 12px solid white;
        }

        @media (max-width: 768px) {
          .speech-bubble:after {
            right: 40px;
          }
        }

        .speech-bubble:before {
          content: "";
          position: absolute;
          bottom: -15px;
          right: 48px;
          width: 0;
          height: 0;
          border-left: 14px solid transparent;
          border-right: 14px solid transparent;
          border-top: 14px solid #e5e7eb;
        }

        @media (max-width: 768px) {
          .speech-bubble:before {
            right: 38px;
          }
        }

        .speech-bubble.visible {
          opacity: 1;
          visibility: visible;
          transform: translateY(-10px);
        }

        .speech-bubble p {
          margin: 0;
          font-size: 14px;
          color: #374151;
          text-align: center;
          line-height: 1.4;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .speech-bubble p {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  )
}

export default MascotWithSpeech