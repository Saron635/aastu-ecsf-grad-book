"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Cross, Star } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { translations } from "@/data/translations";

interface StudentModalProps {
  student: any;
  onClose: () => void;
}

export default function StudentModal({ student, onClose }: StudentModalProps) {
  const { isDark, language } = useTheme();
  const t = translations[language];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent
        className={`max-w-[95vw] sm:max-w-4xl lg:max-w-6xl max-h-[90vh] overflow-y-auto ${
          isDark ? "bg-gray-800 border-gray-700" : ""
        }`}
      >
        <DialogHeader>
          <DialogTitle
            className={`text-xl sm:text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent ${
              language === "am" ? "font-serif" : ""
            }`}
          >
            {student.name}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Left Side - Images */}
          <div className="space-y-3 sm:space-y-4">
            <div className="relative">
              <Image
                src={
                  student.image_urls[currentImageIndex] || "/placeholder.svg"
                }
                alt={`${student.name} - Image ${currentImageIndex + 1}`}
                width={500}
                height={400}
                className="rounded-lg w-full h-48 sm:h-64 md:h-80 object-cover shadow-lg"
              />
              {student.image_urls.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between p-2 sm:p-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentImageIndex(Math.max(0, currentImageIndex - 1))
                    }
                    disabled={currentImageIndex === 0}
                    className={`h-8 w-8 sm:h-9 sm:w-9 ${
                      isDark ? "bg-gray-800/80" : "bg-white/80"
                    } backdrop-blur-sm`}
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentImageIndex(
                        Math.min(
                          student.image_urls.length - 1,
                          currentImageIndex + 1
                        )
                      )
                    }
                    disabled={
                      currentImageIndex === student.image_urls.length - 1
                    }
                    className={`h-8 w-8 sm:h-9 sm:w-9 ${
                      isDark ? "bg-gray-800/80" : "bg-white/80"
                    } backdrop-blur-sm`}
                  >
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              )}
            </div>
            {student.image_urls.length > 1 && (
              <div className="flex gap-1 sm:gap-2 justify-center">
                {student.image_urls.map((_: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? "border-blue-500 scale-110"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={student.image_urls[index] || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Information */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <div>
              <h4
                className={`font-semibold text-sm sm:text-base md:text-lg ${
                  isDark ? "text-gray-200" : "text-gray-800"
                } mb-2 sm:mb-3`}
              >
                {t.personalQuote}
              </h4>
              <p
                className={`text-sm sm:text-base md:text-lg font-medium text-blue-700 italic ${
                  language === "am" ? "text-right font-serif" : ""
                }`}
              >
                "{student.quote}"
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
