import { Code2, Server, Binary, Wrench } from 'lucide-react'

/**
 * Categories mirror your CV. `level` is a 0–100 proficiency driving the
 * animated meters — these are estimates, so tune them to taste (or delete
 * the property and the bars will simply render empty).
 */
export const skillGroups = [
  {
    id: 'frontend',
    title: 'Frontend',
    blurb: 'Responsive, multilingual interfaces on web and mobile.',
    icon: Code2,
    accent: 'from-brand-500/25 to-brand-500/0',
    ring: 'group-hover:border-brand-400/40',
    bar: 'from-brand-400 to-brand-300',
    skills: [
      { name: 'React', level: 92 },
      { name: 'Flutter & Dart', level: 88 },
      { name: 'JavaScript', level: 90 },
      { name: 'HTML & CSS', level: 93 },
      { name: 'Responsive Design', level: 91 },
      { name: 'UI Animations', level: 82 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    blurb: 'Django services and the integration layer around them.',
    icon: Server,
    accent: 'from-glow-500/25 to-glow-500/0',
    ring: 'group-hover:border-glow-400/40',
    bar: 'from-glow-400 to-glow-300',
    skills: [
      { name: 'Django', level: 84 },
      { name: 'RESTful APIs', level: 89 },
      { name: 'Token Authentication', level: 85 },
      { name: 'Clean Architecture', level: 83 },
      { name: 'State Management (Cubit, Provider)', level: 88 },
    ],
  },
  {
    id: 'cs',
    title: 'Languages & CS',
    blurb: 'The fundamentals — reinforced by teaching them.',
    icon: Binary,
    accent: 'from-emerald-500/25 to-emerald-500/0',
    ring: 'group-hover:border-emerald-400/40',
    bar: 'from-emerald-400 to-emerald-300',
    skills: [
      { name: 'Java (OOP)', level: 86 },
      { name: 'C++', level: 82 },
      { name: 'Data Structures & Algorithms', level: 87 },
      { name: 'Database Management', level: 84 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Practice',
    blurb: 'How the work actually gets shipped and reviewed.',
    icon: Wrench,
    accent: 'from-fuchsia-500/25 to-fuchsia-500/0',
    ring: 'group-hover:border-fuchsia-400/40',
    bar: 'from-fuchsia-400 to-fuchsia-300',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Testing', level: 80 },
      { name: 'Code Reviews', level: 85 },
      { name: 'Arabic — Native', level: 100 },
      { name: 'English — Fluent', level: 92 },
    ],
  },
]
