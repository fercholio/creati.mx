'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Utensils,
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
  Flame,
  Award,
  Cpu,
  Brain,
  Cloud,
  Database,
  Lock,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SHOWROOM_APPS, ShowroomApp } from '@/data/showroomData'
import { ShowroomModal } from '@/components/showroom/ShowroomModal'

const BISTRO_CATEGORIES = [
  {
    categoryId: 'starters',
    title: '🍸 I. Aperitivos & Accesos Smart (Seguridad & Proptech)',
    description: 'Entradas de implementación rápida que protegen e identifican tu propiedad.',
    items: [
      {
        appId: 'livu',
        name: 'LIVU · Control Residencial & Condominios',
        tag: 'Especialidad Proptech',
        description: 'Acceso en caseta en 6 segundos con pases QR dinámicos inviolables, bitácora LPR y cobro de mantenimiento condominal por SPEI/Stripe con recibos fiscales.',
        ingredients: ['Next.js 16', 'Laravel API', 'QR Dinámico', 'SPEI Banxico', '.NET MAUI'],
        pairWith: 'Privadas residenciales, condominios y desarrolladoras.',
        impact: '< 6 seg en caseta · -85% Morosidad',
      },
    ],
  },
  {
    categoryId: 'mains',
    title: '🥩 II. Platos Fuertes (Gestión, Operaciones & Inteligencia de Tiempo)',
    description: 'Platillos principales diseñados para aumentar el margen de rentabilidad y acelerar ventas.',
    items: [
      {
        appId: 'hrtci',
        name: 'HR-TCI / Tempus · Time & Cost Intelligence',
        tag: 'Alta Eficiencia IA',
        description: 'Costeo horario real de nómina, control de tiempo por proyecto, flujo de aprobación semanal y AI Productivity Coach impulsado por Groq AI.',
        ingredients: ['Groq AI (Fast LLM)', 'Vue.js 3 SPA', 'Laravel 11', 'Costing Engine'],
        pairWith: 'Consultoras, agencias B2B, software houses y despachos.',
        impact: '+30% Margen · +18 hrs facturables/mes',
      },
      {
        appId: 'estateflow',
        name: 'EstateFlow · Masterplan & Cotizador de Lotes',
        tag: 'Acelerador Comercial',
        description: 'Mapa interactivo de lotes en tiempo real, corridas financieras automáticas a 36 MSI y apartado digital bancario en 3 clics.',
        ingredients: ['Interactive Canvas', 'Stripe Payments', 'PDF Generator', 'PostgreSQL'],
        pairWith: 'Desarrolladores inmobiliarios y master brokers.',
        impact: '+38% Conversión · Cotización en 10 seg',
      },
      {
        appId: 'routeops',
        name: 'RouteOps · Torre de Control Logística & Frío',
        tag: 'Telemetría IoT',
        description: 'Monitoreo de cadena de frío a -18°C en tiempo real, optimización de rutas de reparto y comprobante de entrega digital con firma y GPS.',
        ingredients: ['IoT Sensors', 'WebSockets', 'Firma Digital GPS', 'Docker'],
        pairWith: 'CEDIS, transporte de carga y distribuidoras.',
        impact: '-85% Merma Térmica · 99.4% SLA',
      },
    ],
  },
  {
    categoryId: 'ai_specials',
    title: '🤖 III. Chef Specials: Agentes de IA & Automatización',
    description: 'Inteligencia Artificial autónoma conectada a las bases de conocimiento de tu empresa.',
    items: [
      {
        appId: 'ai_agent',
        name: 'Creati AI Agent · Agente Autónomo de Negocios',
        tag: 'IA RAG Avanzada',
        description: 'Agente de IA entrenado con tus manuales y catálogos que atiende por WhatsApp 24/7, responde cotizaciones complejas y extrae datos de contratos.',
        ingredients: ['OpenAI GPT-4o', 'Groq AI', 'Vector DB', 'WhatsApp API'],
        pairWith: 'Atención al cliente, ventas complejas y soporte técnico.',
        impact: 'Respuesta en < 2 seg · Atiende 24/7 sin descanso',
      },
    ],
  },
  {
    categoryId: 'cloud_connectors',
    title: '☁️ IV. Guarniciones Cloud & Conectores Enterprise',
    description: 'Integraciones bidireccionales con la infraestructura existente de tu organización.',
    items: [
      {
        appId: 'erp_connect',
        name: 'Enterprise API Bridge · Conector SAP, Intelisis & SAT',
        tag: 'Arquitectura Cloud',
        description: 'Webhooks y conectores seguros para sincronizar inventarios, cartera y facturación CFDI 4.0 directamente con tu ERP central.',
        ingredients: ['SAP B1 API', 'Intelisis Webhooks', 'SAT CFDI 4.0', 'AWS Lambda'],
        pairWith: 'Empresas medianas y corporativos con ERP instalado.',
        impact: 'Sincronización 100% en tiempo real · 0 Errores manuales',
      },
    ],
  },
  {
    categoryId: 'desserts',
    title: '🍰 V. Postres & Especialidades (Salud & Fintech)',
    description: 'Cierres de alta precisión para sectores regulados.',
    items: [
      {
        appId: 'medikcore',
        name: 'MedikCore · Expediente Clínico NOM-024',
        tag: 'Sector Salud',
        description: 'Expediente electrónico normativo, recetas con código QR e indicaciones automatizadas por WhatsApp.',
        ingredients: ['NOM-024', 'Receta QR', 'WhatsApp API', 'React'],
        pairWith: 'Clínicas especializadas y consultorios médicos.',
        impact: '-60% Ausentismo · Expediente 100% Digital',
      },
      {
        appId: 'credifast',
        name: 'CrediFast · Originación Fintech & SOFOM',
        tag: 'Alta Finanza',
        description: 'Simulador de crédito PyME con scoring algorítmico, validación CIEC del SAT y firma de pagaré NOM-151.',
        ingredients: ['SAT CIEC API', 'Scoring IA', 'Firma NOM-151', 'Stripe'],
        pairWith: 'Financieras, SOFOMes y fondos de inversión.',
        impact: 'Aprobación en < 15 min · -22% Morosidad',
      },
    ],
  },
]

