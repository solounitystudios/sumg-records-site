"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

interface WebGLHeroProps {
  className?: string;
}

function createHazeTexture() {
  if (typeof document === "undefined") {
    return new THREE.Texture();
  }

  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.Texture();
  }

  context.clearRect(0, 0, size, size);
  const gradient = context.createRadialGradient(
    size / 2,
    size / 2,
    size * 0.08,
    size / 2,
    size / 2,
    size * 0.48,
  );
  gradient.addColorStop(0, "rgba(220,228,240,0.36)");
  gradient.addColorStop(0.35, "rgba(150,160,176,0.14)");
  gradient.addColorStop(1, "rgba(18,20,24,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  for (let i = 0; i < 16; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const radius = 10 + Math.random() * 34;
    context.fillStyle = `rgba(118,125,138,${Math.random() * 0.06})`;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

interface HazeLayerProps {
  texture: THREE.Texture;
  index: number;
  mobile: boolean;
}

function HazeLayer({ texture, index, mobile }: HazeLayerProps) {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const offset = useMemo(() => index * 1.37, [index]);
  const drift = useMemo(() => 0.03 + (index % 4) * 0.007, [index]);
  const amplitude = useMemo(
    () => (mobile ? 0.05 : 0.12) + (index % 3) * 0.036,
    [index, mobile],
  );
  const baseOpacity = useMemo(() => 0.11 + index * 0.015, [index]);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    const material = materialRef.current;
    if (!mesh || !material) {
      return;
    }

    const time = state.clock.elapsedTime;
    const pointerInfluence = mobile ? 0 : state.pointer.x * 0.24;

    mesh.position.x = Math.sin(time * drift + offset) * amplitude + pointerInfluence;
    mesh.position.y = Math.cos(time * drift * 0.7 + offset) * amplitude * 0.7;
    mesh.rotation.z += delta * (0.012 + index * 0.0025);
    material.opacity = baseOpacity + Math.sin(time * 0.18 + offset) * 0.02;
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, -1.9 + index * 0.7]}
      scale={[4.4 + index * 1.1, 3.9 + index * 0.95, 1]}
      rotation={[0, 0, index * 0.09]}
    >
      <planeGeometry args={[1, 1, 1, 1]} />
      <meshBasicMaterial
        ref={materialRef}
        map={texture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#4f5764"
        opacity={baseOpacity}
      />
    </mesh>
  );
}

interface HeroSceneProps {
  mobile: boolean;
}

function HeroScene({ mobile }: HeroSceneProps) {
  const hazeTexture = useMemo(() => createHazeTexture(), []);
  const groupRef = useRef<THREE.Group | null>(null);
  const hazeCount = mobile ? 4 : 7;

  useEffect(() => {
    return () => {
      hazeTexture.dispose();
    };
  }, [hazeTexture]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    const pointerY = mobile ? 0 : state.pointer.y * 0.05;
    const pointerX = mobile ? 0 : state.pointer.x * 0.09;
    group.rotation.x += (pointerY - group.rotation.x) * 0.03;
    group.rotation.y += (pointerX - group.rotation.y) * 0.03;
    group.position.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    group.rotation.z += delta * 0.002;
  });

  return (
    <>
      <color attach="background" args={["#090a0c"]} />
      <fog attach="fog" args={["#090a0c", 2.5, 9]} />
      <PerspectiveCamera makeDefault position={[0, 0, 4.4]} fov={44} />
      <ambientLight intensity={0.28} />
      <pointLight position={[1.2, 1.4, 2.2]} color="#a7b0c1" intensity={0.65} />
      <pointLight position={[-1.8, -1, 1.4]} color="#4b5360" intensity={0.45} />
      <group ref={groupRef}>
        {Array.from({ length: hazeCount }).map((_, index) => (
          <HazeLayer key={index} texture={hazeTexture} index={index} mobile={mobile} />
        ))}
      </group>
    </>
  );
}

export default function WebGLHero({ className = "" }: WebGLHeroProps) {
  const [renderConfig, setRenderConfig] = useState({
    webglEnabled: false,
    mobile: false,
  });

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.innerWidth < 900;
      let hasWebgl = false;

      if (!reducedMotion) {
        try {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
          hasWebgl = Boolean(context);
        } catch {
          hasWebgl = false;
        }
      }

      setRenderConfig({ webglEnabled: hasWebgl, mobile: isMobile });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!renderConfig.webglEnabled) {
    return (
      <div
        className={`${className} absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(86,92,106,0.3),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(66,74,88,0.2),transparent_45%),linear-gradient(180deg,#0b0c0e_0%,#08090b_100%)]`}
      />
    );
  }

  return (
    <div className={`${className} absolute inset-0`}>
      <Canvas
        dpr={renderConfig.mobile ? [1, 1.2] : [1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <HeroScene mobile={renderConfig.mobile} />
      </Canvas>
    </div>
  );
}
