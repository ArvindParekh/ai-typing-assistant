import { type NextRequest, NextResponse } from "next/server"
import { google } from "@ai-sdk/google"
import { generateText } from "ai"

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Invalid prompt provided" }, { status: 400 })
    }

    const response = await generateText({
      model: google("gemini-1.5-flash"),
      prompt, 
      system: "You are a helpful assistant that generates autocomplete suggestions for a given prompt. Only return the suggestions, no other text. Keep it short and concise. The suggestions should be based on the prompt and the context of the conversation. Generate the next sentence or phrase based on the previous sentence or phrase.",
    })

    return NextResponse.json({ suggestion: response.text })
  } catch (error) {
    console.error("Autocomplete API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// function generateMockSuggestion(prompt: string): string {
//   const lowercasePrompt = prompt.toLowerCase().trim()

//   // Common sentence starters and their completions
//   const patterns = [
//     {
//       trigger: /\bthe weather is\b/,
//       suggestions: [" quite pleasant today", " changing rapidly", " perfect for outdoor activities"],
//     },
//     {
//       trigger: /\bi think\b/,
//       suggestions: [" this is a great idea", " we should consider all options", " it's worth exploring further"],
//     },
//     {
//       trigger: /\bhow to\b/,
//       suggestions: [" improve productivity", " learn new skills", " solve this problem effectively"],
//     },
//     {
//       trigger: /\bin my opinion\b/,
//       suggestions: [", this approach works best", ", we need to be more careful", ", there are better alternatives"],
//     },
//     {
//       trigger: /\btoday i\b/,
//       suggestions: [" learned something new", " accomplished my goals", " had an interesting experience"],
//     },
//   ]

//   // Check for pattern matches
//   for (const pattern of patterns) {
//     if (pattern.trigger.test(lowercasePrompt)) {
//       const randomSuggestion = pattern.suggestions[Math.floor(Math.random() * pattern.suggestions.length)]
//       return randomSuggestion
//     }
//   }

//   // Default suggestions based on ending
//   if (lowercasePrompt.endsWith("the")) {
//     return " best approach would be"
//   }
//   if (lowercasePrompt.endsWith("and")) {
//     return " furthermore, we should consider"
//   }
//   if (lowercasePrompt.endsWith("but")) {
//     return " there are some important considerations"
//   }
//   if (lowercasePrompt.endsWith("because")) {
//     return " it provides the most value"
//   }

//   // Generic completions
//   const genericSuggestions = [
//     " and this could lead to interesting results.",
//     " which opens up new possibilities.",
//     " that deserves further consideration.",
//     " and we should explore this further.",
//     " with careful planning and execution.",
//   ]

//   return genericSuggestions[Math.floor(Math.random() * genericSuggestions.length)]
// }
