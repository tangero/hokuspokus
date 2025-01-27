import i18next from "i18next";

const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;

console.log("[Deepseek Debug] API Key exists:", !!DEEPSEEK_API_KEY);
if (!DEEPSEEK_API_KEY) {
  console.error("Missing DEEPSEEK_API_KEY environment variable");
}

interface Activity {
  text: string;
  parsed_date: string;
  duration_minutes: number;
  tags: string[];
}

export async function generateSummary(activities: Activity[]): Promise<string> {
  if (!DEEPSEEK_API_KEY) {
    throw new Error("Missing DEEPSEEK_API_KEY environment variable");
  }

  try {
    console.log(
      "[Deepseek Debug] Starting summary generation with activities:",
      activities,
    );

    // Format activities into a more readable format for the AI
    const formattedActivities = activities
      .map((activity) => {
        const date = new Date(activity.parsed_date);
        return `- ${date.toLocaleDateString()}: ${activity.text} (${activity.duration_minutes} minutes) ${activity.tags?.join(", ")}`;
      })
      .join("\n");

    console.log("[Deepseek Debug] Formatted activities:", formattedActivities);

    // Get current language and prepare language-specific prompts
    const currentLanguage = i18next.language || "en";

    const prompts = {
      en: `Analyze these activities and create a summary of what I did this week. Prepare the report in English using Markdown format. Use:

- # for main headers
- ## for subheaders
- ### for smaller headers
- ** ** for bold text
- * * for italics
- - for list items
- Empty line between paragraphs and sections

Rules:
- Empty line between header and text
- Empty line between sections
- No empty lines between list items
- Empty line before and after lists

Activities:\n${formattedActivities}`,

      cs: `Charakterizuj z těchto dat, co jsem tento týden dělal. Report připrav v češtině ve formátu Markdown. Používej:

- # pro hlavní nadpis
- ## pro podnadpisy
- ### pro menší nadpisy
- ** ** pro tučný text
- * * pro kurzívu
- - pro položky seznamu
- Prázdný řádek mezi odstavci a sekcemi

Dodržuj:
- Mezi nadpisem a textem vždy prázdný řádek
- Mezi sekcemi vždy prázdný řádek
- Mezi položkami seznamu není prázdný řádek
- Před seznamem a za seznamem je prázdný řádek

Activities:\n${formattedActivities}`,

      de: `Analysieren Sie diese Aktivitäten und erstellen Sie eine Zusammenfassung meiner Tätigkeiten dieser Woche. Bereiten Sie den Bericht auf Deutsch im Markdown-Format vor. Verwenden Sie:

- # für Hauptüberschriften
- ## für Unterüberschriften
- ### für kleinere Überschriften
- ** ** für fetten Text
- * * für kursiven Text
- - für Listenelemente
- Leerzeile zwischen Absätzen und Abschnitten

Regeln:
- Leerzeile zwischen Überschrift und Text
- Leerzeile zwischen Abschnitten
- Keine Leerzeilen zwischen Listenelementen
- Leerzeile vor und nach Listen

Activities:\n${formattedActivities}`,
    };

    const prompt = prompts[currentLanguage] || prompts.en;

    console.log("[Deepseek Debug] Sending request to API with prompt:", prompt);

    const requestBody = {
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that analyzes work activities and provides insightful summaries in Markdown format. Focus on proper Markdown formatting with clear section separation using headers, lists, and emphasis. Ensure consistent spacing between sections. Identify patterns, time allocation, and provide constructive insights.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
      frequency_penalty: 0,
      presence_penalty: 0,
      top_p: 1,
    };

    console.log("[Deepseek Debug] Request body:", requestBody);

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${DEEPSEEK_API_KEY}`);

    const response = await fetch(
      "https://api.deepseek.com/v1/chat/completions",
      {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
      },
    );

    console.log("[Deepseek Debug] Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Deepseek Debug] API error response:", errorText);
      throw new Error(
        `API request failed: ${response.statusText}\n${errorText}`,
      );
    }

    const data = await response.json();
    console.log("[Deepseek Debug] API response data:", data);

    const summary = data.choices[0].message.content || "No summary generated";
    console.log("[Deepseek Debug] Generated summary:", summary);

    return summary;
  } catch (error) {
    console.error("[Deepseek Debug] Error in generateSummary:", error);
    throw error;
  }
}
