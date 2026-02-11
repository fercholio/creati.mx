'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Animations'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: '¿Qué tipo de proyectos hacen?',
    answer: 'Desarrollamos aplicaciones web, móviles, plataformas SaaS y herramientas internas. Si involucra software y usuarios, nos interesa.',
  },
  {
    question: '¿Cuánto cuesta un proyecto?',
    answer: 'Depende del alcance. Trabajamos con presupuestos desde proyectos MVP hasta plataformas enterprise. Siempre damos un estimado claro antes de empezar.',
  },
  {
    question: '¿Cuánto tiempo toma un proyecto?',
    answer: 'Un MVP típico toma de 6 a 12 semanas. Proyectos más complejos pueden tomar 3-6 meses. Siempre entregamos en fases para que veas progreso real desde la semana uno.',
  },
  {
    question: '¿Trabajan con equipos remotos?',
    answer: 'Sí. Nuestro equipo es remoto-first. Trabajamos con clientes en toda Latinoamérica y Estados Unidos. La comunicación clara es nuestra prioridad.',
  },
  {
    question: '¿Qué pasa después del lanzamiento?',
    answer: 'Ofrecemos planes de soporte y evolución continua. Tu producto sigue mejorando basado en datos reales de uso y feedback de usuarios.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-gray-500 leading-relaxed pb-5">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ() {
  return (
    <section className="py-16 lg:py-24" id="faq">
      <Container>
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-4">
                Preguntas frecuentes
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] text-gray-900">
                Lo que siempre nos preguntan
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl bg-white border border-gray-100 px-6 divide-y-0">
              {faqs.map((faq) => (
                <FAQItem key={faq.question} {...faq} />
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
