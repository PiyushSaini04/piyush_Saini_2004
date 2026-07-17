'use client';

import { useState, useRef } from 'react';

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function ScrambleText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    let iteration = 0;
    clearInterval(intervalRef.current as NodeJS.Timeout);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text.split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
      }
      
      iteration += 1 / 2; // Speed of unscramble
    }, 30);
  };

  const handleMouseLeave = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setDisplayText(text);
  };

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="font-mono cursor-pointer hover:text-white transition-colors"
    >
      {displayText}
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-white/5 bg-black">
      <div className="max-w-6xl w-full mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
        <div>
          &copy; {new Date().getFullYear()} Piyush Saini. All rights reserved.
        </div>
        <div className="flex gap-6">
          <ScrambleText text="Privacy Policy" />
          <ScrambleText text="Terms of Service" />
        </div>
      </div>
    </footer>
  );
}
