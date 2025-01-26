import {
  parse,
  isValid,
  format,
  setHours,
  setMinutes,
  subMinutes,
} from "date-fns";
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
  const datePatterns = ["d.M.yyyy H:mm", "d.M.yyyy", "d.M. H:mm", "d.M."];

  // Try to parse date from the first part
  const firstWord = remainingText.split(" ")[0];
  let dateFound = false;

  for (const pattern of datePatterns) {
    // Use current year as base
    const currentYear = new Date().getFullYear();
    const baseDate = new Date(currentYear, 0, 1);
    let date = parse(firstWord, pattern, baseDate, { locale: cs });

    if (isValid(date)) {
      parsedDate = date;
      rawDate = firstWord;
      remainingText = remainingText.substring(firstWord.length).trim();
      dateFound = true;
      break;
    }
  }

  // If no date found, use current date
  if (!dateFound) {
    parsedDate = new Date();
    rawDate = null;
  }

  // Parse duration
  let durationMinutes: number | null = null;
  const durationRegex =
    /\b(\d+)\s*[mM]\b|\b(\d+)\s*[hH]\b|\b(\d+)[:.](\d+)\s*[hH]\b/;
  const durationMatch = remainingText.match(durationRegex);

  if (durationMatch) {
    const [fullMatch, minutes, hours, hoursWithMinutes, minutesPart] =
      durationMatch;

    if (minutes) {
      // Format: 30m
      durationMinutes = parseInt(minutes);
    } else if (hours) {
      // Format: 2h
      durationMinutes = parseInt(hours) * 60;
    } else if (hoursWithMinutes && minutesPart) {
      // Format: 1:30h or 1.30h
      durationMinutes = parseInt(hoursWithMinutes) * 60 + parseInt(minutesPart);
    }

    remainingText = remainingText.replace(fullMatch, "").trim();
  }

  // Handle time for the parsed date
  if (parsedDate) {
    if (!rawDate?.includes(":")) {
      // If no specific time was provided
      if (durationMinutes) {
        // If we have duration, set time to current time minus duration
        const now = new Date();
        const targetTime = subMinutes(now, durationMinutes);
        parsedDate.setHours(
          targetTime.getHours(),
          targetTime.getMinutes(),
          0,
          0,
        );
      } else {
        // If no duration, use current time
        const now = new Date();
        parsedDate.setHours(now.getHours(), now.getMinutes(), 0, 0);
      }
    }
  }

  return {
    parsedDate,
    rawDate,
    durationMinutes,
    tags,
    text: remainingText.trim(),
  };
}
