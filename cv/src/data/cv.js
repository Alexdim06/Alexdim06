export const siteBase = import.meta.env.BASE_URL.replace(/\/$/, '') || '.';
export const rootBase = import.meta.env.PROD ? '/Alexdim06' : '..';

export const cv = {
  name: 'Aleksandar Dimitrov',
  status: 'Available',
  role: 'Full-stack developer · Angular & Strapi',
  tagline:
    'I ship maintainable products — interface, content architecture, DevOps delivery, and frontend mentoring in one role.',
  metrics: [
    { label: 'Products', value: '2 flagship builds' },
    { label: 'Stack', value: 'Angular + Strapi' },
    { label: 'Leadership', value: 'Frontend mentoring' },
    { label: 'Work', value: 'Remote · Hybrid · Sofia' },
  ],
  contact: [
    { label: 'Email', href: 'mailto:alex.06dimitrov@gmail.com', text: 'alex.06dimitrov@gmail.com' },
    { label: 'Portfolio', href: `${rootBase}/`, text: 'alexdim06.github.io' },
    { label: 'GitHub', href: 'https://github.com/Alexdim06', text: 'github.com/Alexdim06' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/aleksandar-dimitrov-pya16/',
      text: '/in/aleksandar-dimitrov-pya16',
    },
  ],
  stack: [
    'Angular', 'Vue', 'Strapi', 'TypeScript', 'JavaScript', 'React', 'Node.js', 'Express',
    'HTML', 'CSS', 'PostgreSQL', 'MongoDB', 'Prisma', 'WebSocket', 'Git', 'Docker', 'Agile', 'Bootstrap',
  ],
  security: [
    'Security practices in production delivery',
    'Firewalls (UFW) & SSH hardening',
    'fail2ban & server access hygiene',
  ],
  focus: [
    'PostgreSQL & MongoDB data layers',
    'Production Angular + Strapi systems',
    'CMS & API architecture',
    'DevOps-minded delivery',
    'Frontend coordination & mentoring',
    'Product-minded communication',
  ],
  languages: [
    { name: 'Bulgarian', level: 'Native' },
    { name: 'English', level: 'Professional' },
  ],
  availability: 'Available for full-stack roles. EU remote or Sofia hybrid/on-site.',
  profile:
    'Full-stack developer at Industria Technology in Sofia — from business analysis into software delivery on the same team. I work with Angular, Vue, and Strapi across frontend, content systems, and APIs, with PostgreSQL and MongoDB in production-shaped stacks. I also contribute to DevOps workflows, security-minded server practices, and frontend mentoring.',
  experience: [
    {
      title: 'Full-Stack Developer · Industria Technology',
      period: '2025 — Present · Sofia',
      bullets: [
        'Deliver advanced Angular, Vue, and Strapi solutions across UI, CMS architecture, and backend integration.',
        'Work with PostgreSQL and MongoDB in API and content-driven systems.',
        'Support DevOps workflows, firewalls, and security practices so releases stay predictable.',
        'Coordinate frontend developers and help the team ship with consistent quality.',
        'Started on the same team as Business Analyst Intern (7 months): user stories, process analysis, and agile sprint planning — the path into full-stack delivery at Industria.',
      ],
    },
    {
      title: 'Earlier roles',
      period: '2021 — 2024',
      compact: true,
      text: 'Auto mechanic and florist — customer communication, diagnostics, organization, and ownership under real-world pressure.',
    },
  ],
  products: [
    {
      name: 'NestSyncFlow',
      badge: 'Private',
      badgeClass: 'border-orange/35 text-orange',
      meta: 'React · Express · PostgreSQL · Prisma · WebSocket · JWT · Stripe-ready',
      description:
        'Real-time workflow platform with secure auth, live sync, analytics, and monetization-ready architecture.',
      href: `${rootBase}/projects/nestsyncflow.html`,
      external: false,
    },
    {
      name: 'UVE × SystemaWeb',
      badge: 'Live',
      badgeClass: 'border-acid/35 text-acid',
      meta: 'Chrome · Firefox · Stripe · SystemaWeb',
      description:
        'HTML5 video extension + product site. 0.1×–16× speed, 600% volume boost, captions, templates, one Pro license.',
      href: 'https://systemaweb.com/',
      external: true,
    },
  ],
  certificates: 'JavaScript Fundamentals · HTML & CSS Advanced · Agile / Scrum Foundations',
  howIWork:
    'Clear trade-offs, readable delivery, and communication that helps teams move — from product framing to shipped code.',
  pdfUrl: `${rootBase}/assets/Aleksandar-Dimitrov-CV.pdf`,
  portrait: `${rootBase}/assets/profile.png`,
  portraitWebp: `${rootBase}/assets/profile-480.webp`,
};
