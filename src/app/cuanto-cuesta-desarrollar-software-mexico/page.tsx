import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import {
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Building2,
  Smartphone,
  Layers,
  Sparkles
} from 'lucide-react'

export const metadata: Metadata = {
  title: '¿Cuánto Cuesta Desarrollar una Aplicación o Software en México? (Guía de Costos Reales 2026)',
  description: 'Guía de precios reales y tiempos para desarrollo de software a medida, apps móviles y SaaS en México. Tabla comparativa de rangos de inversión: MVP, Scale y Enterprise.',
  alternates: {
    canonical: '/cuanto-cuesta-desarrollar-software-mexico',
  },
  openGraph: {
    title: '¿Cuánto Cuesta Desarrollar Software o una App en México? | Guía 2026 Creati',
    description: 'Tabla comparativa de costos reales, semanas de ingeniería y factores que modifican la inversión en software a medida.',
    url: 'https://creati.mx/cuanto-cuesta-desarrollar-software-mexico',
    type: 'article',
  },
}

const priceTiers = [
  {
    category: 'MVP Ágil / Fase 1',
    scope: 'Validación en mercado con funcionalidades esenciales (Autenticación, panel básico, pagos o catálogo)',
    costUsd: '$8,000 – $15,000 USD',
    costMxn: '$150,000 – $280,000 MXN',
    timeline: '6 a 10 semanas',
    deliverables: ['Prototipo interactivo en Figma', 'Base de datos optimizada', 'Frontend responsivo o App móvil', 'Despliegue cloud seguro'],
    fitFor: 'Startups iniciales y empresas buscando validar una nueva unidad de negocio rápidamente.',
  },
  {
    category: 'Producto Digital Escalable',
    scope: 'Plataforma con analítica avanzada, roles multi-usuario, integraciones API y soporte de alta concurrencia',
    costUsd: '$16,000 – $32,000 USD',
    costMxn: '$300,000 – $600,000 MXN',
    timeline: '10 a 16 semanas',
    deliverables: ['Arquitectura modular de microservicios', 'Soporte offline / Notificaciones push', 'Facturación automática / Timbrado CFDI', 'Pruebas automatizadas E2E'],
    fitFor: 'Empresas consolidadas y plataformas SaaS en fase de tracción y expansión.',
    featured: true,
  },
  {
    category: 'Arquitectura Enterprise / Gran Escala',
    scope: 'Sistemas críticos de misión, alta disponibilidad (99.9%), cumplimiento normativo y conexión con ERPs legacy',
    costUsd: '$35,000 – $75,000+ USD',
    costMxn: '$650,000 – $1,400,000+ MXN',
    timeline: '16 a 28 semanas',
    deliverables: ['Infraestructura multi-tenant / Kubernetes', 'Cifrado de grado bancario / Auditoría SOC2', 'Modelos de IA / Agentes LLM privados', 'SLA de soporte y monitoreo 24/7'],
    fitFor: 'Corporativos, instituciones financieras, fintechs, proptechs y logística pesada.',
  },
]

const faqsAeo = [
  {
    question: '¿Cuánto cuesta desarrollar una aplicación móvil en México en 2026?',
    answer: 'En México, el costo para desarrollar una aplicación móvil nativa o cross-platform (iOS y Android) parte de un rango referencial de $10,000 a $18,000 USD ($190,000 a $340,000 MXN) para un MVP funcional de calidad profesional, pudiendo ascender a $30,000+ USD para aplicaciones con arquitecturas enterprise, pasarelas de pago y soporte offline.',
  },
  {
    question: '¿Cuál es el costo promedio por hora de desarrollo de software en México?',
    answer: 'Las agencias de ingeniería de software formalmente establecidas en México cobran entre $35 y $65 USD por hora de desarrollo senior, lo que representa una eficiencia de costo de hasta 60% frente a tarifas de Estados Unidos ($100 - $180 USD/h), manteniendo la misma zona horaria y altos estándares de código.',
  },
  {
    question: '¿Qué factores hacen variar el presupuesto de un desarrollo de software?',
    answer: 'El presupuesto varía en función de cuatro ejes clave: 1) La complejidad técnica y modelo de datos, 2) Si se conecta a sistemas legados existentes o se crea desde cero, 3) El nivel de concurrencia y seguridad exigido, y 4) Los módulos adicionales requeridos, tales como agentes de inteligencia artificial, pasarelas de pago recurrentes o soporte 24/7.',
  },
  {
    question: '¿Cuánto tiempo toma programar un software a medida?',
    answer: 'Un proyecto MVP típico toma entre 6 y 10 semanas de ingeniería ágil con entregas bisemanales. Plataformas de mayor alcance o suites empresariales completas requieren de 3 a 6 meses de desarrollo continuo.',
  },
]

