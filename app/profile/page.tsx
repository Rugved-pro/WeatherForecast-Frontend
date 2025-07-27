"use client"

import { useState } from "react"
import { ChevronLeft, User, MapPin, Bell, Settings, Edit, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    location: "Dhaka, Bangladesh",
    phone: "+880 1234 567890",
  })

  const handleSave = () => {
    setIsEditing(false)
    // Save profile logic here
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
          <h1 className="text-xl font-semibold">Profile</h1>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant="outline"
          size="sm"
          className="border-gray-600 text-gray-300"
        >
          <Edit className="w-4 h-4 mr-2" />
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </header>

      <div className="p-6">
        {/* Profile Picture */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12" />
            </div>
            {isEditing && (
              <Button size="icon" className="absolute bottom-0 right-0 rounded-full bg-blue-500 hover:bg-blue-600">
                <Camera className="w-4 h-4" />
              </Button>
            )}
          </div>
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-gray-400">{profile.email}</p>
        </div>

        {/* Profile Information */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                {isEditing ? (
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                ) : (
                  <p className="text-white">{profile.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                {isEditing ? (
                  <Input
                    value={profile.email}
                    onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                ) : (
                  <p className="text-white">{profile.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                {isEditing ? (
                  <Input
                    value={profile.location}
                    onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-white">{profile.location}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                {isEditing ? (
                  <Input
                    value={profile.phone}
                    onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                ) : (
                  <p className="text-white">{profile.phone}</p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex space-x-4 mt-6">
                <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600">
                  Save Changes
                </Button>
                <Button onClick={() => setIsEditing(false)} variant="outline" className="border-gray-600 text-gray-300">
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/notifications">
                <Button variant="ghost" className="w-full justify-start text-left text-white hover:bg-gray-700">
                  <Bell className="w-5 h-5 mr-3 text-blue-400" />
                  Notification Preferences
                </Button>
              </Link>
              <Link href="/settings">
                <Button variant="ghost" className="w-full justify-start text-left text-white hover:bg-gray-700">
                  <Settings className="w-5 h-5 mr-3 text-green-400" />
                  App Settings
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start text-left text-red-400 text-white hover:bg-gray-700"
              >
                <User className="w-5 h-5 mr-3" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
