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
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
      {/* Mini Mock Browser / Topbar */}
      <div className="bg-gray-100/80 px-4 py-2 border-b border-gray-200 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 font-mono text-[11px] text-gray-600 bg-white px-3 py-0.5 rounded-md border border-gray-200">
            https://demo-{app.id}.creati.mx
          </span>
        </div>
        <span className="text-[10px] bg-accent-50 text-accent-700 px-2 py-0.5 rounded font-semibold">
          Vista Landing Comercial
        </span>
      </div>

      {/* Landing Content */}
      <div className="p-5 sm:p-8 space-y-8">
        {/* LIVU Commercial Landing */}
        {app.id === 'livu' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
                🏡 Proptech Residencial
              </span>
              <span className="text-xs text-gray-500">Mérida Norte · Riviera Maya · Querétaro</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight font-[family-name:var(--font-display)]">
                  Seguridad en caseta en <span className="text-accent-600">6 segundos</span> y finanzas condominales transparentes.
                </h1>
                <p className="text-sm text-gray-600 leading-relaxed">
                  LIVU transforma privadas residenciales y condominios con pases QR dinámicos para visitas, cobro de mantenimiento automatizado con SPEI y app móvil nativa para vecinos y administración.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-700">
                  <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Sin filas en caseta</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> -85% Morosidad</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> App Móvil iOS & Android</span>
                </div>
              </div>

              {/* Lead Capture Box */}
              <div className="lg:col-span-5 bg-gradient-to-br from-navy-950 to-navy-900 text-white p-5 rounded-2xl shadow-lg border border-navy-800">
                <span className="text-[10px] text-accent-300 font-bold uppercase">Mesas Directivas & Administradores</span>
                <h4 className="text-base font-bold text-white mt-1">Solicita un Piloto de 30 Días para tu Privada</h4>
                <p className="text-xs text-gray-300 mt-1 mb-4">Descubre cómo modernizar la caseta y la cobranza sin costo de instalación.</p>

                {formSent ? (
                  <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-semibold text-center">
                    ✓ ¡Solicitud recibida! Te contactaremos hoy mismo.
                  </div>
                ) : (
                  <form onSubmit={handleFakeSubmit} className="space-y-2.5">
                    <input
                      type="text"
                      placeholder="Nombre del Condominio o Privada"
                      required
                      className="w-full px-3 py-2 bg-navy-800 border border-navy-700 rounded-xl text-xs text-white focus:outline-none focus:border-accent-400 placeholder:text-gray-400"
                    />
                    <input
                      type="tel"
                      placeholder="WhatsApp de Contacto"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full px-3 py-2 bg-navy-800 border border-navy-700 rounded-xl text-xs text-white focus:outline-none focus:border-accent-400 placeholder:text-gray-400"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-accent-500 hover:bg-accent-400 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-accent-500/30"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Agendar Demo con la Mesa Directiva
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* HR-TCI / Tempus Commercial Landing */}
        {app.id === 'hrtci' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
                ⏱️ Time & Cost Intelligence
              </span>
              <span className="text-xs text-gray-500">SaaS B2B para Consultoras, Agencias & Tech</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight font-[family-name:var(--font-display)]">
                  Conoce la rentabilidad real de cada proyecto con <span className="text-accent-600">inteligencia de costos y AI</span>.
                </h1>
                <p className="text-sm text-gray-600 leading-relaxed">
                  HR-TCI cruza las horas de tu equipo con los salarios reales y utiliza inteligencia artificial (Groq AI) para auditar la productividad, eliminar fugas de tiempo no facturable y asegurar márgenes del 40%+.
                </p>
                <div className="grid grid-cols-3 gap-3 pt-1 text-center text-xs">
                  <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-base font-bold text-navy-800">+30%</p>
                    <p className="text-[10px] text-gray-500">Margen por Proyecto</p>
                  </div>
                  <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-base font-bold text-emerald-600">Groq AI</p>
                    <p className="text-[10px] text-gray-500">Productivity Coach</p>
                  </div>
                  <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-base font-bold text-accent-600">100%</p>
                    <p className="text-[10px] text-gray-500">Control de Nómina</p>
                  </div>
                </div>
              </div>

              {/* Lead Box */}
              <div className="lg:col-span-5 bg-gradient-to-br from-navy-950 to-navy-900 text-white p-5 rounded-2xl shadow-lg border border-navy-800">
                <span className="text-[10px] text-accent-300 font-bold uppercase">Directores, CFOs & PMs</span>
                <h4 className="text-base font-bold text-white mt-1">Calcula la Fuga de Horas en tu Equipo</h4>
                <p className="text-xs text-gray-300 mt-1 mb-4">Ingresa el tamaño de tu equipo para proyectar el incremento de margen.</p>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-navy-800 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">Equipo de 15 Colaboradores</p>
                      <p className="text-[10px] text-emerald-400">Recuperación estimada: $45,000 MXN / mes</p>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">
                      +18% Efic.
                    </span>
                  </div>
                  <button className="w-full py-2.5 bg-accent-500 hover:bg-accent-400 text-white font-bold rounded-xl text-xs cursor-pointer transition-colors shadow-md">
                    Probar HR-TCI en mi Empresa
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Existing Apps */}
        {app.id === 'estateflow' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                🌟 Preventa Exclusiva 2026
              </span>
              <span className="text-xs text-gray-500">Dzityá Norte, Mérida</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight font-[family-name:var(--font-display)]">
                  Invierte en tu patrimonio con <span className="text-accent-600">36 meses sin intereses</span> y 32% de plusvalía garantizada.
                </h1>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Lotes residenciales desde 350 m² con amenidades de club privado, lago artificial y seguridad 24/7 en la zona con mayor crecimiento de Mérida.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-700">
                  <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Escrituración Inmediata</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Régimen de Condominio</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Enganche desde 15%</span>
                </div>
              </div>

              {/* Lead Capture Box */}
              <div className="lg:col-span-5 bg-gradient-to-br from-navy-950 to-navy-900 text-white p-5 rounded-2xl shadow-lg">
                <span className="text-[10px] text-accent-300 font-bold uppercase">Acceso Inversionistas</span>
                <h4 className="text-base font-bold text-white mt-1">Descarga el Master Plan & Lista de Precios</h4>
                <p className="text-xs text-gray-300 mt-1 mb-4">Recibe la corrida financiera en tu WhatsApp al instante.</p>

                {formSent ? (
                  <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-semibold text-center">
                    ✓ ¡Brochure y lista de precios enviados a tu WhatsApp!
                  </div>
                ) : (
                  <form onSubmit={handleFakeSubmit} className="space-y-2.5">
                    <input
                      type="text"
                      placeholder="Tu nombre completo"
                      required
                      className="w-full px-3 py-2 bg-navy-800 border border-navy-700 rounded-xl text-xs text-white focus:outline-none focus:border-accent-400 placeholder:text-gray-400"
                    />
                    <input
                      type="tel"
                      placeholder="WhatsApp (Ej. 999 123 4567)"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full px-3 py-2 bg-navy-800 border border-navy-700 rounded-xl text-xs text-white focus:outline-none focus:border-accent-400 placeholder:text-gray-400"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-accent-500 hover:bg-accent-400 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-accent-500/30"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Descargar Corrida Financiera (PDF)
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {app.id === 'kavita' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
                🌿 Hotel Boutique & Spa 5★
              </span>
              <span className="text-xs text-gray-500">Mérida Colonial & Tulum</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight font-[family-name:var(--font-display)]">
                  Vive una estancia inolvidable con <span className="text-accent-600">concierge digital</span> y amenidades de alta gama.
                </h1>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Desde tu smartphone o tableta en suite: solicita room service del chef, agenda masajes holísticos con miel melipona y reserva experiencias privadas en cenotes sagrados.
                </p>
                <div className="flex items-center gap-4 text-xs font-bold text-gray-800">
                  <div className="flex text-amber-400">
                    {'★'.repeat(5)}
                  </div>
                  <span>4.9 / 5.0 en TripAdvisor & Forbes Travel</span>
                </div>
              </div>

              <div className="lg:col-span-5 bg-stone-900 text-white p-5 rounded-2xl shadow-lg border border-stone-800">
                <span className="text-[10px] text-amber-300 font-bold uppercase">Acceso Huéspedes</span>
                <h4 className="text-base font-bold text-white mt-1">Conecta con tu Suite en 1 Clic</h4>
                <p className="text-xs text-stone-300 mt-1 mb-4">Ingresa tu número de habitación o código de reserva para desbloquear tu estancia.</p>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-stone-800 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">Suite 204 · Villa Cenote</p>
                      <p className="text-[10px] text-emerald-400">✓ Check-in Digital Completado</p>
                    </div>
                    <span className="px-2.5 py-1 bg-amber-500 text-black font-bold rounded-lg text-[10px]">
                      Llave Activa
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-400 text-center pt-2">
                    Sin filas en recepción. Escanea el QR y disfruta tu villa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {app.id === 'routeops' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
                🚚 Cadena de Suministro & Frío
              </span>
              <span className="text-xs text-gray-500">Hub Puerto Progreso · Cancún · CDMX</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight font-[family-name:var(--font-display)]">
                  Transporte de carga y perecederos con <span className="text-accent-600">trazabilidad térmica</span> en tiempo real.
                </h1>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Garantizamos cero mermas en traslados de mariscos, carnes y farmacéuticos con telemetría IoT inviolable y manifiestos de entrega digital certificados.
                </p>
                <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                  <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-base font-bold text-navy-800">99.4%</p>
                    <p className="text-[10px] text-gray-500">Entregas a Tiempo</p>
                  </div>
                  <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-base font-bold text-emerald-600">-18°C</p>
                    <p className="text-[10px] text-gray-500">Cadena de Frío</p>
                  </div>
                  <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-base font-bold text-accent-600">NOM-087</p>
                    <p className="text-[10px] text-gray-500">Cumplimiento SCT</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-navy-950 text-white p-5 rounded-2xl shadow-lg border border-navy-800">
                <span className="text-[10px] text-accent-400 font-bold uppercase">Torre de Control</span>
                <h4 className="text-base font-bold text-white mt-1">Rastreo de Embarque en Vivo</h4>
                <p className="text-xs text-gray-300 mt-1 mb-3">Ingresa tu número de guía de transporte:</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    defaultValue="PRO-CUN-8841"
                    className="flex-1 px-3 py-2 bg-navy-900 border border-navy-700 rounded-xl text-xs text-white focus:outline-none"
                  />
                  <button className="px-3 py-2 bg-accent-500 hover:bg-accent-400 text-white font-bold rounded-xl text-xs cursor-pointer">
                    Rastrear
                  </button>
                </div>
                <div className="mt-3 p-2.5 bg-navy-900/80 rounded-xl text-[11px] text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  En ruta: Km 182 Carretera Mérida-Cancún (ETA: 45 min)
                </div>
              </div>
            </div>
          </div>
        )}

        {app.id === 'medikcore' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold uppercase tracking-wider">
                🏥 Hub de Especialidades Médicas
              </span>
              <span className="text-xs text-gray-500">Mérida Altabrisa & CDMX</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight font-[family-name:var(--font-display)]">
                  Tu salud en manos de los <span className="text-accent-600">mejores especialistas</span> con tecnología hospitalaria digital.
                </h1>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Agenda tu cita presencial o telemedicina en segundos. Recibe tus recetas digitales con código QR, indicaciones y estudios directamente en tu WhatsApp.
                </p>
                <div className="flex flex-wrap gap-2 pt-1 text-xs">
                  {['Cardiología', 'Traumatología', 'Pediatría', 'Medicina Interna', 'Dermatología'].map((s) => (
                    <span key={s} className="px-2.5 py-1 bg-gray-100 rounded-lg text-gray-700 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-cyan-950 to-navy-900 text-white p-5 rounded-2xl shadow-lg border border-cyan-800/40">
                <span className="text-[10px] text-cyan-300 font-bold uppercase">Agendamiento Rápido</span>
                <h4 className="text-base font-bold text-white mt-1">Agenda tu Consulta Especializada</h4>
                <p className="text-xs text-gray-300 mt-1 mb-4">Confirmación automática y recordatorio por WhatsApp.</p>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-navy-800 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">Dr. Alejandro Patrón</p>
                      <p className="text-[10px] text-gray-400">Traumatología · Torre Altabrisa</p>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">
                      Hoy Disp. 17:30 hrs
                    </span>
                  </div>
                  <button className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-bold rounded-xl text-xs cursor-pointer transition-colors shadow-md">
                    Reservar Consulta ($1,200 MXN)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {app.id === 'loyaltypulse' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                ☕ Experiencia Gastronómica & Club VIP
              </span>
              <span className="text-xs text-gray-500">Paseo de Montejo, Mérida</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight font-[family-name:var(--font-display)]">
                  Acumula sellos en tu <span className="text-amber-600">Apple Wallet</span> y gana cafés y cenas de cortesía.
                </h1>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Sin descargar aplicaciones molestas ni llenar tarjetas de cartón. Agrega tu pase digital a tu iPhone o Android en 1 tap y disfruta promociones exclusivas.
                </p>
                <div className="flex items-center gap-3 text-xs font-bold text-gray-800">
                  <span className="px-3 py-1 bg-black text-white rounded-lg flex items-center gap-1.5">
                     Add to Apple Wallet
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg">
                    GPay Google Wallet
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-amber-950 to-neutral-900 text-white p-5 rounded-2xl shadow-lg border border-amber-800/40">
                <span className="text-[10px] text-amber-300 font-bold uppercase">Pase de Miembro</span>
                <h4 className="text-base font-bold text-white mt-1">Obtén tu Café de Bienvenida Gratis</h4>
                <p className="text-xs text-amber-100/70 mt-1 mb-4">Guarda tu membresía y canjea hoy mismo en cualquier sucursal.</p>
                <button className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md">
                  <Sparkles className="w-4 h-4" />
                  Guardar Tarjeta de Lealtad en mi Celular
                </button>
              </div>
            </div>
          </div>
        )}

        {app.id === 'credifast' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
                💰 Crédito PyME & Factoraje Express
              </span>
              <span className="text-xs text-gray-500">Sureste y Centro de México</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight font-[family-name:var(--font-display)]">
                  Liquidez inmediata para tu empresa desde <span className="text-accent-600">$50,000 hasta $2,500,000 MXN</span> en 15 minutos.
                </h1>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Evaluación 100% digital con tu CIEC del SAT, sin avales hipotecarios engorrosos y con dispersión bancaria el mismo día.
                </p>
                <div className="flex items-center gap-4 text-xs font-semibold text-gray-700">
                  <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Tasa Fija Anual 18%</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Sin Penalización por Prepago</span>
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-navy-950 to-navy-900 text-white p-5 rounded-2xl shadow-lg border border-navy-800">
                <span className="text-[10px] text-accent-300 font-bold uppercase">Pre-calificación al Instante</span>
                <h4 className="text-base font-bold text-white mt-1">Simula tu Crédito Empresarial</h4>
                <div className="my-3 p-3 bg-navy-800 rounded-xl space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monto solicitado:</span>
                    <span className="font-bold text-white">$450,000 MXN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mensualidad estimada:</span>
                    <span className="font-bold text-emerald-400">$28,740 MXN / mes</span>
                  </div>
                </div>
                <button className="w-full py-2.5 bg-accent-500 hover:bg-accent-400 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md">
                  Solicitar Dictamen Express (3 Minutos)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
