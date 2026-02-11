'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Animations'
import { Lightbulb, PenTool, Code2, RefreshCw } from 'lucide-react'
import { images } from '@/lib/images'

const approaches = [
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: 'Descubrir antes de construir',
    description: 'Invertimos tiempo real en entender el problema. Entrevistas, observación, datos — no suposiciones.',
  },
  {
    icon: <PenTool className="w-5 h-5" />,
    title: 'Diseño que se prueba',
    description: 'Cada pantalla se valida con usuarios reales antes de llegar a desarrollo. Zero sorpresas en el lanzamiento.',
  },
  {
    icon: <Code2 className="w-5 h-5" />,
    title: 'Código que escala',
    description: 'Arquitecturas limpias, testing automático, CI/CD. Tu producto crece sin deuda técnica.',
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: 'Mejora continua',
    description: 'Después del lanzamiento sigue el trabajo más importante: escuchar, medir y mejorar.',
  },
]

export function Approach() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-navy-50/40 rounded-full blur-3xl" />
      </div>

      <Container>
        {/* Full-bleed editorial image */}
        <Reveal>
          <motion.div
            className="relative mb-16 lg:mb-20 overflow-hidden rounded-2xl lg:rounded-3xl"
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-[21/9] md:aspect-[3/1]">
              <img
                src={images.about.laptopWork.src}
                alt={images.about.laptopWork.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900/60 via-navy-900/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 lg:p-10">
              <p className="text-xs font-semibold text-navy-200 uppercase tracking-widest mb-2">
                Nuestro enfoque
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-display)] text-white leading-tight">
                Cómo hacemos software diferente
              </h2>
            </div>
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl lg:rounded-3xl" />
          </motion.div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {approaches.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="rounded-2xl bg-white border border-gray-100 p-6 hover:shadow-lg hover:shadow-gray-100/50 hover:-translate-y-0.5 transition-all duration-300 h-full">
                <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-600 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2 font-[family-name:var(--font-display)]">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
