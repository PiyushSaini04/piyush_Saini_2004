export type Project = {
  id: string;
  title: string;
  smallDescription: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image: string;
  images?: string[];
  date: string;
  features?: string[];
  techStack?: string[];
};

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "Investment Research Platform",
    smallDescription:
      "Multi-agent AI platform for automated investment research and analysis.",
      description: `I wanted to build a platform that could automate the process of researching a company before investing. Usually, investors have to open multiple websites to check financial statements, news, company fundamentals, risks, and valuation, which is time-consuming and often inconsistent. The goal was to combine all of this into a single research workflow.

The biggest challenge was integrating data from multiple sources while ensuring the system remained reliable even if an external API failed. Financial APIs are not always consistent, so depending entirely on one response could make the platform unreliable.

To solve this, I designed a multi-agent architecture where different agents handled separate tasks such as company resolution, financial analysis, news analysis, risk evaluation, and valuation. I used Financial Modeling Prep as the primary financial data source and implemented deterministic fallback scoring whenever an API failed. I also stored reports, research sessions, and execution history in Supabase so users could revisit previous analyses.

Since research can take several seconds, I implemented Server-Sent Events to stream progress updates in real time instead of making users wait on a loading screen. Finally, I built an interactive report viewer that presents structured INVEST or PASS recommendations with supporting evidence.

This project taught me how to design resilient backend systems, coordinate multiple AI agents, handle unreliable third-party APIs, and build production-ready workflows.`,
    tags: [
      "Next.js",
      "LangGraph",
      "TypeScript",
      "Supabase",
      "Gemini",
      "FMP",
    ],
    image: "/assets/projects/project1/placeholder-1.png",
    images: [
      "/assets/projects/project1/placeholder-1.png",
    ],
    date: "Jul 2026",
    features: [
      "Multi-agent financial analysis",
      "Parallel AI workflow execution",
      "Real-time research progress",
      "Structured INVEST/PASS reports",
      "Persistent research history"
    ],
    techStack: [
      "Next.js",
      "LangGraph",
      "TypeScript",
      "Supabase",
      "Gemini",
      "Financial Modeling Prep"
    ]
  },

  {
    id: "proj-2",
    title: "Distributed Task Scheduler",
    smallDescription:
      "Fault-tolerant distributed job orchestration platform.",
    description: `I wanted to understand how distributed systems execute background jobs reliably, similar to how platforms like Uber, Stripe, or GitHub process emails, payments, and notifications asynchronously. Instead of processing tasks directly inside an API request, I wanted to build a system that could distribute work across multiple workers.

One of the biggest challenges was ensuring jobs were never lost, even if a worker crashed while processing them. Another challenge was preventing duplicate execution and making sure failed jobs could recover safely.

I designed the system around Redis-backed queues with PostgreSQL tracking the lifecycle of every job. Multiple worker processes consumed tasks concurrently, allowing the system to scale horizontally.

To improve reliability, I implemented exponential backoff retries, dead-letter queues for permanently failed jobs, idempotency checks to prevent duplicate execution, and recovery logic that automatically reassigned stuck jobs after worker failures.

I also containerized every service using Docker Compose and integrated Prometheus and Grafana so I could monitor queue depth, worker activity, throughput, and system health in real time.

This project helped me understand distributed system design, fault tolerance, observability, and backend scalability.`,
    tags: [
      "Node.js",
      "Redis",
      "PostgreSQL",
      "Docker",
      "Prometheus",
      "Grafana",
    ],
    image: "/assets/projects/project2/placeholder-2.png",
    images: [
      "/assets/projects/project2/placeholder-2.png",
    ],
    date: "Jun 2026",
    features: [
      "Distributed worker architecture",
      "Redis-backed job queues",
      "Dead-letter queue support",
      "Crash recovery",
      "Prometheus & Grafana monitoring"
    ],
    techStack: [
      "Node.js",
      "Redis",
      "PostgreSQL",
      "Docker",
      "Prometheus",
      "Grafana"
    ]
  },

  {
    id: "proj-3",
    title: "VisionFocus",
    smallDescription:
      "Real-time student attention analysis using computer vision.",
    description: `I wanted to build a system capable of monitoring a person's attention and detecting distraction or drowsiness in real time using only a standard webcam. The challenge was that relying on a single computer vision model often produced unstable predictions because human movements naturally fluctuate.

I solved this by combining MediaPipe for precise facial and body landmarks with a customized YOLOv8 model for object detection. Instead of relying on raw outputs, I extracted normalized features such as eye aspect ratio, head orientation, and shoulder angles.

These features were used to train a CatBoost classifier, and I handled the class imbalance problem using focal loss, allowing the model to learn minority cases more effectively.

Since predictions could rapidly fluctuate frame by frame, I designed a temporal state machine with exponential moving average smoothing and conflict-resolution logic, significantly reducing noisy state changes.

The final system achieved stable real-time inference at around 24 FPS on a standard CPU without requiring dedicated GPU hardware.

Through this project I learned how traditional machine learning and deep learning can complement each other to improve accuracy and stability.`,
    tags: [
      "MediaPipe",
      "YOLOv8",
      "CatBoost",
      "Computer Vision",
      "Python",
    ],
    image: "/assets/projects/project3/placeholder-3.png",
    images: [
      "/assets/projects/project3/placeholder-3.png",
      "/assets/projects/project3/frame_001.jpg",
      "/assets/projects/project3/frame_005.jpg",
      "/assets/projects/project3/frame_006.jpg",
      "/assets/projects/project3/frame_032.jpg",
      "/assets/projects/project3/frame_036.jpg",
      "/assets/projects/project3/frame_046.jpg",
      "/assets/projects/project3/frame_054.jpg",
    ],
    date: "Apr 2026",
    features: [
      "MediaPipe pose estimation",
      "YOLOv8 object detection",
      "CatBoost attention classifier",
      "EMA temporal smoothing",
      "24 FPS real-time inference"
    ],
    techStack: [
      "Python",
      "MediaPipe",
      "YOLOv8",
      "CatBoost",
      "OpenCV"
    ]
  },

  {
    id: "proj-4",
    title: "EcoPlay",
    smallDescription:
      "Scalable educational platform with integrated AI assistant.",
    description: `I wanted to build a scalable educational platform that could support different types of users while also integrating AI-powered assistance for learners. Managing multiple user roles and maintaining clean routing became one of the major challenges.

I designed the application using Next.js App Router and TypeScript while managing complex application state through Zustand. Dynamic middleware routing ensured that users only accessed pages relevant to their assigned roles.

Another challenge was deploying AI models without introducing excessive response latency. I optimized the backend using Prisma ORM with efficient relational indexing and deployed quantized open-source models to reduce inference costs.

To simplify deployment and improve development efficiency, I containerized the services with Docker and automated deployment using GitHub Actions and Google Cloud Run.

This project strengthened my understanding of scalable application architecture, deployment automation, and performance optimization.`,
    tags: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Docker",
      "GitHub Actions",
      "Google Cloud",
    ],
    image: "/assets/projects/project4/placeholder-4.png",
    images: [
      "/assets/projects/project4/placeholder-4.png",
      "/assets/projects/project4/Screenshot 2026-07-18 004247.png",
      "/assets/projects/project4/Screenshot 2026-07-18 004325.png",
      "/assets/projects/project4/Screenshot 2026-07-18 004333.png",
      "/assets/projects/project4/Screenshot 2026-07-18 004339.png",
      "/assets/projects/project4/Screenshot 2026-07-18 004400.png",
      "/assets/projects/project4/Screenshot 2026-07-18 004414.png",
      "/assets/projects/project4/Screenshot 2026-07-18 004431.png",
    ],
    date: "Oct 2025",
    features: [
      "Role-based architecture",
      "AI learning assistant",
      "Dockerized deployment",
      "GitHub Actions CI/CD",
      "Google Cloud Run"
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Docker",
      "GitHub Actions",
      "Google Cloud Run"
    ]
  },

  {
    id: "proj-5",
    title: "Optimus Event",
    smallDescription:
      "Multi-tenant event management platform with secure payments.",
    description: `I wanted to create an event management platform capable of handling registrations, payments, and multiple organizations securely. The biggest concern was maintaining data isolation between different organizations while preventing payment inconsistencies during heavy traffic.

I designed a multi-tenant architecture using Supabase with Row-Level Security so every organization could only access its own data.

During registration spikes, multiple users could attempt to book the same event simultaneously, creating race conditions. To solve this, I implemented transactional locking inside Next.js Route Handlers to guarantee consistent database updates.

Payment reliability was another important challenge. I integrated Razorpay with secure webhook verification, automatic retries, and rollback mechanisms to ensure database state always matched successful payment status.

This project gave me practical experience with backend concurrency, transactional consistency, authentication, and secure payment processing.`,
    tags: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Razorpay",
    ],
    image: "/assets/projects/project5/placeholder-5.png",
    images: [
      "/assets/projects/project5/placeholder-5.png",
      "/assets/projects/project5/Screenshot 2026-05-13 000039.png",
      "/assets/projects/project5/Screenshot 2026-07-18 004150.png",
    ],
    date: "Oct 2025",
    features: [
      "Multi-tenant architecture",
      "Secure Razorpay integration",
      "Row-Level Security",
      "Transactional booking",
      "Webhook verification"
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Razorpay"
    ]
  },

  {
    id: "proj-6",
    title: "Sign Language Detection System",
    smallDescription:
      "Real-time continuous sign language recognition using deep learning.",
    description:`I wanted to build a system that could translate sign language into text in real time, helping bridge communication between people who use sign language and those who do not.

Static image classification was not sufficient because sign language depends on movement over time. The challenge was capturing both spatial hand positions and temporal motion.

I extracted normalized landmark coordinates from video frames and transformed them into fixed-length feature sequences. These sequences were processed using an LSTM network that learned temporal patterns instead of individual frames.

To improve stability, I implemented a sliding-window confidence mechanism that reduced false-positive transitions while maintaining smooth predictions.

The final system recognized over one hundred gestures while maintaining low latency suitable for real-time applications.

This project improved my understanding of sequential deep learning models, feature engineering, and real-time computer vision.`,
    tags: [
      "TensorFlow",
      "LSTM",
      "Computer Vision",
      "Python",
    ],
    image: "/assets/projects/project6/placeholder-6.png",
    images: [
      "/assets/projects/project6/placeholder-6.png",
      "/assets/projects/project6/Screenshot 2026-05-13 000039.png",
      "/assets/projects/project6/Screenshot 2026-07-16 154625.png",
      "/assets/projects/project6/Screenshot 2026-07-16 154630.png",
      "/assets/projects/project6/Screenshot 2026-07-16 154647.png",
      "/assets/projects/project6/Screenshot 2026-07-18 004150.png",
    ],
    date: "May 2025",
    features: [
      "100+ gesture recognition",
      "TensorFlow LSTM model",
      "Real-time inference",
      "Sliding-window prediction",
      "Temporal smoothing"
    ],
    techStack: [
      "TensorFlow",
      "Python",
      "LSTM",
      "OpenCV"
    ]
  },

  {
    id: "proj-7",
    title: "Drone vs Bird Detection System",
    smallDescription:
      "YOLOv8-powered aerial object detection system.",
    description: `I wanted to solve the problem of distinguishing drones from birds in surveillance footage because both appear very small and visually similar at long distances.

One major challenge was detecting tiny moving objects under varying lighting conditions and cluttered backgrounds.

I trained a customized YOLOv8 Nano model on more than fifteen thousand annotated aerial images. To improve generalization, I applied data augmentation techniques including Mosaic and MixUp during training.

Since edge devices have limited computational resources, I optimized inference by implementing frame skipping and efficient preprocessing pipelines, significantly reducing memory usage while maintaining real-time performance.

Through this project I gained practical experience in object detection, model optimization, and deploying computer vision models on resource-constrained hardware.`,
    tags: [
      "Python",
      "YOLOv8",
      "Computer Vision",
      "Roboflow",
    ],
    image: "/assets/projects/project7/placeholder-7.png",
    images: [
      "/assets/projects/project7/placeholder-7.png",
      "/assets/projects/project7/Screenshot 2026-07-18 004533.png",
      "/assets/projects/project7/Screenshot 2026-07-18 004703.png",
      "/assets/projects/project7/Screenshot 2026-07-18 004725.png",
    ],
    date: "Jan 2025",
    features: [
      "YOLOv8 custom training",
      "Drone vs Bird classification",
      "Data augmentation",
      "Real-time inference",
      "Edge-device optimization"
    ],
    techStack: [
      "Python",
      "YOLOv8",
      "OpenCV",
      "Roboflow"
    ]
  },
];
