import { ChevronLeft, Wind, Navigation, Compass } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const windData = {
  current: {
    speed: 18,
    direction: "NE",
    gust: 25,
    angle: 45,
  },
  forecast: [
    { time: "12:00", speed: 18, direction: "NE", gust: 25 },
    { time: "13:00", speed: 22, direction: "E", gust: 28 },
    { time: "14:00", speed: 20, direction: "E", gust: 26 },
    { time: "15:00", speed: 15, direction: "SE", gust: 20 },
    { time: "16:00", speed: 12, direction: "SE", gust: 18 },
    { time: "17:00", speed: 10, direction: "S", gust: 15 },
  ],
}

const getWindLevel = (speed: number) => {
  if (speed < 5) return { level: "Calm", color: "text-green-400" }
  if (speed < 12) return { level: "Light", color: "text-blue-400" }
  if (speed < 20) return { level: "Moderate", color: "text-yellow-400" }
  if (speed < 30) return { level: "Strong", color: "text-orange-400" }
  return { level: "Very Strong", color: "text-red-400" }
}

export default function WindPage() {
  const currentLevel = getWindLevel(windData.current.speed)

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
          <h1 className="text-xl font-semibold">Wind Conditions</h1>
        </div>
      </header>

      <div className="p-6">
        {/* Current Wind */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Wind className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
                <div className="text-4xl font-bold mb-2">{windData.current.speed}</div>
                <p className="text-gray-400">km/h</p>
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${currentLevel.color}`}
                >
                  {currentLevel.level}
                </div>
              </div>

              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <Compass className="w-16 h-16 text-gray-400" />
                  <Navigation
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-400"
                    style={{ transform: `translate(-50%, -50%) rotate(${windData.current.angle}deg)` }}
                  />
                </div>
                <div className="text-2xl font-bold mb-2">{windData.current.direction}</div>
                <p className="text-gray-400">Direction</p>
              </div>

              <div className="text-center">
                <Wind className="w-16 h-16 mx-auto mb-4 text-orange-400" />
                <div className="text-4xl font-bold mb-2">{windData.current.gust}</div>
                <p className="text-gray-400">km/h gusts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wind Forecast */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Wind Forecast</h2>
            <div className="space-y-4">
              {windData.forecast.map((item, index) => {
                const level = getWindLevel(item.speed)
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium w-16">{item.time}</span>
                      <Wind className="w-5 h-5 text-cyan-400" />
                      <span className="text-lg font-bold">{item.speed} km/h</span>
                      <span className={`text-sm ${level.color}`}>{level.level}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-400">Direction: {item.direction}</span>
                      <span className="text-sm text-gray-400">Gusts: {item.gust} km/h</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Wind Scale */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Beaufort Wind Scale</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-gray-700 rounded">
                <span className="text-green-400 font-medium">Calm</span>
                <span className="text-sm text-gray-400">0-5 km/h</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-700 rounded">
                <span className="text-blue-400 font-medium">Light</span>
                <span className="text-sm text-gray-400">6-11 km/h</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-700 rounded">
                <span className="text-yellow-400 font-medium">Moderate</span>
                <span className="text-sm text-gray-400">12-19 km/h</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-700 rounded">
                <span className="text-orange-400 font-medium">Strong</span>
                <span className="text-sm text-gray-400">20-29 km/h</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-700 rounded">
                <span className="text-red-400 font-medium">Very Strong</span>
                <span className="text-sm text-gray-400">30+ km/h</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
