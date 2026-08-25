'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palmtree, Key, Utensils, Sparkles, Bell, CheckCircle2, Clock, Plus, Minus, ShoppingBag, Send } from 'lucide-react'

interface MenuItem {
  id: string
  name: string
  price: number
  category: 'food' | 'spa' | 'concierge'
  description: string
  tag?: string
}

const MENU_ITEMS: MenuItem[] = [
  { id: '1', name: 'Ceviche Maya de Pulpo y Camarón', price: 290, category: 'food', description: 'Con recado negro, aguacate local y chips de plátano macho.', tag: 'Chef Choice' },
  { id: '2', name: 'Mezcalita de Maracuyá & Habanero', price: 210, category: 'food', description: 'Mezcal artesanal con escarcha de sal de gusano y naranja agria.', tag: 'Popular' },
  { id: '3', name: 'Guacamole Rústico con Pepita', price: 180, category: 'food', description: 'Totopos de maíz criollo horneados al comal con quesillo de hebra.' },
  { id: '4', name: 'Masaje Holístico Maya (60 min)', price: 1200, category: 'spa', description: 'Aceites esenciales de copal y miel melipona en cabina privada.', tag: 'Spa' },
  { id: '5', name: 'Tour Privado Cenotes & Hacienda', price: 1850, category: 'spa', description: 'Transportación privada y guía local exclusivo.', tag: 'Experiencia' },
  { id: '6', name: 'Toallas Extra & Hielo en Suite', price: 0, category: 'concierge', description: 'Entrega prioritaria a la puerta de tu suite.' },
  { id: '7', name: 'Late Check-out Solicitud (2:00 PM)', price: 450, category: 'concierge', description: 'Sujeto a confirmación por recepción.' },
]

interface OrderTicket {
  id: string
  suite: string
  item: string
  timeAgo: string
  status: 'pending' | 'cooking' | 'delivered'
  type: 'Comanda' | 'Spa' | 'Concierge'
}

