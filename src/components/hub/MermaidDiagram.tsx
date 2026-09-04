'use client'

import React, { useEffect, useRef, useState, useId, useCallback } from 'react'
import mermaid from 'mermaid'
import {
  Copy,
  Check,
  Eye,
  Code,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  GripHorizontal,
  Move
} from 'lucide-react'

interface MermaidDiagramProps {
  chart: string
  themeMode?: 'light' | 'dark'
  title?: string
  allowCodeToggle?: boolean
}

// Sanitizador preventivo de sintaxis Mermaid (Auto-repair de nodos con paréntesis y caracteres especiales)
function autoRepairMermaidSyntax(rawChart: string): string {
  const lines = rawChart.split('\n')
  return lines
    .map((line) => {
      // 1. Reemplazar X[Texto con (paréntesis) sin comillas] por X["Texto con (paréntesis)"]
      let fixed = line.replace(/([A-Za-z0-9_]+)\[([^\]\n]+)\]/g, (match, nodeId, content) => {
        const trimmed = content.trim()
        if (
          (trimmed.includes('(') || trimmed.includes(')') || trimmed.includes('{') || trimmed.includes('}') || trimmed.includes('$')) &&
          !(trimmed.startsWith('"') && trimmed.endsWith('"'))
        ) {
          // Escapar comillas internas si existen
          const safeContent = trimmed.replace(/"/g, '\'')
          return `${nodeId}["${safeContent}"]`
        }
        return match
      })

      // 2. Corregir subgraphs con nombres entre corchetes o paréntesis sin comillas
      fixed = fixed.replace(/subgraph\s+([A-Za-z0-9_]+)\s*\[([^\]\n]+)\]/g, (match, id, title) => {
        const safeTitle = title.trim().replace(/"/g, '\'')
        return `subgraph ${id} ["${safeTitle}"]`
      })

      return fixed
    })
    .join('\n')
}

