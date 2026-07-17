'use client';

import { Code2, Briefcase, MessageCircle, Camera } from 'lucide-react';

const icons = {
  Github: Code2,
  Linkedin: Briefcase,
  Twitter: MessageCircle,
  Instagram: Camera
};

export default function SocialIcon({ social }: { social: any }) {
  const Icon = icons[social.icon as keyof typeof icons] || Code2;
  
  return (
    <a 
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:scale-110 hover:rotate-12 transition-all duration-300"
    >
      <Icon size={20} />
    </a>
  );
}
