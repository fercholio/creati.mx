'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, CheckCircle, Download, CreditCard, Layers, DollarSign, TrendingUp, Users, RefreshCw } from 'lucide-react'

interface Lot {
  id: number
  code: string
  area: number
  priceM2: number
  status: 'disponible' | 'apartado' | 'vendido'
  zone: 'Norte' | 'Lago' | 'Club'
}

const INITIAL_LOTS: Lot[] = [
  { id: 1, code: 'L-101', area: 350, priceM2: 1850, status: 'disponible', zone: 'Norte' },
  { id: 2, code: 'L-102', area: 380, priceM2: 1850, status: 'disponible', zone: 'Norte' },
  { id: 3, code: 'L-103', area: 420, priceM2: 2100, status: 'apartado', zone: 'Lago' },
  { id: 4, code: 'L-104', area: 450, priceM2: 2200, status: 'vendido', zone: 'Lago' },
  { id: 5, code: 'L-105', area: 360, priceM2: 1850, status: 'disponible', zone: 'Norte' },
  { id: 6, code: 'L-106', area: 500, priceM2: 2400, status: 'disponible', zone: 'Club' },
  { id: 7, code: 'L-107', area: 480, priceM2: 2400, status: 'apartado', zone: 'Club' },
  { id: 8, code: 'L-108', area: 350, priceM2: 1850, status: 'vendido', zone: 'Norte' },
  { id: 9, code: 'L-109', area: 400, priceM2: 2100, status: 'disponible', zone: 'Lago' },
  { id: 10, code: 'L-110', area: 520, priceM2: 2500, status: 'disponible', zone: 'Club' },
  { id: 11, code: 'L-111', area: 370, priceM2: 1850, status: 'apartado', zone: 'Norte' },
  { id: 12, code: 'L-112', area: 460, priceM2: 2200, status: 'disponible', zone: 'Lago' },
]

