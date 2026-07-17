'use client';

import { certificates } from '@/data/certificates';
import { motion } from 'framer-motion';

export default function CertGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {certificates.map((cert, index) => (
        <motion.div
          key={cert.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:bg-white/10 transition-colors"
        >
          <div className="aspect-[4/3] bg-black/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent flex items-center justify-center">
                {/* <span className="text-gray-500 font-medium">Certificate Image</span> */}
                <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
            </div>
            {/* Real image if available */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-screen transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${cert.image})` }} 
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
            <div className="text-gray-400 mb-1">{cert.issuer}</div>
            <div className="text-sm text-gray-300">{cert.date}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
