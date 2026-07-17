import 'server-only';
import { GitHubData } from '@/types/coding';
import { getCached, setCached } from '@/lib/cache';
import { flattenGitHubCalendar } from '@/lib/calendarUtils';
import { computeTopLanguages } from '@/lib/languageUtils';

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';
const GITHUB_REST_ENDPOINT = 'https://api.github.com/users/';



const graphqlQuery = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
      repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: {field: STARGAZERS, direction: DESC}) {
        nodes {
          name
          description
          stargazerCount
          url
          languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            edges {
              size
              node {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export async function fetchGitHubData(username: string): Promise<GitHubData> {
  const cacheKey = `github:${username}`;
  const cached = getCached<GitHubData>(cacheKey);
  if (cached) return cached;

  const url = `${GITHUB_REST_ENDPOINT}${username}`;
  console.log(url);

  const token = process.env.GITHUB_TOKEN;
  console.log("Token exists:", !!token);
  console.log("Token length:", token?.length);
  if (!token) {
    throw new Error('GITHUB_TOKEN is not configured');
  }

  // 1. Fetch REST profile
  const restRes = await fetch(`${GITHUB_REST_ENDPOINT}${username}`, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    //   Accept: 'application/vnd.github.v3+json'
    // },
    next: { revalidate: 3600 }
  });

  if (!restRes.ok) {
    throw new Error(`GitHub REST API returned ${restRes.status}`);
  }
  const restData = await restRes.json();

  // 2. Fetch GraphQL (calendar, languages, repos)
  const gqlRes = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: graphqlQuery,
      variables: { username }
    }),
    next: { revalidate: 3600 }
  });

  if (!gqlRes.ok) {
    throw new Error(`GitHub GraphQL API returned ${gqlRes.status}`);
  }
  
  const gqlData = await gqlRes.json();
  if (gqlData.errors || !gqlData.data?.user) {
    throw new Error('Failed to fetch GitHub GraphQL data');
  }

  const user = gqlData.data.user;
  const reposNodes = user.repositories?.nodes || [];

  const calendar = flattenGitHubCalendar(
    user.contributionsCollection?.contributionCalendar?.weeks || []
  );
  
  const topLanguages = computeTopLanguages(reposNodes);
  
  const repos = reposNodes.slice(0, 6).map((repo: any) => ({
    name: repo.name,
    description: repo.description || '',
    stars: repo.stargazerCount,
    language: repo.languages?.edges?.[0]?.node?.name || 'Unknown',
    url: repo.url,
  }));

  const result: GitHubData = {
    login: restData.login,
    name: restData.name || restData.login,
    avatarUrl: restData.avatar_url,
    bio: restData.bio || '',
    followers: restData.followers,
    following: restData.following,
    publicRepos: restData.public_repos,
    calendar,
    topLanguages,
    repos,
  };

  setCached(cacheKey, result);
  return result;
}
