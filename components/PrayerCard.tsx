import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface PrayerMessage {
  id: number;
  name: string;
  message: string;
  verse: string;
  likes: number;
}

export interface PrayerCardProps {
  prayer: PrayerMessage;
  isDark: boolean;
  onLike: (id: number) => void;
}

export function PrayerCard({
  isDark,
  prayer: { id, name, message, verse, likes },
  onLike,
}: PrayerCardProps) {
  return (
    <Card
      className={
        "dark:bg-gradient-to-br dark:from-blue-900/50 dark:to-cyan-900/50 dark:border-blue-700/50 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200/50 transform rotate-1 hover:rotate-0 transition-transform duration-300 shadow-lg"
      }
    >
      <CardContent className="p-2 sm:p-3 md:p-4">
        <div className="mb-2 sm:mb-3">
          <p
            className={`$ {
                            isDark ? "text-gray-200" : "text-gray-700"
                        } leading-relaxed mb-1 sm:mb-2 text-sm sm:text-base $ {
                            language === "am" ? "font-serif" : ""
                        }`}
          >
            {message}
          </p>
          {verse && (
            <p
              className={`$ {
                                isDark ? "text-blue-300" : "text-blue-700"
                            } text-xs sm:text-sm italic`}
            >
              — {verse}
            </p>
          )}
        </div>
        <div className="flex justify-between items-center">
          <p
            className={`text-xs sm:text-sm font-medium ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            — {name === "" ? "Anonymous": name}
          </p>
          <button
            onClick={() => onLike(id)}
            className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors"
          >
            <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">{likes}</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
