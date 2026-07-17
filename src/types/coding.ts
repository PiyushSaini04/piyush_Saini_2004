export type CalendarDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export interface Language {
    languageName: string;
    problemsSolved: number;
}

export interface Skill {
    tagName: string;
    tagSlug: string;
    problemsSolved: number;
}

export interface SkillCategory {
    advanced: Skill[];
    intermediate: Skill[];
    fundamental: Skill[];
}

export interface ContestInfo {
    rating: number;
    globalRanking: number;
    topPercentage: number;
    attendedContestsCount: number;
    badge?: string;
}

export interface LeetCodeData {
    username: string;
    avatarUrl?: string;

    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;

    ranking: number;

    calendar: CalendarDay[];

    languages: Language[];

    skills: SkillCategory;

    contestInfo?: ContestInfo;
}

export type Repo = {
  name: string;
  description: string;
  stars: number;
  language: string;
  url: string;
};

export type GitHubData = {
  login: string;
  name: string;
  avatarUrl: string;
  bio: string;
  followers: number;
  following: number;
  publicRepos: number;
  calendar: CalendarDay[];
  topLanguages: { name: string; percent: number }[];
  repos: Repo[];
};
