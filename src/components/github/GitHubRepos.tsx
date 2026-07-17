'use client';

import { ExternalLink, Star } from 'lucide-react';
import { GitHubData } from '@/types/coding';

interface Props {
  data: GitHubData | null;
  isLoading: boolean;
  error: string | null;
}

export default function GitHubRepos({ data, isLoading, error }: Props) {
  if (error || !data || data.repos.length === 0) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-2xl animate-pulse h-32">
            <div className="h-5 bg-white/10 rounded w-1/2 mb-3"></div>
            <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
            <div className="h-4 bg-white/10 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <h5 className="text-sm font-medium text-gray-400 mb-4">Notable Repositories</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 bg-white/5 border border-white/10 rounded-2xl group hover:border-white/20 hover:bg-white/10 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h6 className="font-bold text-white group-hover:text-gray-200 truncate pr-4">
                {repo.name}
              </h6>
              <ExternalLink size={16} className="text-gray-500 shrink-0 group-hover:text-white" />
            </div>
            
            <p className="text-sm text-gray-400 line-clamp-2 mb-4 h-10">
              {repo.description}
            </p>
            
            <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/50" />
                <span>{repo.language}</span>
              </div>
              {repo.stars > 0 && (
                <div className="flex items-center gap-1">
                  <Star size={12} />
                  <span>{repo.stars}</span>
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
