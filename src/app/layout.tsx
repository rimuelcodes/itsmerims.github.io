import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"
import NavBar from "components/NavBar"
import Footer from "components/Footer"
import TelemetryPreloader from "components/TelemetryPreloader"
import SmoothScrollProvider from "components/SmoothScrollProvider"
import NoiseOverlay from "components/NoiseOverlay"
import { AnalyticsWrapper } from "components/Analytics"
import { Toaster } from "sonner"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060608",
}

export const metadata: Metadata = {
  title: "John Rimuel — Data Engineer • ETL Architect",
  description:
    "Specializing in scalable ETL pipelines, enterprise data infrastructure, and AI-driven workflows at Macquarie Group.",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} dark scroll-smooth`}
    >
      <body className="bg-[#060608] text-[#FAFAFA] font-sans antialiased overflow-x-hidden selection:bg-indigo-500/30 selection:text-white">
        <SmoothScrollProvider>
          <TelemetryPreloader />
          <NoiseOverlay />
          <NavBar />
          <main className="relative z-10 flex flex-col min-h-screen">
            {children}
          </main>
          <Footer />
          <AnalyticsWrapper />
          <Toaster
            position="bottom-right"
            theme="dark"
            toastOptions={{
              style: {
                background: "#0E0E12",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#FAFAFA",
                fontFamily: "var(--font-jetbrains)",
              },
            }}
          />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
