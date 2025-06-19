"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { translations } from "@/data/translations";

export default function PrayerWallSection() {
  const { isDark, language } = useTheme();
  const t = translations[language];

  const [prayerMessages, setPrayerMessages] = useState([
    {
      id: 1,
      name: "Anonymous",
      message:
        "Praying for God's blessings on your future endeavors in technology and ministry!",
      verse: "Philippians 4:13",
      likes: 12,
    },
    {
      id: 2,
      name: "Mrs. Smith",
      message:
        "May the Lord guide your steps as you use your skills to build His kingdom through innovation.",
      verse: "Psalm 23:1",
      likes: 8,
    },
  ]);
  const [newPrayer, setNewPrayer] = useState({
    name: "",
    message: "",
    verse: "",
  });

  const addPrayerMessage = () => {
    if (newPrayer.name && newPrayer.message) {
      setPrayerMessages([
        ...prayerMessages,
        {
          id: Date.now(),
          ...newPrayer,
          likes: 0,
        },
      ]);
      setNewPrayer({ name: "", message: "", verse: "" });
    }
  };

  const likePrayer = (id: number) => {
    setPrayerMessages(
      prayerMessages.map((msg) =>
        msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg
      )
    );
  };

  return (
    <div>
      <div className="text-center mb-4 sm:mb-6 md:mb-8">
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl font-bold ${
            isDark ? "text-white" : "text-gray-800"
          } mb-2 sm:mb-4 ${language === "am" ? "font-serif" : ""}`}
        >
          {t.prayerWallTitle}
        </h2>
        <p
          className={`${
            isDark ? "text-gray-300" : "text-gray-600"
          } max-w-xs sm:max-w-md md:max-w-2xl mx-auto text-sm sm:text-base ${
            language === "am" ? "font-serif" : ""
          }`}
        >
          {t.prayerWallSubtitle}
        </p>
      </div>

      {/* Add Prayer Form */}
      <Card
        className={`mb-4 sm:mb-6 md:mb-8 ${
          isDark
            ? "bg-gray-800/70 border-gray-700/50"
            : "bg-white/70 border-gray-200/50"
        } backdrop-blur-sm`}
      >
        <CardContent className="p-3 sm:p-4 md:p-6">
          <h3
            className={`text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 md:mb-4 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            {t.addBlessing}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
            <Input
              placeholder={t.yourName}
              value={newPrayer.name}
              onChange={(e) =>
                setNewPrayer({ ...newPrayer, name: e.target.value })
              }
              className={`text-sm sm:text-base ${
                isDark ? "bg-gray-700/50 border-gray-600" : ""
              }`}
            />
            <Input
              placeholder={t.bibleVerse}
              value={newPrayer.verse}
              onChange={(e) =>
                setNewPrayer({ ...newPrayer, verse: e.target.value })
              }
              className={`text-sm sm:text-base ${
                isDark ? "bg-gray-700/50 border-gray-600" : ""
              }`}
            />
          </div>
          <Textarea
            placeholder={t.prayerMessage}
            value={newPrayer.message}
            onChange={(e) =>
              setNewPrayer({ ...newPrayer, message: e.target.value })
            }
            className={`mb-2 sm:mb-3 md:mb-4 text-sm sm:text-base ${
              isDark ? "bg-gray-700/50 border-gray-600" : ""
            }`}
          />
          <Button
            onClick={addPrayerMessage}
            className="bg-blue-500 hover:bg-blue-600 text-sm sm:text-base"
          >
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            {t.shareBlessing}
          </Button>
        </CardContent>
      </Card>

      {/* Prayer Messages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        {prayerMessages.map((prayer) => (
          <Card
            key={prayer.id}
            className={`${
              isDark
                ? "bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-700/50"
                : "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200/50"
            } transform rotate-1 hover:rotate-0 transition-transform duration-300 shadow-lg`}
          >
            <CardContent className="p-2 sm:p-3 md:p-4">
              <div className="mb-2 sm:mb-3">
                <p
                  className={`${
                    isDark ? "text-gray-200" : "text-gray-700"
                  } leading-relaxed mb-1 sm:mb-2 text-sm sm:text-base ${
                    language === "am" ? "font-serif" : ""
                  }`}
                >
                  {prayer.message}
                </p>
                {prayer.verse && (
                  <p
                    className={`${
                      isDark ? "text-blue-300" : "text-blue-700"
                    } text-xs sm:text-sm italic`}
                  >
                    — {prayer.verse}
                  </p>
                )}
              </div>
              <div className="flex justify-between items-center">
                <p
                  className={`text-xs sm:text-sm font-medium ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  — {prayer.name}
                </p>
                <button
                  onClick={() => likePrayer(prayer.id)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors"
                >
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">{prayer.likes}</span>
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
