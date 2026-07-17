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
    title: 'Social Networking',
    issuer: 'NPTEL',
    date: 'May 2025',
    image: '/assets/certificates/cert-1.jpg',
  },
  {
    id: 'cert-2',
    title: 'HTML & CSS In-Depth',
    issuer: 'Coursera',
    date: 'Dec 2023',
    image: '/assets/certificates/cert-2.jpg',
  }
];
