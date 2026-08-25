'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Building2,
  Palmtree,
  Truck,
  Stethoscope,
  ShoppingBag,
  Coins,
  ArrowRight,
  CheckCircle,
  Sparkles,
  ShieldCheck,
  Star,
  Download,
  Phone,
  Calendar,
  Send,
  Clock,
  Brain,
  Home,
  QrCode,
  Users,
  Bot,
  Zap,
} from 'lucide-react'
import { ShowroomApp } from '@/data/showroomData'

export function CommercialLandingPreview({ app }: { app: ShowroomApp }) {
  const [formSent, setFormSent] = useState(false)
  const [emailInput, setEmailInput] = useState('')

  const handleFakeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailInput) return
    setFormSent(true)
    setTimeout(() => {
      setFormSent(false)
      setEmailInput('')
    }, 3500)
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-200/80 shadow-md overflow-hidden font-[family-name:var(--font-display)]">
      {/* Mini Mock Browser / Topbar */}
      <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="ml-2 font-mono text-[11px] text-emerald-400 bg-slate-800 px-3 py-0.5 rounded-md border border-slate-700">
            https://demo-{app.id}.creati.mx
          </span>
        </div>
        <span className="text-[10px] bg-gradient-to-r from-accent-500 to-navy-600 text-white px-2.5 py-0.5 rounded-full font-bold shadow-2xs">
          Landing Comercial · Vista Demo
        </span>
      </div>

      {/* Landing Content Container */}
      <div className="p-5 sm:p-8 space-y-8">
        {/* 0. NovaBrain AI (Multimodal AI & Agents) */}
        {app.id === 'novabrain' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-cyan-100 text-cyan-900 text-xs font-extrabold uppercase tracking-wider shadow-2xs">
                🤖 Inteligencia Artificial Autónomo B2B
              </span>
              <span className="text-xs text-cyan-800 font-semibold bg-cyan-50 px-3 py-1 rounded-full">
                Groq AI · OpenAI GPT-4o · RAG
              </span>
            </div>

            <div className="bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-cyan-800/60 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
                <div className="lg:col-span-7 space-y-4">
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                    Agentes de IA que <span className="text-cyan-400">atienden, cotizan y cierran ventas 24/7</span>.
                  </h1>
                  <p className="text-xs sm:text-sm text-cyan-100/90 leading-relaxed font-sans">
                    NovaBrain AI se integra a tu WhatsApp y sitio web. Responde con el tono experto de tu empresa, audita contratos en PDF en 0.4 segundos y sincroniza clientes con tu ERP.
                  </p>
                  <div className="grid grid-cols-3 gap-3 text-center text-xs font-sans">
                    <div className="p-2.5 bg-slate-900/80 rounded-xl border border-cyan-800">
                      <p className="text-base font-black text-cyan-300">&lt; 1.5s</p>
                      <p className="text-[9px] text-slate-300">Respuesta WhatsApp</p>
                    </div>
                    <div className="p-2.5 bg-slate-900/80 rounded-xl border border-cyan-800">
                      <p className="text-base font-black text-emerald-400">100% Auto</p>
                      <p className="text-[9px] text-slate-300">Auditoría PDF/SAT</p>
                    </div>
                    <div className="p-2.5 bg-slate-900/80 rounded-xl border border-cyan-800">
                      <p className="text-base font-black text-amber-300">24 / 7</p>
                      <p className="text-[9px] text-slate-300">Disponibilidad</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-md text-white p-5 rounded-2xl shadow-lg border border-cyan-700/80">
                  <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">Prueba Directa</span>
                  <h4 className="text-base font-bold text-white mt-1">Conecta tu Agente de IA</h4>
                  <p className="text-xs text-slate-300 mt-1 mb-4 font-sans">Escribe el WhatsApp donde deseas recibir la simulación de cotización.</p>

                  {formSent ? (
                    <div className="p-3.5 bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 rounded-xl text-xs font-semibold text-center font-sans">
                      ✓ ¡Solicitud enviada! Tu agente de IA te contactará en breve.
                    </div>
                  ) : (
                    <form onSubmit={handleFakeSubmit} className="space-y-2.5">
                      <input
                        type="text"
                        placeholder="Nombre de tu Empresa"
                        required
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-400 focus:outline-none"
                      />
                      <input
                        type="tel"
                        placeholder="WhatsApp (999 123 4567)"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-400 focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                      >
                        <Zap className="w-4 h-4 fill-slate-950" />
                        Activar Demo de NovaBrain AI
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 1. LIVU Commercial Landing (Emerald & Jade Luxury Estate) */}
        {app.id === 'livu' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-extrabold uppercase tracking-wider shadow-2xs">
                🏡 Proptech & Condominios Residenciales
              </span>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full">
                Mérida Norte · Riviera Maya · Querétaro
              </span>
            </div>

            <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-emerald-800/60 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
                <div className="lg:col-span-7 space-y-4">
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight font-[family-name:var(--font-display)]">
                    Seguridad en caseta en <span className="text-emerald-400">6 segundos</span> y finanzas condominales transparentes.
                  </h1>
                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-sans">
                    LIVU transforma privadas residenciales y condominios con pases QR dinámicos para visitas, cobro de mantenimiento automatizado con SPEI y app móvil nativa para vecinos y administración.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-emerald-200 pt-1 font-sans">
                    <span className="flex items-center gap-1.5 bg-emerald-900/80 px-3 py-1 rounded-xl border border-emerald-700/60"><CheckCircle className="w-4 h-4 text-emerald-400" /> Sin filas en caseta</span>
                    <span className="flex items-center gap-1.5 bg-emerald-900/80 px-3 py-1 rounded-xl border border-emerald-700/60"><CheckCircle className="w-4 h-4 text-emerald-400" /> -85% Morosidad</span>
                    <span className="flex items-center gap-1.5 bg-emerald-900/80 px-3 py-1 rounded-xl border border-emerald-700/60"><CheckCircle className="w-4 h-4 text-emerald-400" /> App iOS & Android</span>
                  </div>
                </div>

                {/* Lead Box */}
                <div className="lg:col-span-5 bg-emerald-900/90 backdrop-blur-md text-white p-5 rounded-2xl shadow-lg border border-emerald-700/80 font-sans">
                  <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Mesas Directivas & Administradores</span>
                  <h4 className="text-base font-bold text-white mt-1">Solicita un Piloto de 30 Días para tu Privada</h4>
                  <p className="text-xs text-emerald-200/80 mt-1 mb-4">Descubre cómo modernizar la caseta y la cobranza sin costo inicial.</p>

                  {formSent ? (
                    <div className="p-3.5 bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 rounded-xl text-xs font-semibold text-center">
                      ✓ ¡Solicitud recibida! Te contactaremos hoy mismo.
                    </div>
                  ) : (
                    <form onSubmit={handleFakeSubmit} className="space-y-2.5">
                      <input
                        type="text"
                        placeholder="Nombre de la Privada / Condominio"
                        required
                        className="w-full px-3 py-2 bg-emerald-950/80 border border-emerald-700/80 rounded-xl text-xs text-white placeholder:text-emerald-300/60 focus:outline-none focus:border-emerald-400"
                      />
                      <input
                        type="tel"
                        placeholder="WhatsApp de Contacto"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full px-3 py-2 bg-emerald-950/80 border border-emerald-700/80 rounded-xl text-xs text-white placeholder:text-emerald-300/60 focus:outline-none focus:border-emerald-400"
                      />
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-amber-500/20"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Agendar Demo con la Mesa Directiva
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. HR-TCI / Tempus Commercial Landing */}
        {app.id === 'hrtci' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-extrabold uppercase tracking-wider shadow-2xs">
                ⏱️ Time & Cost Intelligence (SaaS B2B)
              </span>
              <span className="text-xs text-indigo-700 font-semibold bg-indigo-50 px-3 py-1 rounded-full font-sans">
                Agencias · Consultoría · Software Houses
              </span>
            </div>

            <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-indigo-800/60 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
                <div className="lg:col-span-7 space-y-4">
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight font-[family-name:var(--font-display)]">
                    Conoce la rentabilidad real de cada proyecto con <span className="text-cyan-400">Groq AI & Costeo Horario</span>.
                  </h1>
                  <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-sans">
                    HR-TCI cruza las horas de tu equipo con los salarios reales y utiliza inteligencia artificial para auditar la productividad, eliminar fugas de tiempo no facturable y asegurar márgenes del 40%+.
                  </p>
                </div>

                <div className="lg:col-span-5 bg-indigo-900/80 backdrop-blur-md text-white p-5 rounded-2xl shadow-lg border border-indigo-700/80 font-sans">
                  <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">Directores, CFOs & PMs</span>
                  <h4 className="text-base font-bold text-white mt-1">Calcula el Incremento de Rentabilidad</h4>
                  <p className="text-xs text-indigo-200/80 mt-1 mb-4">Prueba HR-TCI en tu equipo durante 14 días sin costo.</p>

                  <div className="space-y-3.5 text-xs">
                    <div className="p-3 bg-indigo-950/80 rounded-xl border border-indigo-700/60">
                      <p className="font-bold text-white">Equipo de 15 Colaboradores</p>
                      <p className="text-[10px] text-cyan-300 mt-0.5">Recuperación estimada: $45,000 MXN / mes</p>
                    </div>
                    <button className="w-full py-2.5 bg-cyan-400 hover:bg-cyan-300 text-indigo-950 font-extrabold rounded-xl text-xs cursor-pointer transition-colors shadow-md shadow-cyan-400/20">
                      Iniciar Prueba Piloto de HR-TCI
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fallback for other apps */}
        {app.id !== 'novabrain' && app.id !== 'livu' && app.id !== 'hrtci' && (
          <div className="p-6 bg-slate-900 text-white rounded-3xl text-center space-y-3">
            <h3 className="text-2xl font-bold">{app.title}</h3>
            <p className="text-xs text-slate-300 font-sans max-w-lg mx-auto">{app.tagline}</p>
            <span className="inline-block text-xs font-bold text-emerald-400 bg-emerald-950 border border-emerald-700 px-3 py-1 rounded-full font-sans">
              ✓ Solución Lista para Despliegue en 3 a 5 semanas
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
