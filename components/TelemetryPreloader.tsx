"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function TelemetryPreloader({
  onComplete,
}: {
  onComplete?: () => void
}) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [statusMessage, setStatusMessage] = useState("INITIALIZING TELEMETRY")

  useEffect(() => {
    // Check if session has already booted
    const hasBooted = sessionStorage.getItem("telemetry_booted_v2")
    if (hasBooted) {
      setIsVisible(false)
      onComplete?.()
      return
    }

    const messages = [
      "INITIALIZING TELEMETRY",
      "SYNCHRONIZING ETL TOPOLOGY",
      "MOUNTING DISTRIBUTED PIPELINES",
      "TELEMETRY STREAM: ONLINE",
    ]

    let current = 0
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 14) + 8
      if (current >= 100) {
        current = 100
        setProgress(100)
        setStatusMessage(messages[3])
        clearInterval(interval)

        setTimeout(() => {
          sessionStorage.setItem("telemetry_booted_v2", "true")
          setIsVisible(false)
          onComplete?.()
        }, 300)
      } else {
        setProgress(current)
        const msgIndex = Math.min(
          Math.floor((current / 100) * messages.length),
          messages.length - 1
        )
        setStatusMessage(messages[msgIndex])
      }
    }, 60)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          exit={{
            clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#060608] text-white select-none pointer-events-auto"
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-grid-architectural opacity-20 pointer-events-none" />

          {/* Ambient center glow */}
          <div className="absolute w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center">
            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-zinc-400 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>SYSTEM BOOT SEQUENCE</span>
            </div>

            {/* Large Progress Counter */}
            <div className="font-mono text-6xl md:text-7xl font-bold tracking-tighter text-white mb-4">
              {progress.toString().padStart(2, "0")}
              <span className="text-indigo-400 text-3xl font-light ml-1">%</span>
            </div>

            {/* Sleek Progress Bar */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Diagnostic readout message */}
            <p className="font-mono text-xs tracking-wider text-zinc-500 uppercase h-4">
              {statusMessage}
            </p>

            <div className="mt-8 flex items-center justify-between w-full text-[10px] font-mono text-zinc-600 border-t border-white/5 pt-3">
              <span>HOST: MACQUARIE_CORE</span>
              <span>NODE: DE_ARCH_01</span>
              <span>STATE: SYNCHRONIZING</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
