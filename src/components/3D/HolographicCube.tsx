import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

export default function HolographicCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current && wireframeRef.current) {
      // Rotate the cube
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.3;
      meshRef.current.rotation.y += 0.01;
      
      // Sync wireframe rotation
      wireframeRef.current.rotation.copy(meshRef.current.rotation);
    }
  });

  return (
    <group>
      {/* Solid cube */}
      <Box ref={meshRef} args={[2, 2, 2]}>
        <meshPhongMaterial
          color="#00FFEE"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </Box>

      {/* Wireframe cube */}
      <Box ref={wireframeRef} args={[2.1, 2.1, 2.1]}>
        <meshBasicMaterial
          color="#00FFEE"
          wireframe
          transparent
          opacity={0.5}
        />
      </Box>
    </group>
  );
} 
