import { NextResponse } from 'next/server';
import { fetchGitHubData } from '@/services/githubService';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const resolvedParams = await params;
  const username = resolvedParams.username;
  
  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    const data = await fetchGitHubData(username);
    return NextResponse.json(data);
  } catch (error) {
    console.error('GitHub API Route Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}
