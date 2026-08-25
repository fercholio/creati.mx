'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  Play,
  Pause,
  Brain,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  Users,
  AlertCircle,
  FileCheck,
  Sparkles,
  BarChart3,
  Calendar,
} from 'lucide-react'

export function HrTciSandbox({ role }: { role: string }) {
  const [timerRunning, setTimerRunning] = useState(true)
  const [activeTask, setActiveTask] = useState('Desarrollo Backend API & Webhooks')
  const [activeProject, setActiveProject] = useState('Fintech Pagos Maya (SOFOM)')
  const [timesheetApproved, setTimesheetApproved] = useState(false)
  const [aiCoachApplied, setAiCoachApplied] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  const triggerNotification = (msg: string) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 3500)
  }

  const handleToggleTimer = () => {
    setTimerRunning(!timerRunning)
    triggerNotification(
      timerRunning
        ? '⏸️ Cronómetro pausado. 2 hrs 45 min registradas en el proyecto.'
        : '▶️ Cronómetro activo. Registrando tiempo en vivo para Fintech Pagos Maya.'
    )
  }

  const handleApproveTimesheet = () => {
    setTimesheetApproved(true)
    triggerNotification('✅ Timesheet semanal de David Canul (40 hrs) aprobado por el Project Manager.')
  }

  const handleApplyAiSuggestion = () => {
    setAiCoachApplied(true)
    triggerNotification('🧠 AI Coach: Sugerencia de optimización aplicada. Tiempos de reunión reorganizados.')
  }

  if (role === 'manager') {
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
              className="p-3 bg-indigo-900 text-indigo-100 border border-indigo-700 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Timesheet Approval Queue (7 cols) */}
          <div className="md:col-span-7 bg-indigo-950/90 text-white p-4.5 rounded-2xl border border-indigo-800/80 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-indigo-800/80">
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-cyan-400" />
                  Aprobación Semanal de Timesheets
                </h4>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-extrabold px-2.5 py-0.5 rounded-full">
                  Semana 34 · Pendientes: 1
                </span>
              </div>

              <div className="p-3.5 bg-indigo-900/80 rounded-2xl border border-indigo-700/60 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-indigo-200/80">Colaborador:</span>
                  <span className="font-bold text-white">Ing. David Canul (Senior Dev)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-indigo-200/80">Proyecto Asignado:</span>
                  <span className="font-bold text-cyan-300">Plataforma Inmobiliaria Dzityá</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-indigo-200/80">Horas Registradas:</span>
                  <span className="font-bold text-emerald-400">40.0 hrs (100% facturables)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-indigo-200/80">Costo Operativo Real:</span>
                  <span className="font-bold text-white">$18,400 MXN (Salario + Carga Social)</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={handleApproveTimesheet}
                disabled={timesheetApproved}
                className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  timesheetApproved
                    ? 'bg-emerald-500 text-indigo-950 cursor-default'
                    : 'bg-cyan-400 hover:bg-cyan-300 text-indigo-950 shadow-sm'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {timesheetApproved ? '✓ Timesheet Aprobado y Sincronizado' : 'Aprobar Timesheet (1-Tap)'}
              </button>
              <button
                onClick={() => triggerNotification('Aclaración solicitada al colaborador vía notificación interna.')}
                className="px-3 py-2.5 bg-indigo-900 hover:bg-indigo-800 text-indigo-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer border border-indigo-700"
              >
                Pedir Ajuste
              </button>
            </div>
          </div>

          {/* Project Budget Burn Rate (5 cols) */}
          <div className="md:col-span-5 bg-indigo-900/80 text-white p-4.5 rounded-2xl border border-indigo-700/60 shadow-md flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-white mb-3 pb-2 border-b border-indigo-800/80 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                Control de Presupuesto del Proyecto
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-indigo-200/80">Consumo de Presupuesto:</span>
                    <span className="text-cyan-300 font-bold">65% ($78.4k / $120k MXN)</span>
                  </div>
                  <div className="w-full h-2.5 bg-indigo-950 rounded-full overflow-hidden border border-indigo-800">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: '65%' }} />
                  </div>
                </div>

                <div className="p-2.5 bg-indigo-950/80 rounded-xl border border-indigo-800 flex items-center justify-between">
                  <span className="text-indigo-200 font-semibold">Margen Bruto Proyectado:</span>
                  <span className="text-emerald-400 font-black text-sm">42.8%</span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-indigo-300/70 text-center mt-3 font-mono">
              Costeo basado en el salario por hora real de cada integrante.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (role === 'cfo') {
    return (
      <div className="space-y-4">
        {/* Top KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-indigo-950 text-white p-3.5 rounded-2xl border border-indigo-800 shadow-xs">
            <span className="text-[11px] text-indigo-300 font-medium">Margen Global</span>
            <p className="text-xl font-black text-emerald-400 mt-0.5">38.4%</p>
            <span className="text-[10px] text-emerald-300 font-medium">+6.2% vs mes anterior</span>
          </div>
          <div className="bg-indigo-950 text-white p-3.5 rounded-2xl border border-indigo-800 shadow-xs">
            <span className="text-[11px] text-indigo-300 font-medium">Horas Facturables</span>
            <p className="text-xl font-black text-cyan-300 mt-0.5">88.5%</p>
            <span className="text-[10px] text-indigo-200/80">Meta: &gt; 85%</span>
          </div>
          <div className="bg-indigo-950 text-white p-3.5 rounded-2xl border border-indigo-800 shadow-xs">
            <span className="text-[11px] text-indigo-300 font-medium">Facturación del Mes</span>
            <p className="text-xl font-black text-white mt-0.5">$345,000 <span className="text-xs font-normal">MXN</span></p>
            <span className="text-[10px] text-amber-300 font-medium">12 clientes activos</span>
          </div>
          <div className="bg-indigo-950 text-white p-3.5 rounded-2xl border border-indigo-800 shadow-xs flex flex-col justify-between">
            <span className="text-[11px] text-indigo-300 font-medium">Exportación</span>
            <button
              onClick={() => triggerNotification('📊 Reporte financiero y pre-facturación exportado en Excel/PDF.')}
              className="w-full py-1 bg-cyan-400 hover:bg-cyan-300 text-indigo-950 rounded text-[10px] font-extrabold cursor-pointer transition-colors"
            >
              Exportar CFO
            </button>
          </div>
        </div>

        {/* Client Profitability Table */}
        <div className="bg-indigo-950/90 text-white p-4.5 rounded-2xl border border-indigo-800/80 shadow-xs">
          <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            Matriz de Rentabilidad por Cliente y Cuenta
          </h4>
          <div className="space-y-2 text-xs">
            {[
              { client: 'Fintech Pagos Maya', revenue: '$140,000', cost: '$72,000', margin: '48.5%', status: 'high' },
              { client: 'Desarrollos Península Real Estate', revenue: '$120,000', cost: '$68,000', margin: '43.3%', status: 'high' },
              { client: 'Logística Sureste CEDIS', revenue: '$85,000', cost: '$69,000', margin: '18.8%', status: 'warning' },
            ].map((c, i) => (
              <div key={i} className="p-3 bg-indigo-900/70 rounded-xl border border-indigo-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">{c.client}</p>
                  <p className="text-[10px] text-indigo-200/70">Ingresos: {c.revenue} · Costo Nómina: {c.cost}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2.5 py-0.5 rounded font-extrabold text-xs ${
                    c.status === 'high' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {c.margin} Margen
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Collaborator / Consultant View
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
            className="p-3 bg-indigo-900 text-indigo-100 border border-indigo-700 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left: Active Live Timer & Task (7 cols) */}
        <div className="md:col-span-7 bg-indigo-950/90 text-white p-4.5 rounded-2xl border border-indigo-800/80 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-indigo-800/80">
              <div>
                <span className="text-[10px] bg-indigo-800 text-indigo-200 font-bold px-2 py-0.5 rounded-full">Proyecto Activo</span>
                <h4 className="text-sm font-bold text-white mt-1">{activeProject}</h4>
              </div>
              <span className={`w-2.5 h-2.5 rounded-full ${timerRunning ? 'bg-emerald-400 animate-ping' : 'bg-gray-400'}`} />
            </div>

            <div className="p-4 bg-indigo-900/80 rounded-2xl border border-indigo-700/60 text-center my-2">
              <span className="text-[10px] text-indigo-300/80 font-semibold uppercase tracking-wider block">Tiempo Registrado Hoy</span>
              <p className="text-3xl sm:text-4xl font-mono font-black text-cyan-300 my-1">
                02:45:18
              </p>
              <p className="text-xs text-indigo-100 font-medium">Tarea: {activeTask}</p>
            </div>
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={handleToggleTimer}
              className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                timerRunning
                  ? 'bg-amber-400 hover:bg-amber-300 text-indigo-950 shadow-sm'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-indigo-950 shadow-sm'
              }`}
            >
              {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {timerRunning ? 'Pausar Cronómetro' : 'Reanudar Cronómetro'}
            </button>
          </div>
        </div>

        {/* Right: Groq AI Productivity Coach (5 cols) */}
        <div className="md:col-span-5 bg-gradient-to-br from-indigo-900 via-violet-950 to-slate-900 text-white p-4.5 rounded-2xl shadow-md border border-indigo-800/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-indigo-800">
              <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-cyan-400" />
                AI Productivity Coach (Groq AI)
              </span>
              <span className="text-[10px] bg-cyan-400/20 text-cyan-300 px-2 py-0.5 rounded-full font-bold">
                Live
              </span>
            </div>

            <div className="space-y-2 text-xs text-indigo-100">
              <p className="leading-relaxed text-indigo-100">
                "Detectamos que has dedicado <strong>1.5 hrs hoy a reuniones no estructuradas</strong>. Tu ratio de foco profundo es del <strong>78%</strong>."
              </p>
              <div className="p-2.5 bg-indigo-950/80 rounded-xl border border-indigo-700/60 text-[11px] text-cyan-300 font-medium">
                💡 Sugerencia: Bloquear 2 horas continuas por la tarde para finalizar la integración de Webhooks sin interrupciones.
              </div>
            </div>
          </div>

          <button
            onClick={handleApplyAiSuggestion}
            disabled={aiCoachApplied}
            className={`w-full mt-3 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              aiCoachApplied
                ? 'bg-emerald-500 text-indigo-950 cursor-default'
                : 'bg-cyan-400 hover:bg-cyan-300 text-indigo-950 shadow-lg shadow-cyan-400/20'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            {aiCoachApplied ? '✓ Sugerencia Aplicada al Calendario' : 'Aplicar Sugerencia de AI Coach'}
          </button>
        </div>
      </div>
    </div>
  )
}
