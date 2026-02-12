'use client'

import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Animations'
import { companyValues } from '@/lib/constants'
import { Heart, Sparkles, Gem, Rocket } from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Gem: <Gem className="w-6 h-6" />,
  Rocket: <Rocket className="w-6 h-6" />,
}

export function Values() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <Container>
        <div className="mb-16">
          <Reveal>
            <p className="text-xs font-semibold text-accent-500 uppercase tracking-widest mb-4">
              Nuestros valores
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] text-gray-900 leading-tight max-w-lg">
              Lo que nos guía cada día
            </h2>
          </Reveal>
        </div>

        {/* Organic layout — alternating alignment */}
        <div className="space-y-8 max-w-4xl">
          {companyValues.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.1} direction={i % 2 === 0 ? 'left' : 'right'}>
              <div
                className={`flex flex-col sm:flex-row gap-6 items-start ${
                  i % 2 !== 0 ? 'sm:ml-auto sm:max-w-lg' : 'sm:max-w-lg'
                }`}
              >
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-accent-50 text-accent-500 flex items-center justify-center">
                  {iconMap[value.icon]}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 font-[family-name:var(--font-display)]">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
