'use client'

import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Animations'
import { Lightbulb, PenTool, Code2, RefreshCw } from 'lucide-react'

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
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-50/40 rounded-full blur-3xl" />
      </div>

      <Container>
        <div className="text-center mb-16">
          <Reveal>
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-4">
              Nuestro enfoque
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] text-gray-900 leading-tight">
              Cómo hacemos software diferente
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {approaches.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="rounded-2xl bg-white border border-gray-100 p-6 hover:shadow-lg hover:shadow-gray-100/50 hover:-translate-y-0.5 transition-all duration-300 h-full">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
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
