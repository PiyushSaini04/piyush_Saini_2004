import { useState, useEffect } from 'react';
import { LeetCodeData } from '@/types/coding';

export function useLeetCode() {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const username = process.env.NEXT_PUBLIC_LEETCODE_USERNAME;
    if (!username) {
      setError('LeetCode username not configured');
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    async function fetchStats() {
      try {
        const response = await fetch(`/api/leetcode/${username}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch LeetCode data');
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
