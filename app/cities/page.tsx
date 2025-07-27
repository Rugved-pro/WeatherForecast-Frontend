import { ChevronLeft, Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const cities = [
  { country: "United States", city: "New York", temp: 22, condition: "Sunny", region: "North America" },
  { country: "United States", city: "Los Angeles", temp: 28, condition: "Partly Cloudy", region: "North America" },
  { country: "United Kingdom", city: "London", temp: 15, condition: "Cloudy", region: "Europe" },
  { country: "France", city: "Paris", temp: 18, condition: "Rainy", region: "Europe" },
  { country: "Japan", city: "Tokyo", temp: 25, condition: "Sunny", region: "Asia" },
  { country: "China", city: "Beijing", temp: 19, condition: "Cloudy", region: "Asia" },
  { country: "Australia", city: "Sydney", temp: 24, condition: "Partly Cloudy", region: "Oceania" },
  { country: "Brazil", city: "São Paulo", temp: 26, condition: "Rainy", region: "South America" },
  { country: "India", city: "Mumbai", temp: 32, condition: "Hot", region: "Asia" },
  { country: "Germany", city: "Berlin", temp: 16, condition: "Cloudy", region: "Europe" },
  { country: "Canada", city: "Toronto", temp: 20, condition: "Sunny", region: "North America" },
  { country: "Russia", city: "Moscow", temp: 12, condition: "Cold", region: "Europe" },
]

const regions = ["All", "North America", "Europe", "Asia", "Oceania", "South America", "Africa"]

export default function CitiesPage() {
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
          <h1 className="text-xl font-semibold">World Cities Weather</h1>
        </div>
      </header>

      <div className="p-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search cities..."
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Region Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {regions.map((region) => (
            <Button
              key={region}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              {region}
            </Button>
          ))}
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cities.map((city, index) => (
            <Card
              key={index}
              className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <div>
                      <h3 className="font-semibold text-white">{city.city}</h3>
                      <p className="text-xs text-gray-300">{city.country}</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-white">{city.temp}°</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">{city.condition}</span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded text-white">{city.region}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
