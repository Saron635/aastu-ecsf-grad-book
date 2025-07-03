"use client";

import { useState } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import HomePage from "@/components/HomePage";
import MainLayout from "@/components/MainLayout";
import { QueryClient, QueryClientProvider } from "react-query";

export default function ChristianGraduationBook() {
  const [currentSection, setCurrentSection] = useState("home");
  const [queryClient] = useState(() => new QueryClient());

  if (currentSection === "home") {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <HomePage onEnterBook={() => setCurrentSection("book")} />
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MainLayout
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
