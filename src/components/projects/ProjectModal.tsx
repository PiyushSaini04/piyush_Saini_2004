'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Code2, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import ModalPortal from '../ui/ModalPortal';
import { useKeyboard } from '@/hooks/useKeyboard';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Keyboard navigation
  useKeyboard('Escape', onClose);
  useKeyboard('ArrowRight', () => handleNext());
  useKeyboard('ArrowLeft', () => handlePrev());

  // Reset index when project changes
  if (project && currentImageIndex >= (project.images?.length || 1)) {
    setCurrentImageIndex(0);
  }

  const handleNext = () => {
    if (!project || !project.images) return;
    setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
  };

  const handlePrev = () => {
    if (!project || !project.images) return;
    setCurrentImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
  };

  return (
    <AnimatePresence>
      {project && (
        <ModalPortal>
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-black/60"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-6xl h-[90vh] md:h-[80vh] lg:h-[90vh] bg-[#111111] border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
              onClick={(e) => e.stopPropagation()} // Prevent close on inner click
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/80 text-white/70 hover:text-white rounded-full backdrop-blur-sm transition-colors"
              >
                <X size={20} />
              </button>

              {/* Left Panel: Image Gallery (45%) */}
              <div className="w-full lg:w-[45%] bg-black/50 p-4 sm:p-6 lg:p-8 flex flex-col justify-center gap-4 relative shrink-0">
                {/* Main Image */}
                <div className="relative w-full aspect-video lg:aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50 z-0" />
                  
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={project.images ? project.images[currentImageIndex] : project.image}
                      alt={project.title}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 w-full object-cover z-10 my-auto"
                    />
                  </AnimatePresence>

                  {/* Gallery Controls */}
                  {project.images && project.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={handleNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {project.images && project.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {project.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative w-20 aspect-video rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${
                          idx === currentImageIndex ? 'border-white/50' : 'border-transparent hover:border-white/20'
                        }`}
                      >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Panel: Content (55%) */}
              <div className="w-full lg:w-[55%] p-4 sm:p-6 lg:p-10 flex flex-col bg-white/5 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <div className="mb-8 pr-8">
                  <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-2 md:mb-3">
                    {project.title}
                  </h2>
                  <div className="text-gray-400 font-medium tracking-wide uppercase text-sm mb-6">
                    {project.date}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/10 border border-white/5 text-xs text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 mb-1">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform"
                      >
                        Live Demo
                        <ExternalLink size={16} />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 hover:scale-105 transition-all"
                      >
                        GitHub
                        <Code2 size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="whitespace-pre-line space-y-8 text-gray-300 leading-relaxed">
                  {/* Full Description */}
                  <div>
                    <h3 className=" text-xl font-bold text-white mb-4">Overview</h3>
                    <p>{project.description}</p>
                  </div>

                  {/* Features */}
                  {project.features && project.features.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {project.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech Stack Details */}
                  {project.techStack && project.techStack.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Architecture & Tech Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map(tech => (
                          <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </ModalPortal>
      )}
    </AnimatePresence>
  );
}
