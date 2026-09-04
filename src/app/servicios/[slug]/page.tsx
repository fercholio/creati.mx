import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { servicesData } from '@/lib/services-data'
import { ArrowLeft, CheckCircle2, ChevronRight, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = servicesData[slug]

  if (!service) {
    return { title: 'Servicio no encontrado' }
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `/servicios/${slug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://creati.mx/servicios/${slug}`,
      type: 'article',
    },
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = servicesData[slug]

  if (!service) {
    notFound()
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Creati',
      url: 'https://creati.mx',
    },
    areaServed: ['Mérida', 'Yucatán', 'México'],
    serviceType: service.shortTitle,
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://creati.mx',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Servicios',
        item: 'https://creati.mx/servicios',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.shortTitle,
        item: `https://creati.mx/servicios/${service.slug}`,
      },
    ],
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((f) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Container>
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-navy-500 mb-8">
          <Link href="/" className="hover:text-navy-900 transition-colors">Inicio</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/servicios" className="hover:text-navy-900 transition-colors">Servicios</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy-950 font-semibold">{service.shortTitle}</span>
        </nav>

        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 text-accent-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {service.heroBadge}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-950 mb-6 font-serif leading-tight">
            {service.title}
          </h1>
          <p className="text-lg sm:text-xl text-navy-700 leading-relaxed max-w-3xl mb-8">
            {service.summary}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/contact" size="lg" className="bg-accent-600 hover:bg-accent-500 text-white">
              Cotizar este servicio
            </Button>
            <Button href="/servicios" variant="secondary" size="lg" className="border-navy-200">
              <ArrowLeft className="w-4 h-4 mr-2" /> Explorar todos los servicios
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2 space-y-12">
            <section className="bg-white p-8 sm:p-10 rounded-3xl border border-navy-100 shadow-sm">
              <h2 className="text-2xl font-bold text-navy-950 mb-6 font-serif">
                ¿Qué incluye esta solución?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.deliverables.map((d, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-navy-50/50">
                    <CheckCircle2 className="w-5 h-5 text-accent-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-navy-800">{d}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-navy-950 font-serif">
                Ventajas Competitivas para tu Empresa
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {service.benefits.map((b, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white border border-navy-100 shadow-xs">
                    <ShieldCheck className="w-6 h-6 text-accent-600 mb-3" />
                    <h3 className="font-bold text-navy-900 mb-2 text-base">{b.title}</h3>
                    <p className="text-xs text-navy-600 leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-navy-50/60 p-8 rounded-3xl border border-navy-100">
              <div className="flex items-center gap-2 text-navy-900 font-bold mb-6 text-xl font-serif">
                <HelpCircle className="w-5 h-5 text-accent-600" />
                Preguntas frecuentes sobre {service.shortTitle}
              </div>
              <div className="space-y-6">
                {service.faqs.map((f, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-navy-100">
                    <h3 className="font-bold text-navy-900 mb-2 text-sm sm:text-base">
                      {f.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-navy-600 leading-relaxed">
                      {f.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="p-6 rounded-3xl bg-white border border-navy-100 shadow-sm">
              <h3 className="font-bold text-navy-950 mb-4 text-base">
                Stack Tecnológico Recomendado
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-navy-50 text-navy-800 text-xs font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-navy-900 to-navy-950 text-white shadow-md">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-400 mb-2 block">
                Garantía de Calidad Creati
              </span>
              <h3 className="text-xl font-bold mb-3 font-serif">
                Construye con un equipo probado
              </h3>
              <p className="text-xs text-navy-200 leading-relaxed mb-6">
                Hemos desarrollado plataformas líderes como Brokar y Abogalia. Ponemos esa misma experiencia al servicio de tu empresa.
              </p>
              <Button href="/contact" size="md" className="w-full bg-accent-500 hover:bg-accent-400 text-white">
                Agendar llamada técnica
              </Button>
            </div>
          </aside>
        </div>
      </Container>
    </article>
  )
}