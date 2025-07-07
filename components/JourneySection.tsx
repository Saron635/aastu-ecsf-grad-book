"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { translations } from "@/data/translations";
import { journeySteps } from "@/data/journeyData";
import { useState } from "react";
import JourneyImageModal from "./ImageModal";

export default function JourneySection() {
  const { isDark, language } = useTheme();
  const t = translations[language];
  const journey = journeySteps[language];

  const [modalImages, setModalImages] = useState<string[] | null>(null);
  const [fullscreenStartIndex, setFullscreenStartIndex] = useState(0);

  return (
    <div>
      <div className="text-center mb-6 sm:mb-8 md:mb-12">
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl font-bold ${
            isDark ? "text-white" : "text-gray-800"
          } mb-2 sm:mb-4 ${language === "am" ? "font-serif" : ""}`}
        >
          {t.ourJourneyTitle}
        </h2>
        <p
          className={`${
            isDark ? "text-gray-300" : "text-gray-600"
          } max-w-xs sm:max-w-md md:max-w-2xl mx-auto text-sm sm:text-base ${
            language === "am" ? "font-serif" : ""
          }`}
        >
          {t.journeySubtitle}
        </p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div
          className={`absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-0.5 ${
            isDark ? "bg-blue-400/30" : "bg-blue-400/50"
          }`}
        ></div>

        {journey.map((step, index) => (
          <div
            key={index}
            className="relative flex items-start mb-6 sm:mb-8 md:mb-12"
          >
            {/* Timeline Dot */}
            <div
              className={`relative z-10 flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 ${
                isDark ? "bg-blue-900" : "bg-blue-500"
              } rounded-full border-2 sm:border-4 ${
                isDark ? "border-gray-800" : "border-white"
              } shadow-lg`}
            >
              <span className="text-white font-bold text-xs sm:text-sm md:text-base">
                {step.year}
              </span>
            </div>

            {/* Content */}
            <div className="ml-3 sm:ml-4 md:ml-6 lg:ml-8 flex-1">
              <Card
                className={`${
                  isDark
                    ? "bg-gray-800/70 border-gray-700/50"
                    : "bg-white/70 border-gray-200/50"
                } backdrop-blur-sm hover:shadow-xl transition-all duration-300`}
              >
                <CardContent className="p-3 sm:p-4 md:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    <div className="lg:col-span-2">
                      <h3
                        className={`text-lg sm:text-xl md:text-2xl font-bold ${
                          isDark ? "text-white" : "text-gray-800"
                        } mb-2 sm:mb-3 ${
                          language === "am" ? "font-serif" : ""
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`${
                          isDark ? "text-gray-300" : "text-gray-600"
                        } mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base ${
                          language === "am" ? "font-serif" : ""
                        }`}
                      >
                        {step.description}
                      </p>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {step.achievements.map((achievement, achIndex) => (
                          <Badge
                            key={achIndex}
                            variant="secondary"
                            className={`text-xs sm:text-sm ${
                              isDark
                                ? "bg-blue-900/50 text-blue-300"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="relative group">
                      {step.images.length > 0 && (
                        <>
                          <Image
                            src={step.images[0] || "/placeholder.svg"}
                            alt={step.title}
                            width={300}
                            height={200}
                            className="rounded-lg w-full h-32 sm:h-40 md:h-48 object-cover shadow-md cursor-pointer"
                            onClick={() => {
                              setModalImages(step.images);
                              setFullscreenStartIndex(0);
                            }}
                          />
                          <div
                            className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background:
                                "linear-gradient(to top, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0) 100%)",
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>

      <JourneyImageModal
        setFullscreenImages={setModalImages}
        fullscreenImages={modalImages}
        fullscreenStartIndex={fullscreenStartIndex}
      />
    </div>
  );
}
