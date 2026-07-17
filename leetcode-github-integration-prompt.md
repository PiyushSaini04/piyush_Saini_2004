# Piyush Saini — Live LeetCode & GitHub Integration (Feature Addition Prompt)

> Give this document to your build agent (Antigravity) as an add-on spec. It only touches the
> **Experience & Coding Activity** section and the **Achievements** area — every other section,
> animation, color, and behavior already defined in the previous prompts must stay exactly as
> it is. This document describes *what* to build and *how it should be organized*, in plain
> language — no code, the agent decides its own implementation.

---

## 0. What This Feature Is

Right now the Coding Activity section shows static, hand-typed numbers (total solved, active
days, streak) and a heatmap graphic that isn't connected to anything real. This feature replaces
that static data with **live data pulled directly from LeetCode and GitHub**, so the numbers,
heatmap, ranking, languages, and repositories on the site are always current and update
automatically — without needing to manually edit the site every time you solve a new problem or
push new code.

This should slot into the existing section cleanly: same card styling, same section
placement, same entrance animation already defined for that section (the self-drawing timeline
+ progressive reveal) — only the data behind the Coding Platforms cards and heatmap becomes
live, and a small GitHub panel is added alongside it.

---

## 1. Where This Lives on the Site

- **Experience & Coding Activity section** (existing): the "Coding Platforms" card and the
  contribution heatmap beneath it switch from static numbers to live LeetCode data. Nothing
  about the Professional History timeline changes.
- **New: a GitHub panel**, placed directly beside or beneath the LeetCode panel within this same
  section (not a separate new page or section) — profile summary, a second contribution
  heatmap, top-language breakdown, and a small set of pinned repositories.
- **Achievements strip** (the highlight cards suggested in the previous content-update prompt —
  LeetCode global rank, Smart India Hackathon qualification, DSA problems solved): the "DSA
  problems solved" and "global rank" figures in this strip should pull from the same live
  LeetCode data source rather than being separately hand-typed, so they never fall out of sync
  with the Coding Activity section above it.

Nothing about the color palette, fonts, card style, page-scroll behavior, or any other section
should change because of this feature — it's a data/content upgrade to one section only.

---

## 2. What To Display

### From LeetCode
- Username
- Total problems solved
- Easy / Medium / Hard solved breakdown
- Global ranking
- A full submission-activity heatmap (calendar-style, like the one currently on the site)

### From GitHub
- Name, avatar, short bio
- Followers / following / public repository count
- A contribution heatmap (same visual style as the LeetCode one, so the two feel like a matched
  pair rather than two different widgets bolted together)
- Top 5 most-used languages across your public repositories, shown as a simple ranked list or
  bar breakdown — not a long tail of every language down to fractions of a percent
- 3 to 6 pinned/notable repositories, each showing name, short description, star count, primary
  language, and a link to the repo

Deliberately **do not** add: total lifetime commit counts, badge/trophy widgets, animated
"contribution snake" graphics, or a wall of every single repository. Keep this section as clean
and curated as the rest of the site — a handful of meaningful numbers and a heatmap, not a
cluttered stats dashboard.

---

## 3. Backend Approach

Build this in small, verifiable stages rather than one large pass — get the data flowing
correctly before touching any visual design, and don't move to the next stage until the current
one is confirmed working.

**Stage A — Data services.** Build a dedicated LeetCode data service and a dedicated GitHub data
service, each responsible only for talking to its respective API and handing back clean,
already-typed data — no UI concerns inside either of these. LeetCode's data has to come through
its GraphQL endpoint (there's no official public REST API for it); GitHub should be read through
its official REST and GraphQL APIs — never scrape profile pages, and don't reach for third-party
scraping APIs for anything the official GitHub API can already provide directly. The one thing
GitHub's REST API can't give you directly is the contribution calendar — that specifically needs
to come from GitHub's GraphQL API's contribution-collection data, which requires a GitHub
personal access token kept server-side only, never exposed to the browser.

**Stage B — API routes.** Expose each service through its own API route on the site's own
backend (one route that takes a LeetCode username, one that takes a GitHub username), so the
frontend never talks to LeetCode or GitHub directly — it always goes through your own API. Each
route should validate that a username was actually provided, respond with proper success/error
status codes, and return clean JSON only.

**Stage C — Data shaping.** Both LeetCode's and GitHub's raw responses come back in a format
that isn't directly usable by a calendar-heatmap component — timestamps and nested week/day
structures need to be converted into a simple, flat list of "this date had this many
contributions" entries, sorted chronologically, with sensible handling for a username that has
no activity at all. Do the same kind of flattening/summarizing for GitHub's language data,
reducing a full repository language breakdown down to just the top five languages by usage.

**Stage D — Caching.** Neither LeetCode nor GitHub data changes minute to minute, so don't hit
their APIs on every single page load. Cache each username's results for a reasonable window (an
hour is a sensible default) so that repeated visits or page refreshes reuse the cached response
instead of re-querying LeetCode/GitHub every time. This should be a small, reusable piece of
logic shared by both the LeetCode and GitHub services rather than two separate one-off
implementations.

**Stage E — Heatmap rendering.** Use an existing, well-supported calendar-heatmap component
library for the visual heatmap grid rather than building the grid-and-tooltip rendering logic
from scratch — plug your parsed data into it rather than reinventing what it already does well.

**Stage F — Presentation components.** Build the on-page pieces as pure "receive data, render
it" components with no API calls or data-shaping logic inside them: a LeetCode stats card, a
LeetCode heatmap, a GitHub profile/stats card, a GitHub heatmap, a GitHub languages list, and a
GitHub repositories list. Each one should handle its own loading state (a lightweight skeleton or
placeholder, styled to match the site, while data is being fetched) and its own empty/error state
(a calm fallback message rather than a broken-looking blank card) — but none of them should know
*how* the data was fetched, only how to display what they're given.

