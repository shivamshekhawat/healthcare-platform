import { type NextRequest, NextResponse } from "next/server"

// Mock data for doctors
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location") || ""
    const specialty = searchParams.get("specialty") || ""

    // Filter doctors based on location and specialty
    let filteredDoctors = mockDoctors

    if (specialty && specialty.toLowerCase() !== "all") {
      filteredDoctors = filteredDoctors.filter((doctor) =>
        doctor.specialty.toLowerCase().includes(specialty.toLowerCase()),
      )
    }

    if (location && location.toLowerCase() !== "all") {
      filteredDoctors = filteredDoctors.filter((doctor) =>
        doctor.location.toLowerCase().includes(location.toLowerCase()),
      )
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(filteredDoctors)
  } catch (error) {
    console.error("Error in doctors API:", error)
    return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 })
  }
}
