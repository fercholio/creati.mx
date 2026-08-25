'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheck,
  QrCode,
  CreditCard,
  CheckCircle,
  Clock,
  Car,
  Home,
  MessageSquare,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  Send,
  UserCheck,
  Building,
} from 'lucide-react'

export function LivuSandbox({ role }: { role: string }) {
  const [visitorName, setVisitorName] = useState('Mariana Gómez')
  const [vehiclePlates, setVehiclePlates] = useState('YZX-492-B')
  const [qrGenerated, setQrGenerated] = useState(true)
  const [quotaPaid, setQuotaPaid] = useState(false)
  const [barrierOpen, setBarrierOpen] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  const triggerNotification = (msg: string) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 3500)
  }

  const handleGenerateQR = (e: React.FormEvent) => {
    e.preventDefault()
    setQrGenerated(true)
    triggerNotification(`🎟️ Pase QR generado para ${visitorName}. Enviado automáticamente por WhatsApp.`)
  }

  const handlePayQuota = () => {
    setQuotaPaid(true)
    triggerNotification('💳 Cuota de mantenimiento de $2,500 MXN pagada exitosamente. Recibo fiscal generado.')
  }

  const handleScanAndOpen = () => {
    setBarrierOpen(true)
    triggerNotification('✅ Pase QR validado en caseta. Pluma vehicular abierta. Notificación enviada al residente de Casa 42.')
    setTimeout(() => setBarrierOpen(false), 4500)
  }

  if (role === 'guard') {
    return (
      <div className="space-y-4">
        {/* Toast */}
        <AnimatePresence>
          {notification && (
            <motion.div
              key="toast-banner"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 bg-emerald-900 text-emerald-100 border border-emerald-700 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left: Terminal de Caseta (7 cols) */}
          <div className="md:col-span-7 bg-emerald-950/90 text-white p-4.5 rounded-2xl border border-emerald-800/80 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-800/80">
                <div>
                  <span className="text-[10px] bg-emerald-800/90 text-emerald-200 font-extrabold px-2.5 py-0.5 rounded-full">Caseta Principal · Pluma 01</span>
                  <h4 className="text-sm font-bold text-white mt-1">Terminal de Control de Accesos LIVU</h4>
                </div>
                <span className="text-xs text-emerald-300/80 font-mono">Privada Temozón Norte</span>
              </div>

              {/* Verified Visitor Details Card */}
              <div className="p-3.5 bg-emerald-900/80 rounded-2xl border border-emerald-700/60 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-200/80">Visitante Identificado:</span>
                  <span className="font-bold text-white">{visitorName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-200/80">Destino:</span>
                  <span className="font-bold text-amber-300">Lote 42 (Ing. Roberto Pech)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-200/80">Vehículo & Placas:</span>
                  <span className="font-mono font-bold text-emerald-950 bg-emerald-300 px-2 py-0.5 rounded border border-emerald-400">{vehiclePlates}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-200/80">Estatus del QR:</span>
                  <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> VIGENTE & AUTORIZADO
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <button
                onClick={handleScanAndOpen}
                className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  barrierOpen
                    ? 'bg-emerald-500 text-emerald-950 shadow-lg shadow-emerald-500/30 font-extrabold'
                    : 'bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold shadow-md'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                {barrierOpen ? '✓ Pluma Abierta · Ingreso Autorizado' : 'Validar QR y Abrir Pluma Vehicular'}
              </button>
            </div>
          </div>

          {/* Right: Bitácora en Vivo (5 cols) */}
          <div className="md:col-span-5 bg-emerald-900/80 text-white p-4.5 rounded-2xl border border-emerald-700/60 shadow-md flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-white mb-3 pb-2 border-b border-emerald-800/80 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                Últimos Accesos Registrados
              </h4>

              <div className="space-y-2 text-xs">
                {[
                  { time: '17:42', name: 'Paquetería Amazon', unit: 'Casa 18', type: 'Proveedor' },
                  { time: '17:35', name: 'Dr. Alejandro Solís', unit: 'Casa 05', type: 'Visita' },
                  { time: '17:10', name: 'Albercas del Mayab', unit: 'Casa 42', type: 'Servicio' },
                ].map((log, idx) => (
                  <div key={idx} className="p-2.5 bg-emerald-950/80 rounded-xl border border-emerald-800/60 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">{log.name}</p>
                      <p className="text-[10px] text-emerald-300/80">{log.unit} · {log.type}</p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-200 font-bold bg-emerald-900 px-2 py-0.5 rounded border border-emerald-700">
                      {log.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[10px] text-emerald-300/70 text-center mt-3 font-mono">
              Cámaras LPR y sensores de barrera sincronizados.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (role === 'admin') {
    return (
      <div className="space-y-4">
        {/* Top KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-emerald-950 text-white p-3.5 rounded-2xl border border-emerald-800 shadow-xs">
            <span className="text-[11px] text-emerald-300 font-medium">Recaudación del Mes</span>
            <p className="text-xl font-black text-emerald-400 mt-0.5">$185,000 <span className="text-xs font-normal">MXN</span></p>
            <span className="text-[10px] text-emerald-300 font-medium">92% del presupuesto</span>
          </div>
          <div className="bg-emerald-950 text-white p-3.5 rounded-2xl border border-emerald-800 shadow-xs">
            <span className="text-[11px] text-emerald-300 font-medium">Unidades al Día</span>
            <p className="text-xl font-black text-amber-300 mt-0.5">74 / 80</p>
            <span className="text-[10px] text-emerald-300/80">92.5% cumplimiento</span>
          </div>
          <div className="bg-emerald-950 text-white p-3.5 rounded-2xl border border-emerald-800 shadow-xs">
            <span className="text-[11px] text-emerald-300 font-medium">Morosidad</span>
            <p className="text-xl font-black text-emerald-400 mt-0.5">-85%</p>
            <span className="text-[10px] text-emerald-300">Recordatorios activos</span>
          </div>
          <div className="bg-emerald-950 text-white p-3.5 rounded-2xl border border-emerald-800 shadow-xs">
            <span className="text-[11px] text-emerald-300 font-medium">Accesos Hoy</span>
            <p className="text-xl font-black text-white mt-0.5">142</p>
            <span className="text-[10px] text-emerald-400 font-medium">0 incidencias</span>
          </div>
        </div>

        {/* Financial Overview & Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-950/90 text-white p-4.5 rounded-2xl border border-emerald-800/80 shadow-xs">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Gestión de Cuotas de Mantenimiento
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { unit: 'Casa 42 - Ing. Roberto Pech', status: 'PAGADO', amount: '$2,500 MXN', date: 'Hoy SPEI' },
                { unit: 'Casa 15 - Lic. Claudia Marín', status: 'PAGADO', amount: '$2,500 MXN', date: 'Ayer Tarjeta' },
                { unit: 'Casa 08 - Arq. Fernando Ortiz', status: 'PENDIENTE', amount: '$2,500 MXN', date: 'Recordatorio enviado' },
              ].map((q, i) => (
                <div key={i} className="p-2.5 bg-emerald-900/70 rounded-xl border border-emerald-800 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white">{q.unit}</p>
                    <p className="text-[10px] text-emerald-300/70">{q.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                      q.status === 'PAGADO' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {q.status}
                    </span>
                    <p className="text-xs font-bold text-white mt-0.5">{q.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-950/90 text-white p-4.5 rounded-2xl border border-emerald-800/80 shadow-xs flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                <Building className="w-4 h-4 text-amber-400" />
                Comunicados y Mantenimiento de Amenidades
              </h4>
              <p className="text-xs text-emerald-200/80 mb-3">
                Envía avisos a los vecinos por WhatsApp y gestiona el calendario de la Casa Club.
              </p>
              <div className="p-3 bg-emerald-900/60 rounded-xl border border-emerald-700/60 text-xs space-y-1">
                <span className="font-bold text-amber-300">Aviso General Programado:</span>
                <p className="text-emerald-100 text-[11px]">
                  "Estimados vecinos, el mantenimiento de alberca se realizará mañana martes de 8:00 a 12:00 hrs."
                </p>
              </div>
            </div>

            <button
              onClick={() => triggerNotification('📢 Comunicado enviado a 80 condóminos por la app móvil y WhatsApp.')}
              className="mt-3 w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 rounded-xl text-xs font-extrabold transition-colors cursor-pointer"
            >
              Lanzar Comunicado a Toda la Privada
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Resident View
  return (
    <div className="space-y-4">
      {/* Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            key="toast-banner"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-emerald-900 text-emerald-100 border border-emerald-700 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left: Instant QR Visitor Generator (7 cols) */}
        <div className="md:col-span-7 bg-emerald-950/90 text-white p-4.5 rounded-2xl border border-emerald-800/80 shadow-md">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-800/80">
            <div>
              <span className="text-[10px] bg-emerald-800 text-emerald-200 font-bold px-2 py-0.5 rounded-full">Residente: Casa 42</span>
              <h4 className="text-sm font-bold text-white mt-1 flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-emerald-400" />
                Generar Pase de Acceso QR para Visitas
              </h4>
            </div>
            <span className="text-xs text-emerald-400 font-bold">Válido 24 hrs</span>
          </div>

          <form onSubmit={handleGenerateQR} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-emerald-200/80 font-medium mb-1">Nombre de la Visita</label>
                <input
                  type="text"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  className="w-full px-3 py-2 bg-emerald-900/80 border border-emerald-700/80 rounded-xl text-white focus:outline-none focus:border-emerald-400 font-medium"
                />
              </div>
              <div>
                <label className="block text-emerald-200/80 font-medium mb-1">Placas del Vehículo</label>
                <input
                  type="text"
                  value={vehiclePlates}
                  onChange={(e) => setVehiclePlates(e.target.value)}
                  className="w-full px-3 py-2 bg-emerald-900/80 border border-emerald-700/80 rounded-xl text-white focus:outline-none focus:border-emerald-400 font-mono font-medium uppercase"
                />
              </div>
            </div>

            <div className="p-3 bg-emerald-900/60 rounded-xl border border-emerald-700/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QrCode className="w-8 h-8 text-amber-300" />
                <div>
                  <p className="font-bold text-white text-xs">QR Dinámico Inviolable</p>
                  <p className="text-[10px] text-emerald-200/70">Expira automáticamente tras el primer uso en caseta</p>
                </div>
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                Enviar por WhatsApp
              </button>
            </div>
          </form>
        </div>

        {/* Right: Payment & Quotas (5 cols) */}
        <div className="md:col-span-5 bg-gradient-to-br from-emerald-900 via-teal-950 to-emerald-950 text-white p-4.5 rounded-2xl shadow-md border border-emerald-800/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-emerald-800">
              <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Cuota de Mantenimiento</span>
              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                quotaPaid ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {quotaPaid ? 'PAGADO' : 'PENDIENTE'}
              </span>
            </div>

            <div className="my-3">
              <span className="text-xs text-emerald-200/80">Mes de Agosto 2026</span>
              <p className="text-2xl font-black text-white mt-0.5">
                $2,500 <span className="text-xs font-normal text-amber-300">MXN</span>
              </p>
              <p className="text-[11px] text-emerald-200/70 mt-1">
                Incluye vigilancia 24/7, mantenimiento de áreas verdes y amenidades.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={handlePayQuota}
              disabled={quotaPaid}
              className={`w-full py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                quotaPaid
                  ? 'bg-emerald-500 text-emerald-950 cursor-default'
                  : 'bg-amber-400 hover:bg-amber-300 text-emerald-950 shadow-lg shadow-amber-400/20'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              {quotaPaid ? '✓ Cuota Pagada con SPEI (Recibo Listo)' : 'Pagar con SPEI / Tarjeta ($2,500 MXN)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
