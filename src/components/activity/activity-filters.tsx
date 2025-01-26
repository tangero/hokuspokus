import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";
import { Badge } from "@/components/ui/badge";
import { addDays } from "date-fns";

interface ActivityFiltersProps {
  onSearch?: (term: string) => void;
  onDateChange?: (dates: { from: Date; to: Date }) => void;
  onTagSelect?: (tag: string) => void;
  selectedTags?: string[];
  availableTags?: string[];
}

const ActivityFilters = ({
  onSearch = () => {},
  onDateChange = () => {},
  onTagSelect = () => {},
  selectedTags = ["work", "exercise"],
  availableTags = ["work", "exercise", "study", "leisure", "health"],
}: ActivityFiltersProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [date, setDate] = React.useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleDateChange = (dates: { from: Date; to: Date }) => {
    setDate(dates);
    onDateChange(dates);
  };

  const toggleTag = (tag: string) => {
    onTagSelect(tag);
  };

  return (
    <div className="w-full bg-white p-4 border-b space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search activities..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-9"
          />
        </div>
        <DatePickerWithRange date={date} onDateChange={handleDateChange} />
      </div>

      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleTag(tag)}
            className="h-8"
          >
            #{tag}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ActivityFilters;
