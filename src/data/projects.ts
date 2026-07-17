export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image: string;
  date: string;
};

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "Investment Research Platform",
    description:
      "A multi-agent investment research platform that performs parallel financial, valuation, news, and macroeconomic analysis to generate structured INVEST/PASS recommendations with real-time progress tracking.",
    tags: [
      "Next.js",
      "LangGraph",
      "TypeScript",
      "Supabase",
      "Gemini",
      "FMP",
    ],
    image: "/assets/projects/placeholder-1.png",
    date: "Jul 2026",
  },

  {
    id: "proj-2",
    title: "Distributed Task Scheduler",
    description:
      "A fault-tolerant distributed job orchestration system featuring Redis-backed queues, PostgreSQL lifecycle tracking, dead-letter queues, and real-time monitoring using Prometheus and Grafana.",
    tags: [
      "Node.js",
      "Redis",
      "PostgreSQL",
      "Docker",
      "Prometheus",
      "Grafana",
    ],
    image: "/assets/projects/placeholder-2.png",
    date: "Jun 2026",
  },

  {
    id: "proj-3",
    title: "VisionFocus",
    description:
      "A real-time student engagement analysis system combining MediaPipe, YOLOv8, and CatBoost for pose estimation and attention classification with a macro-F1 score of 0.92.",
    tags: [
      "MediaPipe",
      "YOLOv8",
      "CatBoost",
      "Computer Vision",
      "Python",
    ],
    image: "/assets/projects/placeholder-3.png",
    date: "Apr 2026",
  },

  {
    id: "proj-4",
    title: "EcoPlay",
    description:
      "A scalable full-stack educational platform featuring an AI chat assistant, containerized microservices, automated CI/CD pipelines, and deployment on Google Cloud Run.",
    tags: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Docker",
      "GitHub Actions",
      "Google Cloud",
    ],
    image: "/assets/projects/placeholder-4.png",
    date: "Oct 2025",
  },

  {
    id: "proj-5",
    title: "Optimus Event",
    description:
      "A multi-tenant event management platform with secure payment processing, transactional integrity, and Row-Level Security policies using Supabase and Razorpay.",
    tags: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Razorpay",
    ],
    image: "/assets/projects/placeholder-5.png",
    date: "Oct 2025",
  },

  {
    id: "proj-6",
    title: "Sign Language Detection System",
    description:
      "An end-to-end deep learning pipeline for continuous sign language recognition using TensorFlow and LSTMs, capable of recognizing 100+ gestures in real time.",
    tags: [
      "TensorFlow",
      "LSTM",
      "Computer Vision",
      "Python",
    ],
    image: "/assets/projects/placeholder-6.png",
    date: "May 2025",
  },

  {
    id: "proj-7",
    title: "Drone vs Bird Detection System",
    description:
      "A custom-trained YOLOv8 model optimized for high-altitude target identification, capable of distinguishing drones and birds in complex aerial environments with real-time inference.",
    tags: [
      "Python",
      "YOLOv8",
      "Computer Vision",
      "Roboflow",
    ],
    image: "/assets/projects/placeholder-7.png",
    date: "Jan 2025",
  }
];
