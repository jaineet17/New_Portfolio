// Update the imports to remove unused ones
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// Then update the component by removing unused variables
export default function FloatingLogos() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ mouse }) => {
    if (groupRef.current) {
      // Subtle rotation based on mouse position
      groupRef.current.rotation.y = mouse.x * 0.1;
      groupRef.current.rotation.x = mouse.y * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {technologies.map((tech) => (
        <group key={tech.text} position={tech.position as [number, number, number]}>
          <Text
            fontSize={0.4}
            color={tech.color}
            anchorX="center"
            anchorY="middle"
            font="/fonts/Orbitron-Regular.woff"
            characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,!?"
          >
            {tech.text}
            <meshPhongMaterial
              attach="material"
              color={tech.color}
              emissive={tech.color}
              emissiveIntensity={0.5}
              specular={new THREE.Color(tech.color)}
              shininess={100}
            />
          </Text>
        </group>
      ))}
    </group>
  );
}
