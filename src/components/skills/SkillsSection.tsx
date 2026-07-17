'use client';

import { motion } from 'framer-motion';
import PhysicsCloud from './PhysicsCloud';

export default function SkillsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1
      }
    }
  };

  return (
    <section id="skills" className="min-h-screen py-24 relative z-10 flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-6xl w-full mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl   font-bold text-white">
            Technical Arsenal
          </h2>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full relative"
        >
          <PhysicsCloud />
        </motion.div>
      </div>
    </section>
  );
}
