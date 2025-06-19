"use client";

import { Button } from "@/components/ui/button";
import {
  BookOpen,
  ChevronRight,
  GraduationCap,
  Cross,
  Sun,
  Moon,
  Globe,
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { translations } from "@/data/translations";

interface HomePageProps {
  onEnterBook: () => void;
}

export default function HomePage({ onEnterBook }: HomePageProps) {
  const { isDark, toggleTheme, language, toggleLanguage } = useTheme();
  const t = translations[language];
  const themeClasses = isDark
    ? "dark bg-gray-900 text-white"
    : "bg-gradient-to-br from-slate-50 via-white to-blue-50";

  return (
    <div className={`min-h-screen ${themeClasses}`}>
      {/* Theme and Language Controls */}
      <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50 flex gap-1 sm:gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          className={`h-8 w-8 sm:h-9 sm:w-9 ${
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
          className={`h-8 w-8 sm:h-9 sm:w-9 ${
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

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-10 left-5 sm:top-20 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 ${
            isDark ? "bg-blue-400/10" : "bg-blue-200/20"
          } rounded-full blur-xl animate-pulse`}
        ></div>
        <div
          className={`absolute top-20 right-10 sm:top-40 sm:right-20 w-12 h-12 sm:w-24 sm:h-24 ${
            isDark ? "bg-cyan-400/10" : "bg-cyan-200/20"
          } rounded-full blur-xl animate-pulse delay-1000`}
        ></div>
        <div
          className={`absolute bottom-10 left-1/4 sm:bottom-20 sm:left-1/3 w-20 h-20 sm:w-40 sm:h-40 ${
            isDark ? "bg-blue-500/10" : "bg-blue-300/20"
          } rounded-full blur-xl animate-pulse delay-2000`}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 text-center">
        {/* AASTU ECSF Logo */}
        <div className="mb-4 sm:mb-6 lg:mb-8 relative">
          <Image
            src="/aastu-logo.png"
            alt="AASTU ECSF Logo"
            width={200}
            height={100}
            className="mx-auto w-32 h-16 sm:w-40 sm:h-20 lg:w-48 lg:h-24 xl:w-56 xl:h-28"
          />
          <div className="absolute inset-0 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>

        {/* Main Title */}
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold ${
            isDark ? "text-white" : "text-gray-800"
          } mb-2 sm:mb-4 leading-tight ${
            language === "am" ? "font-serif" : ""
          }`}
        >
          {language === "en" ? "A Legacy of" : "የእምነት"}
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            {language === "en" ? " Faith" : "ውርስ"}
          </span>
        </h1>

        <div className="flex items-center gap-1 sm:gap-2 mb-4 sm:mb-6 lg:mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent w-8 sm:w-12 lg:w-20"></div>
          <p
            className={`text-sm sm:text-lg md:text-xl lg:text-2xl ${
              isDark ? "text-gray-300" : "text-gray-600"
            } font-light ${language === "am" ? "font-serif" : ""}`}
          >
            {t.subtitle}
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent w-8 sm:w-12 lg:w-20"></div>
        </div>

        {/* Scripture Verse */}
        <div
          className={`max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mb-6 sm:mb-8 lg:mb-12 p-3 sm:p-4 md:p-6 ${
            isDark ? "bg-gray-800/70" : "bg-white/70"
          } backdrop-blur-sm rounded-xl sm:rounded-2xl border ${
            isDark ? "border-gray-700/50" : "border-white/50"
          } shadow-xl`}
        >
          <p
            className={`text-sm sm:text-base md:text-lg lg:text-xl ${
              isDark ? "text-gray-200" : "text-gray-700"
            } font-serif italic leading-relaxed ${
              language === "am" ? "text-right" : ""
            }`}
          >
            {language === "en"
              ? '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, to give you hope and a future."'
              : '"እኔ ስለ እናንተ ያሰብኩት ሐሳብ አውቃለሁ ይላል እግዚአብሔር፣ የበደል ሳይሆን የሰላም ሐሳብ፣ የተስፋና የወደፊት ሐሳብ።"'}
          </p>
          <p className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent font-semibold mt-2 sm:mt-3 text-xs sm:text-sm md:text-base">
            {language === "en" ? "— Jeremiah 29:11" : "— ኤርምያስ 29፡11"}
          </p>
        </div>

        {/* CTA Button */}
        <Button
          onClick={onEnterBook}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
          {t.viewBook}
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
        </Button>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-2 sm:left-4 md:left-10 animate-bounce delay-1000">
          <GraduationCap
            className={`w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 ${
              isDark ? "text-blue-400/40" : "text-blue-400/60"
            }`}
          />
        </div>
        <div className="absolute top-1/3 right-2 sm:right-4 md:right-10 animate-bounce delay-2000">
          <Cross
            className={`w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 ${
              isDark ? "text-cyan-400/40" : "text-cyan-400/60"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
