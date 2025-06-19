"use client";

import { Button } from "@/components/ui/button";
import { Users, Calendar, MessageCircle, Sun, Moon, Globe } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { translations } from "@/data/translations";

interface NavigationProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

export default function Navigation({
  currentSection,
  setCurrentSection,
}: NavigationProps) {
  const { isDark, toggleTheme, language, toggleLanguage } = useTheme();
  const t = translations[language];

  return (
    <nav
      className={`sticky top-0 z-50 ${
        isDark ? "bg-gray-900/90" : "bg-white/90"
      } backdrop-blur-md border-b ${
        isDark ? "border-gray-700/50" : "border-gray-200/50"
      } shadow-sm`}
    >
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/aastu-logo.png"
              alt="AASTU ECSF"
              width={120}
              height={40}
              className="h-6 w-auto sm:h-8 md:h-10"
            />
            <div
              className={`h-4 sm:h-6 w-px ${
                isDark ? "bg-gray-600" : "bg-gray-300"
              }`}
            ></div>
            <h1
              className={`text-sm sm:text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent ${
                language === "am" ? "font-serif" : ""
              }`}
            >
              {t.subtitle}
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex gap-1 sm:gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className={`h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 ${
                  isDark
                    ? "bg-gray-800 border-gray-600"
                    : "bg-white/80 backdrop-blur-sm"
                }`}
              >
                {isDark ? (
                  <Sun className="w-3 h-3 sm:w-4 sm:h-4" />
                ) : (
                  <Moon className="w-3 h-3 sm:w-4 sm:h-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className={`h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 ${
                  isDark
                    ? "bg-gray-800 border-gray-600"
                    : "bg-white/80 backdrop-blur-sm"
                }`}
              >
                <Globe className="w-3 h-3 sm:w-4 sm:h-4 mr-0 sm:mr-1" />
                <span className="hidden sm:inline">
                  {language === "en" ? "አማ" : "EN"}
                </span>
              </Button>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
              <button
                onClick={() => setCurrentSection("book")}
                className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm md:text-base ${
                  currentSection === "book"
                    ? `${
                        isDark
                          ? "bg-blue-900 text-blue-300"
                          : "bg-blue-100 text-blue-700"
                      }`
                    : `${
                        isDark
                          ? "text-gray-300 hover:text-blue-400"
                          : "text-gray-600 hover:text-blue-600"
                      }`
                }`}
              >
                <Users className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{t.students}</span>
              </button>
              <button
                onClick={() => setCurrentSection("journey")}
                className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm md:text-base ${
                  currentSection === "journey"
                    ? `${
                        isDark
                          ? "bg-blue-900 text-blue-300"
                          : "bg-blue-100 text-blue-700"
                      }`
                    : `${
                        isDark
                          ? "text-gray-300 hover:text-blue-400"
                          : "text-gray-600 hover:text-blue-600"
                      }`
                }`}
              >
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{t.journey}</span>
              </button>
              <button
                onClick={() => setCurrentSection("prayers")}
                className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm md:text-base ${
                  currentSection === "prayers"
                    ? `${
                        isDark
                          ? "bg-blue-900 text-blue-300"
                          : "bg-blue-100 text-blue-700"
                      }`
                    : `${
                        isDark
                          ? "text-gray-300 hover:text-blue-400"
                          : "text-gray-600 hover:text-blue-600"
                      }`
                }`}
              >
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{t.prayers}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
