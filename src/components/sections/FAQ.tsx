'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Animations'
import { ChevronDown } from 'lucide-react'
import { faqs } from '@/lib/constants'

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false)
  const panelId = `faq-panel-${index}`

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={open}
        aria-controls={panelId}
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
            id={panelId}
            role="region"
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
              {faqs.map((faq, index) => (
                <FAQItem key={faq.question} {...faq} index={index} />
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
