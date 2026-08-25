'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  Clock,
  Building2,
  Palmtree,
  Truck,
  Stethoscope,
  ShoppingBag,
  Coins,
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle,
  Tablet,
  Layout,
  Layers,
} from 'lucide-react'
import { SHOWROOM_APPS, ShowroomApp } from '@/data/showroomData'
import { ShowroomModal } from './ShowroomModal'
import { SalesBar } from './SalesBar'

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldCheck,
  Clock,
  Building2,
  Palmtree,
  Truck,
  Stethoscope,
  ShoppingBag,
  Coins,
}

interface ShowroomHubProps {
  initialAppId?: string
  isStandalonePage?: boolean
}

export function ShowroomHub({ initialAppId = 'livu', isStandalonePage = false }: ShowroomHubProps) {
  const [selectedAppId, setSelectedAppId] = useState<string>(initialAppId)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [prospectName, setProspectName] = useState<string>('')
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light')

  const currentApp = SHOWROOM_APPS.find((a) => a.id === selectedAppId) || SHOWROOM_APPS[0]

  const handleOpenDemo = (appId: string) => {
    setSelectedAppId(appId)
    setIsModalOpen(true)
  }

  const filteredApps = categoryFilter === 'all'
    ? SHOWROOM_APPS
    : SHOWROOM_APPS.filter((a) => a.id === categoryFilter)

  return (
    <div className="space-y-8">
      {/* Sales Representative Identity & Co-Branding Toolbar */}
      <SalesBar
        prospectName={prospectName}
        onProspectNameChange={setProspectName}
        themeMode={themeMode}
        onThemeModeToggle={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
        currentAppTitle={currentApp.title}
      />

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center flex-wrap gap-2">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            categoryFilter === 'all'
              ? 'bg-navy-900 text-white shadow-md'
              : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
          }`}
        >
          Todas las Soluciones ({SHOWROOM_APPS.length})
        </button>
        {SHOWROOM_APPS.map((app) => {
          const Icon = ICON_MAP[app.iconName] || Building2
          const isSelected = categoryFilter === app.id
          return (
            <button
              key={`filter-${app.id}`}
              onClick={() => setCategoryFilter(app.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-accent-400' : 'text-gray-500'}`} />
              <span>{app.badge}</span>
            </button>
          )
        })}
      </div>

      {/* Spacious Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredApps.map((app, index) => {
          const Icon = ICON_MAP[app.iconName] || Building2
          return (
            <motion.div
              key={`card-${app.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`group bg-white rounded-3xl border shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${
                app.isFeatured
                  ? 'border-accent-300 ring-2 ring-accent-400/10'
                  : 'border-gray-200/90 hover:border-accent-300'
              }`}
            >
              {/* Featured Ribbon */}
              {app.isFeatured && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="text-[10px] font-extrabold bg-gradient-to-r from-accent-600 to-navy-700 text-white px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Solución Creati
                  </span>
                </div>
              )}

              {/* Card Top Header */}
              <div className="p-6 pb-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-accent-50 text-accent-600 border border-accent-100 flex items-center justify-center group-hover:scale-105 group-hover:bg-accent-500 group-hover:text-white transition-all duration-300 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  {!app.isFeatured && (
                    <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {app.targetRegion.split(',')[0]}
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-xs font-bold text-accent-600 uppercase tracking-wider block">
                    {app.industry}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-1 group-hover:text-accent-600 transition-colors font-[family-name:var(--font-display)] flex items-center gap-2">
                    <span>{app.title}</span>
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed line-clamp-2">
                    {prospectName ? `Configuración personalizada para ${prospectName}: ${app.tagline}` : app.tagline}
                  </p>
                </div>

                {/* Micro Mockup Visual Box */}
                <div
                  onClick={() => handleOpenDemo(app.id)}
                  className="bg-gray-50 hover:bg-accent-50/40 border border-gray-100 rounded-2xl p-3.5 transition-all cursor-pointer relative overflow-hidden group/preview"
                >
                  <div className="flex items-center justify-between text-[11px] text-gray-500 mb-2">
                    <span className="font-semibold text-gray-800 flex items-center gap-1">
                      <Tablet className="w-3.5 h-3.5 text-accent-500" />
                      Vista Demo & Landing
                    </span>
                    <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-600">
                      {app.roles.length} Roles Disponibles
                    </span>
                  </div>

                  {/* Metrics preview row */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="bg-white p-2 rounded-xl border border-gray-100">
                      <p className="text-xs font-extrabold text-navy-800">{app.metrics[0].value}</p>
                      <p className="text-[9px] text-gray-500">{app.metrics[0].label}</p>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-gray-100">
                      <p className="text-xs font-extrabold text-emerald-600">{app.metrics[1].value}</p>
                      <p className="text-[9px] text-gray-500">{app.metrics[1].label}</p>
                    </div>
                  </div>

                  {/* Hover Overlay Badge */}
                  <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-2xs opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold">
                    <Play className="w-4 h-4 text-accent-400 fill-accent-400" />
                    {prospectName ? `Abrir Demo para ${prospectName}` : 'Abrir Simulador Interactivo'}
                  </div>
                </div>
              </div>

              {/* Card Footer CTA Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => handleOpenDemo(app.id)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm group-hover:shadow-md ${
                    app.isFeatured
                      ? 'bg-accent-500 hover:bg-accent-600 text-white'
                      : 'bg-navy-900 hover:bg-accent-500 text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  Probar Demo & Ver Landing
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Full-Screen Immersive Studio Modal */}
      <ShowroomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialAppId={selectedAppId}
        prospectName={prospectName}
      />
    </div>
  )
}
