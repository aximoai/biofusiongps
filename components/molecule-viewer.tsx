"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { OrbitControls, Html, Text } from "@react-three/drei"
import * as THREE from "three"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { PlayIcon, PauseIcon, RotateCwIcon } from "lucide-react"

interface AnalysisResult {
  location: string
  confidence: string
  compartments: string[]
  interactions: string
  signals: string
}

interface MoleculeViewerProps {
  sequence?: string
  analysisData: AnalysisResult | null
}

// Create patterns based on cellular location
const createLocationPattern = (location: string, count = 5000) => {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const phases = new Float32Array(count)
  const velocities = new Float32Array(count * 3)

  // Pattern configurations for different locations
  const patterns = {
    nucleus: {
      radius: 2,
      layers: 3,
      baseColor: new THREE.Color("#ff4d4d"),
      distribution: "spherical",
      particleSize: 0.15,
    },
    mitochondria: {
      radius: 2.5,
      layers: 2,
      baseColor: new THREE.Color("#ff6b4d"),
      distribution: "elongated",
      particleSize: 0.12,
    },
    "endoplasmic reticulum": {
      radius: 2.2,
      layers: 4,
      baseColor: new THREE.Color("#ff8f4d"),
      distribution: "network",
      particleSize: 0.1,
    },
    cytoplasm: {
      radius: 2.3,
      layers: 2,
      baseColor: new THREE.Color("#ffb34d"),
      distribution: "diffuse",
      particleSize: 0.08,
    },
    default: {
      radius: 2,
      layers: 3,
      baseColor: new THREE.Color("#ff4d4d"),
      distribution: "spherical",
      particleSize: 0.1,
    },
  }

  const pattern = patterns[location?.toLowerCase()] || patterns.default

  for (let i = 0; i < count; i++) {
    let x, y, z
    const layer = Math.floor(Math.random() * pattern.layers)

    switch (pattern.distribution) {
      case "elongated":
        const theta = Math.random() * Math.PI * 2
        const height = (Math.random() - 0.5) * 4
        const radius = pattern.radius * (0.5 + Math.random() * 0.5)
        x = radius * Math.cos(theta)
        y = height
        z = radius * Math.sin(theta)
        break

      case "network":
        const angle = Math.random() * Math.PI * 2
        const rad = pattern.radius * Math.sqrt(Math.random())
        x = rad * Math.cos(angle)
        y = rad * Math.sin(angle)
        z = (Math.random() - 0.5) * 2
        break

      case "diffuse":
        const phi = Math.acos(Math.random() * 2 - 1)
        const theta2 = Math.random() * Math.PI * 2
        const r = pattern.radius * Math.cbrt(Math.random())
        x = r * Math.sin(phi) * Math.cos(theta2)
        y = r * Math.sin(phi) * Math.sin(theta2)
        z = r * Math.cos(phi)
        break

      case "spherical":
      default:
        const theta3 = Math.random() * Math.PI * 2
        const phi2 = Math.acos(Math.random() * 2 - 1)
        const radius2 = pattern.radius * (0.8 + layer * 0.2)
        x = radius2 * Math.sin(phi2) * Math.cos(theta3)
        y = radius2 * Math.sin(phi2) * Math.sin(theta3)
        z = radius2 * Math.cos(phi2)
    }

    // Add some noise for more organic look
    const noise = (Math.random() - 0.5) * 0.2
    positions[i * 3] = x + noise
    positions[i * 3 + 1] = y + noise
    positions[i * 3 + 2] = z + noise

    // Initialize velocities for particle movement
    velocities[i * 3] = (Math.random() - 0.5) * 0.01
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01

    // Color variation based on position and layer
    const color = pattern.baseColor.clone()
    const distanceFromCenter = Math.sqrt(x * x + y * y + z * z)
    const intensity = 0.3 + (1 - distanceFromCenter / pattern.radius) * 0.7
    color.multiplyScalar(intensity)

    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b

    // Size variation with layer effect
    sizes[i] = pattern.particleSize * (1 + layer * 0.2) * (0.8 + Math.random() * 0.4)

    // Random phase for particle animation
    phases[i] = Math.random() * Math.PI * 2
  }

  return { positions, colors, sizes, phases, velocities }
}

