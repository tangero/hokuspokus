import React from "react";
import ActivityInputPanel from "@/components/activity/activity-input-panel";
import ActivityFilters from "@/components/activity/activity-filters";
import TagCloud from "@/components/activity/tag-cloud";
import ActivityGrid from "@/components/activity/activity-grid";

const DashboardPage = () => {
  // Mock handlers - in real app these would connect to state management
  const handleActivitySubmit = (activity: {
    content: string;
    parsedDate: Date;
    durationMinutes: number;
    tags: string[];
  }) => {
    console.log("Activity submitted:", activity);
  };

  const handleSearch = (term: string) => {
    console.log("Search term:", term);
  };

  const handleDateChange = (dates: { from: Date; to: Date }) => {
    console.log("Date range:", dates);
  };

  const handleTagSelect = (tag: string) => {
    console.log("Tag selected:", tag);
  };

  const handleEditActivity = (id: string) => {
    console.log("Edit activity:", id);
  };

  const handleDeleteActivity = (id: string) => {
    console.log("Delete activity:", id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      {/* Activity Input Section */}
      <section>
        <ActivityInputPanel onSubmit={handleActivitySubmit} />
      </section>

      {/* Filters and Tag Cloud Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <ActivityFilters
            onSearch={handleSearch}
            onDateChange={handleDateChange}
            onTagSelect={handleTagSelect}
          />
        </div>
        <div className="lg:col-span-1">
          <TagCloud onTagClick={handleTagSelect} />
        </div>
      </div>

      {/* Activity Grid Section */}
      <section>
        <ActivityGrid
          onEditActivity={handleEditActivity}
          onDeleteActivity={handleDeleteActivity}
        />
      </section>
    </div>
  );
};

export default DashboardPage;
