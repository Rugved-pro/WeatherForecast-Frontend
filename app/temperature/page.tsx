import { ChevronLeft, Thermometer, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const temperatureData = {
  current: 32,
  feelsLike: 34,
  high: 35,
  low: 27,
  trend: "rising",
  forecast: [
    { time: "12:00", temp: 32, feelsLike: 34, trend: "stable" },
    { time: "13:00", temp: 33, feelsLike: 35, trend: "rising" },
    { time: "14:00", temp: 35, feelsLike: 37, trend: "rising" },
    { time: "15:00", temp: 34, feelsLike: 36, trend: "falling" },
    { time: "16:00", temp: 31, feelsLike: 33, trend: "falling" },
    { time: "17:00", temp: 29, feelsLike: 31, trend: "falling" },
  ],
}

const getTempLevel = (temp: number) => {
  if (temp < 0) return { level: "Freezing", color: "text-blue-600" }
  if (temp < 10) return { level: "Cold", color: "text-blue-400" }
  if (temp < 20) return { level: "Cool", color: "text-cyan-400" }
  if (temp < 25) return { level: "Mild", color: "text-green-400" }
  if (temp < 30) return { level: "Warm", color: "text-yellow-400" }
  if (temp < 35) return { level: "Hot", color: "text-orange-400" }
  return { level: "Very Hot", color: "text-red-400" }
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "rising":
      return <TrendingUp className="w-4 h-4 text-red-400" />
    case "falling":
      return <TrendingDown className="w-4 h-4 text-blue-400" />
    default:
      return <div className="w-4 h-4 bg-gray-400 rounded-full" />
  }
}

export default function TemperaturePage() {
  const currentLevel = getTempLevel(temperatureData.current)

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
          <h1 className="text-xl font-semibold">Temperature</h1>
        </div>
      </header>

      <div className="p-6">
        {/* Current Temperature */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <Thermometer className="w-16 h-16 mx-auto mb-4 text-red-400" />
                <div className="text-6xl font-bold mb-2">{temperatureData.current}°</div>
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${currentLevel.color}`}
                >
                  {currentLevel.level}
                </div>
                <div className="flex items-center justify-center mt-4">
                  {getTrendIcon(temperatureData.trend)}
                  <span className="ml-2 text-sm text-gray-400 capitalize">{temperatureData.trend}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <span>Feels Like</span>
                  <span className="font-bold">{temperatureData.feelsLike}°C</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <span>Today's High</span>
                  <span className="font-bold text-red-400">{temperatureData.high}°C</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <span>Today's Low</span>
                  <span className="font-bold text-blue-400">{temperatureData.low}°C</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Temperature Forecast */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Temperature Forecast</h2>
            <div className="space-y-4">
              {temperatureData.forecast.map((item, index) => {
                const level = getTempLevel(item.temp)
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium w-16">{item.time}</span>
                      <Thermometer className="w-5 h-5 text-red-400" />
                      <span className="text-lg font-bold">{item.temp}°C</span>
                      <span className={`text-sm ${level.color}`}>{level.level}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-400">Feels like: {item.feelsLike}°C</span>
                      {getTrendIcon(item.trend)}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Temperature Guide */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Temperature Guide</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div>
                  <span className="text-blue-600 font-medium">Freezing</span>
                  <p className="text-xs text-gray-400">Water freezes, ice formation</p>
                </div>
                <span className="text-sm text-gray-400">{"<0°C"}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div>
                  <span className="text-blue-400 font-medium">Cold</span>
                  <p className="text-xs text-gray-400">Heavy clothing required</p>
                </div>
                <span className="text-sm text-gray-400">0-10°C</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div>
                  <span className="text-cyan-400 font-medium">Cool</span>
                  <p className="text-xs text-gray-400">Light jacket recommended</p>
                </div>
                <span className="text-sm text-gray-400">10-20°C</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div>
                  <span className="text-green-400 font-medium">Mild</span>
                  <p className="text-xs text-gray-400">Comfortable for most activities</p>
                </div>
                <span className="text-sm text-gray-400">20-25°C</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div>
                  <span className="text-yellow-400 font-medium">Warm</span>
                  <p className="text-xs text-gray-400">Light clothing, stay hydrated</p>
                </div>
                <span className="text-sm text-gray-400">25-30°C</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div>
                  <span className="text-orange-400 font-medium">Hot</span>
                  <p className="text-xs text-gray-400">Seek shade, drink plenty of water</p>
                </div>
                <span className="text-sm text-gray-400">30-35°C</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div>
                  <span className="text-red-400 font-medium">Very Hot</span>
                  <p className="text-xs text-gray-400">Extreme heat, limit outdoor activities</p>
                </div>
                <span className="text-sm text-gray-400">35°C+</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
