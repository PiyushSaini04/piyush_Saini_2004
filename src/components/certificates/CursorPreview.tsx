'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorPreview({ image }: { image: string | null }) {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring config for the lagging/trailing effect
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  useEffect(() => {
    console.log("Hovered Image:", image);
    if (image) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [image]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-64 h-48 overflow-hidden pointer-events-none z-50 shadow-2xl border backdrop-blur-md hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "20px",
        translateY: "20px",
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
      }}
      transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
    >
      {image && (
        <img
          src={image}
          alt="Certificate Preview"
          className="w-full h-full object-cover"
        />
      )}
    </motion.div>
  );
}
