import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { ShowroomHub } from '@/components/showroom/ShowroomHub'
import { SocialShareCards } from '@/components/ui/SocialShareCards'
import { Sparkles, Tablet, CheckCircle, ArrowLeft, ShieldCheck, HeartHandshake, Zap, Award, QrCode } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Showroom Interactivo & Soluciones de Software | Creati.mx',
  description:
    'Explora y prueba en vivo aplicaciones de software a la medida para desarrollos inmobiliarios, hotelería, logística, clínicas y fintech.',
}

export default function ShowroomPage() {
  return (
    <main className="min-h-screen pt-28 sm:pt-36 pb-20 relative overflow-hidden bg-[#fafafa]">
      {/* Background decoration matching Home page */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-accent-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-accent-100/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-[350px] h-[350px] bg-navy-100/20 rounded-full blur-3xl" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(36, 59, 83, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(36, 59, 83, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <Container>
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 text-accent-600 text-xs font-bold border border-accent-100 mb-4 shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-accent-500" />
            <span>Ecosistema de Soluciones Creati · Demostración Ejecutiva</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-[family-name:var(--font-display)] text-gray-900 tracking-tight leading-[1.15]">
            Prueba la tecnología en vivo que{' '}
            <span className="bg-gradient-to-r from-accent-600 via-accent-500 to-navy-600 bg-clip-text text-transparent">
              impulsará tu empresa
            </span>
          </h1>

          <p className="text-sm sm:text-base text-gray-600 mt-4 leading-relaxed max-w-2xl mx-auto">
            Explora nuestro catálogo de plataformas especializadas. Selecciona cualquier solución para experimentar su interfaz, interactuar con los flujos operativos en vivo y visualizar el impacto directo en tu negocio.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-gray-700">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Experiencia Táctil & Ejecutiva</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Simulador de Operaciones en Vivo</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Adaptado a tu Industria</span>
          </div>
        </div>

        {/* Interactive Showroom Grid & Studio Modal */}
        <ShowroomHub initialAppId="estateflow" isStandalonePage={true} />

        {/* Executive Brochure Card with QR & Social Share Section */}
        <div className="mt-20 border-t border-gray-200 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-extrabold border border-amber-200 mb-2">
              <QrCode className="w-3.5 h-3.5 text-amber-600" />
              Brochure Impreso & Tarjetas para Redes Sociales
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-[family-name:var(--font-display)]">
              Descarga o Escanea el Brochure con QR
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Ideal para compartir en reuniones con clientes, redes sociales o imprimir en carpetas comerciales.
            </p>
          </div>

          <SocialShareCards />
        </div>

        {/* Commercial Banner */}
        <div className="mt-20 p-8 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-sm text-center max-w-3xl mx-auto relative overflow-hidden">
          <div className="w-12 h-12 bg-accent-50 text-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-accent-100">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-[family-name:var(--font-display)]">
            ¿Necesitas una solución diseñada a la medida de tu modelo operativo?
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-xl mx-auto leading-relaxed">
            Construimos plataformas personalizadas con integraciones a tus sistemas actuales (SAP, Microsip, Intelisis, Stripe, WhatsApp API, SAT/CFDI).
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-accent-200"
            >
              Agendar Workshop de Arquitectura Técnica
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold transition-colors"
            >
              Volver a la Página Principal
            </Link>
          </div>
        </div>
      </Container>
    </main>
  )
}
