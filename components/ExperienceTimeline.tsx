"use client"

import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, Terminal } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const EXPERIENCES = [
  {
    company: "Macquarie Group",
    division: "Data DevOps Team",
    position: "Data Engineer — ETL Architect",
    period: "2024 — PRESENT",
    location: "Manila, Philippines",
    isActive: true,
    impactHighlight: "40% Runtime Reduction across Core Financial Workflows",
    achievements: [
      "Architected fault-tolerant ETL pipelines using Control-M and Talend for enterprise financial data ingestion and orchestration.",
      "Optimized complex SQL DAG workflows in Snowflake, achieving a 40% reduction in end-to-end pipeline execution runtime.",
      "Engineered automated telemetry and data validation checks in Python and SQL, guaranteeing deterministic SLA compliance.",
      "Collaborated with AI & quantitative analytics squads to integrate automated feature preprocessing for machine learning workloads.",
    ],
    techStack: [
      "Python",
      "SQL",
      "Snowflake",
      "Control-M",
      "Talend",
      "dbt",
      "Power BI",
      "Git",
    ],
  },
  {
    company: "Accenture",
    division: "Enterprise Data & AI Practice",
    position: "Data Engineer Associate — Talend Specialist",
    period: "2022 — 2024",
    location: "Manila, Philippines",
    isActive: false,
    impactHighlight: "Delivered 15+ Integration Deployments for Global Fortune 500s",
    achievements: [
      "Delivered 15+ large-scale Talend integration pipelines for multi-regional Fortune 500 client infrastructures.",
      "Engineered robust ETL architectures processing over 10M+ daily transactional records with zero unhandled dropouts.",
      "Mentored junior data developers on modular pipeline standards, schema validation, and defensive SQL design.",
      "Cut client cloud compute and integration costs by 30% through targeted pipeline refactoring and warehouse query optimization.",
    ],
    techStack: [
      "Talend",
      "SQL",
      "Python",
      "Snowflake",
      "Git",
      "Control-M",
    ],
  },
]

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const beamRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !beamRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        beamRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 0.8,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`)
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`)
  }

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/[0.05] text-xs font-mono text-indigo-400 mb-3">
          <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
          <span>{"MODULE 02 // CHRONOLOGICAL LOGS"}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
          Enterprise Track Record & Proven Execution
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-3 font-sans">
          Proven history designing, deploying, and maintaining high-availability data infrastructure across global banking and enterprise technology consulting.
        </p>
      </div>

      {/* Vertical Spine Container */}
      <div ref={containerRef} className="relative">
        {/* Central Ambient Vertical Guide Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/[0.07] -translate-x-1/2" />

        {/* GSAP Scroll-Scrubbed Glowing Beam */}
        <div
          ref={beamRef}
          className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-indigo-500 via-cyan-400 to-indigo-500 -translate-x-1/2 shadow-[0_0_12px_#6366F1]"
          style={{ height: "0%" }}
        />

        <div className="space-y-16">
          {EXPERIENCES.map((exp, index) => {
            const isEven = index % 2 === 0
            return (
              <div
                key={exp.company}
                className="relative flex flex-col md:flex-row items-start md:items-center"
              >
                {/* Center Node Indicator */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#0E0E12] border border-white/20 flex items-center justify-center shadow-lg shadow-black">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        exp.isActive
                          ? "bg-emerald-400 animate-ping"
                          : "bg-indigo-400"
                      }`}
                    />
                  </div>
                </div>

                {/* Card placement: left or right */}
                <div
                  className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                    isEven ? "md:pr-12 md:text-left" : "md:pl-12 md:ml-auto"
                  }`}
                >
                  <div
                    onMouseMove={handleMouseMove}
                    className="spotlight-card p-6 sm:p-8 relative group"
                  >
                    <div className="relative z-10">
                      {/* Top Metadata Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-white tracking-wide uppercase px-2.5 py-0.5 rounded bg-white/[0.05] border border-white/10">
                            {exp.company}
                          </span>
                          <span className="text-xs font-mono text-zinc-500">
                            {exp.division}
                          </span>
                        </div>
                        {exp.isActive && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            CURRENT
                          </span>
                        )}
                      </div>

                      {/* Role Title */}
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                        {exp.position}
                      </h3>

                      {/* Period & Location */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 mb-6">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Impact Highlight Banner */}
                      <div className="mb-6 p-3 rounded-lg bg-indigo-500/[0.07] border border-indigo-500/20 text-xs font-mono text-indigo-300 flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                        <span>{exp.impactHighlight}</span>
                      </div>

                      {/* Detailed Bullet Points */}
                      <div className="space-y-3 mb-6">
                        {exp.achievements.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                            <ChevronRight className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Monospace Tech Badges */}
                      <div className="pt-4 border-t border-white/[0.08]">
                        <p className="text-[11px] font-mono text-zinc-500 mb-2 uppercase">
                          Stack Utilized:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-zinc-300 hover:text-white hover:border-indigo-500/40 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
