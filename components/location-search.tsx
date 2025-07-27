"use client"

import { useState, useEffect } from "react"
import { MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { WeatherService } from "@/lib/weather-service"

interface LocationSearchProps {
  onLocationSelect: (location: string) => void
  currentLocation: string
}

export function LocationSearch({ onLocationSelect, currentLocation }: LocationSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (searchQuery.length > 2) {
      searchCities()
    } else {
      setSuggestions([])
    }
  }, [searchQuery])

  const searchCities = async () => {
    setLoading(true)
    try {
      const results = await WeatherService.searchCities(searchQuery)
      setSuggestions(results)
    } catch (error) {
      console.error("Error searching cities:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLocationSelect = (location: string) => {
    onLocationSelect(location)
    setIsOpen(false)
    setSearchQuery("")
    setSuggestions([])
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 hover:bg-gray-800"
      >
        <MapPin className="w-4 h-4 text-gray-400" />
        <span className="text-sm max-w-32 truncate">{currentLocation}</span>
      </Button>

      {isOpen && (
        <Card className="absolute top-full left-0 mt-2 w-80 bg-gray-800 border-gray-700 z-50">
          <CardContent className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a city..."
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                autoFocus
              />
            </div>

            {loading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400 mx-auto"></div>
              </div>
            )}

            {suggestions.length > 0 && (
              <div className="space-y-2">
                {suggestions.map((city, index) => (
                  <button
                    key={index}
                    onClick={() => handleLocationSelect(city)}
                    className="w-full text-left p-2 hover:bg-gray-700 rounded flex items-center space-x-2"
                  >
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-white">{city}</span>
                  </button>
                ))}
              </div>
            )}

            {searchQuery.length > 2 && suggestions.length === 0 && !loading && (
              <p className="text-white text-sm py-4 text-center">No cities found</p>
            )}

            {/* Popular Cities */}
            {searchQuery.length === 0 && (
              <div>
                <h4 className="text-sm font-medium text-white mb-2">Popular Cities</h4>
                <div className="space-y-2">
                  {["Mumbai, India", "Delhi, India", "New York, US", "London, UK", "Tokyo, Japan"].map((city) => (
                    <button
                      key={city}
                      onClick={() => handleLocationSelect(city)}
                      className="w-full text-left p-2 hover:bg-gray-700 rounded flex items-center space-x-2"
                    >
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span className="text-white">{city}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  )
}
