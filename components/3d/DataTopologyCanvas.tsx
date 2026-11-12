"use client"

import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"

const STAGES = [
  {
    name: "RAW INGESTION",
    sub: "Kafka / APIs / S3",
    pos: new THREE.Vector3(-3.2, 1.2, 0),
    color: 0x22d3ee,
    colorHex: "#22D3EE",
  },
  {
    name: "DISTRIBUTED ETL",
    sub: "Talend / Control-M / dbt",
    pos: new THREE.Vector3(-1.0, -0.7, 0.4),
    color: 0x6366f1,
    colorHex: "#6366F1",
  },
  {
    name: "DATA WAREHOUSE",
    sub: "Snowflake / Lakehouse",
    pos: new THREE.Vector3(1.1, 0.9, -0.3),
    color: 0x818cf8,
    colorHex: "#818CF8",
  },
  {
    name: "AI WORKFLOWS",
    sub: "LLM / Analytics / BI",
    pos: new THREE.Vector3(3.2, -0.8, 0.2),
    color: 0x10b981,
    colorHex: "#10B981",
  },
]

export default function DataTopologyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeStage, setActiveStage] = useState<number | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    let animationFrameId: number
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      48,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, 5.8)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x6366f1, 3, 20)
    pointLight.position.set(0, 0, 3)
    scene.add(pointLight)

    const topLight = new THREE.DirectionalLight(0x22d3ee, 1.5)
    topLight.position.set(5, 8, 4)
    scene.add(topLight)

    // Background Particle Cloud
    const particleCount = 140
    const particleGeo = new THREE.BufferGeometry()
    const particlePos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 14
      particlePos[i + 1] = (Math.random() - 0.5) * 8
      particlePos[i + 2] = (Math.random() - 0.5) * 6 - 1
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3))
    const particleMat = new THREE.PointsMaterial({
      color: 0x818cf8,
      size: 0.04,
      transparent: true,
      opacity: 0.45,
    })
    const particleCloud = new THREE.Points(particleGeo, particleMat)
    scene.add(particleCloud)

    // Architectural Nodes & Gyroscopic Rings
    const nodeMeshes: THREE.Mesh[] = []
    const ringMeshes: THREE.Mesh[] = []

    STAGES.forEach((stage) => {
      // Octahedron core
      const coreGeo = new THREE.OctahedronGeometry(0.28, 0)
      const coreMat = new THREE.MeshStandardMaterial({
        color: stage.color,
        emissive: stage.color,
        emissiveIntensity: 1.8,
        wireframe: true,
      })
      const coreMesh = new THREE.Mesh(coreGeo, coreMat)
      coreMesh.position.copy(stage.pos)
      scene.add(coreMesh)
      nodeMeshes.push(coreMesh)

      // Outer Torus Ring
      const ringGeo = new THREE.TorusGeometry(0.44, 0.02, 16, 32)
      const ringMat = new THREE.MeshBasicMaterial({
        color: stage.color,
        transparent: true,
        opacity: 0.6,
      })
      const ringMesh = new THREE.Mesh(ringGeo, ringMat)
      ringMesh.position.copy(stage.pos)
      scene.add(ringMesh)
      ringMeshes.push(ringMesh)
    })

    // Spline Curves and Flowing Packets
    interface PipelineConnection {
      curve: THREE.CatmullRomCurve3
      packets: { mesh: THREE.Mesh; speed: number; offset: number }[]
    }

    const connections: PipelineConnection[] = []

    for (let i = 0; i < STAGES.length - 1; i++) {
      const vStart = STAGES[i].pos
      const vEnd = STAGES[i + 1].pos
      const vMid = new THREE.Vector3()
        .addVectors(vStart, vEnd)
        .multiplyScalar(0.5)
        .add(new THREE.Vector3(0, 0.6, 0.3))

      const curve = new THREE.CatmullRomCurve3([vStart, vMid, vEnd])
      const points = curve.getPoints(50)
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points)
      const lineMat = new THREE.LineBasicMaterial({
        color: STAGES[i].color,
        transparent: true,
        opacity: 0.35,
      })
      const line = new THREE.Line(lineGeo, lineMat)
      scene.add(line)

      // Flowing Packets along spline
      const packets: { mesh: THREE.Mesh; speed: number; offset: number }[] = []
      const packetColors = [STAGES[i].color, 0x22d3ee, 0xfafafa]

      packetColors.forEach((col, pIdx) => {
        const pGeo = new THREE.SphereGeometry(0.065, 16, 16)
        const pMat = new THREE.MeshStandardMaterial({
          color: col,
          emissive: col,
          emissiveIntensity: 3.5,
          roughness: 0.2,
        })
        const pMesh = new THREE.Mesh(pGeo, pMat)
        scene.add(pMesh)
        packets.push({
          mesh: pMesh,
          speed: 0.22,
          offset: pIdx * 0.33,
        })
      })

      connections.push({ curve, packets })
    }

    // Mouse Parallax tracking
    let targetRotationX = 0
    let targetRotationY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      targetRotationY = x * 0.22
      targetRotationX = -y * 0.16
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    // Resize Handler
    const handleResize = () => {
      if (!container) return
      const width = container.clientWidth
      const height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    // Render loop
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()
      const delta = clock.getDelta()

      // Smooth camera parallax interpolation
      scene.rotation.y += (targetRotationY - scene.rotation.y) * 0.05
      scene.rotation.x += (targetRotationX - scene.rotation.x) * 0.05

      // Rotate particle cloud gently
      particleCloud.rotation.y = elapsedTime * 0.03

      // Rotate nodes and rings
      ringMeshes.forEach((ring, idx) => {
        ring.rotation.z += 0.015 * (idx % 2 === 0 ? 1 : -1)
        ring.rotation.x += 0.01
      })

      nodeMeshes.forEach((node, idx) => {
        node.rotation.y = elapsedTime * 0.6
        // Gentle bobbing float
        node.position.y = STAGES[idx].pos.y + Math.sin(elapsedTime * 1.5 + idx) * 0.06
        ringMeshes[idx].position.y = node.position.y
      })

      // Move data packets along splines
      connections.forEach((conn) => {
        conn.packets.forEach((p) => {
          const t = (elapsedTime * p.speed + p.offset) % 1
          const pos = conn.curve.getPointAt(t)
          p.mesh.position.copy(pos)
        })
      })

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("mousemove", handleMouseMove)
      resizeObserver.disconnect()
      renderer.dispose()
      particleGeo.dispose()
      particleMat.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[450px] lg:h-[580px] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0A0A0F]/60 backdrop-blur-xl group"
    >
      {/* Top telemetry HUD bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between text-[11px] font-mono text-zinc-400 pointer-events-none">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-black/50 border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>LIVE PIPELINE TOPOLOGY // 60 FPS</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-zinc-500">
          <span>WebGL: ACTIVE</span>
          <span>NODES: 04</span>
          <span>LATENCY: 12ms</span>
        </div>
      </div>

      {/* WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Bottom Interactive Stage Badges */}
      <div className="absolute bottom-3 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-2 text-[10px] font-mono">
        <div className="flex items-center gap-2">
          {STAGES.map((st, i) => (
            <div
              key={st.name}
              onMouseEnter={() => setActiveStage(i)}
              onMouseLeave={() => setActiveStage(null)}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: st.colorHex }}
              />
              <span className="hidden sm:inline">{st.name}</span>
            </div>
          ))}
        </div>
        <span className="text-zinc-500">FLOW: INGESTION &rarr; ETL &rarr; DWH &rarr; AI</span>
      </div>
    </div>
  )
}
