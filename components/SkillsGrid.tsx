"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Layers,
  Database,
  Cpu,
  Brain,
  Code,
  Workflow,
  Sparkles,
  BarChart3,
  Server,
  Terminal,
} from "lucide-react"

interface SkillNode {
  name: string
  category: "etl" | "warehouse" | "ai" | "languages"
  proficiency: number
  tier: "Mission-Critical" | "Core Expert" | "Advanced"
  layer: "Ingestion" | "Processing" | "Storage" | "Intelligence" | "Serving"
  description: string
}

const SKILLS_DATA: SkillNode[] = [
  // Data Engineering & ETL
  {
    name: "Talend",
    category: "etl",
    proficiency: 95,
    tier: "Mission-Critical",
    layer: "Processing",
    description: "Enterprise integration workflows, multi-source ingestion, and automated ETL jobs.",
  },
  {
    name: "Control-M",
    category: "etl",
    proficiency: 92,
    tier: "Mission-Critical",
    layer: "Processing",
    description: "Enterprise batch scheduling, mission-critical financial job dependencies, and SLA governance.",
  },
  {
    name: "dbt (data build tool)",
    category: "etl",
    proficiency: 90,
    tier: "Core Expert",
    layer: "Processing",
    description: "Modular SQL transformations, DAG dependencies, testing models, and automated documentation.",
  },
  {
    name: "Apache Airflow",
    category: "etl",
    proficiency: 85,
    tier: "Core Expert",
    layer: "Processing",
    description: "Pythonic DAG orchestration, task retries, dynamic pipeline generation, and backfills.",
  },

  // Cloud & Data Warehousing
  {
    name: "Snowflake",
    category: "warehouse",
    proficiency: 94,
    tier: "Mission-Critical",
    layer: "Storage",
    description: "Virtual warehouses, clustering keys, zero-copy cloning, time travel, and Snowpipe ingestion.",
  },
  {
    name: "Advanced SQL",
    category: "warehouse",
    proficiency: 96,
    tier: "Mission-Critical",
    layer: "Storage",
    description: "Complex window functions, query plan analysis, dimensional modeling, and indexing.",
  },
  {
    name: "Power BI",
    category: "warehouse",
    proficiency: 88,
    tier: "Core Expert",
    layer: "Serving",
    description: "Executive dashboards, DAX measures, automated dataset refresh, and business telemetry.",
  },
  {
    name: "Tableau",
    category: "warehouse",
    proficiency: 82,
    tier: "Advanced",
    layer: "Serving",
    description: "Exploratory visual analytics, enterprise reporting suites, and analytical workbooks.",
  },

  // AI & Orchestration
  {
    name: "AI-Driven Automation",
    category: "ai",
    proficiency: 88,
    tier: "Core Expert",
    layer: "Intelligence",
    description: "Automated schema resolution, synthetic test generation, and incident diagnosis via AI.",
  },
  {
    name: "LLM & Embedding Pipelines",
    category: "ai",
    proficiency: 85,
    tier: "Core Expert",
    layer: "Intelligence",
    description: "Vector database ingestion, chunking strategies, and retrieval-augmented pipeline endpoints.",
  },
  {
    name: "ML Data Preprocessing",
    category: "ai",
    proficiency: 82,
    tier: "Advanced",
    layer: "Intelligence",
    description: "Feature normalization, outlier detection, and pipeline data staging for model training.",
  },

  // Languages & DevOps
  {
    name: "Python",
    category: "languages",
    proficiency: 95,
    tier: "Mission-Critical",
    layer: "Processing",
    description: "Custom ETL scripts, pandas/polars optimization, REST APIs, and automated telemetry.",
  },
  {
    name: "TypeScript / Next.js",
    category: "languages",
    proficiency: 88,
    tier: "Core Expert",
    layer: "Serving",
    description: "Modern full-stack interfaces, real-time telemetry dashboards, and API routing.",
  },
  {
    name: "Git & CI/CD DevOps",
    category: "languages",
    proficiency: 92,
    tier: "Core Expert",
    layer: "Processing",
    description: "Version control workflows, release branches, automated linting, and pipeline deployments.",
  },
  {
    name: "Flutter",
    category: "languages",
    proficiency: 80,
    tier: "Advanced",
    layer: "Serving",
    description: "Cross-platform mobile application development with clean state architecture.",
  },
]

