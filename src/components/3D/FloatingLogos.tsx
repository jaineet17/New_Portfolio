import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const technologies = [
  { text: 'REACT', color: '#61DAFB', position: [-3, 2, -5] },
  { text: 'THREE.JS', color: '#00FFEE', position: [3, -1, -4] },
  { text: 'TYPESCRIPT', color: '#3178C6', position: [-2, -2, -6] },
  { text: 'TAILWIND', color: '#38BDF8', position: [4, 1, -5] },
  { text: 'NEXT.JS', color: '#FFFFFF', position: [0, 3, -4] },
];

export default function FloatingLogos() {
  const groupRef = useRef<THREE.Group>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useFrame(({ clock, mouse }) => {
    if (groupRef.current) {
      // Subtle rotation based on mouse position
      groupRef.current.rotation.y = mouse.x * 0.1;
      groupRef.current.rotation.x = mouse.y * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {technologies.map((tech, index) => (
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