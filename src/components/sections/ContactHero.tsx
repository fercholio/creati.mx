'use client'

import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Animations'
import { Mail, MapPin } from 'lucide-react'
import { contactInfo } from '@/lib/constants'

export function ContactHero() {
  return (
    <section className="pt-32 pb-12 lg:pt-44 lg:pb-16 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/3 w-[400px] h-[400px] bg-indigo-100/20 rounded-full blur-3xl" />
      </div>

      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-4">
              Contacto
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-display)] text-gray-900 leading-tight mb-6">
              Construyamos algo{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
                juntos
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-gray-500 leading-relaxed mb-8">
              Cuéntanos sobre tu proyecto o idea. Respondemos en menos de 24 horas.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
              <a href={`mailto:${contactInfo.email}`} className="inline-flex items-center gap-2 hover:text-indigo-600 transition-colors">
                <Mail className="w-4 h-4 text-indigo-400" />
                {contactInfo.email}
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-400" />
                {contactInfo.location}
              </span>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
