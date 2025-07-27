"use client"

import { useState } from "react"
import { ChevronLeft, Bell, Globe, Thermometer, Wind, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    locationServices: true,
    darkMode: true,
    autoRefresh: true,
    temperatureUnit: "celsius",
    windUnit: "kmh",
    language: "english",
  })

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
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
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* General Settings */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-white">General</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="font-medium text-white">Push Notifications</p>
                    <p className="text-sm text-gray-300">Receive weather alerts</p>
                  </div>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => updateSetting("notifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="font-medium text-white">Location Services</p>
                    <p className="text-sm text-gray-300">Auto-detect your location</p>
                  </div>
                </div>
                <Switch
                  checked={settings.locationServices}
                  onCheckedChange={(checked) => updateSetting("locationServices", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Moon className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="font-medium text-white">Dark Mode</p>
                    <p className="text-sm text-gray-300">Use dark theme</p>
                  </div>
                </div>
                <Switch checked={settings.darkMode} onCheckedChange={(checked) => updateSetting("darkMode", checked)} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Sun className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="font-medium text-white">Auto Refresh</p>
                    <p className="text-sm text-gray-300">Update weather automatically</p>
                  </div>
                </div>
                <Switch
                  checked={settings.autoRefresh}
                  onCheckedChange={(checked) => updateSetting("autoRefresh", checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Units */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-white">Units</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Thermometer className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="font-medium text-white">Temperature</p>
                    <p className="text-sm text-gray-300">Choose temperature unit</p>
                  </div>
                </div>
                <select
                  value={settings.temperatureUnit}
                  onChange={(e) => updateSetting("temperatureUnit", e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-sm"
                >
                  <option value="celsius">Celsius (°C)</option>
                  <option value="fahrenheit">Fahrenheit (°F)</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Wind className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="font-medium text-white">Wind Speed</p>
                    <p className="text-sm text-gray-300">Choose wind speed unit</p>
                  </div>
                </div>
                <select
                  value={settings.windUnit}
                  onChange={(e) => updateSetting("windUnit", e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-sm"
                >
                  <option value="kmh">km/h</option>
                  <option value="mph">mph</option>
                  <option value="ms">m/s</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Language */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-white">Language & Region</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Language</p>
                  <p className="text-sm text-gray-300">Choose your preferred language</p>
                </div>
                <select
                  value={settings.language}
                  onChange={(e) => updateSetting("language", e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-sm"
                >
                  <option value="english">English</option>
                  <option value="spanish">Español</option>
                  <option value="french">Français</option>
                  <option value="german">Deutsch</option>
                  <option value="bengali">বাংলা</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-white">About</h2>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Weather App v2.1.0</p>
              <p>© 2024 Weather Company</p>
              <div className="flex space-x-4 mt-4">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                  Privacy Policy
                </Button>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                  Terms of Service
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
