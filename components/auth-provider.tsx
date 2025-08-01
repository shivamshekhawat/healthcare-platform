"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  name: string
  email: string
  phone: string
  location: string
}

interface AuthContextType {
  user: User | null
  login: (credentials: { email: string; password: string }) => Promise<boolean>
  signup: (userData: {
    name: string
    email: string
    password: string
    phone: string
    location: string
  }) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("healthcare_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (credentials: { email: string; password: string }): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Dummy login - accept any email/password combination
    const userData: User = {
      name: "Shivam",
      email: credentials.email,
      phone: "+91 9876543210",
      location: "Bangalore",
    }

    setUser(userData)
    localStorage.setItem("healthcare_user", JSON.stringify(userData))
    setIsLoading(false)
    return true
  }

  const signup = async (userData: {
    name: string
    email: string
    password: string
    phone: string
    location: string
  }): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      name: userData.name || "Shivam",
      email: userData.email,
      phone: userData.phone,
      location: userData.location,
    }

    setUser(newUser)
    localStorage.setItem("healthcare_user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("healthcare_user")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
