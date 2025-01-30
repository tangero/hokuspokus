import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { parseActivity } from "@/lib/activity-parser";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { useTranslation } from "react-i18next";
import { HelpCircle } from "lucide-react";

interface ActivityInputProps {
  editingActivity?: {
    id: string;
    text: string;
  } | null;
  onCancelEdit?: () => void;
}

export default function ActivityInput({
  editingActivity,
  onCancelEdit,
}: ActivityInputProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
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

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const position = e.target.selectionStart || 0;
    setInput(value);
    setCursorPosition(position);

    // Find the current word being typed
    const beforeCursor = value.slice(0, position);
    const match = beforeCursor.match(/#([\w-]*)$/);

    if (match) {
      const searchTerm = match[1].toLowerCase(); // Remove # and convert to lowercase
      const { data: activities } = await supabase
        .from("activities")
        .select("tags")
        .eq("user_id", user?.id);

      if (activities) {
        // Count tag occurrences
        const tagCounts: Record<string, number> = {};
        activities.forEach((activity) => {
          activity.tags?.forEach((tag) => {
            // Remove # from tag if it exists
            const cleanTag = tag.startsWith("#") ? tag.slice(1) : tag;
            const tagLower = cleanTag.toLowerCase();
            if (tagLower.startsWith(searchTerm)) {
              tagCounts[cleanTag] = (tagCounts[cleanTag] || 0) + 1;
            }
          });
        });

        // Sort by frequency
        const filteredTags = Object.entries(tagCounts)
          .sort((a, b) => b[1] - a[1])
          .map(([tag]) => tag);

        setSuggestions(filteredTags);
        setShowSuggestions(filteredTags.length > 0);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  const handleTagSelect = (tag: string) => {
    const beforeCursor = input.slice(0, cursorPosition);
    const afterCursor = input.slice(cursorPosition);
    const hashtagStart = beforeCursor.lastIndexOf("#");

    // Remove # from tag if it starts with one
    const cleanTag = tag.startsWith("#") ? tag.slice(1) : tag;
    const newInput =
      beforeCursor.slice(0, hashtagStart) + `#${cleanTag}` + afterCursor;
    setInput(newInput);
    setShowSuggestions(false);

    // Focus back on input and move cursor to end of inserted tag
    if (inputRef.current) {
      inputRef.current.focus();
      const newPosition = hashtagStart + cleanTag.length + 1;
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(newPosition, newPosition);
        }
      }, 0);
    }
  };

  const handleCancel = () => {
    setInput("");
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Escape") setShowSuggestions(false);
            if (e.key === "Tab" && showSuggestions && suggestions.length > 0) {
              e.preventDefault();
              handleTagSelect(suggestions[0]);
            }
          }}
          placeholder={t("activity.placeholder")}
          className="flex-1"
        />
        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>
            {loading
              ? t("activity.saving")
              : editingActivity
                ? t("activity.edit")
                : t("activity.add")}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => (window.location.href = "/help")}
            className="text-muted-foreground"
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
          {editingActivity && (
            <Button type="button" variant="ghost" onClick={handleCancel}>
              {t("activity.cancel")}
            </Button>
          )}
        </div>
      </form>

      {showSuggestions && (
        <div className="absolute z-50 w-64 mt-1 bg-white rounded-md shadow-lg border border-border divide-y divide-border">
          {suggestions.map((tag) => (
            <div
              key={tag}
              className="px-2 py-1.5 text-sm cursor-pointer hover:bg-secondary"
              onClick={() => handleTagSelect(tag)}
            >
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
