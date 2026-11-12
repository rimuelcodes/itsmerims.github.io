"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Database,
  Cpu,
  ShieldCheck,
  Terminal,
  Activity,
  Zap,
  MapPin,
  Building,
  CheckCircle2,
  Code2,
} from "lucide-react"

export default function AboutSection() {
  const [terminalTab, setTerminalTab] = useState<"dag" | "metrics" | "pipeline">("dag")

  // Interactive mouse tracking for spotlight cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`)
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`)
  }

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/[0.05] text-xs font-mono text-indigo-400 mb-3">
          <Activity className="w-3.5 h-3.5 text-indigo-400" />
          <span>{"MODULE 01 // ARCHITECTURAL PHILOSOPHY"}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
          Engineering Deterministic Data Intelligence
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-3 font-sans">
          Eliminating data entropy through robust distributed pipelines, automated orchestration, and resilient architecture designed for high-concurrency enterprise scale.
        </p>
      </div>

      {/* Asymmetrical 12-Column Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Card 1: Core Architectural Philosophy (Large 8 Cols) */}
        <div
          onMouseMove={handleMouseMove}
          className="lg:col-span-8 spotlight-card p-8 sm:p-10 flex flex-col justify-between relative group"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs text-indigo-400 font-semibold tracking-wider uppercase">
                {"// 01 ARCHITECTURAL DISCIPLINE"}
              </span>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>STATE: DETERMINISTIC</span>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-5 leading-snug">
              Transforming fragmented data chaos into synchronized, AI-ready enterprise capital.
            </h3>

            <div className="space-y-4 text-zinc-400 text-sm sm:text-base font-sans leading-relaxed">
              <p>
                Currently serving on Macquarie&apos;s Data DevOps team, I engineer mission-critical ETL systems and data infrastructure that allow quantitative, risk, and analytics teams to operate on authoritative data without operational lag.
              </p>
              <p>
                With end-to-end fluency spanning modern cloud warehouses (<span className="text-zinc-200">Snowflake</span>), transformations (<span className="text-zinc-200">dbt</span>), enterprise orchestration (<span className="text-zinc-200">Control-M, Airflow</span>), and integration engines (<span className="text-zinc-200">Talend, Python, SQL</span>), I design pipelines with zero tolerance for silent failures.
              </p>
              <p className="text-zinc-300 font-medium">
                Previously at Accenture, I steered 15+ complex integration initiatives for Fortune 500 enterprises, scaling ingestion pipelines handling over 10M+ daily events while mentoring developers on modern pipeline practices.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>Manila, Philippines (Open to Remote)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-cyan-400" />
                <span>Macquarie Data DevOps</span>
              </div>
            </div>
            <span className="text-xs font-mono text-zinc-500">SYS_ID: JRB_DE_2026</span>
          </div>
        </div>

        {/* Card 2: High-Density Telemetry Metrics (4 Cols) */}
        <div
          onMouseMove={handleMouseMove}
          className="lg:col-span-4 spotlight-card p-8 flex flex-col justify-between relative group"
        >
          <div className="relative z-10">
            <span className="font-mono text-xs text-cyan-400 font-semibold tracking-wider uppercase">
              {"// 02 TELEMETRY BENCHMARKS"}
            </span>

            <div className="mt-6 space-y-6">
              {/* Metric 1 */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 transition-colors">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-mono text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    -40%
                  </span>
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
                <p className="text-xs font-mono font-medium text-zinc-300">
                  PIPELINE RUNTIME REDUCTION
                </p>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Optimized DAG graph dependencies and Snowflake clustering at Macquarie.
                </p>
              </div>

              {/* Metric 2 */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-colors">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-mono text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    10M+
                  </span>
                  <Activity className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-xs font-mono font-medium text-zinc-300">
                  DAILY TRANSACTIONS PROCESSED
                </p>
                <p className="text-[11px] text-zinc-500 mt-1">
                  High-throughput transactional batch and micro-batch pipelines at Accenture.
                </p>
              </div>

              {/* Metric 3 */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 transition-colors">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-mono text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    99.98%
                  </span>
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                </div>
                <p className="text-xs font-mono font-medium text-zinc-300">
                  SLA EXECUTION RELIABILITY
                </p>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Automated SQL/Python data validation checks and incident triage.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-4 mt-4 border-t border-white/[0.06] text-[11px] font-mono text-zinc-500 flex justify-between">
            <span>SLA TARGET: MET</span>
            <span>AUDIT: VERIFIED</span>
          </div>
        </div>

        {/* Card 3: Interactive Mini-Terminal (Full 12 Cols or 7 Cols) */}
        <div
          onMouseMove={handleMouseMove}
          className="lg:col-span-7 spotlight-card p-6 sm:p-8 relative group"
        >
          <div className="relative z-10">
            {/* Terminal Chrome Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-xs text-zinc-400 font-medium">
                  telemetry_orchestrator.sh — bash
                </span>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-xs">
                <button
                  onClick={() => setTerminalTab("dag")}
                  className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                    terminalTab === "dag"
                      ? "bg-indigo-600/40 text-indigo-300 border border-indigo-500/40"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  DAG.py
                </button>
                <button
                  onClick={() => setTerminalTab("metrics")}
                  className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                    terminalTab === "metrics"
                      ? "bg-indigo-600/40 text-indigo-300 border border-indigo-500/40"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  Audit.log
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="font-mono text-xs sm:text-[13px] leading-relaxed text-zinc-300 bg-black/50 p-4 rounded-xl border border-white/[0.05] overflow-x-auto">
              {terminalTab === "dag" ? (
                <div className="space-y-1">
                  <p className="text-zinc-500"># Macquarie Data DevOps — DAG Execution Manifest</p>
                  <p>
                    <span className="text-indigo-400">@dag</span>(schedule_interval=&apos;0 2 * * *&apos;, catchup=False)
                  </p>
                  <p className="text-zinc-400">def macquarie_enterprise_lakehouse_pipeline():</p>
                  <p className="pl-4">
                    raw_feed = extract_cdc_kafka(source=&apos;oracle_financials&apos;, batch=50000)
                  </p>
                  <p className="pl-4">
                    clean_stage = talend_transform_stage(raw_feed, schema_validation=&apos;strict&apos;)
                  </p>
                  <p className="pl-4">
                    dbt_models = run_dbt_models(target=&apos;snowflake_lakehouse_prod&apos;)
                  </p>
                  <p className="pl-4">
                    ml_feed = trigger_ai_feature_store(dbt_models, timeout=300)
                  </p>
                  <p className="pl-4 text-emerald-400">
                    audit_telemetry(status=&apos;SUCCESS&apos;, latency_ms=412, data_drift=0.00)
                  </p>
                  <p className="text-zinc-500 pt-2"># Pipeline executed: 0 errors, 100% integrity</p>
                </div>
              ) : (
                <div className="space-y-1 text-zinc-400">
                  <p className="text-emerald-400">[2026-11-12 02:00:14 UTC] [INFO] Control-M job initiated: J_MQ_DAILY_ETL_01</p>
                  <p>[2026-11-12 02:02:40 UTC] [INFO] Snowflake virtual warehouse: XS &rarr; AUTO-SCALED</p>
                  <p>[2026-11-12 02:04:12 UTC] [INFO] dbt build: 48 models passed tests (100% pass rate)</p>
                  <p>[2026-11-12 02:05:01 UTC] [INFO] Anomaly detection: 0 drift detected across 12M rows</p>
                  <p className="text-indigo-300">[2026-11-12 02:05:33 UTC] [SUCCESS] Target tables published to Power BI service</p>
                  <p className="text-zinc-500">[2026-11-12 02:05:34 UTC] [TELEMETRY] Memory footprint optimal: 2.1 GB consumed</p>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>ORCHESTRATOR: CONTROL-M / AIRFLOW</span>
              <span className="text-emerald-400">HEALTH: 100% NOMINAL</span>
            </div>
          </div>
        </div>

        {/* Card 4: Engineering Pillars (5 Cols) */}
        <div
          onMouseMove={handleMouseMove}
          className="lg:col-span-5 spotlight-card p-6 sm:p-8 flex flex-col justify-between relative group"
        >
          <div className="relative z-10">
            <span className="font-mono text-xs text-indigo-400 font-semibold tracking-wider uppercase">
              {"// 03 CORE PILLARS"}
            </span>

            <div className="mt-6 space-y-4">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mt-0.5">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Idempotent Data Pipelines</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Safe re-runnable pipelines with deterministic staging, audit trails, and automated rollbacks.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 mt-0.5">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">AI-Augmented Automation</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Integrating LLM endpoints, automated schema migrations, and ML data preprocessing workflows.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Modular & Maintainable Code</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Writing clean, documented, reproducible code with strict typing and peer-reviewed standards.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>METHODOLOGY: DATA DEVOPS</span>
            <span>STANDARD: ENTERPRISE</span>
          </div>
        </div>
      </div>
    </section>
  )
}
