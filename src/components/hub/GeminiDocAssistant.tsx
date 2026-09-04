'use client'

import React, { useState } from 'react'
import {
  Sparkles,
  Briefcase,
  Code2,
  HelpCircle,
  X,
  Send,
  Loader2,
  Copy,
  Check,
  ChevronRight,
  Lightbulb,
  FileCheck
} from 'lucide-react'
import { UserRole } from '@/lib/hub/types'
import {
  analyzeDocumentWithGemini,
  AIAnalysisResponse,
  AISummaryType
} from '@/lib/hub/gemini-service'
import { MarkdownRenderer } from './MarkdownRenderer'

interface GeminiDocAssistantProps {
  isOpen: boolean
  onClose: () => void
  docTitle: string
  docContent: string
  userRole: UserRole
  themeMode?: 'light' | 'dark'
}

export function GeminiDocAssistant({
  isOpen,
  onClose,
  docTitle,
  docContent,
  userRole,
  themeMode = 'light',
}: GeminiDocAssistantProps) {
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<AIAnalysisResponse | null>(null)
  const [activeTab, setActiveTab] = useState<AISummaryType>('SALES_MARKETING')
  const [customInput, setCustomInput] = useState('')
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const isDark = themeMode === 'dark'

  const runAnalysis = async (type: AISummaryType, customPrompt?: string) => {
    setLoading(true)
    setActiveTab(type)
    try {
      const res = await analyzeDocumentWithGemini(
        docTitle,
        docContent,
        type,
        userRole,
        customPrompt
      )
      setAnalysis(res)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (!analysis) return
    const fullText = `${analysis.title}\n\n${analysis.content}\n\nEjemplos:\n${analysis.examples.join('\n')}`
    navigator.clipboard.writeText(fullText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[520px] shadow-2xl flex flex-col transition-all">
      <div
        className={`h-full flex flex-col border-l ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header con gradiente de Gemini */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-sky-500/10 via-accent-500/10 to-purple-500/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-accent-600 text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm">Google Gemini AI</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent-500/20 text-accent-600 dark:text-accent-400 font-mono font-bold">
                  Pro
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate max-w-[320px]">
                Analizando: {docTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Botones de Acción Rápida (Sales / Tech / Q&A) */}
        <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex gap-1.5 bg-slate-50/50 dark:bg-slate-950/40">
          <button
            onClick={() => runAnalysis('SALES_MARKETING')}
            className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              activeTab === 'SALES_MARKETING'
                ? 'bg-accent-600 text-white shadow-xs'
                : isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Ventas & Pitch</span>
          </button>

          <button
            onClick={() => runAnalysis('TECHNICAL_DEEP_DIVE')}
            className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              activeTab === 'TECHNICAL_DEEP_DIVE'
                ? 'bg-accent-600 text-white shadow-xs'
                : isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Técnico & Código</span>
          </button>
        </div>

        {/* Área de Contenido Generado */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
              <Loader2 className="w-8 h-8 text-accent-500 animate-spin" />
              <p className="text-xs text-slate-500">
                Gemini está extrayendo puntos clave, argumentos y ejemplos prácticos...
              </p>
            </div>
          ) : analysis ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-accent-600 dark:text-accent-400">
                  {analysis.title}
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>

              {/* Markdown renderizado */}
              <div className="text-xs leading-relaxed">
                <MarkdownRenderer content={analysis.content} themeMode={themeMode} />
              </div>

              {/* Sección de Ejemplos Prácticos */}
              {analysis.examples.length > 0 && (
                <div className="p-4 rounded-xl border border-sky-500/20 bg-sky-500/5 space-y-2">
                  <div className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 font-bold text-xs">
                    <Lightbulb className="w-4 h-4" />
                    <span>Ejemplos Prácticos y Modelos Aplicados</span>
                  </div>
                  <div className="space-y-2">
                    {analysis.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 text-xs leading-relaxed"
                      >
                        <MarkdownRenderer content={ex} themeMode={themeMode} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Acciones sugeridas */}
              {analysis.suggestedActionItems.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Acciones Sugeridas
                  </span>
                  {analysis.suggestedActionItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 text-slate-400">
              <Sparkles className="w-12 h-12 opacity-30 text-accent-500" />
              <div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  ¿Cómo deseas analizar este documento?
                </p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Selecciona <strong>Ventas & Pitch</strong> para generar propuesta de valor y objeciones, o <strong>Técnico</strong> para ver arquitectura y snippets de código.
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full max-w-xs">
                <button
                  onClick={() => runAnalysis('SALES_MARKETING')}
                  className="w-full py-2.5 rounded-xl bg-accent-600 hover:bg-accent-500 text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Resumen para Ventas y Marketing</span>
                </button>
                <button
                  onClick={() => runAnalysis('TECHNICAL_DEEP_DIVE')}
                  className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Code2 className="w-4 h-4 text-sky-500" />
                  <span>Explicación Técnica con Ejemplos</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Input para Preguntas Libres al Documento */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (!customInput.trim()) return
              runAnalysis('CUSTOM_QUERY', customInput)
              setCustomInput('')
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Pregúntale a Gemini sobre este documento..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-1 focus:ring-accent-500"
            />
            <button
              type="submit"
              disabled={loading || !customInput.trim()}
              className="p-2 rounded-xl bg-accent-600 hover:bg-accent-500 disabled:opacity-50 text-white cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
