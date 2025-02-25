import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';

export default function PerformanceMonitor() {
  const { gl } = useThree();
  const [quality, setQuality] = useState(1);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 60;

    function checkPerformance() {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;

        // Adjust quality based on FPS
        if (fps < 30 && quality > 0.5) {
          setQuality(q => Math.max(q - 0.1, 0.5));
          gl.setPixelRatio(window.devicePixelRatio * quality);
        } else if (fps > 55 && quality < 1) {
          setQuality(q => Math.min(q + 0.1, 1));
          gl.setPixelRatio(window.devicePixelRatio * quality);
        }
      }

      requestAnimationFrame(checkPerformance);
    }

    const animationFrame = requestAnimationFrame(checkPerformance);
    return () => cancelAnimationFrame(animationFrame);
  }, [gl, quality]);

  return null;
} 