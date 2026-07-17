import "server-only";

import { LeetCodeData } from "@/types/coding";
import { getCached, setCached } from "@/lib/cache";
import { flattenLeetCodeCalendar } from "@/lib/calendarUtils";

const LEETCODE_API_ENDPOINT = "https://leetcode.com/graphql";

/* ---------------------------------- */
/* Profile + Calendar Query          */
/* ---------------------------------- */

const profileQuery = `
query userProfileCalendar($username: String!, $year: Int) {
  matchedUser(username: $username) {
    username

    submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
      }
    }

    profile {
      ranking
      userAvatar
    }

    userCalendar(year: $year) {
      activeYears
      streak
      totalActiveDays
      submissionCalendar
    }
  }
}
`;

/* ---------------------------------- */
/* Languages Query                    */
/* ---------------------------------- */

const languageQuery = `
query languageStats($username: String!) {
  matchedUser(username: $username) {
    languageProblemCount {
      languageName
      problemsSolved
    }
  }
}
`;

/* ---------------------------------- */
/* Skills Query                       */
/* ---------------------------------- */

const skillsQuery = `
query skillStats($username: String!) {
  matchedUser(username: $username) {
    tagProblemCounts {
      advanced {
        tagName
        tagSlug
        problemsSolved
      }

      intermediate {
        tagName
        tagSlug
        problemsSolved
      }

      fundamental {
        tagName
        tagSlug
        problemsSolved
      }
    }
  }
}
`;

/* ---------------------------------- */
/* Contest Query                      */
/* ---------------------------------- */

const contestQuery = `
query userContestRankingInfo($username: String!) {

  userContestRanking(username: $username) {
    attendedContestsCount
    rating
    globalRanking
    totalParticipants
    topPercentage

    badge {
      name
    }
  }

}
`;

/* ---------------------------------- */
/* Reusable GraphQL Fetch Function    */
/* ---------------------------------- */

async function fetchGraphQL(
  query: string,
  variables: Record<string, any>
) {
  const response = await fetch(LEETCODE_API_ENDPOINT, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com",
    },

    body: JSON.stringify({
      query,
      variables,
    }),

    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();

    console.log("LeetCode Error:");
    console.log(errorText);

    throw new Error(
      `LeetCode API returned ${response.status}`
    );
  }

  const json = await response.json();

  return json.data;
}

/* ---------------------------------- */
/* Main Function                      */
/* ---------------------------------- */

export async function fetchLeetCodeData(
  username: string
): Promise<LeetCodeData> {
  const cacheKey = `leetcode:${username}`;

  const cached =
    getCached<LeetCodeData>(cacheKey);

  if (cached) {
    return cached;
  }

  /* ---------------------- */
  /* Fetch all the queries  */
  /* ---------------------- */

  const profileData = await fetchGraphQL(
    profileQuery,
    {
      username,
      year: null,
    }
  );

  const languageData = await fetchGraphQL(
    languageQuery,
    {
      username,
    }
  );

  const skillData = await fetchGraphQL(
    skillsQuery,
    {
      username,
    }
  );

  const contestData = await fetchGraphQL(
    contestQuery,
    {
      username,
    }
  );

  /* ---------------------- */
  /* Profile                */
  /* ---------------------- */

  const matchedUser =
    profileData?.matchedUser;

  if (!matchedUser) {
    throw new Error(
      "LeetCode user not found."
    );
  }

  const submissions =
    matchedUser.submitStatsGlobal
      ?.acSubmissionNum ?? [];

  const totalSolved =
    submissions.find(
      (s: any) => s.difficulty === "All"
    )?.count ?? 0;

  const easySolved =
    submissions.find(
      (s: any) => s.difficulty === "Easy"
    )?.count ?? 0;

  const mediumSolved =
    submissions.find(
      (s: any) => s.difficulty === "Medium"
    )?.count ?? 0;

  const hardSolved =
    submissions.find(
      (s: any) => s.difficulty === "Hard"
    )?.count ?? 0;

  const ranking =
    matchedUser.profile?.ranking ?? 0;

  const avatarUrl =
    matchedUser.profile?.userAvatar ?? undefined;

  /* ---------------------- */
  /* Calendar               */
  /* ---------------------- */

  const calendar =
    flattenLeetCodeCalendar(
      matchedUser.userCalendar
        ?.submissionCalendar || "{}"
    );

  /* ---------------------- */
  /* Languages              */
  /* ---------------------- */

  const languages =
    languageData?.matchedUser
      ?.languageProblemCount ?? [];

  /* ---------------------- */
  /* Skills                 */
  /* ---------------------- */

  const skills =
    skillData?.matchedUser
      ?.tagProblemCounts ?? {
        advanced: [],
        intermediate: [],
        fundamental: [],
      };

  /* ---------------------- */
  /* Contest Info           */
  /* ---------------------- */

  const contestInfo =
    contestData?.userContestRanking ?? null;

  /* ---------------------- */
  /* Final Result           */
  /* ---------------------- */

  const result: LeetCodeData = {
    username,
    avatarUrl,

    totalSolved,
    easySolved,
    mediumSolved,
    hardSolved,

    ranking,

    calendar,

    languages,

    skills,

    contestInfo,
  };

  setCached(cacheKey, result);

  return result;
}