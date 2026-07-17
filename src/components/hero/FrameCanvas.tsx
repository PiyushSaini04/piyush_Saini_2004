'use client';

import { useEffect, useRef, useState } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';


interface FrameCanvasProps {
  progress: MotionValue<number>;
}

export default function FrameCanvas({ progress }: FrameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const frameCount = 100;

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      // Format number to 3 digits, e.g., 001.png
      const frameNum = i.toString().padStart(3, '0');
      img.src = `/assets/hero-sequence/${frameNum}.png`;
      img.onload = () => {
        loadedCount= loadedCount + 2;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
          // Draw second frame immediately once all are loaded (skip black first frame)
          drawFrame(loadedImages[1]);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const drawFrame = (img: HTMLImageElement) => {
    if (!canvasRef.current || !img) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Calculate scale for 'contain' (letterbox)
    const scale = Math.min(rect.width / img.width, rect.height / img.height);
    
    const drawWidth = img.width * scale;
    const drawHeight = img.height * scale;
    const offsetX = (rect.width - drawWidth) / 2;
    const offsetY = (rect.height - drawHeight) / 2;

    // Clear and draw
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Redraw when scroll progress changes
  useMotionValueEvent(progress, 'change', (latest) => {
    if (images.length === 0) return;
    
    // Calculate frame index based on progress (0 to 1)
    // Start at index 1 (frame 2) to avoid black frame
    const frameIndex = Math.min(
      frameCount - 1,
      Math.max(1, Math.floor(latest * frameCount))
    );
    
    drawFrame(images[frameIndex]);
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (images.length === 0) return;
      const currentProgress = progress.get();
      const frameIndex = Math.min(
        frameCount - 1,
        Math.max(1, Math.floor(currentProgress * frameCount))
      );
      drawFrame(images[frameIndex]);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images, progress]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full object-cover"
    />
  );
}
