import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const centered = align === 'center'

  return (
    <div className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <Reveal>
          <div
            className={`mb-5 flex items-center gap-3 ${centered ? 'justify-center' : ''}`}
          >
            <span className="h-px w-8 bg-gradient-to-r from-brand-400/70 to-transparent" />
            <span className="font-mono text-xs tracking-[0.25em] text-brand-300 uppercase">
              {eyebrow}
            </span>
          </div>
        </Reveal>
      )}

      <Reveal delay={0.06}>
        <h2 className="font-display text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.12}>
          <p className="mt-5 text-base leading-relaxed text-pretty text-slate-400 sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
