'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Code2 } from 'lucide-react';
import type { Project } from '@/data/projects';

export default function ProjectCard({ project, onClick }: { project: Project, onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative w-full h-auto min-h-[280px] md:h-[500px] rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden flex flex-col md:flex-row shadow-2xl cursor-pointer"
      onClick={onClick}
    >
      {/* 3D Inner Content */}
      <div 
        style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
        className="w-full h-auto flex flex-col md:flex-row relative z-10 p-1 pointer-events-none"
      >
        {/* Image Side */}
        <div className="w-full md:w-1/2 aspect-video md:aspect-auto h-auto md:h-full p-2 md:p-6 pb-0 md:pb-6 md:pr-0">
          <div className="w-full h-full rounded-xl overflow-hidden bg-white/5 border border-white/10 relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-gray-500/10 flex items-center justify-center">
                {/* Fallback text if image missing */}
                <span className="text-gray-500 font-display font-semibold tracking-widest uppercase">
                  {project.title.substring(0,2)}
                </span>
             </div>
             {/* Actual Image if it exists */}
             <div 
                className="absolute inset-0 bg-cover bg-center bg-cover opacity-80  transition-all duration-500"
                style={{ 
                  backgroundImage: `url(${project.image})`,
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                }} 
              />
          </div>
        </div>

        {/* Text Side */}
        <div className="w-full md:w-1/2 h-auto md:h-full p-4 md:p-12 flex flex-col justify-center gap-2 md:gap-6">
          <h3 
            style={{ transform: "translateZ(30px)" }}
            className="text-2xl md:text-3xl font-display font-bold text-white transition-all duration-300"
          >
            {project.title}
          </h3>
          <div style={{ transform: "translateZ(20px)" }} className="text-sm text-gray-500 uppercase tracking-wider">
            {project.date}
          </div>
          
          <p 
            style={{ transform: "translateZ(20px)" }}
            className="text-gray-400 text-sm md:text-lg leading-relaxed line-clamp-3 md:line-clamp-none"
          >
            {project.smallDescription}
          </p>

          <div 
            style={{ transform: "translateZ(25px)" }}
            className="flex flex-wrap gap-2 pt-1"
          >
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-gray-300">
                {tag}
              </span>
            ))}
          </div>

          
        </div>
      </div>
      
      {/* Background glow on hover */}
      <div 
        className="absolute -inset-20 bg-gradient-to-r from-white/10 via-gray-400/10 to-white/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
      />
    </motion.div>
  );
}
