"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Search, MapPin, ChevronDown, Clock, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoginDialog } from "@/components/login-dialog"
import { UserMenu } from "@/components/user-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/components/auth-provider"

interface Doctor {
  id: string
  name: string
  specialty: string
  experience: string
  location: string
  clinic: string
  consultationFee: number
  rating: number
  patientStories: number
  image: string
  availability: string
  isAvailableToday: boolean
}

export default function DoctorsPage() {
  const searchParams = useSearchParams()
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState(searchParams.get("location") || "JP Nagar")
  const [specialty, setSpecialty] = useState(searchParams.get("specialty") || "Dermatologist")
  const { user } = useAuth()

  const [filters, setFilters] = useState({
    gender: "All",
    experience: "All",
    sortBy: "Relevance",
  })

  useEffect(() => {
    fetchDoctors()
  }, [location, specialty])

  const fetchDoctors = async () => {
    try {
      setLoading(true)
      // Simulate fetching doctors from an API
      await new Promise((resolve) => setTimeout(resolve, 500))
      setDoctors(mockDoctors)
    } catch (error) {
      console.error("Error fetching doctors:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    fetchDoctors()
  }

  const handleBookAppointment = (doctorName: string) => {
    if (user) {
      alert(
        `🎉 Great choice ${user.name}! Booking appointment with ${doctorName}. You'll receive a confirmation SMS shortly.`,
      )
    } else {
      alert("Please login to book an appointment")
    }
  }

  const handleContactClinic = (doctorName: string) => {
    alert(`📞 Connecting you to ${doctorName}'s clinic. Phone: +91 80-XXXX-XXXX`)
  }

  const mockDoctors = [
    {
      id: "1",
      name: "Aesthetic Heart Dermatology & Cardiology Clinic",
      specialty: "Dermatologist",
      experience: "11 - 13 years experience",
      location: "Jayanagar",
      clinic: "Aesthetic Heart Dermatology & Cardiology Clinic",
      consultationFee: 800,
      rating: 97,
      patientStories: 159,
      image: "/placeholder.svg?height=100&width=100&text=AH&bg=f0f9ff",
      availability: "Available Today",
      isAvailableToday: true,
    },
    {
      id: "2",
      name: "Dr. Sheelavathi Natraj",
      specialty: "Dermatologist",
      experience: "21 years experience overall",
      location: "JP Nagar,Bangalore",
      clinic: "Sapphire Skin And Aesthetics Clinic + 1 more",
      consultationFee: 800,
      rating: 94,
      patientStories: 1506,
      image: "/placeholder.svg?height=100&width=100&text=Dr.SN&bg=fef3c7",
      availability: "Available Today",
      isAvailableToday: true,
    },
    {
      id: "3",
      name: "Dr. Rajesh Kumar",
      specialty: "Dermatologist",
      experience: "15 years experience overall",
      location: "JP Nagar,Bangalore",
      clinic: "Skin Care Clinic",
      consultationFee: 600,
      rating: 92,
      patientStories: 890,
      image: "/placeholder.svg?height=100&width=100&text=Dr.RK&bg=dcfce7",
      availability: "Available Tomorrow",
      isAvailableToday: false,
    },
    {
      id: "4",
      name: "Dr. Priya Sharma",
      specialty: "Dermatologist",
      experience: "8 years experience overall",
      location: "JP Nagar,Bangalore",
      clinic: "Advanced Dermatology Center",
      consultationFee: 700,
      rating: 95,
      patientStories: 654,
      image: "/placeholder.svg?height=100&width=100&text=Dr.PS&bg=fce7f3",
      availability: "Available Today",
      isAvailableToday: true,
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse">
          <div className="bg-white dark:bg-gray-800 h-16 mb-4"></div>
          <div className="bg-blue-600 h-16 mb-8"></div>
          <div className="max-w-7xl mx-auto px-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-4 h-48"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">•practo•</div>
              <nav className="hidden md:flex space-x-8">
                <a
                  href="/"
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
              <ThemeToggle />
              {user ? <UserMenu /> : <LoginDialog />}
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-3 flex-1">
              <MapPin className="w-5 h-5 text-gray-400 mr-3" />
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-0 bg-transparent dark:text-gray-300"
                placeholder="Location"
              />
            </div>
            <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-3 flex-2">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <Input
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="border-0 bg-transparent dark:text-gray-300"
                placeholder="Search specialty"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-blue-600 dark:bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-200">
              <span>Gender</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-200">
              <span>Patient Stories</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-200">
              <span>Experience</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-200">
              <span>All Filters</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="ml-auto flex items-center space-x-2 cursor-pointer hover:text-blue-200">
              <span>Sort By</span>
              <span className="font-medium">Relevance</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {doctors.length} {specialty}s available in {location}, Bangalore
          </h1>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <div className="w-6 h-6 rounded-full border-2 border-green-500 flex items-center justify-center mr-2">
              <div className="w-3 h-3 text-green-500">✓</div>
            </div>
            <span>Book appointments with minimum wait-time & verified doctor details</span>
          </div>
        </div>

        <div className="space-y-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6 doctor-card"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-1">{doctor.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">{doctor.specialty}</p>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">{doctor.experience}</p>
                      <p className="text-gray-800 dark:text-gray-200 font-medium mb-2">
                        {doctor.location} • {doctor.clinic}
                      </p>
                      <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                        ₹{doctor.consultationFee} Consultation fee at clinic
                      </p>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <div className="bg-green-500 text-white px-2 py-1 rounded text-sm font-medium rating-badge">
                            👍 {doctor.rating}%
                          </div>
                        </div>
                        <button className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 underline">
                          {doctor.patientStories} Patient Stories
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-3 mt-4 lg:mt-0 lg:ml-6">
                      {doctor.isAvailableToday && (
                        <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          Available Today
                        </div>
                      )}
                      <Button
                        onClick={() => handleBookAppointment(doctor.name)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2"
                      >
                        Book Clinic Visit
                        <div className="text-xs">No Booking Fee</div>
                      </Button>
                      <Button
                        onClick={() => handleContactClinic(doctor.name)}
                        variant="outline"
                        className="text-blue-500 border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 bg-transparent"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Contact Clinic
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
