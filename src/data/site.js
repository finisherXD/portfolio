import { Mail, Phone } from 'lucide-react'
import { GithubIcon, LinkedinIcon, XIcon } from '../components/icons/BrandIcons'

export const site = {
  name: 'Basheer Hourany',
  initials: 'BH',
  role: 'Frontend Developer',
  tagline:
    'Frontend developer and IT student building responsive, multilingual web and mobile interfaces in React and Flutter — comfortable across the stack with Django and REST APIs.',
  location: 'Damascus, Syria',
  email: 'muhammadh.2004@gmail.com',
  phone: '+963 951 820 497',
  available: true,
  availabilityLabel: 'Open for opportunities',
  resumeUrl: '/resume.pdf', // drop "My Cv 2026.pdf" into /public as resume.pdf
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export const socials = [
  { label: 'GitHub', href: 'https://github.com/finisherXD', icon: GithubIcon },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/basheer-hourany-864645319/',
    icon: LinkedinIcon,
  },
  { label: 'Email', href: `mailto:${site.email}`, icon: Mail },
  { label: 'Phone', href: 'tel:+963951820497', icon: Phone },

  // Add your handle and uncomment if you want X on here too.
  // { label: 'X', href: 'https://x.com/YOUR_HANDLE', icon: XIcon },
]

/** Pills rendered in the hero. */
export const heroStack = [
  'React',
  'JavaScript',
  'Flutter',
  'Dart',
  'Django',
  'REST APIs',
  'Clean Architecture',
  'Git',
]

export const heroStats = [
  { value: '100+', label: 'Students tutored' },
  { value: '5+', label: 'Projects shipped' },
  { value: '2', label: 'Languages, AR & EN' },
]
