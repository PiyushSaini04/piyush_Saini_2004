'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Position } from '@/data/positions';
import ModalPortal from '../ui/ModalPortal';
import { useKeyboard } from '@/hooks/useKeyboard';

interface PositionModalProps {
  position: Position | null;
  onClose: () => void;
}

export default function PositionModal({ position, onClose }: PositionModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Keyboard navigation
  useKeyboard('Escape', onClose);
  useKeyboard('ArrowRight', () => handleNext());
  useKeyboard('ArrowLeft', () => handlePrev());

  // Reset index when position changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [position]);

  // Slideshow auto-advance
  useEffect(() => {
    if (!position || !position.images || position.images.length <= 1 || isHovered) return;
    
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 2) % position.images.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [position, isHovered]);

  const handleNext = () => {
    if (!position || !position.images) return;
    setCurrentImageIndex((prev) => (prev + 2) % position.images.length);
  };

  const handlePrev = () => {
    if (!position || !position.images) return;
    setCurrentImageIndex((prev) => (prev - 2 + position.images.length) % position.images.length);
  };

  return (
    <AnimatePresence>
      {position && (
        <ModalPortal>
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-black/60"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-4xl max-h-full bg-[#111111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/80 text-white/70 hover:text-white rounded-full backdrop-blur-sm transition-colors"
              >
                <X size={20} />
              </button>

              {/* Top: Slideshow */}
              <div 
                className="w-full h-[30vh] sm:h-[40vh] bg-black/50 relative overflow-hidden group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {(!position.images || position.images.length === 0) ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-white/5 to-transparent">
                    <span className="text-gray-500 font-display font-medium tracking-widest uppercase">
                      {position.organization} Experience
                    </span>
                  </div>
                ) : (
                  <>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIndex}
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{
                          duration: 0.55,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute inset-0 grid grid-cols-2 gap-2 p-2 h-16"
                      >
                        {[0, 1].map((offset) => {
                          const index =
                            (currentImageIndex + offset) % position.images.length;

                          return (
                            <img
                              key={index}
                              src={position.images[index]}
                              alt=""
                              className="object-contain rounded-xl bg-[#0a0a0a]"
                            />
                          );
                        })}
                      </motion.div>
                    </AnimatePresence>

                    {/* Slideshow Controls */}
                    {position.images.length > 1 && (
                      <>
                        <button
                          onClick={handlePrev}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button
                          onClick={handleNext}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ChevronRight size={24} />
                        </button>
                        
                        {/* Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {Array.from({
                              length: Math.ceil(position.images.length / 2),
                            }).map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentImageIndex(idx*2)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                idx * 2 === currentImageIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Bottom: Content */}
              <div className="w-full flex-1 p-8 sm:p-10 bg-white/5 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent max-h-[50vh]">
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                    {position.role}
                  </h2>
                  <div className="text-xl text-gray-300 font-medium mb-1">
                    {position.organization}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">
                    {position.duration}
                  </div>
                </div>

                <div className="space-y-8 text-gray-400 leading-relaxed">
                  {/* Full Description */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Experience</h3>
                    <p>{position.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Responsibilities */}
                    {position.responsibilities && position.responsibilities.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4">Responsibilities</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {position.responsibilities.map((res, idx) => (
                            <li key={idx}>{res}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Achievements */}
                    {position.achievements && position.achievements.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4">Key Achievements</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {position.achievements.map((ach, idx) => (
                            <li key={idx}>{ach}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </ModalPortal>
      )}
    </AnimatePresence>
  );
}
