'use client'

import { Container } from '@/components/layout/Container'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Animations'
import { testimonials } from '@/lib/constants'
import { Quote } from 'lucide-react'

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <Container>
        <div className="text-center mb-16">
          <Reveal>
            <p className="text-xs font-semibold text-navy-600 uppercase tracking-widest mb-4">
              Lo que dicen de nosotros
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] text-gray-900 leading-tight">
              Historias de quienes confían en Creati
            </h2>
          </Reveal>
        </div>

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <StaggerItem key={t.author}>
              <div className="relative rounded-2xl bg-gradient-to-br from-cream-50 to-white border border-gray-100 p-7 hover:shadow-lg hover:shadow-gray-100/50 transition-all duration-300 h-full flex flex-col">
                <Quote className="w-8 h-8 text-navy-200 mb-4 shrink-0" />
                <p className="text-sm text-gray-700 leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy-400 to-navy-600 flex items-center justify-center text-white text-xs font-bold">
                    {t.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.author}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
