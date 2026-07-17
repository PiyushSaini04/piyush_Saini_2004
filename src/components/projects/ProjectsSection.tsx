'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { projects, Project } from '@/data/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { useState } from 'react';

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // Pin section when top hits top of viewport, unpin when bottom hits bottom
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const x = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section id="projects" ref={targetRef} className="relative h-[400vh] bg-black z-20">
      <div className="sticky top-10 h-screen flex items-center overflow-hidden">
        
        {/* Title */}
        <div className="absolute top-4 left-6 md:left-24 z-10 pointer-events-none">
          <h2 className="text-4xl md:text-5xl   font-bold text-white">
            Projects
          </h2>
        </div>

        {/* Desktop Horizontal Scroll Container */}
        <motion.div 
          style={{ x }} 
          className="hidden md:flex gap-16 px-24 h-[60vh] items-center pr-250"
        >
          {projects.map((project) => (
            <div key={project.id} className="w-[80vw] max-w-[1000px] shrink-0">
              <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
            </div>
          ))}
        </motion.div>

        {/* Mobile Vertical Scroll Fallback */}
        <div className="md:hidden flex flex-col gap-12 px-6 pt-48 pb-24 h-full overflow-y-auto w-full">
          {projects.map((project) => (
            <div key={project.id} className="w-full shrink-0">
              <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
            </div>
          ))}
        </div>
        
        {/* Progress Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2">
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
      
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
