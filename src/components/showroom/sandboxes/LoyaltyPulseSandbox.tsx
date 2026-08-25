'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, QrCode, Gift, Send, Sparkles, CheckCircle2, Award, Zap, Smartphone } from 'lucide-react'

export function LoyaltyPulseSandbox({ role }: { role: string }) {
  const [stamps, setStamps] = useState(7)
  const [points, setPoints] = useState(480)
  const [notification, setNotification] = useState<string | null>(null)
  const [flashPromoSent, setFlashPromoSent] = useState(false)

  const triggerNotification = (msg: string) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 3500)
  }

  const handleAddStamp = () => {
    if (stamps < 10) {
      setStamps(stamps + 1)
      setPoints(points + 50)
      triggerNotification('☕ +1 Sello registrado y +50 puntos abonados a la cuenta.')
    } else {
      setStamps(1)
      triggerNotification('🎉 ¡Premio canjeado! Se reinicia la tarjeta de lealtad.')
    }
  }

  const handleSendFlashPromo = () => {
    setFlashPromoSent(true)
    triggerNotification('🚀 Notificación Push enviada a 450 clientes en un radio de 5km.')
  }

  if (role === 'manager') {
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
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* POS Terminal & QR Scan */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-accent-500" />
                  Terminal POS en Caja
                </h4>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded">Caja 01 · Activa</span>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl mb-3 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Cliente Escaneado:</span>
                  <span className="font-bold text-gray-900">Carlos Villarreal (Oro)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Progreso Actual:</span>
                  <span className="font-bold text-accent-600">{stamps} de 10 sellos</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Saldo en Puntos:</span>
                  <span className="font-bold text-emerald-600">{points} pts ($48 MXN)</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleAddStamp}
              className="w-full py-2.5 bg-accent-500 hover:bg-accent-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Zap className="w-4 h-4" />
              Registrar Compra (+1 Sello & +50 Puntos)
            </button>
          </div>

          {/* Geo-Push Marketing Campaign */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-accent-500" />
                  Campañas Push a Apple Wallet
                </h4>
                <span className="text-[10px] bg-accent-50 text-accent-700 font-semibold px-2 py-0.5 rounded">Sin Spam</span>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs space-y-1 mb-3">
                <p className="font-bold text-navy-900">Notificación Lockscreen Programada:</p>
                <p className="text-gray-600 text-[11px]">
                  "☕ ¡Hola Carlos! Aprovecha hoy 2x1 en Cold Brew Maya de 4:00 PM a 7:00 PM en Sucursal Montejo."
                </p>
                <span className="text-[10px] text-accent-600 font-medium block pt-1">
                  Alcance estimado: 450 miembros activos cercanos
                </span>
              </div>
            </div>

            <button
              onClick={handleSendFlashPromo}
              className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                flashPromoSent
                  ? 'bg-emerald-600 text-white'
                  : 'bg-navy-900 hover:bg-navy-800 text-white shadow-sm'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              {flashPromoSent ? '✓ Campaña Disparada con Éxito' : 'Disparar Notificación Push a Cartera'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Customer / Apple Wallet Pass View
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
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left: Apple Wallet Style Card (7 cols) */}
        <div className="md:col-span-7 bg-gradient-to-br from-amber-900 via-amber-950 to-neutral-900 text-white p-5 rounded-3xl shadow-lg flex flex-col justify-between border border-amber-800/40">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-sm tracking-wide">Café Montejo & Bistró</span>
              </div>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded-full uppercase">
                Miembro VIP Oro
              </span>
            </div>

            <div className="mt-4">
              <p className="text-xs text-amber-200/80 font-medium">Titular de la tarjeta</p>
              <h4 className="text-lg font-bold text-white tracking-wide">Carlos Villarreal</h4>
            </div>

            {/* Stamps Grid */}
            <div className="mt-4 bg-black/30 p-3 rounded-2xl border border-white/10">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-amber-200 font-medium">Tarjeta de Sellos Digital:</span>
                <span className="font-bold text-amber-400">{stamps} / 10 cafés</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {Array.from({ length: 10 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                      idx < stamps
                        ? 'bg-amber-500 text-black shadow-xs'
                        : 'bg-white/10 text-white/40 border border-white/10'
                    }`}
                  >
                    {idx < stamps ? '☕' : idx + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-amber-200/70">Puntos Acumulados</span>
              <p className="text-base font-bold text-amber-400">{points} pts</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-400 flex items-center gap-1 justify-end">
                <QrCode className="w-3 h-3 text-white" /> Escanear en Caja
              </span>
              <p className="text-xs text-gray-300 font-mono">ID: 8840-CP-2026</p>
            </div>
          </div>
        </div>

        {/* Right: Rewards to Redeem (5 cols) */}
        <div className="md:col-span-5 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5 mb-3 pb-2 border-b border-gray-100">
              <Gift className="w-4 h-4 text-accent-500" />
              Recompensas Disponibles
            </h4>

            <div className="space-y-2.5">
              {[
                { title: 'Cold Brew Maya Gratis', cost: '10 Sellos', ready: stamps >= 10 },
                { title: '15% Descuento en Cuenta', cost: '300 Pts', ready: points >= 300 },
                { title: 'Postre de la Casa de Cortesía', cost: '450 Pts', ready: points >= 450 },
              ].map((reward, i) => (
                <div key={i} className="p-2.5 bg-gray-50 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-gray-800">{reward.title}</p>
                    <p className="text-[10px] text-gray-500">Costo: {reward.cost}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (reward.ready) {
                        triggerNotification(`Cupón '${reward.title}' activado para presentar en caja.`)
                      } else {
                        triggerNotification('Puntos insuficientes para esta recompensa.')
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      reward.ready
                        ? 'bg-accent-500 hover:bg-accent-600 text-white'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {reward.ready ? 'Canjear' : 'Bloqueado'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-gray-400 mt-3 text-center">
            Integrado 100% nativo con Apple Wallet y Google Pay.
          </p>
        </div>
      </div>
    </div>
  )
}

