'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import FrameCanvas from './FrameCanvas';
import HeroContent from './HeroContent';
import Sphere from './Sphere';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Frame Sequence Canvas */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-5">
              <Sphere />
          </div>
          <div className="absolute inset-0 z-5">
              <Sphere />
          </div>
        <FrameCanvas progress={smoothProgress} />

        {/* Cinematic vignette */}
        <div
          className="absolute inset-0 mx-[7%] pointer-events-none"
          style={{
            boxShadow: `
              inset 120px 0 120px -60px rgba(0, 0, 0, 0.9),
              inset -120px 0 120px -60px rgba(0, 0, 0, 0.9),
              inset 0 80px 100px -50px rgba(0,0,0,0.8),
              inset 0 -80px 100px -50px rgba(0,0,0,0.7)
            `,
          }}
        />
      </div>
        
        {/* Foreground Content */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <HeroContent progress={smoothProgress} />
        </div>

        
        {/* Seamless gradient transition into About section */}
        <div className="absolute bottom-0 left-0 w-full h-32 z-20 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
