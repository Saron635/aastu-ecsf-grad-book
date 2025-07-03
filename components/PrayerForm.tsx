import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export interface PrayerFormValues {
  name: string;
  message: string;
  verse: string;
}

interface PrayerFormProps {
  values: PrayerFormValues;
  onChange: (values: PrayerFormValues) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string;
  isDark: boolean;
  t: any;
}

export function PrayerForm({
  values,
  onChange,
  onSubmit,
  loading,
  error,
  isDark,
  t,
}: PrayerFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
        <Input
          placeholder={t.yourName}
          value={values.name}
          onChange={(e) => onChange({ ...values, name: e.target.value })}
          className={
            "text-sm sm:text-base dark:bg-gray-700/50 dark:border-gray-600"
          }
          disabled={loading}
        />
        <Input
          placeholder={t.bibleVerse}
          value={values.verse}
          onChange={(e) => onChange({ ...values, verse: e.target.value })}
          className={`text-sm sm:text-base ${
            isDark ? "bg-gray-700/50 border-gray-600" : ""
          }`}
          disabled={loading}
        />
      </div>
      <Textarea
        placeholder={t.prayerMessage}
        value={values.message}
        onChange={(e) => onChange({ ...values, message: e.target.value })}
        className={`mb-2 sm:mb-3 md:mb-4 text-sm sm:text-base ${
          isDark ? "bg-gray-700/50 border-gray-600" : ""
        } ${error && !values.message.trim() ? "border-red-500" : ""}`}
        disabled={loading}
      />
      {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
      <Button
        type="submit"
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-sm sm:text-base flex items-center"
      >
        {loading ? (
          <span className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
        ) : (
          <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
        )}
        {loading ? "Submitting..." : t.shareBlessing}
      </Button>
    </form>
  );
}
