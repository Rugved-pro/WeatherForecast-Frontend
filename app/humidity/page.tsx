import { ChevronLeft, Droplets, Thermometer, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const humidityData = {
  current: 70,
  dewPoint: 24,
  comfort: "Comfortable",
  forecast: [
    { time: "12:00", humidity: 70, dewPoint: 24 },
    { time: "13:00", humidity: 68, dewPoint: 23 },
    { time: "14:00", humidity: 65, dewPoint: 22 },
    { time: "15:00", humidity: 72, dewPoint: 25 },
    { time: "16:00", humidity: 75, dewPoint: 26 },
    { time: "17:00", humidity: 78, dewPoint: 27 },
  ],
}

const getHumidityLevel = (humidity: number) => {
  if (humidity < 30) return { level: "Very Dry", color: "text-red-400", comfort: "Uncomfortable" }
  if (humidity < 40) return { level: "Dry", color: "text-orange-400", comfort: "Slightly Dry" }
  if (humidity < 60) return { level: "Comfortable", color: "text-green-400", comfort: "Ideal" }
  if (humidity < 70) return { level: "Humid", color: "text-yellow-400", comfort: "Comfortable" }
  if (humidity < 80) return { level: "Very Humid", color: "text-blue-400", comfort: "Slightly Uncomfortable" }
  return { level: "Extremely Humid", color: "text-purple-400", comfort: "Uncomfortable" }
}

export default function HumidityPage() {
  const currentLevel = getHumidityLevel(humidityData.current)

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
          <h1 className="text-xl font-semibold">Humidity</h1>
        </div>
      </header>

      <div className="p-6">
        {/* Current Humidity */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <Droplets className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                <div className="text-6xl font-bold mb-2">{humidityData.current}%</div>
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${currentLevel.color}`}
                >
                  {currentLevel.level}
                </div>
                <p className="text-gray-400 mt-2">{currentLevel.comfort}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Thermometer className="w-5 h-5 text-red-400" />
                    <span>Dew Point</span>
                  </div>
                  <span className="font-bold">{humidityData.dewPoint}°C</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Eye className="w-5 h-5 text-purple-400" />
                    <span>Comfort Level</span>
                  </div>
                  <span className={`font-bold ${currentLevel.color}`}>{humidityData.comfort}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Humidity Forecast */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Humidity Forecast</h2>
            <div className="space-y-4">
              {humidityData.forecast.map((item, index) => {
                const level = getHumidityLevel(item.humidity)
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium w-16">{item.time}</span>
                      <Droplets className="w-5 h-5 text-blue-400" />
                      <span className="text-lg font-bold">{item.humidity}%</span>
                      <span className={`text-sm ${level.color}`}>{level.level}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-400">Dew Point: {item.dewPoint}°C</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Humidity Guide */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Humidity Comfort Guide</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div>
                  <span className="text-red-400 font-medium">Very Dry</span>
                  <p className="text-xs text-gray-400">May cause skin and respiratory irritation</p>
                </div>
                <span className="text-sm text-gray-400">0-30%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div>
                  <span className="text-orange-400 font-medium">Dry</span>
                  <p className="text-xs text-gray-400">Slightly uncomfortable, static electricity</p>
                </div>
                <span className="text-sm text-gray-400">30-40%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div>
                  <span className="text-green-400 font-medium">Comfortable</span>
                  <p className="text-xs text-gray-400">Ideal humidity range for most people</p>
                </div>
                <span className="text-sm text-gray-400">40-60%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div>
                  <span className="text-yellow-400 font-medium">Humid</span>
                  <p className="text-xs text-gray-400">Still comfortable for most activities</p>
                </div>
                <span className="text-sm text-gray-400">60-70%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div>
                  <span className="text-blue-400 font-medium">Very Humid</span>
                  <p className="text-xs text-gray-400">May feel sticky and uncomfortable</p>
                </div>
                <span className="text-sm text-gray-400">70-80%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div>
                  <span className="text-purple-400 font-medium">Extremely Humid</span>
                  <p className="text-xs text-gray-400">Very uncomfortable, promotes mold growth</p>
                </div>
                <span className="text-sm text-gray-400">80%+</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
