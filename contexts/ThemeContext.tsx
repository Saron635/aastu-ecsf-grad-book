"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ThemeContextType {
  isDark: boolean
  toggleTheme: () => void
  language: "en" | "am"
  toggleLanguage: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true) // Default to dark theme
  const [language, setLanguage] = useState<"en" | "am">("en")

  const toggleTheme = () => setIsDark(!isDark)
  const toggleLanguage = () => setLanguage(language === "en" ? "am" : "en")

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, language, toggleLanguage }}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
