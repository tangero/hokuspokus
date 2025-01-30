export function generateActivitiesHash(activities: any[]): string {
  // Sort activities by ID to ensure consistent order
  const sortedActivities = [...activities].sort((a, b) =>
    a.id.localeCompare(b.id),
  );

  // Create a string of all activity IDs, dates, and texts
  const activityString = sortedActivities
    .map(
      (activity) =>
        `${activity.id}-${activity.parsed_date}-${activity.text}-${activity.duration_minutes}`,
    )
    .join("");

  // Use simple hash function for quick comparison
  let hash = 0;
  for (let i = 0; i < activityString.length; i++) {
    const char = activityString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return hash.toString(16);
}
