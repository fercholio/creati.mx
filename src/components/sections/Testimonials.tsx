'use client'

import { Container } from '@/components/layout/Container'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Animations'
import { testimonials } from '@/lib/constants'
import { Quote, Star } from 'lucide-react'

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <Container>
        <div className="text-center mb-16">
          <Reveal>
            <p className="text-xs font-bold text-accent-600 uppercase tracking-widest mb-4">
              Autoridad y Prueba Social
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-navy-950 leading-tight">
              Líderes que escalan sus empresas con Creati
            </h2>
          </Reveal>
        </div>

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <StaggerItem key={t.author}>
              <div className="relative rounded-3xl bg-gradient-to-br from-navy-50/40 to-white border border-navy-100 p-8 hover:shadow-md hover:border-accent-200 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-navy-200 mb-3 shrink-0" />
                <p className="text-sm text-navy-700 leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-navy-50">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center text-white text-xs font-bold shadow-xs">
                    {t.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-950">{t.author}</p>
                    <p className="text-xs text-navy-500">{t.role}</p>
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