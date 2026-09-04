export interface ServiceDetail {
  slug: string
  title: string
  shortTitle: string
  metaTitle: string
  metaDescription: string
  summary: string
  heroBadge: string
  deliverables: string[]
  techStack: string[]
  benefits: { title: string; desc: string }[]
  faqs: { question: string; answer: string }[]
}

export const servicesData: Record<string, ServiceDetail> = {
  'desarrollo-software-a-medida': {
    slug: 'desarrollo-software-a-medida',
    title: 'Desarrollo de Software a Medida para Empresas',
    shortTitle: 'Software a Medida',
    metaTitle: 'Desarrollo de Software a Medida en México | Creati',
    metaDescription: 'Creamos sistemas empresariales, plataformas en la nube y software a medida en Mérida y todo México. Escalabilidad, seguridad y alto rendimiento.',
    heroBadge: 'Arquitectura Enterprise & Cloud',
    summary: 'Construimos sistemas robustos que automatizan procesos críticos, eliminan cuellos de botella y se integran sin fricción con tus flujos existentes.',
    deliverables: [
      'Arquitectura de microservicios y APIs REST / GraphQL',
      'Paneles administrativos y dashboards analíticos en tiempo real',
      'Bases de datos optimizadas de alta concurrencia (PostgreSQL, Redis)',
      'Infraestructura serverless y contenedores Docker / Kubernetes',
    ],
    techStack: ['Node.js', 'Next.js / React', 'TypeScript', 'PostgreSQL', 'AWS / GCP', 'Docker'],
    benefits: [
      { title: 'Propiedad Total del Código', desc: 'Sin licenciamientos cautivos ni dependencias de terceros; tu empresa es 100% dueña de su tecnología.' },
      { title: 'Escalabilidad Garantizada', desc: 'Diseñado desde el día uno para soportar millones de transacciones sin degradar la experiencia de usuario.' },
      { title: 'Seguridad y Cumplimiento', desc: 'Encriptación de punta a punta, control de acceso basado en roles (RBAC) y auditoría técnica.' },
    ],
    faqs: [
      {
        question: '¿Por qué elegir software a medida frente a un software comercial ya hecho?',
        answer: 'El software empaquetado te obliga a adaptar tus operaciones a sus límites y cobra comisiones recurrentes por usuario. El software a medida se ajusta exactamente a tu modelo de negocio y se convierte en un activo de tu empresa.',
      },
      {
        question: '¿Cómo garantizan la continuidad y el mantenimiento del software?',
        answer: 'Entregamos documentación viva, pruebas automatizadas y contratos de soporte SLA para asegurar máxima estabilidad y actualización continua.',
      },
    ],
  },
  'desarrollo-aplicaciones-moviles': {
    slug: 'desarrollo-aplicaciones-moviles',
    title: 'Desarrollo de Aplicaciones Móviles iOS y Android',
    shortTitle: 'Apps Móviles',
    metaTitle: 'Desarrollo de Apps Móviles iOS y Android en México | Creati',
    metaDescription: 'Desarrollamos aplicaciones móviles nativas y cross-platform con React Native y Expo. Experiencias fluidas, seguras y de alto engagement.',
    heroBadge: 'Mobile-First & Offline-Ready',
    summary: 'Diseñamos apps que los usuarios adoran abrir todos los días. Con arquitectura offline-first, sincronización en segundo plano y máxima seguridad biométrica.',
    deliverables: [
      'Aplicaciones para App Store (iOS) y Google Play (Android)',
      'Diseño de interfaces táctiles con microinteracciones fluidas a 60fps',
      'Integración con biometría (FaceID/Fingerprint) y pagos seguros',
      'Notificaciones push segmentadas y analítica de retención',
    ],
    techStack: ['React Native', 'Expo SDK 52+', 'TypeScript', 'Zustand', 'TanStack Query', 'Tailwind'],
    benefits: [
      { title: 'Time-to-Market Acelerado', desc: 'Una base de código unificada para iOS y Android que reduce a la mitad los tiempos y costos de desarrollo.' },
      { title: 'Rendimiento Nativo', desc: 'Compilación optimizada con acceso directo al hardware, cámara, geolocalización y Bluetooth.' },
      { title: 'Soporte Offline', desc: 'Almacenamiento y sincronización local para que tus usuarios sigan operando incluso sin conexión a internet.' },
    ],
    faqs: [
      {
        question: '¿Publican la aplicación en App Store y Play Store?',
        answer: 'Sí, gestionamos todo el pipeline de revisión, certificados, compliance y despliegue en las tiendas oficiales de Apple y Google.',
      },
      {
        question: '¿Se pueden conectar las apps con mis sistemas actuales?',
        answer: 'Totalmente. Conectamos la app móvil con tus CRMs, ERPs, sistemas de facturación o cualquier API preexistente.',
      },
    ],
  },
  'diseno-ux-ui': {
    slug: 'diseno-ux-ui',
    title: 'Diseño UX/UI y Diseño de Producto Digital',
    shortTitle: 'Diseño UX/UI',
    metaTitle: 'Agencia de Diseño UX/UI y Producto Digital en México | Creati',
    metaDescription: 'Diseño de interfaces atractivas, intuitivas y orientadas a la conversión. Sistemas de diseño escalables y prototipado interactivo.',
    heroBadge: 'Diseño Estratégico & CRO',
    summary: 'Transformamos problemas complejos de negocio en flujos simples y placenteros. Diseñamos con datos reales, pruebas de usabilidad y foco implacable en la conversión.',
    deliverables: [
      'Investigación de usuarios, mapas de empatía y user journeys',
      'Wireframes y prototipos interactivos en Figma de alta fidelidad',
      'Sistemas de diseño completos (Tokens, componentes accesibles WCAG AA)',
      'Pruebas de usabilidad y auditorías de experiencia de usuario',
    ],
    techStack: ['Figma', 'Design Tokens', 'Tailwind CSS', 'Radix UI', 'Storybook', 'Framer'],
    benefits: [
      { title: 'Reducción de Fricción', desc: 'Flujos intuitivos que reducen drásticamente las dudas y el abandono de los usuarios.' },
      { title: 'Alineación de Marca', desc: 'Estética visual sofisticada y moderna que proyecta solidez, confianza y valor premium.' },
      { title: 'Facilidad de Desarrollo', desc: 'Entregables técnicos listos para producción que agilizan el trabajo de los desarrolladores sin retrabajos.' },
    ],
    faqs: [
      {
        question: '¿Cuál es la diferencia entre UI y UX?',
        answer: 'La UX (User Experience) define la lógica, facilidad y estructura de navegación para resolver la necesidad del usuario. La UI (User Interface) define la estética visual, tipografía, colores y microinteracciones de cada pantalla.',
      },
    ],
  },
  'inteligencia-artificial-aplicada': {
    slug: 'inteligencia-artificial-aplicada',
    title: 'Soluciones con Inteligencia Artificial y Agentes LLM',
    shortTitle: 'Inteligencia Artificial',
    metaTitle: 'Soluciones de Inteligencia Artificial para Empresas | Creati',
    metaDescription: 'Implementación de agentes de IA, automatización con LLMs y búsqueda semántica RAG para optimizar operaciones empresariales en México.',
    heroBadge: 'GenAI & Autonomous Agents',
    summary: 'Llevamos la IA más allá del hype. Integramos modelos de lenguaje avanzados, agentes autónomos y pipelines de datos para multiplicar la productividad de tu equipo.',
    deliverables: [
      'Agentes autónomos de atención al cliente y soporte 24/7',
      'Sistemas RAG (Retrieval-Augmented Generation) sobre bases documentales',
      'Extracción inteligente de datos desde documentos, PDFs y facturas',
      'Automatización de redacción y enriquecimiento semántico de inventarios',
    ],
    techStack: ['OpenAI API', 'Anthropic Claude', 'Gemini API', 'LangChain / LlamaIndex', 'Pinecone / Qdrant', 'Python / Fastify'],
    benefits: [
      { title: 'Ahorro Operativo Masivo', desc: 'Automatiza tareas repetitivas de análisis y redacción para liberar el talento estratégico de tu equipo.' },
      { title: 'Respuestas Grounded sin Alucinaciones', desc: 'Modelos conectados a la base de conocimiento privada de tu organización con referencias auditables.' },
      { title: 'Integración Segura', desc: 'Privacidad de datos empresariales de nivel bancario sin entrenar modelos públicos con tu información.' },
    ],
    faqs: [
      {
        question: '¿Mi empresa necesita una infraestructura especial para usar IA?',
        answer: 'No necesariamente. Desplegamos soluciones serverless en la nube que se conectan de forma segura a tus sistemas mediante APIs de alto rendimiento.',
      },
    ],
  },
}
