'use client'

import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Animations'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900" />
      <div className="absolute inset-0 -z-10 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-warm-400/10 rounded-full blur-3xl -z-10" />

      <Container className="text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] text-white leading-tight mb-6">
            ¿Listo para crear algo
            <br />
            <span className="text-warm-300">extraordinario</span>?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-indigo-200 max-w-xl mx-auto mb-10 leading-relaxed">
            Cuéntanos tu idea. No importa la etapa — una servilleta, un prototipo o un producto existente.
            Estamos aquí para ayudar.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/contact"
              size="lg"
              className="bg-white text-indigo-700 hover:bg-indigo-50 shadow-lg shadow-indigo-900/20 hover:shadow-xl"
            >
              Hablemos de tu proyecto
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
