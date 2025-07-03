"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { translations } from "@/data/translations";
import { supabase } from "@/lib/supabaseClient";

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
  const [loading, setLoading] = useState(true);
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    const fetchPrayers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("prayer_wall")
        .select("id, name, message, verse, likes")
        .order("id", { ascending: false });
      if (!error && data) {
        setPrayerMessages(data);
      }
      setLoading(false);
    };
    fetchPrayers();
  }, []);

  const validateForm = () => {
    if (!newPrayer.name.trim()) {
      setFormError("Name is required");
      return false;
    }
    if (!newPrayer.message.trim()) {
      setFormError("Message is required");
      return false;
    }
    setFormError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormLoading(true);
    await addPrayerMessage();
    setFormLoading(false);
  };

  const addPrayerMessage = async () => {
    if (newPrayer.name && newPrayer.message) {
      const { data, error } = await supabase
        .from("prayer_wall")
        .insert([{ ...newPrayer, likes: 0 }])
        .select();
      if (!error && data && data[0]) {
        setPrayerMessages([data[0], ...prayerMessages]);
        setNewPrayer({ name: "", message: "", verse: "" });
      } else if (error) {
        setFormError(error.message || "Failed to submit prayer");
      }
    }
  };

  const likePrayer = async (row_id: number) => {
    // Increment likes using the RPC and then update the local state
    const { data: rpcData, error: rpcError } = await supabase.rpc("increment_likes", {
      row_id,
    });

    if (rpcError) {
      console.error(rpcError);
      return;
    }

    const { data, error } = await supabase
      .from("prayer_wall")
      .select("id, likes")
      .eq("id", row_id);

    if (!error && data && data[0]) {
      setPrayerMessages(
      prayerMessages.map((msg) =>
        msg.id === row_id ? { ...msg, likes: data[0].likes } : msg
      )
      );
    }

    if (!error && data && data[0]) {
      setPrayerMessages(
        prayerMessages.map((msg) =>
          msg.id === row_id ? { ...msg, likes: data[0].likes } : msg
        )
      );
    }
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
      <form onSubmit={handleSubmit}>
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
                } ${
                  formError && !newPrayer.name.trim() ? "border-red-500" : ""
                }`}
                disabled={formLoading}
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
                disabled={formLoading}
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
              } ${
                formError && !newPrayer.message.trim() ? "border-red-500" : ""
              }`}
              disabled={formLoading}
            />
            {formError && (
              <div className="text-red-500 text-xs mb-2">{formError}</div>
            )}
            <Button
              type="submit"
              disabled={formLoading}
              className="bg-blue-500 hover:bg-blue-600 text-sm sm:text-base flex items-center"
            >
              {formLoading ? (
                <span className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              )}
              {formLoading ? "Submitting..." : t.shareBlessing}
            </Button>
          </CardContent>
        </Card>
      </form>

      {/* Prayer Messages */}
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
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
      )}
    </div>
  );
}
