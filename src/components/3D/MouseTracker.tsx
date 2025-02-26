import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

export default function MouseTracker() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame(() => {
    // Smoothly interpolate camera rotation
    camera.rotation.x += (targetRotation.current.x - camera.rotation.x) * 0.05;
    camera.rotation.y += (targetRotation.current.y - camera.rotation.y) * 0.05;
  });

  const handleMouseMove = (event: MouseEvent) => {
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

    targetRotation.current.y = mouse.current.x * 0.2;
    targetRotation.current.x = mouse.current.y * 0.2;
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return null;
} 
