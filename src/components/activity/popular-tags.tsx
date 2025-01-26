import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";

type TagCount = {
  tag: string;
  count: number;
};

interface PopularTagsProps {
  onTagClick?: (tag: string) => void;
  selectedTag?: string | null;
}

export default function PopularTags({
  onTagClick,
  selectedTag,
}: PopularTagsProps) {
  const [tags, setTags] = useState<TagCount[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchTags = async () => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: activities } = await supabase
        .from("activities")
        .select("tags")
        .eq("user_id", user.id)
        .gte("parsed_date", thirtyDaysAgo.toISOString());

      if (!activities) return;

      // Count tag occurrences
      const tagCounts: Record<string, number> = {};
      activities.forEach((activity) => {
        if (!activity.tags) return;
        activity.tags.forEach((tag: string) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      });

      // Convert to array and sort
      const sortedTags = Object.entries(tagCounts)
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count);

      setTags(sortedTags);
    };

    fetchTags();
  }, [user]);

  if (tags.length === 0) return null;

  return (
    <Card className="p-2">
      <CardContent className="p-0">
        <div className="flex flex-wrap gap-2">
          {tags.map(({ tag, count }) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? "default" : "secondary"}
              className={`cursor-pointer transition-colors ${selectedTag === tag ? "hover:bg-primary/90" : "hover:bg-secondary/80"}`}
              onClick={() => onTagClick?.(tag)}
            >
              {tag} ({count})
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
