export const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/about' },
  { label: 'Contacto', href: '/contact' },
] as const

export const socialLinks = {
  linkedin: 'https://linkedin.com/company/creati',
  twitter: 'https://twitter.com/creatimx',
  github: 'https://github.com/creatimx',
} as const

export const contactInfo = {
  email: 'hola@creati.mx',
  location: 'Monterrey, NL, México',
} as const

export const companyValues = [
  {
    title: 'Personas primero',
    description: 'Cada decisión empieza con una pregunta: ¿esto mejora la vida de alguien? Si la respuesta no es un sí rotundo, lo repensamos.',
    icon: 'Heart',
  },
  {
    title: 'Claridad sobre complejidad',
    description: 'Lo simple es difícil. Por eso lo perseguimos. Software que cualquiera puede usar sin manual de instrucciones.',
    icon: 'Sparkles',
  },
  {
    title: 'Craft con propósito',
    description: 'Cada pixel, cada línea de código tiene una razón de ser. No decoramos — diseñamos con intención.',
    icon: 'Gem',
  },
  {
    title: 'Evolución constante',
    description: 'No lanzamos y olvidamos. Nuestros productos crecen, aprenden y mejoran junto con las personas que los usan.',
    icon: 'Rocket',
  },
] as const

export const features = [
  {
    title: 'Diseño centrado en personas',
    description: 'Interfaces que se sienten naturales desde el primer clic.',
    icon: 'Users',
    accent: 'from-indigo-500 to-violet-500',
  },
  {
    title: 'Ingeniería robusta',
    description: 'Arquitecturas escalables que crecen con tu negocio.',
    icon: 'Code2',
    accent: 'from-amber-400 to-orange-500',
  },
  {
    title: 'Inteligencia integrada',
    description: 'IA que potencia, no reemplaza. Herramientas más inteligentes para equipos reales.',
    icon: 'Brain',
    accent: 'from-emerald-400 to-teal-500',
  },
  {
    title: 'Lanzamiento ágil',
    description: 'De la idea al producto en semanas, no meses. Iteramos rápido, entregamos valor temprano.',
    icon: 'Zap',
    accent: 'from-rose-400 to-pink-500',
  },
] as const

export const steps = [
  {
    number: '01',
    title: 'Escuchamos',
    description: 'Entendemos tu mundo, tus usuarios y el problema real que necesita solución. Sin suposiciones.',
  },
  {
    number: '02',
    title: 'Diseñamos',
    description: 'Creamos prototipos funcionales que puedes tocar, probar y validar antes de escribir una sola línea de código.',
  },
  {
    number: '03',
    title: 'Construimos',
    description: 'Desarrollo ágil con entregas semanales. Ves progreso real, no reportes de avance.',
  },
] as const

export const testimonials = [
  {
    quote: 'Creati no solo nos entregó software — nos dio claridad sobre cómo debía funcionar nuestro negocio.',
    author: 'Mariana Torres',
    role: 'CEO, LogiTrack',
  },
  {
    quote: 'El equipo de Creati piensa en nuestros usuarios como si fueran los suyos. Eso marca toda la diferencia.',
    author: 'Carlos Mendoza',
    role: 'Director de Producto, HealthBridge',
  },
  {
    quote: 'Pasamos de una idea en una servilleta a una app usada por 5,000 personas en 3 meses.',
    author: 'Ana Gutiérrez',
    role: 'Fundadora, EduFlow',
  },
] as const
