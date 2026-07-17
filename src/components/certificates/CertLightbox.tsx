'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import type { Certificate } from '@/data/certificates';
import ModalPortal from '../ui/ModalPortal';
import { useKeyboard } from '@/hooks/useKeyboard';

interface CertLightboxProps {
  cert: Certificate | null;
  onClose: () => void;
}

export default function CertLightbox({ cert, onClose }: CertLightboxProps) {
  useKeyboard('Escape', onClose);

  return (
    <AnimatePresence>
      {cert && (
        <ModalPortal>
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-5xl bg-[#111111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/80 text-white/70 hover:text-white rounded-full backdrop-blur-sm transition-colors"
              >
                <X size={20} />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-[60%] bg-black/50 relative overflow-hidden group min-h-[300px] md:min-h-[500px] flex items-center justify-center p-8">
                {/* Fallback pattern */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50" />
                
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="relative z-10 w-full h-auto max-h-full object-contain rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              {/* Details Section */}
              <div className="w-full md:w-[40%] p-8 md:p-12 flex flex-col justify-center bg-white/5">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3 leading-tight">
                      {cert.title}
                    </h2>
                    <div className="flex items-center gap-3 text-gray-400">
                      <span className="font-semibold text-gray-300">{cert.issuer}</span>
                      <span>&bull;</span>
                      <span>{cert.date}</span>
                    </div>
                  </div>

                  <div className="h-px bg-white/10 w-full" />

                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform"
                    >
                      Verify Credential
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </ModalPortal>
      )}
    </AnimatePresence>
  );
}
