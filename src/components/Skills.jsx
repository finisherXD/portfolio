import { motion } from 'framer-motion'
import { skillGroups } from '../data/skills'
import SectionHeading from './ui/SectionHeading'
import { staggerContainer, staggerItem } from './ui/Reveal'

export default function Skills() {
  return (
    <section id="skills" className="relative px-4 py-28 sm:px-6 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Toolkit"
          title="What I build with"
          description="Frontend is home, but I'm comfortable following a feature down to the Django endpoint and back."
          align="center"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {skillGroups.map((group) => (
            <motion.article
              key={group.id}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md transition-colors duration-500 ${group.ring}`}
            >
              {/* Wash that fades in on hover */}
              <div
                aria-hidden="true"
                className={`absolute inset-0 bg-gradient-to-b ${group.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />

              <div className="relative">
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-white transition-transform duration-500 group-hover:scale-110">
                  <group.icon className="h-5 w-5" />
                </span>

                <h3 className="mt-5 font-display text-lg font-semibold text-white">
                  {group.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{group.blurb}</p>

                <ul className="mt-6 space-y-4">
                  {group.skills.map((skill, i) => (
                    <li key={skill.name}>
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-sm font-medium text-slate-300">{skill.name}</span>
                        <span className="font-mono text-[11px] text-slate-600">{skill.level}</span>
                      </div>
                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{
                            duration: 1.1,
                            delay: 0.15 + i * 0.09,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className={`h-full rounded-full bg-gradient-to-r ${group.bar}`}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
