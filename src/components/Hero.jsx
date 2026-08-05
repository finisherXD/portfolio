import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Download, MapPin, Sparkles } from 'lucide-react'
import { heroStack, heroStats, site, socials } from '../data/site'
import MagneticButton from './ui/MagneticButton'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()

  // Cursor-tracked spotlight over the hero.
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const glowX = useSpring(mouseX, { stiffness: 90, damping: 22 })
  const glowY = useSpring(mouseY, { stiffness: 90, damping: 22 })
  const left = useTransform(glowX, (v) => `${v * 100}%`)
  const top = useTransform(glowY, (v) => `${v * 100}%`)

  function handleMouseMove(e) {
    if (reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-svh items-center overflow-hidden px-4 pt-32 pb-20 sm:px-6"
    >
      {/* Spotlight that follows the cursor */}
      <motion.div
        aria-hidden="true"
        style={{ left, top }}
        className="pointer-events-none absolute h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/12 blur-[120px]"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-6xl"
      >
        {/* Availability */}
        <motion.div variants={item}>
          <span className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-2 text-xs font-medium text-slate-300">
            <span className="relative flex h-2 w-2">
              {site.available && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              )}
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  site.available ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              />
            </span>
            {site.availabilityLabel}
            <span className="h-3 w-px bg-white/15" />
            <span className="inline-flex items-center gap-1 text-slate-400">
              <MapPin className="h-3 w-3" />
              {site.location}
            </span>
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="mt-8 font-display text-[clamp(2.75rem,9vw,7rem)] leading-[0.95] font-extrabold tracking-tight"
        >
          <span className="block text-white">Basheer</span>
          <span className="text-gradient block">Hourany</span>
        </motion.h1>

        {/* Role + tagline */}
        <motion.div variants={item} className="mt-8 flex flex-col gap-5 md:flex-row md:items-start">
          <div className="flex items-center gap-3 md:w-64 md:shrink-0">
            <span className="h-px w-10 bg-gradient-to-r from-brand-400 to-transparent" />
            <p className="font-mono text-xs tracking-[0.18em] text-brand-300 uppercase">
              {site.role}
            </p>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-pretty text-slate-400">
            {site.tagline}
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
          <MagneticButton href="#projects">
            View Projects
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>

          <MagneticButton href="#contact" variant="secondary">
            <Sparkles className="h-4 w-4 text-brand-300" />
            Contact Me
          </MagneticButton>

          <a
            href={site.resumeUrl}
            className="inline-flex items-center gap-2 px-3 py-3 text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            <Download className="h-4 w-4" />
            Résumé
          </a>
        </motion.div>

        {/* Tech stack pills */}
        <motion.ul variants={item} className="mt-12 flex flex-wrap gap-2.5">
          {heroStack.map((tech, i) => (
            <motion.li
              key={tech}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.05, duration: 0.4 }}
              whileHover={{ y: -3, scale: 1.04 }}
              className="glass group cursor-default rounded-full px-4 py-2 text-sm text-slate-300 transition-colors duration-300 hover:border-brand-400/40 hover:text-white"
            >
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-slate-600 transition-colors duration-300 group-hover:bg-brand-400" />
              {tech}
            </motion.li>
          ))}
        </motion.ul>

        {/* Stats + socials */}
        <motion.div
          variants={item}
          className="mt-14 flex flex-wrap items-end justify-between gap-8 border-t border-white/5 pt-8"
        >
          <dl className="flex flex-wrap gap-10">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl font-bold text-white">{stat.value}</dd>
                <p className="mt-1 text-xs tracking-wide text-slate-500 uppercase">{stat.label}</p>
              </div>
            ))}
          </dl>

          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={s.label}
                whileHover={{ y: -3 }}
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition-colors duration-300 hover:border-brand-400/40 hover:text-white"
              >
                <s.icon className="h-4.5 w-4.5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#projects"
        aria-label="Scroll to projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-600 transition-colors hover:text-slate-300 lg:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  )
}
