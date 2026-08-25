'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Clock, DollarSign, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Layers, Plus } from 'lucide-react'
import { Container } from '@/components/layout/Container'

const PROJECT_TYPES = [
  { id: 'mobile_app', title: 'App Móvil iOS / Android', minWeeks: 6, maxWeeks: 10, baseMin: 85000, baseMax: 160000, desc: 'React Native / Flutter con backend API.' },
  { id: 'custom_saas', title: 'Plataforma Web SaaS / CRM', minWeeks: 8, maxWeeks: 12, baseMin: 120000, baseMax: 240000, desc: 'Next.js 16 + Laravel 11 / Node.js.' },
  { id: 'real_estate', title: 'Portal Inmobiliario & Cotizador', minWeeks: 4, maxWeeks: 8, baseMin: 65000, baseMax: 130000, desc: 'Mapa de lotes en vivo y simulación MSI.' },
  { id: 'ai_integration', title: 'Integración de IA & Automatización', minWeeks: 3, maxWeeks: 6, baseMin: 45000, baseMax: 95000, desc: 'Groq AI / OpenAI con agentes RAG.' },
]

const SCOPE_LEVELS = [
  { id: 'mvp', label: 'MVP / Lanzamiento Rápido', mult: 1.0, addWeeks: 0, desc: 'Funcionalidades esenciales para salir al mercado en semanas.' },
  { id: 'growth', label: 'Plataforma Completa', mult: 1.35, addWeeks: 2, desc: 'Flujos avanzados, roles múltiples e integraciones API.' },
  { id: 'enterprise', label: 'Enterprise & Multi-Sucursal', mult: 1.85, addWeeks: 4, desc: 'Alta disponibilidad, auditoría, microservicios y soporte 24/7.' },
]

const OPTIONAL_ADDONS = [
  { id: 'payments', label: 'Pasarela de Pagos SPEI / Stripe', price: 15000 },
  { id: 'whatsapp', label: 'Notificaciones WhatsApp API', price: 12000 },
  { id: 'signature', label: 'Firma Digital Certificada NOM-151', price: 18000 },
]

