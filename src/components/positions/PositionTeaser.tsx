'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { positions, type Position } from '@/data/positions';
import PositionModal from './PositionModal';

export default function PositionTeaser() {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  // For this portfolio, we just use the first position as the featured one
  // If there are more, they could be mapped over in a grid
  const position = positions[0];

  if (!position) return null;

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-6xl w-full mx-auto px-6">
        
        <div className="mb-12 text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
          >
            Position of Responsibility
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400"
          >
            Leadership and organizational experience.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-4xl mx-auto md:mx-0 p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm group cursor-pointer hover:bg-white/10 transition-all hover:-translate-y-1 hover:border-white/20"
          onClick={() => setSelectedPosition(position)}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="text-gray-400 font-medium mb-2 uppercase tracking-wider text-sm">
                {position.duration}
              </div>
              <h3 className="text-3xl font-display font-bold text-white mb-2 group-hover:text-gray-300 transition-colors">
                {position.role}
              </h3>
              <div className="text-xl text-gray-300 font-semibold mb-4">
                {position.organization}
              </div>
              <p className="text-gray-400 text-lg">
                {position.shortSummary}
              </p>
            </div>

            <div className="shrink-0 flex items-center justify-center mt-4 md:mt-0">
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full group-hover:scale-105 transition-transform">
                Explore Experience
                <ArrowRight size={18} />
              </span>
            </div>
          </div>
          
          {/* Subtle glow on hover */}
          <div className="absolute inset-0 rounded-3xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
        </motion.div>

      </div>

      <PositionModal 
        position={selectedPosition} 
        onClose={() => setSelectedPosition(null)} 
      />
    </section>
  );
}
