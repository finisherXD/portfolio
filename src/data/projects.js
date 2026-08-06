/**
 * Stacks below were read from each project's own pubspec.yaml / package.json,
 * so they're accurate rather than inferred. Years come from repo + file dates —
 * correct any that are off.
 *
 * @typedef {Object} Project
 * @property {string}   id        Unique slug (used as React key).
 * @property {string}   title
 * @property {string}   summary   One-liner shown on the card.
 * @property {string}   description Longer blurb revealed on hover.
 * @property {string[]} tags       Tech badges.
 * @property {string}   category   Drives the filter bar — see `projectCategories`.
 * @property {string}   image      Path in /public ('' → gradient placeholder).
 * @property {string}   demo       Live demo URL ('' hides the button).
 * @property {string}   github     Repository URL ('' hides the button).
 * @property {string}  [linkNote]  Shown instead of links when demo and github are both empty.
 * @property {string}   year
 * @property {string}  [status]    Optional badge, e.g. 'In development'.
 * @property {boolean}  wide       Spans half a row on desktop instead of a third.
 *                                 Keep the number of wide cards even so rows fill.
 * @property {boolean}  featured   Shows a "Featured" badge on the card artwork.
 * @property {string}   accent     Tailwind gradient classes behind the artwork.
 */

/** @type {Project[]} */
export const projectsData = [
  {
    id: 'kings-table',
    title: "King's Table",
    summary: 'Fine-dining delivery app with a loyalty engine and live order tracking.',
    description:
      'A Flutter delivery app in a gold-on-charcoal luxury theme, backed by a Django REST API and a separate TypeScript admin dashboard. Animated "build your dish" customiser, a points and rewards system, table reservations, per-dish nutrition, live order tracking over WebSockets with local notifications, and delivery mapping via geolocation — fully bilingual.',
    tags: ['Flutter', 'Dart', 'Provider', 'Django', 'WebSockets', 'TypeScript', 'Maps'],
    category: 'Full-Stack',
    image: '/projects/kings-table.webp',
    linkNote: 'Private repo — walkthrough on request',
    demo: '',
    // App, backend and dashboard repos are all private on GitHub.
    github: '',
    year: '2026',
    wide: true,
    featured: true,
    accent: 'from-amber-500/40 via-yellow-600/20 to-transparent',
  },
  {
    id: 'fitmind',
    title: 'FitMind',
    summary: 'Full-stack gym app with on-device AI for workouts and nutrition.',
    description:
      'A Flutter client structured in Clean Architecture — Cubit for state, get_it for injection, go_router for navigation — against a Django REST backend. Runs a TensorFlow Lite model on-device to scan a photo of a meal for calories and nutrition, alongside an AI workout-plan generator and automated progress reports charted with Syncfusion.',
    tags: ['Flutter', 'Dart', 'Cubit', 'Django', 'TensorFlow Lite', 'Firebase', 'Clean Architecture'],
    category: 'Full-Stack',
    image: '/projects/fitmind.webp',
    linkNote: 'Private repo — walkthrough on request',
    demo: '',
    github: '',
    year: '2025',
    wide: true,
    featured: true,
    accent: 'from-emerald-500/40 via-teal-500/20 to-transparent',
  },
  {
    id: 'gravity',
    title: 'Gravity Lounges',
    summary: 'Gaming lounge booking network — book elite stations across Syria.',
    description:
      'A React + TypeScript platform where lounge owners lay out their floor and manage availability while gamers search arenas by city and lock a slot. Interactive station maps drawn with Konva, venue discovery on Leaflet, live booking updates over SignalR, and OIDC-backed authentication — bilingual, with a light and dark theme.',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'SignalR', 'Konva', 'Leaflet', 'OIDC'],
    category: 'SaaS',
    image: '/projects/gravity.webp',
    demo: 'https://www.gravitylounges.com',
    // Repo is private on GitHub — make it public and add the URL here to show a "Code" button.
    github: '',
    year: '2026',
    status: 'In development',
    wide: true,
    featured: true,
    accent: 'from-indigo-500/40 via-sky-500/20 to-transparent',
  },
  {
    id: 'mazen-dadouch',
    title: 'Mazen Dadouch Trading',
    summary: 'Bilingual web platform for a Damascus pumps & generators supplier.',
    description:
      'A responsive Arabic/English platform built with Flutter Web — dynamic product, news, and blog pages, carousel sliders, a staggered gallery grid, and embedded video. Content is driven live from a REST API, with a companion admin dashboard for real-time management and token-authenticated requests through Dio interceptors.',
    tags: ['Flutter Web', 'Dart', 'Provider', 'go_router', 'Dio', 'REST API', 'Arabic / English'],
    category: 'Web App',
    image: '/projects/mazen-dadouch.webp',
    linkNote: 'Client work — details on request',
    demo: '',
    github: '',
    year: '2025',
    wide: true,
    featured: false,
    accent: 'from-sky-500/40 via-blue-500/20 to-transparent',
  },
  {
    id: 'zeera',
    title: 'Zeera Medical Cosmetics',
    summary: 'Bilingual product showcase for a regional medical cosmetics brand.',
    description:
      'Multi-level product categories, per-product detail pages, similar-product filtering, and search — all served live from a REST API. Includes Google Maps store locations, embedded video, a photo viewer with pinch-zoom, and scroll-triggered animations throughout.',
    tags: ['Flutter Web', 'Dart', 'Provider', 'Google Maps', 'Dio', 'REST API', 'Arabic / English'],
    category: 'Web App',
    image: '/projects/zeera.webp',
    linkNote: 'Client work — details on request',
    demo: '',
    github: '',
    year: '2025',
    wide: false,
    featured: false,
    accent: 'from-amber-500/40 via-yellow-500/20 to-transparent',
  },
  {
    id: 'nike-ecommerce',
    title: 'Nike E-Commerce App',
    summary: 'Functional storefront mockup with a working cart and shopping flows.',
    description:
      'A front-end e-commerce app built as a mockup: product home page, product detail views, a working shopping cart, and the core shopping workflows, with state managed through Provider.',
    tags: ['Flutter', 'Dart', 'Provider', 'UI Design'],
    category: 'Mobile',
    image: '/projects/nike.webp',
    linkNote: 'Practice build — code on request',
    demo: '',
    github: '',
    year: '2025',
    wide: false,
    featured: false,
    accent: 'from-rose-500/40 via-pink-500/20 to-transparent',
  },
]

/** Derived from the data so the filter bar never drifts out of sync. */
export const projectCategories = ['All', ...new Set(projectsData.map((p) => p.category))]
