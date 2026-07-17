'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

type TransitionContextType = {
  navigate: (
    url: string,
    direction?: 'forward' | 'back'
  ) => void;
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
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');  

  const navigate = (
    url: string,
    dir: 'forward' | 'back' = 'forward'
  ) => {
    if (url === window.location.pathname) return;

    setDirection(dir);
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
              initial={{
                y: direction === 'forward' ? '100%' : '-100%',
              }}
              animate={{
                y: '0%',
              }}
              exit={{
                y: direction === 'forward' ? '-100%' : '100%',
              }}
              transition={{ duration: 0.2, ease: [0.76, 0, 0.24, 1] }}
              onAnimationComplete={handleAnimationComplete}
              className="fixed inset-0 z-[100] bg-white flex items-center justify-center pointer-events-none"
            >
              
            </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
