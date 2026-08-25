'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Key, Clock, MessageSquare, FileCheck, CheckCircle2, Lock, Zap } from 'lucide-react'
import { Container } from '@/components/layout/Container'

const GUARANTEES = [
  {
    title: 'Propiedad 100% del Código Fuente & IP',
    description: 'Tú eres el único dueño del software, la base de datos y la propiedad intelectual. Sin pagos de licenciamiento eterno ni candados.',
    icon: Key,
    badge: 'Propiedad Total',
  },
  {
    title: 'Entregas Semanales Probables (SLA)',
    description: 'Todos los viernes recibes un avance ejecutable funcional para probar con tu equipo desde la primera semana de proyecto.',
    icon: Clock,
    badge: 'Avances Continuos',
  },
  {
    title: 'Soporte y Acompañamiento Local',
    description: 'Atención personalizada directa por ingenieros de nuestro equipo en Mérida. Respuestas rápidas sin intermediarios ni bots.',
    icon: MessageSquare,
    badge: 'Soporte Mérida',
  },
  {
    title: 'Cumplimiento Normativo & Cifrado Bancario',
    description: 'Estándares de seguridad bancaria SSL/AES-256, facturación SAT CFDI 4.0, firma NOM-151 y expediente médico NOM-024.',
    icon: Lock,
    badge: 'Seguridad Empresarial',
  },
]

export function TrustGuarantees() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden" id="guarantees">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-4 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Garantías de Ingeniería & Certidumbre
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] text-gray-900 tracking-tight leading-[1.15]"
          >
            El compromiso de desarrollo que da{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-accent-500 to-navy-600 bg-clip-text text-transparent">
              tranquilidad a tu empresa
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            Sabemos que la confianza se construye con hechos. Por eso respaldamos cada proyecto con acuerdos claros y transparencia técnica inquebrantable.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GUARANTEES.map((g, idx) => {
            const Icon = g.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-gray-50/80 p-6 rounded-3xl border border-gray-200/90 shadow-2xs hover:shadow-lg hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold bg-white border border-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                      {g.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2 font-[family-name:var(--font-display)]">
                    {g.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {g.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
