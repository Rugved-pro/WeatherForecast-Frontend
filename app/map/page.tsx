"use client"

import { useState } from "react"
import { ChevronLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { GlobalMap } from "@/components/global-map"

const mapLayers = [
  { id: "temperature", label: "Temperature", active: true },
  { id: "precipitation", label: "Precipitation", active: false },
  { id: "wind", label: "Wind", active: false },
  { id: "clouds", label: "Clouds", active: false },
]

export default function MapPage() {
  const [activeLayers, setActiveLayers] = useState(["temperature"])
  const [searchQuery, setSearchQuery] = useState("")

  const toggleLayer = (layerId: string) => {
    setActiveLayers((prev) => (prev.includes(layerId) ? prev.filter((id) => id !== layerId) : [...prev, layerId]))
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
          <h1 className="text-xl font-semibold">Global Weather Map</h1>
        </div>

        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location..."
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-full"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent rounded-full px-6">
            Share Map
          </Button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 p-4">
          <h2 className="text-lg font-semibold mb-4 text-white">Map Layers</h2>

          <div className="space-y-3 mb-6">
            {mapLayers.map((layer) => (
              <div key={layer.id} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id={layer.id}
                  checked={activeLayers.includes(layer.id)}
                  onChange={() => toggleLayer(layer.id)}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <label htmlFor={layer.id} className="text-sm font-medium text-white">
                  {layer.label}
                </label>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-4 text-white">Weather Information</h3>
          <div className="space-y-3">
            <Card className="bg-gray-700 border-gray-600">
              <CardContent className="p-3">
                <div className="text-sm">
                  <p className="font-medium mb-1 text-white">Current Layer: Temperature</p>
                  <p className="text-gray-300">Showing global temperature distribution</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          <GlobalMap />
        </div>
      </div>
    </div>
  )
}
