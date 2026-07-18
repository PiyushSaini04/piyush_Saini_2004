'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';

interface HeroContentProps {
  progress: MotionValue<number>;
}

export default function HeroContent({ progress }: HeroContentProps) {
  // Stagger the reveals based on scroll progress through the sequence
  
  // Headline reveals early (0.1 -> 0.3)
  const headlineOpacity = useTransform(progress, [0.1, 0.3], [0, 1]);
  const headlineY = useTransform(progress, [0.1, 0.3], [20, 0]);
  
  // Tagline reveals mid-way (0.4 -> 0.6)
  const taglineOpacity = useTransform(progress, [0.4, 0.6], [0, 1]);
  const taglineY = useTransform(progress, [0.4, 0.6], [20, 0]);
  
  // Stats and Buttons reveal near the end (0.7 -> 0.9)
  const ctaOpacity = useTransform(progress, [0.7, 0.9], [0, 1]);
  const ctaY = useTransform(progress, [0.7, 0.9], [20, 0]);

  return (
    <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full pt-32">
      <div className="flex flex-col items-start gap-6 pointer-events-auto">
        <motion.div style={{ opacity: headlineOpacity, y: headlineY }}>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
            Building digital <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              experiences
            </span>
          </h1>
        </motion.div>
        
        <motion.div style={{ opacity: taglineOpacity, y: taglineY }}>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-400 max-w-md">
            I'm Piyush Saini, a Full-Stack Developer creating cinematic and intelligent web applications.
          </p>
        </motion.div>
        
        <motion.div 
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="flex flex-wrap gap-4 mt-4"
        >
          <a href="#projects" className="px-5 py-3 md:px-8 md:py-4 rounded-full bg-white text-black text-sm md:text-base font-semibold hover:scale-105 transition-transform duration-300">
            View Projects
          </a>
          <a href="/assets/resume/resume.pdf" target="_blank" className="px-5 py-3 md:px-8 md:py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm md:text-base font-semibold hover:bg-white/20 transition-all duration-300">
            Download Resume
          </a>
        </motion.div>
      </div>
      
      {/* Right side stats */}
      <div className="hidden md:flex flex-col items-end gap-12 pointer-events-auto">
        <motion.div style={{ opacity: ctaOpacity, y: ctaY }} className="text-right">
          <div className="text-4xl   font-bold text-white">7.81</div>
          <div className="text-gray-400 uppercase tracking-widest text-sm">CGPA</div>
        </motion.div>
        <motion.div style={{ opacity: ctaOpacity, y: ctaY }} className="text-right">
          <div className="text-4xl   font-bold text-white">250+</div>
          <div className="text-gray-400 uppercase tracking-widest text-sm">DSA Problems</div>
        </motion.div>
        <motion.div style={{ opacity: ctaOpacity, y: ctaY }} className="text-right">
          <div className="text-4xl   font-bold text-white">2</div>
          <div className="text-gray-400 uppercase tracking-widest text-sm">Certificates</div>
        </motion.div>
      </div>
    </div>
  );
}
