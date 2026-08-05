import { Briefcase, GraduationCap, Users } from 'lucide-react'

export const timelineData = [
  {
    id: 'frontend-2024',
    period: '2024 — Present',
    title: 'Frontend Developer',
    org: 'Client & freelance web/app projects · Damascus, Syria',
    type: 'work',
    icon: Briefcase,
    description:
      'Building responsive, multilingual web and mobile products for clients — from a pumps and generators trading platform with its own admin dashboard, to a regional cosmetics brand showcase with multi-level catalogues and real-time API integration.',
    highlights: ['React', 'Flutter', 'REST APIs', 'Arabic / English'],
  },
  {
    id: 'tutor-2023',
    period: '2023 — Present',
    title: 'Private IT Tutor',
    org: 'Self-employed · Damascus, Syria',
    type: 'milestone',
    icon: Users,
    description:
      'Tutored 100+ students across 10+ subjects in software, programming, databases, and Flutter app development. Teaching Java OOP, C++, data structures, algorithms, and database management keeps my own fundamentals sharp.',
    highlights: ['100+ students', '10+ subjects', 'Java · C++ · Flutter'],
  },
  {
    id: 'degree-2022',
    period: '2022 — Expected 2027',
    title: 'B.Sc. in Information Technology',
    org: 'Arabic International University · Damascus, Syria',
    type: 'education',
    icon: GraduationCap,
    description:
      'Studying information technology alongside client work — the coursework in data structures, algorithms, and database systems feeds directly into how I architect the apps I build.',
    highlights: ['Data structures', 'Algorithms', 'Databases'],
  },
]

export const typeStyles = {
  work: { dot: 'bg-brand-400', chip: 'text-brand-300 bg-brand-500/10 border-brand-400/20' },
  education: { dot: 'bg-glow-400', chip: 'text-glow-300 bg-glow-500/10 border-glow-400/20' },
  milestone: {
    dot: 'bg-fuchsia-400',
    chip: 'text-fuchsia-300 bg-fuchsia-500/10 border-fuchsia-400/20',
  },
}
