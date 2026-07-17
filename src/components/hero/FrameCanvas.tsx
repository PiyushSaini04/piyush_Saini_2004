'use client';

import { useEffect, useRef, useState } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';

interface FrameCanvasProps {
  progress: MotionValue<number>;
}

export default function FrameCanvas({ progress }: FrameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  // Sequence settings
  const START_FRAME = 27;
  const END_FRAME = 100;
  const TOTAL_FRAMES = END_FRAME - START_FRAME + 1;

  // -----------------------
  // Draw Frame
  // -----------------------
  const drawFrame = (img: HTMLImageElement) => {
    if (!canvasRef.current || !img) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Reset transform before scaling
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, rect.width, rect.height);

    // Contain
    const scale = Math.min(
      rect.width / img.width,
      rect.height / img.height
    );

    const drawWidth = img.width * scale;
    const drawHeight = img.height * scale;

    const offsetX = (rect.width - drawWidth) / 2;
    const offsetY = (rect.height - drawHeight) / 2;

    ctx.drawImage(
      img,
      offsetX,
      offsetY,
      drawWidth,
      drawHeight
    );
  };

  // -----------------------
  // Preload Images
  // -----------------------
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = START_FRAME; i <= END_FRAME; i++) {
      const img = new Image();

      img.src = `/assets/hero-sequence/${String(i).padStart(3, '0')}.png`;

      img.onload = () => {
        loadedCount++;

        if (loadedCount === TOTAL_FRAMES) {
          setImages(loadedImages);

          // Draw first frame immediately
          drawFrame(loadedImages[0]);
        }
      };

      img.onerror = () => {
        console.error(`Failed to load frame ${i}`);
      };

      loadedImages.push(img);
    }
  }, []);

  // -----------------------
  // Scroll Animation
  // -----------------------
  useMotionValueEvent(progress, 'change', (latest) => {
    if (!images.length) return;

    const frameIndex = Math.min(
      images.length - 1,
      Math.floor(latest * (images.length - 1))
    );

    drawFrame(images[frameIndex]);
  });

  // -----------------------
  // Handle Resize
  // -----------------------
  useEffect(() => {
    if (!images.length) return;

    const handleResize = () => {
      const current = progress.get();

      const frameIndex = Math.min(
        images.length - 1,
        Math.floor(current * (images.length - 1))
      );

      drawFrame(images[frameIndex]);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [images, progress]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
    />
  );
}