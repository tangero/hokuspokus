import React from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface TagCloudProps {
  tags?: Array<{ name: string; count: number }>;
  onTagClick?: (tag: string) => void;
  className?: string;
}

const TagCloud = ({
  tags = [
    { name: "work", count: 10 },
    { name: "exercise", count: 8 },
    { name: "reading", count: 6 },
    { name: "coding", count: 15 },
    { name: "meditation", count: 4 },
    { name: "meeting", count: 12 },
    { name: "learning", count: 7 },
    { name: "hobby", count: 5 },
  ],
  onTagClick = () => {},
  className = "",
}: TagCloudProps) => {
  // Calculate font sizes based on count
  const maxCount = Math.max(...tags.map((tag) => tag.count));
  const minCount = Math.min(...tags.map((tag) => tag.count));

  const getFontSize = (count: number) => {
    const minSize = 0.75; // rem
    const maxSize = 2; // rem
    const size =
      minSize +
      ((count - minCount) / (maxCount - minCount)) * (maxSize - minSize);
    return `${size}rem`;
  };

  return (
    <div className={`p-6 bg-white rounded-lg shadow-sm ${className}`}>
      <div className="flex flex-wrap gap-3 justify-center">
        {tags.map((tag, index) => (
          <motion.div
            key={tag.name}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
            }}
          >
            <Badge
              variant="secondary"
              className="cursor-pointer hover:bg-secondary-foreground hover:text-secondary transition-colors"
              style={{
                fontSize: getFontSize(tag.count),
                padding: `${0.5 * (tag.count / maxCount)}rem ${0.75 * (tag.count / maxCount)}rem`,
              }}
              onClick={() => onTagClick(tag.name)}
            >
              #{tag.name}
            </Badge>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;
