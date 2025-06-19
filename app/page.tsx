"use client"

import { useState } from "react"
import { ThemeProvider } from "@/contexts/ThemeContext"
import HomePage from "@/components/HomePage"
import MainLayout from "@/components/MainLayout"

export default function ChristianGraduationBook() {
  const [currentSection, setCurrentSection] = useState("home")

  if (currentSection === "home") {
    return (
      <ThemeProvider>
        <HomePage onEnterBook={() => setCurrentSection("book")} />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <MainLayout currentSection={currentSection} setCurrentSection={setCurrentSection} />
    </ThemeProvider>
  )
}
