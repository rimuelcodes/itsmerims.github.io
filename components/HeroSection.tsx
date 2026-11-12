"use client"

import React, { useRef } from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { ArrowDown, Database, Cpu, Sparkles, Terminal } from "lucide-react"

// Dynamically import WebGL Canvas to prevent SSR issues
const DataTopologyCanvas = dynamic(() => import("./3d/DataTopologyCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] lg:h-[580px] rounded-2xl border border-white/[0.08] bg-[#0A0A0F]/60 backdrop-blur-xl flex flex-col items-center justify-center font-mono text-zinc-500 animate-pulse">
      <div className="w-10 h-10 border-2 border-indigo-500/40 border-t-indigo-500 rounded-full animate-spin mb-4" />
      <span className="text-xs tracking-widest uppercase">INITIALIZING TOPOLOGY SHADERS...</span>
    </div>
  ),
})

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
        {/* Left Column: Kinetic Typography & Editorial */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Live Telemetry Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] text-xs font-mono text-emerald-400 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold tracking-wider">
              SYSTEM ONLINE — DATA ENGINEER @ MACQUARIE
            </span>
          </motion.div>

          {/* Masked Headline: Name */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight text-white leading-none"
            >
              John Rimuel
            </motion.h1>
          </div>

          {/* Masked Headline: Role & Specialization */}
          <div className="overflow-hidden mb-6">
            <motion.h2
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-4xl lg:text-5xl font-display font-medium tracking-tight bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-300 bg-clip-text text-transparent leading-tight"
            >
              Data Engineer • ETL Architect
            </motion.h2>
          </div>

          {/* High-Impact Summary Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-base sm:text-lg text-zinc-400 font-sans leading-relaxed max-w-2xl mb-8"
          >
            Architecting fault-tolerant ETL pipelines, enterprise data infrastructure, and AI-driven automated workflows at{" "}
            <span className="text-white font-medium border-b border-indigo-500/40">Macquarie Group</span>. 
            Bridging raw distributed event streams with high-performance analytical lakehouses and modern LLM pipelines.
          </motion.p>

          {/* Telemetry Micro Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 mb-10 text-xs font-mono text-zinc-400"
          >
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.06]">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>Snowflake • dbt • Control-M</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.06]">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>Python • SQL • Talend</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.06]">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>AI & ML Automation</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollTo("architecture")}
              className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>EXPLORE ARCHITECTURE</span>
              <Terminal className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 transition-all duration-300 backdrop-blur-md hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>GET IN TOUCH</span>
              <span className="text-zinc-500">→</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: 3D Spatial Canvas */}
        <div className="lg:col-span-5 w-full relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="w-full relative"
          >
            {/* Ambient Background Aura */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-cyan-500/10 to-indigo-500/20 rounded-3xl blur-2xl opacity-60 pointer-events-none" />
            <DataTopologyCanvas />
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="flex justify-center mt-8 cursor-pointer"
        onClick={() => scrollTo("about")}
      >
        <div className="flex flex-col items-center gap-2 text-zinc-500 hover:text-indigo-400 transition-colors">
          <span className="font-mono text-[10px] tracking-widest uppercase">SCROLL FOR TELEMETRY</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}