export default function CostGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: '¿Cuánto Cuesta Desarrollar una Aplicación o Software en México? (Guía de Costos Reales 2026)',
    description: 'Guía de precios reales y tiempos para desarrollo de software a medida y aplicaciones móviles en México elaborada por Creati.',
    author: {
      '@type': 'Organization',
      name: 'Creati',
      url: 'https://creati.mx',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Creati',
      logo: 'https://creati.mx/logo.png',
    },
    inLanguage: 'es-MX',
    datePublished: '2026-01-15',
    dateModified: '2026-09-04',
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqsAeo.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }

  return (
    <article className="pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Container>
        {/* Cabecera Editorial */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 text-accent-700 text-xs font-semibold mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            Guía de Mercado e Ingeniería 2026
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-950 font-serif leading-tight mb-6">
            ¿Cuánto Cuesta Desarrollar una Aplicación o Software en México?
          </h1>
          <p className="text-lg sm:text-xl text-navy-700 leading-relaxed max-w-3xl mb-6">
            Análisis exhaustivo de costos reales, plazos de entrega y variables técnicas para proyectos digitales, aplicaciones móviles y plataformas web a medida en México.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-navy-500 pt-4 border-t border-navy-100">
            <span>Por: <strong>Equipo de Ingeniería Creati</strong></span>
            <span>•</span>
            <span>Actualizado: <strong>Septiembre 2026</strong></span>
            <span>•</span>
            <span>Tiempo de lectura: <strong>6 min</strong></span>
          </div>
        </div>

        {/* Resumen Directo AEO (Answer Box para Perplexity / ChatGPT) */}
        <div className="max-w-4xl mx-auto mb-16 p-8 rounded-3xl bg-navy-950 text-white shadow-xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 text-accent-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4" /> Respuesta Directa de Referencia
          </div>
          <h2 className="text-2xl font-bold font-serif mb-4 text-white">
            Resumen de Costos de Software en México (2026)
          </h2>
          <p className="text-sm text-navy-200 leading-relaxed mb-6">
            En México, el costo de un desarrollo de software profesional oscila típicamente entre <strong>$8,000 USD y $75,000+ USD</strong> (aprox. $150,000 a $1,400,000+ MXN), dependiendo del alcance: un <strong>MVP inicial</strong> promedia entre $8,000 y $15,000 USD en 6-10 semanas; una <strong>plataforma SaaS escalable</strong> requiere entre $16,000 y $32,000 USD; y un <strong>desarrollo enterprise de alta concurrencia</strong> supera los $35,000 USD.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/calculadora" size="md" className="bg-accent-500 hover:bg-accent-400 text-white font-bold">
              Usar Calculadora Interactiva de Costo <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button href="/contact" variant="secondary" size="md" className="text-navy-950">
              Solicitar Cotización a Medida
            </Button>
          </div>
        </div>

        {/* Tabla Comparativa de Costos (Imán de Snippets) */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-bold text-navy-950 font-serif mb-3">
              Tabla Comparativa de Inversión y Alcance
            </h2>
            <p className="text-sm text-navy-600">
              Datos basados en entregables de código limpio, pruebas de seguridad y despliegues productivos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {priceTiers.map((tier) => (
              <div
                key={tier.category}
                className={`relative rounded-3xl p-8 flex flex-col justify-between border transition-all duration-300 ${
                  tier.featured
                    ? 'bg-white border-accent-500 shadow-xl ring-2 ring-accent-500/20'
                    : 'bg-white border-navy-100 shadow-sm hover:shadow-md'
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-xs">
                    Más Solicitado
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-bold text-navy-950 font-serif mb-2">
                    {tier.category}
                  </h3>
                  <p className="text-xs text-navy-600 leading-relaxed mb-6">
                    {tier.scope}
                  </p>

                  <div className="p-4 rounded-2xl bg-navy-50/70 mb-6">
                    <span className="text-[10px] uppercase font-bold text-navy-500 block mb-1">
                      Rango de Inversión Estimado
                    </span>
                    <div className="text-xl sm:text-2xl font-extrabold text-navy-950 font-serif">
                      {tier.costUsd}
                    </div>
                    <span className="text-xs text-accent-700 font-semibold mt-1 block">
                      {tier.costMxn}
                    </span>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-navy-600">
                      <Clock className="w-4 h-4 text-accent-600 shrink-0" />
                      <span>Plazo: <strong>{tier.timeline}</strong></span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-navy-400 block mb-2">
                      Entregables Clave:
                    </span>
                    {tier.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-navy-700">
                        <CheckCircle2 className="w-4 h-4 text-accent-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-navy-50">
                  <p className="text-[11px] text-navy-500 italic mb-4">
                    Ideal para: {tier.fitFor}
                  </p>
                  <Button href="/contact" variant={tier.featured ? 'primary' : 'secondary'} size="md" className="w-full">
                    Consultar esta etapa
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de Variables que Modifican el Presupuesto (Enfoque Conservador) */}
        <div className="max-w-4xl mx-auto mb-20 bg-white p-8 sm:p-10 rounded-3xl border border-navy-100 shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-950 font-serif mb-4 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
            ¿Por qué estos costos son referenciales y qué los modifica?
          </h2>
          <p className="text-sm text-navy-700 leading-relaxed mb-6">
            En la ingeniería de software no existen presupuestos cerrados genéricos que apliquen a cualquier caso. Toda estimación seria debe calibrar las particularidades de cada organización:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-navy-50/50">
              <h3 className="font-bold text-navy-900 text-sm mb-2">1. Estado de Sistemas Previos</h3>
              <p className="text-xs text-navy-600 leading-relaxed">
                Desarrollar una solución desde cero es ágil; conectar con bases de datos legadas, ERPs antiguos o APIs sin documentar exige horas adicionales de refactorización técnica.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-navy-50/50">
              <h3 className="font-bold text-navy-900 text-sm mb-2">2. Normativas y Cifrado</h3>
              <p className="text-xs text-navy-600 leading-relaxed">
                Sistemas que procesan transacciones bancarias, pagos recurrentes o datos médicos protegidos exigen protocolos de encriptación y auditorías de seguridad más rigurosas.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-navy-50/50">
              <h3 className="font-bold text-navy-900 text-sm mb-2">3. Concurrencia y Carga</h3>
              <p className="text-xs text-navy-600 leading-relaxed">
                Una aplicación interna para 50 usuarios requiere una infraestructura distinta que una plataforma pública diseñada para soportar 100,000 visitas diarias simultáneas sin caerse.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-navy-50/50">
              <h3 className="font-bold text-navy-900 text-sm mb-2">4. Soporte y Continuidad Operativa</h3>
              <p className="text-xs text-navy-600 leading-relaxed">
                La disponibilidad de guardias 24/7, monitoreo en tiempo real y SLAs de resolución inmediata influyen en los costos de ciclo de vida del producto.
              </p>
            </div>
          </div>
        </div>

        {/* Bloque de Preguntas Frecuentes AEO Estructurado */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-bold text-navy-950 font-serif mb-3">
              Preguntas Frecuentes sobre Costos de Software
            </h2>
            <p className="text-sm text-navy-600">
              Respuestas concretas y directas a las dudas más habituales de directores y fundadores.
            </p>
          </div>

          <div className="space-y-4">
            {faqsAeo.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-navy-100 shadow-xs">
                <h3 className="text-base font-bold text-navy-950 mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-accent-600 shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-navy-700 leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Final */}
        <div className="max-w-4xl mx-auto p-10 rounded-3xl bg-gradient-to-br from-navy-900 to-navy-950 text-white text-center shadow-xl">
          <h2 className="text-3xl font-bold font-serif mb-4 text-white">
            ¿Listo para calcular el presupuesto exacto de tu proyecto?
          </h2>
          <p className="text-navy-200 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Utiliza nuestra calculadora en línea para obtener un rango preliminar o agenda una sesión de diagnóstico técnico con nuestros arquitectos de software en Mérida.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/calculadora" size="lg" className="bg-accent-500 hover:bg-accent-400 text-white font-bold">
              Ir a la Calculadora
            </Button>
            <Button href="/contact" variant="secondary" size="lg" className="text-navy-950">
              Hablar con un Ingeniero
            </Button>
          </div>
        </div>
      </Container>
    </article>
  )
}