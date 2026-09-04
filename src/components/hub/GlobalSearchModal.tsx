'use client'

import React, { useState, useEffect } from 'react'
import { Search, FileText, ArrowRight, X, Sparkles, Folder } from 'lucide-react'
import { HubDocument } from '@/lib/hub/types'

interface GlobalSearchModalProps {
  isOpen: boolean
  onClose: () => void
  documents: HubDocument[]
  onSelectDoc: (docId: string) => void
  themeMode?: 'light' | 'dark'
}

export function GlobalSearchModal({
  isOpen,
  onClose,
  documents,
  onSelectDoc,
  themeMode = 'light',
}: GlobalSearchModalProps) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (isOpen) {
          onClose()
        } else {
          // Open triggered from parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const isDark = themeMode === 'dark'

  const filtered = query.trim()
    ? documents.filter((doc) => {
        const q = query.toLowerCase()
        return (
          doc.title.toLowerCase().includes(q) ||
          doc.summary.toLowerCase().includes(q) ||
          doc.ecosystem.toLowerCase().includes(q) ||
          doc.tags.some((t) => t.toLowerCase().includes(q)) ||
          doc.content.toLowerCase().includes(q)
        )
      })
    : documents.slice(0, 6)

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-xs transition-opacity">
      <div
        className={`w-full max-w-2xl rounded-2xl shadow-2xl border overflow-hidden transition-all ${
          isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header con Buscador */}
        <div className={`flex items-center px-4 py-3.5 border-b ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          <Search className="w-5 h-5 text-accent-500 shrink-0 mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Buscar en todos los proyectos, arquitectura, APIs, FRD o codigos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-sm placeholder-slate-400"
          />
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 mr-2">
            ESC para cerrar
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Lista de Resultados */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>{query.trim() ? `Resultados (${filtered.length})` : 'Documentos Recientes'}</span>
            <span>Atajo: Ctrl + K</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              No se encontraron documentos que coincidan con "{query}".
            </div>
          ) : (
            filtered.map((doc) => (
              <button
                key={doc.id}
                onClick={() => {
                  onSelectDoc(doc.id)
                  onClose()
                }}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-start justify-between gap-3 cursor-pointer group ${
                  isDark ? 'hover:bg-slate-800/70' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-accent-500/10 text-accent-500 shrink-0 mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {doc.ecosystem}
                      </span>
                      <span className="text-[10px] text-slate-400">•</span>
                      <span className="text-[10px] font-mono text-accent-600 dark:text-accent-400 font-semibold">
                        {doc.requiredRole === 'ALL' ? 'PUBLICO' : doc.requiredRole}
                      </span>
                    </div>
                    <p className="text-xs font-semibold truncate group-hover:text-accent-600 transition-colors">
                      {doc.title}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {doc.summary}
                    </p>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-2" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
