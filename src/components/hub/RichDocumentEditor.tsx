'use client'

import React, { useState, useRef } from 'react'
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Code,
  Table,
  Sparkles,
  AlertCircle,
  FileCode,
  Eye,
  Check,
  X,
  Columns,
  Maximize2,
  Minimize2,
  Save
} from 'lucide-react'
import { MarkdownRenderer } from './MarkdownRenderer'

interface RichDocumentEditorProps {
  initialContent: string
  docTitle: string
  themeMode?: 'light' | 'dark'
  onSave: (newContent: string, changeSummary: string) => void
  onCancel: () => void
}

export function RichDocumentEditor({
  initialContent,
  docTitle,
  themeMode = 'light',
  onSave,
  onCancel,
}: RichDocumentEditorProps) {
  const [content, setContent] = useState(initialContent)
  const [changeSummary, setChangeSummary] = useState('')
  const [summaryError, setSummaryError] = useState(false)
  const [splitView, setSplitView] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isDark = themeMode === 'dark'

  // Función para insertar formato alrededor de selección o en el cursor
  const insertFormat = (prefix: string, suffix: string = '', defaultPlaceholder: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = content.substring(start, end) || defaultPlaceholder
    const replacement = `${prefix}${selected}${suffix}`

    const newContent = content.substring(0, start) + replacement + content.substring(end)
    setContent(newContent)

    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length)
    }, 0)
  }

  const handleSave = () => {
    if (!changeSummary.trim()) {
      setSummaryError(true)
      return
    }
    onSave(content, changeSummary.trim())
  }

  return (
    <div
      className={`rounded-2xl border flex flex-col shadow-xl transition-all ${
        isFullscreen ? 'fixed inset-4 z-50 overflow-hidden' : 'relative my-4 overflow-hidden'
      } ${isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'}`}
      style={!isFullscreen ? { minHeight: '620px' } : undefined}
    >
      {/* Barra de Herramientas Superior Confluence */}
      <div
        className={`p-3 border-b flex flex-wrap items-center justify-between gap-2 shrink-0 select-none ${
          isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-slate-100 border-slate-200'
        }`}
      >
        {/* Grupos de botones de formato */}
        <div className="flex flex-wrap items-center gap-1 text-xs">
          {/* Formato Básico */}
          <button
            type="button"
            onClick={() => insertFormat('**', '**', 'texto en negrita')}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            title="Negrita (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormat('*', '*', 'texto en cursiva')}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            title="Cursiva (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormat('`', '`', 'codigo_inline')}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            title="Código en línea"
          >
            <Code className="w-4 h-4" />
          </button>

          <span className="w-px h-5 bg-slate-300 dark:bg-slate-700 mx-1" />

          {/* Encabezados */}
          <button
            type="button"
            onClick={() => insertFormat('\n# ', '\n', 'Título Principal')}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer font-bold text-xs"
            title="Encabezado H1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => insertFormat('\n## ', '\n', 'Subtítulo H2')}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer font-bold text-xs"
            title="Encabezado H2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => insertFormat('\n### ', '\n', 'Sección H3')}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer font-bold text-xs"
            title="Encabezado H3"
          >
            H3
          </button>

          <span className="w-px h-5 bg-slate-300 dark:bg-slate-700 mx-1" />

          {/* Listas */}
          <button
            type="button"
            onClick={() => insertFormat('\n- ', '\n', 'Elemento de lista')}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            title="Lista con viñetas"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormat('\n1. ', '\n', 'Primer paso')}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            title="Lista numerada"
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          <span className="w-px h-5 bg-slate-300 dark:bg-slate-700 mx-1" />

          {/* Inserciones Avanzadas */}
          <button
            type="button"
            onClick={() =>
              insertFormat(
                '\n| Parámetro | Tipo | Descripción |\n| :--- | :--- | :--- |\n| id | string | Identificador único |\n| status | boolean | Estado activo |\n',
                '',
                ''
              )
            }
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-1"
            title="Insertar Tabla con formato"
          >
            <Table className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px] font-medium">Tabla</span>
          </button>

          <button
            type="button"
            onClick={() =>
              insertFormat(
                '\n```mermaid\ngraph TD\n    A[Inicio del Flujo] --> B{Validación}\n    B -->|Éxito| C[Servicio de Dominio]\n    B -->|Fallo| D[Registro de Error]\n```\n',
                '',
                ''
              )
            }
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-1 text-sky-600 dark:text-sky-400 font-semibold"
            title="Insertar Diagrama Mermaid Interactivo"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px]">Mermaid</span>
          </button>

          <button
            type="button"
            onClick={() =>
              insertFormat(
                '\n> [!NOTE]\n> Especificación aprobada por arquitectura técnica para versión de lanzamiento.\n\n',
                '',
                ''
              )
            }
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-1 text-purple-600 dark:text-purple-400 font-semibold"
            title="Insertar Alerta / Callout Confluence"
          >
            <AlertCircle className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px]">Alerta</span>
          </button>

          <button
            type="button"
            onClick={() => insertFormat('\n```typescript\n// Ejemplo de código tipado\nconst token = "Bearer eyJhbGci..."\n```\n', '', '')}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-1 font-mono text-[11px]"
            title="Bloque de Código"
          >
            <FileCode className="w-4 h-4" />
            <span className="hidden sm:inline">Código</span>
          </button>
        </div>

        {/* Acciones de Vista (Split View, Fullscreen) */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSplitView(!splitView)}
            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 cursor-pointer transition-colors ${
              splitView
                ? 'bg-accent-500/15 text-accent-600 dark:text-accent-400 border-accent-500/30'
                : 'hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-300 dark:border-slate-700'
            }`}
            title="Alternar Vista Dividida (Editor + Vista Previa)"
          >
            <Columns className="w-4 h-4" />
            <span className="hidden md:inline text-[11px]">Vista Previa</span>
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
            title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Cuerpo del Editor (Split View: Código Markdown y Previsualización Viva) */}
      <div className="flex-1 flex overflow-hidden min-h-[420px]">
        {/* Panel de Edición */}
        <div className={`flex-1 flex flex-col p-4 ${splitView ? 'border-r border-slate-200 dark:border-slate-700/80' : ''}`}>
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 w-full bg-transparent font-mono text-xs font-['Roboto_Mono',monospace] leading-relaxed outline-none resize-none placeholder-slate-400"
            placeholder="Escribe aquí el contenido en formato Markdown enriquecido o pega especificaciones..."
          />
        </div>

        {/* Panel de Previsualización en Vivo */}
        {splitView && (
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-950/40">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-4 border-b pb-1">
              Previsualización en Tiempo Real
            </div>
            <MarkdownRenderer content={content} themeMode={themeMode} />
          </div>
        )}
      </div>

      {/* Footer con Auditoría Obligatoria y Botones de Guardar */}
      <div
        className={`p-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 ${
          isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="flex-1 max-w-md">
          <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
            Motivo / Resumen del Cambio (Requerido para Auditoría)
          </label>
          <input
            type="text"
            required
            value={changeSummary}
            onChange={(e) => {
              setChangeSummary(e.target.value)
              if (summaryError) setSummaryError(false)
            }}
            placeholder="ej. Actualización de endpoints v2 y tarifas 2026"
            className={`w-full px-3 py-1.5 rounded-xl text-xs outline-none border transition-colors ${
              summaryError
                ? 'border-rose-500 bg-rose-500/10'
                : isDark
                ? 'bg-slate-900 border-slate-700 text-slate-100'
                : 'bg-white border-slate-300 text-slate-900'
            }`}
          />
          {summaryError && (
            <span className="text-[10px] text-rose-500 font-semibold block mt-0.5">
              Por favor ingresa un breve resumen para el registro de auditoría.
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-semibold cursor-pointer transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-accent-600 hover:bg-accent-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Guardar & Registrar Versión</span>
          </button>
        </div>
      </div>
    </div>
  )
}
