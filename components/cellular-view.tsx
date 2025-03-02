"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Text } from "@react-three/drei"

interface CellularViewProps {
  sequence: string
}

function CellModel() {
  return (
    <group>
      {/* Cell membrane */}
      <Sphere args={[3, 32, 32]}>
        <meshPhongMaterial color="#ff4d4d" transparent opacity={0.1} wireframe />
      </Sphere>

      {/* Nucleus */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial color="#ff4d4d" attach="material" distort={0.3} speed={1.5} opacity={0.5} transparent />
      </Sphere>

      {/* Labels */}
      <Text position={[0, 1.5, 0]} fontSize={0.3} color="#ff4d4d" anchorX="center" anchorY="middle">
        Nucleus
      </Text>

      <Text position={[0, -2, 0]} fontSize={0.3} color="#ff4d4d" anchorX="center" anchorY="middle">
        Cell Membrane
      </Text>
    </group>
  )
}

export default function CellularView({ sequence }: CellularViewProps) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <CellModel />
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      </Canvas>
    </div>
  )
}

