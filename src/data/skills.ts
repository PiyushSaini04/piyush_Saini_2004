export type Skill = {
  name: string;
  category: 'Languages' | 'Frontend' | 'Backend' | 'Tools' | 'AI/ML' | 'Soft Skills';
};

export const skills: Skill[] = [
  // Languages
  { name: 'C++', category: 'Languages' },
  { name: 'JavaScript', category: 'Languages' },
  { name: 'C', category: 'Languages' },
  { name: 'Python', category: 'Languages' },
  { name: 'HTML5', category: 'Languages' },
  { name: 'CSS3', category: 'Languages' },
  { name: 'SQL', category: 'Languages' },
  
  // Frontend
  { name: 'ReactJS', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  
  // Backend
  { name: 'Node.js', category: 'Backend' },
  { name: 'FastAPI', category: 'Backend' },
  { name: 'Express.js', category: 'Backend' },
  { name: 'Prisma ORM', category: 'Backend' },
  { name: 'RESTful APIs', category: 'Backend' },
  
  // Tools/Platforms
  { name: 'GitHub', category: 'Tools' },
  { name: 'Docker', category: 'Tools' },
  { name: 'Google Cloud Run', category: 'Tools' },
  { name: 'Vercel', category: 'Tools' },
  { name: 'Supabase', category: 'Tools' },
  { name: 'Git', category: 'Tools' },
  
  // AI/ML
  { name: 'TensorFlow', category: 'AI/ML' },
  { name: 'Computer Vision', category: 'AI/ML' },
  { name: 'YOLOv8', category: 'AI/ML' },
  { name: 'MediaPipe', category: 'AI/ML' },
  { name: 'CatBoost', category: 'AI/ML' },
  { name: 'Scikit-Learn', category: 'AI/ML' },
  
  // Soft Skills
  { name: 'Adaptability', category: 'Soft Skills' },
  { name: 'Problem-Solving', category: 'Soft Skills' },
  { name: 'Teamwork', category: 'Soft Skills' },
  { name: 'Collaborative', category: 'Soft Skills' },
  { name: 'Accountable', category: 'Soft Skills' },
  { name: 'Research & Analysis', category: 'Soft Skills' },
  { name: 'Flexible', category: 'Soft Skills' },
];
