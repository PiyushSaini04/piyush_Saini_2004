'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
    // In a real app, calculate intersection of sections to update activeItem
  });

  return (
    <motion.div
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 rounded-full px-6 py-3 flex items-center gap-6 ${
        isScrolled 
          ? 'bg-black/50 backdrop-blur-md border border-white/10 shadow-xl' 
          : 'bg-transparent border-transparent'
      }`}
    >
      {navItems.map((item) => (
        <MagneticLink
          key={item.name}
          href={item.href}
          isActive={activeItem === item.name}
          onClick={() => setActiveItem(item.name)}
        >
          {item.name}
        </MagneticLink>
      ))}
    </motion.div>
  );
}

function MagneticLink({ children, href, isActive, onClick }: { children: string, href: string, isActive: boolean, onClick: () => void }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative text-sm font-medium transition-colors ${
        isActive ? 'text-white' : 'text-gray-400 hover:text-white'
      }`}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="active-pill"
          className="absolute -inset-x-3 -inset-y-2 bg-white/10 rounded-full -z-10"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.a>
  );
}
