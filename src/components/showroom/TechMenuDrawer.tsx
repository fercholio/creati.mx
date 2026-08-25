'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Utensils,
  X,
  Sparkles,
  Play,
  ShieldCheck,
  Clock,
  Building2,
  Palmtree,
  Truck,
  Stethoscope,
  ShoppingBag,
  Coins,
  ChevronRight,
  Flame,
  Award,
  BookOpen,
} from 'lucide-react'
import { SHOWROOM_APPS, ShowroomApp } from '@/data/showroomData'

interface TechMenuDrawerProps {
  isOpen: boolean
  onClose: () => void
  onSelectApp: (appId: string) => void
  currentAppId?: string
}

const MENU_CATEGORIES = [
  {
    categoryTitle: '🥗 Entradas / Starter Apps (Seguridad & Accesos)',
    subtitle: 'Soluciones ligeras de implementación inmediata',
    appIds: ['livu'],
  },
  {
    categoryTitle: '🥩 Platos Fuertes / Core Operations (Gestión Empresarial)',
    subtitle: 'El motor principal de rentabilidad y control operativo',
    appIds: ['hrtci', 'estateflow', 'routeops'],
  },
  {
    categoryTitle: '🍹 Coctelería & Experiencias (Engagement de Clientes)',
    subtitle: 'Para cautivar y fidelizar al usuario final',
    appIds: ['kavita', 'loyaltypulse'],
  },
  {
    categoryTitle: '🍰 Postres & Especialidades (Salud & Fintech)',
    subtitle: 'Soluciones especializadas de alto impacto',
    appIds: ['medikcore', 'credifast'],
  },
]

export function TechMenuDrawer({
  isOpen,
  onClose,
  onSelectApp,
  currentAppId,
}: TechMenuDrawerProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          key="tech-menu-binder"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-4xl bg-stone-950 text-amber-50 rounded-[32px] p-6 sm:p-10 shadow-2xl border-2 border-amber-500/30 overflow-hidden my-auto max-h-[92vh] flex flex-col font-[family-name:var(--font-display)]"
        >
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-amber-500/20 to-transparent rounded-tl-[32px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-amber-500/20 to-transparent rounded-br-[32px] pointer-events-none" />

          {/* Menu Header */}
          <div className="flex items-center justify-between pb-6 border-b border-amber-500/30 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold shadow-xs">
                <Utensils className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-widest block">
                  Creati Gourmet Tech Menu · iPad Edition
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-amber-100 tracking-tight">
                  Menú de Especialidades en Software
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl text-amber-400/70 hover:text-amber-200 hover:bg-amber-500/20 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Scrollable Body */}
          <div className="py-6 overflow-y-auto space-y-8 pr-1">
            {MENU_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="space-y-4">
                <div className="border-b border-amber-500/20 pb-2">
                  <h3 className="text-base sm:text-lg font-bold text-amber-300 flex items-center gap-2">
                    <span>{cat.categoryTitle}</span>
                  </h3>
                  <p className="text-xs text-amber-200/60 font-sans italic">{cat.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cat.appIds.map((id) => {
                    const app = SHOWROOM_APPS.find((a) => a.id === id)
                    if (!app) return null
                    const isSelected = app.id === currentAppId

                    return (
                      <div
                        key={app.id}
                        onClick={() => {
                          onSelectApp(app.id)
                          onClose()
                        }}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400 shadow-md ring-1 ring-amber-400/40'
                            : 'bg-stone-900/90 hover:bg-amber-950/60 border-amber-500/20 hover:border-amber-400/50'
                        }`}
                      >
                        {app.isFeatured && (
                          <span className="absolute top-3 right-3 text-[9px] font-bold bg-amber-500 text-stone-950 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Flame className="w-3 h-3 fill-stone-950" /> Especialidad de la Casa
                          </span>
                        )}

                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-base font-bold text-amber-100 group-hover:text-amber-400 transition-colors">
                              {app.title}
                            </h4>
                            <span className="text-[10px] text-amber-300/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                              {app.badge}
                            </span>
                          </div>

                          <p className="text-xs text-amber-100/70 font-sans leading-relaxed line-clamp-2 mt-1">
                            {app.tagline}
                          </p>

                          <div className="mt-3 font-sans text-[11px] text-amber-200/80 space-y-1">
                            <p><strong className="text-amber-400 font-semibold">Maridaje Ideal:</strong> {app.industry}</p>
                            <p><strong className="text-emerald-400 font-semibold">Impacto:</strong> {app.metrics[0].value} {app.metrics[0].label}</p>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-between font-sans text-xs">
                          <span className="text-[10px] text-amber-300/60">
                            {app.roles.length} Vistas Operativas
                          </span>
                          <span className="font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Degustar Software en Vivo <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Menu Footer */}
          <div className="pt-4 border-t border-amber-500/30 flex items-center justify-between text-xs text-amber-200/60 font-sans shrink-0">
            <span>Creati Engineering · Mérida, Yucatán</span>
            <span className="text-amber-400 font-bold">Selecciona una especialidad para iniciar la demostración</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
