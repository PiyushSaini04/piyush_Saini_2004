# Piyush Saini — Portfolio Revision Prompt (v2)

> Give this document to your build agent (Antigravity) to apply as a round of fixes and
> updates to the site that's already been built. Everything below is a description of the
> change needed — no code, the agent should decide its own implementation. Content updates in
> section 5 are pulled directly from the attached CV and should replace the current placeholder
> content wherever they differ.

---

## 1. Fixes to Existing Sections

### Hero — frame cropping
The first frame is coming is black i want you start with the second frame means when i open the screen the nothing is their i want second frame is their
The scroll-scrubbed frame sequence is currently cropping the video frames in from the sides.
The full frame — the entire width of the original shot — needs to be visible at all times,
never cropped or zoomed in on the sides to force-fill the container. If the frame's proportions
don't perfectly match the screen, letterbox it (show it in full with even space around it)
rather than cropping any part of it away.

### Hero → About transition
Right now the jump from the Hero section into the About section feels abrupt — the two don't
feel like they belong to the same page. Smooth this handoff by adding a soft shadow/gradient
blend across the seam between the two sections (a soft dark gradient overlay fading from the
bottom of the Hero into the top of About, and vice versa) so the transition reads as one
continuous surface rather than two separate blocks stacked on top of each other.

### About section width
Increase the overall width of the About section's content area — it currently reads as too
narrow/cramped compared to the rest of the page. Widen it so it breathes more in line with how
the other sections use the available screen width.

### Skills — bubble behavior
The circular skill bubbles need three changes:
- **Size driven by content:** each bubble's size should scale to fit the amount of text inside
  it (a short skill name like "Git" gets a small bubble, a longer one like "TailwindCSS" or
  "Prisma ORM" gets a proportionally larger bubble) rather than all bubbles being a fixed size.
- **Continuous motion with collision:** bubbles should drift on their own continuously, and
  when two bubbles' paths cross, they should bounce/deflect off each other like physical objects
  rather than overlapping or passing through one another.
- **Mouse interaction:** the user should be able to reach into the cloud and push or drag
  bubbles around with the cursor/mouse, with the bubbles reacting physically (nudged out of the
  way, or picked up and moved) rather than just triggering a hover style.

### Projects section
No changes requested — leave as is.

### Experience & Coding Activity — missing entrance animation
This section currently has no animation at all when it scrolls into view. Add a scroll-linked
entrance animation here: the timeline line should draw itself in as the section comes into view,
with each history entry and each coding-platform card animating in progressively as the user
scrolls through the section, rather than the section just appearing statically.

### Education — different animation, timeline with scroll
Add a distinct entrance animation to this section (different from every other section's
animation, and different from whatever Experience ends up using) and restructure it as a proper
scroll-driven timeline: as the user scrolls through this section, the timeline should visually
progress/build itself in sync with scroll position, with each education entry revealing itself
as the scroll reaches it — rather than the current static block layout.

### Certifications — add a simple appear-on-screen animation
Unlike Experience/Education (which animate progressively *with* scroll), the certificates
section just needs a simple, clean animation that plays once when the section enters the
viewport — cards fade/rise into place as soon as they appear on screen, with no further
animation tied to scroll position after that.

### Contact section — add a simple appear-on-screen animation
Same treatment as Certifications: a simple, clean entrance animation that plays once when the
section comes into view, not tied to continued scrolling.

### Certificates "View All" page-transition cover
The full-screen cover that plays when navigating to the certificates page is currently a
colorful panel with "Piyush Saini" written on it. Change this to a **plain white** panel (no
color, no gradient), keep the name text on it, and make the whole sweep-cover-reveal animation
noticeably **faster** than it currently is — it should feel quick and crisp, not lingering.

---

## 2. Global Color Change — Remove Pink/Purple, Go White/Professional

The current pink/purple accent gradient throughout the site (headings, buttons, glows, active
states, bubble colors) needs to be replaced site-wide. Move to a clean, professional
white/monochrome palette instead: white and light-gray accents against the dark background,
with black/near-black used for contrast where needed, rather than any pink, purple, or magenta
tones. This should apply everywhere the old accent color currently shows up — nav highlights,
headings, buttons, glows, skill bubble colors, hover states, the loader, and the certificates
page-cover — so the whole site reads as sharp and professional rather than colorful.

