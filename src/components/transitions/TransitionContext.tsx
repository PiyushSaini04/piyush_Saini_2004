'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

type TransitionContextType = {
  navigate: (url: string) => void;
};

const TransitionContext = createContext<TransitionContextType>({
  navigate: () => {},
});

export function useTransition() {
  return useContext(TransitionContext);
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetUrl, setTargetUrl] = useState('');

  const navigate = (url: string) => {
    if (url === window.location.pathname) return;
    setTargetUrl(url);
    setIsTransitioning(true);
  };

  const handleAnimationComplete = () => {
    if (isTransitioning) {
      router.push(targetUrl);
      // Let the new page load, then animate out
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }
  };

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      
      <AnimatePresence>
        {isTransitioning && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              onAnimationComplete={handleAnimationComplete}
              className="fixed inset-0 z-[100] bg-white flex items-center justify-center pointer-events-none"
            >
              <h1 className="text-6xl md:text-8xl   font-bold text-black text-center">
                Piyush Saini
              </h1>
            </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
