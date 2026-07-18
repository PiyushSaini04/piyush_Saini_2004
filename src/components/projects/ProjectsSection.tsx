'use client';

import { useRef, useState, useTransition } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { projects, Project } from '@/data/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const x = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleViewAll = () => {
    startTransition(() => {
      router.push('/projects');
    });
  };

  return (
    <>
      {/* Desktop View (Horizontal Scroll) */}
      <section id="projects-desktop" ref={targetRef} className="hidden md:block relative h-[400vh]">
        <div className="sticky top-10 h-screen flex items-center overflow-hidden">
          {/* Title */}
          <div className="absolute top-4 left-6 md:left-24 z-10 pointer-events-none">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Projects
            </h2>
          </div>

          {/* Desktop Horizontal Scroll Container */}
          <motion.div 
            style={{ x }} 
            className="flex gap-16 px-24 h-[60vh] items-center pr-250"
          >
            {projects.map((project) => (
              <div key={project.id} className="w-[80vw] max-w-[1000px] shrink-0">
                <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
              </div>
            ))}
          </motion.div>
          
          {/* Progress Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {projects.map((_, i) => {
              const total = projects.length;
              const step = 1 / (total - 1);
              const center = i * step;

              const opacity = useTransform(
                scrollYProgress,
                [
                  Math.max(0, center - step),
                  center,
                  Math.min(1, center + step),
                ],
                [0.3, 1, 0.3]
              );

              return (
                <motion.div
                  key={i}
                  style={{ opacity }}
                  className="w-2 h-2 rounded-full bg-white"
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile View (Teaser Block) */}
      <section id="projects-mobile" className="md:hidden py-16 px-6 relative z-10">
        <h2 className="text-3xl font-display font-bold text-white mb-8">
          Projects
        </h2>
        <div className="flex flex-col gap-6">
          {/* Show only first 2 projects as teaser */}
          {projects.slice(0, 2).map((project) => (
            <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
          ))}
          
          <button 
            onClick={handleViewAll}
            disabled={isPending}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-4 rounded-xl font-medium transition-colors"
          >
            {isPending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                View All Projects <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </section>

      {/* Shared Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </>
  );
}
