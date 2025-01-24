import { parse, isValid, format } from "date-fns";
import { cs } from "date-fns/locale";

type ParsedActivity = {
  parsedDate: Date | null;
  rawDate: string | null;
  durationMinutes: number | null;
  tags: string[];
  text: string;
};

export function parseActivity(input: string): ParsedActivity {
  const tags = input.match(/#\w+/g) || [];
  const textWithoutTags = input.replace(/#\w+/g, "").trim();

  // Parse date and time
  let parsedDate: Date | null = null;
  let rawDate: string | null = null;
  let remainingText = textWithoutTags;

  // Date patterns
  const datePatterns = [
    "d.M.yyyy H:mm",
    "d.M.yyyy",
    "d/M/yyyy",
    "d MMM yyyy",
    "d.M. H:mm",
    "d.M.",
  ];

  for (const pattern of datePatterns) {
    const firstWord = remainingText.split(" ")[0];
    const firstTwoWords = remainingText.split(" ").slice(0, 2).join(" ");

    let date = parse(firstWord, pattern, new Date(), { locale: cs });
    if (!isValid(date)) {
      date = parse(firstTwoWords, pattern, new Date(), { locale: cs });
    }

    if (isValid(date)) {
      parsedDate = date;
      rawDate = firstTwoWords;
      remainingText = remainingText.replace(rawDate, "").trim();
      break;
    }
  }

  // Parse duration
  let durationMinutes: number | null = null;
  const durationMatch = remainingText.match(
    /\b(\d+)[:.]?(\d*)\s*[hm]\b|\b(\d+)\s*min\b/i,
  );

  if (durationMatch) {
    if (durationMatch[1] && durationMatch[2]) {
      // Format: 1:30h or 1.5h
      durationMinutes =
        parseInt(durationMatch[1]) * 60 + parseInt(durationMatch[2]);
    } else if (durationMatch[1]) {
      // Format: 30m
      durationMinutes = parseInt(durationMatch[1]);
    } else if (durationMatch[3]) {
      // Format: 30 min
      durationMinutes = parseInt(durationMatch[3]);
    }
    remainingText = remainingText.replace(durationMatch[0], "").trim();
  }

  return {
    parsedDate,
    rawDate,
    durationMinutes,
    tags,
    text: remainingText.trim(),
  };
}
