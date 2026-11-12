"use client"

import React, { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  FolderGit2,
  ExternalLink,
  Github,
  ArrowUpRight,
  Database,
  Workflow,
  Sparkles,
  Layers,
  CheckCircle,
} from "lucide-react"

interface ProjectItem {
  id: string
  name: string
  category: "Club Operations" | "AI Guidance" | "Finance" | "Desktop App"
  image?: string
  github: string
  link?: string
  featured: boolean
  problem: string
  pipelineArchitecture: string
  impact: string
  tags: string[]
  architectureFlow: {
    step1: string
    step2: string
    step3: string
    step4: string
  }
}

const PROJECTS: ProjectItem[] = [
  {
    id: "msw-badminton",
    name: "MSW Badminton App",
    category: "Club Operations",
    image: "/msw-badminton-app.png",
    github: "https://github.com/itsmerims/MSW-Badminton-App",
    link: "https://msw-badminton-app.vercel.app/",
    featured: true,
    problem:
      "Manual court queue management caused player friction, matchmaking delays, and inaccurate daily cash audits.",
    pipelineArchitecture:
      "Engineered real-time deterministic queuing state machine in Supabase PostgreSQL with row-level security and automated balance ledger synchronization.",
    impact:
      "Automated queue dispatching across 8+ courts with zero scheduling overlaps and 100% audit accuracy for daily financial reconciliations.",
    tags: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS", "ShadCN UI"],
    architectureFlow: {
      step1: "Player Queue Check-in",
      step2: "State Engine & Matchmaking",
      step3: "Supabase Realtime Sync",
      step4: "Live Court Status & Ledger",
    },
  },
  {
    id: "careercompass-va",
    name: "CareerCompass VA",
    category: "AI Guidance",
    image: "/careercompass-va.png",
    github: "https://github.com/itsmerims/CareerCompass-VA",
    link: "",
    featured: true,
    problem:
      "Aspiring virtual assistants lack tailored step-by-step career milestones suited to their unique skill profiles.",
    pipelineArchitecture:
      "Built an AI-driven questionnaire pipeline utilizing Google Genkit LLM orchestration, dynamic schema parsing, and Cloud Firestore roadmap persistence.",
    impact:
      "Generates structured, step-by-step upskilling DAG roadmaps within 2.5 seconds with persistent milestone progress tracking.",
    tags: ["Next.js", "Genkit", "Google Gemini", "Firestore", "Firebase"],
    architectureFlow: {
      step1: "Diagnostic Assessment",
      step2: "Genkit LLM Inference",
      step3: "Structured Schema Parse",
      step4: "Firestore Milestone DAG",
    },
  },
  {
    id: "clarity-budgets",
    name: "ClarityBudgets",
    category: "Finance",
    image: "",
    github: "https://github.com/itsmerims/claritybudgets",
    link: "",
    featured: false,
    problem:
      "Personal expense trackers often lack intelligent categorization, leading to abandoned manual logging and fragmented monthly budgets.",
    pipelineArchitecture:
      "Implemented a type-safe financial ledger in Next.js & TypeScript with Google Gemini AI transaction categorization, Zod schema validation, and multi-currency parsing.",
    impact:
      "Automated 92% of recurring transaction tagging with instant visual telemetry on savings velocity and budget thresholds.",
    tags: ["Next.js", "TypeScript", "Gemini AI", "Zod", "Tailwind CSS"],
    architectureFlow: {
      step1: "Raw Expense Entry",
      step2: "Zod Schema Validation",
      step3: "Gemini Auto-Categorizer",
      step4: "Financial Telemetry Dash",
    },
  },
  {
    id: "the-breakfast-club",
    name: "TheBreakfastClub Badminton Manager",
    category: "Club Operations",
    image: "/thebreakfastclub.png",
    github: "https://github.com/itsmerims/TheBreakfastClub-Badminton-App",
    link: "",
    featured: false,
    problem:
      "Complex badminton tournament formats require instant session routing, live notification triggers, and admin overrides without refreshing the browser.",
    pipelineArchitecture:
      "Architected Firestore-backed distributed state management with serverless Cloud Functions, session-based routing, and live player notification channels.",
    impact:
      "Facilitated multi-court weekend tournaments with instant bracket updates, referee score submissions, and automated match notifications.",
    tags: ["Next.js", "Firebase", "Genkit", "Firestore", "Tailwind CSS"],
    architectureFlow: {
      step1: "Session Initialization",
      step2: "Tournament State Machine",
      step3: "Firestore Sync Channel",
      step4: "Broadcast Notifications",
    },
  },
  {
    id: "misc-payment-system",
    name: "Miscellaneous Payment System",
    category: "Desktop App",
    image: "/Miscellaneous-Payment-System.png",
    github: "https://github.com/itsmerims/miscellaneous-payment-system",
    link: "",
    featured: false,
    problem:
      "Small commercial offices required an offline-first, zero-setup desktop utility for logging client payments and generating audit invoices.",
    pipelineArchitecture:
      "Engineered a Java desktop transaction application using Eclipse WindowBuilder, flat-file ACID-like journaling, and defensive input sanitization.",
    impact:
      "Deployed standalone lightweight desktop software providing rapid CRUD operations, daily ledger generation, and instant receipt generation.",
    tags: ["Java", "Eclipse", "WindowBuilder", "Desktop GUI", "File Storage"],
    architectureFlow: {
      step1: "GUI Form Transaction",
      step2: "Validation & Sanitization",
      step3: "Flat-file Ledger Journal",
      step4: "Invoice Print Generation",
    },
  },
]

