'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if already loaded in this session
    if (sessionStorage.getItem('portfolio-loaded')) {
      setIsLoading(false);
      return;
    }

    // Simulate real loading progress for now (fonts, images)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem('portfolio-loaded', 'true');
          }, 800); // Hold for a beat
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const name = "Piyush Saini".split("");

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
        >
          <div className="flex overflow-hidden">
            {name.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ filter: 'blur(10px)', y: 20, opacity: 0 }}
                animate={{ filter: 'blur(0px)', y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.05,
                  ease: 'easeOut',
                }}
                className={`text-4xl md:text-6xl font-display font-bold ${
                  letter === ' ' ? 'w-4' : ''
                } bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500`}
                style={{ display: 'inline-block' }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          
          <div className="mt-8 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-white to-gray-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear', duration: 0.2 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
