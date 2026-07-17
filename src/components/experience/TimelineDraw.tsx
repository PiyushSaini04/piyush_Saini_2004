'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function TimelineDraw() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="absolute left-0 top-2 bottom-0 w-[2px] bg-white/10">
      <motion.div 
        style={{ height }}
        className="w-full bg-gradient-to-b from-white to-gray-500"
      />
      {/* 
        In a more complex implementation, we could also use scrollYProgress to trigger 
        the bullet points along the line popping in right as the line reaches them.
      */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-white" />
    </div>
  );
}
