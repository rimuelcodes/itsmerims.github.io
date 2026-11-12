"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, FileText, ArrowUpRight } from "lucide-react"

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Architecture", href: "#architecture" },
  { label: "Projects", href: "#projects" },
]

export default function NavBar() {
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Track scroll position to update active section & shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)

      const sections = NAV_ITEMS.map((item) => item.href.substring(1))
      const scrollPos = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false)
    const id = href.replace("#", "")
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto relative flex items-center justify-between gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full border transition-all duration-300 ${
          isScrolled
            ? "bg-[#0E0E12]/80 border-white/10 backdrop-blur-xl shadow-2xl shadow-black/80"
            : "bg-[#0E0E12]/60 border-white/[0.08] backdrop-blur-md"
        }`}
      >
        {/* Brand Monogram */}
        <button
          onClick={() => scrollTo("#home")}
          className="flex items-center gap-2 px-3 py-1 text-sm font-mono font-bold tracking-tight text-white hover:text-indigo-400 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span>RIMS.DEV</span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1)
            return (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className={`relative px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors duration-200 ${
                  isActive ? "text-white font-semibold" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            )
          })}
        </div>

        {/* Right CTA: Resume Button */}
        <div className="flex items-center gap-2">
          <a
            href="/Profile.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-white bg-indigo-600/90 hover:bg-indigo-500 border border-indigo-400/30 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95"
          >
            <span>RESUME</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-zinc-400 hover:text-white transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-20 left-4 right-4 p-4 rounded-2xl bg-[#0E0E12]/95 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-2 md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="w-full text-left px-4 py-2.5 rounded-xl font-mono text-sm text-zinc-300 hover:text-white hover:bg-white/[0.05] transition-all flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-zinc-600 text-xs">→</span>
              </button>
            ))}
            <div className="pt-2 mt-2 border-t border-white/10">
              <a
                href="/Profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 font-mono text-xs font-semibold text-white"
              >
                <FileText className="w-4 h-4" />
                <span>DOWNLOAD RESUME (PDF)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
