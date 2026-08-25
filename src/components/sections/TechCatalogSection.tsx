'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Play,
  ShieldCheck,
  Clock,
  Building2,
  Palmtree,
  Truck,
  Stethoscope,
  ShoppingBag,
  Coins,
  ChevronRight,
  Award,
  Cpu,
  Brain,
  Cloud,
  CheckCircle2,
  ArrowRight,
  Layers,
  Zap,
  Check,
  Bot,
  Lock,
} from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { ShowroomModal } from '@/components/showroom/ShowroomModal'

const BROCHURE_ITEMS = [
  {
    appId: 'livu',
    badge: 'Proptech & Seguridad',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    iconColor: 'bg-emerald-500 text-white',
    accentBorder: 'hover:border-emerald-400',
    title: 'LIVU · Control Residencial',
    tagline: 'Pases QR en caseta en 6 segundos y cobranza de mantenimiento por SPEI.',
    bullets: [
      'Acceso vehicular exprés con QR dinámico inviolable',
      'Cobro automatizado de mantenimiento vía SPEI/Stripe',
      'App móvil nativa para vecinos y terminal para guardias',
    ],
    impact: '-85% Morosidad · < 6 seg en caseta',
    tech: ['Next.js 16', 'Laravel API', 'QR Dinámico', 'SPEI Banxico'],
  },
  {
    appId: 'hrtci',
    badge: 'SaaS B2B & IA',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    iconColor: 'bg-indigo-600 text-white',
    accentBorder: 'hover:border-indigo-400',
    title: 'HR-TCI / Tempus · Time & Cost',
    tagline: 'Control de rentabilidad en vivo y AI Productivity Coach.',
    bullets: [
      'Costeo horario de nómina real por proyecto y cliente',
      'Flujo de aprobación semanal de timesheets con 1 tap',
      'Auditoría de productividad con Groq AI en tiempo real',
    ],
    impact: '+30% Margen · +18 hrs facturables/mes',
    tech: ['Groq AI', 'Vue 3 SPA', 'Laravel 11', 'Costing Engine'],
  },
  {
    appId: 'estateflow',
    badge: 'Inmobiliario & Lotes',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
    iconColor: 'bg-amber-500 text-white',
    accentBorder: 'hover:border-amber-400',
    title: 'EstateFlow · Masterplan & Lotes',
    tagline: 'Mapa de inventario en tiempo real y cotizaciones financieras a 36 MSI.',
    bullets: [
      'Mapa interactivo de lotes con mapa de calor de ventas',
      'Generación de corrida financiera en PDF en 10 segundos',
      'Apartado digital en vivo directo a fiduciario',
    ],
    impact: '+38% Cierres · Cotización instantánea',
    tech: ['Interactive Canvas', 'Stripe SPEI', 'PostgreSQL'],
  },
  {
    appId: 'routeops',
    badge: 'Logística & Frío',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-200',
    iconColor: 'bg-blue-600 text-white',
    accentBorder: 'hover:border-blue-400',
    title: 'RouteOps · Torre de Control',
    tagline: 'Telemetría IoT de cadena de frío (-18°C) y manifiesto de entrega digital.',
    bullets: [
      'Monitoreo continuo de temperatura en cabina de congelados',
      'Optimización de rutas con reducción de diésel ocioso',
      'Comprobante de entrega digital con firma y GPS',
    ],
    impact: '-85% Merma Térmica · 99.4% SLA',
    tech: ['IoT Sensors', 'WebSockets', 'Firma GPS', 'Docker'],
  },
  {
    appId: 'hrtci',
    badge: 'Inteligencia Artificial',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200',
    iconColor: 'bg-purple-600 text-white',
    accentBorder: 'hover:border-purple-400',
    title: 'Creati AI Agent · Agentes Autónomos',
    tagline: 'Agentes de IA entrenados con la base de conocimiento de tu empresa.',
    bullets: [
      'Atención por WhatsApp Business 24/7 sin descanso',
      'Extracción automática de datos de contratos y facturas',
      'Respuesta a cotizaciones complejas en menos de 2 segundos',
    ],
    impact: 'Atención 24/7 · < 2 seg Respuesta',
    tech: ['OpenAI GPT-4o', 'Groq AI', 'Vector DB', 'WhatsApp API'],
  },
  {
    appId: 'hrtci',
    badge: 'Integración Enterprise',
    badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-200',
    iconColor: 'bg-cyan-600 text-white',
    accentBorder: 'hover:border-cyan-400',
    title: 'Enterprise API Bridge · Conector SAP & SAT',
    tagline: 'Sincronización bidireccional con tu ERP e infraestructura actual.',
    bullets: [
      'Conexión directa con SAP Business One, Intelisis y Microsip',
      'Emisión y validación automática de facturas SAT CFDI 4.0',
      'Sincronización de inventario y cartera en tiempo real',
    ],
    impact: '100% Tiempo Real · 0 Errores',
    tech: ['SAP B1 API', 'Intelisis Webhooks', 'SAT CFDI 4.0', 'AWS'],
  },
  {
    appId: 'medikcore',
    badge: 'Salud & Clínicas',
    badgeColor: 'bg-sky-100 text-sky-900 border-sky-200',
    iconColor: 'bg-sky-600 text-white',
    accentBorder: 'hover:border-sky-400',
    title: 'MedikCore · Expediente NOM-024',
    tagline: 'Expediente clínico electrónico, receta QR y recordatorios por WhatsApp.',
    bullets: [
      'Cumplimiento normativo NOM-024 y seguridad de datos',
      'Emisión de receta médica digital con código QR',
      'Confirmaciones automatizadas de consulta por WhatsApp',
    ],
    impact: '-60% Ausentismo · 100% Digital',
    tech: ['NOM-024', 'Receta QR', 'WhatsApp API', 'React'],
  },
  {
    appId: 'credifast',
    badge: 'Fintech & Crédito',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    iconColor: 'bg-emerald-600 text-white',
    accentBorder: 'hover:border-emerald-400',
    title: 'CrediFast · Originación SOFOM',
    tagline: 'Simulador de crédito PyME con scoring paramétrico y firma NOM-151.',
    bullets: [
      'Evaluación algorítmica de riesgo con CIEC del SAT',
      'Originación 100% remota sin papel ni trámites lentos',
      'Generación de pagaré digital con firma legal NOM-151',
    ],
    impact: 'Aprobación < 15 min · -22% Morosidad',
    tech: ['SAT CIEC API', 'Scoring IA', 'Firma NOM-151', 'Stripe'],
  },
]

