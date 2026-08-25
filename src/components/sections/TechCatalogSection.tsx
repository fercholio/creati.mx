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
} from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { ShowroomModal } from '@/components/showroom/ShowroomModal'

const CATALOG_CATEGORIES = [
  {
    categoryName: 'Proptech & Control Residencial',
    tagline: 'Seguridad en caseta y finanzas condominales transparentes.',
    solutions: [
      {
        appId: 'livu',
        title: 'LIVU · Control Residencial & Condominios',
        badge: 'Proptech & Seguridad',
        description: 'Acceso en caseta en 6 segundos con pases QR dinámicos inviolables, bitácora LPR y cobro de cuotas de mantenimiento por SPEI/Stripe con recibo fiscal.',
        metrics: '< 6 seg en caseta · -85% Morosidad',
        tech: ['Next.js 16', 'Laravel API', 'QR Dinámico', 'SPEI Banxico', '.NET MAUI'],
      },
    ],
  },
  {
    categoryName: 'Operaciones & Rentabilidad Empresarial',
    tagline: 'Plataformas diseñadas para aumentar margen y control en tiempo real.',
    solutions: [
      {
        appId: 'hrtci',
        title: 'HR-TCI / Tempus · Time & Cost Intelligence',
        badge: 'SaaS B2B & IA',
        description: 'Costeo horario real de nómina por proyecto, control de tiempo, flujo de aprobación semanal y AI Productivity Coach impulsado por Groq AI.',
        metrics: '+30% Margen · +18 hrs facturables/mes',
        tech: ['Groq AI (Fast LLM)', 'Vue.js 3 SPA', 'Laravel 11', 'Costing Engine'],
      },
      {
        appId: 'estateflow',
        title: 'EstateFlow · Masterplan & Cotizador de Lotes',
        badge: 'Inmobiliario & Lotes',
        description: 'Mapa interactivo de inventario en tiempo real, corridas financieras automáticas a 36 MSI y apartado bancario digital en 3 clics.',
        metrics: '+38% Cierres · Cotización en 10 seg',
        tech: ['Interactive Canvas', 'Stripe Payments', 'PDF Generator', 'PostgreSQL'],
      },
      {
        appId: 'routeops',
        title: 'RouteOps · Torre de Control Logística & Frío',
        badge: 'Logística & Telemetría',
        description: 'Monitoreo de cadena de frío a -18°C en tiempo real, optimización de rutas y comprobante de entrega digital certificado con firma y GPS.',
        metrics: '-85% Merma Térmica · 99.4% SLA',
        tech: ['IoT Sensors', 'WebSockets', 'Firma Digital GPS', 'Docker'],
      },
    ],
  },
  {
    categoryName: 'Agentes de Inteligencia Artificial',
    tagline: 'Agentes autónomos conectados a la base de conocimiento de tu empresa.',
    solutions: [
      {
        appId: 'hrtci',
        title: 'Creati AI Agent · Agente Autónomo de Negocios',
        badge: 'IA RAG Avanzada',
        description: 'Agente de IA entrenado con tus catálogos y manuales que atiende por WhatsApp 24/7, responde cotizaciones complejas y extrae datos de contratos.',
        metrics: 'Respuesta en < 2 seg · Atención 24/7',
        tech: ['OpenAI GPT-4o', 'Groq AI', 'Vector DB RAG', 'WhatsApp API'],
      },
    ],
  },
  {
    categoryName: 'Ecosistema & Integraciones Enterprise',
    tagline: 'Sincronización bidireccional con tu infraestructura actual.',
    solutions: [
      {
        appId: 'hrtci',
        title: 'Enterprise API Bridge · Conector SAP, Intelisis & SAT',
        badge: 'Arquitectura Cloud',
        description: 'Webhooks y conectores seguros para sincronizar inventarios, cartera y facturación CFDI 4.0 directamente con tu ERP central.',
        metrics: 'Sincronización Tiempo Real · 0 Errores Manuales',
        tech: ['SAP B1 API', 'Intelisis Webhooks', 'SAT CFDI 4.0', 'AWS Lambda'],
      },
    ],
  },
  {
    categoryName: 'Salud & Fintech Regulado',
    tagline: 'Plataformas de alta precisión para sectores bajo cumplimiento normativo.',
    solutions: [
      {
        appId: 'medikcore',
        title: 'MedikCore · Expediente Clínico NOM-024',
        badge: 'Salud & Clínicas',
        description: 'Expediente electrónico normativo NOM-024, receta con código QR y confirmaciones automáticas de cita por WhatsApp.',
        metrics: '-60% Ausentismo · Flujo 100% Digital',
        tech: ['NOM-024', 'Receta QR', 'WhatsApp API', 'React'],
      },
      {
        appId: 'credifast',
        title: 'CrediFast · Originación Fintech & SOFOM',
        badge: 'Fintech & Crédito',
        description: 'Simulador de crédito PyME con scoring algorítmico de riesgo, extracción CIEC del SAT y firma de pagaré NOM-151.',
        metrics: 'Aprobación en < 15 min · -22% Morosidad',
        tech: ['SAT CIEC API', 'Scoring IA', 'Firma NOM-151', 'Stripe'],
      },
    ],
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
    <section className="py-20 lg:py-28 bg-slate-950 text-white relative overflow-hidden font-[family-name:var(--font-display)]" id="catalog">
      {/* Subtle glow background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

      <Container>
        {/* Section Header (Apple Minimalist Style) */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-accent-300 text-xs font-bold border border-white/15 mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-accent-400" />
              Catálogo de Soluciones & Arquitectura
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
          >
            Tecnología diseñada para escalar{' '}
            <span className="bg-gradient-to-r from-accent-400 via-emerald-400 to-accent-500 bg-clip-text text-transparent">
              tu modelo de negocio
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-300 font-sans mt-5 max-w-2xl mx-auto leading-relaxed"
          >
            Explora nuestras plataformas especializadas e integraciones empresariales. Diseñadas con arquitectura de código propia, inteligencia artificial y la infraestructura cloud más avanzada.
          </motion.p>
        </div>

        {/* Categories & Solution Cards List */}
        <div className="space-y-14 max-w-5xl mx-auto">
          {CATALOG_CATEGORIES.map((cat, cIdx) => (
            <div key={cIdx} className="space-y-6">
              <div className="border-b border-white/10 pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {cat.categoryName}
                </h3>
                <span className="text-xs text-slate-400 font-sans">{cat.tagline}</span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {cat.solutions.map((item, sIdx) => (
                  <motion.div
                    key={sIdx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: sIdx * 0.05 }}
                    className="p-6 rounded-3xl bg-slate-900/80 hover:bg-slate-900 border border-white/10 hover:border-accent-500/40 transition-all duration-300 backdrop-blur-md group flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-2.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h4 className="text-lg font-bold text-white group-hover:text-accent-300 transition-colors">
                          {item.title}
                        </h4>
                        <span className="text-[10px] font-extrabold bg-accent-500/20 text-accent-300 border border-accent-500/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {item.badge}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        {item.description}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1 font-sans">
                        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mr-1">
                          Stack Técnico:
                        </span>
                        {item.tech.map((t) => (
                          <span key={t} className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-md border border-white/5">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="text-[11px] font-sans text-emerald-400 font-semibold pt-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Impacto: {item.metrics}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleOpenDemo(item.appId)}
                      className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-white/10 transition-all cursor-pointer shrink-0 group-hover:scale-105"
                    >
                      <Play className="w-4 h-4 fill-slate-950" />
                      <span>Probar Demo en Vivo</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
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
