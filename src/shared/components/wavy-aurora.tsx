"use client"

export function WavyAurora({
  className = "",
  intensity = 1,
}: {
  className?: string
  intensity?: number
}) {
  // Uses theme tokens for color stops; adapts to light/dark automatically.
  // Decorative only.
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <svg
        className="absolute left-1/2 top-1/2 h-[120vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 1200 900"
        fill="none"
      >
        <defs>
          <linearGradient id="auroraStops" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-chart-2)" />
            <stop offset="50%" stopColor="var(--color-chart-4)" />
            <stop offset="100%" stopColor="var(--color-chart-5)" />
          </linearGradient>
          <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={40} />
          </filter>
        </defs>

        {/* Main wave stroke */}
        <path
          d="M-100 500 C 150 350, 450 650, 700 500 S 1150 350, 1400 520"
          stroke="url(#auroraStops)"
          strokeWidth={120 * intensity}
          strokeLinecap="round"
          filter="url(#softBlur)"
          opacity="0.65"
        />

        {/* Secondary subtle wave for depth */}
        <path
          d="M-120 620 C 120 470, 420 770, 680 620 S 1130 470, 1380 640"
          stroke="url(#auroraStops)"
          strokeWidth={80 * intensity}
          strokeLinecap="round"
          filter="url(#softBlur)"
          opacity="0.35"
        />
      </svg>

      {/* Soft radial glows to mimic the pastel wash */}
      <div
        className="absolute -left-24 top-10 size-[60vmax] rounded-full"
        style={{
          background: "radial-gradient(closest-side, var(--color-chart-2) 0%, transparent 70%)",
          opacity: 0.25,
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute -right-32 bottom-10 size-[55vmax] rounded-full"
        style={{
          background: "radial-gradient(closest-side, var(--color-chart-4) 0%, transparent 70%)",
          opacity: 0.22,
          filter: "blur(40px)",
        }}
      />
    </div>
  )
}