const CATEGORIES = [
  { id: "all", label: "All Telemetry Nodes", icon: Layers },
  { id: "etl", label: "Data Engineering & ETL", icon: Workflow },
  { id: "warehouse", label: "Cloud & Lakehouse", icon: Database },
  { id: "ai", label: "AI & Orchestration", icon: Brain },
  { id: "languages", label: "Languages & DevOps", icon: Code },
]

export default function SkillsGrid() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null)

  const filteredSkills =
    activeCategory === "all"
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === activeCategory)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`)
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`)
  }

  return (
    <section id="architecture" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/[0.05] text-xs font-mono text-indigo-400 mb-3">
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          <span>{"MODULE 03 // ARCHITECTURAL MATRIX"}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
          Interactive Tech Stack & Capability Topology
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-3 font-sans">
          A deeply engineered capability matrix spanning distributed pipelines, cloud data warehouses, AI pipelines, and full-stack telemetry tooling.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-white/[0.08] pb-4">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-medium transition-all duration-200 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/40"
                  : "bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          )
        })}
      </div>

      {/* Skills Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => {
            const isLayerActive =
              hoveredSkill !== null && hoveredSkill.layer === skill.layer

            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`spotlight-card p-6 flex flex-col justify-between transition-all duration-300 ${
                  isLayerActive
                    ? "border-cyan-400/60 shadow-lg shadow-cyan-500/10"
                    : "border-white/[0.08]"
                }`}
              >
                <div className="relative z-10">
                  {/* Card Header: Layer & Tier */}
                  <div className="flex items-center justify-between mb-3 text-[11px] font-mono">
                    <span
                      className={`px-2 py-0.5 rounded border transition-colors ${
                        isLayerActive
                          ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/40"
                          : "bg-white/[0.04] text-zinc-400 border-white/[0.08]"
                      }`}
                    >
                      LAYER: {skill.layer.toUpperCase()}
                    </span>
                    <span
                      className={`font-semibold ${
                        skill.tier === "Mission-Critical"
                          ? "text-indigo-400"
                          : skill.tier === "Core Expert"
                          ? "text-cyan-400"
                          : "text-emerald-400"
                      }`}
                    >
                      {skill.tier}
                    </span>
                  </div>

                  {/* Skill Name */}
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    {skill.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-6">
                    {skill.description}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/[0.06]">
                  {/* Proficiency Meter */}
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-zinc-500">EFFICIENCY INDEX</span>
                    <span className="text-white font-bold">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Summary Architectural Band */}
      <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-6 text-center font-mono">
        <div>
          <span className="text-2xl sm:text-3xl font-bold text-white block">15+</span>
          <span className="text-xs text-zinc-500 uppercase mt-1 block">Production Technologies</span>
        </div>
        <div>
          <span className="text-2xl sm:text-3xl font-bold text-cyan-400 block">3+</span>
          <span className="text-xs text-zinc-500 uppercase mt-1 block">Years Enterprise Scale</span>
        </div>
        <div>
          <span className="text-2xl sm:text-3xl font-bold text-indigo-400 block">20+</span>
          <span className="text-xs text-zinc-500 uppercase mt-1 block">Delivered Systems</span>
        </div>
        <div>
          <span className="text-2xl sm:text-3xl font-bold text-emerald-400 block">100%</span>
          <span className="text-xs text-zinc-500 uppercase mt-1 block">Data SLA Fidelity</span>
        </div>
      </div>
    </section>
  )
}
