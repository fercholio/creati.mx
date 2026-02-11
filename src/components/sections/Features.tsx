'use client'

import { Container } from '@/components/layout/Container'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Animations'
import { features } from '@/lib/constants'
import { Users, Code2, Brain, Zap} from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="w-6 h-6" />,
  Code2: <Code2 className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
}

export function Features() {
  return (
    <section className="py-24 lg:py-32 bg-white" id="servicios">
      <Container>
        <div className="text-center mb-16">
          <Reveal>
            <p className="text-xs font-semibold text-navy-600 uppercase tracking-widest mb-4">
              Lo que hacemos
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] text-gray-900 leading-tight">
              Soluciones completas, un solo equipo
            </h2>
          </Reveal>
        </div>

        {/* Bento Grid */}
        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 max-w-4xl mx-auto">
          {features.map((feature, i) => (
            <StaggerItem key={feature.title}>
              <div
                className={`group relative rounded-2xl border border-gray-100 bg-white p-7 transition-all duration-300 hover:shadow-xl hover:shadow-gray-100/50 hover:-translate-y-1 overflow-hidden ${
                  i === 0 ? 'md:row-span-1' : ''
                }`}
              >
                {/* Gradient accent on hover */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl`}
                />

                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.accent} text-white mb-5 shadow-sm`}
                >
                  {iconMap[feature.icon]}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-[family-name:var(--font-display)]">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
