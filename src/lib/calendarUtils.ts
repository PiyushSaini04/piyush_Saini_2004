import { CalendarDay } from '@/types/coding';

// Calculate level 0-4 based on count relative to the max count
function calculateLevel(count: number, maxCount: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (maxCount === 0) return 0;
  
  const ratio = count / maxCount;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

export function flattenLeetCodeCalendar(submissionCalendar: string): CalendarDay[] {
  let parsed: Record<string, number> = {};
  try {
    parsed = JSON.parse(submissionCalendar);
  } catch (e) {
    return [];
  }

  const days: CalendarDay[] = [];
  let maxCount = 0;

  // LeetCode returns unix timestamps as keys
  const entries = Object.entries(parsed).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
  
  for (const [timestampStr, count] of entries) {
    if (count > maxCount) maxCount = count;
  }

  for (const [timestampStr, count] of entries) {
    const date = new Date(parseInt(timestampStr) * 1000);
    days.push({
      date: date.toISOString().split('T')[0],
      count,
      level: calculateLevel(count, maxCount),
    });
  }

  return days;
}

export function flattenGitHubCalendar(weeks: any[]): CalendarDay[] {
  const days: CalendarDay[] = [];
  let maxCount = 0;

  for (const week of weeks) {
    for (const day of week.contributionDays) {
      if (day.contributionCount > maxCount) {
        maxCount = day.contributionCount;
      }
    }
  }

  for (const week of weeks) {
    for (const day of week.contributionDays) {
      days.push({
        date: day.date,
        count: day.contributionCount,
        level: calculateLevel(day.contributionCount, maxCount),
      });
    }
  }

  return days;
}
