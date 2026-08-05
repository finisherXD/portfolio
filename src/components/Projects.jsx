import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { ArrowUpRight, ImageOff, Lock, Star } from 'lucide-react'
import { projectCategories, projectsData } from '../data/projects'
import { GithubIcon } from './icons/BrandIcons'
import SectionHeading from './ui/SectionHeading'

export default function Projects() {
  const [filter, setFilter] = useState('All')

  const visible = useMemo(
    () => (filter === 'All' ? projectsData : projectsData.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <section id="projects" className="relative px-4 py-28 sm:px-6 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects I've shipped"
            description="Two full-stack products with their own backends, client platforms, and a booking network in progress — web and mobile, most of them bilingual."
          />

          {/* Filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-wrap gap-1.5"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {projectCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={filter === cat}
                onClick={() => setFilter(cat)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  filter === cat ? 'text-ink-900' : 'text-slate-400 hover:text-white'
                }`}
              >
                {filter === cat && (
                  <motion.span
                    layoutId="project-filter-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-full bg-white"
                  />
                )}
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <p className="mt-16 text-center text-slate-500">No projects in this category yet.</p>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [imageFailed, setImageFailed] = useState(false)

  // Cursor-tracked highlight — driven entirely by motion values so moving the
  // mouse never triggers a React re-render.
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)
  const highlight = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgba(129,140,248,0.10), transparent 60%)`

  function handleMouseMove(e) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mx.set(e.clientX - rect.left)
    my.set(e.clientY - rect.top)
  }

  const showImage = project.image && !imageFailed
  const hasLinks = Boolean(project.demo || project.github)
  // 6-column grid: `wide` cards take half a row, the rest take a third. Keep
  // the count of wide cards even so every row fills (4 wide + 2 = 6/6/4).
  const span = project.wide ? 'lg:col-span-3' : 'lg:col-span-2'

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md transition-colors duration-500 hover:border-white/20 ${span}`}
    >
      {/* Radial highlight that follows the cursor */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: highlight }}
      />

      {/* Media */}
      <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/9]">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.accent} transition-transform duration-700 group-hover:scale-105`}
        />

        {showImage ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          /* Placeholder shown until you drop a real screenshot into /public */
          <div className="absolute inset-0 grid place-items-center px-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <ImageOff className="h-6 w-6 text-white/25" />
              <span className="font-display text-2xl font-bold tracking-tight text-balance text-white/20 sm:text-3xl">
                {project.title}
              </span>
            </div>
          </div>
        )}

        {/* Overlay revealed on hover. The description is clamped so it can
            never outgrow the media box — standard cards only have ~200px. */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end overflow-hidden bg-gradient-to-t from-ink-950 via-ink-950/85 to-ink-950/60 p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <p className="line-clamp-5 translate-y-3 text-xs leading-relaxed text-slate-300 transition-transform duration-500 group-hover:translate-y-0 sm:line-clamp-6 sm:text-sm">
            {project.description}
          </p>
          <div
            className={`flex translate-y-3 gap-2 transition-transform duration-500 delay-75 group-hover:translate-y-0 ${
              hasLinks ? 'mt-4' : ''
            }`}
          >
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink-900 transition hover:bg-brand-300"
              >
                Live demo
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                Code
              </a>
            )}
          </div>
        </div>

        {/* Badges step aside so they never collide with the hover overlay */}
        <div className="absolute top-4 left-4 z-30 flex flex-wrap items-center gap-2 transition-opacity duration-300 group-hover:opacity-0">
          {project.featured && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink-950/60 px-3 py-1 text-[11px] font-medium text-brand-200 backdrop-blur-md">
              <Star className="h-3 w-3 fill-brand-300 text-brand-300" />
              Featured
            </span>
          )}
          {project.status && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-ink-950/60 px-3 py-1 text-[11px] font-medium text-amber-200 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              {project.status}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="relative p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-semibold text-white transition-colors duration-300 group-hover:text-brand-200 sm:text-xl">
              {project.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{project.summary}</p>
          </div>
          <span className="font-mono text-xs text-slate-600">{project.year}</span>
        </div>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-white/5 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-slate-400 transition-colors duration-300 group-hover:border-white/10 group-hover:text-slate-300"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* Always-available links (the hover overlay is a bonus, not the only path) */}
        <div className="mt-5 flex items-center gap-4 border-t border-white/5 pt-4">
          {hasLinks ? (
            <>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 transition-colors hover:text-brand-300"
                >
                  Live demo
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 transition-colors hover:text-brand-300"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  Repository
                </a>
              )}
            </>
          ) : (
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-brand-300"
            >
              <Lock className="h-3.5 w-3.5" />
              {project.linkNote ?? 'Details on request'}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
