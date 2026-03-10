"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Group } from "three";

function SceneCore() {
  const groupRef = useRef<Group | null>(null);

  const ringRotations = useMemo(
    () => [
      [0.2, 0.4, 0],
      [0.9, -0.6, 0.2],
      [-0.8, 0.3, 0.6],
    ],
    [],
  );

  useFrame((_, delta) => {
    if (!groupRef.current) {
      return;
    }
    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x = Math.sin(Date.now() * 0.0002) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.1, 5]} />
        <meshStandardMaterial color="#60656f" roughness={0.4} metalness={0.7} wireframe />
      </mesh>

      {ringRotations.map((rotation, index) => (
        <mesh
          key={index}
          rotation={[rotation[0], rotation[1], rotation[2]]}
          scale={1 + index * 0.2}
        >
          <torusGeometry args={[1.35, 0.01, 20, 160]} />
          <meshBasicMaterial color="#8f96a3" transparent opacity={0.25} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const narrowViewport = window.innerWidth < 900;
      setEnabled(!reducedMotion && !narrowViewport);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!enabled) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(115,122,136,0.24),transparent_45%),radial-gradient(circle_at_35%_70%,rgba(85,92,105,0.14),transparent_45%)]" />
    );
  }

  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.45} />
      <pointLight position={[2.5, 2, 4]} intensity={1.3} color="#ced5e2" />
      <pointLight position={[-2.2, -1.8, -2]} intensity={0.7} color="#545d6a" />
      <SceneCore />
    </Canvas>
  );
}
