import { useQuery, useMutation, useQueryClient } from "react-query";
import { PrayerFormValues } from "@/components/PrayerForm";
import { supabase } from "@/lib/supabaseClient";
import { PrayerMessage } from "@/models/PrayerMessage";
import { useState } from "react";

function usePrayerWall() {
  const queryClient = useQueryClient();
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [newPrayer, setNewPrayer] = useState<PrayerFormValues>({
    name: "",
    message: "",
    verse: "",
  });

  // Fetch prayers
  const { data: prayerMessages = [], isLoading: loading } = useQuery<
    PrayerMessage[]
  >({
    queryKey: ["prayer_wall"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("prayer_wall")
        .select("id, name, message, verse, likes")
        .order("id", { ascending: false });
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Add prayer mutation
  const addPrayerMutation = useMutation({
    mutationFn: async (prayer: PrayerFormValues) => {
      const { data, error } = await supabase
        .from("prayer_wall")
        .insert([{ ...prayer, likes: 0 }])
        .select();
      if (error) throw new Error(error.message);
      return data ? data[0] : null;
    },
    onSuccess: (newPrayerMsg) => {
      queryClient.setQueryData<PrayerMessage[]>(["prayer_wall"], (old) =>
        newPrayerMsg && old ? [newPrayerMsg, ...old] : old || []
      );
      setNewPrayer({ name: "", message: "", verse: "" });
      setFormError("");
    },
    onError: (error: any) => {
      setFormError(error.message || "Failed to submit prayer");
    },
    onSettled: () => setFormLoading(false),
  });

  // Like prayer mutation (optimistic)
  const likePrayerMutation = useMutation({
    mutationFn: async (row_id: number) => {
      // Optimistically update
      queryClient.setQueryData<PrayerMessage[]>(["prayer_wall"], (old) =>
        old
          ? old.map((msg) =>
              msg.id === row_id ? { ...msg, likes: msg.likes + 1 } : msg
            )
          : []
      );
      const { error } = await supabase.rpc("increment_likes", { row_id });
      if (error) throw new Error(error.message);
      // Refetch to ensure consistency
      await queryClient.invalidateQueries({ queryKey: ["prayer_wall"] });
    },
    onError: (_err, row_id) => {
      // Rollback
      queryClient.setQueryData<PrayerMessage[]>(["prayer_wall"], (old) =>
        old
          ? old.map((msg) =>
              msg.id === row_id ? { ...msg, likes: msg.likes - 1 } : msg
            )
          : []
      );
    },
  });

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
    addPrayerMutation.mutate(newPrayer);
  };

  const likePrayer = (row_id: number) => {
    likePrayerMutation.mutate(row_id);
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
