export type Experience = {
  id: number;
  title: string;
  company: string;
  date: string;
  description: string;
  skills: string[];
  type: 'work' | 'education';
};

export const experiences = [
  {
    id: 1,
    title: "SDE I (Software Development Engineer)",
    company: "Onix",
    date: "Aug 2024 - Present",
    description: "Developing intelligent solutions and AI-driven workflows.",
    skills: ["AI", "React", "TypeScript", "Node.js", "Python"],
    type: "work"
  },
  
];
