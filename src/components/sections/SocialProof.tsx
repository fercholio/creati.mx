'use client'

import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Animations'

const logos = [
  'LogiTrack', 'HealthBridge', 'EduFlow', 'NovaTech', 'Meridian',
]

export function SocialProof() {
  return (
    <section className="py-12 border-y border-gray-100 bg-white/50">
      <Container>
        <Reveal>
          <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">
            Empresas que confían en nosotros
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {logos.map((name) => (
              <div
                key={name}
                className="text-gray-300 font-bold text-lg font-[family-name:var(--font-display)] tracking-tight hover:text-accent-400 transition-colors duration-300 cursor-default"
              >
                {name}
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
