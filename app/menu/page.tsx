import { Grid3X3, Home, Map, Bell, Settings, User, Cloud, Sun, Wind, Droplets, Eye, Thermometer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const menuItems = [
  { icon: Home, label: "Home", href: "/", color: "text-blue-400" },
  { icon: Map, label: "Weather Map", href: "/map", color: "text-green-400" },
  { icon: Cloud, label: "Forecast", href: "/forecast", color: "text-gray-400" },
  { icon: Sun, label: "UV Index", href: "/uv-index", color: "text-yellow-400" },
  { icon: Wind, label: "Wind", href: "/wind", color: "text-cyan-400" },
  { icon: Droplets, label: "Humidity", href: "/humidity", color: "text-blue-500" },
  { icon: Eye, label: "Visibility", href: "/visibility", color: "text-purple-400" },
  { icon: Thermometer, label: "Temperature", href: "/temperature", color: "text-red-400" },
  { icon: Bell, label: "Alerts", href: "/notifications", color: "text-orange-400" },
  { icon: Settings, label: "Settings", href: "/settings", color: "text-gray-300" },
  { icon: User, label: "Profile", href: "/profile", color: "text-pink-400" },
]

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Menu</h1>
          <Link href="/">
            <Button variant="ghost" size="icon">
              <Grid3X3 className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <item.icon className={`w-8 h-8 mx-auto mb-3 ${item.color}`} />
                  <p className="text-sm font-medium">{item.label}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
