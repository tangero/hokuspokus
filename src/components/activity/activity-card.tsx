import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Clock, Calendar } from "lucide-react";
import { format } from "date-fns";

interface ActivityCardProps {
  id?: string;
  content?: string;
  parsedDate?: Date;
  durationMinutes?: number;
  description?: string;
  tags?: string[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const ActivityCard = ({
  id = "1",
  content = "Sample Activity",
  parsedDate = new Date(),
  durationMinutes = 30,
  description = "This is a sample activity description to show how the card looks with content.",
  tags = ["sample", "activity", "default"],
  onEdit = () => {},
  onDelete = () => {},
}: ActivityCardProps) => {
  return (
    <Card className="w-[360px] h-[180px] bg-white shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="p-4 pb-2 flex flex-row justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-lg truncate">{content}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {format(parsedDate, "MMM d, yyyy")}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {durationMinutes} min
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(id)}
            className="h-8 w-8"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(id)}
            className="h-8 w-8 text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ActivityCard;
