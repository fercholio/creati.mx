'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Building2,
  Clock,
  Truck,
  Brain,
  CreditCard,
  MessageSquare,
  Sparkles,
  Play,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Database,
  Layers,
  Landmark,
  FileCode,
  Send,
  Server,
  Cpu,
} from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { ShowroomModal } from '@/components/showroom/ShowroomModal'

const SECTORS = [
  {
    id: 'proptech',
    label: '🏢 Inmobiliarias & Condominios',
    title: 'Automatización de accesos, lotes y cobro condominal',
    solutions: [
      {
        id: 'livu',
        name: 'LIVU · Control Residencial',
        tagline: 'Pases QR en caseta en 6 segundos y recaudación por SPEI.',
        highlight: 'Sin filas en caseta · Morosidad -85%',
        tech: ['QR Dinámico', 'SPEI Banxico', 'App Móvil'],
      },
      {
        id: 'estateflow',
        name: 'EstateFlow · Masterplan & Lotes',
        tagline: 'Mapa interactivo de lotes, corridas a 36 MSI y apartado bancario.',
        highlight: 'Cotización en 10 seg · Cierres +38%',
        tech: ['Interactive Canvas', 'Stripe', 'PDF Auto'],
      },
    ],
  },
  {
    id: 'operations',
    label: '💼 Operaciones & Inteligencia IA',
    title: 'Inteligencia de costo horario, rentabilidad y agentes de IA',
    solutions: [
      {
        id: 'novabrain',
        name: 'NovaBrain AI · Agente Autónomo',
        tagline: 'Atención por WhatsApp 24/7, cotización en vivo y lectura de contratos.',
        highlight: 'Respuesta < 1.5s · Atención 24/7',
        tech: ['Groq AI', 'OpenAI GPT-4o', 'WhatsApp API'],
      },
      {
        id: 'hrtci',
        name: 'HR-TCI / Tempus · Time & Cost',
        tagline: 'Costeo horario real de nómina y auditoría de productividad.',
        highlight: 'Margen +30% · Timesheet 1-Tap',
        tech: ['Costing Engine', 'Vue 3', 'Laravel 11'],
      },
    ],
  },
  {
    id: 'logistics',
    label: '🚚 Logística & Cadena de Frío',
    title: 'Telemetría de temperatura en ruta y entregas certificadas',
    solutions: [
      {
        id: 'routeops',
        name: 'RouteOps · Torre de Control',
        tagline: 'Monitoreo a -18°C en tiempo real y manifiesto con firma y GPS.',
        highlight: 'Merma -85% · SLA 99.4%',
        tech: ['Sensores IoT', 'Firma GPS', 'WebSockets'],
      },
    ],
  },
  {
    id: 'integrations',
    label: '🔌 Integraciones SAP, SPEI & SAT',
    title: 'Conexión transparente con los sistemas que ya utiliza tu empresa',
    solutions: [
      {
        id: 'hrtci',
        name: 'Enterprise API Bridge',
        tagline: 'Sincroniza inventarios, cartera y facturación CFDI 4.0 con tu ERP.',
        highlight: '100% Tiempo Real · 0 Errores',
        tech: ['SAP B1 API', 'Intelisis', 'SAT CFDI 4.0', 'AWS'],
      },
    ],
  },
]

export function IntegrationsGrid() {
  const [activeSectorId, setActiveSectorId] = useState<string>('proptech')
  const [selectedAppId, setSelectedAppId] = useState<string>('livu')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const currentSector = SECTORS.find((s) => s.id === activeSectorId) || SECTORS[0]

  const handleOpenDemo = (appId: string) => {
    setSelectedAppId(appId)
    setIsModalOpen(true)
  }

  return (
    <section className="py-16 lg:py-24 bg-[#f8fafc] relative overflow-hidden font-[family-name:var(--font-display)]" id="integrations">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-accent-100/30 rounded-full blur-[140px] pointer-events-none" />

      <Container>
        {/* Simplified Non-Overwhelming Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-50 text-accent-700 text-xs font-extrabold border border-accent-100 mb-3 shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-accent-500" />
              Soluciones & Integraciones
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
            className="text-xs sm:text-sm text-gray-600 font-sans mt-3 max-w-xl mx-auto leading-relaxed"
          >
            Selecciona tu industria para ver la plataforma y las integraciones exactas sin complicaciones.
          </motion.p>
        </div>

        {/* Clean Sector Tab Switcher */}
        <div className="flex items-center justify-center flex-wrap gap-2 max-w-4xl mx-auto mb-10">
          {SECTORS.map((sector) => {
            const isActive = sector.id === activeSectorId
            return (
              <button
                key={sector.id}
                onClick={() => setActiveSectorId(sector.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-navy-900 text-white shadow-md shadow-navy-950/10 ring-2 ring-accent-400/30 scale-[1.02]'
                    : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                }`}
              >
                <span>{sector.label}</span>
              </button>
            )
          })}
        </div>

        {/* Active Sector Content (Clean 2-column or 1-column card view) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSectorId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto bg-white rounded-[32px] border border-gray-200/90 p-6 sm:p-8 shadow-sm relative overflow-hidden"
          >
            <div className="border-b border-gray-100 pb-4 mb-6">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-accent-600 bg-accent-50 px-2.5 py-0.5 rounded-full border border-accent-100">
                Enfoque Operativo
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-navy-950 mt-1 font-[family-name:var(--font-display)]">
                {currentSector.title}
              </h3>
            </div>

            {/* Solution Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {currentSector.solutions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-gray-50 hover:bg-accent-50/40 border border-gray-100 hover:border-accent-300 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-navy-950 group-hover:text-accent-600 transition-colors">
                        {item.name}
                      </h4>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-sans">
                        ✓ {item.highlight}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 font-sans leading-relaxed">
                      {item.tagline}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1 font-sans">
                      {item.tech.map((t) => (
                        <span key={t} className="text-[10px] bg-white text-gray-700 px-2 py-0.5 rounded border border-gray-200 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenDemo(item.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-navy-900 hover:bg-accent-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs group-hover:shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Probar Demostración en Vivo</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>

      {/* Showroom Interactive Studio Modal */}
      <ShowroomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialAppId={selectedAppId}
      />
    </section>
  )
}
