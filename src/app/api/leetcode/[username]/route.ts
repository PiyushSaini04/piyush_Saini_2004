import { NextResponse } from 'next/server';
import { fetchLeetCodeData } from '@/services/leetcodeService';

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
    const data = await fetchLeetCodeData(username);
    return NextResponse.json(data);
  } catch (error) {
    console.error('LeetCode API Route Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch LeetCode data' },
      { status: 500 }
    );
  }
}
