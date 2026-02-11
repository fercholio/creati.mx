'use client'

import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Animations'
import { steps } from '@/lib/constants'

export function HowItWorks() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-indigo-50/50 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <Container>
        <div className="text-center mb-16">
          <Reveal>
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-4">
              Cómo trabajamos
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] text-gray-900 leading-tight">
              De idea a producto en tres pasos
            </h2>
          </Reveal>
        </div>

        <div className="max-w-3xl mx-auto space-y-0">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.15}>
              <div className="relative flex gap-6 pb-12 last:pb-0 group">
                {/* Vertical line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-[27px] top-14 bottom-0 w-px bg-gradient-to-b from-indigo-200 to-transparent" />
                )}

                {/* Number */}
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-indigo-200 group-hover:shadow-lg group-hover:shadow-indigo-200 transition-shadow">
                  {step.number}
                </div>

                {/* Content */}
                <div className="pt-2">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 font-[family-name:var(--font-display)]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                    {step.description}
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
