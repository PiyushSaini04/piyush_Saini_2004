export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string; // Path to image, e.g., '/assets/certificates/cert-1.jpg'
  link?: string; // Optional link to verify
};

export const certificates: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Build Generative AI Apps and Solutions with No-Code Tools',
    issuer: 'Udemy',
    date: 'Nov 2025',
    image: '/assets/certificates/Build Generative AI Apps.png',
  },
  {
    id: 'cert-2',
    title: 'ChatGPT-4 Prompt Engineering ChatGPT, Generative AI & LLM',
    issuer: 'Infosys',
    date: 'Nov 2025',
    image: '/assets/certificates/ChatGPT-4 Prompt Engineering ChatGPT, Generative AI & LLM.png',
  },
  {
    id: 'cert-9',
    title: 'Master Generative AI & Generative AI tools',
    issuer: 'Udemy',
    date: 'Aug 2025',
    image: '/assets/certificates/Master Generative AI.png',
  },
  {
    id: 'cert-3',
    title: 'ChatGPT Made Easy: Al Essentials for Beginners',
    issuer: 'Udemy',
    date: 'Aug 2025',
    image: '/assets/certificates/ChatGPT Made Easy Al.png',
  },
  {
    id: 'cert-4',
    title: 'Introduction to Software Engineering',
    issuer: 'IBM',
    date: 'Dec 2024',
    image: '/assets/certificates/Introduction to Software Engineering.png',
  },
  {
    id: 'cert-5',
    title: 'Peer-to-Peer Protocols and Local Area Networks',
    issuer: 'Coursera',
    date: 'Oct 2025',
    image: '/assets/certificates/Peer-to-Peer Protocols and Local Area Networks.png',
  },
  {
    id: 'cert-6',
    title: 'Introduction to Hardware and Operating Systems',
    issuer: 'Coursera',
    date: 'Sep 2024',
    image: '/assets/certificates/Introduction to Hardware and Operating Systems.png',
  },
  {
    id: 'cert-7',
    title: 'Fundamentals of Network Communication',
    issuer: 'Coursera',
    date: 'Sep 2024',
    image: '/assets/certificates/Fundamentals of Network Communication.png',
  },
  {
    id: 'cert-8',
    title: 'HTML and CSS in depth',
    issuer: 'Coursera',
    date: 'Dec 2023',
    image: '/assets/certificates/HTML and CSS in depth.png',
  }
];
