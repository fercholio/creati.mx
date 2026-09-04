'use client'

import React, { useState } from 'react'
import { MermaidDiagram } from './MermaidDiagram'
import { Copy, Check, Info, AlertTriangle, AlertCircle, Sparkles } from 'lucide-react'

interface MarkdownRendererProps {
  content: string
  themeMode?: 'light' | 'dark'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export function MarkdownRenderer({ content, themeMode = 'light' }: MarkdownRendererProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  // Parse lines into logical blocks
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []

  let inCodeBlock = false
  let codeLanguage = ''
  let codeContent: string[] = []
  let tableRows: string[][] = []
  let inTable = false

  const isDark = themeMode === 'dark'

  const flushTable = (key: number) => {
    if (tableRows.length === 0) return
    const headers = tableRows[0]
    const rows = tableRows.slice(1).filter((r) => !r.every((c) => c.match(/^[\-\:\s]+$/)))

    elements.push(
      <div key={`table-${key}`} className="my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-xs">
          <thead className={isDark ? 'bg-slate-800/80 text-slate-200' : 'bg-slate-100 text-slate-800'}>
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="px-4 py-3 text-left font-semibold tracking-wider">
                  {h.trim()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? 'divide-slate-800 bg-slate-900/50 text-slate-300' : 'divide-slate-100 bg-white text-slate-700'}`}>
            {rows.map((row, ri) => (
              <tr key={ri} className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-2.5 font-normal">
                    {formatInline(cell.trim(), isDark)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
    tableRows = []
    inTable = false
  }

  const formatInline = (text: string, isDarkTheme: boolean): React.ReactNode => {
    if (text.includes('[REDACTED_') || text.includes('[EXP_') || text.includes('[CLAUSULA_') || text.includes('[JUZGADO_') || text.includes('[PROTECTED_')) {
      const parts = text.split(/(\[[A-Z0-9_\-\s]+\])/g)
      return (
        <span>
          {parts.map((part, i) => {
            if (part.startsWith('[') && part.endsWith(']')) {
              return (
                <span
                  key={i}
                  className="px-1.5 py-0.5 mx-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 inline-flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 shrink-0" />
                  {part}
                </span>
              )
            }
            return formatSimpleInline(part, isDarkTheme)
          })}
        </span>
      )
    }
    return formatSimpleInline(text, isDarkTheme)
  }

  const formatSimpleInline = (text: string, isDarkTheme: boolean): React.ReactNode => {
    const parts = text.split(/(\*[^*]+\*|`[^`]+`)/g)
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className={`font-semibold ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>{part.slice(2, -2)}</strong>
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i} className="italic">{part.slice(1, -1)}</em>
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={i}
            className={`px-1.5 py-0.5 rounded text-xs font-mono font-['Roboto_Mono',monospace] ${
              isDarkTheme ? 'bg-slate-800 text-sky-400 border border-slate-700' : 'bg-slate-100 text-sky-800 border border-slate-200'
            }`}
          >
            {part.slice(1, -1)}
          </code>
        )
      }
      return part
    })
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.trim().startsWith('```')) {
      if (!inCodeBlock) {
        if (inTable) flushTable(i)
        inCodeBlock = true
        codeLanguage = line.trim().replace(/^```/, '') || 'bash'
        codeContent = []
      } else {
        inCodeBlock = false
        const currentCode = codeContent.join('\n')
        const blockIdx = i

        // Detección y renderizado en vivo de diagramas Mermaid
        if (codeLanguage.toLowerCase() === 'mermaid' || currentCode.trim().startsWith('graph ') || currentCode.trim().startsWith('flowchart ') || currentCode.trim().startsWith('sequenceDiagram') || currentCode.trim().startsWith('classDiagram')) {
          elements.push(
            <MermaidDiagram
              key={`mermaid-${i}`}
              chart={currentCode}
              themeMode={themeMode}
              title="Diagrama de Arquitectura Interactivo"
            />
          )
        } else {
          elements.push(
            <div key={`code-${i}`} className="my-5 rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900/90 shadow-md">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-700 text-xs font-mono text-slate-400">
                <span className="uppercase tracking-wider font-semibold text-[11px] text-sky-400">{codeLanguage}</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(currentCode, blockIdx)}
                  className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs"
                >
                  {copiedIndex === blockIdx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedIndex === blockIdx ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>
              <pre className="p-4 text-xs font-mono font-['Roboto_Mono',monospace] text-slate-100 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {currentCode}
              </pre>
            </div>
          )
        }
      }
      continue
    }

    if (inCodeBlock) {
      codeContent.push(line)
      continue
    }

    // Parsing de Tablas Markdown
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      if (!inTable) inTable = true
      const cells = line.split('|').slice(1, -1)
      tableRows.push(cells)
      continue
    } else if (inTable) {
      flushTable(i)
    }

    // Encabezados con anclas ID para Table of Contents (Outline)
    if (line.trim().startsWith('# ')) {
      const rawText = line.replace(/^#\s+/, '').trim()
      const headingId = slugify(rawText)
      elements.push(
        <h1
          key={`h1-${i}`}
          id={headingId}
          className={`text-2xl sm:text-3xl font-bold tracking-tight mt-8 mb-4 scroll-mt-24 ${isDark ? 'text-white' : 'text-slate-900'}`}
        >
          {formatInline(rawText, isDark)}
        </h1>
      )
      continue
    }
    if (line.trim().startsWith('## ')) {
      const rawText = line.replace(/^##\s+/, '').trim()
      const headingId = slugify(rawText)
      elements.push(
        <h2
          key={`h2-${i}`}
          id={headingId}
          className={`text-xl sm:text-2xl font-bold tracking-tight mt-6 mb-3 border-b pb-2 scroll-mt-24 ${isDark ? 'text-slate-100 border-slate-800' : 'text-slate-800 border-slate-200'}`}
        >
          {formatInline(rawText, isDark)}
        </h2>
      )
      continue
    }
    if (line.trim().startsWith('### ')) {
      const rawText = line.replace(/^###\s+/, '').trim()
      const headingId = slugify(rawText)
      elements.push(
        <h3
          key={`h3-${i}`}
          id={headingId}
          className={`text-base sm:text-lg font-bold tracking-tight mt-5 mb-2 scroll-mt-24 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}
        >
          {formatInline(rawText, isDark)}
        </h3>
      )
      continue
    }

    if (line.trim().startsWith('> [!NOTE]') || line.trim().startsWith('> [!IMPORTANT]') || line.trim().startsWith('> [!WARNING]') || line.trim().startsWith('> [!TIP]')) {
      const isWarn = line.includes('WARNING')
      const isImportant = line.includes('IMPORTANT')
      const isTip = line.includes('TIP')
      elements.push(
        <div
          key={`alert-${i}`}
          className={`my-4 p-4 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
            isWarn
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200'
              : isImportant
              ? 'bg-purple-500/10 border-purple-500/30 text-purple-900 dark:text-purple-200'
              : isTip
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
              : 'bg-sky-500/10 border-sky-500/30 text-sky-900 dark:text-sky-200'
          }`}
        >
          {isWarn ? <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" /> :
           isImportant ? <AlertCircle className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" /> :
           isTip ? <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" /> :
           <Info className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />}
          <div className="flex-1 font-normal">
            <span className="font-bold block mb-1">
              {isWarn ? 'ADVERTENCIA' : isImportant ? 'INFORMACIÓN CRÍTICA' : isTip ? 'CONSEJO / BUENA PRÁCTICA' : 'NOTA IMPORTANTE'}
            </span>
            {formatInline(line.replace(/> \[\![A-Z]+\]\s*/, ''), isDark)}
          </div>
        </div>
      )
      continue
    }

    if (line.trim().startsWith('> ')) {
      elements.push(
        <blockquote
          key={`quote-${i}`}
          className={`my-3 pl-4 border-l-4 italic text-xs leading-relaxed ${
            isDark ? 'border-sky-500/60 text-slate-300' : 'border-sky-500 text-slate-600'
          }`}
        >
          {formatInline(line.replace('> ', ''), isDark)}
        </blockquote>
      )
      continue
    }

    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      elements.push(
        <div key={`li-${i}`} className="flex items-start gap-2 text-xs my-1.5 leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0 mt-1.5" />
          <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
            {formatInline(line.trim().replace(/^[-*]\s+/, ''), isDark)}
          </span>
        </div>
      )
      continue
    }

    const numMatch = line.trim().match(/^(\d+)\.\s+(.+)/)
    if (numMatch) {
      elements.push(
        <div key={`ol-${i}`} className="flex items-start gap-2.5 text-xs my-1.5 leading-relaxed">
          <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 shrink-0 mt-0.5">
            {numMatch[1]}
          </span>
          <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
            {formatInline(numMatch[2], isDark)}
          </span>
        </div>
      )
      continue
    }

    if (line.trim() === '---' || line.trim() === '***') {
      elements.push(<hr key={`hr-${i}`} className={`my-6 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`} />)
      continue
    }

    if (line.trim().length > 0) {
      elements.push(
        <p key={`p-${i}`} className={`text-xs sm:text-sm leading-relaxed my-2.5 font-normal ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          {formatInline(line, isDark)}
        </p>
      )
    }
  }

  if (inTable) flushTable(lines.length)

  return <div className="space-y-1 font-['Roboto',sans-serif]">{elements}</div>
}
