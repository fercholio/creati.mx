'use client'

import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Animations'

const products = [
  { name: 'Brokar', subtitle: 'PropTech CRM & Marketplace' },
  { name: 'Abogalia', subtitle: 'LegalTech & Bóveda Cifrada' },
  { name: 'LogiTrack', subtitle: 'Logística & Trazabilidad' },
  { name: 'HealthBridge', subtitle: 'HealthTech & Telemedicina' },
  { name: 'EduFlow', subtitle: 'EdTech & Micro-learning' },
]

export function SocialProof() {
  return (
    <section className="py-14 border-y border-navy-100/60 bg-gradient-to-b from-white to-navy-50/30">
      <Container>
        <Reveal>
          <p className="text-center text-xs font-bold text-navy-400 uppercase tracking-widest mb-8">
            Ecosistemas y plataformas impulsadas por Creati
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {products.map((p) => (
              <div
                key={p.name}
                className="group flex flex-col items-center cursor-default transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="text-navy-900 font-extrabold text-lg tracking-tight font-serif group-hover:text-accent-600 transition-colors">
                  {p.name}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-navy-400 group-hover:text-navy-600 transition-colors">
                  {p.subtitle}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}