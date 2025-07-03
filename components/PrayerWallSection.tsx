"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";
import { translations } from "@/data/translations";
import { PrayerForm } from "./PrayerForm";
import { PrayerCard } from "./PrayerCard";
import { PrayerMessage } from "@/models/PrayerMessage";
import usePrayerWall from "@/hooks/use-prayer-wall";

export default function PrayerWallSection() {
  const { isDark, language } = useTheme();
  const t = translations[language];
  const {
    prayerMessages,
    loading,
    formError,
    formLoading,
    newPrayer,
    setNewPrayer,
    handleSubmit,
    likePrayer,
  } = usePrayerWall();

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
          <PrayerForm
            values={newPrayer}
            onChange={setNewPrayer}
            onSubmit={handleSubmit}
            loading={formLoading}
            error={formError}
            isDark={isDark}
            t={t}
          />
        </CardContent>
      </Card>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {prayerMessages.length <= 0 ? (
            <div className="text-center text-gray-500">
              No Prayer Found, Check your internet
            </div>
          ) : (
            prayerMessages.map((prayer: PrayerMessage) => (
              <PrayerCard
                key={prayer.id}
                prayer={prayer}
                isDark={isDark}
                onLike={likePrayer}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
