import { ChevronLeft, Eye, Cloud, Sun, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const visibilityData = {
  current: 10,
  conditions: "Clear",
  forecast: [
    { time: "12:00", visibility: 10, condition: "Clear" },
    { time: "13:00", visibility: 8, condition: "Hazy" },
    { time: "14:00", visibility: 6, condition: "Light Fog" },
    { time: "15:00", visibility: 4, condition: "Fog" },
    { time: "16:00", visibility: 2, condition: "Dense Fog" },
    { time: "17:00", visibility: 5, condition: "Fog Clearing" },
  ],
}

const getVisibilityLevel = (visibility: number) => {
  if (visibility >= 10) return { level: "Excellent", color: "text-green-400", icon: Sun }
  if (visibility >= 5) return { level: "Good", color: "text-blue-400", icon: Sun }
  if (visibility >= 2) return { level: "Moderate", color: "text-yellow-400", icon: Cloud }
  if (visibility >= 1) return { level: "Poor", color: "text-orange-400", icon: Cloud }
  return { level: "Very Poor", color: "text-red-400", icon: AlertTriangle }
}

export default function VisibilityPage() {
  const currentLevel = getVisibilityLevel(visibilityData.current)
  const IconComponent = currentLevel.icon

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
          <h1 className="text-xl font-semibold">Visibility</h1>
        </div>
      </header>

      <div className="p-6">
        {/* Current Visibility */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="p-6">
            <div className="text-center">
              <Eye className="w-16 h-16 mx-auto mb-4 text-purple-400" />
              <div className="text-6xl font-bold mb-2">{visibilityData.current}</div>
              <p className="text-gray-400 mb-4">kilometers</p>
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${currentLevel.color}`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {currentLevel.level}
              </div>
              <p className="text-gray-400 mt-4">{visibilityData.conditions}</p>
            </div>
          </CardContent>
        </Card>

        {/* Visibility Forecast */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Visibility Forecast</h2>
            <div className="space-y-4">
              {visibilityData.forecast.map((item, index) => {
                const level = getVisibilityLevel(item.visibility)
                const IconComponent = level.icon
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium w-16">{item.time}</span>
                      <Eye className="w-5 h-5 text-purple-400" />
                      <span className="text-lg font-bold">{item.visibility} km</span>
                      <span className={`text-sm ${level.color} flex items-center`}>
                        <IconComponent className="w-4 h-4 mr-1" />
                        {level.level}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-400">{item.condition}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Visibility Guide */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Visibility Guide</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div className="flex items-center space-x-3">
                  <Sun className="w-5 h-5 text-green-400" />
                  <div>
                    <span className="text-green-400 font-medium">Excellent</span>
                    <p className="text-xs text-gray-400">Perfect conditions for all activities</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">10+ km</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div className="flex items-center space-x-3">
                  <Sun className="w-5 h-5 text-blue-400" />
                  <div>
                    <span className="text-blue-400 font-medium">Good</span>
                    <p className="text-xs text-gray-400">Good for most outdoor activities</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">5-10 km</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div className="flex items-center space-x-3">
                  <Cloud className="w-5 h-5 text-yellow-400" />
                  <div>
                    <span className="text-yellow-400 font-medium">Moderate</span>
                    <p className="text-xs text-gray-400">Reduced visibility, drive carefully</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">2-5 km</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div className="flex items-center space-x-3">
                  <Cloud className="w-5 h-5 text-orange-400" />
                  <div>
                    <span className="text-orange-400 font-medium">Poor</span>
                    <p className="text-xs text-gray-400">Fog present, use headlights</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">1-2 km</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <div>
                    <span className="text-red-400 font-medium">Very Poor</span>
                    <p className="text-xs text-gray-400">Dense fog, avoid driving if possible</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">{"<1 km"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