---

## 3. Global Scroll Behavior — Constant Speed Regardless of Scroll Input

Right now, scrolling quickly (a fast trackpad flick or rapid wheel spin) breaks the animation
timing and makes the scroll-linked effects look glitchy or skip ahead. Fix this so scroll
progress advances at a **steady, constant speed** no matter how fast or slow the user
physically scrolls — a fast flick shouldn't fast-forward through the animation, it should be
smoothly caught up to at the same steady pace as a slow scroll. This applies everywhere scroll
drives an animation (the Hero frame sequence, the Projects horizontal gallery, the
Experience/Education scroll-timelines) as well as the general page-scroll feel, so the whole
site always animates at one consistent, controlled pace regardless of how the user scrolls.

---

## 4. Content Update — Pull From Attached CV

Update the site's content to match the attached CV exactly, replacing anything currently on the
site that's outdated or different. Specifics below.

### Hero stats
- CGPA: **7.81**
- DSA problems solved: **250+** (CV states 250+ DSA problems solved across arrays, trees,
  graphs, and dynamic programming)
- Certificates: reflect the actual current count once the Certificates section below is updated
  (see note on that section)

### Technical Skills section
Replace the current category groupings with:
- **Languages:** C++, JavaScript, C, Python, HTML5, CSS3, SQL
- **Frontend:** ReactJS, Next.js, TypeScript, Tailwind CSS
- **Backend:** Node.js, FastAPI, Express.js, Prisma ORM, RESTful APIs
- **Tools/Platforms:** GitHub, Docker, Google Cloud Run, Vercel, Supabase, Git
- **AI/ML:** TensorFlow, Computer Vision, YOLOv8, MediaPipe, CatBoost, Scikit-Learn
- **Soft Skills:** Adaptability, Problem-Solving, Teamwork, Collaborative, Accountable,
  Research & Analysis, Flexible

(Soft Skills is a new category not currently represented on the site — add it as its own group
within the bubble cloud alongside the technical categories, in its own accent color.)

### Projects section
Replace the current four projects with the following seven, in this order (most recent first),
each linking out to its GitHub repo:

1. **Investment Research Platform** — Next.js, LangGraph, TypeScript, Supabase, Gemini, FMP —
   Jun 2026 – Jul 2026. A multi-agent investment research platform that resolves public
   companies, runs parallel analysis across fundamentals, financial statements, news, valuation,
   risk, and macro indicators, and produces structured INVEST/PASS recommendations, with a
   resilient research pipeline (FMP as the primary data source, deterministic fallback scoring,
   Supabase persistence) and real-time streaming progress updates.
2. **Distributed Task Scheduler** — Node.js, Redis, Docker — May 2026 – Jun 2026. A
   fault-tolerant job orchestration platform using Redis-backed queues and PostgreSQL lifecycle
   tracking across distributed workers, with exponential backoff, dead-letter queue isolation,
   idempotency checks, crash recovery, and full observability via Docker Compose, Prometheus,
   and Grafana.
3. **VisionFocus** — MediaPipe, YOLOv8, CatBoost, Computer Vision — Mar 2026 – Apr 2026. A
   dual-pipeline real-time inference system combining MediaPipe pose estimation and a
   customized YOLOv8 model at 24 FPS on consumer CPU hardware, with a CatBoost classifier
   (focal-loss optimized) reaching a macro-F1 of 0.92, and a temporal state machine that reduced
   spurious state changes by 38%.
4. **EcoPlay** — Next.js 14, TypeScript, Node.js, Prisma ORM, Docker, GitHub Actions — Sep 2025
   – Oct 2025. A full-stack web app with nested educator/learner roles, an async AI chat
   assistant on quantized open-source models, and a containerized CI/CD pipeline that cut
   build-to-deploy time from 12 minutes to 4.2 minutes.
5. **Optimus Event** *(replaces the current "Optimus Website" entry)* — Next.js, TypeScript,
   Supabase (PostgreSQL), Razorpay — Aug 2025 – Oct 2025. A multi-tenant event management
   platform with secure transactions, Row-Level Security, transactional locks for
   high-concurrency registration, and Razorpay webhook integration reaching 99.98%
   transaction-to-database consistency.
