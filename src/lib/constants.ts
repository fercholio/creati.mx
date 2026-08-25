export const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Tecnología & Integraciones', href: '/#integrations' },
  { label: 'Showroom (Play & Try)', href: '/showroom' },
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
  location: 'Mérida, Yucatán, México',
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
    accent: 'from-accent-500 to-accent-600',
  },
  {
    title: 'Ingeniería robusta',
    description: 'Arquitecturas escalables que crecen con tu negocio.',
    icon: 'Code2',
    accent: 'from-navy-500 to-navy-700',
  },
  {
    title: 'Inteligencia integrada',
    description: 'IA que potencia, no reemplaza. Herramientas más inteligentes para equipos reales.',
    icon: 'Brain',
    accent: 'from-accent-400 to-navy-500',
  },
  {
    title: 'Lanzamiento ágil',
    description: 'De la idea al producto en semanas, no meses. Iteramos rápido, entregamos valor temprano.',
    icon: 'Zap',
    accent: 'from-navy-400 to-navy-700',
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

export const faqs = [
  {
    question: '¿Qué tipo de proyectos hacen?',
    answer: 'Desarrollamos aplicaciones web, móviles, plataformas SaaS y herramientas internas. Si involucra software y usuarios, nos interesa.',
  },
  {
    question: '¿Cuánto cuesta un proyecto?',
    answer: 'Depende del alcance. Trabajamos con presupuestos desde proyectos MVP hasta plataformas enterprise. Siempre damos un estimado claro antes de empezar.',
  },
  {
    question: '¿Cuánto tiempo toma un proyecto?',
    answer: 'Un MVP típico toma de 6 a 12 semanas. Proyectos más complejos pueden tomar 3-6 meses. Siempre entregamos en fases para que veas progreso real desde la semana uno.',
  },
  {
    question: '¿Trabajan con equipos remotos?',
    answer: 'Sí. Nuestro equipo es remoto-first. Trabajamos con clientes en toda Latinoamérica y Estados Unidos. La comunicación clara es nuestra prioridad.',
  },
  {
    question: '¿Qué pasa después del lanzamiento?',
    answer: 'Ofrecemos planes de soporte y evolución continua. Tu producto sigue mejorando basado en datos reales de uso y feedback de usuarios.',
  },
] as const
