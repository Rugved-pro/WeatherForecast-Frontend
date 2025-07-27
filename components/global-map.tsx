"use client"

import { useState } from "react"
import { Plus, Minus, Layers, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const weatherPoints = [
  { city: "New York", lat: 40.7128, lng: -74.006, temp: 22, condition: "sunny", x: 25, y: 35 },
  { city: "London", lat: 51.5074, lng: -0.1278, temp: 15, condition: "cloudy", x: 50, y: 30 },
  { city: "Tokyo", lat: 35.6762, lng: 139.6503, temp: 28, condition: "rainy", x: 85, y: 40 },
  { city: "Sydney", lat: -33.8688, lng: 151.2093, temp: 25, condition: "partly-cloudy", x: 87, y: 75 },
  { city: "Mumbai", lat: 19.076, lng: 72.8777, temp: 32, condition: "sunny", x: 72, y: 50 },
  { city: "São Paulo", lat: -23.5505, lng: -46.6333, temp: 24, condition: "cloudy", x: 35, y: 70 },
  { city: "Cairo", lat: 30.0444, lng: 31.2357, temp: 29, condition: "sunny", x: 55, y: 45 },
  { city: "Moscow", lat: 55.7558, lng: 37.6176, temp: 8, condition: "snow", x: 60, y: 25 },
]

export function GlobalMap() {
  const [zoom, setZoom] = useState(1)
  const [selectedPoint, setSelectedPoint] = useState<any>(null)
  const [mapStyle, setMapStyle] = useState("temperature")

  const getTemperatureColor = (temp: number) => {
    if (temp < 0) return "bg-blue-600"
    if (temp < 10) return "bg-blue-400"
    if (temp < 20) return "bg-green-400"
    if (temp < 30) return "bg-yellow-400"
    return "bg-red-400"
  }

  return (
    <Card className="bg-gray-800 border-gray-700 h-96 relative overflow-hidden rounded-2xl">
      <CardContent className="p-0 relative h-full">
        {/* World Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900">
          {/* Continents - Simplified SVG representation */}
          <svg className="w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="xMidYMid slice">
            {/* North America */}
            <path
              d="M15 20 L30 15 L35 25 L25 35 L15 30 Z"
              fill="rgba(75, 85, 99, 0.8)"
              stroke="rgba(156, 163, 175, 0.3)"
              strokeWidth="0.2"
            />
            {/* South America */}
            <path
              d="M25 40 L35 35 L40 50 L30 60 L25 55 Z"
              fill="rgba(75, 85, 99, 0.8)"
              stroke="rgba(156, 163, 175, 0.3)"
              strokeWidth="0.2"
            />
            {/* Europe */}
            <path
              d="M45 15 L55 12 L58 20 L50 25 L45 22 Z"
              fill="rgba(75, 85, 99, 0.8)"
              stroke="rgba(156, 163, 175, 0.3)"
              strokeWidth="0.2"
            />
            {/* Africa */}
            <path
              d="M45 25 L60 22 L65 45 L55 55 L45 50 Z"
              fill="rgba(75, 85, 99, 0.8)"
              stroke="rgba(156, 163, 175, 0.3)"
              strokeWidth="0.2"
            />
            {/* Asia */}
            <path
              d="M60 10 L85 8 L90 30 L75 35 L60 25 Z"
              fill="rgba(75, 85, 99, 0.8)"
              stroke="rgba(156, 163, 175, 0.3)"
              strokeWidth="0.2"
            />
            {/* Australia */}
            <path
              d="M80 50 L90 48 L92 55 L85 58 L80 55 Z"
              fill="rgba(75, 85, 99, 0.8)"
              stroke="rgba(156, 163, 175, 0.3)"
              strokeWidth="0.2"
            />
          </svg>

          {/* Weather Points */}
          {weatherPoints.map((point, index) => (
            <div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                transform: `translate(-50%, -50%) scale(${zoom})`,
              }}
              onClick={() => setSelectedPoint(point)}
            >
              <div
                className={`w-3 h-3 rounded-full ${getTemperatureColor(point.temp)} border-2 border-white shadow-lg animate-pulse`}
              ></div>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                {point.city}: {point.temp}°C
              </div>
            </div>
          ))}

          {/* Temperature Overlay */}
          {mapStyle === "temperature" && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-green-500/20 to-red-500/20 pointer-events-none"></div>
          )}
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          <Button size="icon" variant="secondary" className="bg-gray-700/90 hover:bg-gray-600 backdrop-blur-sm">
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>

        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button
            size="icon"
            variant="secondary"
            className="bg-gray-700/90 hover:bg-gray-600 backdrop-blur-sm"
            onClick={() => setMapStyle(mapStyle === "temperature" ? "precipitation" : "temperature")}
          >
            <Layers className="w-4 h-4" />
          </Button>
        </div>

        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <Button
            size="icon"
            variant="secondary"
            className="bg-gray-700/90 hover:bg-gray-600 backdrop-blur-sm"
            onClick={() => setZoom(Math.min(zoom + 0.2, 2))}
          >
            <Plus className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="bg-gray-700/90 hover:bg-gray-600 backdrop-blur-sm"
            onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
          >
            <Minus className="w-4 h-4" />
          </Button>
        </div>

        {/* Map Info Card */}
        <div className="absolute bottom-4 left-4">
          <Card className="bg-white text-gray-900 max-w-xs">
            <CardContent className="p-4">
              <p className="text-sm font-medium mb-2">Explore global map of wind, weather and oceans condition.</p>
              <Button className="w-full bg-blue-400 hover:bg-blue-500 text-white rounded-full">Get started</Button>
            </CardContent>
          </Card>
        </div>

        {/* Selected Point Info */}
        {selectedPoint && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Card className="bg-gray-900/95 border-gray-600 backdrop-blur-sm">
              <CardContent className="p-4">
                <h3 className="font-semibold text-white">{selectedPoint.city}</h3>
                <p className="text-2xl font-bold text-white">{selectedPoint.temp}°C</p>
                <p className="text-sm text-gray-300 capitalize">{selectedPoint.condition}</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2 w-full bg-transparent text-white border-gray-500"
                  onClick={() => setSelectedPoint(null)}
                >
                  Close
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-16 left-4">
          <Card className="bg-gray-900/80 border-gray-600 backdrop-blur-sm">
            <CardContent className="p-3">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-white">Cold</span>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-white">Mild</span>
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span className="text-white">Hot</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
