'use client';

import { GitHubData } from '@/types/coding';
import { ActivityCalendar, ThemeInput } from 'react-activity-calendar';

interface Props {
  data: GitHubData | null;
  isLoading: boolean;
  error: string | null;
}

const theme: ThemeInput = {
  light: [
    '#161b22', // No contributions
    '#0e4429', // Low
    '#006d32', // Medium-low
    '#26a641', // Medium-high
    '#39d353', // High
  ],
  dark: [
    '#161b22',
    '#0e4429',
    '#006d32',
    '#26a641',
    '#39d353',
  ],
};

export default function GitHubHeatmap({ data, isLoading, error }: Props) {
  if (error) {
    return (
      <div className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center h-48">
        <div className="text-gray-500 font-medium">Heatmap unavailable</div>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-center h-48">
        <div className="flex gap-1 mb-1">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={`gw1-${i}`} className="w-3 h-3 bg-white/5 rounded-sm animate-pulse" style={{ animationDelay: `${i * 0.05}s` }} />
          ))}
        </div>
        <div className="flex gap-1 mb-1">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={`gw2-${i}`} className="w-3 h-3 bg-white/5 rounded-sm animate-pulse" style={{ animationDelay: `${i * 0.05}s` }} />
          ))}
        </div>
        <div className="flex gap-1 mb-1">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={`gw3-${i}`} className="w-3 h-3 bg-white/5 rounded-sm animate-pulse" style={{ animationDelay: `${i * 0.05}s` }} />
          ))}
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={`gw4-${i}`} className="w-3 h-3 bg-white/5 rounded-sm animate-pulse" style={{ animationDelay: `${i * 0.05}s` }} />
          ))}
        </div>
      </div>
    );
  }

  const calendarData = data.calendar.length > 0 ? data.calendar : [{ date: new Date().toISOString().split('T')[0], count: 0, level: 0 as const }];

  return (
    <div className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-center">
      <h5 className="text-sm font-medium text-gray-400 mb-4">Contribution Activity</h5>
      <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div className="min-w-max">
          <ActivityCalendar
            data={calendarData}
            theme={theme}
            colorScheme="dark"
            blockSize={10}
            blockRadius={2}
            blockMargin={4}
            fontSize={12}
            labels={{
              totalCount: '{{count}} contributions in the last year',
            }}
          />
        </div>
      </div>
    </div>
  );
}
