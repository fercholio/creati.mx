import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { servicesData } from '@/lib/services-data'
import { ArrowRight, CheckCircle2, Sparkles, Layers, Smartphone, Palette, Cpu } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Servicios de Ingeniería de Software, Apps Móviles y Soluciones IA',
  description: 'Descubre nuestros servicios de desarrollo de software a medida, apps móviles, diseño UX/UI e inteligencia artificial en México.',
  alternates: {
    canonical: '/servicios',
  },
}

const iconsMap: Record<string, typeof Layers> = {
  'desarrollo-software-a-medida': Layers,
  'desarrollo-aplicaciones-moviles': Smartphone,
  'diseno-ux-ui': Palette,
  'inteligencia-artificial-aplicada': Cpu,
}

export default function ServicesIndexPage() {
  const servicesList = Object.values(servicesData)

  const serviceBreadcrumbJsonLd = {
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
    ],
  }

  return (
    <div className="pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceBreadcrumbJsonLd) }}
      />
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 text-accent-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Capacidades de Ingeniería de Élite
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-navy-950 mb-6 font-serif">
            Servicios de Software Diseñados para Escalar
          </h1>
          <p className="text-lg text-navy-700 leading-relaxed">
            Combinamos artesanía de código, estética visual premium y arquitectura moderna en la nube para crear ventajas competitivas duraderas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {servicesList.map((srv) => {
            const IconComponent = iconsMap[srv.slug] || Layers
            return (
              <div
                key={srv.slug}
                className="group relative flex flex-col justify-between p-8 rounded-2xl bg-white border border-navy-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-accent-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center text-accent-600 mb-6 group-hover:bg-accent-600 group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-accent-600">
                    {srv.heroBadge}
                  </span>
                  <h2 className="text-2xl font-bold text-navy-900 mt-2 mb-3">
                    {srv.title}
                  </h2>
                  <p className="text-navy-600 text-sm leading-relaxed mb-6">
                    {srv.summary}
                  </p>

                  <div className="space-y-2 mb-6">
                    {srv.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-navy-700">
                        <CheckCircle2 className="w-4 h-4 text-accent-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-navy-50">
                  <Link
                    href={`/servicios/${srv.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-navy-950 group-hover:text-accent-600 transition-colors"
                  >
                    Ver detalles del servicio <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-20 p-10 rounded-3xl bg-navy-950 text-white text-center max-w-4xl mx-auto relative overflow-hidden">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 font-serif">
            ¿Tienes un reto técnico o una idea en mente?
          </h3>
          <p className="text-navy-200 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Analizamos la factibilidad técnica y te presentamos una propuesta de arquitectura y costos en menos de 24 horas.
          </p>
          <Button href="/contact" size="lg" className="bg-accent-500 hover:bg-accent-400 text-white">
            Iniciar conversación técnica
          </Button>
        </div>
      </Container>
    </div>
  )
}
