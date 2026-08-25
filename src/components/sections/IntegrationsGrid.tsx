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
  Star,
  Check,
} from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { ShowroomModal } from '@/components/showroom/ShowroomModal'

interface PurposeGroup {
  purpose: string
  techList: { name: string; isStar?: boolean }[]
}

interface SectorInfo {
  id: string
  label: string
  title: string
  description: string
  solutions: {
    id: string
    name: string
    tagline: string
    highlight: string
    tech: string[]
  }[]
  purposeGroups: PurposeGroup[]
}

const SECTORS: SectorInfo[] = [
  {
    id: 'integrations',
    label: '🔌 Integraciones SAP, SPEI & SAT',
    title: 'Conexión transparente con los sistemas que ya utiliza tu empresa',
    description: 'Diseñamos conectores webhooks y APIs robustas para sincronizar datos en tiempo real.',
    solutions: [
      {
        id: 'novabrain',
        name: 'Enterprise API Bridge & Conectores Webhooks',
        tagline: 'Sincroniza inventarios, cartera, pagos bancarios y facturación CFDI 4.0 directamente con tu ERP.',
        highlight: '100% Tiempo Real · 0 Errores',
        tech: ['SAP B1 API', 'Intelisis', 'SAT CFDI 4.0', 'AWS', 'SPEI Banxico', 'Stripe'],
      },
    ],
    purposeGroups: [
      {
        purpose: 'ERPs & Sistemas Contables',
        techList: [
          { name: 'SAP Business One API', isStar: true },
          { name: 'Intelisis ERP Webhooks', isStar: true },
          { name: 'Microsip Sync', isStar: false },
        ],
      },
      {
        purpose: 'Pagos, Bancos & Facturación SAT',
        techList: [
          { name: 'SPEI Banxico Directo', isStar: true },
          { name: 'SAT CFDI 4.0 Auto-Factura', isStar: true },
          { name: 'Stripe Payments API', isStar: true },
          { name: 'MercadoPago & BBVA API', isStar: false },
        ],
      },
      {
        purpose: 'Canales & Notificaciones',
        techList: [
          { name: 'WhatsApp Business API', isStar: true },
          { name: 'Twilio SMS & SendGrid', isStar: false },
          { name: 'Apple & Google Wallet', isStar: true },
        ],
      },
      {
        purpose: 'Infraestructura Cloud & IA',
        techList: [
          { name: 'Amazon Web Services (AWS)', isStar: true },
          { name: 'Groq AI Fast LLM (0.38s)', isStar: true },
          { name: 'Docker / Kubernetes', isStar: false },
        ],
      },
    ],
  },
  {
    id: 'proptech',
    label: '🏢 Inmobiliarias & Condominios',
    title: 'Automatización de accesos, lotes y cobro condominal',
    description: 'Ecosistema de código propio diseñado para optimizar el ciclo de venta, recaudación y control de visitas.',
    solutions: [
      {
        id: 'livu',
        name: 'LIVU · Control Residencial',
        tagline: 'Pases QR en caseta en 6 segundos y recaudación automatizada por SPEI con recibo fiscal.',
        highlight: 'Sin filas en caseta · Morosidad -85%',
        tech: ['SAP B1 API', 'SPEI Banxico', 'Stripe', 'Twilio WhatsApp', 'PostgreSQL'],
      },
      {
        id: 'estateflow',
        name: 'EstateFlow · Masterplan & Lotes',
        tagline: 'Mapa interactivo de lotes, corridas a 36 MSI y apartado bancario instantáneo.',
        highlight: 'Cotización en 10 seg · Cierres +38%',
        tech: ['Next.js 16', 'Stripe API', 'PDF Auto Generator', 'AWS S3'],
      },
    ],
    purposeGroups: [
      {
        purpose: 'Recaudación & Bancos',
        techList: [
          { name: 'SPEI Banxico Directo', isStar: true },
          { name: 'Stripe Payments API', isStar: true },
        ],
      },
      {
        purpose: 'Hardware & Accesos IoT',
        techList: [
          { name: 'LPR Camera Vision (Caseta)', isStar: true },
          { name: 'Pases QR Dinámicos', isStar: true },
        ],
      },
      {
        purpose: 'Frontend & Experiencia Táctil',
        techList: [
          { name: 'Next.js 16 App Router', isStar: true },
          { name: 'Framer Motion UI', isStar: false },
        ],
      },
      {
        purpose: 'Notificaciones & Almacenamiento',
        techList: [
          { name: 'Twilio WhatsApp API', isStar: false },
          { name: 'PostgreSQL Database', isStar: false },
          { name: 'AWS S3 Cloud', isStar: false },
        ],
      },
    ],
  },
  {
    id: 'operations',
    label: '💼 Operaciones & Inteligencia IA',
    title: 'Inteligencia de costo horario, rentabilidad y agentes de IA',
    description: 'Modelos predictivos y agentes autónomos conectados a tus flujos de trabajo.',
    solutions: [
      {
        id: 'novabrain',
        name: 'NovaBrain AI · Agente Autónomo B2B',
        tagline: 'Atención por WhatsApp 24/7, cotización en vivo y lectura de contratos en 0.4s.',
        highlight: 'Respuesta < 1.5s · Atención 24/7',
        tech: ['Groq AI Fast LLM', 'OpenAI GPT-4o', 'WhatsApp Business API', 'RAG Vector DB'],
      },
      {
        id: 'hrtci',
        name: 'HR-TCI / Tempus · Time & Cost Intelligence',
        tagline: 'Costeo horario real de nómina y auditoría de productividad impulsada por IA.',
        highlight: 'Margen +30% · Timesheet 1-Tap',
        tech: ['Costing Engine', 'Vue 3', 'Laravel 11 API', 'Redis Cache'],
      },
    ],
    purposeGroups: [
      {
        purpose: 'Motor de Inteligencia Artificial',
        techList: [
          { name: 'Groq AI Fast LLM (0.38s)', isStar: true },
          { name: 'OpenAI GPT-4o Multimodal', isStar: true },
        ],
      },
      {
        purpose: 'Base de Conocimiento & RAG',
        techList: [
          { name: 'LangChain & RAG Vector DB', isStar: true },
          { name: 'Python 3.12 FastAPI', isStar: false },
        ],
      },
      {
        purpose: 'Canales & Atención 24/7',
        techList: [
          { name: 'WhatsApp Business API', isStar: true },
          { name: 'Vue 3 / React 19 Dashboards', isStar: false },
        ],
      },
      {
        purpose: 'Infraestructura & Microservicios',
        techList: [
          { name: 'Node.js Engine', isStar: false },
          { name: 'Redis Cache', isStar: false },
          { name: 'Docker & Kubernetes', isStar: false },
        ],
      },
    ],
  },
  {
    id: 'logistics',
    label: '🚚 Logística & Cadena de Frío',
    title: 'Telemetría de temperatura en ruta y entregas certificadas',
    description: 'Visibilidad total de la cadena de frío con sensores IoT y firma digital inviolable.',
    solutions: [
      {
        id: 'routeops',
        name: 'RouteOps · Torre de Control',
        tagline: 'Monitoreo a -18°C en tiempo real y manifiesto de entrega con firma digital y GPS.',
        highlight: 'Merma -85% · SLA 99.4%',
        tech: ['IoT Telemetry', 'WebSockets', 'Google Maps API', 'AWS IoT Core'],
      },
    ],
    purposeGroups: [
      {
        purpose: 'Telemetría & Sensores IoT',
        techList: [
          { name: 'Sensores IoT (-18°C)', isStar: true },
          { name: 'WebSockets Real-Time', isStar: true },
        ],
      },
      {
        purpose: 'Rutas & Geolocalización',
        techList: [
          { name: 'Google Maps Platform API', isStar: true },
          { name: 'PostgreSQL Spatial / GIS', isStar: false },
        ],
      },
      {
        purpose: 'Certificación & Evidencia Digital',
        techList: [
          { name: 'Firma Digital NOM-151', isStar: true },
          { name: 'Manifiesto GPS Inviolable', isStar: false },
        ],
      },
      {
        purpose: 'Infraestructura & Cloud',
        techList: [
          { name: 'Laravel 11 Backend API', isStar: false },
          { name: 'AWS IoT Core Cluster', isStar: false },
          { name: 'Docker Containers', isStar: false },
        ],
      },
    ],
  },
]

