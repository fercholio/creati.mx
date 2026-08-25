'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Cpu, TrendingUp, CheckCircle, ArrowRight, Building2, Truck, Stethoscope, Sparkles, Zap, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/layout/Container'

const AUTOMATION_CASES = [
  {
    title: 'Automatización Comercial & Cotizaciones en Vivo',
    industry: 'Ventas & Sector Inmobiliario',
    icon: Building2,
    problem: 'Cotizaciones financieras manuales enviadas horas después que enfriaban el interés del cliente durante las visitas.',
    solution: 'Implementación de cotizadores paramétricos interactivos en iPad con cálculo de mensualidades y apartado digital inmediato.',
    metrics: [
      { value: '+38%', label: 'Cierre de Ventas' },
      { value: '< 10 seg', label: 'Tiempo de Cotización' },
      { value: '100%', label: 'Disponibilidad En Vivo' },
    ],
    tech: ['Next.js', 'Stripe SPEI', 'Framer Motion', 'PostgreSQL'],
  },
  {
    title: 'Automatización de Operaciones & Telemetría en Ruta',
    industry: 'Logística & Distribución',
    icon: Truck,
    problem: 'Registros manuales en papel, pérdidas por falta de monitoreo térmico en ruta y disputas por comprobantes de entrega.',
    solution: 'Torre de control en tiempo real con alertas IoT automáticas de temperatura y comprobante de entrega digital con firma y GPS.',
    metrics: [
      { value: '-85%', label: 'Incidencias en Ruta' },
      { value: '99.4%', label: 'Cumplimiento SLA' },
      { value: '-30%', label: 'Tiempo de Papeleo' },
    ],
    tech: ['IoT Telemetry', 'WebSockets', 'Laravel', 'Docker'],
  },
  {
    title: 'Automatización de Citas & Expedientes Digitales',
    industry: 'Servicios Profesionales & Salud',
    icon: Stethoscope,
    problem: 'Alto ausentismo de usuarios por olvido de citas y tiempo perdido en la captura repetitiva de historiales en papel.',
    solution: 'Recordatorios y confirmaciones automáticas por WhatsApp, recetas digitales con código QR y expediente unificado.',
    metrics: [
      { value: '-60%', label: 'Ausentismo' },
      { value: '+30%', label: 'Eficacia en Consulta' },
      { value: '0 Papel', label: 'Flujo 100% Digital' },
    ],
    tech: ['WhatsApp API', 'NOM-024', 'React', 'Node.js'],
  },
]

export function CaseStudies() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50/70 relative overflow-hidden" id="cases">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 text-accent-600 text-xs font-bold border border-accent-100 mb-4 shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-accent-500" />
              Optimización Operativa & Automatización
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] text-gray-900 tracking-tight leading-[1.15]"
          >
            Soluciones diseñadas para automatizar procesos y{' '}
            <span className="bg-gradient-to-r from-accent-600 via-accent-500 to-navy-600 bg-clip-text text-transparent">
              elevar el rendimiento
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            Transformamos tareas manuales, cuellos de botella y procesos lentos en flujos digitales automatizados que reducen tiempos de respuesta y aumentan la productividad de tu equipo.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {AUTOMATION_CASES.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-accent-50 text-accent-600 border border-accent-100 flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-accent-700 bg-accent-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {item.industry}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 font-[family-name:var(--font-display)]">
                      {item.title}
                    </h3>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-red-50/50 rounded-2xl border border-red-100 text-gray-700">
                      <strong className="text-red-900 font-bold block mb-0.5">Cuello de Botella Tradicional:</strong>
                      {item.problem}
                    </div>
                    <div className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-gray-700">
                      <strong className="text-emerald-900 font-bold block mb-0.5">Flujo Automatizado Creati:</strong>
                      {item.solution}
                    </div>
                  </div>

                  {/* Impact Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center border-t border-gray-100">
                    {item.metrics.map((m, i) => (
                      <div key={i} className="p-2 bg-gray-50 rounded-xl">
                        <p className="text-base font-extrabold text-navy-900">{m.value}</p>
                        <p className="text-[9px] font-semibold text-gray-500">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="mt-5 pt-3 border-t border-gray-100 flex flex-wrap gap-1.5">
                  {item.tech.map((t) => (
                    <span key={t} className="text-[10px] font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
