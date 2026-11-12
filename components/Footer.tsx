"use client"

import React, { useState, useEffect } from "react"
import { toast } from "sonner"
import { Copy, Mail, Github, Linkedin, ArrowUp, Clock } from "lucide-react"

export default function Footer() {
  const [manilaTime, setManilaTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now)
      setManilaTime(timeString)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText("rimuel.dev@gmail.com")
    toast.success("Email copied to clipboard!", {
      description: "rimuel.dev@gmail.com",
    })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#060608] pt-20 pb-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-indigo-600/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Oversized Kinetic Display Headline */}
        <div className="mb-16">
          <span className="font-mono text-xs text-indigo-400 font-semibold tracking-widest uppercase block mb-3">
            {"// TELEMETRY CONCLUSION"}
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight max-w-4xl leading-tight">
            Let&apos;s Architect Your Next Data Platform.
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-mono text-xs font-semibold text-white uppercase tracking-wider transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 active:scale-95"
            >
              <Copy className="w-4 h-4" />
              <span>{"COPY EMAIL // rimuel.dev@gmail.com"}</span>
            </button>

            <a
              href="mailto:rimuel.dev@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 font-mono text-xs font-semibold text-zinc-300 hover:text-white uppercase tracking-wider transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>START DIRECT THREAD</span>
            </a>
          </div>
        </div>

        {/* Middle Navigation & Local Time Telemetry */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10 border-y border-white/[0.08] items-center">
          {/* Brand & Meta */}
          <div className="md:col-span-5">
            <h3 className="font-display font-bold text-xl text-white">
              John Rimuel
            </h3>
            <p className="text-xs text-zinc-400 font-sans mt-1">
              Data Engineer • ETL Architect @ Macquarie Group
            </p>
            <p className="text-[11px] font-mono text-zinc-500 mt-2">
              {"BUILD // ENTERPRISE DATA PLATFORMS & AI AUTOMATION"}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4 flex flex-wrap gap-4 text-xs font-mono">
            {["Home", "About", "Experience", "Architecture", "Projects"].map(
              (sec) => (
                <a
                  key={sec}
                  href={`#${sec.toLowerCase()}`}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  {sec}
                </a>
              )
            )}
          </div>

          {/* Live Manila Time */}
          <div className="md:col-span-3 flex md:justify-end items-center gap-2 font-mono text-xs text-zinc-400">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>MANILA:</span>
            <span className="text-white font-semibold">
              {manilaTime || "11:22 AM PHT"}
            </span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-4">
            <span>&copy; {new Date().getFullYear()} JOHN RIMUEL. ALL RIGHTS RESERVED.</span>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <span className="hidden sm:inline">DESIGNED WITH ARCHITECTURAL CRAFT</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/itsmerims"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/itsmerims/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
