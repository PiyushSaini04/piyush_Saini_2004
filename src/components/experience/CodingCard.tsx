'use client';

import { useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

export default function CodingCard({ platform }: { platform: any }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <a
      ref={ref}
      href={platform.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative block w-full p-6 bg-white/5 border border-white/10 rounded-2xl overflow-hidden group transition-colors duration-300 hover:border-white/20"
    >
      {/* Spotlight Hover Effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.1), transparent 40%)`,
        }}
      />
      
      <div className="relative z-10 flex justify-between items-center">
        <div>
          <h4 className="text-xl font-bold text-white mb-1 group-hover:text-gray-300 transition-colors">
            {platform.name}
          </h4>
          <div className="text-sm text-gray-400 mb-2">{platform.username}</div>
          <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-gray-300">
            {platform.rating}
          </div>
        </div>
        <div className="text-gray-500 group-hover:text-white transition-colors">
          <ExternalLink size={20} />
        </div>
      </div>
    </a>
  );
}
