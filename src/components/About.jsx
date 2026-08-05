import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { timelineData, typeStyles } from '../data/timeline'
import SectionHeading from './ui/SectionHeading'

export default function About() {
  const railRef = useRef(null)

  // The rail "draws itself" as the section scrolls past.
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 75%', 'end 60%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <section id="about" className="relative px-4 py-28 sm:px-6 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
          {/* Intro column — sticks while the timeline scrolls.
              `min-w-0` stops the grid track from blowing past the container. */}
          <div className="min-w-0 lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="The journey"
              title="Building, studying, and teaching in parallel"
              description="I'm a software developer and IT student in Damascus. Client work taught me to ship; tutoring 100+ students taught me to actually understand what I'm shipping."
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="glass mt-10 rounded-2xl p-5"
            >
              <p className="text-sm leading-relaxed text-slate-400">
                Most of what I build is bilingual by default — Arabic and English, right-to-left and
                left-to-right — which has made me unusually careful about layout, typography, and
                the details that only break in one direction.
              </p>
            </motion.div>
          </div>

          {/* Timeline */}
          <div ref={railRef} className="relative min-w-0">
            {/* Track + animated progress line */}
            <div className="absolute top-2 bottom-2 left-[15px] w-px bg-white/[0.07]" />
            <motion.div
              style={{ scaleY }}
              className="absolute top-2 bottom-2 left-[15px] w-px origin-top bg-gradient-to-b from-brand-400 via-brand-400/60 to-glow-400/40"
            />

            <ol className="space-y-10">
              {timelineData.map((entry, i) => {
                const style = typeStyles[entry.type] ?? typeStyles.work
                return (
                  <motion.li
                    key={entry.id}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.65, delay: 0.05 * (i % 3), ease: [0.22, 1, 0.36, 1] }}
                    className="group relative pl-12"
                  >
                    {/* Node */}
                    <span className="absolute top-1 left-0 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-ink-850 transition-colors duration-500 group-hover:border-white/25">
                      <entry.icon className="h-3.5 w-3.5 text-slate-400 transition-colors duration-500 group-hover:text-white" />
                      <span
                        className={`absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full ${style.dot} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                      />
                    </span>

                    <div className="rounded-2xl border border-transparent p-4 transition-all duration-500 group-hover:border-white/10 group-hover:bg-white/[0.02]">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`rounded-full border px-2.5 py-1 font-mono text-[11px] ${style.chip}`}
                        >
                          {entry.period}
                        </span>
                      </div>

                      <h3 className="mt-3 font-display text-lg font-semibold text-white sm:text-xl">
                        {entry.title}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-slate-400">{entry.org}</p>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
                        {entry.description}
                      </p>

                      {entry.highlights?.length > 0 && (
                        <ul className="mt-4 flex flex-wrap gap-1.5">
                          {entry.highlights.map((h) => (
                            <li
                              key={h}
                              className="rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-1 text-[11px] text-slate-400"
                            >
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
