'use client'

import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Animations'
import { EditorialStack } from '@/components/ui/MagazineImages'
import { images } from '@/lib/images'

export function AboutHero() {
  return (
    <section className="pt-32 pb-20 lg:pt-44 lg:pb-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-warm-100/30 rounded-full blur-3xl" />
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div className="max-w-xl">
            <Reveal>
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-4">
                Nuestra historia
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] text-gray-900 leading-[1.1] mb-6">
                Hacemos software para{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
                  personas reales
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-gray-500 leading-relaxed">
                Creati nació de una frustración simple: demasiado software es difícil de usar.
                No porque los usuarios no entiendan, sino porque nadie se tomó el tiempo de
                entender a los usuarios.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-lg text-gray-500 leading-relaxed mt-4">
                Creemos que la tecnología existe para simplificar la vida, no para complicarla.
                Cada producto que construimos empieza y termina con las personas que lo van a usar.
              </p>
            </Reveal>
          </div>

          {/* Magazine editorial image stack */}
          <Reveal delay={0.2}>
            <EditorialStack
              images={[
                images.about.workspace,
                images.about.brainstorm,
              ]}
              className="lg:ml-auto max-w-md lg:max-w-lg"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