export function TechCatalogSection() {
  const [selectedAppId, setSelectedAppId] = useState<string>('livu')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleOpenDemo = (appId: string) => {
    setSelectedAppId(appId)
    setIsModalOpen(true)
  }

  return (
    <section className="py-20 lg:py-28 bg-[#f8fafc] relative overflow-hidden font-[family-name:var(--font-display)]" id="brochure">
      {/* Soft elegant background decorations */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-accent-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-navy-100/30 rounded-full blur-[120px] pointer-events-none" />

      <Container>
        {/* Sales Brochure Header (Clean Soft Elegance) */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 text-accent-700 text-xs font-extrabold border border-accent-100 mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-accent-500" />
              Catálogo Comercial de Soluciones Creati
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-navy-950 tracking-tight leading-[1.15]"
          >
            Software e Inteligencia Artificial que{' '}
            <span className="bg-gradient-to-r from-accent-600 via-accent-500 to-navy-700 bg-clip-text text-transparent">
              aceleran tu empresa
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-600 font-sans mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            Prueba en vivo cualquiera de nuestras plataformas especializadas. Haz clic en una solución para ver su funcionamiento en tiempo real.
          </motion.p>
        </div>

        {/* Dynamic Brochure Grid (2 Cols on Desktop, Visual & Fast to read) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {BROCHURE_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={`bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl ${item.accentBorder} transition-all duration-300 flex flex-col justify-between group relative overflow-hidden`}
            >
              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                  <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    ✓ {item.impact}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-xl font-bold text-navy-950 group-hover:text-accent-600 transition-colors font-[family-name:var(--font-display)]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1 font-sans font-medium leading-relaxed">
                    {item.tagline}
                  </p>
                </div>

                {/* Visual Bullets (Easy 3-second scan) */}
                <ul className="space-y-2 pt-1 font-sans text-xs text-gray-700">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-accent-50 text-accent-600 flex items-center justify-center font-bold shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="leading-snug">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Bottom Row: Tech Stack + Action Button */}
              <div className="mt-6 pt-4 border-t border-gray-100 space-y-4">
                {/* Tech Pills */}
                <div className="flex flex-wrap items-center gap-1.5 font-sans">
                  {item.tech.map((t) => (
                    <span key={t} className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action CTA Button */}
                <button
                  onClick={() => handleOpenDemo(item.appId)}
                  className="w-full py-3 px-4 rounded-xl bg-navy-900 hover:bg-accent-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm group-hover:shadow-md"
                >
                  <Play className="w-3.5 h-3.5 text-white fill-white" />
                  <span>Probar Demostración en Vivo</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
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