const CATEGORIES = [
  "All",
  "Club Operations",
  "AI Guidance",
  "Finance",
  "Desktop App",
] as const

export default function ProjectSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`)
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`)
  }

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/[0.05] text-xs font-mono text-indigo-400 mb-3">
          <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>{"MODULE 04 // CASE STUDY PORTFOLIO"}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
          Featured Engineering Case Studies
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-3 font-sans">
          Production-grade applications and systems showcasing deterministic data architecture, AI orchestration, and high-reliability full-stack workflows.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-white/[0.08] pb-4">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-medium transition-all duration-200 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/40"
                  : "bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]"
              }`}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* Projects Showcase Cards */}
      <div className="space-y-12">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              onMouseMove={handleMouseMove}
              className="spotlight-card p-6 sm:p-10 relative group"
            >
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Visual / Graphic + Architecture Pipeline Flow */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  {/* Image or Graphical Canvas */}
                  <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-white/10 bg-black/60 group-hover:border-indigo-500/40 transition-colors">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-indigo-950/40 to-black">
                        <Database className="w-12 h-12 text-indigo-400 mb-3 animate-pulse" />
                        <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                          ARCHITECTURAL SYSTEM
                        </span>
                        <span className="text-sm font-display font-semibold text-white mt-1">
                          {project.name}
                        </span>
                      </div>
                    )}

                    {/* Category Overlay Tag */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-300">
                      {project.category}
                    </div>

                    {project.featured && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-indigo-600/90 backdrop-blur-md border border-indigo-400/40 text-[11px] font-mono text-white font-semibold">
                        FEATURED DEPLOYMENT
                      </div>
                    )}
                  </div>

                  {/* Interactive SVG Data-Flow Diagram */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-zinc-400">
                      <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                        <Workflow className="w-3.5 h-3.5" />
                        DATA-FLOW PIPELINE TOPOLOGY
                      </span>
                      <span>4-STAGE FLOW</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                      {Object.values(project.architectureFlow).map((step, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-zinc-300 flex flex-col items-center justify-center gap-1"
                        >
                          <span className="text-indigo-400 font-bold text-[9px]">
                            0{idx + 1}
                          </span>
                          <span className="line-clamp-2">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Problem -> Architecture -> Impact Case Study */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    {/* Project Header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div>
                        <span className="font-mono text-xs text-indigo-400 tracking-wider uppercase block mb-1">
                          {`// CASE STUDY ${project.id.toUpperCase()}`}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {project.name}
                        </h3>
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>SOURCE</span>
                          </a>
                        )}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-mono font-semibold text-white transition-all shadow-md shadow-indigo-600/30"
                          >
                            <span>LIVE</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Breakdown: Problem / Architecture / Impact */}
                    <div className="space-y-4 my-6 text-xs sm:text-sm font-sans">
                      {/* Problem */}
                      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                        <span className="font-mono text-xs font-semibold text-red-400 uppercase tracking-wide block mb-1">
                          [PROBLEM DEFINITION]
                        </span>
                        <p className="text-zinc-300 leading-relaxed">
                          {project.problem}
                        </p>
                      </div>

                      {/* Pipeline Architecture */}
                      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                        <span className="font-mono text-xs font-semibold text-cyan-400 uppercase tracking-wide block mb-1">
                          [PIPELINE ARCHITECTURE]
                        </span>
                        <p className="text-zinc-300 leading-relaxed">
                          {project.pipelineArchitecture}
                        </p>
                      </div>

                      {/* Impact */}
                      <div className="p-3.5 rounded-xl bg-emerald-500/[0.03] border border-emerald-500/20">
                        <span className="font-mono text-xs font-semibold text-emerald-400 uppercase tracking-wide block mb-1">
                          [MEASURED BUSINESS IMPACT]
                        </span>
                        <p className="text-zinc-300 leading-relaxed">
                          {project.impact}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="pt-4 border-t border-white/[0.08] flex flex-wrap gap-2 items-center">
                    <span className="text-[11px] font-mono text-zinc-500 uppercase mr-1">
                      Engineered with:
                    </span>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* GitHub Repository Vault CTA */}
      <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-indigo-950/30 via-[#0E0E12] to-indigo-950/30 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h4 className="text-xl font-display font-bold text-white mb-1">
            Explore Open-Source Engineering Repositories
          </h4>
          <p className="text-sm text-zinc-400 font-sans">
            Review detailed ETL DAGs, database schemas, and AI application codebases on GitHub.
          </p>
        </div>
        <a
          href="https://github.com/itsmerims"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono font-semibold text-white uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
        >
          <Github className="w-4 h-4" />
          <span>github.com/itsmerims</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  )
}
