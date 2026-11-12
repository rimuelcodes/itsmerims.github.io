"use client"

import React, { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Text } from "@react-three/drei"
import * as THREE from "three"

// Pipeline stages in 3D space
const STAGES = [
  {
    name: "RAW INGESTION",
    sub: "Kafka / APIs / S3",
    pos: [-2.8, 1.2, 0] as [number, number, number],
    color: "#22D3EE",
  },
  {
    name: "DISTRIBUTED ETL",
    sub: "Talend / Control-M / dbt",
    pos: [-0.9, -0.6, 0.4] as [number, number, number],
    color: "#6366F1",
  },
  {
    name: "DATA WAREHOUSE",
    sub: "Snowflake / Lakehouse",
    pos: [1.1, 0.9, -0.3] as [number, number, number],
    color: "#818CF8",
  },
  {
    name: "AI WORKFLOWS",
    sub: "LLM / Analytics / BI",
    pos: [2.9, -0.7, 0.2] as [number, number, number],
    color: "#10B981",
  },
]

// Animated data packet flowing along a spline curve
function FlowingPacket({
  curve,
  speed,
  offset,
  color,
}: {
  curve: THREE.CatmullRomCurve3
  speed: number
  offset: number
  color: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = (clock.getElapsedTime() * speed + offset) % 1
    const pos = curve.getPointAt(t)
    meshRef.current.position.copy(pos)
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.07, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={3.5}
        roughness={0.2}
      />
    </mesh>
  )
}

// Spline connection between two nodes with animated pulses
function PipelineSpline({
  start,
  end,
  color,
}: {
  start: [number, number, number]
  end: [number, number, number]
  color: string
}) {
  const { curve, linePoints } = useMemo(() => {
    const vStart = new THREE.Vector3(...start)
    const vEnd = new THREE.Vector3(...end)
    const vMid = new THREE.Vector3()
      .addVectors(vStart, vEnd)
      .multiplyScalar(0.5)
      .add(new THREE.Vector3(0, 0.6, 0.3)) // Arch upward

    const catmull = new THREE.CatmullRomCurve3([vStart, vMid, vEnd])
    const points = catmull.getPoints(50)
    return { curve: catmull, linePoints: points }
  }, [start, end])

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(linePoints)
  }, [linePoints])

  return (
    <group>
      {/* Curved Pipe Track */}
      {/* @ts-ignore */}
      <line geometry={lineGeometry}>
        <lineBasicMaterial
          color={color}
          opacity={0.35}
          transparent
          linewidth={1.5}
        />
      </line>

      {/* Multiple moving packets */}
      <FlowingPacket curve={curve} speed={0.25} offset={0} color={color} />
      <FlowingPacket curve={curve} speed={0.25} offset={0.35} color="#22D3EE" />
      <FlowingPacket curve={curve} speed={0.25} offset={0.7} color="#FAFAFA" />
    </group>
  )
}

// Architectural Cluster Node
function ClusterNode({
  stage,
  isHovered,
  onHover,
}: {
  stage: (typeof STAGES)[0]
  isHovered: boolean
  onHover: (hovered: boolean) => void
}) {
  const outerRingRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.8
      outerRingRef.current.rotation.x += delta * 0.4
    }
  })

  return (
    <group
      position={stage.pos}
      onPointerOver={() => onHover(true)}
      onPointerOut={() => onHover(false)}
    >
      {/* Core Node */}
      <mesh>
        <octahedronGeometry args={[isHovered ? 0.32 : 0.26, 0]} />
        <meshStandardMaterial
          color={stage.color}
          emissive={stage.color}
          emissiveIntensity={isHovered ? 2.8 : 1.6}
          roughness={0.2}
          wireframe={!isHovered}
        />
      </mesh>

      {/* Rotating Gyroscopic Ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[0.42, 0.02, 16, 32]} />
        <meshBasicMaterial
          color={stage.color}
          transparent
          opacity={isHovered ? 0.9 : 0.45}
        />
      </mesh>

      {/* 3D Label */}
      <Text
        position={[0, -0.62, 0]}
        fontSize={0.16}
        color="#FAFAFA"
        anchorX="center"
        anchorY="top"
      >
        {stage.name}
      </Text>
      <Text
        position={[0, -0.84, 0]}
        fontSize={0.11}
        color="#71717A"
        anchorX="center"
        anchorY="top"
      >
        {stage.sub}
      </Text>
    </group>
  )
}

// Background Particle Cloud
function TelemetryPointField() {
  const count = 120
  const points = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 3) {
      p[i] = (Math.random() - 0.5) * 12
      p[i + 1] = (Math.random() - 0.5) * 8
      p[i + 2] = (Math.random() - 0.5) * 6 - 1
    }
    return p
  }, [count])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#818CF8"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

// Scene Root with gentle mouse parallax
function SceneTopology() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ pointer }) => {
    if (!groupRef.current) return
    // Subtle, smooth camera/group parallax following cursor
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.25,
      0.05
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointer.y * 0.18,
      0.05
    )
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <pointLight position={[0, 0, 2]} intensity={2} color="#6366F1" />

      <TelemetryPointField />

      {/* Spline Connections */}
      <PipelineSpline
        start={STAGES[0].pos}
        end={STAGES[1].pos}
        color="#22D3EE"
      />
      <PipelineSpline
        start={STAGES[1].pos}
        end={STAGES[2].pos}
        color="#6366F1"
      />
      <PipelineSpline
        start={STAGES[2].pos}
        end={STAGES[3].pos}
        color="#10B981"
      />

      {/* Cluster Nodes */}
      {STAGES.map((stage, idx) => (
        <Float key={stage.name} speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <ClusterNode
            stage={stage}
            isHovered={hoveredIdx === idx}
            onHover={(h) => setHoveredIdx(h ? idx : null)}
          />
        </Float>
      ))}
    </group>
  )
}

export default function DataTopologyCanvas() {
  const [hasWebGL, setHasWebGL] = useState(true)

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas")
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (!gl) setHasWebGL(false)
    } catch {
      setHasWebGL(false)
    }
  }, [])

  if (!hasWebGL) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center border border-white/10 rounded-2xl bg-white/[0.02] p-8 text-center font-mono">
        <div className="w-12 h-12 rounded-full border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-4 animate-pulse">
          ⚡
        </div>
        <p className="text-sm text-zinc-300 font-semibold mb-1">
          LIVING 3D ETL TOPOLOGY
        </p>
        <p className="text-xs text-zinc-500">
          Raw Ingestion ➔ Distributed ETL ➔ Snowflake Lakehouse ➔ AI Workflows
        </p>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[450px] lg:h-[580px] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0A0A0F]/60 backdrop-blur-xl">
      {/* Top telemetry HUD bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between text-[11px] font-mono text-zinc-400 pointer-events-none">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-black/40 border border-white/5 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{"LIVE PIPELINE TOPOLOGY // 60 FPS"}</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-zinc-500">
          <span>PARALLAX: ACTIVE</span>
          <span>NODES: 04</span>
          <span>LATENCY: 12ms</span>
        </div>
      </div>

      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneTopology />
      </Canvas>

      {/* Bottom telemetry readout footer */}
      <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[10px] font-mono text-zinc-500 pointer-events-none border-t border-white/5 pt-2">
        <span>FLOW: INGESTION ➔ ETL ➔ WAREHOUSE ➔ AI</span>
        <span>INTERACTIVE: HOVER NODES</span>
      </div>
    </div>
  )
}
