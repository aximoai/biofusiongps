"use server"

interface AnalysisResult {
  location: string
  confidence: string
  compartments: string[]
  interactions: string
  signals: string
}

function mistralAgent() {
  const API_KEY = "ZCid8XjA0p54IRHAn5uT2wB3XtgHKUUP"
  const API_URL = "https://api.mistral.ai/v1/chat/completions"

  async function sendMessage(messages: any[]) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "mistral-tiny",
          messages: messages.map((msg) => ({
            role: msg.role || "user",
            content: msg.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.choices[0].message.content
    } catch (error) {
      console.error("Error calling Mistral AI:", error)
      throw error
    }
  }

  return { sendMessage }
}

export async function analyzeProtein(sequence: string): Promise<AnalysisResult> {
  if (!sequence) {
    return {
      location: "Unknown",
      confidence: "low",
      compartments: ["Unknown"],
      interactions: "No sequence provided",
      signals: "No sequence provided",
    }
  }

  try {
    const agent = mistralAgent()

    const systemMessage = {
      role: "system",
      content: `You are a protein analysis AI. Analyze the protein sequence and return ONLY a JSON object with this exact structure:
      {
        "location": "primary location",
        "confidence": "high/medium/low",
        "compartments": ["compartment1", "compartment2"],
        "interactions": "description",
        "signals": "description"
      }`,
    }

    const userMessage = {
      role: "user",
      content: `Analyze this protein sequence: ${sequence}`,
    }

    const result = await agent.sendMessage([systemMessage, userMessage])

    try {
      // Parse the response
      const parsedResult = JSON.parse(result)

      // Create a validated result with default values
      const validatedResult: AnalysisResult = {
        location: typeof parsedResult?.location === "string" ? parsedResult.location : "Unknown",
        confidence: ["high", "medium", "low"].includes(parsedResult?.confidence) ? parsedResult.confidence : "low",
        compartments: Array.isArray(parsedResult?.compartments) ? parsedResult.compartments : ["Unknown"],
        interactions:
          typeof parsedResult?.interactions === "string" ? parsedResult.interactions : "No interactions identified",
        signals: typeof parsedResult?.signals === "string" ? parsedResult.signals : "No signals identified",
      }

      return validatedResult
    } catch (parseError) {
      console.error("Failed to parse API response:", parseError)
      return {
        location: "Error",
        confidence: "low",
        compartments: ["Error"],
        interactions: "Failed to parse analysis results",
        signals: "Failed to parse analysis results",
      }
    }
  } catch (error) {
    console.error("Analysis error:", error)
    return {
      location: "Error",
      confidence: "low",
      compartments: ["Error"],
      interactions: "Analysis service error",
      signals: "Analysis service error",
    }
  }
}

