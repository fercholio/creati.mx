'use client'

import React, { useState } from 'react'
import {
  History,
  X,
  User,
  Calendar,
  RotateCcw,
  Check,
  Clock,
  ArrowRight,
  Eye,
  FileText,
  ShieldCheck
} from 'lucide-react'
import { DocumentVersion } from '@/lib/hub/types'
import { MarkdownRenderer } from './MarkdownRenderer'

interface VersionHistoryModalProps {
  isOpen: boolean
  onClose: () => void
  docTitle: string
  versions: DocumentVersion[]
  currentContent: string
  onRestoreVersion: (version: DocumentVersion) => void
  themeMode?: 'light' | 'dark'
}

export function VersionHistoryModal({
  isOpen,
  onClose,
  docTitle,
  versions = [],
  currentContent,
  onRestoreVersion,
  themeMode = 'light',
}: VersionHistoryModalProps) {
  const [selectedVersionId, setSelectedVersionId] = useState<string | null>(
    versions.length > 0 ? versions[versions.length - 1].versionId : null
  )
  const [restoreFeedback, setRestoreFeedback] = useState(false)

  if (!isOpen) return null

  const isDark = themeMode === 'dark'
  const selectedVersion = versions.find((v) => v.versionId === selectedVersionId)

  const handleRestore = (v: DocumentVersion) => {
    onRestoreVersion(v)
    setRestoreFeedback(true)
    setTimeout(() => {
      setRestoreFeedback(false)
      onClose()
    }, 1200)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-xs">
      <div
        className={`w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl border flex flex-col overflow-hidden ${
          isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Cabecera del Modal */}
        <div
          className={`p-4 border-b flex items-center justify-between shrink-0 ${
            isDark ? 'bg-slate-800/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-accent-500/10 text-accent-500">
              <History className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold">Historial de Auditoría & Control de Versiones</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Registro Estricto Inmutable
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate max-w-lg">{docTitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Contenedor Principal (Timeline Izquierda + Previsualización Derecha) */}
        <div className="flex-1 flex overflow-hidden">
          {/* Timeline de Versiones */}
          <div
            className={`w-80 border-r overflow-y-auto p-4 space-y-3 shrink-0 ${
              isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50/50'
            }`}
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Línea de Tiempo ({versions.length} Versiones)
            </div>

            {versions.length === 0 ? (
              <div className="text-xs text-slate-400 text-center py-8">
                No hay modificaciones registradas previamente. La versión actual es la fundacional.
              </div>
            ) : (
              versions
                .slice()
                .reverse()
                .map((v, i) => (
                  <button
                    key={v.versionId}
                    type="button"
                    onClick={() => setSelectedVersionId(v.versionId)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedVersionId === v.versionId
                        ? isDark
                          ? 'bg-slate-800 border-accent-500/50 shadow-xs'
                          : 'bg-white border-accent-500/50 shadow-xs ring-1 ring-accent-500/30'
                        : isDark
                        ? 'border-slate-800 hover:bg-slate-800/40 text-slate-400'
                        : 'border-slate-200 hover:bg-white text-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold font-mono text-accent-600 dark:text-accent-400">
                        {v.versionNumber || `v1.${versions.length - 1 - i}`}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {v.timestamp.split('T')[0]} {v.timestamp.includes('T') ? v.timestamp.split('T')[1].slice(0, 5) : ''}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-2">
                      {v.changeSummary || 'Actualización de especificación técnica'}
                    </p>

                    <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-500">
                      <User className="w-3 h-3" />
                      <span className="font-medium text-slate-700 dark:text-slate-300">{v.authorName}</span>
                      <span>•</span>
                      <span className="font-mono text-[9px] uppercase">{v.authorRole}</span>
                    </div>
                  </button>
                ))
            )}
          </div>

          {/* Panel de Comparativa / Visor del Snapshot */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col">
            {selectedVersion ? (
              <div className="space-y-4 flex-1 flex flex-col">
                <div
                  className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-3 shrink-0 ${
                    isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-100/80 border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">Snapshot: {selectedVersion.versionNumber}</span>
                      <span className="text-xs font-mono text-slate-400">({selectedVersion.timestamp})</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Modificado por: <strong>{selectedVersion.authorName}</strong> ({selectedVersion.authorRole} •{' '}
                      {selectedVersion.authorEmail})
                    </p>
                    <p className="text-xs text-accent-600 dark:text-accent-400 mt-1 italic">
                      Motivo del cambio: "{selectedVersion.changeSummary}"
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRestore(selectedVersion)}
                    className="px-4 py-2 rounded-xl bg-accent-600 hover:bg-accent-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {restoreFeedback ? <Check className="w-3.5 h-3.5" /> : <RotateCcw className="w-3.5 h-3.5" />}
                    <span>{restoreFeedback ? 'Restaurado con éxito' : 'Restaurar esta Versión'}</span>
                  </button>
                </div>

                {/* Previsualización del contenido en esa versión */}
                <div
                  className={`flex-1 p-6 rounded-xl border overflow-y-auto ${
                    isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <MarkdownRenderer content={selectedVersion.contentSnapshot} themeMode={themeMode} />
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center text-slate-400">
                Selecciona una versión del árbol de auditoría para inspeccionar su snapshot.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
