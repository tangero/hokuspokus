import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { parseActivity } from "@/lib/activity-parser";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";

interface ActivityInputProps {
  editingActivity?: {
    id: string;
    text: string;
  } | null;
  onCancelEdit?: () => void;
}

import { useTranslation } from "react-i18next";

export default function ActivityInput({
  editingActivity,
  onCancelEdit,
}: ActivityInputProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (editingActivity) {
      setInput(editingActivity.text);
    } else {
      setInput("");
    }
  }, [editingActivity]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user) return;

    setLoading(true);
    try {
      const parsed = parseActivity(input);

      if (editingActivity) {
        await supabase
          .from("activities")
          .update({
            text: input,
            parsed_date: parsed.parsedDate?.toISOString(),
            raw_date: parsed.rawDate,
            duration_minutes: parsed.durationMinutes,
            tags: parsed.tags,
          })
          .eq("id", editingActivity.id);

        if (onCancelEdit) onCancelEdit();
      } else {
        await supabase.from("activities").insert({
          text: input,
          parsed_date: parsed.parsedDate?.toISOString(),
          raw_date: parsed.rawDate,
          duration_minutes: parsed.durationMinutes,
          tags: parsed.tags,
          user_id: user.id,
        });
      }

      setInput("");
    } catch (error) {
      console.error("Error saving activity:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setInput("");
    if (onCancelEdit) onCancelEdit();
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t("activity.placeholder")}
        className="flex-1"
      />
      <Button type="submit" disabled={loading}>
        {loading
          ? t("activity.saving")
          : editingActivity
            ? t("activity.edit")
            : t("activity.add")}
      </Button>
      {editingActivity && (
        <Button type="button" variant="ghost" onClick={handleCancel}>
          {t("activity.cancel")}
        </Button>
      )}
    </form>
  );
}
