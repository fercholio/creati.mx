'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Building2,
  Palmtree,
  Truck,
  Stethoscope,
  ShoppingBag,
  Coins,
  ShieldCheck,
  Clock,
  Layout,
  Layers,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Tablet,
  CheckCircle2,
  Award,
} from 'lucide-react'
import { SHOWROOM_APPS, ShowroomApp } from '@/data/showroomData'
import { LivuSandbox } from './sandboxes/LivuSandbox'
import { HrTciSandbox } from './sandboxes/HrTciSandbox'
import { EstateFlowSandbox } from './sandboxes/EstateFlowSandbox'
import { KavitaSandbox } from './sandboxes/KavitaSandbox'
import { RouteOpsSandbox } from './sandboxes/RouteOpsSandbox'
import { MedikCoreSandbox } from './sandboxes/MedikCoreSandbox'
import { LoyaltyPulseSandbox } from './sandboxes/LoyaltyPulseSandbox'
import { CrediFastSandbox } from './sandboxes/CrediFastSandbox'
import { CommercialLandingPreview } from './landboxes/CommercialLandingPreview'
import { QuoteModal } from './QuoteModal'

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

interface ShowroomModalProps {
  isOpen: boolean
  onClose: () => void
  initialAppId?: string
  prospectName?: string
}

