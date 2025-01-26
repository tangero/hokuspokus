import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertCircle, Send, Clock, Calendar, Hash } from "lucide-react";
import { format } from "date-fns";

interface ActivityInputPanelProps {
  onSubmit?: (activity: {
    content: string;
    parsedDate: Date;
    durationMinutes: number;
    tags: string[];
  }) => void;
  isLoading?: boolean;
  error?: string;
}

const ActivityInputPanel = ({
  onSubmit = () => {},
  isLoading = false,
  error = "",
}: ActivityInputPanelProps) => {
  const [input, setInput] = useState("");
  const [parsedActivity, setParsedActivity] = useState({
    content: "Running in the park",
    parsedDate: new Date(),
    durationMinutes: 30,
    tags: ["exercise", "outdoor"],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    // In a real implementation, this would trigger the parser
    // For now, we'll just use the default parsed activity
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(parsedActivity);
    setInput("");
  };

  return (
    <Card className="w-full bg-white shadow-md">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Add activity (e.g., 'Running in the park for 30min #exercise')"
                className="w-full"
                disabled={isLoading}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              <Send className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>

          {/* Preview Panel */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {format(parsedActivity.parsedDate, "MMM d, yyyy")}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {parsedActivity.durationMinutes} min
            </div>
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4" />
              {parsedActivity.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {error && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    <span>Error parsing input</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{error}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default ActivityInputPanel;
