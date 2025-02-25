import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import FloatingLogos from './FloatingLogos';
import HolographicCube from './HolographicCube';
import ParticleField from './ParticleField';
import { useLocation } from 'react-router-dom';

function LoadingFallback() {
  return null; // Or create a loading indicator
}

function Scene() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <color attach="background" args={['#000816']} />
      
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />

      {/* Background elements */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Main content */}
      {isHomePage && (
        <group position={[0, 0, -5]}>
          <HolographicCube />
          <FloatingLogos />
        </group>
      )}
      <ParticleField count={1000} spread={20} />

      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={isHomePage}
        autoRotate={isHomePage}
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <Suspense fallback={<LoadingFallback />}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
} 