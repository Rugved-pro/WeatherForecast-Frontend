export class WeatherService {
  private static readonly API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "demo_key"
  private static readonly BASE_URL = "https://api.openweathermap.org/data/2.5"

  // For demo purposes, we'll use mock data that simulates real API responses
  private static mockWeatherData: { [key: string]: any } = {
    "Mumbai, India": {
      current: {
        temp: 32,
        feels_like: 34,
        humidity: 70,
        description: "clear sky",
        sunrise: Math.floor(Date.now() / 1000) - 3600,
        sunset: Math.floor(Date.now() / 1000) + 7200,
      },
      forecast: [
        { dt: Date.now() / 1000, temp: { max: 32, min: 27 }, weather: [{ description: "clear sky" }] },
        { dt: Date.now() / 1000 + 86400, temp: { max: 30, min: 25 }, weather: [{ description: "few clouds" }] },
        { dt: Date.now() / 1000 + 172800, temp: { max: 29, min: 24 }, weather: [{ description: "scattered clouds" }] },
        { dt: Date.now() / 1000 + 259200, temp: { max: 31, min: 26 }, weather: [{ description: "shower rain" }] },
        { dt: Date.now() / 1000 + 345600, temp: { max: 28, min: 23 }, weather: [{ description: "rain" }] },
        { dt: Date.now() / 1000 + 432000, temp: { max: 33, min: 28 }, weather: [{ description: "clear sky" }] },
      ],
    },
    "California, US": {
      current: { temp: 29, feels_like: 31, humidity: 55, description: "few clouds" },
    },
    "Beijing, China": {
      current: { temp: 19, feels_like: 17, humidity: 80, description: "broken clouds" },
    },
    "Dhaka, Bangladesh": {
      current: { temp: 32, feels_like: 35, humidity: 75, description: "clear sky" },
    },
    "London, UK": {
      current: { temp: 15, feels_like: 13, humidity: 85, description: "rain" },
    },
    "New York, US": {
      current: { temp: 22, feels_like: 24, humidity: 60, description: "scattered clouds" },
    },
    "Tokyo, Japan": {
      current: { temp: 25, feels_like: 27, humidity: 65, description: "few clouds" },
    },
    "Sydney, Australia": {
      current: { temp: 24, feels_like: 26, humidity: 70, description: "clear sky" },
    },
  }

  static async getCurrentWeather(location: string) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Check if we have mock data for this location
    const mockData = this.mockWeatherData[location] || this.mockWeatherData["Mumbai, India"]

    // Add some randomization to make it feel more real
    const temp = mockData.current.temp + (Math.random() - 0.5) * 4
    const feels_like = mockData.current.feels_like + (Math.random() - 0.5) * 4

    return {
      ...mockData.current,
      temp: Math.round(temp),
      feels_like: Math.round(feels_like),
      location: location,
    }
  }

  static async getForecast(location: string) {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const mockData = this.mockWeatherData[location] || this.mockWeatherData["Mumbai, India"]

    // Generate 7-day forecast with some randomization
    return Array.from({ length: 7 }, (_, i) => {
      const baseTemp = 30 + (Math.random() - 0.5) * 10
      const variation = (Math.random() - 0.5) * 6

      return {
        dt: Date.now() / 1000 + i * 86400,
        temp: {
          max: Math.round(baseTemp + Math.abs(variation)),
          min: Math.round(baseTemp - Math.abs(variation)),
        },
        weather: [
          {
            description: ["clear sky", "few clouds", "scattered clouds", "broken clouds", "shower rain"][
              Math.floor(Math.random() * 5)
            ],
          },
        ],
      }
    })
  }

  static async getMultipleCitiesWeather(cities: string[]) {
    await new Promise((resolve) => setTimeout(resolve, 400))

    return cities.map((city) => {
      const [cityName, country] = city.split(", ")
      const mockData = this.mockWeatherData[city] || this.mockWeatherData["Mumbai, India"]

      return {
        name: cityName,
        country: country,
        temp: mockData.current.temp + (Math.random() - 0.5) * 6,
        description: mockData.current.description,
      }
    })
  }

  static async searchCities(query: string) {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const allCities = [
      "Mumbai, India",
      "Delhi, India",
      "Bangalore, India",
      "Chennai, India",
      "Kolkata, India",
      "New York, US",
      "Los Angeles, US",
      "Chicago, US",
      "London, UK",
      "Paris, France",
      "Berlin, Germany",
      "Tokyo, Japan",
      "Beijing, China",
      "Shanghai, China",
      "Sydney, Australia",
      "Melbourne, Australia",
      "Toronto, Canada",
      "Vancouver, Canada",
      "São Paulo, Brazil",
      "Rio de Janeiro, Brazil",
    ]

    return allCities.filter((city) => city.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
  }
}
