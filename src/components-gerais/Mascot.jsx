"use client"

import { useState, useEffect, useRef } from "react"

const Mascot = ({ onClick }) => {
  const [isWaving, setIsWaving] = useState(false)
  const [isBlinking, setIsBlinking] = useState(false)
  const [isTalking, setIsTalking] = useState(false)
  const [isJumping, setIsJumping] = useState(false)
  const blinkTimerRef = useRef(null)
  const waveTimerRef = useRef(null)

  // Handle random blinking
  useEffect(() => {
    const startBlinkInterval = () => {
      // Random blink every 2-6 seconds
      const blinkInterval = Math.random() * 4000 + 2000
      blinkTimerRef.current = setTimeout(() => {
        setIsBlinking(true)
        setTimeout(() => {
          setIsBlinking(false)
          startBlinkInterval()
        }, 200)
      }, blinkInterval)
    }

    startBlinkInterval()

    // Random wave every 8-15 seconds
    const startWaveInterval = () => {
      const waveInterval = Math.random() * 7000 + 8000
      waveTimerRef.current = setTimeout(() => {
        setIsWaving(true)
        setTimeout(() => {
          setIsWaving(false)
          startWaveInterval()
        }, 1500)
      }, waveInterval)
    }

    startWaveInterval()

    return () => {
      clearTimeout(blinkTimerRef.current)
      clearTimeout(waveTimerRef.current)
    }
  }, [])

  const handleClick = () => {
    // Jump animation
    setIsJumping(true)
    setTimeout(() => setIsJumping(false), 500)

    // Talk animation
    setIsTalking(true)
    setTimeout(() => setIsTalking(false), 1000)

    // Call the onClick prop if provided
    if (onClick) onClick()
  }

  return (
    <div className="mascot-container cursor-pointer select-none" onClick={handleClick}>
      <div className={`mascot ${isJumping ? "jump" : ""}`}>
        {/* Body */}
        <div className="body">
          {/* Head */}
          <div className="head">
            {/* Eyes */}
            <div className="eyes">
              <div className={`eye left ${isBlinking ? "blink" : ""}`}>
                <div className="pupil"></div>
              </div>
              <div className={`eye right ${isBlinking ? "blink" : ""}`}>
                <div className="pupil"></div>
              </div>
            </div>

            {/* Beak */}
            <div className={`beak ${isTalking ? "talk" : ""}`}>
              <div className="beak-top"></div>
              <div className="beak-bottom"></div>
            </div>

            {/* Eyebrows */}
            <div className="eyebrows">
              <div className="eyebrow left"></div>
              <div className="eyebrow right"></div>
            </div>
          </div>

          {/* Arms */}
          <div className="arms">
            <div className={`arm left ${isWaving ? "wave" : ""}`}></div>
            <div className="arm right"></div>
          </div>

          {/* Feet */}
          <div className="feet">
            <div className="foot left"></div>
            <div className="foot right"></div>
          </div>
        </div>

        {/* Shadow */}
        <div className="shadow"></div>
      </div>

      <style jsx>{`
        .mascot-container {
          position: fixed;
          bottom: 50px;
          right: 50px;
          width: 150px;
          height: 200px;
          transform-origin: bottom center;
          z-index: 50;
          /* Ajuste para subir levemente - aplicado aqui */
          transform: translateY(-20px);
          transition: transform 0.5s ease;
        }

        @media (max-width: 768px) {
          .mascot-container {
            bottom: 30px;
            right: 30px;
            width: 120px;
            height: 160px;
          }
        }

        .mascot {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 160px;
          transition: transform 0.1s ease-in-out;
        }

        @media (max-width: 768px) {
          .mascot {
            width: 100px;
            height: 130px;
          }
        }

        .mascot:hover {
          transform: translateX(-50%) scale(1.05);
        }
        
        .body {
          position: relative;
          width: 100%;
          height: 100%;
          background-color: #0284c7; /* Primary-600 color */
          border-radius: 50% 50% 40% 40%;
          overflow: visible;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .head {
          position: relative;
          width: 100%;
          height: 70%;
          border-radius: 50% 50% 40% 40%;
        }
        
        .eyes {
          position: absolute;
          top: 30%;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: space-around;
        }
        
        .eye {
          width: 30px;
          height: 30px;
          background-color: white;
          border-radius: 50%;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: height 0.1s ease;
        }

        @media (max-width: 768px) {
          .eye {
            width: 25px;
            height: 25px;
          }
        }
        
        .eye.blink {
          height: 2px;
        }
        
        .pupil {
          width: 12px;
          height: 12px;
          background-color: #333;
          border-radius: 50%;
          position: relative;
        }

        @media (max-width: 768px) {
          .pupil {
            width: 10px;
            height: 10px;
          }
        }
        
        .eye.blink .pupil {
          display: none;
        }
        
        .beak {
          position: absolute;
          bottom: 15%;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 2;
        }

        @media (max-width: 768px) {
          .beak {
            width: 25px;
            height: 16px;
          }
        }
        
        .beak-top {
          width: 30px;
          height: 10px;
          background-color: #fbbf24; /* Accent-400 color */
          border-radius: 50% 50% 0 0;
        }

        @media (max-width: 768px) {
          .beak-top {
            width: 25px;
            height: 8px;
          }
        }
        
        .beak-bottom {
          width: 25px;
          height: 10px;
          background-color: #fcd34d; /* Accent-300 color */
          border-radius: 0 0 50% 50%;
          transform-origin: top center;
          transition: transform 0.2s ease;
        }

        @media (max-width: 768px) {
          .beak-bottom {
            width: 20px;
            height: 8px;
          }
        }
        
        .beak.talk .beak-bottom {
          animation: talk 0.2s ease-in-out infinite alternate;
        }
        
        .eyebrows {
          position: absolute;
          top: 22%;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: space-around;
        }
        
        .eyebrow {
          width: 20px;
          height: 5px;
          background-color: #075985; /* Primary-800 color */
          border-radius: 5px;
        }

        @media (max-width: 768px) {
          .eyebrow {
            width: 16px;
            height: 4px;
          }
        }
        
        .arms {
          position: absolute;
          bottom: 30%;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
        
        .arm {
          width: 15px;
          height: 40px;
          background-color: #0369a1; /* Primary-700 color */
          border-radius: 10px;
        }

        @media (max-width: 768px) {
          .arm {
            width: 12px;
            height: 32px;
          }
        }
        
        .arm.left {
          transform-origin: top center;
          transform: rotate(10deg) translateX(10px);
        }
        
        .arm.left.wave {
          animation: wave 0.5s ease-in-out infinite alternate;
        }
        
        .arm.right {
          transform: rotate(-10deg) translateX(-10px);
        }
        
        .feet {
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: space-around;
        }
        
        .foot {
          width: 25px;
          height: 15px;
          background-color: #fbbf24; /* Accent-400 color */
          border-radius: 50% 50% 0 0;
          transform: rotate(90deg);
        }

        @media (max-width: 768px) {
          .foot {
            width: 20px;
            height: 12px;
          }
        }
        
        .shadow {
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 15px;
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 50%;
        }

        @media (max-width: 768px) {
          .shadow {
            bottom: -12px;
            height: 12px;
          }
        }
        
        @keyframes blink {
          0%, 100% { height: 30px; }
          50% { height: 2px; }
        }
        
        @keyframes talk {
          0% { transform: scaleY(1); }
          100% { transform: scaleY(0.5); }
        }
        
        @keyframes wave {
          0% { transform: rotate(10deg) translateX(10px); }
          100% { transform: rotate(40deg) translateX(10px); }
        }
        
        @keyframes jump {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-20px); }
        }

        .mascot.jump {
          animation: jump 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default Mascot
