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
│   └── projects/               # ← drop project screenshots here
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
- `featured: true` makes a card span half a row; the layout tiles cleanly with **2 featured + 3 standard**.
- `image` points into `/public`. Until a file exists there, the card falls back to a gradient
  placeholder with the project name — and if the path 404s, it silently falls back too.
- Leave `demo`/`github` as `''` and the card shows "Client work — details on request" instead
  of dead links. Fill them in as projects go public.

**`site.js`** — LinkedIn and X aren't in your CV, so they're commented out at the bottom of
`socials`. Add your handles and uncomment to show them.

## Wiring up the contact form

`Contact.jsx` currently fakes the request with a 1.4s delay, then fires a success toast. Replace
this block in `handleSubmit` with your endpoint (Formspree, Resend, an API route, whatever):

```js
await new Promise((resolve) => setTimeout(resolve, 1400))
```

The validation, error states, and toasts all work already.

## Notes

- **Tailwind v4** — there's no `tailwind.config.js`. Design tokens are CSS variables in the
  `@theme` block of `src/index.css`; `--color-brand-400` becomes `bg-brand-400`, etc.
- **Brand icons** — `lucide-react` v1 removed GitHub/LinkedIn/X for trademark reasons, so those
  marks live in `components/icons/BrandIcons.jsx` and take the same props as a Lucide icon.
- **Reduced motion** — `prefers-reduced-motion` disables the magnetic buttons, the cursor
  spotlight, and CSS animations.
