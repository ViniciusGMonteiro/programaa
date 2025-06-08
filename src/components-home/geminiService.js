const GEMINI_API_KEY = "AIzaSyBQ98TvDtAt3_VNztdqqnv5PJD4bzNu7Zs"
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

export const sendMessageToGemini = async (message) => {
  if (!GEMINI_API_KEY) {
    throw new Error("Chave da API do Gemini não configurada")
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Você é um assistente especializado em programação e desenvolvimento web, focado em HTML, CSS e JavaScript. 
                
Suas características:
- Responda de forma clara, didática e prática
- Se for código, forneça exemplos funcionais
- Se for conceito, explique de forma simples e com analogias
- Seja direto e objetivo
- Use exemplos práticos do dia a dia

Pergunta do usuário: ${message}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || `Erro na API: ${response.status}`)
    }

    const data = await response.json()

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text
    } else {
      throw new Error("Resposta inválida da API do Gemini")
    }
  } catch (error) {
    console.error("Erro ao comunicar com Gemini:", error)

    if (error.message.includes("API key")) {
      throw new Error("Chave da API inválida. Verifique sua configuração.")
    } else if (error.message.includes("quota")) {
      throw new Error("Limite de uso da API excedido. Tente novamente mais tarde.")
    } else if (error.message.includes("network") || error.name === "NetworkError") {
      throw new Error("Erro de conexão. Verifique sua internet e tente novamente.")
    } else {
      throw new Error(error.message || "Erro inesperado ao processar sua solicitação")
    }
  }
}