6. **Sign Language Detection System** — TensorFlow, LSTM, Computer Vision — Feb 2025 – May 2025.
   A spatial-temporal deep learning pipeline recognizing 100+ continuous sign gestures at 12ms
   inference latency (80+ FPS), with a sliding-window confidence-threshold algorithm that cut
   false-positive transitions by 42%.
7. **Drone vs. Bird Detection System** — Python, YOLOv8, Computer Vision — Dec 2024 – Jan 2025.
   A fine-tuned YOLOv8-nano model distinguishing drones from birds in complex sky backgrounds,
   trained on 15,000+ annotated aerial frames, reaching 0.89 mAP@0.5:0.95 with a 45% reduction
   in memory footprint for edge deployment.

Note: the previous "AI Chatbot for Course & Job Recommendation" project isn't in the current CV
— drop it unless you want to keep it as an extra portfolio piece outside the CV-driven list.

### Experience / Position of Responsibility
Replace the current two entries (Tech Lead + Full Stack Developer Intern at NexGen Solutions)
with the single role from the CV:

- **Tech Lead | Optimus Club (LPU)** — Mar 2025 – Present. Managed a team of 5 developers to
  build and maintain the club's official web portal, introducing code-review guidelines that
  reduced merge conflicts by 30%; oversaw end-to-end development, debugging, and performance
  optimization improving load reliability and uptime; coordinated task allocation and sprint
  planning for on-time delivery.

(The NexGen Solutions internship isn't in the current CV — drop it unless you want to keep it
listed separately as prior experience outside the CV-driven content.)

### Coding Platforms / Achievements
Update the stats and highlights to match the CV:
- Ranked **1234 globally** in a LeetCode Biweekly Contest among **21,000+ participants** (Dec 2025)
- Qualified for **Round 2 of Smart India Hackathon 2025**, contributing to a national-level tech
  solution (Sep 2025)
- **250+ DSA problems solved** across arrays, trees, graphs, and dynamic programming (Sep 2025)

Consider adding these three as a dedicated "Achievements" strip (a row of three highlight cards)
since they're strong, CV-backed proof points that aren't currently shown anywhere on the site —
this is a suggested addition, not a strict requirement.

### Education
- **Lovely Professional University** — Punjab, India — Bachelor of Technology, Computer Science
  and Engineering — CGPA 7.81 — Aug 2023 – Present
- **Army Public School** — Unchi Bassi, Punjab — Intermediate — Percentage 80.80% — Apr 2021 –
  Mar 2022 (update from the current "8.1 CGPA" figure, which doesn't match the CV's percentage)

### Certificates
The CV lists only two certificates:
- **Social Networking** — NPTEL — May 2025
- **HTML & CSS In-Depth** — Coursera — Dec 2023

This is fewer than what's currently shown on the site (which has six, including ChatGPT Prompt
Engineering, Build Generative AI Apps, Computer Networking, Hardware & OS, and Digital Systems).
Please confirm which of those additional four are still valid/current — if they're real
certificates you hold but simply weren't listed on this version of the CV, keep them; otherwise
trim the section down to just the two CV-listed certificates so the site doesn't show anything
that isn't backed by your actual credentials.

---

## 5. Build Order Checklist

- [ ] Fix Hero frame sequence to show the full, uncropped frame (letterbox instead of crop)
- [ ] Add the shadow/gradient blend between Hero and About
- [ ] Widen the About section's content area
- [ ] Rebuild skill bubbles: size-by-text-length, continuous motion with collision, mouse drag/push interaction
- [ ] Add scroll-linked entrance animation to Experience & Coding Activity (self-drawing timeline + progressive card reveals)
- [ ] Rebuild Education as a scroll-driven timeline with its own distinct entrance animation
- [ ] Add a simple appear-once animation to Certifications
- [ ] Add a simple appear-once animation to Contact
- [ ] Change the certificates page-transition cover to plain white and speed up the animation
- [ ] Replace the pink/purple accent color site-wide with a white/monochrome professional palette
- [ ] Normalize scroll-to-animation speed so fast scrolling no longer breaks/skips the animations
- [ ] Update Hero stats, Skills, Projects, Experience, Coding Activity/Achievements, Education, and Certificates content per section 4 above
- [ ] Confirm with Piyush which of the four extra certificates (beyond the two in the CV) should stay or be removed
- [ ] Full responsive + reduced-motion re-check after all the above changes
