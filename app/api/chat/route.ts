import { openai } from "@ai-sdk/openai"
import { streamText, tool } from "ai"
import { z } from "zod"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = await streamText({
    model: openai("gpt-4o"),
    messages,
    maxSteps: 5,
    tools: {
      getWeather: tool({
        description: "Get the weather forecast for a location",
        parameters: z.object({
          location: z.string().describe("The city or location to get the weather for"),
        }),
        execute: async ({ location }) => {
          // In a real app, you would call a weather API here
          // This is a mock implementation
          const conditions = ["Sunny", "Partly Cloudy", "Cloudy", "Rainy", "Thunderstorm", "Snowy", "Clear"]
          const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]
          const randomTemp = Math.floor(Math.random() * (95 - 32) + 32)
          const randomHumidity = Math.floor(Math.random() * (90 - 30) + 30)
          const randomWind = Math.floor(Math.random() * 20)

          return {
            location,
            temperature: randomTemp,
            condition: randomCondition,
            humidity: randomHumidity,
            windSpeed: randomWind,
          }
        },
      }),
    },
  })

  return result.toDataStreamResponse()
}
