"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { LoginDialog } from "@/components/login-dialog"
import { UserMenu } from "@/components/user-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/components/auth-provider"

export default function HomePage() {
  const [location, setLocation] = useState("Bangalore")
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { user } = useAuth()

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/doctors?location=${encodeURIComponent(location)}&specialty=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleServiceClick = (service: string) => {
    switch (service) {
      case "Consult with a doctor":
        router.push("/doctors?specialty=General Physician")
        break
      case "Order Medicines":
        alert("🚀 Medicine ordering feature coming soon! We'll deliver to your doorstep.")
        break
      case "View medical records":
        if (user) {
          alert(`📋 ${user.name}, your medical records feature is being prepared!`)
        } else {
          alert("Please login to view your medical records")
        }
        break
      case "Book test":
        alert("🧪 Lab test booking available! Home sample collection in 24 hours.")
        break
      case "Read articles":
        alert("📖 Health articles section coming soon! Stay tuned for expert tips.")
        break
      case "For healthcare providers":
        alert("🏥 Healthcare provider registration portal opening soon!")
        break
    }
  }

  const popularSearches = ["Dermatologist", "Pediatrician", "Gynecologist/Obstetrician", "Orthopedist"]

  const services = [
    { icon: "💬", title: "Consult with a doctor", desc: "Get expert medical advice" },
    { icon: "💊", title: "Order Medicines", desc: "Doorstep delivery" },
    { icon: "📋", title: "View medical records", desc: "Access your health data" },
    { icon: "🧪", title: "Book test", desc: "Lab tests at home", badge: "New" },
    { icon: "📖", title: "Read articles", desc: "Health tips & guides" },
    { icon: "🏥", title: "For healthcare providers", desc: "Join our network" },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">•practo•</div>
              <nav className="hidden md:flex space-x-8">
                <a
                  href="#"
                  className="text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-1 font-medium"
                >
                  Find Doctors
                </a>
                <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Video Consult
                </a>
                <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Surgeries
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">NEW</span>
                <span className="text-gray-700 dark:text-gray-300">For Corporates</span>
                <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-700 dark:text-gray-300">For Providers</span>
                <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-700 dark:text-gray-300">Security & help</span>
                <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
              <ThemeToggle />
              {user ? <UserMenu /> : <LoginDialog />}
            </div>
          </div>
        </div>
      </header>

      {/* Medical illustrations - same as before but with dark mode support */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Medical stethoscope illustration - left side */}
        <div className="absolute top-32 left-16 w-20 h-32 opacity-30 dark:opacity-20">
          <svg viewBox="0 0 100 150" className="w-full h-full text-blue-300 dark:text-blue-200 fill-current">
            <circle cx="20" cy="30" r="8" />
            <circle cx="20" cy="60" r="8" />
            <path d="M20 38 L20 52" stroke="currentColor" strokeWidth="3" fill="none" />
            <path d="M28 30 Q50 30 50 80 Q50 120 30 120" stroke="currentColor" strokeWidth="3" fill="none" />
            <circle cx="30" cy="120" r="12" />
          </svg>
        </div>

        {/* Medical pills - top right */}
        <div className="absolute top-20 right-32 w-16 h-16 opacity-25 dark:opacity-15">
          <svg viewBox="0 0 60 60" className="w-full h-full text-yellow-300 dark:text-yellow-200 fill-current">
            <ellipse cx="30" cy="30" rx="25" ry="15" />
            <rect x="5" y="25" width="50" height="10" fill="currentColor" opacity="0.7" />
          </svg>
        </div>

        {/* Medical cross - bottom left */}
        <div className="absolute bottom-32 left-32 w-12 h-12 opacity-30 dark:opacity-20">
          <svg viewBox="0 0 40 40" className="w-full h-full text-green-300 dark:text-green-200 fill-current">
            <rect x="15" y="5" width="10" height="30" />
            <rect x="5" y="15" width="30" height="10" />
          </svg>
        </div>

        {/* Heart icon - right side */}
        <div className="absolute top-1/2 right-20 w-14 h-14 opacity-25 dark:opacity-15">
          <svg viewBox="0 0 50 50" className="w-full h-full text-red-300 dark:text-red-200 fill-current">
            <path d="M25 45 C25 45 5 30 5 18 C5 12 9 8 15 8 C19 8 23 10 25 14 C27 10 31 8 35 8 C41 8 45 12 45 18 C45 30 25 45 25 45 Z" />
          </svg>
        </div>

        {/* Medical bag - top center */}
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-16 h-12 opacity-20 dark:opacity-15">
          <svg viewBox="0 0 60 45" className="w-full h-full text-orange-300 dark:text-orange-200 fill-current">
            <rect x="10" y="15" width="40" height="25" rx="3" />
            <rect x="20" y="10" width="20" height="8" rx="2" />
            <rect x="25" y="20" width="10" height="3" />
            <rect x="27" y="18" width="6" height="7" />
          </svg>
        </div>

        {/* Thermometer - bottom right */}
        <div className="absolute bottom-40 right-16 w-8 h-20 opacity-30 dark:opacity-20">
          <svg viewBox="0 0 30 80" className="w-full h-full text-red-300 dark:text-red-200 fill-current">
            <rect x="12" y="5" width="6" height="50" rx="3" />
            <circle cx="15" cy="65" r="10" />
            <rect x="13" y="10" width="4" height="45" fill="red" opacity="0.8" />
          </svg>
        </div>

        {/* DNA helix - left center */}
        <div className="absolute top-1/2 left-8 w-10 h-24 opacity-25 dark:opacity-15">
          <svg viewBox="0 0 40 100" className="w-full h-full text-purple-300 dark:text-purple-200 fill-current">
            <path
              d="M10 10 Q30 25 10 40 Q30 55 10 70 Q30 85 10 100"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M30 10 Q10 25 30 40 Q10 55 30 70 Q10 85 30 100"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        {/* Medical chart/clipboard - bottom center */}
        <div className="absolute bottom-20 left-1/3 w-12 h-16 opacity-25 dark:opacity-15">
          <svg viewBox="0 0 40 55" className="w-full h-full text-blue-200 dark:text-blue-100 fill-current">
            <rect x="5" y="8" width="30" height="40" rx="2" />
            <rect x="15" y="2" width="10" height="8" rx="2" />
            <line x1="10" y1="18" x2="30" y2="18" stroke="currentColor" strokeWidth="1" />
            <line x1="10" y1="25" x2="30" y2="25" stroke="currentColor" strokeWidth="1" />
            <line x1="10" y1="32" x2="25" y2="32" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">Your home for health</h1>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl mx-auto shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Find and Book</h2>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-3 flex-1">
                <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border-0 bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Location"
                />
              </div>
              <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-3 flex-2">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="border-0 bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Search doctors, clinics, hospitals, etc."
                />
              </div>
            </div>

            <div className="text-left">
              <span className="text-gray-600 dark:text-gray-400 text-sm mr-4">Popular searches:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(search)
                      handleSearch()
                    }}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 pb-20">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => handleServiceClick(service.title)}
              className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 dark:hover:bg-white/10 transition-all cursor-pointer"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-white font-semibold mb-2 relative">
                {service.title}
                {service.badge && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    {service.badge}
                  </span>
                )}
              </h3>
              <p className="text-white/80 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