export function IntegrationsGrid() {
  const [activeSectorId, setActiveSectorId] = useState<string>('integrations')
  const [selectedAppId, setSelectedAppId] = useState<string>('novabrain')
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
              Ecosistema Tecnológico & Conectores API
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
            Transformamos tareas manuales y cuellos de botella en flujos digitales automatizados integrados a la infraestructura de tu empresa.
          </motion.p>
        </div>

        {/* Clean Sector Tab Switcher */}
        <div className="flex items-center justify-center flex-wrap gap-2 max-w-5xl mx-auto mb-10">
          {SECTORS.map((sector) => {
            const isActive = sector.id === activeSectorId
            return (
              <button
                key={sector.id}
                onClick={() => setActiveSectorId(sector.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-navy-950 text-white shadow-md shadow-navy-950/20 ring-2 ring-accent-400/30 scale-[1.02]'
                    : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                }`}
              >
                <span>{sector.label}</span>
              </button>
            )
          })}
        </div>

        {/* Active Sector Window */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSectorId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl mx-auto bg-white rounded-[36px] border border-gray-200/90 p-6 sm:p-9 shadow-sm relative overflow-hidden space-y-8"
          >
            {/* Top Header of Active Sector */}
            <div className="border-b border-gray-100 pb-5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-accent-600 bg-accent-50 px-3 py-1 rounded-full border border-accent-100">
                Enfoque Operativo & Arquitectura
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-navy-950 mt-2 font-[family-name:var(--font-display)]">
                {currentSector.title}
              </h3>
              <p className="text-xs text-gray-600 font-sans mt-1">
                {currentSector.description}
              </p>
            </div>

            {/* Solution Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentSector.solutions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-gray-50/70 hover:bg-accent-50/40 border border-gray-200/80 hover:border-accent-300 transition-all flex flex-col justify-between space-y-5 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-lg font-bold text-navy-950 group-hover:text-accent-600 transition-colors">
                        {item.name}
                      </h4>
                      <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-200 font-sans shrink-0">
                        ✓ {item.highlight}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 font-sans leading-relaxed">
                      {item.tagline}
                    </p>

                    {/* Tech Pills Directly Under Card Title */}
                    <div className="pt-2">
                      <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block mb-1.5 font-sans">
                        Tecnología & Integraciones Clave:
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5 font-sans">
                        {item.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-bold text-navy-900 bg-white px-2.5 py-1 rounded-lg border border-gray-200 shadow-2xs"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenDemo(item.id)}
                    className="w-full py-3 px-4 rounded-xl bg-navy-900 hover:bg-accent-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm group-hover:shadow-md"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Probar Demostración en Vivo</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>

            {/* Ecosistema Tecnológico por Área Operativa */}
            <div className="pt-6 border-t border-gray-200/90 font-sans space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-navy-950 uppercase tracking-wider flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                  <span>Infraestructura & Ecosistema de Integraciones por Área Operativa:</span>
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {currentSector.purposeGroups.reduce((acc, g) => acc + g.techList.length, 0)} Conectores Activos
                </span>
              </div>

              {/* Purpose Group Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentSector.purposeGroups.map((group, groupIdx) => (
                  <div
                    key={groupIdx}
                    className="p-4 bg-slate-50/90 rounded-2xl border border-slate-200/80 space-y-2.5"
                  >
                    <span className="text-[11px] font-bold text-accent-700 uppercase tracking-wider block">
                      🚀 Área: {group.purpose}
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {group.techList.map((techItem, techIdx) => (
                        <span
                          key={techIdx}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 border shadow-2xs ${
                            techItem.isStar
                              ? 'bg-white text-navy-950 border-amber-300 font-bold'
                              : 'bg-white text-slate-700 border-slate-200'
                          }`}
                        >
                          {techItem.isStar ? (
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />
                          ) : (
                            <Check className="w-3 h-3 text-emerald-500 stroke-[3] shrink-0" />
                          )}
                          <span>{techItem.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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
