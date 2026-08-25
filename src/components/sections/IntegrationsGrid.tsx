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
  Code2,
} from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { ShowroomModal } from '@/components/showroom/ShowroomModal'

interface PurposeGroup {
  category: string
  items: string[]
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
  techSpecs: PurposeGroup[]
}

const SECTORS: SectorInfo[] = [
  {
    id: 'integrations',
    label: '🔌 Integraciones SAP, SPEI & SAT',
    title: 'Conexión transparente con la infraestructura actual de tu empresa',
    description: 'Conectamos tus sistemas actuales con webhooks y APIs automáticas para sincronizar datos sin sustituir tu software.',
    solutions: [
      {
        id: 'novabrain',
        name: 'Enterprise API Bridge & Conectores ERP',
        tagline: 'Sincroniza inventarios, cartera, pagos bancarios y facturación CFDI 4.0 directamente con tu ERP.',
        highlight: '100% Tiempo Real · 0 Errores',
        tech: ['SAP Business One', 'Intelisis ERP', 'SAT CFDI 4.0', 'SPEI Banxico', 'Stripe', 'Amazon AWS'],
      },
    ],
    techSpecs: [
      {
        category: 'ERPs & Sistemas Contables',
        items: ['SAP Business One API Directa', 'Intelisis ERP Sincronización', 'Microsip Conector de Inventarios'],
      },
      {
        category: 'Pagos & Facturación Fiscal',
        items: ['SPEI Banxico Pago Inmediato', 'SAT CFDI 4.0 Auto-Factura', 'Stripe Payments Tarjetas', 'MercadoPago / BBVA API'],
      },
      {
        category: 'Notificaciones & Canales',
        items: ['WhatsApp Business API 24/7', 'Twilio SMS & Correo Autómata', 'Pases en Apple & Google Wallet'],
      },
      {
        category: 'Infraestructura & Servidores',
        items: ['Amazon Web Services (AWS)', 'Groq AI Fast LLM (0.38s)', 'Nube de Alta Disponibilidad 99.9%'],
      },
    ],
  },
  {
    id: 'proptech',
    label: '🏢 Inmobiliarias & Condominios',
    title: 'Automatización de accesos, lotes y cobro condominal',
    description: 'Ecosistema de código propio diseñado para acelerar cierres de venta, cobrar cuotas y autorizar visitas.',
    solutions: [
      {
        id: 'livu',
        name: 'LIVU · Control Residencial & Caseta',
        tagline: 'Pases QR en caseta en 6 segundos y recaudación automatizada por SPEI con recibo fiscal.',
        highlight: 'Sin filas en caseta · Morosidad -85%',
        tech: ['Pases QR Dinámicos', 'SPEI Banxico', 'Stripe', 'WhatsApp API', 'SAP B1 API'],
      },
      {
        id: 'estateflow',
        name: 'EstateFlow · Masterplan & Lotes',
        tagline: 'Mapa interactivo de lotes, corridas a 36 MSI y apartado bancario instantáneo.',
        highlight: 'Cotización en 10 seg · Cierres +38%',
        tech: ['Mapa Interactivo HTML5', 'Stripe API', 'Cotizador PDF Auto', 'Amazon AWS'],
      },
    ],
    techSpecs: [
      {
        category: 'Cobranza & Recaudación',
        items: ['SPEI Banxico Directo', 'Stripe Cobro con Tarjeta'],
      },
      {
        category: 'Control de Caseta & Accesos',
        items: ['Lectura de Placas (LPR)', 'Pases QR Dinámicos con Expiración'],
      },
      {
        category: 'Experiencia del Usuario',
        items: ['Portal Táctil e Intuitivo', 'Cotizaciones Financieras en PDF'],
      },
      {
        category: 'Notificaciones & Seguridad',
        items: ['Respaldo Seguro en Amazon AWS', 'Confirmaciones por WhatsApp', 'Base de Datos Cifrada'],
      },
    ],
  },
  {
    id: 'operations',
    label: '💼 Operaciones & Inteligencia IA',
    title: 'Inteligencia de costo horario, rentabilidad y agentes de IA',
    description: 'Modelos predictivos y agentes autónomos orientados a aumentar el margen operativo de tu empresa.',
    solutions: [
      {
        id: 'novabrain',
        name: 'NovaBrain AI · Agente Autónomo B2B',
        tagline: 'Atención por WhatsApp 24/7, cotización en vivo y lectura de contratos en 0.4s.',
        highlight: 'Respuesta < 1.5s · Atención 24/7',
        tech: ['Groq AI (Fast LLM)', 'OpenAI GPT-4o', 'WhatsApp Business API', 'Auditoría PDF OCR'],
      },
      {
        id: 'hrtci',
        name: 'HR-TCI / Tempus · Time & Cost Intelligence',
        tagline: 'Costeo horario real de nómina y auditoría de productividad impulsada por IA.',
        highlight: 'Margen +30% · Timesheet 1-Tap',
        tech: ['Costeo Horario Real', 'Dashboard Gerencial', 'Motor de Auditoría IA'],
      },
    ],
    techSpecs: [
      {
        category: 'Motor de Inteligencia Artificial',
        items: ['Groq AI Inferencia Ultra-Rápida (0.38s)', 'OpenAI GPT-4o Visión & Documentos'],
      },
      {
        category: 'Auditoría de Documentos',
        items: ['Lectura OCR de Contratos en PDF', 'Validación Fiscal de Facturas SAT'],
      },
      {
        category: 'Atención & Ventas 24/7',
        items: ['WhatsApp Business API Automático', 'Portal Gerencial de Métricas'],
      },
      {
        category: 'Garantías de Plataforma',
        items: ['Velocidad de Respuesta Sub-Segundo', 'Servidores Escalables Sin Caídas', 'Cifrado de Información'],
      },
    ],
  },
  {
    id: 'logistics',
    label: '🚚 Logística & Cadena de Frío',
    title: 'Telemetría de temperatura en ruta y entregas certificadas',
    description: 'Visibilidad total de la cadena de frío con sensores en tiempo real y evidencia digital inviolable.',
    solutions: [
      {
        id: 'routeops',
        name: 'RouteOps · Torre de Control',
        tagline: 'Monitoreo a -18°C en tiempo real y manifiesto de entrega con firma digital y GPS.',
        highlight: 'Merma -85% · SLA 99.4%',
        tech: ['Sensores IoT (-18°C)', 'Alertas al Celular', 'Google Maps API', 'Firma GPS Digital'],
      },
    ],
    techSpecs: [
      {
        category: 'Telemetría & Cadena de Frío',
        items: ['Sensores IoT de Temperatura (-18°C)', 'Alertas Instantáneas al Celular'],
      },
      {
        category: 'Rutas & Geolocalización',
        items: ['Google Maps Platform API', 'Trazabilidad de Rutas en Tiempo Real'],
      },
      {
        category: 'Evidencia Legal & Entregas',
        items: ['Firma Digital NOM-151', 'Comprobante Fotográfico con GPS'],
      },
      {
        category: 'Garantía de Servicio',
        items: ['Servidor de Alta Disponibilidad 99.9%', 'Respaldo Cloud en Amazon AWS', 'Historial Inviolable de Viaje'],
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
    <section className="py-16 lg:py-24 bg-[#fafafa] relative overflow-hidden font-[family-name:var(--font-display)]" id="integrations">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-accent-100/20 rounded-full blur-[140px] pointer-events-none" />

      <Container>
        {/* Sleek Minimalist Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-50 text-accent-700 text-xs font-bold border border-accent-100 mb-3 shadow-2xs">
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
                    ? 'bg-navy-950 text-white shadow-md shadow-navy-950/15 ring-1 ring-navy-800 scale-[1.01]'
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="max-w-5xl mx-auto bg-white rounded-[32px] border border-gray-200 p-6 sm:p-9 shadow-xs relative overflow-hidden space-y-8"
          >
            {/* Top Header of Active Sector */}
            <div className="border-b border-gray-100 pb-5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent-600 bg-accent-50 px-3 py-1 rounded-full border border-accent-100">
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
                  className="p-6 rounded-2xl bg-gray-50/60 hover:bg-accent-50/30 border border-gray-200/80 hover:border-accent-300 transition-all flex flex-col justify-between space-y-5 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-lg font-bold text-navy-950 group-hover:text-accent-600 transition-colors">
                        {item.name}
                      </h4>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/60 font-sans shrink-0">
                        {item.highlight}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 font-sans leading-relaxed">
                      {item.tagline}
                    </p>

                    {/* Tech Pills Directly Under Card Title */}
                    <div className="pt-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 font-sans">
                        Tecnología & Integraciones Clave:
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5 font-sans">
                        {item.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-semibold text-navy-900 bg-white px-2.5 py-1 rounded-md border border-gray-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenDemo(item.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-navy-900 hover:bg-accent-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs group-hover:shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Probar Demostración en Vivo</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>

            {/* MINIMALIST EXECUTIVE TECH SPECS FOOTER (Sobrio, Elegante y Monocromático) */}
            <div className="pt-6 border-t border-gray-200/80 font-sans space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-navy-800" />
                  <span>Garantías de Infraestructura & Ecosistema</span>
                </span>
                <span className="text-[10px] font-mono text-gray-400">
                  Arquitectura Empresarial B2B
                </span>
              </div>

              {/* Minimalist 4-Column Spec Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
                {currentSector.techSpecs.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-2">
                    <span className="text-[10px] font-extrabold text-navy-900 uppercase tracking-wider block border-b border-gray-100 pb-1">
                      {group.category}
                    </span>
                    <ul className="space-y-1 text-xs text-gray-600">
                      {group.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0" />
                          <span className="font-medium text-gray-700 leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
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
