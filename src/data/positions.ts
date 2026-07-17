export type Position = {
  id: string;
  role: string;
  organization: string;
  duration: string;
  shortSummary: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  images: string[];
};

export const positions: Position[] = [
  {
    id: "pos-1",
    role: "Tech Lead",
    organization: "Optimus Club (LPU)",
    duration: "Mar 2025 – Present",
    shortSummary: "Leading web development and technical strategy.",
    description: "Managed a team of 5 developers to build and maintain the club's official web portal, instituting code-review guidelines that reduced merge conflicts by 30%. Oversaw end-to-end website development, debugging, and performance optimization, improving load reliability and uptime. Coordinated task allocation and sprint planning to ensure timely delivery and adherence to engineering best practices.",
    responsibilities: [
      "Team Management & Mentorship",
      "End-to-End Web Development",
      "Sprint Planning & Task Allocation",
      "Performance Optimization"
    ],
    achievements: [
      "Reduced merge conflicts by 30% through code-review guidelines",
      "Improved load reliability and overall platform uptime",
      "Successfully launched the new official web portal"
    ],
    images: [] // Placeholders or real images can be added here later
  }
];
