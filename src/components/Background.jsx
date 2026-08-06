/**
 * Fixed atmospheric layer behind everything: mesh gradient blooms, a faint
 * grid with a radial fade, and a noise pass to stop the gradients banding.
 * Purely decorative — never interactive.
 */
export default function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink-900" />

      {/* Mesh blooms. These use radial-gradients rather than a solid circle
          behind `blur-[130px]`: a 130px gaussian over a 576px element is one
          of the most expensive things you can ask a weak GPU to rasterise,
          and the gradient gives the same soft falloff for free. */}
      <div
        className="animate-aurora absolute -top-40 -left-32 h-[36rem] w-[36rem]"
        style={{
          background:
            'radial-gradient(circle closest-side, rgba(79,70,229,0.28), rgba(79,70,229,0.10) 55%, transparent 78%)',
        }}
      />
      <div
        className="animate-aurora absolute top-1/4 -right-40 h-[32rem] w-[32rem]"
        style={{
          animationDelay: '-7s',
          background:
            'radial-gradient(circle closest-side, rgba(6,182,212,0.22), rgba(6,182,212,0.08) 55%, transparent 78%)',
        }}
      />
      <div
        className="animate-aurora absolute bottom-0 left-1/3 h-[30rem] w-[30rem]"
        style={{
          animationDelay: '-14s',
          background:
            'radial-gradient(circle closest-side, rgba(192,38,211,0.18), rgba(192,38,211,0.07) 55%, transparent 78%)',
        }}
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

      {/* Vignette + grain. The grain drops mix-blend-overlay: a blend mode on
          a full-viewport fixed layer forces its own compositing pass, and at
          3.5% opacity the difference is invisible. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,7,12,0.85)_100%)]" />
      <div className="noise absolute inset-0 opacity-[0.03]" />
    </div>
  )
}
