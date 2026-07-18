'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useKeyboard } from '@/hooks/useKeyboard';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useKeyboard('Escape', () => setIsMobileMenuOpen(false));

  const handleMobileLinkClick = (name: string) => {
    setActiveItem(name);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.div
        className={`hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 rounded-full px-6 py-3 items-center gap-6 ${
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

      {/* Mobile Navbar Header */}
      <div 
        className={`md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-2 flex items-center justify-end ${
          isScrolled || isMobileMenuOpen
            ? 'bg-transparent backdrop-blur-md ' 
            : 'bg-transparent border-transparent'
        }`}
      >
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col w-full max-w-sm px-4 gap-2">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => handleMobileLinkClick(item.name)}
                  whileTap={{ scale: 0.95 }}
                  className={`py-4 px-6 rounded-2xl border ${
                    activeItem === item.name 
                      ? 'bg-white/10 border-white/20 text-white font-semibold' 
                      : 'bg-transparent border-transparent text-gray-400 hover:bg-white/5'
                  } transition-colors text-center text-lg`}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
