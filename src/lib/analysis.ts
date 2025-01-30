import { format, startOfDay, endOfDay } from "date-fns";
import { cs, de } from "date-fns/locale";
import { supabase } from "./supabase";

function generateBasicAnalysis(activities: Activity[]): string {
  if (!activities.length) return "No activities recorded.";

  const totalMinutes = activities.reduce(
    (sum, activity) => sum + (activity.duration_minutes || 0),
    0,
  );
  const totalHours = totalMinutes / 60;

  // Get all unique tags and their counts
  const tagCounts: Record<string, number> = {};
  activities.forEach((activity) => {
    const activityTags = activity.text.match(/#\w+/g) || [];
    activityTags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  // Sort tags by frequency
  const sortedTags = Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  // Get daily distribution
  const dailyMinutes: Record<string, number> = {};
  activities.forEach((activity) => {
    const day = format(new Date(activity.parsed_date), "EEEE");
    dailyMinutes[day] =
      (dailyMinutes[day] || 0) + (activity.duration_minutes || 0);
  });

  // Format the analysis
  const analysis = [
    `📊 Weekly Summary:\n`,
    `• Total time: ${totalHours.toFixed(1)} hours`,
    `• Number of activities: ${activities.length}`,
    `\n🏷️ Most used tags:`,
    ...sortedTags.map(([tag, count]) => `• ${tag}: ${count} activities`),
    `\n📅 Daily distribution:`,
    ...Object.entries(dailyMinutes).map(
      ([day, minutes]) => `• ${day}: ${(minutes / 60).toFixed(1)} hours`,
    ),
  ].join("\n");

  return analysis;
}

type Activity = {
  text: string;
  parsed_date: string;
  duration_minutes: number;
};

function generateActivitiesHash(activities: Activity[]): string {
  // Sort activities by date
  const sortedActivities = [...activities].sort((a, b) =>
    a.parsed_date.localeCompare(b.parsed_date),
  );

  // Create a minimal representation using just essential data
  const hashInput = sortedActivities
    .map((a) =>
      [
        new Date(a.parsed_date).getTime(),
        a.duration_minutes,
        (a.text.match(/#\w+/g) || []).sort().join(""),
      ].join(""),
    )
    .join("");

  // Use a simple but effective hash function
  let hash = 0;
  for (let i = 0; i < hashInput.length; i++) {
    hash = (hash << 5) - hash + hashInput.charCodeAt(i);
    hash = hash & hash;
  }

  // Make it even shorter
  return Math.abs(hash % 1000000).toString(36);
}

export async function generateWeekAnalysis(
  activities: Activity[],
): Promise<{ result: string; fromCache: boolean }> {
  if (!activities.length)
    return { result: "No activities recorded.", fromCache: false };

  const startDate = startOfDay(new Date(activities[0].parsed_date));
  const endDate = endOfDay(
    new Date(activities[activities.length - 1].parsed_date),
  );
  const activitiesHash = generateActivitiesHash(activities);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;

  // Check cache first
  const { data: cachedAnalysis, error: cacheError } = await supabase
    .from("weekly_summaries")
    .select("content")
    .eq("activities_hash", activitiesHash)
    .eq("user_id", userId);

  if (cacheError)
    return { result: generateBasicAnalysis(activities), fromCache: false };

  if (cachedAnalysis && cachedAnalysis.length > 0) {
    return { result: cachedAnalysis[0].content, fromCache: true };
  }

  if (!import.meta.env.VITE_DEEPSEEK_API_KEY) {
    return { result: generateBasicAnalysis(activities), fromCache: false };
  }

  // Get language from user profile first
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("preferred_language")
    .eq("id", userId)
    .single();

  const userLanguage = profile?.preferred_language || "en";

  // Prepare the data for analysis
  const totalMinutes = activities.reduce(
    (sum, activity) => sum + (activity.duration_minutes || 0),
    0,
  );
  const totalHours = totalMinutes / 60;

  // Get all unique tags
  const tags = new Set<string>();
  activities.forEach((activity) => {
    const activityTags = activity.text.match(/#\w+/g) || [];
    activityTags.forEach((tag) => tags.add(tag));
  });

  // Create prompts based on user language
  const prompts = {
    cs: `Charakterizuj mi z těchto dat, co jsem tento týden dělal. Na závěr přidej motivační citát.

Data o aktivitách:
- Celkový čas: ${totalHours.toFixed(1)} hodin
- Počet aktivit: ${activities.length}
- Použité tagy: ${Array.from(tags).join(", ")}

Aktivity:
${activities.map((a) => `- ${format(new Date(a.parsed_date), "EEEE", { locale: cs })}: ${a.text} (${a.duration_minutes} minut)`).join("\n")}

Odpověz v češtině.`,
    de: `Charakterisieren Sie anhand dieser Daten, was ich diese Woche gemacht habe. Fügen Sie am Ende ein motivierendes Zitat hinzu.

Aktivitätsdaten:
- Gesamtzeit: ${totalHours.toFixed(1)} Stunden
- Anzahl der Aktivitäten: ${activities.length}
- Verwendete Tags: ${Array.from(tags).join(", ")}

Aktivitäten:
${activities.map((a) => `- ${format(new Date(a.parsed_date), "EEEE", { locale: de })}: ${a.text} (${a.duration_minutes} Minuten)`).join("\n")}

Bitte antworten Sie auf Deutsch.`,
    en: `Characterize what I did this week based on this data. Add a motivational quote at the end.

Activity data:
- Total time: ${totalHours.toFixed(1)} hours
- Number of activities: ${activities.length}
- Tags used: ${Array.from(tags).join(", ")}

Activities:
${activities.map((a) => `- ${format(new Date(a.parsed_date), "EEEE")}: ${a.text} (${a.duration_minutes} minutes)`).join("\n")}

Please respond in English.`,
  };

  const prompt = prompts[userLanguage as keyof typeof prompts] || prompts.en;

  try {
    const response = await fetch(
      "https://api.deepseek.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 2000,
          temperature: 0.7,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to generate analysis");
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;

    if (!userId) {
      return { result: analysis, fromCache: false };
    }

    const cacheData = {
      user_id: userId,
      content: analysis,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      activities_hash: activitiesHash,
      created_at: new Date().toISOString(),
    };

    const { data: insertData, error: insertError } = await supabase
      .from("weekly_summaries")
      .insert([cacheData]);

    return { result: analysis, fromCache: false };
  } catch (error) {
    console.error("Error generating analysis:", error);
    return { result: generateBasicAnalysis(activities), fromCache: false };
  }
}
