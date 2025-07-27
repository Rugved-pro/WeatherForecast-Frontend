import { ChevronLeft, Sun, Shield, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const uvData = {
  current: 8,
  forecast: [
    { time: "6 AM", uv: 0 },
    { time: "8 AM", uv: 2 },
    { time: "10 AM", uv: 5 },
    { time: "12 PM", uv: 8 },
    { time: "2 PM", uv: 9 },
    { time: "4 PM", uv: 6 },
    { time: "6 PM", uv: 3 },
    { time: "8 PM", uv: 0 },
  ],
}

const getUVLevel = (uv: number) => {
  if (uv <= 2) return { level: "Low", color: "text-green-400", bg: "bg-green-400/20" }
  if (uv <= 5) return { level: "Moderate", color: "text-yellow-400", bg: "bg-yellow-400/20" }
  if (uv <= 7) return { level: "High", color: "text-orange-400", bg: "bg-orange-400/20" }
  if (uv <= 10) return { level: "Very High", color: "text-red-400", bg: "bg-red-400/20" }
  return { level: "Extreme", color: "text-purple-400", bg: "bg-purple-400/20" }
}

const getProtectionAdvice = (uv: number) => {
  if (uv <= 2) return "No protection needed. You can safely enjoy being outside!"
  if (uv <= 5) return "Some protection required. Seek shade during midday hours."
  if (uv <= 7) return "Protection essential. Avoid sun during midday hours."
  if (uv <= 10) return "Extra protection required. Avoid sun between 10am-4pm."
  return "Stay indoors or seek shade. UV radiation is extremely dangerous."
}

export default function UVIndexPage() {
  const currentLevel = getUVLevel(uvData.current)

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
          <h1 className="text-xl font-semibold">UV Index</h1>
        </div>
      </header>

      <div className="p-6">
        {/* Current UV Index */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="p-6">
            <div className="text-center">
              <Sun className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
              <div className="text-6xl font-bold mb-2">{uvData.current}</div>
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${currentLevel.bg} ${currentLevel.color}`}
              >
                {currentLevel.level}
              </div>
              <p className="text-gray-400 mt-4 max-w-md mx-auto">{getProtectionAdvice(uvData.current)}</p>
            </div>
          </CardContent>
        </Card>

        {/* UV Forecast */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Today's UV Forecast</h2>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {uvData.forecast.map((item, index) => {
                const level = getUVLevel(item.uv)
                return (
                  <div key={index} className="text-center">
                    <p className="text-sm text-gray-400 mb-2">{item.time}</p>
                    <div className={`w-12 h-12 rounded-full ${level.bg} flex items-center justify-center mx-auto mb-2`}>
                      <span className={`font-bold ${level.color}`}>{item.uv}</span>
                    </div>
                    <p className={`text-xs ${level.color}`}>{level.level}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* UV Protection Tips */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Protection Tips</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Use Sunscreen</h3>
                  <p className="text-sm text-gray-400">Apply SPF 30+ sunscreen 30 minutes before going outside</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Sun className="w-5 h-5 text-yellow-400 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Seek Shade</h3>
                  <p className="text-sm text-gray-400">Stay in shade during peak UV hours (10 AM - 4 PM)</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-orange-400 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Wear Protection</h3>
                  <p className="text-sm text-gray-400">Use sunglasses, wide-brimmed hats, and protective clothing</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-green-400 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Stay Hydrated</h3>
                  <p className="text-sm text-gray-400">Drink plenty of water when spending time outdoors</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
