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
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2 shadow-sm"
            >
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left: Terminal de Caseta & Escáner (7 cols) */}
          <div className="md:col-span-7 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                <div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">Caseta Principal · Pluma 01</span>
                  <h4 className="text-sm font-bold text-gray-900 mt-1">Terminal de Control de Accesos LIVU</h4>
                </div>
                <span className="text-xs text-gray-400 font-mono">Privada Temozón Norte</span>
              </div>

              {/* Verified Visitor Details Card */}
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Visitante Identificado:</span>
                  <span className="font-bold text-gray-900">{visitorName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Destino:</span>
                  <span className="font-bold text-navy-800">Lote 42 (Ing. Roberto Pech)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Vehículo & Placas:</span>
                  <span className="font-mono font-bold text-gray-900 bg-white px-2 py-0.5 rounded border border-gray-200">{vehiclePlates}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Estatus del QR:</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> VIGENTE & AUTORIZADO
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Lista Negra / Seguridad:</span>
                  <span className="text-emerald-700 font-semibold">Sin Reportes</span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <button
                onClick={handleScanAndOpen}
                className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  barrierOpen
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-accent-500 hover:bg-accent-600 text-white shadow-md shadow-accent-200'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                {barrierOpen ? '✓ Pluma Abierta · Ingreso Autorizado' : 'Validar QR y Abrir Pluma Vehicular'}
              </button>
            </div>
          </div>

          {/* Right: Bitácora de Caseta en Vivo (5 cols) */}
          <div className="md:col-span-5 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-accent-500" />
                Últimos Accesos Registrados
              </h4>

              <div className="space-y-2 text-xs">
                {[
                  { time: '17:42', name: 'Paquetería Amazon', unit: 'Casa 18', type: 'Proveedor' },
                  { time: '17:35', name: 'Dr. Alejandro Solís', unit: 'Casa 05', type: 'Visita' },
                  { time: '17:10', name: 'Albercas del Mayab', unit: 'Casa 42', type: 'Servicio' },
                ].map((log, idx) => (
                  <div key={idx} className="p-2 bg-gray-50 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-800">{log.name}</p>
                      <p className="text-[10px] text-gray-400">{log.unit} · {log.type}</p>
                    </div>
                    <span className="text-[10px] font-mono text-gray-500 font-bold bg-white px-2 py-0.5 rounded border border-gray-200">
                      {log.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[10px] text-gray-400 text-center mt-3">
              Cámaras LPR y sensores de barrera sincronizados en tiempo real.
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
          <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-xs">
            <span className="text-[11px] text-gray-500 font-medium">Recaudación del Mes</span>
            <p className="text-xl font-bold text-emerald-600 mt-0.5">$185,000 <span className="text-xs font-normal">MXN</span></p>
            <span className="text-[10px] text-emerald-700 font-medium">92% del presupuesto</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-xs">
            <span className="text-[11px] text-gray-500 font-medium">Unidades al Día</span>
            <p className="text-xl font-bold text-navy-800 mt-0.5">74 / 80</p>
            <span className="text-[10px] text-gray-400">92.5% de cumplimiento</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-xs">
            <span className="text-[11px] text-gray-500 font-medium">Morosidad</span>
            <p className="text-xl font-bold text-accent-600 mt-0.5">-85%</p>
            <span className="text-[10px] text-accent-700 font-medium">Recordatorios automáticos</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-xs">
            <span className="text-[11px] text-gray-500 font-medium">Accesos Hoy</span>
            <p className="text-xl font-bold text-gray-900 mt-0.5">142</p>
            <span className="text-[10px] text-emerald-600 font-medium">0 incidencias</span>
          </div>
        </div>

        {/* Financial Overview & Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
            <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              Gestión de Cuotas de Mantenimiento
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { unit: 'Casa 42 - Ing. Roberto Pech', status: 'PAGADO', amount: '$2,500 MXN', date: 'Hoy SPEI' },
                { unit: 'Casa 15 - Lic. Claudia Marín', status: 'PAGADO', amount: '$2,500 MXN', date: 'Ayer Tarjeta' },
                { unit: 'Casa 08 - Arq. Fernando Ortiz', status: 'PENDIENTE', amount: '$2,500 MXN', date: 'Recordatorio enviado' },
              ].map((q, i) => (
                <div key={i} className="p-2.5 bg-gray-50 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-800">{q.unit}</p>
                    <p className="text-[10px] text-gray-400">{q.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      q.status === 'PAGADO' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {q.status}
                    </span>
                    <p className="text-xs font-bold text-gray-900 mt-0.5">{q.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                <Building className="w-4 h-4 text-navy-600" />
                Comunicados y Mantenimiento de Amenidades
              </h4>
              <p className="text-xs text-gray-500 mb-3">
                Envía avisos a los vecinos por WhatsApp y gestiona el calendario de la Casa Club y Canchas de Pádel.
              </p>
              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs space-y-1">
                <span className="font-bold text-navy-900">Aviso General Programado:</span>
                <p className="text-gray-600 text-[11px]">
                  "Estimados vecinos, el mantenimiento de alberca se realizará mañana martes de 8:00 a 12:00 hrs."
                </p>
              </div>
            </div>

            <button
              onClick={() => triggerNotification('📢 Comunicado enviado a 80 condóminos por la app móvil y WhatsApp.')}
              className="mt-3 w-full py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2 shadow-sm"
          >
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left: Instant QR Visitor Generator (7 cols) */}
        <div className="md:col-span-7 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
            <div>
              <span className="text-[10px] bg-accent-50 text-accent-700 font-bold px-2 py-0.5 rounded-full">Residente: Casa 42</span>
              <h4 className="text-sm font-bold text-gray-900 mt-1 flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-accent-500" />
                Generar Pase de Acceso QR para Visitas
              </h4>
            </div>
            <span className="text-xs text-emerald-600 font-semibold">Válido 24 hrs</span>
          </div>

          <form onSubmit={handleGenerateQR} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-600 font-medium mb-1">Nombre de la Visita</label>
                <input
                  type="text"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-accent-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">Placas del Vehículo</label>
                <input
                  type="text"
                  value={vehiclePlates}
                  onChange={(e) => setVehiclePlates(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-accent-500 font-mono font-medium uppercase"
                />
              </div>
            </div>

            <div className="p-3 bg-accent-50/50 rounded-xl border border-accent-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QrCode className="w-8 h-8 text-navy-900" />
                <div>
                  <p className="font-bold text-navy-900 text-xs">QR Dinámico Inviolable</p>
                  <p className="text-[10px] text-gray-500">Expira automáticamente tras el primer uso en caseta</p>
                </div>
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                Enviar por WhatsApp
              </button>
            </div>
          </form>
        </div>

        {/* Right: Payment & Quotas (5 cols) */}
        <div className="md:col-span-5 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white p-4 sm:p-5 rounded-2xl shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-navy-700">
              <span className="text-[10px] text-accent-300 font-bold uppercase tracking-wider">Cuota de Mantenimiento</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                quotaPaid ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {quotaPaid ? 'PAGADO' : 'PENDIENTE'}
              </span>
            </div>

            <div className="my-3">
              <span className="text-xs text-gray-300">Mes de Agosto 2026</span>
              <p className="text-2xl font-black text-white mt-0.5">
                $2,500 <span className="text-xs font-normal text-accent-300">MXN</span>
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                Incluye vigilancia 24/7, mantenimiento de áreas verdes y amenidades.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={handlePayQuota}
              disabled={quotaPaid}
              className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                quotaPaid
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-accent-500 hover:bg-accent-400 text-white shadow-lg shadow-accent-500/30 active:scale-[0.98]'
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

