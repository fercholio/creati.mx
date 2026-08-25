'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Cpu, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'
import { Container } from '@/components/layout/Container'

const INTEGRATIONS = [
  { category: 'ERPs & Sistemas Contables', items: ['SAP Business One', 'Intelisis ERP', 'Microsip', 'Zoho One', 'Salesforce'] },
  { category: 'Pagos & Bancos México', items: ['Stripe Payments', 'SPEI / Banxico Directo', 'SAT CFDI 4.0', 'MercadoPago', 'BBVA API'] },
  { category: 'Canales & Notificaciones', items: ['WhatsApp Business API', 'Twilio SMS', 'SendGrid', 'Apple Push Notifications', 'Firebase'] },
  { category: 'Infraestructura & IA', items: ['Amazon Web Services (AWS)', 'Google Cloud', 'Groq AI (Fast LLM)', 'OpenAI API', 'Docker / Kubernetes'] },
]

export function IntegrationsGrid() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden" id="integrations">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 text-accent-600 text-xs font-bold border border-accent-100 mb-4 shadow-2xs">
              <Cpu className="w-3.5 h-3.5 text-accent-500" />
              Integraciones Empresariales & APIs
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] text-gray-900 tracking-tight leading-[1.15]"
          >
            Conectamos con la infraestructura tecnológica que{' '}
            <span className="bg-gradient-to-r from-accent-600 via-accent-500 to-navy-600 bg-clip-text text-transparent">
              ya utiliza tu empresa
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            No tienes que reemplazar tus sistemas actuales. Diseñamos conectores webhooks y APIs robustas para sincronizar datos en tiempo real.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INTEGRATIONS.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-xs space-y-4"
            >
              <h3 className="text-sm font-extrabold text-navy-900 border-b border-gray-100 pb-3 font-[family-name:var(--font-display)]">
                {cat.category}
              </h3>
              <div className="space-y-2">
                {cat.items.map((item) => (
                  <div key={item} className="p-2.5 bg-gray-50 hover:bg-accent-50/50 rounded-xl text-xs font-semibold text-gray-800 flex items-center justify-between transition-colors border border-gray-100">
                    <span>{item}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-500 shrink-0" />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