**Stage G — Wiring it together.** A single hook (or equivalent shared piece of logic) per
platform should be responsible for calling your own API route, handling the loading/error state,
and handing finished data down to the presentation components — this is the one place that
connects "fetching" to "displaying," keeping the components themselves free of that
responsibility.

---

## 4. Folder Structure — How This Fits Into the Existing Project

Add these as clearly separated additions inside the project's existing folder layout, without
disturbing anything already organized under components, data, or the public asset folders from
the earlier prompts:

- Inside the existing components folder, add two new subfolders sitting alongside the other
  section folders (hero, about, skills, projects, etc.): one for the LeetCode-related display
  pieces (stats card + heatmap) and one for the GitHub-related display pieces (stats card,
  heatmap, languages list, repositories list). These should be usable from within the existing
  Experience & Coding Activity section component without that section's own file needing to
  contain any fetching logic itself.
- Add a services folder (if one doesn't already exist) containing one file dedicated to LeetCode
  data-fetching and one dedicated to GitHub data-fetching — kept completely separate from each
  other so either platform's logic could be modified or replaced independently.
- Add a utilities folder containing the calendar/date-flattening logic (shared in spirit between
  LeetCode and GitHub, since both need timestamp-to-date conversion, even though the raw shapes
  differ), the language-percentage calculation logic, and the shared caching logic.
- Add a types folder (or extend the existing one) with a dedicated set of type definitions for
  the shapes of LeetCode data and GitHub data respectively, so the rest of the app always knows
  exactly what fields are available.
- Add a hooks folder (or extend the existing one) with one hook for consuming LeetCode data and
  one for consuming GitHub data, each wrapping the loading/error/data states described in Stage G.
- Add the two new API routes under the project's existing API folder, one namespaced for
  LeetCode and one namespaced for GitHub, each accepting a username as a dynamic parameter.
- Store your LeetCode and GitHub usernames, and the GitHub personal access token, as environment
  configuration rather than hard-coded values — the token in particular must never be shipped to
  the browser or committed to source control.

None of this requires touching the folders already established for hero frames, certificates,
resume, project images, or profile photos from the earlier prompts — this feature is additive
and self-contained.

---

## 5. Integration Rules — Don't Break Anything Else

- The Coding Activity section keeps its already-defined scroll-linked entrance animation (the
  self-drawing timeline and progressive card reveals) — the only change is that the numbers and
  heatmap inside it are now live instead of static.
- The new GitHub panel should adopt the same card styling, spacing, and entrance timing as the
  existing Coding Platforms cards, so it reads as part of the same section rather than a
  visually distinct add-on.
- Respect the site's white/monochrome professional palette already defined for the rest of the
  site — the heatmap's activity-intensity shading should use tints of the same neutral palette
  (lighter-to-darker or lighter-to-brighter neutral squares) rather than reintroducing color, and
  language-breakdown bars/lists should also stay within that neutral palette rather than using a
  rainbow of arbitrary per-language colors.
- If either the LeetCode or GitHub API is temporarily unreachable, the section should fail
  gracefully — show a calm "data temporarily unavailable" state for just the affected panel
  (LeetCode or GitHub independently), never a broken layout, and never take down the rest of the
  page.
- The Achievements strip's "DSA problems solved" and "global rank" figures should read from the
  same live LeetCode data as the Coding Activity section, so updating one place never leaves the
  other stale.

---

## 6. Build Order Checklist

- [ ] Confirm LeetCode username and GitHub username/personal access token are available as
      environment configuration (token kept server-side only)
- [ ] Build the LeetCode service (GraphQL fetch: total solved, easy/medium/hard, ranking,
      submission calendar) and confirm it returns correct data before touching any UI
- [ ] Build the LeetCode API route on top of that service, with validation and error handling
- [ ] Build the submission-calendar-to-date-list utility and confirm it produces a clean,
      sorted list
- [ ] Add caching to the LeetCode service (roughly one-hour freshness window)
- [ ] Build the GitHub service (profile info, public repos, languages, contribution calendar via
      GraphQL) and confirm it returns correct data before touching any UI
- [ ] Build the GitHub API route on top of that service, with validation and error handling
- [ ] Build the GitHub contribution-calendar-to-date-list utility
- [ ] Build the top-five-languages calculation utility
- [ ] Build the pinned/notable-repositories selection logic (sorted by stars, capped at six)
- [ ] Add caching to the GitHub service (roughly one-hour freshness window)
- [ ] Install a calendar-heatmap component library rather than building the grid from scratch
- [ ] Build the presentation-only components: LeetCode stats card, LeetCode heatmap, GitHub
      stats card, GitHub heatmap, GitHub languages list, GitHub repositories list — each with its
      own loading and empty/error state, styled to match the site's neutral palette
- [ ] Build the LeetCode and GitHub data-fetching hooks that connect the API routes to these
      components
- [ ] Wire the live LeetCode data into the existing Coding Activity section, replacing the
      static numbers/heatmap, without altering that section's existing entrance animation
- [ ] Add the new GitHub panel into the same section, styled consistently with the existing cards
- [ ] Wire the Achievements strip's DSA-solved and global-rank figures to the same live LeetCode
      data source
- [ ] Test the whole flow with more than one username to confirm it isn't hard-coded to a single
      profile
- [ ] Confirm graceful fallback behavior when either API is briefly unavailable
- [ ] Full responsive and reduced-motion re-check limited to this section, confirming no other
      part of the site was affected
