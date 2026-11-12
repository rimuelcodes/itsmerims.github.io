"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import {
  Mail,
  Linkedin,
  Github,
  Send,
  MessageSquare,
  Copy,
  CheckCircle2,
  Terminal,
} from "lucide-react"

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate sending with high-end feedback
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success("Message dispatched successfully!", {
        description:
          "Thank you for reaching out. John will respond within 24-48 hours.",
      })
      setFormState({ name: "", email: "", subject: "", message: "" })
    }, 700)
  }

  const copyEmail = () => {
    navigator.clipboard.writeText("rimuel.dev@gmail.com")
    toast.success("Email copied to clipboard!", {
      description: "rimuel.dev@gmail.com",
    })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`)
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`)
  }

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/[0.05] text-xs font-mono text-indigo-400 mb-3">
          <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
          <span>{"MODULE 05 // DIRECT TELEMETRY DISPATCH"}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
          Initialize Direct Communication
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-3 font-sans">
          Have an enterprise data pipeline challenge, distributed ETL project, or strategic engineering opportunity? Let&apos;s build deterministic solutions together.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Dispatch Form */}
        <div
          onMouseMove={handleMouseMove}
          className="lg:col-span-7 spotlight-card p-6 sm:p-10 relative group"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
              <span className="font-mono text-xs text-indigo-400 font-semibold tracking-wider uppercase">
                {"// TRANSMIT PACKET TO JOHN RIMUEL"}
              </span>
              <span className="text-xs font-mono text-zinc-500">{"ENCRYPTED // TLS"}</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    IDENTIFIER / NAME *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] focus:border-indigo-500 text-white placeholder-zinc-600 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    RETURN EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="jane@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] focus:border-indigo-500 text-white placeholder-zinc-600 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  TOPIC / PIPELINE OBJECTIVE *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Distributed ETL Architecture / Full-time Opportunity"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] focus:border-indigo-500 text-white placeholder-zinc-600 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  PAYLOAD MESSAGE *
                </label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Describe your data engineering context, pipeline scale, or inquiry..."
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] focus:border-indigo-500 text-white placeholder-zinc-600 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-mono text-xs uppercase tracking-wider font-semibold text-white transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    <span>TRANSMITTING PACKET...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>DISPATCH MESSAGE</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Direct Channels & Telemetry Quick Connect */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Quick Copy Email Card */}
          <div
            onMouseMove={handleMouseMove}
            className="spotlight-card p-6 sm:p-8 relative group"
          >
            <div className="relative z-10">
              <span className="font-mono text-xs text-cyan-400 font-semibold tracking-wider uppercase block mb-3">
                {"// ONE-CLICK DISPATCH"}
              </span>
              <h4 className="text-xl font-display font-bold text-white mb-2">
                rimuel.dev@gmail.com
              </h4>
              <p className="text-xs text-zinc-400 font-sans mb-6">
                Direct mailbox for architectural consulting, enterprise recruitment, and collaborations.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-mono text-white transition-all active:scale-95"
                >
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span>COPY ADDRESS</span>
                </button>
                <a
                  href="mailto:rimuel.dev@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 border border-indigo-400/30 text-xs font-mono text-white transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>OPEN MAIL CLIENT</span>
                </a>
              </div>
            </div>
          </div>

          {/* Social Network Nodes */}
          <div
            onMouseMove={handleMouseMove}
            className="spotlight-card p-6 sm:p-8 relative group"
          >
            <div className="relative z-10 space-y-4">
              <span className="font-mono text-xs text-indigo-400 font-semibold tracking-wider uppercase block">
                {"// NETWORK ENDPOINTS"}
              </span>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/itsmerims/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-indigo-500/40 transition-all group/item"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block">
                      LinkedIn
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      linkedin.com/in/itsmerims
                    </span>
                  </div>
                </div>
                <span className="text-zinc-500 group-hover/item:text-indigo-400 font-mono text-xs">
                  CONNECT →
                </span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/itsmerims"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-cyan-500/40 transition-all group/item"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block">
                      GitHub
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      github.com/itsmerims
                    </span>
                  </div>
                </div>
                <span className="text-zinc-500 group-hover/item:text-cyan-400 font-mono text-xs">
                  INSPECT →
                </span>
              </a>
            </div>
          </div>

          {/* Response SLA Note */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-zinc-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SLA RESPONSE TIME: &lt; 24-48 HOURS</span>
            </div>
            <span className="text-zinc-600">GUARANTEED</span>
          </div>
        </div>
      </div>
    </section>
  )
}