export function TechBistroMenuSection() {
  const [selectedAppId, setSelectedAppId] = useState<string>('livu')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleOpenDemo = (appId: string) => {
    // Map custom items to valid showroom app IDs if needed
    const validId = (appId === 'ai_agent' || appId === 'erp_connect') ? 'hrtci' : appId
    setSelectedAppId(validId)
    setIsModalOpen(true)
  }

  return (
    <section className="py-20 lg:py-28 bg-slate-950 text-amber-50 relative overflow-hidden font-[family-name:var(--font-display)]" id="bistro-menu">
      {/* Glow background accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[140px] pointer-events-none" />

      <Container>
        {/* Menu Binder Card */}
        <div className="relative max-w-5xl mx-auto bg-stone-950/90 rounded-[40px] p-6 sm:p-12 border-2 border-amber-500/30 shadow-2xl backdrop-blur-xl">
          {/* Menu Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 border-b border-amber-500/30 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold border border-amber-500/40 mb-4 shadow-2xs">
                <Utensils className="w-4 h-4 text-amber-400" />
                Carte Du Jour · Menú de Alta Ingeniería & Software
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-5xl font-black text-amber-100 tracking-tight leading-tight"
            >
              Menú Tecnológico & Especialidades de Software
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs sm:text-sm text-amber-200/70 font-sans mt-3 max-w-2xl mx-auto leading-relaxed"
            >
              Especialidades preparadas con arquitectura de código propia, agentes de Inteligencia Artificial, integraciones empresariales y la infraestructura cloud más avanzada.
            </motion.p>
          </div>

          {/* Menu Categories List */}
          <div className="space-y-10">
            {BISTRO_CATEGORIES.map((cat, cIdx) => (
              <div key={cIdx} className="space-y-5">
                <div className="border-b border-amber-500/20 pb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-amber-300 flex items-center gap-2">
                    <span>{cat.title}</span>
                  </h3>
                  <p className="text-xs text-amber-200/60 font-sans italic mt-0.5">{cat.description}</p>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  {cat.items.map((item, iIdx) => (
                    <motion.div
                      key={iIdx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: iIdx * 0.05 }}
                      className="p-5 rounded-3xl bg-stone-900/80 hover:bg-amber-950/60 border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 group flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-lg font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                            {item.name}
                          </h4>
                          <span className="text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            {item.tag}
                          </span>
                        </div>

                        <p className="text-xs text-amber-100/80 font-sans leading-relaxed">
                          {item.description}
                        </p>

                        {/* Tech Ingredients Row */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1 font-sans">
                          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider mr-1">
                            Ingredientes Tech:
                          </span>
                          {item.ingredients.map((ing) => (
                            <span key={ing} className="text-[10px] bg-stone-800 text-amber-200 px-2 py-0.5 rounded border border-amber-500/10">
                              {ing}
                            </span>
                          ))}
                        </div>

                        <div className="text-[11px] font-sans text-amber-200/70 pt-1 flex flex-wrap gap-4">
                          <span><strong className="text-amber-400">Maridaje:</strong> {item.pairWith}</span>
                          <span><strong className="text-emerald-400">Rendimiento:</strong> {item.impact}</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => handleOpenDemo(item.appId)}
                        className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer shrink-0 group-hover:scale-105"
                      >
                        <Play className="w-4 h-4 fill-stone-950" />
                        <span>Degustar Demo en Vivo</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Menu Bottom Footer */}
          <div className="mt-12 pt-8 border-t border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-amber-200/70">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Creati Engineering · Mérida, Yucatán & Cobertura Nacional</span>
            </div>
            <button
              onClick={() => handleOpenDemo('livu')}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold rounded-2xl flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <Sparkles className="w-4 h-4" />
              Abrir Simulador Interactivo Completo
            </button>
          </div>
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
