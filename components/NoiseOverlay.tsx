"use client"

import React from "react"

export default function NoiseOverlay() {
  return (
    <>
      {/* Fixed Architectural Grid Lines */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-grid-architectural opacity-40"
        aria-hidden="true" 
      />

      {/* Fixed Subtle SVG Fractal Noise Grain */}
      <div 
        className="fixed inset-0 pointer-events-none z-10 noise-overlay opacity-30" 
        aria-hidden="true" 
      />

      {/* Atmospheric Vignette */}
      <div 
        className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-[#060608]/80"
        aria-hidden="true"
      />
    </>
  )
}
