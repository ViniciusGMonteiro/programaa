import { useState } from "react"

export default function TrilhaCSS() {
  const [modulosConcluidos, setModulosConcluidos] = useState(Array(10).fill(false))

  const modulos = [
    "Introdução ao CSS e seletores básicos",
    "Box Model e layout básico",
    "Cores, fontes e texto",
    "Flexbox",
    "CSS Grid",
    "Posicionamento e display",
    "Responsividade e Media Queries",
    "Transformações e transições",
    "Animações CSS",
    "Pré-processadores e CSS moderno",
  ]

  const toggleModuloConcluido = (index) => {
    const novosModulosConcluidos = [...modulosConcluidos]
    novosModulosConcluidos[index] = !novosModulosConcluidos[index]
    setModulosConcluidos(novosModulosConcluidos)
  }

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-500">Trilha de CSS</h2>
      <p className="mb-6 text-gray-300">Siga o caminho para dominar CSS:</p>

      <div className="relative mb-8">
        <div className="h-2 bg-gray-700 rounded-full w-full absolute top-6"></div>

        <div className="flex justify-between relative">
          {modulos.map((modulo, index) => {
            const modulosAnterioresConcluidos =
              index === 0 || modulosConcluidos.slice(0, index).every((status) => status === true)

            const concluido = modulosConcluidos[index]

            const circleClasses = concluido
              ? "bg-blue-500 border-blue-300"
              : modulosAnterioresConcluidos
              ? "bg-gray-800 border-blue-500 cursor-pointer"
              : "bg-gray-800 border-gray-600 opacity-50 cursor-not-allowed"

            const textClasses = concluido
              ? "text-blue-300"
              : modulosAnterioresConcluidos
              ? "text-gray-300"
              : "text-gray-500"

            return (
              <div key={index} className="flex flex-col items-center w-8">
                <div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center z-10 ${circleClasses}`}
                  onClick={() => modulosAnterioresConcluidos && toggleModuloConcluido(index)}
                >
                  {concluido ? (
                    <span className="text-white">✓</span>
                  ) : (
                    <span className="text-gray-300">{index + 1}</span>
                  )}
                </div>

                {index < modulos.length - 1 && (
                  <div
                    className={`h-2 absolute top-6 left-6 z-0 rounded-full ${
                      concluido ? "bg-blue-500" : "bg-gray-700"
                    }`}
                    style={{
                      width: `${100 / (modulos.length - 1)}%`,
                      left: `${(index * 100) / (modulos.length - 1)}%`,
                    }}
                  ></div>
                )}

                <div className="mt-4 text-center">
                  <span className={`text-xs ${textClasses}`} title={modulo}>
                    Módulo {index + 1}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        {modulosConcluidos.some((status) => status === true) ? (
          <>
            <h3 className="text-lg font-medium text-blue-400 mb-2">Módulos concluídos:</h3>
            <ul className="text-gray-300 space-y-1">
              {modulosConcluidos.map(
                (status, index) =>
                  status && (
                    <li key={index} className="flex items-center">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span>{modulos[index]}</span>
                    </li>
                  )
              )}
            </ul>
          </>
        ) : (
          <p className="text-gray-400">Clique no primeiro módulo para começar sua jornada!</p>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-400">
        Progresso: {modulosConcluidos.filter(Boolean).length} de {modulos.length} módulos
      </div>
    </div>
  )
}
