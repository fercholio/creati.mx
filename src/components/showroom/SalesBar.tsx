'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Tablet,
  UserCheck,
  Building2,
  Calculator,
  MessageSquare,
  Sparkles,
  Share2,
  Sun,
  Moon,
  ChevronDown,
  ChevronUp,
  X,
  Send,
  DollarSign,
  TrendingUp,
  Award,
  Utensils,
} from 'lucide-react'

interface SalesBarProps {
  prospectName: string
  onProspectNameChange: (name: string) => void
  themeMode: 'light' | 'dark'
  onThemeModeToggle: () => void
  currentAppTitle: string
  onOpenMenuDrawer: () => void
}

export function SalesBar({
  prospectName,
  onProspectNameChange,
  themeMode,
  onThemeModeToggle,
  currentAppTitle,
  onOpenMenuDrawer,
}: SalesBarProps) {
  const [isRoiOpen, setIsRoiOpen] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [prospectPhone, setProspectPhone] = useState('')
  const [unitCount, setUnitCount] = useState(25)
  const [avgTicket, setAvgTicket] = useState(15000)
  const [shareSent, setShareSent] = useState(false)

  // Calculations for express ROI
  const estimatedSavings = Math.round(unitCount * avgTicket * 0.18)
  const estimatedInvestment = Math.round(unitCount * 2800 + 45000)
  const paybackMonths = Math.max(1, Math.round((estimatedInvestment / (estimatedSavings / 12)) * 10) / 10)

  const handleShareSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prospectPhone) return
    setShareSent(true)
    setTimeout(() => {
      setShareSent(false)
      setIsShareOpen(false)
      setProspectPhone('')
    }, 2800)
  }

  const whatsappShareUrl = `https://wa.me/52${prospectPhone}?text=${encodeURIComponent(
    `Hola ${prospectName || 'Cliente'}, fue un gusto reunirnos hoy. Te comparto el resumen de la propuesta interactiva de ${currentAppTitle} preparada por Creati: https://creati.mx/showroom`
  )}`

  return (
    <div className="space-y-3">
      {/* Top Sales Bar Header */}
      <div className={`p-3 sm:p-4 rounded-2xl sm:rounded-3xl border transition-all shadow-md ${
        themeMode === 'dark'
          ? 'bg-slate-900 border-slate-800 text-white'
          : 'bg-white border-gray-200/90 text-gray-900'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left: Rep Identity & Creati Seal */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-500 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-tight">Creati Software Studio</span>
                <span className="text-[10px] bg-accent-50 text-accent-700 font-bold px-2 py-0.2 rounded-full border border-accent-100">
                  Mérida, Yucatán
                </span>
              </div>
              <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                <UserCheck className="w-3.5 h-3.5 text-accent-500" />
                <span>Asesor Comercial: <strong>Carlos Mendoza</strong> · Soluciones B2B</span>
              </p>
            </div>
          </div>

          {/* Center: Co-Branding Input (Client Name Personalizer) */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl shrink-0">
            <Building2 className="w-4 h-4 text-accent-500" />
            <span className="text-gray-500 font-medium hidden md:inline">Demo para:</span>
            <input
              type="text"
              placeholder="Escribe el nombre del cliente..."
              value={prospectName}
              onChange={(e) => onProspectNameChange(e.target.value)}
              className="bg-transparent text-xs font-bold text-gray-900 focus:outline-none w-44 sm:w-56 placeholder:text-gray-400 font-[family-name:var(--font-display)]"
            />
            {prospectName && (
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                Co-Branding Activo
              </span>
            )}
          </div>

          {/* Right: Quick Sales Action Buttons */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Bistro Tech Menu Button */}
            <button
              onClick={onOpenMenuDrawer}
              className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-extrabold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/20 transition-all active:scale-[0.98]"
            >
              <Utensils className="w-4 h-4" />
              <span>Menú de Especialidades</span>
            </button>

            {/* ROI Calculator Button */}
            <button
              onClick={() => setIsRoiOpen(true)}
              className="px-3 py-1.5 bg-accent-50 hover:bg-accent-100 text-accent-700 border border-accent-200 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Calculadora ROI</span>
            </button>

            {/* Share WhatsApp Proposal Button */}
            <button
              onClick={() => setIsShareOpen(true)}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Enviar a WhatsApp</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={onThemeModeToggle}
              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl cursor-pointer transition-colors"
              title="Cambiar Tema Visual (Claro / Oscuro Executive)"
            >
              {themeMode === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-navy-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* ROI Calculator Modal */}
      <AnimatePresence>
        {isRoiOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-gray-100 relative text-xs"
            >
              <button
                onClick={() => setIsRoiOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Calculadora de ROI & Impacto Express</h3>
                  <p className="text-[11px] text-gray-500">Estimación en vivo para {prospectName || 'el Cliente'}</p>
                </div>
              </div>

              <div className="space-y-4 my-4">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-gray-600">Escala de Operación (Unidades / Integrantes):</span>
                    <span className="text-navy-900 font-bold">{unitCount}</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="150"
                    value={unitCount}
                    onChange={(e) => setUnitCount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-gray-600">Valor / Ticket Promedio por Operación:</span>
                    <span className="text-navy-900 font-bold">${avgTicket.toLocaleString()} MXN</span>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="50000"
                    step="1000"
                    value={avgTicket}
                    onChange={(e) => setAvgTicket(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent-500"
                  />
                </div>

                {/* Calculation Results Card */}
                <div className="p-4 bg-navy-950 text-white rounded-2xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Inversión Estimada:</span>
                    <span className="font-bold text-white">${estimatedInvestment.toLocaleString()} MXN</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Ahorro Operativo Anual:</span>
                    <span className="font-bold text-emerald-400">${estimatedSavings.toLocaleString()} MXN</span>
                  </div>
                  <div className="pt-2 border-t border-navy-800 flex justify-between items-center text-sm">
                    <span className="font-bold text-accent-300">Retorno de Inversión (ROI):</span>
                    <span className="font-black text-amber-400 text-base">{paybackMonths} meses</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsRoiOpen(false)}
                className="w-full py-2.5 bg-navy-900 hover:bg-navy-800 text-white font-bold rounded-xl text-xs"
              >
                Usar esta Proyección en el Pitch
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Share Proposal via WhatsApp Modal */}
      <AnimatePresence>
        {isShareOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-gray-100 relative text-xs"
            >
              <button
                onClick={() => setIsShareOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Enviar Propuesta por WhatsApp</h3>
                  <p className="text-[11px] text-gray-500">Enviar a {prospectName || 'el Cliente'}</p>
                </div>
              </div>

              {shareSent ? (
                <div className="py-8 text-center space-y-2">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    ✓
                  </div>
                  <p className="font-bold text-gray-900">¡Enlace enviado a WhatsApp!</p>
                  <p className="text-gray-500 text-[11px]">El cliente ha recibido la propuesta interactiva.</p>
                </div>
              ) : (
                <form onSubmit={handleShareSubmit} className="space-y-3">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">WhatsApp del Cliente (10 dígitos)</label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. 999 123 4567"
                      value={prospectPhone}
                      onChange={(e) => setProspectPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-accent-500 text-xs font-medium"
                    />
                  </div>

                  <a
                    href={whatsappShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShareSent(true)}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-xs shadow-md transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Abrir WhatsApp y Enviar Propuesta
                  </a>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
