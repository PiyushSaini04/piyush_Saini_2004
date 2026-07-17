import { useState, useEffect } from 'react';
import { GitHubData } from '@/types/coding';

export function useGitHub() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
    if (!username) {
      setError('GitHub username not configured');
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    async function fetchStats() {
      try {
        const response = await fetch(`/api/github/${username}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch GitHub data');
        }

        const json = await response.json();
        setData(json);
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        setError(err.message || 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();

    return () => {
      controller.abort();
    };
  }, []);

  return { data, isLoading, error };
}
