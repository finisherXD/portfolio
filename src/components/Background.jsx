/**
 * Fixed atmospheric layer behind everything: mesh gradient blooms, a faint
 * grid with a radial fade, and a noise pass to stop the gradients banding.
 * Purely decorative — never interactive.
 */
export default function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink-900" />

      {/* Mesh blooms */}
      <div className="animate-aurora absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full bg-brand-600/25 blur-[130px]" />
      <div
        className="animate-aurora absolute top-1/4 -right-40 h-[32rem] w-[32rem] rounded-full bg-glow-500/20 blur-[130px]"
        style={{ animationDelay: '-7s' }}
      />
      <div
        className="animate-aurora absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-fuchsia-600/15 blur-[140px]"
        style={{ animationDelay: '-14s' }}
      />

      {/* Grid, faded out toward the edges */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 75%)',
        }}
      />

      {/* Vignette + grain */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,7,12,0.85)_100%)]" />
      <div className="noise absolute inset-0 opacity-[0.035] mix-blend-overlay" />
    </div>
  )
}
