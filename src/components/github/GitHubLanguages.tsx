'use client';

import { GitHubData } from '@/types/coding';

interface Props {
  data: GitHubData | null;
  isLoading: boolean;
  error: string | null;
}

export default function GitHubLanguages({ data, isLoading, error }: Props) {
  if (error || !data || data.topLanguages.length === 0) {
    return null; // Don't show if missing
  }

  if (isLoading) {
    return (
      <div className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl animate-pulse">
        <div className="h-4 bg-white/10 rounded w-1/4 mb-4"></div>
        <div className="flex w-full h-2 rounded-full overflow-hidden mb-4">
          <div className="w-full bg-white/10"></div>
        </div>
      </div>
    );
  }

  const opacities = [
  'bg-slate-700',   // No activity
  'bg-blue-500',    // Low activity
  'bg-pink-500',   // High activity
  'bg-yellow-400', // Very high activity
  'bg-purple-500', // Medium activity
];

  return (
    <div className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl">
      <h5 className="text-sm font-medium text-gray-400 mb-4">Top Languages</h5>
      
      {/* Bar */}
      <div className="flex w-full h-2 rounded-full overflow-hidden mb-4 bg-white/5">
        {data.topLanguages.map((lang, idx) => (
          <div
            key={lang.name}
            style={{ width: `${lang.percent}%` }}
            className={`h-full ${opacities[idx % opacities.length]}`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs font-medium">
        {data.topLanguages.map((lang, idx) => (
          <div key={lang.name} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${opacities[idx % opacities.length]}`} />
            <span className="text-gray-300">{lang.name}</span>
            <span className="text-gray-500">{lang.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
