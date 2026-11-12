/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#060608',
          canvas: '#060608',
          elevated: '#0E0E12',
          surface: '#14141B',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-active': 'rgba(99, 102, 241, 0.45)',
        },
        indigo: {
          electric: '#6366F1',
        },
        cyan: {
          pulse: '#22D3EE',
        },
        emerald: {
          telemetry: '#10B981',
        },
        text: {
          primary: '#FAFAFA',
          secondary: '#A1A1AA',
          mono: '#52525B',
        },
        // Backwards compatibility mappings
        'data-bg': '#060608',
        'data-card': '#0E0E12',
        'data-border': 'rgba(255, 255, 255, 0.08)',
        'data-text-secondary': '#A1A1AA',
        'cyber-blue': '#22D3EE',
        'electric-purple': '#6366F1',
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        sans: ['var(--font-jakarta)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid-sm': '32px 32px',
        'grid-md': '48px 48px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
