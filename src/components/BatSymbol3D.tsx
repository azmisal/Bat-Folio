import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 600;

// Bat symbol shape points
function generateBatPoints(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    // Bat wing shape using parametric equation
    const wing = Math.sin(t * 2) * 0.5;
    const body = Math.cos(t) * (1 + 0.3 * Math.sin(t * 3));
    const ear = t > 1.2 && t < 1.9 ? 0.5 : t > 4.4 && t < 5.1 ? 0.5 : 0;

    positions[i * 3] = body * 1.5;
    positions[i * 3 + 1] = (wing + ear) * 1.5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
  }
  return positions;
}

function BatParticles() {
  const meshRef = useRef<THREE.Points>(null);
  const [hovered, setHovered] = useState(false);
  const time = useRef(0);

  const { originalPositions, scatteredPositions } = useMemo(() => {
    const orig = generateBatPoints(PARTICLE_COUNT);
    const scattered = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      scattered[i] = (Math.random() - 0.5) * 8;
    }
    return { originalPositions: orig, scatteredPositions: scattered };
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    time.current += delta;
    meshRef.current.rotation.y = Math.sin(time.current * 0.3) * 0.15;
    meshRef.current.rotation.x = Math.sin(time.current * 0.2) * 0.05;

    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const target = hovered ? scatteredPositions : originalPositions;
    const speed = hovered ? 0.04 : 0.06;

    for (let i = 0; i < positions.length; i++) {
      positions[i] += (target[i] - positions[i]) * speed;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={originalPositions.slice()}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#EAB308"
        size={0.04}
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

const BatSymbol3D = () => {
  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <BatParticles />
      </Canvas>
    </div>
  );
};

export default BatSymbol3D;
