import { PrayerFormValues } from "@/components/PrayerForm";
import { supabase } from "@/lib/supabaseClient";
import { PrayerMessage } from "@/models/PrayerMessage";
import { useState, useEffect } from "react";

function usePrayerWall() {
  const [prayerMessages, setPrayerMessages] = useState<PrayerMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [newPrayer, setNewPrayer] = useState<PrayerFormValues>({
    name: "",
    message: "",
    verse: "",
  });

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
    if (newPrayer.message) {
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
    const { data: rpcData, error: rpcError } = await supabase.rpc(
      "increment_likes",
      {
        row_id,
      }
    );
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
  };

  return {
    prayerMessages,
    loading,
    formError,
    formLoading,
    newPrayer,
    setNewPrayer,
    handleSubmit,
    likePrayer,
    setFormError,
  };
}

export default usePrayerWall;