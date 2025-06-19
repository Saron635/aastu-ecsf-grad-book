// UNUSED: This component is no longer used in StudentsSection. Can be deleted if not used elsewhere.
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";

interface StudentCardProps {
  student: any;
  onSelect: (student: any) => void;
}

export default function StudentCard({ student, onSelect }: StudentCardProps) {
  const { isDark, language } = useTheme();

  return (
    <Card
      className={`group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
        isDark
          ? "bg-gray-700/50 border-gray-600/50"
          : "bg-white/70 border-gray-200/50"
      } backdrop-blur-sm`}
      onClick={() => onSelect(student)}
    >
      <CardContent className="p-4">
        <div className="text-center">
          <div className="relative mb-3">
            <Image
              src={student.image_urls[0] || "/placeholder.svg"}
              alt={student.name}
              width={100}
              height={100}
              className="rounded-full mx-auto border-4 border-white shadow-lg"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-400/20 to-transparent"></div>
          </div>
          <h3
            className={`text-lg font-bold ${
              isDark ? "text-white" : "text-gray-800"
            } mb-2 ${language === "am" ? "font-serif" : ""}`}
          >
            {student.name}
          </h3>
          <Badge
            variant="secondary"
            className={`${
              isDark ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-700"
            } mb-2 text-xs`}
          >
            {student.fieldOfStudy}
          </Badge>
          <p
            className={`text-xs ${
              isDark ? "text-gray-300" : "text-gray-600"
            } italic line-clamp-2 ${
              language === "am" ? "text-right font-serif" : ""
            }`}
          >
            {student.quote}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
