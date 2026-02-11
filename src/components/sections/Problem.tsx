'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Animations'
import { images } from '@/lib/images'

export function Problem() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Editorial image — magazine style */}
          <Reveal>
            <div className="relative">
              <motion.div
                className="relative z-10 overflow-hidden rounded-2xl lg:rounded-3xl shadow-2xl shadow-gray-200/50"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4 }}
              >
                <div className="aspect-[4/5] md:aspect-[3/4]">
                  <img
                    src={images.problem.frustrated.src}
                    alt={images.problem.frustrated.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  {/* Dark overlay with stat */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <p className="text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] text-white mb-1">
                      88%
                    </p>
                    <p className="text-sm text-white/70">
                      de los usuarios abandona un producto<br />por mal diseño
                    </p>
                  </div>
                </div>
              </motion.div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl lg:rounded-3xl border-2 border-navy-100 -z-10" />
            </div>
          </Reveal>

          {/* Text content */}
          <div className="max-w-lg">
            <Reveal>
              <p className="text-xs font-semibold text-navy-600 uppercase tracking-widest mb-4">
                El problema
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] text-gray-900 leading-tight mb-6">
                La mayoría del software no se hizo para{' '}
                <span className="text-gray-300 line-through decoration-gold-400 decoration-2">máquinas</span>{' '}
                <span className="text-navy-600">personas</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-gray-500 leading-relaxed mb-8">
                Interfaces confusas. Flujos innecesarios. Funciones que nadie pidió.
                La industria se acostumbró a software difícil y lo llamó &ldquo;normal&rdquo;.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-navy-100 to-gold-100 rounded-2xl blur-sm" />
                <div className="relative bg-white rounded-2xl px-8 py-6 border border-gray-100 shadow-sm">
                  <p className="text-base font-medium text-gray-800">
                    En Creati, cada producto empieza con una pregunta:{' '}
                    <span className="text-navy-600 font-semibold">¿esto mejora la vida de alguien?</span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
