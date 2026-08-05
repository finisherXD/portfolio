# Basheer Hourany — Portfolio

Dark, glassmorphic developer portfolio built with **React 19 · Vite 8 · Tailwind CSS v4 · Framer Motion 13 · Lucide React**.

## Getting started

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:5173. Other scripts: `npm run build`, `npm run preview`.

## File structure

```
react_portfolio/
├── index.html                  # Fonts (Inter + Sora), meta tags, favicon
├── vite.config.js              # React + @tailwindcss/vite plugins
├── public/
│   ├── favicon.svg
│   ├── resume.pdf              # ← your CV, linked from the hero "Résumé" button
│   └── projects/               # Card artwork (live screenshot + brand logos)
└── src/
    ├── main.jsx
    ├── App.jsx                 # Section order lives here
    ├── index.css               # Design tokens (@theme), keyframes, utilities
    ├── data/                   # ►► EVERYTHING YOU EDIT LIVES HERE ◄◄
    │   ├── site.js             # Name, role, tagline, contacts, socials, hero pills & stats
    │   ├── projects.js         # projectsData array + derived filter categories
    │   ├── skills.js           # Four skill groups with proficiency levels
    │   └── timeline.js         # Experience / education entries
    ├── hooks/
    │   └── useActiveSection.js # IntersectionObserver → active nav highlight
    └── components/
        ├── Background.jsx      # Fixed mesh gradients, grid, vignette, grain
        ├── Navbar.jsx          # Sticky blur header + mobile overlay menu
        ├── Hero.jsx            # Cursor spotlight, availability tag, tech pills, CTAs
        ├── Projects.jsx        # Filterable grid, cursor-tracked card glow
        ├── Skills.jsx          # Four categories with animated meters
        ├── About.jsx           # Timeline with a scroll-drawn progress rail
        ├── Contact.jsx         # Validated form + toasts, direct channels
        ├── Footer.jsx
        ├── icons/
        │   └── BrandIcons.jsx  # GitHub / LinkedIn / X marks (see note below)
        └── ui/
            ├── Toast.jsx       # ToastProvider + useToast()
            ├── MagneticButton.jsx
            ├── Reveal.jsx      # Scroll-reveal wrapper + stagger variants
            ├── SectionHeading.jsx
            └── ScrollProgress.jsx
```

## Swapping in your data

Everything content-related is in `src/data/` — you shouldn't need to touch a component.

**`projects.js`** — each entry takes `title`, `summary`, `description`, `tags`, `category`,
`image`, `demo`, `github`, `year`, `featured`, and an optional `status` badge.

- `category` values feed the filter bar automatically — add a new one and a new tab appears.
- `wide: true` makes a card span half a row instead of a third. The grid is 6 columns, so wide
  cards take 3 and the rest take 2 — **keep the number of wide cards even** and every row fills.
  Currently 4 wide + 2 standard, which tiles as 6 / 6 / 4.
- `featured: true` only adds the "Featured" badge — it's independent of `wide`.
- `linkNote` is the line shown when a project has neither a demo nor a repo
  (e.g. "Client work — details on request").
- `image` points into `/public/projects`. Gravity uses a screenshot of the live site; the rest use
  card art generated from each project's own logo. Swap in real screenshots any time — and if a
  path 404s, the card silently falls back to a gradient placeholder with the project name.
- Leave `demo`/`github` as `''` and the card shows "Client work — details on request" instead
  of dead links. Fill them in as projects go public.

**`site.js`** — GitHub, LinkedIn, email, and phone are live. X is commented out at the bottom of
`socials`; add your handle and uncomment if you want it.

## The contact form

There's no backend. Rather than pretend to send and quietly drop the message, `handleSubmit`
validates the input and then hands off to the visitor's mail client with the subject and body
pre-filled — no server needed, and nothing gets lost.

To wire up a real endpoint later (Formspree, Resend, an API route), replace this line in
`Contact.jsx` with your fetch call:

```js
window.location.href = mailto
```

To make the form purely decorative instead, delete that line — validation and toasts still run,
but nothing leaves the page. To drop the form entirely, remove the first `<Reveal>` block in
`Contact.jsx` and the direct-contact card will take the full width.

## Notes

- **Tailwind v4** — there's no `tailwind.config.js`. Design tokens are CSS variables in the
  `@theme` block of `src/index.css`; `--color-brand-400` becomes `bg-brand-400`, etc.
- **Brand icons** — `lucide-react` v1 removed GitHub/LinkedIn/X for trademark reasons, so those
  marks live in `components/icons/BrandIcons.jsx` and take the same props as a Lucide icon.
- **Reduced motion** — `prefers-reduced-motion` disables the magnetic buttons, the cursor
  spotlight, and CSS animations.