export function KavitaSandbox({ role }: { role: string }) {
  const [activeCategory, setActiveCategory] = useState<'food' | 'spa' | 'concierge'>('food')
  const [cart, setCart] = useState<{ [key: string]: number }>({})
  const [doorUnlocked, setDoorUnlocked] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)
  const [orders, setOrders] = useState<OrderTicket[]>([
    { id: 'TK-101', suite: 'Suite 204', item: 'Ceviche Maya + Mezcalita', timeAgo: 'Hace 3 min', status: 'pending', type: 'Comanda' },
    { id: 'TK-100', suite: 'Suite 108', item: 'Masaje Holístico Maya (17:00 hrs)', timeAgo: 'Hace 12 min', status: 'cooking', type: 'Spa' },
    { id: 'TK-099', suite: 'Villa 03', item: 'Toallas Extra & Hielo', timeAgo: 'Hace 25 min', status: 'delivered', type: 'Concierge' },
  ])

  const triggerNotification = (msg: string) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 3500)
  }

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const updated = { ...prev }
      if (updated[id] > 1) {
        updated[id] -= 1
      } else {
        delete updated[id]
      }
      return updated
    })
  }

  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = MENU_ITEMS.find((m) => m.id === id)
    return sum + (item ? item.price * qty : 0)
  }, 0)

  const cartCount = Object.values(cart).reduce((sum, q) => sum + q, 0)

  const handleSendOrder = () => {
    if (cartCount === 0) return
    const newTicket: OrderTicket = {
      id: `TK-${Math.floor(100 + Math.random() * 900)}`,
      suite: 'Suite 204 (Villa Cenote)',
      item: Object.entries(cart)
        .map(([id, qty]) => `${qty}x ${MENU_ITEMS.find((m) => m.id === id)?.name.split(' ')[0]}`)
        .join(', '),
      timeAgo: 'Justo ahora',
      status: 'pending',
      type: 'Comanda',
    }
    setOrders([newTicket, ...orders])
    setCart({})
    triggerNotification('¡Orden enviada a cocina/recepción! Tiempo estimado: 20 min.')
  }

  const handleUnlockDoor = () => {
    setDoorUnlocked(true)
    triggerNotification('Llave Digital NFC activada: Suite 204 Desbloqueada.')
    setTimeout(() => setDoorUnlocked(false), 4000)
  }

  if (role === 'staff') {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
          <div>
            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent-500" />
              Tablero de Despacho en Vivo (Cocina & Concierge)
            </h4>
            <p className="text-xs text-gray-500">Mérida Boutique Hotel & Spa · 12 suites activas</p>
          </div>
          <span className="text-xs font-semibold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Sincronización en Vivo
          </span>
        </div>

        {/* Kanban Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Pendientes */}
          <div className="bg-amber-50/50 p-3.5 rounded-2xl border border-amber-200/60">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> Nuevas Solicitudes ({orders.filter((o) => o.status === 'pending').length})
              </span>
            </div>
            <div className="space-y-2.5">
              {orders.filter((o) => o.status === 'pending').map((ticket) => (
                <div key={ticket.id} className="bg-white p-3 rounded-xl border border-amber-200 shadow-xs">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500 mb-1">
                    <span className="text-navy-700 font-bold">{ticket.suite}</span>
                    <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded text-[10px]">{ticket.type}</span>
                  </div>
                  <p className="text-xs font-bold text-gray-900 mb-1">{ticket.item}</p>
                  <p className="text-[10px] text-gray-400 mb-2">{ticket.timeAgo}</p>
                  <button
                    onClick={() => {
                      setOrders((prev) => prev.map((o) => o.id === ticket.id ? { ...o, status: 'cooking' } : o))
                      triggerNotification(`Ticket ${ticket.id} pasado a 'En Preparación'`)
                    }}
                    className="w-full py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Tomar Pedido
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* En Preparación */}
          <div className="bg-blue-50/50 p-3.5 rounded-2xl border border-blue-200/60">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent-500" /> En Proceso / En Camino ({orders.filter((o) => o.status === 'cooking').length})
              </span>
            </div>
            <div className="space-y-2.5">
              {orders.filter((o) => o.status === 'cooking').map((ticket) => (
                <div key={ticket.id} className="bg-white p-3 rounded-xl border border-blue-200 shadow-xs">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500 mb-1">
                    <span className="text-navy-700 font-bold">{ticket.suite}</span>
                    <span className="bg-blue-100 text-accent-700 px-1.5 py-0.5 rounded text-[10px]">{ticket.type}</span>
                  </div>
                  <p className="text-xs font-bold text-gray-900 mb-1">{ticket.item}</p>
                  <p className="text-[10px] text-gray-400 mb-2">{ticket.timeAgo}</p>
                  <button
                    onClick={() => {
                      setOrders((prev) => prev.map((o) => o.id === ticket.id ? { ...o, status: 'delivered' } : o))
                      triggerNotification(`Ticket ${ticket.id} marcado como Entregado.`)
                    }}
                    className="w-full py-1.5 bg-accent-500 hover:bg-accent-600 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Marcar Entregado
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Entregados */}
          <div className="bg-emerald-50/50 p-3.5 rounded-2xl border border-emerald-200/60">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Completados ({orders.filter((o) => o.status === 'delivered').length})
              </span>
            </div>
            <div className="space-y-2.5">
              {orders.filter((o) => o.status === 'delivered').map((ticket) => (
                <div key={ticket.id} className="bg-white p-3 rounded-xl border border-emerald-200 shadow-xs opacity-80">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500 mb-1">
                    <span className="text-navy-700 font-bold">{ticket.suite}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-800">{ticket.item}</p>
                  <p className="text-[10px] text-emerald-600 font-semibold mt-1">Servicio cerrado</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Guest View
  return (
    <div className="space-y-4">
      {/* Toast Notification */}
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

      {/* Guest Suite Header & Digital Key */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-accent-500/20 border border-accent-400/30 flex items-center justify-center text-accent-300">
            <Palmtree className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-400/20 text-accent-300 font-semibold">Huésped VIP</span>
              <span className="text-xs text-gray-400">Hacienda Santa Cruz, Mérida</span>
            </div>
            <h4 className="text-base font-bold text-white">Suite 204 · Villa Cenote</h4>
          </div>
        </div>

        {/* Digital Key Button */}
        <button
          onClick={handleUnlockDoor}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            doorUnlocked
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-105'
              : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
          }`}
        >
          <Key className={`w-4 h-4 ${doorUnlocked ? 'animate-bounce' : ''}`} />
          {doorUnlocked ? '✓ Puerta Abierta' : 'Desbloquear Llave Digital (NFC)'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Interactive Guest Catalog (8 cols) */}
        <div className="lg:col-span-8 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
            {[
              { id: 'food', label: 'Room Service & Bar', icon: Utensils },
              { id: 'spa', label: 'Spa & Experiencias', icon: Sparkles },
              { id: 'concierge', label: 'Concierge 1-Tap', icon: Bell },
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeCategory === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-accent-500 text-white shadow-sm'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Items List */}
          <div className="space-y-2.5">
            {MENU_ITEMS.filter((item) => item.category === activeCategory).map((item) => {
              const qty = cart[item.id] || 0
              return (
                <div key={item.id} className="p-3 bg-gray-50/70 hover:bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between gap-3 transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-gray-900">{item.name}</span>
                      {item.tag && (
                        <span className="text-[9px] bg-accent-50 text-accent-700 font-semibold px-1.5 py-0.5 rounded">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">{item.description}</p>
                    <p className="text-xs font-bold text-accent-600 mt-1">
                      {item.price > 0 ? `$${item.price.toLocaleString()} MXN` : 'Sin Costo / Incluido'}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 shrink-0">
                    {qty > 0 ? (
                      <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg p-1">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-gray-900 w-4 text-center">{qty}</span>
                        <button
                          onClick={() => addToCart(item.id)}
                          className="w-6 h-6 rounded bg-accent-500 hover:bg-accent-600 flex items-center justify-center text-white cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item.id)}
                        className="px-3 py-1.5 bg-white hover:bg-accent-50 border border-accent-200 hover:border-accent-400 text-accent-600 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        Agregar
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: Real-time Order Summary (4 cols) */}
        <div className="lg:col-span-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
              <ShoppingBag className="w-4 h-4 text-accent-500" />
              Tu Solicitud ({cartCount} artículos)
            </h4>

            {cartCount === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Utensils className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-xs">No has agregado amenidades o alimentos aún.</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {Object.entries(cart).map(([id, qty]) => {
                  const item = MENU_ITEMS.find((m) => m.id === id)
                  if (!item) return null
                  return (
                    <div key={id} className="flex justify-between text-xs py-1 border-b border-gray-50">
                      <span className="text-gray-700 font-medium">
                        {qty}x {item.name}
                      </span>
                      <span className="font-semibold text-gray-900">
                        ${(item.price * qty).toLocaleString()}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500">Subtotal con cargo a suite:</span>
              <span className="font-bold text-gray-900 text-sm">${cartTotal.toLocaleString()} MXN</span>
            </div>
            <p className="text-[10px] text-gray-400 mb-3">Se añadirá automáticamente a la cuenta final del check-out.</p>
            <button
              onClick={handleSendOrder}
              disabled={cartCount === 0}
              className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                cartCount > 0
                  ? 'bg-accent-500 hover:bg-accent-600 text-white shadow-md shadow-accent-200'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              Enviar Pedido al Personal
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

