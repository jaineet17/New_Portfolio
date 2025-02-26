// Remove React import
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useSound } from '../../hooks/useSound';

interface FloatingText {
  position: [number, number, number];
  text: string;
  color: string;
}

const texts: FloatingText[] = [
  { position: [-5, 2, -5], text: "REACT", color: "#61DAFB" },
  { position: [5, 3, -3], text: "TYPESCRIPT", color: "#3178C6" },
  { position: [-3, 4, -4], text: "THREE.JS", color: "#00FFEE" },
  { position: [4, 1, -6], text: "WEBGL", color: "#990000" },
];

function FloatingLabel({ position, text, color }: FloatingText) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { playSound } = useSound();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(clock.getElapsedTime() + position[0]) * 0.001;
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerEnter={() => {
        setHovered(true);
        playSound('hover');
      }}
      onPointerLeave={() => setHovered(false)}
    >
      <Text
        color={color}
        fontSize={0.5}
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="center"
        font="https://fonts.gstatic.com/s/orbitron/v19/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyGy6BoWgz.woff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
        scale={hovered ? 1.2 : 1}
      >
        {text}
      </Text>
    </mesh>
  );
}

function InteractiveParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const [hovered, setHovered] = useState(false);
  const { playSound } = useSound();

  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const time = clock.getElapsedTime();
      const particles = particlesRef.current;
      
      particles.rotation.y = time * (hovered ? 0.5 : 0.1);
      particles.rotation.x = Math.sin(time * 0.5) * (hovered ? 0.3 : 0.1);
    }
  });

  return (
    <points
      ref={particlesRef}
      onPointerEnter={() => {
        setHovered(true);
        playSound('hover');
      }}
      onPointerLeave={() => setHovered(false)}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00FFEE"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function InteractiveElements() {
  return (
    <group>
      {texts.map((text, index) => (
        <FloatingLabel key={index} {...text} />
      ))}
      <InteractiveParticles />
    </group>
  );
} 
