'use client';

import { ExternalLink, Trophy, Code2, Zap } from 'lucide-react';
import { LeetCodeData } from '@/types/coding';

interface Props {
  data: LeetCodeData | null;
  isLoading: boolean;
  error: string | null;
}

/* LeetCode brand logo SVG */
function LeetCodeLogo({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

export default function LeetCodeStatsCard({ data, isLoading, error }: Props) {
  if (error) {
    return (
      <div className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center h-40">
        <div className="text-gray-500 font-medium">{error}</div>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl animate-pulse space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 shrink-0"></div>
            <div className="space-y-2">
              <div className="h-5 bg-white/10 rounded w-24"></div>
              <div className="h-3 bg-white/10 rounded w-16"></div>
            </div>
          </div>
          <div className="h-5 w-5 bg-white/10 rounded"></div>
        </div>
        <div className="h-10 bg-white/10 rounded w-24"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-white/10 rounded-full w-20"></div>
          <div className="h-6 bg-white/10 rounded-full w-20"></div>
          <div className="h-6 bg-white/10 rounded-full w-20"></div>
        </div>
        <div className="h-px bg-white/10 w-full"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-12 bg-white/10 rounded"></div>
          <div className="h-12 bg-white/10 rounded"></div>
          <div className="h-12 bg-white/10 rounded"></div>
        </div>
        <div className="h-px bg-white/10 w-full"></div>
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded w-24"></div>
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-6 bg-white/10 rounded-full w-16"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const topLanguages = data.languages.slice(0, 4);
  const topAdvanced = data.skills.advanced.slice(0, 3);
  const topIntermediate = data.skills.intermediate.slice(0, 3);
  const topFundamental = data.skills.fundamental.slice(0, 2);
  const allTopSkills = [...topAdvanced, ...topIntermediate, ...topFundamental];

  return (
    <a
      href={`https://leetcode.com/${data.username}`}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block w-full p-6 bg-white/5 border border-white/10 rounded-2xl overflow-hidden group transition-colors duration-300 hover:border-white/20"
    >
      <div className="relative z-10 flex flex-col gap-5">

        {/* Header: Avatar + Username + LeetCode Logo */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            {data.avatarUrl ? (
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 shrink-0 group-hover:border-white/25 transition-colors">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.avatarUrl}
                  alt={data.username}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full border-2 border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-lg">
                  {data.username.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h4 className="text-lg font-bold text-white group-hover:text-gray-300 transition-colors leading-tight">
                {data.username}
              </h4>
              <div className="text-xs text-gray-500">Global Rank #{data.ranking.toLocaleString()}</div>
            </div>
          </div>

          {/* LeetCode Logo + External Link */}
          <div className="flex items-center gap-2">
            <div className="text-[#FFA116]">
              <LeetCodeLogo size={22} />
            </div>
            <div className="text-gray-600 group-hover:text-gray-400 transition-colors">
              <ExternalLink size={16} />
            </div>
          </div>
        </div>

        {/* Total Solved */}
        <div>
          <div className="text-4xl font-bold text-white leading-none mb-2">
            {data.totalSolved}
            <span className="text-base text-gray-500 font-normal ml-2">solved</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400">
              {data.easySolved} Easy
            </span>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-400">
              {data.mediumSolved} Medium
            </span>
            <span className="px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-medium text-red-400">
              {data.hardSolved} Hard
            </span>
          </div>
        </div>

        <div className="h-px bg-white/10 w-full" />

        {/* Contest Info */}
        {data.contestInfo && (
          <>
            <div className="flex items-start gap-2">
              <Trophy size={14} className="text-gray-500 mt-0.5 shrink-0" />
              <div className="flex-1">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Contest</div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <div className="text-lg font-bold text-white">
                      {Math.round(data.contestInfo.rating)}
                    </div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">
                      Top {data.contestInfo.topPercentage.toFixed(0)}%
                    </div>
                    <div className="text-xs text-gray-500">Percentile</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">
                      {data.contestInfo.attendedContestsCount}
                    </div>
                    <div className="text-xs text-gray-500">Contests</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-px bg-white/10 w-full" />
          </>
        )}

        {/* Languages */}
        {topLanguages.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Code2 size={14} className="text-gray-500" />
              <div className="text-xs text-gray-500 uppercase tracking-wider">Languages</div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {topLanguages.map((lang) => (
                <div
                  key={lang.languageName}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-full border border-white/10 text-xs"
                >
                  <span className="text-gray-300 font-medium">{lang.languageName}</span>
                  <span className="text-gray-500">{lang.problemsSolved}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {allTopSkills.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} className="text-gray-500" />
              <div className="text-xs text-gray-500 uppercase tracking-wider">Top Skills</div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {allTopSkills.map((skill) => (
                <span
                  key={skill.tagSlug}
                  className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400"
                >
                  {skill.tagName}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </a>
  );
}