export function ProjectEstimator() {
  const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0])
  const [selectedScope, setSelectedScope] = useState(SCOPE_LEVELS[1])
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['payments'])
  const [leadSent, setLeadSent] = useState(false)
  const [emailInput, setEmailInput] = useState('')

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id))
    } else {
      setSelectedAddons([...selectedAddons, id])
    }
  }

  // Dynamic Math Calculations
  const addonsTotal = selectedAddons.reduce((acc, id) => {
    const found = OPTIONAL_ADDONS.find((a) => a.id === id)
    return acc + (found ? found.price : 0)
  }, 0)

  const calcMin = Math.round((selectedType.baseMin * selectedScope.mult + addonsTotal) / 1000) * 1000
  const calcMax = Math.round((selectedType.baseMax * selectedScope.mult + addonsTotal) / 1000) * 1000
  const calcMinWeeks = selectedType.minWeeks + selectedScope.addWeeks
  const calcMaxWeeks = selectedType.maxWeeks + selectedScope.addWeeks

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailInput) return
    setLeadSent(true)
    setTimeout(() => {
      setLeadSent(false)
      setEmailInput('')
    }, 4500)
  }

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden" id="estimator">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 text-accent-600 text-xs font-bold border border-accent-100 mb-4 shadow-2xs">
              <Calculator className="w-3.5 h-3.5 text-accent-500" />
              Estimador de Proyecto & Tiempos 100% Dinámico
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] text-gray-900 tracking-tight leading-[1.15]"
          >
            Calcula el alcance y tiempo de entrega de{' '}
            <span className="bg-gradient-to-r from-accent-600 via-accent-500 to-navy-600 bg-clip-text text-transparent">
              tu software
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            Sin sorpresas. Selecciona el tipo de proyecto y el nivel de alcance para obtener una estimación clara de tiempos de desarrollo e inversión aproximada en tiempo real.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Left: Interactive Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6 bg-gray-50/80 p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
            {/* Step 1: Project Type */}
            <div>
              <label className="text-xs font-extrabold text-gray-900 uppercase tracking-wider block mb-3">
                1. Selecciona el Tipo de Solución
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROJECT_TYPES.map((t) => {
                  const isSelected = t.id === selectedType.id
                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedType(t)}
                      className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-accent-500 bg-white ring-2 ring-accent-400/20 shadow-xs'
                          : 'border-gray-200 bg-white/70 hover:bg-white'
                      }`}
                    >
                      <span className={`text-xs font-bold block ${isSelected ? 'text-accent-600' : 'text-gray-900'}`}>
                        {t.title}
                      </span>
                      <span className="text-[10px] text-gray-500 block mt-0.5">{t.desc}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2: Scope Level */}
            <div>
              <label className="text-xs font-extrabold text-gray-900 uppercase tracking-wider block mb-3">
                2. Nivel de Alcance & Complejidad
              </label>
              <div className="space-y-2">
                {SCOPE_LEVELS.map((s) => {
                  const isSelected = s.id === selectedScope.id
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedScope(s)}
                      className={`w-full p-3 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-accent-500 bg-white ring-2 ring-accent-400/20 shadow-xs'
                          : 'border-gray-200 bg-white/70 hover:bg-white'
                      }`}
                    >
                      <div>
                        <span className={`text-xs font-bold block ${isSelected ? 'text-accent-600' : 'text-gray-900'}`}>
                          {s.label}
                        </span>
                        <span className="text-[11px] text-gray-500">{s.desc}</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-accent-500 bg-accent-500 text-white' : 'border-gray-300'
                      }`}>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 3: Optional Add-ons */}
            <div>
              <label className="text-xs font-extrabold text-gray-900 uppercase tracking-wider block mb-2.5">
                3. Módulos Adicionales (Opcional)
              </label>
              <div className="flex flex-wrap gap-2">
                {OPTIONAL_ADDONS.map((a) => {
                  const active = selectedAddons.includes(a.id)
                  return (
                    <button
                      key={a.id}
                      onClick={() => toggleAddon(a.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        active
                          ? 'bg-accent-500 text-white shadow-xs'
                          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <span>{active ? '✓' : '+'}</span>
                      <span>{a.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right: Dynamic Calculation & Proposal Request (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between border border-navy-700">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-navy-700">
                <span className="text-xs text-accent-300 font-bold uppercase tracking-wider">
                  Cálculo en Vivo
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full">
                  100% Transparente
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-accent-400" /> Tiempo Estimado de Entrega:
                  </span>
                  <p className="text-3xl font-black text-white mt-1 font-mono">
                    {calcMinWeeks} - {calcMaxWeeks} <span className="text-base font-sans font-semibold text-accent-300">semanas</span>
                  </p>
                  <p className="text-[11px] text-emerald-400 font-semibold mt-1">
                    ✓ Entregas funcionales probables cada viernes
                  </p>
                </div>

                <div>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Rango de Inversión Proyectado:
                  </span>
                  <p className="text-2xl font-black text-emerald-400 mt-1 font-mono">
                    ${calcMin.toLocaleString()} - ${calcMax.toLocaleString()} <span className="text-xs font-sans font-normal text-gray-300">MXN</span>
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    Incluye diseño UI/UX, arquitectura backend, pruebas de carga y código fuente 100% tuyo.
                  </p>
                </div>
              </div>
            </div>

            {/* Request Formal Technical Proposal Form */}
            <div className="mt-6 pt-4 border-t border-navy-700">
              <h4 className="text-xs font-bold text-white mb-2">
                ¿Deseas recibir la propuesta técnica formal con desglose?
              </h4>

              {leadSent ? (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-semibold text-center">
                  ✓ Solicitud recibida. Un arquitecto técnico de Creati te enviará el desglose para {selectedType.title} a tu correo.
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-2">
                  <input
                    type="email"
                    required
                    placeholder="Tu correo corporativo (ej. director@empresa.mx)"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full px-3 py-2.5 bg-navy-900 border border-navy-700 rounded-xl text-xs text-white placeholder:text-gray-400 focus:outline-none focus:border-accent-400"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-accent-500 hover:bg-accent-400 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-accent-500/30"
                  >
                    <Sparkles className="w-4 h-4" />
                    Solicitar Propuesta Técnica Formal en 24 Hrs
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
