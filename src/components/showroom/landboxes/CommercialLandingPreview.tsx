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
    <div className="bg-white rounded-3xl border border-gray-200/80 shadow-md overflow-hidden">
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
                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                    LIVU transforma privadas residenciales y condominios con pases QR dinámicos para visitas, cobro de mantenimiento automatizado con SPEI y app móvil nativa para vecinos y administración.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-emerald-200 pt-1">
                    <span className="flex items-center gap-1.5 bg-emerald-900/80 px-3 py-1 rounded-xl border border-emerald-700/60"><CheckCircle className="w-4 h-4 text-emerald-400" /> Sin filas en caseta</span>
                    <span className="flex items-center gap-1.5 bg-emerald-900/80 px-3 py-1 rounded-xl border border-emerald-700/60"><CheckCircle className="w-4 h-4 text-emerald-400" /> -85% Morosidad</span>
                    <span className="flex items-center gap-1.5 bg-emerald-900/80 px-3 py-1 rounded-xl border border-emerald-700/60"><CheckCircle className="w-4 h-4 text-emerald-400" /> App iOS & Android</span>
                  </div>
                </div>

                {/* Lead Box */}
                <div className="lg:col-span-5 bg-emerald-900/90 backdrop-blur-md text-white p-5 rounded-2xl shadow-lg border border-emerald-700/80">
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

        {/* 2. HR-TCI / Tempus Commercial Landing (Indigo & Electric Cyan) */}
        {app.id === 'hrtci' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-extrabold uppercase tracking-wider shadow-2xs">
                ⏱️ Time & Cost Intelligence (SaaS B2B)
              </span>
              <span className="text-xs text-indigo-700 font-semibold bg-indigo-50 px-3 py-1 rounded-full">
                Agencias · Consultoría · Software Houses
              </span>
            </div>

            <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-indigo-800/60 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
                <div className="lg:col-span-7 space-y-4">
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight font-[family-name:var(--font-display)]">
                    Conoce la rentabilidad real de cada proyecto con <span className="text-cyan-400">Groq AI & Costeo Horario</span>.
                  </h1>
                  <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
                    HR-TCI cruza las horas de tu equipo con los salarios reales y utiliza inteligencia artificial para auditar la productividad, eliminar fugas de tiempo no facturable y asegurar márgenes del 40%+.
                  </p>
                  <div className="grid grid-cols-3 gap-3 pt-1 text-center text-xs">
                    <div className="p-2.5 bg-indigo-900/60 rounded-2xl border border-indigo-700/60">
                      <p className="text-lg font-black text-cyan-300">+30%</p>
                      <p className="text-[10px] text-indigo-200">Margen por Proyecto</p>
                    </div>
                    <div className="p-2.5 bg-indigo-900/60 rounded-2xl border border-indigo-700/60">
                      <p className="text-lg font-black text-amber-300">Groq AI</p>
                      <p className="text-[10px] text-indigo-200">Productivity Coach</p>
                    </div>
                    <div className="p-2.5 bg-indigo-900/60 rounded-2xl border border-indigo-700/60">
                      <p className="text-lg font-black text-emerald-400">100%</p>
                      <p className="text-[10px] text-indigo-200">Control de Nómina</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-indigo-900/80 backdrop-blur-md text-white p-5 rounded-2xl shadow-lg border border-indigo-700/80">
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

        {/* 3. EstateFlow (Terracotta Amber & Slate Gold) */}
        {app.id === 'estateflow' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold uppercase tracking-wider shadow-2xs">
                🌟 Masterplan & Cotizador de Lotes
              </span>
              <span className="text-xs text-amber-800 font-semibold bg-amber-50 px-3 py-1 rounded-full">
                Dzityá Norte · Temozón · Mérida
              </span>
            </div>

            <div className="bg-gradient-to-br from-amber-950 via-slate-900 to-amber-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-800/60 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
                <div className="lg:col-span-7 space-y-4">
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight font-[family-name:var(--font-display)]">
                    Invierte en tu patrimonio con <span className="text-amber-400">36 MSI</span> y 32% de plusvalía garantizada.
                  </h1>
                  <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                    Lotes residenciales desde 350 m² con amenidades de club privado, lago artificial y seguridad 24/7 en la zona con mayor crecimiento de Mérida.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-amber-200 pt-1">
                    <span className="flex items-center gap-1.5 bg-amber-900/80 px-3 py-1 rounded-xl border border-amber-700/60"><CheckCircle className="w-4 h-4 text-amber-400" /> Escrituración Inmediata</span>
                    <span className="flex items-center gap-1.5 bg-amber-900/80 px-3 py-1 rounded-xl border border-amber-700/60"><CheckCircle className="w-4 h-4 text-amber-400" /> Enganche desde 15%</span>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-amber-900/80 backdrop-blur-md text-white p-5 rounded-2xl shadow-lg border border-amber-700/80">
                  <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Acceso Inversionistas</span>
                  <h4 className="text-base font-bold text-white mt-1">Descarga el Master Plan & Lista de Precios</h4>
                  <p className="text-xs text-amber-200/80 mt-1 mb-4">Recibe la corrida financiera en tu WhatsApp al instante.</p>

                  {formSent ? (
                    <div className="p-3.5 bg-amber-500/30 border border-amber-400/40 text-amber-200 rounded-xl text-xs font-semibold text-center">
                      ✓ ¡Brochure y lista de precios enviados a tu WhatsApp!
                    </div>
                  ) : (
                    <form onSubmit={handleFakeSubmit} className="space-y-2.5">
                      <input
                        type="text"
                        placeholder="Nombre completo"
                        required
                        className="w-full px-3 py-2 bg-amber-950/80 border border-amber-700/80 rounded-xl text-xs text-white placeholder:text-amber-300/60 focus:outline-none"
                      />
                      <input
                        type="tel"
                        placeholder="WhatsApp (999 123 4567)"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full px-3 py-2 bg-amber-950/80 border border-amber-700/80 rounded-xl text-xs text-white placeholder:text-amber-300/60 focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Descargar Corrida Financiera (PDF)
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. Kavita Concierge (Tropical Maya Teal & Sand Coral) */}
        {app.id === 'kavita' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-extrabold uppercase tracking-wider shadow-2xs">
                🌿 Hotel Boutique & Concierge Digital
              </span>
              <span className="text-xs text-teal-800 font-semibold bg-teal-50 px-3 py-1 rounded-full">
                Mérida Colonial & Tulum
              </span>
            </div>

            <div className="bg-gradient-to-br from-teal-950 via-emerald-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-teal-800/60 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
                <div className="lg:col-span-7 space-y-4">
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight font-[family-name:var(--font-display)]">
                    Estancia de lujo con <span className="text-teal-300">concierge digital</span> en tu suite.
                  </h1>
                  <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
                    Ordena room service de autor, agenda masajes holísticos con miel melipona y reserva experiencias privadas en cenotes sagrados desde tu celular sin descargar apps.
                  </p>
                  <div className="flex items-center gap-4 text-xs font-bold text-teal-200">
                    <div className="flex text-amber-400">{'★'.repeat(5)}</div>
                    <span>4.9 / 5.0 Forbes Travel & TripAdvisor</span>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-teal-900/80 backdrop-blur-md text-white p-5 rounded-2xl shadow-lg border border-teal-700/80">
                  <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Acceso Huéspedes</span>
                  <h4 className="text-base font-bold text-white mt-1">Conecta con tu Suite</h4>
                  <div className="p-3 bg-teal-950/80 rounded-xl my-3 border border-teal-700/60 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-white">Suite 204 · Villa Cenote</p>
                      <p className="text-[10px] text-emerald-400">✓ Check-in Digital Completado</p>
                    </div>
                    <span className="px-2.5 py-1 bg-amber-400 text-teal-950 font-bold rounded-lg text-[10px]">
                      Llave Activa
                    </span>
                  </div>
                  <p className="text-[10px] text-teal-200/80 text-center">
                    Sin filas en recepción. Escanea el QR y disfruta tu villa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. RouteOps (Cybernetic Fleet Blue & Cryo Cyan) */}
        {app.id === 'routeops' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-extrabold uppercase tracking-wider shadow-2xs">
                🚚 Cadena de Suministro & Frío (-18°C)
              </span>
              <span className="text-xs text-blue-800 font-semibold bg-blue-50 px-3 py-1 rounded-full">
                Hub Progreso · Cancún · CDMX
              </span>
            </div>

            <div className="bg-gradient-to-br from-blue-950 via-slate-950 to-cyan-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-blue-800/60 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
                <div className="lg:col-span-7 space-y-4">
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight font-[family-name:var(--font-display)]">
                    Telemetría en ruta con <span className="text-cyan-400">trazabilidad térmica</span> en tiempo real.
                  </h1>
                  <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                    Garantizamos cero mermas en traslados de mariscos y perecederos con sensores IoT inviolables y manifiestos de entrega digital certificados.
                  </p>
                  <div className="grid grid-cols-3 gap-3 text-center text-xs">
                    <div className="p-2 bg-blue-900/60 rounded-xl border border-blue-700/60">
                      <p className="text-base font-bold text-cyan-300">99.4%</p>
                      <p className="text-[9px] text-blue-200">SLA Entregas</p>
                    </div>
                    <div className="p-2 bg-blue-900/60 rounded-xl border border-blue-700/60">
                      <p className="text-base font-bold text-emerald-400">-18°C</p>
                      <p className="text-[9px] text-blue-200">Cadena de Frío</p>
                    </div>
                    <div className="p-2 bg-blue-900/60 rounded-xl border border-blue-700/60">
                      <p className="text-base font-bold text-lime-400">NOM-087</p>
                      <p className="text-[9px] text-blue-200">SCT Cumplimiento</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-blue-900/80 backdrop-blur-md text-white p-5 rounded-2xl shadow-lg border border-blue-700/80">
                  <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">Torre de Control</span>
                  <h4 className="text-base font-bold text-white mt-1">Rastreo de Carga en Vivo</h4>
                  <div className="flex gap-2 my-3">
                    <input
                      type="text"
                      defaultValue="PRO-CUN-8841"
                      className="flex-1 px-3 py-2 bg-blue-950/80 border border-blue-700/80 rounded-xl text-xs text-white focus:outline-none"
                    />
                    <button className="px-3.5 py-2 bg-cyan-400 hover:bg-cyan-300 text-blue-950 font-bold rounded-xl text-xs cursor-pointer">
                      Rastrear
                    </button>
                  </div>
                  <div className="p-2.5 bg-blue-950/80 rounded-xl text-[11px] text-emerald-400 font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    En ruta: Mérida-Cancún (ETA: 45 min · Temp: -18.2°C)
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. MedikCore (Clinical Blue & Ice Cyan) */}
        {app.id === 'medikcore' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-extrabold uppercase tracking-wider shadow-2xs">
                🏥 Hub de Especialidades Médicas NOM-024
              </span>
              <span className="text-xs text-sky-800 font-semibold bg-sky-50 px-3 py-1 rounded-full">
                Mérida Altabrisa & CDMX
              </span>
            </div>

            <div className="bg-gradient-to-br from-sky-950 via-slate-900 to-cyan-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-sky-800/60 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
                <div className="lg:col-span-7 space-y-4">
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight font-[family-name:var(--font-display)]">
                    Atención médica especializada con <span className="text-sky-300">receta digital & WhatsApp</span>.
                  </h1>
                  <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed">
                    Agenda tu cita en segundos. Recibe tus recetas electrónicas con código QR e indicaciones clínicas directamente en tu teléfono sin papeleo.
                  </p>
                </div>

                <div className="lg:col-span-5 bg-sky-900/80 backdrop-blur-md text-white p-5 rounded-2xl shadow-lg border border-sky-700/80">
                  <span className="text-[10px] text-sky-300 font-bold uppercase tracking-wider">Cita Inmediata</span>
                  <h4 className="text-base font-bold text-white mt-1">Dr. Alejandro Patrón</h4>
                  <p className="text-xs text-sky-200/80 mb-3">Traumatología · Torre Médica Altabrisa</p>
                  <button className="w-full py-2.5 bg-sky-400 hover:bg-sky-300 text-sky-950 font-bold rounded-xl text-xs cursor-pointer shadow-md">
                    Reservar Consulta ($1,200 MXN)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. LoyaltyPulse (Espresso & Apple Wallet Gold) */}
        {app.id === 'loyaltypulse' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold uppercase tracking-wider shadow-2xs">
                ☕ Club de Lealtad en Apple Wallet
              </span>
              <span className="text-xs text-amber-800 font-semibold bg-amber-50 px-3 py-1 rounded-full">
                Paseo de Montejo, Mérida
              </span>
            </div>

            <div className="bg-gradient-to-br from-stone-950 via-amber-950 to-neutral-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-800/60 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
                <div className="lg:col-span-7 space-y-4">
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight font-[family-name:var(--font-display)]">
                    Acumula sellos en tu <span className="text-amber-400">Apple Wallet / GPay</span> y gana recompensas.
                  </h1>
                  <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                    Sin descargar apps pesadas ni cargar tarjetas de cartón. Agrega tu pase digital en 1 tap y recibe cupones flash en días de baja afluencia.
                  </p>
                </div>

                <div className="lg:col-span-5 bg-amber-900/80 backdrop-blur-md text-white p-5 rounded-2xl shadow-lg border border-amber-700/80">
                  <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Pase VIP</span>
                  <h4 className="text-base font-bold text-white mt-1">Obtén tu Café Gratis</h4>
                  <p className="text-xs text-amber-200/80 mt-1 mb-4">Guarda tu tarjeta y canjea en cualquier sucursal.</p>
                  <button className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold rounded-xl text-xs cursor-pointer shadow-md">
                     Add to Apple Wallet
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 8. CrediFast (Wall Street Emerald & Platinum) */}
        {app.id === 'credifast' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-extrabold uppercase tracking-wider shadow-2xs">
                💰 Originación Fintech & SOFOMes
              </span>
              <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-3 py-1 rounded-full">
                Sureste & Bajío
              </span>
            </div>

            <div className="bg-gradient-to-br from-emerald-950 via-slate-950 to-emerald-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-emerald-800/60 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
                <div className="lg:col-span-7 space-y-4">
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight font-[family-name:var(--font-display)]">
                    Crédito empresarial desde <span className="text-emerald-400">$50k hasta $2.5M</span> en 15 minutos.
                  </h1>
                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                    Evaluación 100% digital con tu CIEC del SAT, score de riesgo automatizado y pagaré con firma electrónica NOM-151.
                  </p>
                </div>

                <div className="lg:col-span-5 bg-emerald-900/80 backdrop-blur-md text-white p-5 rounded-2xl shadow-lg border border-emerald-700/80">
                  <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Simulador Express</span>
                  <div className="p-3 bg-emerald-950/80 rounded-xl my-3 text-xs space-y-1 border border-emerald-700/60">
                    <div className="flex justify-between"><span className="text-emerald-200">Monto:</span><span className="font-bold text-white">$450,000 MXN</span></div>
                    <div className="flex justify-between"><span className="text-emerald-200">Pago mensual:</span><span className="font-bold text-emerald-400">$28,740 MXN</span></div>
                  </div>
                  <button className="w-full py-2.5 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-extrabold rounded-xl text-xs cursor-pointer shadow-md">
                    Solicitar Dictamen Express
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
