import { ArrowUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { navLinks, site, socials } from '../data/site'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-sm font-semibold text-white">{site.name}</p>
          <p className="mt-1 text-xs text-slate-500">
            © {new Date().getFullYear()} — Built with React, Vite, Tailwind &amp; Framer Motion.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="text-xs text-slate-500 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={s.label}
              className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-white/5 hover:text-white"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}

          <motion.a
            href="#home"
            aria-label="Back to top"
            whileHover={{ y: -3 }}
            className="ml-1 grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition-colors hover:text-white"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
