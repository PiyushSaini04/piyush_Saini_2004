'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useTransition } from '@/components/transitions/TransitionContext';
import { projects, Project } from '@/data/projects';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectModal from '@/components/projects/ProjectModal';
import Footer from '@/components/contact/Footer';

export default function ProjectsPage() {
  const router = useRouter();
  const { navigate } = useTransition();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/#projects', 'back');
  };

  return (
    <main className="min-h-screen relative bg-[#050505]">
      {/* Background matches homepage */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 py-8">
        <a 
              href="/#projects"
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft size={20} />
              Back to Portfolio
            </a>

        <h1 className="text-4xl font-display font-bold text-white mb-8">
          All Projects
        </h1>

        <div className="flex flex-col gap-6 pb-24">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectCard 
                project={project} 
                onClick={() => setSelectedProject(project)} 
              />
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="relative z-10 bg-black/50 backdrop-blur-xl">
        <Footer />
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </main>
  );
}
