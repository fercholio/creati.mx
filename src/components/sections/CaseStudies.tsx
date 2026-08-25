'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Building2,
  Truck,
  Stethoscope,
  Zap,
  CheckCircle2,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Code2,
} from 'lucide-react'
import { Container } from '@/components/layout/Container'

const AUTOMATION_CASES = [
  {
    title: 'Automatización Comercial & Cotizaciones en Vivo',
    industry: 'Ventas & Sector Inmobiliario',
    icon: Building2,
    accentColor: 'text-amber-600 bg-amber-50 border-amber-200',
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
    accentColor: 'text-accent-600 bg-accent-50 border-accent-200',
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
    accentColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
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
    <section className="py-20 lg:py-28 bg-[#f8fafc] relative overflow-hidden font-[family-name:var(--font-display)]" id="cases">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-100/25 rounded-full blur-[140px] pointer-events-none" />

      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-50 text-accent-700 text-xs font-extrabold border border-accent-100 mb-3 shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-accent-500" />
              Ingeniería de Procesos & Automatización
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-[1.15]"
          >
            Soluciones diseñadas para automatizar procesos y{' '}
            <span className="bg-gradient-to-r from-accent-600 via-accent-500 to-navy-700 bg-clip-text text-transparent">
              elevar el rendimiento
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-xs sm:text-sm text-gray-600 font-sans mt-3 max-w-2xl mx-auto leading-relaxed"
          >
            Transformamos tareas manuales, cuellos de botella y procesos lentos en flujos digitales automatizados que reducen tiempos de respuesta y aumentan la productividad de tu equipo.
          </motion.p>
        </div>

        {/* 3 Executive Automation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
          {AUTOMATION_CASES.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-[28px] border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Card Header Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-bold shadow-2xs ${item.accentColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold text-navy-900 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider font-sans">
                      {item.industry}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-navy-950 leading-tight group-hover:text-accent-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Problem vs Solution Boxes */}
                  <div className="space-y-2.5 text-xs font-sans">
                    <div className="p-3 bg-red-50/60 rounded-2xl border border-red-100 text-gray-700">
                      <strong className="text-red-900 font-bold block mb-0.5">Cuello de Botella Tradicional:</strong>
                      {item.problem}
                    </div>
                    <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-gray-700">
                      <strong className="text-emerald-900 font-bold block mb-0.5">Flujo Automatizado Creati:</strong>
                      {item.solution}
                    </div>
                  </div>

                  {/* Impact Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center border-t border-gray-100 font-sans">
                    {item.metrics.map((m, i) => (
                      <div key={i} className="p-2 bg-gray-50 rounded-xl">
                        <p className="text-sm sm:text-base font-black text-navy-950">{m.value}</p>
                        <p className="text-[9px] font-bold text-gray-500 mt-0.5">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Explicit Tech Stack Pills */}
                <div className="mt-6 pt-3.5 border-t border-gray-100 font-sans">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                    Tecnología & Frameworks:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tech.map((t) => (
                      <span key={t} className="text-[10px] font-bold text-navy-900 bg-gray-100 px-2.5 py-1 rounded-lg border border-gray-200/80">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
