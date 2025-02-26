import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Point3D } from '../../types';

interface ParticleFieldProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
  spread?: number;
}

export default function ParticleField({
  count = 1000,
  color = '#00FFEE',
  size = 0.02,
  speed = 0.1,
  spread = 1.5,
}: ParticleFieldProps) {
  const mesh = useRef<THREE.Points>(null);
  const hover = useRef(false);
  const mousePosition = useRef(new THREE.Vector3());

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * spread;
      const z = (Math.random() - 0.5) * spread;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [count, spread]);

  useFrame((state) => {
    if (!mesh.current) return;
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(state.clock.elapsedTime + positions[i]) * speed * 0.01;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;

    if (hover.current) {
      mesh.current.rotation.x += (mousePosition.current.y * 0.1 - mesh.current.rotation.x) * 0.1;
      mesh.current.rotation.y += (mousePosition.current.x * 0.1 - mesh.current.rotation.y) * 0.1;
    } else {
      mesh.current.rotation.y += speed * 0.01;
    }
  });

  return (
    <points
      ref={mesh}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
      onPointerMove={(e) => {
        mousePosition.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mousePosition.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      }}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
} 
