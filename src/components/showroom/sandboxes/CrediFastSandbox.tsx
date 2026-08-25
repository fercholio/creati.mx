'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coins, CheckCircle, ShieldCheck, FileCheck, DollarSign, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react'

export function CrediFastSandbox({ role }: { role: string }) {
  const [amount, setAmount] = useState(450000)
  const [months, setMonths] = useState(18)
  const [status, setStatus] = useState<'simulating' | 'preapproved' | 'disbursed'>('simulating')
  const [notification, setNotification] = useState<string | null>(null)

  const annualRate = 0.18 // 18%
  const monthlyRate = annualRate / 12
  const monthlyPayment = Math.round(
    (amount * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
    (Math.pow(1 + monthlyRate, months) - 1)
  )

  const triggerNotification = (msg: string) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 3500)
  }

  const handlePreapprove = () => {
    setStatus('preapproved')
    triggerNotification('🚀 ¡Evaluación algorítmica completada! Crédito pre-aprobado por $450,000 MXN.')
  }

  const handleDisburse = () => {
    setStatus('disbursed')
    triggerNotification('✅ Contrato firmado digitalmente (NOM-151). Dispersión bancaria SPEI autorizada.')
  }

  if (role === 'underwriter') {
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

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
            <div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">Scoring Automatizado: 94/100 (Riesgo Bajo)</span>
              <h4 className="text-sm font-bold text-gray-900 mt-1">Alimentos Peninsulares del Mayab S.A. de C.V.</h4>
              <p className="text-xs text-gray-400">Solicitud de Crédito Simple · $450,000 MXN a 18 meses</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-navy-700">RFC: APM180422-9K2</span>
              <p className="text-[10px] text-gray-400">Mérida, Yucatán</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div className="p-3 bg-gray-50 rounded-xl">
              <span className="text-[10px] text-gray-400 font-medium">Buró de Crédito</span>
              <p className="text-lg font-bold text-emerald-600">742 pts</p>
              <span className="text-[10px] text-gray-500">Historial impecable (MOP 01)</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <span className="text-[10px] text-gray-400 font-medium">Facturación SAT Mensual</span>
              <p className="text-lg font-bold text-navy-800">$320,000 <span className="text-xs font-normal">MXN</span></p>
              <span className="text-[10px] text-gray-500">Validado con CIEC vía API</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <span className="text-[10px] text-gray-400 font-medium">Cobertura de Servicio de Deuda</span>
              <p className="text-lg font-bold text-accent-600">3.4x</p>
              <span className="text-[10px] text-emerald-600 font-medium">Capacidad de pago holgada</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-gray-100">
            <button
              onClick={handleDisburse}
              disabled={status === 'disbursed'}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                status === 'disbursed'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-accent-500 hover:bg-accent-600 text-white shadow-sm'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              {status === 'disbursed' ? '✓ Desembolso Autorizado y Sincronizado' : 'Aprobar Crédito y Emitir Pagaré NOM-151'}
            </button>
            <button
              onClick={() => triggerNotification('Expediente marcado para revisión adicional por mesa de control.')}
              className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
            >
              Solicitar Aclaración
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Borrower View
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Interactive Loan Sliders (7 cols) */}
        <div className="lg:col-span-7 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5 mb-4 pb-2 border-b border-gray-100">
            <Coins className="w-4 h-4 text-accent-500" />
            Simulador de Crédito Empresarial PyME
          </h4>

          {/* Amount Slider */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-gray-600 font-medium">Monto del Préstamo:</span>
                <span className="text-base font-extrabold text-navy-800">${amount.toLocaleString()} MXN</span>
              </div>
              <input
                type="range"
                min="50000"
                max="2000000"
                step="50000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent-500"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>$50,000</span>
                <span>$1,000,000</span>
                <span>$2,000,000</span>
              </div>
            </div>

            {/* Months Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-gray-600 font-medium">Plazo de Pago:</span>
                <span className="text-sm font-bold text-navy-800">{months} meses</span>
              </div>
              <input
                type="range"
                min="6"
                max="36"
                step="6"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent-500"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>6 meses</span>
                <span>18 meses</span>
                <span>36 meses</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-semibold">Tasa Ordinaria Fija</span>
              <p className="font-bold text-gray-900">18.0% Anual + IVA</p>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-semibold">CAT Promedio</span>
              <p className="font-bold text-gray-900">22.4% Sin Comisión por Apertura</p>
            </div>
          </div>
        </div>

        {/* Right: Payment Breakdown & Approval CTA (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white p-5 rounded-2xl shadow-md flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-accent-300 font-semibold uppercase tracking-wider">Desglose Financiero</span>
            <div className="mt-2 pb-3 border-b border-navy-700/60">
              <span className="text-xs text-gray-400">Mensualidad Estimada</span>
              <p className="text-2xl font-black text-white mt-0.5">
                ${monthlyPayment.toLocaleString()} <span className="text-xs font-normal text-accent-300">MXN</span>
              </p>
            </div>

            <div className="space-y-2 text-xs text-gray-300 my-4">
              <div className="flex justify-between">
                <span>Intereses totales:</span>
                <span className="font-semibold text-white">${((monthlyPayment * months) - amount).toLocaleString()} MXN</span>
              </div>
              <div className="flex justify-between">
                <span>Tiempo de dictamen:</span>
                <span className="font-semibold text-emerald-400">&lt; 15 minutos</span>
              </div>
              <div className="flex justify-between">
                <span>Requisitos:</span>
                <span className="font-semibold text-white">CIEC del SAT + INE</span>
              </div>
            </div>
          </div>

          <button
            onClick={handlePreapprove}
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-accent-500 hover:bg-accent-400 text-white shadow-lg shadow-accent-500/30 flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-[0.98]"
          >
            <ShieldCheck className="w-4 h-4" />
            {status === 'preapproved' ? '✓ Crédito Pre-Aprobado al Instante' : 'Simular Pre-Aprobación Inmediata'}
          </button>
        </div>
      </div>
    </div>
  )
}

