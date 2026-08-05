import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Copy, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import { site, socials } from '../data/site'
import SectionHeading from './ui/SectionHeading'
import { useToast } from './ui/Toast'
import Reveal from './ui/Reveal'

const EMPTY = { name: '', email: '', message: '' }

export default function Contact() {
  const { toast } = useToast()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending

  function update(field) {
    return (e) => {
      setValues((v) => ({ ...v, [field]: e.target.value }))
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function validate() {
    const next = {}
    if (values.name.trim().length < 2) next.name = 'Please tell me your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) next.email = 'That email looks off.'
    if (values.message.trim().length < 12) next.message = 'A little more detail helps — 12+ characters.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  /**
   * There's no backend behind this form. Rather than pretend to send and
   * quietly drop the message, it hands off to the visitor's mail client with
   * everything pre-filled — no server, but nothing gets lost either.
   *
   * To wire up a real endpoint later (Formspree, Resend, an API route),
   * replace the `window.location.href` line with your fetch call.
   */
  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) {
      toast({
        title: 'Check the form',
        description: 'A couple of fields still need attention.',
        variant: 'error',
      })
      return
    }

    setStatus('sending')

    const subject = `Portfolio enquiry from ${values.name}`
    const body = `${values.message}\n\n—\n${values.name}\n${values.email}`
    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    await new Promise((resolve) => setTimeout(resolve, 600))
    window.location.href = mailto

    setStatus('idle')
    setValues(EMPTY)

    toast({
      title: 'Opening your email app',
      description: `Your message to ${site.email} is ready to send. If nothing opened, copy the address below instead.`,
      variant: 'success',
    })
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email)
      toast({ title: 'Email copied', description: site.email, variant: 'info' })
    } catch {
      toast({
        title: 'Could not copy',
        description: `Reach me directly at ${site.email}`,
        variant: 'error',
      })
    }
  }

  return (
    <section id="contact" className="relative px-4 py-28 sm:px-6 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Get in touch"
          title="Let's build something worth shipping"
          description="Freelance projects, full-time roles, or tutoring — send a message and I'll get back to you."
          align="center"
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-[1fr_minmax(0,22rem)]">
          {/* Form */}
          <Reveal direction="right" className="min-w-0">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="glass h-full rounded-3xl p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Name"
                  id="name"
                  placeholder="Ada Lovelace"
                  value={values.name}
                  onChange={update('name')}
                  error={errors.name}
                />
                <Field
                  label="Email"
                  id="email"
                  type="email"
                  placeholder="ada@example.com"
                  value={values.email}
                  onChange={update('email')}
                  error={errors.email}
                />
              </div>

              <div className="mt-5">
                <Field
                  label="Message"
                  id="message"
                  as="textarea"
                  placeholder="Tell me about the project, the team, and the timeline…"
                  value={values.message}
                  onChange={update('message')}
                  error={errors.message}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-ink-900 transition-colors duration-300 hover:bg-brand-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Opening…
                  </>
                ) : (
                  <>
                    Send message
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </motion.button>

              <p className="mt-4 text-xs text-slate-600">
                This opens your email app with the message ready to send — no data is stored.
              </p>
            </form>
          </Reveal>

          {/* Direct channels */}
          <Reveal direction="left" delay={0.1} className="flex min-w-0 flex-col gap-5">
            <div className="glass rounded-3xl p-6">
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {site.availabilityLabel}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Currently taking on freelance work and open to full-time frontend roles. Typical
                reply time: under 24 hours.
              </p>

              <div className="mt-6 space-y-3 border-t border-white/5 pt-5">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="group flex w-full items-center gap-3 text-left"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition-colors group-hover:text-white">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-white">{site.email}</span>
                    <span className="text-xs text-slate-500">Click to copy</span>
                  </span>
                  <Copy className="h-4 w-4 shrink-0 text-slate-600 transition-colors group-hover:text-brand-300" />
                </button>

                <a
                  href={`tel:${site.phone.replace(/\s/g, '')}`}
                  className="group flex items-center gap-3"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition-colors group-hover:text-white">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm text-white">{site.phone}</span>
                    <span className="text-xs text-slate-500">Call or WhatsApp</span>
                  </span>
                </a>

                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm text-white">{site.location}</span>
                    <span className="text-xs text-slate-500">Remote-friendly</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <p className="text-xs tracking-[0.2em] text-slate-500 uppercase">Elsewhere</p>
              <ul className="mt-4 space-y-1">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="group flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-white/[0.04]"
                    >
                      <s.icon className="h-4 w-4 text-slate-500 transition-colors group-hover:text-brand-300" />
                      <span className="flex-1 text-sm text-slate-300 transition-colors group-hover:text-white">
                        {s.label}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-slate-600 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({ label, id, as = 'input', error, ...props }) {
  const Element = as
  const base =
    'w-full rounded-2xl border bg-ink-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-600 transition-colors duration-300 focus:outline-none'
  const state = error
    ? 'border-rose-500/50 focus:border-rose-400'
    : 'border-white/10 focus:border-brand-400/60 hover:border-white/20'

  return (
    <div className={as === 'textarea' ? 'sm:col-span-2' : ''}>
      <label htmlFor={id} className="mb-2 block text-xs font-medium tracking-wide text-slate-400">
        {label}
      </label>
      <Element
        id={id}
        name={id}
        rows={as === 'textarea' ? 5 : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${base} ${state} ${as === 'textarea' ? 'resize-none' : ''}`}
        {...props}
      />
      {error && (
        <motion.p
          id={`${id}-error`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs text-rose-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}
