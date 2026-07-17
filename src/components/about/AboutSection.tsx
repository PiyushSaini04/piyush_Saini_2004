'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "center center"]
  });

  // Curtain reveal from center outwards horizontally
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0 50% 0 50%)", "inset(0 0% 0 0%)"]
  );

  return (
    <section id="about" ref={ref} className="min-h-screen flex items-center justify-center py-24 relative z-10">
      {/* Seamless gradient transition from Hero section */}
      <div className="absolute top-0 left-0 w-full h-32 z-20 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
      
      <motion.div 
        style={{ clipPath }}
        className="max-w-7xl w-full mx-auto px-6"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
          
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
              Who I Am
            </h2>
            <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
              <p>
                I am a passionate Full-Stack Developer with a deep focus on crafting interactive, high-performance web applications. I bridge the gap between complex back-end systems and stunning front-end interfaces.
              </p>
              <p>
                My approach combines strong engineering principles with a keen eye for design, ensuring every project is not only robust but also a joy to use. I specialize in Next.js, React, Node.js, and modern CSS architectures.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 pt-4">
              {['Full-Stack Development', 'UI/UX Engineering', 'System Architecture', 'AI Integrations'].map(tag => (
                <span key={tag} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Profile Image Placeholder */}
          <div className="w-64 h-64 md:w-80 md:h-80 shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent flex items-center justify-center">
              <img
                src="/assets/profile/IMG20260120123304.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
        </div>
      </motion.div>
    </section>
  );
}
