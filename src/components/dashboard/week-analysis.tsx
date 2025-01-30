import { useState, useEffect } from "react";
import { generateWeekAnalysis } from "@/lib/analysis";

type Activity = {
  text: string;
  parsed_date: string;
  duration_minutes: number;
};

export default function WeekAnalysis({
  activities,
}: {
  activities: Activity[];
}) {
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [isFromCache, setIsFromCache] = useState(false);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      try {
        const { result, fromCache } = await generateWeekAnalysis(activities);
        setAnalysis(result);
        setIsFromCache(fromCache);

        // Update the source indicator
        const sourceElement = document.getElementById("analysis-source");
        if (sourceElement) {
          sourceElement.textContent = fromCache ? "⏰" : "🐟";
        }
      } catch (error) {
        console.error("Error generating analysis:", error);
        setAnalysis("Failed to generate analysis.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [activities]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-slate-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-slate-200 rounded w-2/3"></div>
      </div>
    );
  }

  return (
    <div className="prose prose-sm max-w-none text-slate-600">
      <div
        dangerouslySetInnerHTML={{
          __html: analysis
            .split("\n")
            .map((line) => {
              if (
                line.match(/^\d+\./) ||
                line.startsWith("**Motivační citát")
              ) {
                return `\n${line}`;
              }
              if (line.startsWith("•")) {
                return `<li>${line.substring(2)}</li>`;
              }
              return line;
            })
            .join("\n")
            .replace(
              /^### (.*$)/gm,
              "<h3 class='text-lg font-medium mt-4 mb-2'>$1</h3>",
            )
            .replace(
              /^#### (.*$)/gm,
              "<h4 class='text-base font-medium mt-3 mb-2'>$1</h4>",
            )
            .replace(/^## (.*$)/gm, "<h2>$1</h2>")
            .replace(/^# (.*$)/gm, "<h1>$1</h1>")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>")
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
            .replace(/`([^`]+)`/g, "<code>$1</code>")
            .replace(/\n\n/g, "</p><p>")
            .replace(/\n/g, "<br>")
            .replace(/^/, "<p>")
            .replace(/$/, "</p>")
            .replace(/(<li>.*?<\/li>)/g, "<ul>$1</ul>"),
        }}
      />
    </div>
  );
}
