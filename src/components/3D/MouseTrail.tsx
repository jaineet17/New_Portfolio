import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect } from 'react';

interface Point {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  age: number;
}

export default function MouseTrail() {
  const points = useRef<Point[]>([]);
  const mouse = useRef({ x: 0, y: 0, z: 0 });
  const maxPoints = 50;
  const pointLifetime = 1; // seconds

  const geometry = useMemo(() => new THREE.BufferGeometry(), []);
  const positions = useMemo(() => new Float32Array(maxPoints * 3), []);
  const sizes = useMemo(() => new Float32Array(maxPoints), []);

  useFrame(({ clock, camera }) => {
    const time = clock.getElapsedTime();

    // Update mouse position in 3D space
    const vector = new THREE.Vector3(mouse.current.x, mouse.current.y, 0.5);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));
    mouse.current = { x: pos.x, y: pos.y, z: pos.z };

    // Add new point
    if (points.current.length < maxPoints) {
      points.current.push({
        position: new THREE.Vector3(mouse.current.x, mouse.current.y, mouse.current.z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1
        ),
        age: time
      });
    }

    // Update points
    for (let i = points.current.length - 1; i >= 0; i--) {
      const point = points.current[i];
      const age = time - point.age;

      if (age > pointLifetime) {
        points.current.splice(i, 1);
        continue;
      }

      // Update position
      point.position.add(point.velocity);

      // Update geometry
      const i3 = i * 3;
      positions[i3] = point.position.x;
      positions[i3 + 1] = point.position.y;
      positions[i3 + 2] = point.position.z;

      // Update size based on age
      sizes[i] = (1 - age / pointLifetime) * 0.5;
    }

    // Update geometry
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.size.needsUpdate = true;
  });

  const handleMouseMove = (event: MouseEvent) => {
    mouse.current = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
      z: 0
    };
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#00FFEE"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
