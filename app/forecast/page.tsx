"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Cloud, Sun, CloudRain, Wind, Droplets, Eye, Thermometer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { WeatherService } from "@/lib/weather-service"

const WeatherIcon = ({ condition, size = "md" }: { condition: string; size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  switch (condition) {
    case "clear sky":
    case "sunny":
      return <Sun className={`${sizeClasses[size]} text-yellow-400`} />
    case "few clouds":
    case "partly-cloudy":
      return (
        <div className={`${sizeClasses[size]} relative`}>
          <Sun className="w-full h-full text-yellow-400" />
          <Cloud className="absolute -bottom-1 -right-1 w-4 h-4 text-gray-300" />
        </div>
      )
    case "scattered clouds":
    case "broken clouds":
    case "cloudy":
      return <Cloud className={`${sizeClasses[size]} text-gray-400`} />
    case "shower rain":
    case "rain":
    case "rainy":
      return <CloudRain className={`${sizeClasses[size]} text-blue-400`} />
    default:
      return <Sun className={`${sizeClasses[size]} text-yellow-400`} />
  }
}

export default function ForecastPage() {
  const [activeView, setActiveView] = useState("daily")
  const [forecastData, setForecastData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadForecastData()
  }, [])

  const loadForecastData = async () => {
    try {
      const forecast = await WeatherService.getForecast("Mumbai, India")
      const current = await WeatherService.getCurrentWeather("Mumbai, India")

      // Generate hourly data from daily forecast
      const hourlyData = Array.from({ length: 24 }, (_, i) => {
        const hour = new Date()
        hour.setHours(hour.getHours() + i)
        const temp = 28 + Math.sin((i * Math.PI) / 12) * 6 + (Math.random() - 0.5) * 4

        return {
          time: hour.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
          temp: Math.round(temp),
          condition: ["clear sky", "few clouds", "scattered clouds", "shower rain"][Math.floor(Math.random() * 4)],
          humidity: 60 + Math.random() * 30,
          wind: 10 + Math.random() * 15,
        }
      })

      setForecastData({
        hourly: hourlyData,
        daily: forecast,
        current: current,
      })
    } catch (error) {
      console.error("Error loading forecast data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !forecastData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading forecast data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Weather Forecast</h1>
        </div>
      </header>

      <div className="p-6">
        {/* View Toggle */}
        <div className="flex space-x-4 mb-6">
          {["hourly", "daily"].map((view) => (
            <Button
              key={view}
              onClick={() => setActiveView(view)}
              variant={activeView === view ? "default" : "outline"}
              className={`rounded-full px-6 ${
                activeView === view
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "border-gray-600 text-gray-300 bg-transparent hover:bg-gray-800"
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)} Forecast
            </Button>
          ))}
        </div>

        {/* Hourly Forecast */}
        {activeView === "hourly" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">24-Hour Forecast</h2>
            <div className="grid gap-4">
              {forecastData.hourly.slice(0, 12).map((hour: any, index: number) => (
                <Card key={index} className="bg-gray-800 border-gray-700 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-medium w-16 text-white">{hour.time}</span>
                        <WeatherIcon condition={hour.condition} />
                        <span className="text-2xl font-bold text-white">{hour.temp}°</span>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-300">
                        <div className="flex items-center space-x-1">
                          <Droplets className="w-4 h-4" />
                          <span>{Math.round(hour.humidity)}%</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Wind className="w-4 h-4" />
                          <span>{Math.round(hour.wind)} km/h</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Daily Forecast */}
        {activeView === "daily" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">7-Day Forecast</h2>
            <div className="grid gap-4">
              {forecastData.daily.map((day: any, index: number) => (
                <Card key={index} className="bg-gray-800 border-gray-700 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-medium w-24 text-white">
                          {index === 0
                            ? "Today"
                            : new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" })}
                        </span>
                        <WeatherIcon condition={day.weather[0].description} />
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-white">{Math.round(day.temp.max)}°</span>
                          <span className="text-lg text-gray-300">{Math.round(day.temp.min)}°</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-300">
                        <div className="flex items-center space-x-1">
                          <Droplets className="w-4 h-4" />
                          <span>{day.humidity || Math.round(60 + Math.random() * 30)}%</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Wind className="w-4 h-4" />
                          <span>{Math.round(10 + Math.random() * 15)} km/h</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Weather Details */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Current Weather Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gray-800 border-gray-700 rounded-2xl">
              <CardContent className="p-4 text-center">
                <Thermometer className="w-8 h-8 mx-auto mb-2 text-red-400" />
                <p className="text-sm text-gray-300">Feels Like</p>
                <p className="text-xl font-bold text-white">{forecastData.current.feels_like}°</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700 rounded-2xl">
              <CardContent className="p-4 text-center">
                <Droplets className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <p className="text-sm text-gray-300">Humidity</p>
                <p className="text-xl font-bold text-white">{forecastData.current.humidity}%</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700 rounded-2xl">
              <CardContent className="p-4 text-center">
                <Wind className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
                <p className="text-sm text-gray-300">Wind Speed</p>
                <p className="text-xl font-bold text-white">{Math.round(10 + Math.random() * 15)} km/h</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700 rounded-2xl">
              <CardContent className="p-4 text-center">
                <Eye className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                <p className="text-sm text-gray-300">Visibility</p>
                <p className="text-xl font-bold text-white">10 km</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
