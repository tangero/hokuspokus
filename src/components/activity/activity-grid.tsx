import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ActivityCard from "./activity-card";

interface Activity {
  id: string;
  content: string;
  parsedDate: Date;
  durationMinutes: number;
  description: string;
  tags: string[];
}

interface ActivityGridProps {
  activities?: Activity[];
  onEditActivity?: (id: string) => void;
  onDeleteActivity?: (id: string) => void;
}

const ActivityGrid = ({
  activities = [
    {
      id: "1",
      content: "Morning Workout",
      parsedDate: new Date(),
      durationMinutes: 45,
      description: "Cardio and strength training session",
      tags: ["workout", "health", "morning"],
    },
    {
      id: "2",
      content: "Project Meeting",
      parsedDate: new Date(),
      durationMinutes: 60,
      description: "Team sync and sprint planning",
      tags: ["work", "meeting", "planning"],
    },
    {
      id: "3",
      content: "Reading Session",
      parsedDate: new Date(),
      durationMinutes: 30,
      description: "Reading technical documentation",
      tags: ["learning", "development"],
    },
  ],
  onEditActivity = () => {},
  onDeleteActivity = () => {},
}: ActivityGridProps) => {
  return (
    <div className="w-full h-[500px] bg-gray-50 p-6">
      <ScrollArea className="h-full w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              id={activity.id}
              content={activity.content}
              parsedDate={activity.parsedDate}
              durationMinutes={activity.durationMinutes}
              description={activity.description}
              tags={activity.tags}
              onEdit={onEditActivity}
              onDelete={onDeleteActivity}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ActivityGrid;
