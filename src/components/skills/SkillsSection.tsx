'use client';

import { motion, Variants } from 'framer-motion';
import { skillCategories } from '@/data/skills';

export default function SkillsSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      id="skills" 
      className="py-5 md:py-32 relative z-10 flex flex-col justify-center overflow-hidden"
    >
      {/* Subtle Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      

      <div className="max-w-5xl w-full mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2 tracking-tight">
            Technical Arsenal
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto md:mx-0">
            A structured index of languages, frameworks, and infrastructure tools utilized across various engineering projects.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full flex flex-col"
        >
          {/* Top Border */}
          <div className="w-full h-px bg-white/10 mb-1" />

          {skillCategories.map((category, index) => (
            <motion.div 
              key={category.category}
              variants={itemVariants}
              className="group flex flex-col md:flex-row py-4 md:py-8 border-b border-white/5 hover:bg-white/[0.02] transition-colors duration-300"
            >
              {/* Category Name */}
              <div className="w-full md:w-64 shrink-0 mb-4 md:mb-0 md:pr-8 flex items-start">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                  {category.category}
                </span>
              </div>
              
              {/* Technologies */}
              <div className="flex-1">
                <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                  {category.items.join(', ')}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