export function ShowroomModal({
  isOpen,
  onClose,
  initialAppId = 'livu',
  prospectName = '',
}: ShowroomModalProps) {
  const [activeAppId, setActiveAppId] = useState<string>(initialAppId)
  const [viewMode, setViewMode] = useState<'app' | 'landing'>('app')
  const [selectedRoleId, setSelectedRoleId] = useState<string>('')
  const [showPitchNotes, setShowPitchNotes] = useState<boolean>(false)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false)

  // Sync initialAppId when changed
  useEffect(() => {
    if (initialAppId) {
      setActiveAppId(initialAppId)
      const found = SHOWROOM_APPS.find((a) => a.id === initialAppId) || SHOWROOM_APPS[0]
      setSelectedRoleId(found.roles[0].id)
    }
  }, [initialAppId, isOpen])

  // Lock body scroll when modal is open & listen to Esc key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const currentApp = SHOWROOM_APPS.find((a) => a.id === activeAppId) || SHOWROOM_APPS[0]

  const handleSelectApp = (appId: string) => {
    setActiveAppId(appId)
    const app = SHOWROOM_APPS.find((a) => a.id === appId) || SHOWROOM_APPS[0]
    setSelectedRoleId(app.roles[0].id)
  }

  const renderActiveSandbox = () => {
    switch (currentApp.id) {
      case 'livu':
        return <LivuSandbox role={selectedRoleId || currentApp.roles[0].id} />
      case 'hrtci':
        return <HrTciSandbox role={selectedRoleId || currentApp.roles[0].id} />
      case 'estateflow':
        return <EstateFlowSandbox role={selectedRoleId || currentApp.roles[0].id} />
      case 'kavita':
        return <KavitaSandbox role={selectedRoleId || currentApp.roles[0].id} />
      case 'routeops':
        return <RouteOpsSandbox role={selectedRoleId || currentApp.roles[0].id} />
      case 'medikcore':
        return <MedikCoreSandbox role={selectedRoleId || currentApp.roles[0].id} />
      case 'loyaltypulse':
        return <LoyaltyPulseSandbox role={selectedRoleId || currentApp.roles[0].id} />
      case 'credifast':
        return <CrediFastSandbox role={selectedRoleId || currentApp.roles[0].id} />
      default:
        return <LivuSandbox role={selectedRoleId || currentApp.roles[0].id} />
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="showroom-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-navy-950/70 backdrop-blur-xl overflow-y-auto"
          >
            <motion.div
              key={`showroom-modal-card-${currentApp.id}`}
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-7xl bg-[#fafafa] rounded-3xl shadow-2xl border border-white/20 flex flex-col my-auto max-h-[94vh] overflow-hidden"
            >
              {/* Co-Branding Personalized Banner if client name is specified */}
              {prospectName && (
                <div className="bg-gradient-to-r from-accent-600 to-navy-900 text-white px-6 py-2 text-xs flex items-center justify-between font-semibold shrink-0">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-accent-300" />
                    <span>Demostración Ejecutiva Personalizada para: <strong>{prospectName}</strong></span>
                  </span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono">
                    Creati Sales Kiosk Mode
                  </span>
                </div>
              )}

              {/* Top Bar Navigation */}
              <div className="bg-white px-4 sm:px-6 py-3.5 border-b border-gray-200/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
                {/* Solution Selector Horizontal Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
                  {SHOWROOM_APPS.map((app) => {
                    const Icon = ICON_MAP[app.iconName] || Building2
                    const isSelected = app.id === currentApp.id
                    return (
                      <button
                        key={`modal-pill-${app.id}`}
                        onClick={() => handleSelectApp(app.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                          isSelected
                            ? 'bg-navy-900 text-white shadow-sm'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-accent-400' : 'text-gray-500'}`} />
                        <span>{app.title}</span>
                        {app.isFeatured && (
                          <span className="text-[9px] bg-accent-500 text-white px-1.5 py-0.2 rounded font-bold">
                            Creati Core
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Actions & Close Button */}
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="px-3.5 py-1.5 bg-accent-500 hover:bg-accent-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Cotizar {currentApp.title}</span>
                    <span className="sm:hidden">Cotizar</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                    title="Cerrar Modal (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Subheader: View Mode Switcher (Landing vs App) + Role Switcher */}
              <div className="bg-gray-50/90 px-4 sm:px-6 py-2.5 border-b border-gray-200/80 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-800 text-sm flex items-center gap-2">
                    <span>{currentApp.title}</span>
                    <span className="text-[10px] bg-accent-50 text-accent-700 font-semibold px-2 py-0.5 rounded-full">
                      {currentApp.industry}
                    </span>
                  </span>

                  {/* View Switcher: Landing vs App */}
                  <div className="flex items-center bg-gray-200/80 p-0.5 rounded-xl">
                    <button
                      onClick={() => setViewMode('landing')}
                      className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                        viewMode === 'landing'
                          ? 'bg-white text-navy-900 shadow-xs'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Layout className="w-3.5 h-3.5 text-accent-500" />
                      <span>Landing Comercial</span>
                    </button>
                    <button
                      onClick={() => setViewMode('app')}
                      className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                        viewMode === 'app'
                          ? 'bg-white text-navy-900 shadow-xs'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5 text-accent-500" />
                      <span>App / Dashboard Operativo</span>
                    </button>
                  </div>
                </div>

                {/* Role Switcher (Visible in App mode) */}
                {viewMode === 'app' && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 font-medium hidden sm:inline">Rol:</span>
                    <div className="flex items-center gap-1 bg-white border border-gray-200 p-0.5 rounded-xl">
                      {currentApp.roles.map((role) => {
                        const isActive = (selectedRoleId || currentApp.roles[0].id) === role.id
                        return (
                          <button
                            key={`role-tab-${role.id}`}
                            onClick={() => setSelectedRoleId(role.id)}
                            className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                              isActive
                                ? 'bg-accent-50 text-accent-700 font-bold shadow-2xs'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            {role.badge}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
                {/* Salesperson Pitch Guide Accordion */}
                <div className="bg-white rounded-2xl border border-gray-200/80 p-3 sm:p-4 shadow-2xs">
                  <button
                    onClick={() => setShowPitchNotes(!showPitchNotes)}
                    className="w-full flex items-center justify-between text-xs font-bold text-gray-800 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span>Guía Comercial para el Asesor de Ventas (iPad Pitch Notes)</span>
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-accent-600 font-semibold">
                      {showPitchNotes ? 'Ocultar notas' : 'Ver preguntas de apertura & cierre'}
                      {showPitchNotes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {showPitchNotes && (
                      <motion.div
                        key="pitch-notes-content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 mt-3 border-t border-gray-100 text-xs"
                      >
                        <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-100">
                          <span className="text-[10px] text-amber-900 font-bold uppercase tracking-wider block mb-1">
                            1. Pregunta para abrir la conversación:
                          </span>
                          <p className="italic text-gray-700">{currentApp.pitchGuide.pain}</p>
                        </div>
                        <div className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-100">
                          <span className="text-[10px] text-accent-800 font-bold uppercase tracking-wider block mb-1">
                            2. Propuesta de Valor Creati:
                          </span>
                          <p className="text-gray-700">{currentApp.pitchGuide.valueProp}</p>
                        </div>
                        <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                          <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block mb-1">
                            3. Pregunta de Cierre:
                          </span>
                          <p className="font-semibold text-emerald-700">{currentApp.pitchGuide.closingQuestion}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Dynamic Stage: Landing or App */}
                <div className="transition-all">
                  {viewMode === 'landing' ? (
                    <CommercialLandingPreview app={currentApp} />
                  ) : (
                    <div className="bg-slate-900 p-3 sm:p-4 rounded-[28px] shadow-xl border-4 border-slate-800">
                      {/* iPad Status Bar */}
                      <div className="flex items-center justify-between px-3 py-1 text-[10px] text-slate-400 font-mono mb-2">
                        <span className="flex items-center gap-1.5 font-sans font-semibold text-slate-300">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          Creati iPad Studio · v2.4
                        </span>
                        <span className="text-slate-400 font-medium">
                          {currentApp.title} — {currentApp.roles.find((r) => r.id === (selectedRoleId || currentApp.roles[0].id))?.label}
                        </span>
                        <div className="flex items-center gap-2">
                          <span>100% 🔋</span>
                          <span>Wi-Fi 📶</span>
                        </div>
                      </div>

                      {/* Sandbox container */}
                      <div className="bg-slate-100 rounded-2xl p-3 sm:p-5 min-h-[460px]">
                        {renderActiveSandbox()}
                      </div>

                      <div className="w-32 h-1 bg-slate-700 rounded-full mx-auto mt-3" />
                    </div>
                  )}
                </div>

                {/* Bottom Metrics Bar */}
                <div className="p-4 bg-white rounded-2xl border border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Impacto Cuantificable en el Negocio ({currentApp.targetRegion}):
                    </span>
                    <div className="flex flex-wrap gap-4 mt-1">
                      {currentApp.metrics.map((m, idx) => (
                        <div key={`metric-${idx}`} className="flex items-center gap-2">
                          <span className="text-sm font-extrabold text-navy-800">{m.value}</span>
                          <span className="text-xs text-gray-500 font-medium">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-accent-500 hover:bg-accent-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    Solicitar Demostración a la Medida
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote Lead Modal */}
      <QuoteModal
        key={`quote-modal-${currentApp.id}`}
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        app={currentApp}
      />
    </>
  )
}
