'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Animations'
import { steps } from '@/lib/constants'
import { images } from '@/lib/images'

const stepImages = [
  images.howItWorks.listen,
  images.howItWorks.design,
  images.howItWorks.build,
]

export function HowItWorks() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-indigo-50/50 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <Container>
        <div className="text-center mb-16 lg:mb-20">
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

        <div className="space-y-16 lg:space-y-24 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.1}>
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  i % 2 !== 0 ? 'lg:direction-rtl' : ''
                }`}
              >
                {/* Image — alternates sides */}
                <motion.div
                  className={`relative ${i % 2 !== 0 ? 'lg:order-2' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 shadow-lg shadow-gray-200/30">
                    <img
                      src={stepImages[i].src}
                      alt={stepImages[i].alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />

                  {/* Floating step number badge */}
                  <div className={`absolute -top-4 ${i % 2 !== 0 ? '-left-4' : '-right-4'} w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-indigo-200 z-10`}>
                    {step.number}
                  </div>
                </motion.div>

                {/* Content */}
                <div className={`${i % 2 !== 0 ? 'lg:order-1 lg:text-right' : ''}`}>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-display)]">
                    {step.title}
                  </h3>
                  <p className="text-base text-gray-500 leading-relaxed max-w-md ${i % 2 !== 0 ? 'lg:ml-auto' : ''}">
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
