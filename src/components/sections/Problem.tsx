'use client'

import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Animations'

export function Problem() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-4">
              El problema
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] text-gray-900 leading-tight mb-6">
              La mayoría del software no se hizo para{' '}
              <span className="text-gray-300 line-through decoration-warm-400 decoration-2">máquinas</span>{' '}
              <span className="text-indigo-600">personas</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-gray-500 leading-relaxed mb-8">
              Interfaces confusas. Flujos innecesarios. Funciones que nadie pidió.
              El 88% de los usuarios abandona un producto por mal diseño.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-warm-100 rounded-2xl blur-sm" />
              <div className="relative bg-white rounded-2xl px-8 py-6 border border-gray-100 shadow-sm">
                <p className="text-base font-medium text-gray-800">
                  En Creati, cada producto empieza con una pregunta:{' '}
                  <span className="text-indigo-600 font-semibold">¿esto mejora la vida de alguien?</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
