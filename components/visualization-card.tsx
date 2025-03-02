"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei"

interface AnalysisResult {
  location: string
  confidence: string
  compartments: string[]
  interactions: string
  signals: string
}

interface VisualizationCardProps {
  sequence?: string
  analysisData: AnalysisResult | null
}

function ProteinVisualization() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Sphere args={[1, 32, 32]}>
        <MeshDistortMaterial color="#ff4d4d" attach="material" distort={0.4} speed={2} roughness={0} />
      </Sphere>
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
    </>
  )
}

export default function VisualizationCard({ sequence, analysisData }: VisualizationCardProps) {
  return (
    <Card className="bg-black/90 border-terminal-red/30 h-[600px]">
      <CardHeader>
        <CardTitle className="text-terminal-red">Molecular Visualization</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-4rem)]">
        <div className="w-full h-full relative bg-black">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ProteinVisualization />
          </Canvas>
        </div>
      </CardContent>
    </Card>
  )
}

