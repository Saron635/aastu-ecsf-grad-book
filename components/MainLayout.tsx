"use client";

import Navigation from "@/components/Navigation";
import StudentsSection from "@/components/StudentsSection";
import JourneySection from "@/components/JourneySection";
import PrayerWallSection from "@/components/PrayerWallSection";
import { useTheme } from "@/contexts/ThemeContext";

interface MainLayoutProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

export default function MainLayout({
  currentSection,
  setCurrentSection,
}: MainLayoutProps) {
  const { isDark } = useTheme();
  const themeClasses = isDark
    ? "dark bg-gray-900 text-white"
    : "bg-gradient-to-br from-slate-50 via-white to-blue-50";

  return (
    <div className={`min-h-screen ${themeClasses}`}>
      <Navigation
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {currentSection === "book" && <StudentsSection />}
        {currentSection === "journey" && <JourneySection />}
        {currentSection === "prayers" && <PrayerWallSection />}
      </div>
    </div>
  );
}