export default function MoleculeViewer({ sequence, analysisData }: MoleculeViewerProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [rotationSpeed, setRotationSpeed] = useState(0.5)
  const [showProperties, setShowProperties] = useState<"structure" | "hydrophobicity" | "charge">("structure")
  const [currentLocation, setCurrentLocation] = useState<string>("default")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const transitionTimeRef = useRef(0)
  const velocitiesRef = useRef<Float32Array>()

  // Update visualization when analysis data changes
  useEffect(() => {
    if (analysisData?.location && currentLocation !== analysisData.location) {
      setIsTransitioning(true)
      transitionTimeRef.current = 0
      setCurrentLocation(analysisData.location)

      if (pointsRef.current) {
        const { positions, colors, sizes, phases, velocities } = createLocationPattern(analysisData.location)
        velocitiesRef.current = velocities

        // Store original positions for transition
        const originalPositions = new Float32Array(positions.length)
        originalPositions.set(pointsRef.current.geometry.attributes.position.array)

        // Animate transition with explosion effect
        const animate = () => {
          const progress = Math.min(transitionTimeRef.current / 1.0, 1)

          for (let i = 0; i < positions.length; i += 3) {
            // Add explosion effect during transition
            const explosionRadius = 5 * Math.sin(progress * Math.PI)
            const explosionOffset = new THREE.Vector3(
              (Math.random() - 0.5) * explosionRadius,
              (Math.random() - 0.5) * explosionRadius,
              (Math.random() - 0.5) * explosionRadius,
            )

            // Interpolate positions with explosion effect
            const currentPos = new THREE.Vector3(
              originalPositions[i],
              originalPositions[i + 1],
              originalPositions[i + 2],
            )
            const targetPos = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2])
            currentPos.lerp(targetPos, progress).add(explosionOffset.multiplyScalar(1 - progress))

            pointsRef.current!.geometry.attributes.position.array[i] = currentPos.x
            pointsRef.current!.geometry.attributes.position.array[i + 1] = currentPos.y
            pointsRef.current!.geometry.attributes.position.array[i + 2] = currentPos.z

            // Update colors with transition effect
            const colorProgress = Math.sin(progress * Math.PI)
            pointsRef.current!.geometry.attributes.color.array[i] = colors[i] * colorProgress
            pointsRef.current!.geometry.attributes.color.array[i + 1] = colors[i + 1] * colorProgress
            pointsRef.current!.geometry.attributes.color.array[i + 2] = colors[i + 2] * colorProgress
          }

          pointsRef.current!.geometry.attributes.position.needsUpdate = true
          pointsRef.current!.geometry.attributes.color.needsUpdate = true

          if (progress < 1) {
            requestAnimationFrame(animate)
          } else {
            setIsTransitioning(false)
          }
        }

        animate()
      }
    }
  }, [analysisData, currentLocation])

  // Create initial molecular structure
  const { positions, colors, sizes, phases, velocities } = useMemo(
    () => createLocationPattern(analysisData?.location || "default"),
    [analysisData?.location],
  )

  useEffect(() => {
    velocitiesRef.current = velocities
  }, [velocities])

  // Animation
  useFrame((state) => {
    if (!pointsRef.current || !isPlaying) return

    const time = state.clock.getElapsedTime()
    transitionTimeRef.current += state.clock.getDelta()

    // Rotate the entire structure
    pointsRef.current.rotation.y += 0.001 * rotationSpeed

    // Animate particles
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
    const colors = pointsRef.current.geometry.attributes.color.array as Float32Array
    const sizes = pointsRef.current.geometry.attributes.size.array as Float32Array

    for (let i = 0; i < positions.length; i += 3) {
      const phase = phases[Math.floor(i / 3)]

      // Complex particle motion
      if (velocitiesRef.current) {
        positions[i] += velocitiesRef.current[i] * Math.sin(time + phase)
        positions[i + 1] += velocitiesRef.current[i + 1] * Math.cos(time + phase)
        positions[i + 2] += velocitiesRef.current[i + 2] * Math.sin(time * 0.5 + phase)
      }

      // Wave-like motion
      const waveOffset = Math.sin(time + phase) * 0.03
      positions[i] += waveOffset
      positions[i + 1] += waveOffset * Math.cos(phase)
      positions[i + 2] += waveOffset * Math.sin(phase)

      // Dynamic color pulsing
      if (isTransitioning) {
        const pulseIntensity = (Math.sin(time * 10) + 1) * 0.5
        colors[i] *= 1 + pulseIntensity * 0.3
        colors[i + 1] *= 1 + pulseIntensity * 0.3
        colors[i + 2] *= 1 + pulseIntensity * 0.3
        sizes[Math.floor(i / 3)] *= 1 + pulseIntensity * 0.2
      }
    }

    // Animate glow
    if (glowRef.current) {
      const glowIntensity = isTransitioning ? 0.4 + Math.sin(time * 10) * 0.3 : 0.3 + Math.sin(time * 2) * 0.1

      if (glowRef.current.material instanceof THREE.MeshPhongMaterial) {
        glowRef.current.material.opacity = glowIntensity
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.geometry.attributes.color.needsUpdate = true
    pointsRef.current.geometry.attributes.size.needsUpdate = true
  })

  // Get confidence-based glow intensity
  const getConfidenceGlow = () => {
    switch (analysisData?.confidence) {
      case "high":
        return 0.4
      case "medium":
        return 0.3
      case "low":
        return 0.2
      default:
        return 0.2
    }
  }

  return (
    <>
      {/* Scene lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.4} color="#ff4d4d" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff6b4d" />
      <spotLight position={[0, 5, 0]} angle={0.5} penumbra={1} intensity={0.4} color="#ff4d4d" />

      {/* Molecular structure */}
      <group>
        {/* Core particle system */}
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
            <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
            <bufferAttribute attach="attributes-size" count={sizes.length} array={sizes} itemSize={1} />
          </bufferGeometry>
          <pointsMaterial
            size={0.1}
            sizeAttenuation={true}
            vertexColors={true}
            transparent={true}
            opacity={0.8}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>

        {/* Outer glow sphere */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[2.5, 32, 32]} />
          <meshPhongMaterial
            color="#ff4d4d"
            transparent={true}
            opacity={getConfidenceGlow()}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Inner core glow */}
        <mesh>
          <sphereGeometry args={[1.8, 32, 32]} />
          <meshPhongMaterial
            color="#ff4d4d"
            transparent={true}
            opacity={getConfidenceGlow() * 0.5}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Location indicator */}
        {analysisData?.location && (
          <Text
            position={[0, 3, 0]}
            fontSize={0.3}
            color="#ff4d4d"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter_Bold.json"
          >
            {analysisData.location}
          </Text>
        )}
      </group>

      {/* Controls */}
      <OrbitControls enableDamping dampingFactor={0.05} minDistance={5} maxDistance={15} />

      {/* UI Controls */}
      <Html position={[0, -3, 0]} center>
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 bg-black/40 p-4 rounded-lg border border-terminal-red/20 backdrop-blur-sm">
            <Button
              size="icon"
              variant="outline"
              className="bg-black/20 text-terminal-red hover:bg-terminal-red/10 border-terminal-red/30 w-10 h-10"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="bg-black/20 text-terminal-red hover:bg-terminal-red/10 border-terminal-red/30 w-10 h-10"
              onClick={() => {
                if (pointsRef.current) {
                  pointsRef.current.rotation.set(0, 0, 0)
                }
              }}
            >
              <RotateCwIcon className="h-5 w-5" />
            </Button>
          </div>

          <div className="w-48 bg-black/40 p-4 rounded-lg border border-terminal-red/20 backdrop-blur-sm">
            <Slider
              value={[rotationSpeed]}
              min={0}
              max={1}
              step={0.1}
              onValueChange={([value]) => setRotationSpeed(value)}
              className="w-full"
            />
          </div>
        </div>
      </Html>
    </>
  )
}

