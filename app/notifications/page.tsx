import { ChevronLeft, Bell, AlertTriangle, Info, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const notifications = [
  {
    id: 1,
    type: "warning",
    title: "Heavy Rain Alert",
    message: "Heavy rainfall expected in your area from 3 PM to 8 PM today.",
    time: "2 hours ago",
    location: "Dhaka, Bangladesh",
  },
  {
    id: 2,
    type: "info",
    title: "Temperature Drop",
    message: "Temperature will drop by 5°C tomorrow morning.",
    time: "4 hours ago",
    location: "Dhaka, Bangladesh",
  },
  {
    id: 3,
    type: "success",
    title: "Clear Skies Ahead",
    message: "Perfect weather conditions for outdoor activities this weekend.",
    time: "1 day ago",
    location: "Dhaka, Bangladesh",
  },
  {
    id: 4,
    type: "warning",
    title: "High UV Index",
    message: "UV index will reach dangerous levels. Use sun protection.",
    time: "2 days ago",
    location: "Dhaka, Bangladesh",
  },
]

const getIcon = (type: string) => {
  switch (type) {
    case "warning":
      return <AlertTriangle className="w-5 h-5 text-yellow-400" />
    case "info":
      return <Info className="w-5 h-5 text-blue-400" />
    case "success":
      return <CheckCircle className="w-5 h-5 text-green-400" />
    default:
      return <Bell className="w-5 h-5 text-gray-400" />
  }
}

export default function NotificationsPage() {
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
          <h1 className="text-xl font-semibold">Notifications</h1>
        </div>
        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
          Mark All Read
        </Button>
      </header>

      <div className="p-6">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">{getIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-white">{notification.title}</h3>
                      <span className="text-xs text-gray-300">{notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{notification.message}</p>
                    <p className="text-xs text-gray-400">{notification.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 mx-auto mb-4 text-gray-600" />
            <h3 className="text-lg font-medium text-white mb-2">No notifications</h3>
            <p className="text-gray-400">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  )
}
