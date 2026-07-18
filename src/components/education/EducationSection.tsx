
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { education } from '@/data/education';

export default function EducationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Timeline line scales down as we scroll
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="education" className="py-10 md:min-h-screen md:py-24 relative z-10" ref={containerRef}>
      <div className="max-w-4xl w-full mx-auto px-6">
        
        <div className="text-center mb-12 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2"
          >
            Academic Journey
          </motion.h2>
        </div>
        
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 hidden md:block" />
          
          <motion.div 
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white to-gray-500 -translate-x-1/2 hidden md:block"
          />

          <div className="space-y-8 md:space-y-24">
            {education.map((edu, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={edu.id} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-white z-10 hidden md:block" />

                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`w-full md:w-1/2 p-4 md:p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm ${isEven ? 'md:ml-12' : 'md:mr-12'}`}
                  >
                    <div className="text-gray-400 font-semibold mb-2 text-xs md:text-sm uppercase tracking-wider">{edu.date}</div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                    <div className="text-gray-300 font-medium mb-4">{edu.school}</div>
                    {edu.description && <p className="text-gray-400">{edu.description}</p>}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
