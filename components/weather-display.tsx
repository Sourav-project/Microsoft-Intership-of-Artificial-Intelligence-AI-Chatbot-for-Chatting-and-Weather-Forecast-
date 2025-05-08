import { Cloud, CloudRain, Sun, Wind, Snowflake } from "lucide-react"

interface WeatherData {
  location: string
  temperature: number
  condition: string
  humidity?: number
  windSpeed?: number
}

interface WeatherDisplayProps {
  weather: WeatherData
}

export default function WeatherDisplay({ weather }: WeatherDisplayProps) {
  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase()
    if (lowerCondition.includes("sun") || lowerCondition.includes("clear")) {
      return <Sun className="h-8 w-8 text-yellow-500" />
    } else if (lowerCondition.includes("rain")) {
      return <CloudRain className="h-8 w-8 text-blue-500" />
    } else if (lowerCondition.includes("cloud")) {
      return <Cloud className="h-8 w-8 text-gray-500" />
    } else if (lowerCondition.includes("snow")) {
      return <Snowflake className="h-8 w-8 text-blue-300" />
    } else {
      return <Wind className="h-8 w-8 text-gray-500" />
    }
  }

  const getBackgroundColor = (condition: string) => {
    const lowerCondition = condition.toLowerCase()
    if (lowerCondition.includes("sun") || lowerCondition.includes("clear")) {
      return "bg-gradient-to-r from-yellow-400 to-orange-300"
    } else if (lowerCondition.includes("rain")) {
      return "bg-gradient-to-r from-blue-400 to-blue-300"
    } else if (lowerCondition.includes("cloud")) {
      return "bg-gradient-to-r from-gray-300 to-gray-200"
    } else if (lowerCondition.includes("snow")) {
      return "bg-gradient-to-r from-blue-100 to-gray-100"
    } else {
      return "bg-gradient-to-r from-purple-200 to-pink-200"
    }
  }

  return (
    <div className="mt-3 rounded-xl overflow-hidden">
      <div className={`p-4 ${getBackgroundColor(weather.condition)}`}>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg">{weather.location}</h3>
            <p className="text-sm opacity-80">{weather.condition}</p>
          </div>
          {getWeatherIcon(weather.condition)}
        </div>

        <div className="mt-2">
          <div className="text-3xl font-bold">{weather.temperature}°</div>

          {(weather.humidity || weather.windSpeed) && (
            <div className="mt-2 flex gap-4 text-sm">
              {weather.humidity && (
                <div>
                  <span className="opacity-70">Humidity:</span> {weather.humidity}%
                </div>
              )}
              {weather.windSpeed && (
                <div>
                  <span className="opacity-70">Wind:</span> {weather.windSpeed} mph
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
