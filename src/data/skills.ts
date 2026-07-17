export type Skill = {
  name: string;
  category: 'Languages' | 'Frontend' | 'Backend' | 'Tools' | 'AI/ML' | 'Soft Skills';
};

// Kept for backward compatibility if any old component still imports it
export const skills: Skill[] = [
  { name: 'C++', category: 'Languages' },
  { name: 'JavaScript', category: 'Languages' },
  { name: 'C', category: 'Languages' },
  { name: 'Python', category: 'Languages' },
  { name: 'HTML5', category: 'Languages' },
  { name: 'CSS3', category: 'Languages' },
  { name: 'SQL', category: 'Languages' },
  { name: 'ReactJS', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'FastAPI', category: 'Backend' },
  { name: 'Express.js', category: 'Backend' },
  { name: 'Prisma ORM', category: 'Backend' },
  { name: 'RESTful APIs', category: 'Backend' },
  { name: 'GitHub', category: 'Tools' },
  { name: 'Docker', category: 'Tools' },
  { name: 'Google Cloud Run', category: 'Tools' },
  { name: 'Vercel', category: 'Tools' },
  { name: 'Supabase', category: 'Tools' },
  { name: 'Git', category: 'Tools' },
  { name: 'TensorFlow', category: 'AI/ML' },
  { name: 'Computer Vision', category: 'AI/ML' },
  { name: 'YOLOv8', category: 'AI/ML' },
  { name: 'MediaPipe', category: 'AI/ML' },
  { name: 'CatBoost', category: 'AI/ML' },
  { name: 'Scikit-Learn', category: 'AI/ML' },
];

export type SkillCategory = {
  category: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  { category: "Languages",              items: ["C++", "Python", "JavaScript", "TypeScript", "C", "SQL", "HTML5", "CSS3"] },
  { category: "Frontend",               items: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend",                items: ["Node.js", "Express.js", "FastAPI", "Prisma ORM", "RESTful APIs"] },
  { category: "Databases",              items: ["PostgreSQL", "Supabase", "Redis"] },
  { category: "DevOps & Infra",         items: ["Docker", "GitHub Actions", "CI/CD Pipelines"] },
  { category: "Cloud",                  items: ["Google Cloud", "Vercel"] },
  { category: "Machine Learning & AI",  items: ["TensorFlow", "YOLOv8", "MediaPipe", "CatBoost", "Scikit-Learn", "LangGraph", "Computer Vision"] },
  { category: "Developer Tools",        items: ["Git", "GitHub", "VS Code", "Postman"] },
];
