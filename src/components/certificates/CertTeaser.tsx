'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { certificates, Certificate } from '@/data/certificates';
import CursorPreview from './CursorPreview';
import { useTransition } from '@/components/transitions/TransitionContext';
import CertLightbox from './CertLightbox';

export default function CertTeaser() {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isdesktop, setIsDesktop] = useState<boolean>(true);

  const x = window.innerWidth;
  if (x < 768 && isdesktop) {
    setIsDesktop(false);
  } else if (x >= 768 && !isdesktop) {
    setIsDesktop(true);
  }

  const teaserCerts = certificates.slice(0, 4); // Only show first 4
  const { navigate } = useTransition();

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/certificates', 'forward');
  };

  return (
    <section id="certificates" className="py-16 md:py-24 relative z-10">
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4 mx-auto md:mx-0 text-center md:text-left">
              Certifications
            </h2>
            <p className="text-gray-400 text-sm md:text-base">Continuous learning and skill validation.</p>
          </div>
          
          {isdesktop && (
            <a 
              href="/certificates"
              onClick={handleNavigate}
              className="px-6 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors shrink-0"
            >
              View All
            </a>
          )}
        </div>
        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {teaserCerts.map((cert, index) => (
            <motion.div 
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => {
                console.log("ENTER:", cert.image);
                setHoveredImage(cert.image);
              }}

              onMouseLeave={() => {
                setHoveredImage(null);
              }}
              onClick={() => setSelectedCert(cert)}
              className="p-4 md:p-6 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl flex justify-between items-center group cursor-pointer transition-all hover:bg-white/10 hover:-translate-y-1 hover:border-white/20"
            >
              <div>
                <h4 className="text-base md:text-lg font-bold text-white mb-1">{cert.title}</h4>
                <div className="text-gray-400 text-sm md:text-base">{cert.issuer}</div>
              </div>
              <div className="text-gray-300 font-medium text-sm md:text-base ml-2 shrink-0">{cert.date}</div>
            </motion.div>
          ))}
        </div>
        {!isdesktop && (
            <a 
              href="/certificates"
              onClick={handleNavigate}
              className="px-6 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors shrink-0 mx-auto mt-6 block text-center"
            >
              View All
            </a>
          )}

      </div>

      {/* Floating Cursor Preview */}
      <CursorPreview image={hoveredImage} />

      <CertLightbox 
        cert={selectedCert} 
        onClose={() => setSelectedCert(null)} 
      />
    </section>
  );
}