export function EstateFlowSandbox({ role }: { role: string }) {
  const [lots, setLots] = useState<Lot[]>(INITIAL_LOTS)
  const [selectedLotId, setSelectedLotId] = useState<number>(1)
  const [downPaymentPct, setDownPaymentPct] = useState<number>(20)
  const [months, setMonths] = useState<number>(36)
  const [notification, setNotification] = useState<string | null>(null)

  const selectedLot = lots.find((l) => l.id === selectedLotId) || lots[0]
  const totalPrice = selectedLot.area * selectedLot.priceM2
  const downPaymentAmount = (totalPrice * downPaymentPct) / 100
  const balanceToFinance = totalPrice - downPaymentAmount
  const monthlyPayment = Math.round(balanceToFinance / months)
  const projectedRoiValue = Math.round(totalPrice * 1.32) // +32% projected in 3 years

  const triggerNotification = (msg: string) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 3500)
  }

  const handleReserveLot = () => {
    if (selectedLot.status !== 'disponible') return
    setLots((prev) =>
      prev.map((l) => (l.id === selectedLot.id ? { ...l, status: 'apartado' } : l))
    )
    triggerNotification(`¡Lote ${selectedLot.code} apartado exitosamente con $10,000 MXN! Corrida enviada al correo.`)
  }

  const handleResetLots = () => {
    setLots(INITIAL_LOTS)
    triggerNotification('Inventario de lotes restablecido.')
  }

  if (role === 'admin') {
    const totalLotsCount = lots.length
    const availableCount = lots.filter((l) => l.status === 'disponible').length
    const reservedCount = lots.filter((l) => l.status === 'apartado').length
    const soldCount = lots.filter((l) => l.status === 'vendido').length
    const totalPortfolioValue = lots.reduce((acc, curr) => acc + curr.area * curr.priceM2, 0)
    const closedValue = lots.filter((l) => l.status === 'vendido').reduce((acc, curr) => acc + curr.area * curr.priceM2, 0)

    return (
      <div className="space-y-6">
        {/* Top KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
            <p className="text-xs text-gray-500 font-medium">Disponibles</p>
            <p className="text-2xl font-bold text-emerald-600">{availableCount} <span className="text-xs text-gray-400 font-normal">/ {totalLotsCount}</span></p>
            <span className="text-[10px] text-gray-400">Listos para cierre</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
            <p className="text-xs text-gray-500 font-medium">Apartados en Proceso</p>
            <p className="text-2xl font-bold text-amber-500">{reservedCount}</p>
            <span className="text-[10px] text-amber-600 font-medium">En validación fiduciaria</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
            <p className="text-xs text-gray-500 font-medium">Vendidos</p>
            <p className="text-2xl font-bold text-navy-700">{soldCount}</p>
            <span className="text-[10px] text-emerald-600 font-medium">100% cobrados</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
            <p className="text-xs text-gray-500 font-medium">Cartera Colocada</p>
            <p className="text-lg font-bold text-gray-900">${(closedValue / 1000000).toFixed(2)}M <span className="text-xs text-gray-400">MXN</span></p>
            <span className="text-[10px] text-accent-500 font-medium">Meta: ${(totalPortfolioValue / 1000000).toFixed(1)}M</span>
          </div>
        </div>

        {/* Master Broker Table & Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-accent-500" />
                Rendimiento de Brokers Activos
              </h4>
              <span className="text-[11px] bg-accent-50 text-accent-600 px-2 py-0.5 rounded-full font-medium">Mérida & Cancún</span>
            </div>
            <div className="space-y-2.5">
              {[
                { name: 'Grupo Península Brokers', closed: 5, pending: 2, commission: '$245,000' },
                { name: 'Maya Inversiones Prime', closed: 4, pending: 1, commission: '$198,000' },
                { name: 'Asesores Sureste Real Estate', closed: 3, pending: 1, commission: '$142,000' },
              ].map((b, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg text-xs">
                  <div>
                    <p className="font-semibold text-gray-800">{b.name}</p>
                    <p className="text-gray-400">{b.closed} ventas cerradas · {b.pending} en trámite</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-600">{b.commission}</p>
                    <p className="text-[10px] text-gray-400">Comisión 5%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4 text-navy-600" />
                Control Rápido de Inventario
              </h4>
              <p className="text-xs text-gray-500 mb-3">
                Como director comercial, puedes liberar lotes vencidos o cambiar el estatus en 1 clic para sincronizar a todos los vendedores en sus iPads al instante.
              </p>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {lots.map((l) => (
                  <div key={l.id} className="flex items-center justify-between py-1 px-2 text-xs border-b border-gray-50">
                    <span className="font-medium text-gray-700">{l.code} ({l.zone})</span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        l.status === 'disponible' ? 'bg-emerald-50 text-emerald-600' :
                        l.status === 'apartado' ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {l.status.toUpperCase()}
                      </span>
                      <button
                        onClick={() => {
                          const nextStatus: Lot['status'] = l.status === 'disponible' ? 'apartado' : l.status === 'apartado' ? 'vendido' : 'disponible'
                          setLots((prev) => prev.map((item) => item.id === l.id ? { ...item, status: nextStatus } : item))
                        }}
                        className="text-[11px] text-accent-500 hover:underline cursor-pointer"
                      >
                        Cambiar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleResetLots}
              className="mt-3 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Restablecer Inventario Demo
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Buyer Role View
  return (
    <div className="space-y-5">
      {/* Toast Notification */}
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Interactive Master Plan (7 cols) */}
        <div className="lg:col-span-7 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-accent-500" />
                Master Plan: Residencial Dzityá Norte
              </h4>
              <p className="text-[11px] text-gray-400">Toca cualquier lote para cotizar financiamiento en vivo</p>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Disp.</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Apart.</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-gray-300" /> Vend.</span>
            </div>
          </div>

          {/* Lots Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 bg-gray-50/80 p-3 rounded-xl border border-gray-100">
            {lots.map((lot) => {
              const isSelected = lot.id === selectedLot.id
              const isAvailable = lot.status === 'disponible'
              const isReserved = lot.status === 'apartado'
              return (
                <button
                  key={lot.id}
                  onClick={() => setSelectedLotId(lot.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-accent-500 bg-accent-50 ring-2 ring-accent-400/30 shadow-sm'
                      : isAvailable
                      ? 'border-emerald-200 bg-white hover:border-emerald-400 hover:shadow-xs'
                      : isReserved
                      ? 'border-amber-200 bg-amber-50/40 text-gray-600'
                      : 'border-gray-200 bg-gray-100/60 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-gray-900">{lot.code}</span>
                    <span className={`w-2 h-2 rounded-full ${
                      isAvailable ? 'bg-emerald-500 animate-pulse' : isReserved ? 'bg-amber-400' : 'bg-gray-400'
                    }`} />
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">{lot.area} m²</p>
                  <p className="text-[11px] font-bold text-navy-700 mt-0.5">
                    ${((lot.area * lot.priceM2) / 1000).toFixed(0)}k
                  </p>
                  <span className="inline-block mt-1 text-[9px] px-1.5 py-0.2 bg-gray-100 rounded text-gray-600 font-medium">
                    {lot.zone}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-gray-500 px-1">
            <span>Zona seleccionada: <strong className="text-gray-900">{selectedLot.zone}</strong></span>
            <span>Precio x m²: <strong className="text-accent-600">${selectedLot.priceM2.toLocaleString()} MXN</strong></span>
          </div>
        </div>

        {/* Right: Live Financing Calculator (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white p-5 rounded-2xl shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-navy-700/60 pb-3 mb-4">
              <div>
                <span className="text-[10px] text-accent-300 font-semibold uppercase tracking-wider">Corrida Financiera</span>
                <h5 className="text-lg font-bold text-white flex items-center gap-1.5">
                  Lote {selectedLot.code}
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    selectedLot.status === 'disponible' ? 'bg-emerald-500/20 text-emerald-300' :
                    selectedLot.status === 'apartado' ? 'bg-amber-500/20 text-amber-300' : 'bg-gray-600 text-gray-300'
                  }`}>
                    {selectedLot.status.toUpperCase()}
                  </span>
                </h5>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-400">Precio Total</span>
                <p className="text-lg font-bold text-accent-400">
                  ${totalPrice.toLocaleString()} <span className="text-xs text-gray-300">MXN</span>
                </p>
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-300">Enganche Inicial ({downPaymentPct}%):</span>
                  <span className="font-bold text-white">${downPaymentAmount.toLocaleString()} MXN</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                  className="w-full h-1.5 bg-navy-700 rounded-lg appearance-none cursor-pointer accent-accent-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-300">Plazo sin Intereses:</span>
                  <span className="font-bold text-white">{months} meses</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="48"
                  step="12"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full h-1.5 bg-navy-700 rounded-lg appearance-none cursor-pointer accent-accent-400"
                />
              </div>
            </div>

            {/* Result Box */}
            <div className="mt-5 p-3.5 bg-navy-800/80 rounded-xl border border-navy-700">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400">Mensualidad Fija</span>
                  <p className="text-2xl font-extrabold text-white">${monthlyPayment.toLocaleString()} <span className="text-xs font-normal text-accent-300">MXN/mes</span></p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 justify-end font-semibold">
                    <TrendingUp className="w-3 h-3" /> +32% ROI 3A
                  </span>
                  <p className="text-xs text-gray-300 font-medium">Valor: ${projectedRoiValue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="mt-5 space-y-2">
            <button
              onClick={handleReserveLot}
              disabled={selectedLot.status !== 'disponible'}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                selectedLot.status === 'disponible'
                  ? 'bg-accent-500 hover:bg-accent-400 text-white shadow-lg shadow-accent-500/30 active:scale-[0.98]'
                  : 'bg-navy-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              {selectedLot.status === 'disponible' ? 'Apartar con $10,000 MXN' : 'Lote No Disponible'}
            </button>
            <button
              onClick={() => triggerNotification(`Corrida financiera del lote ${selectedLot.code} lista en PDF.`)}
              className="w-full py-2 px-4 bg-navy-800 hover:bg-navy-700 text-gray-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-navy-700/80"
            >
              <Download className="w-3.5 h-3.5 text-accent-400" />
              Descargar Corrida Financiera (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

