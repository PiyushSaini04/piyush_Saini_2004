export type Education = {
  id: string;
  degree: string;
  school: string;
  date: string;
  description?: string;
};

export const education: Education[] = [
  {
    id: 'edu-1',
    degree: 'B.Tech in Computer Science and Engineering',
    school: 'Lovely Professional University (LPU)',
    date: 'Aug 2023 - Present',
    description: 'CGPA: 7.81',
  },
  {
    id: 'edu-2',
    degree: 'Class XII (CBSE)',
    school: 'Army Public School',
    date: 'Apr 2021 - Mar 2022',
    description: 'Percentage: 80.80%',
  },
  {
    id: 'edu-3',
    degree: 'Class X (CBSE)',
    school: 'Army Public School',
    date: 'Apr 2019 - Mar 2020',
    description: 'CGPA: 81.40%',
  },
];
