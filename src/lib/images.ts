/**
 * Curated image collection for Creati.mx
 * Using Unsplash for high-quality, free-to-use images.
 * Each image is selected to represent software development, design, and collaboration.
 */

export const images = {
  // Hero section — showcase of our work environment
  hero: {
    teamCollab: {
      src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      alt: 'Equipo de desarrollo colaborando en un proyecto',
    },
    codeOnScreen: {
      src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
      alt: 'Código en pantalla de un proyecto de software',
    },
    designProcess: {
      src: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=600&q=80',
      alt: 'Proceso de diseño UX con wireframes y prototipos',
    },
    mobileApp: {
      src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=500&q=80',
      alt: 'Aplicación móvil en uso',
    },
  },

  // About section — team and culture
  about: {
    workspace: {
      src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
      alt: 'Espacio de trabajo moderno y colaborativo',
    },
    brainstorm: {
      src: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=700&q=80',
      alt: 'Sesión de brainstorming en pizarrón blanco',
    },
    laptopWork: {
      src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
      alt: 'Desarrollador trabajando en laptop con código',
    },
  },

  // Problem section
  problem: {
    frustrated: {
      src: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=800&q=80',
      alt: 'Pantalla con interfaz compleja y confusa',
    },
  },

  // How it works
  howItWorks: {
    listen: {
      src: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=600&q=80',
      alt: 'Reunión con cliente para entender sus necesidades',
    },
    design: {
      src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80',
      alt: 'Diseñador trabajando en prototipos de interfaz',
    },
    build: {
      src: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=600&q=80',
      alt: 'Equipo de desarrollo construyendo el producto final',
    },
  },

  // Editorial / decorative
  editorial: {
    aerial: {
      src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
      alt: 'Equipo de tecnología colaborando desde vista aérea',
    },
    detail: {
      src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
      alt: 'Equipo trabajando en ambiente startup moderno',
    },
  },
} as const