export function MermaidDiagram({
  chart,
  themeMode = 'light',
  title = 'Diagrama de Arquitectura',
  allowCodeToggle = true,
}: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const [svgContent, setSvgContent] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [showCode, setShowCode] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)
  
  // Zoom & Pan State
  const [zoom, setZoom] = useState<number>(1)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [height, setHeight] = useState<number>(380) // default responsive height
  const [isResizing, setIsResizing] = useState<boolean>(false)
  
  // Pan state for dragging large diagrams
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState<boolean>(false)
  const [startPan, setStartPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const uniqueId = useId().replace(/:/g, '_')
  const diagramId = `mermaid_${uniqueId}`

  const isDark = themeMode === 'dark'

  useEffect(() => {
    let isMounted = true

    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? 'dark' : 'neutral',
      securityLevel: 'loose',
      fontFamily: 'Roboto, sans-serif',
      themeVariables: {
        darkMode: isDark,
        primaryColor: isDark ? '#1e293b' : '#f1f5f9',
        primaryTextColor: isDark ? '#f8fafc' : '#0f172a',
        primaryBorderColor: isDark ? '#3b82f6' : '#2563eb',
        lineColor: isDark ? '#38bdf8' : '#0284c7',
        secondaryColor: isDark ? '#0f172a' : '#ffffff',
        tertiaryColor: isDark ? '#1e1b4b' : '#e0e7ff',
      },
    })

    const renderDiagram = async () => {
      try {
        setError(null)
        const cleanChart = autoRepairMermaidSyntax(chart.trim())
        const { svg } = await mermaid.render(diagramId, cleanChart)
        if (isMounted) {
          setSvgContent(svg)
        }
      } catch (err: any) {
        console.error('Mermaid render error:', err)
        if (isMounted) {
          setError(err?.message || 'Error al renderizar el diagrama de Mermaid.')
        }
      }
    }

    renderDiagram()

    return () => {
      isMounted = false
    }
  }, [chart, isDark, diagramId])

  // Drag-to-resize height handler
  const handleMouseDownResize = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
    const startY = e.clientY
    const startH = height

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - startY
      const newHeight = Math.max(220, Math.min(900, startH + deltaY))
      setHeight(newHeight)
    }

    const onMouseUp = () => {
      setIsResizing(false)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  // Pan (Click & Drag viewport)
  const handleMouseDownPan = (e: React.MouseEvent) => {
    if (e.button !== 0) return // only left click
    setIsPanning(true)
    setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }

  const handleMouseMovePan = (e: React.MouseEvent) => {
    if (!isPanning) return
    setPan({ x: e.clientX - startPan.x, y: e.clientY - startPan.y })
  }

  const handleMouseUpPan = () => {
    setIsPanning(false)
  }

  const resetViewport = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const copyCode = () => {
    navigator.clipboard.writeText(chart.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <div
        className={`my-6 rounded-2xl border shadow-xs transition-all flex flex-col ${
          isFullscreen
            ? 'fixed inset-4 z-50 shadow-2xl overflow-hidden'
            : 'relative overflow-hidden'
        } ${
          isDark
            ? 'bg-slate-900/95 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        style={!isFullscreen ? { height: showCode ? 'auto' : `${height}px` } : undefined}
      >
        {/* Barra de Herramientas */}
        <div
          className={`px-4 py-2.5 border-b flex items-center justify-between gap-2 text-xs shrink-0 select-none ${
            isDark ? 'bg-slate-800/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <div className="flex items-center gap-2 font-semibold min-w-0">
            <span className="w-2 h-2 rounded-full bg-accent-500 shrink-0" />
            <span className="truncate">{title}</span>
            <span className="hidden sm:inline-block text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400">
              Arrastrable & Zoom
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Controles de Zoom & Pan */}
            {!showCode && (
              <div className="flex items-center gap-1 mr-1 px-1.5 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700/60 bg-white/50 dark:bg-slate-800/50">
                <button
                  onClick={() => setZoom((z) => Math.max(0.4, Number((z - 0.15).toFixed(2))))}
                  className="p-1 hover:text-accent-500 cursor-pointer"
                  title="Alejar (-)"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-mono w-9 text-center">{Math.round(zoom * 100)}%</span>
                <button
                  onClick={() => setZoom((z) => Math.min(2.5, Number((z + 0.15).toFixed(2))))}
                  className="p-1 hover:text-accent-500 cursor-pointer"
                  title="Acercar (+)"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={resetViewport}
                  className="p-1 hover:text-accent-500 cursor-pointer"
                  title="Restablecer posición y escala"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Pantalla Completa / Expandir */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            {allowCodeToggle && (
              <button
                onClick={() => setShowCode(!showCode)}
                className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center gap-1 text-[11px] font-medium transition-colors cursor-pointer"
              >
                {showCode ? <Eye className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{showCode ? 'Ver Gráfico' : 'Ver Código'}</span>
              </button>
            )}

            <button
              onClick={copyCode}
              className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center gap-1 text-[11px] font-medium transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        {/* Viewport Interactivo (Canvas infinito con Pan & Zoom) */}
        {showCode ? (
          <pre className="flex-1 p-4 text-xs font-mono font-['Roboto_Mono',monospace] bg-slate-950 text-slate-200 overflow-y-auto whitespace-pre-wrap leading-relaxed">
            {chart.trim()}
          </pre>
        ) : error ? (
          <div className="p-6 text-xs text-rose-500 space-y-2 flex-1 overflow-y-auto">
            <p className="font-bold">No se pudo generar la previsualización del diagrama:</p>
            <pre className="p-3 rounded-lg bg-rose-500/10 font-mono text-[11px] overflow-x-auto">{error}</pre>
            <p className="text-slate-400 text-[11px]">Mostrando definición original de código:</p>
            <pre className="p-3 rounded-lg bg-slate-800 font-mono text-[11px] text-slate-200 overflow-x-auto">
              {chart.trim()}
            </pre>
          </div>
        ) : (
          <div
            ref={viewportRef}
            onMouseDown={handleMouseDownPan}
            onMouseMove={handleMouseMovePan}
            onMouseUp={handleMouseUpPan}
            onMouseLeave={handleMouseUpPan}
            className={`flex-1 overflow-hidden relative select-none flex items-center justify-center p-6 ${
              isPanning ? 'cursor-grabbing' : 'cursor-grab'
            } ${isDark ? 'bg-slate-950/40' : 'bg-slate-50/40'}`}
          >
            {/* Indicador de Ayuda Pan */}
            <div className="absolute top-2 left-2 z-10 pointer-events-none opacity-40 hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] text-slate-400 font-mono">
              <Move className="w-3 h-3" />
              <span>Arrastra para navegar • Zoom con botones</span>
            </div>

            <div
              ref={containerRef}
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: 'center center',
                transition: isPanning ? 'none' : 'transform 0.15s ease-out',
              }}
              className="w-full flex justify-center [&>svg]:max-w-none [&>svg]:h-auto"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          </div>
        )}

        {/* Tirador Inferior de Redimensionamiento (Resize Handle) */}
        {!isFullscreen && !showCode && (
          <div
            onMouseDown={handleMouseDownResize}
            className={`h-4 border-t flex items-center justify-center cursor-row-resize transition-colors group select-none shrink-0 ${
              isResizing
                ? 'bg-accent-500/20 border-accent-500'
                : isDark
                ? 'bg-slate-800/60 border-slate-800 hover:bg-slate-700/60'
                : 'bg-slate-100 border-slate-200 hover:bg-slate-200/70'
            }`}
            title="Arrastra verticalmente para ajustar la altura del diagrama"
          >
            <GripHorizontal className="w-4 h-4 text-slate-400 group-hover:text-accent-500 transition-colors" />
          </div>
        )}
      </div>

      {/* Backdrop para Pantalla Completa */}
      {isFullscreen && (
        <div
          onClick={() => setIsFullscreen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs"
        />
      )}
    </>
  )
}
