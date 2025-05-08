"use client"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { MessageCircle, Send, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import WeatherDisplay from "@/components/weather-display"

export default function ChatbotPage() {
  const [showIntro, setShowIntro] = useState(true)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "👋 Hi there! I'm your friendly AI assistant. I can chat about almost anything and provide weather forecasts. Try asking me about the weather in your city!",
      },
    ],
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8">
      <div className="w-full max-w-4xl mx-auto h-screen flex flex-col">
        <Card className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-4 rounded-xl mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center">Colorful AI Chatbot</h1>
          <p className="text-white text-center opacity-90">Chat & Weather Forecasts</p>
        </Card>

        {showIntro && (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 mb-4 shadow-lg">
            <h2 className="text-xl font-semibold mb-2 text-purple-700">Welcome to your AI Assistant!</h2>
            <p className="mb-4 text-gray-700">I can help with:</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2 text-gray-700">
                <MessageCircle className="h-5 w-5 text-pink-500" />
                <span>General conversation and questions</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Sun className="h-5 w-5 text-orange-500" />
                <span>Weather forecasts for any location</span>
              </li>
            </ul>
            <Button
              onClick={() => setShowIntro(false)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Get Started
            </Button>
          </div>
        )}

        <div className="flex-grow overflow-auto mb-4 rounded-xl bg-white/80 backdrop-blur-sm p-4 shadow-lg">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                      : "bg-white border border-gray-200 text-gray-800"
                  }`}
                >
                  {message.content}

                  {message.role === "assistant" &&
                    message.parts?.map((part, index) => {
                      if (part.type === "tool-result" && part.tool === "getWeather") {
                        return <WeatherDisplay key={index} weather={part.result} />
                      }
                      return null
                    })}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-white border border-gray-200">
                  <div className="flex space-x-2">
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="w-full p-4 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </main>
  )
}
