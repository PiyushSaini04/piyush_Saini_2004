'use client';

import { ExternalLink, Users, BookOpen } from 'lucide-react';
import { GitHubData } from '@/types/coding';

interface Props {
  data: GitHubData | null;
  isLoading: boolean;
  error: string | null;
}

/* GitHub brand mark SVG */
function GitHubLogo({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function GitHubStatsCard({ data, isLoading, error }: Props) {
  if (error) {
    return (
      <div className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center h-40">
        <div className="text-gray-500 font-medium">{error}</div>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl animate-pulse h-40 flex items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-white/10 shrink-0"></div>
        <div className="flex-1">
          <div className="h-6 bg-white/10 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-white/10 rounded w-1/4 mb-4"></div>
          <div className="flex gap-4">
            <div className="h-4 bg-white/10 rounded w-16"></div>
            <div className="h-4 bg-white/10 rounded w-16"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <a
      href={`https://github.com/${data.login}`}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block w-full p-6 bg-white/5 border border-white/10 rounded-2xl overflow-hidden group transition-colors duration-300 hover:border-white/20"
    >
      <div className="relative z-10 flex items-center gap-6 h-full">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 shrink-0 group-hover:border-white/30 transition-colors">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.avatarUrl} alt={data.login} className="w-full h-full object-cover" />
        </div>
        
        {/* Info */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex justify-between items-start mb-1">
            <h4 className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors">
              {data.name}
            </h4>
            <div className="flex items-center gap-2">
              <div className="text-white">
                <GitHubLogo size={20} />
              </div>
              <div className="text-gray-600 group-hover:text-gray-400 transition-colors">
                <ExternalLink size={16} />
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-400 mb-3">@{data.login}</div>
          
          <div className="flex gap-4 text-sm font-medium text-gray-400">
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-gray-500" />
              <span className="text-gray-300">{data.followers}</span> followers
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen size={14} className="text-gray-500" />
              <span className="text-gray-300">{data.publicRepos}</span> repos
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
