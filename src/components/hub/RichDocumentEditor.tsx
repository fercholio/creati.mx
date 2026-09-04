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
  Save,
  GitBranch,
  Activity,
  BarChart3,
  ChevronDown,
  Info,
  CheckCircle2,
  HelpCircle,
  Layers,
  LayoutGrid
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
  const [activeMenu, setActiveMenu] = useState<'tables' | 'diagrams' | 'callouts' | null>(null)
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
    setActiveMenu(null)
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
      style={!isFullscreen ? { minHeight: '680px' } : undefined}
    >
      {/* Barra de Herramientas Superior Super-Confluence */}
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

          {/* MENÚ DESPLEGABLE: TABLAS CONFLUENCE */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setActiveMenu(activeMenu === 'tables' ? null : 'tables')}
              className={`p-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${
                activeMenu === 'tables'
                  ? 'bg-accent-500/20 text-accent-600 dark:text-accent-400 font-bold'
                  : 'hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title="Insertar Tablas Especializadas"
            >
              <Table className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-[11px] font-semibold hidden sm:inline">Tabla</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {activeMenu === 'tables' && (
              <div className={`absolute top-full left-0 mt-1 w-64 rounded-xl border shadow-xl z-30 p-2 space-y-1 ${
                isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
              }`}>
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Plantillas de Tablas</div>
                
                <button
                  type="button"
                  onClick={() => insertFormat(
                    '\n| Parámetro | Tipo | Requerido | Descripción |\n| :--- | :--- | :---: | :--- |\n| `api_key` | string | Sí | Token JWT de autenticación |\n| `environment` | enum | No | `sandbox` o `production` |\n| `limit` | number | No | Registros por página (default: 50) |\n\n',
                    '', ''
                  )}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-xs flex items-center gap-2 cursor-pointer"
                >
                  <Table className="w-3.5 h-3.5 text-blue-500" />
                  <div>
                    <div className="font-semibold">Tabla de Parámetros API</div>
                    <div className="text-[10px] text-slate-400">4 columnas estructuradas</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => insertFormat(
                    '\n| Métrica / KPI | Q1 Meta | Q1 Real | Variación | Estado |\n| :--- | :---: | :---: | :---: | :---: |\n| MRR B2B SaaS | $120K MXN | $145K MXN | +20.8% | Superado |\n| Churn Rate | < 2.0% | 1.4% | -0.6% | Óptimo |\n| Nuevos Leads | 500 | 620 | +24% | Superado |\n\n',
                    '', ''
                  )}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-xs flex items-center gap-2 cursor-pointer"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-emerald-500" />
                  <div>
                    <div className="font-semibold">Tabla de Métricas / KPIs</div>
                    <div className="text-[10px] text-slate-400">Metas, real y variación</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => insertFormat(
                    '\n| Característica | Plan Starter | Plan Growth | Enterprise |\n| :--- | :---: | :---: | :---: |\n| Usuarios Concurrentes | Hasta 3 | Hasta 15 | Ilimitados |\n| Bóveda Cifrada | 5 GB | 50 GB | 1 TB Dedicado |\n| SLA Soporte | 48 hrs | 12 hrs | 2 hrs 24/7 |\n| Precio Mensual | $499 MXN | $1,899 MXN | A la Medida |\n\n',
                    '', ''
                  )}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-xs flex items-center gap-2 cursor-pointer"
                >
                  <LayoutGrid className="w-3.5 h-3.5 text-purple-500" />
                  <div>
                    <div className="font-semibold">Tabla Comparativa / Pricing</div>
                    <div className="text-[10px] text-slate-400">Matriz de tiers y funciones</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* MENÚ DESPLEGABLE: DIAGRAMAS MERMAID */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setActiveMenu(activeMenu === 'diagrams' ? null : 'diagrams')}
              className={`p-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${
                activeMenu === 'diagrams'
                  ? 'bg-accent-500/20 text-accent-600 dark:text-accent-400 font-bold'
                  : 'hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title="Insertar Diagramas Mermaid Vivos"
            >
              <Sparkles className="w-4 h-4 text-sky-500" />
              <span className="text-[11px] font-semibold hidden sm:inline">Diagramas</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {activeMenu === 'diagrams' && (
              <div className={`absolute top-full left-0 mt-1 w-72 rounded-xl border shadow-xl z-30 p-2 space-y-1 ${
                isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
              }`}>
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Modelado Gráfico Mermaid</div>

                <button
                  type="button"
                  onClick={() => insertFormat(
                    '\n```mermaid\nsequenceDiagram\n    autonumber\n    actor Usuario as Cliente Web\n    participant Hub as Creati Hub API\n    participant Auth as Servicio IAM\n    participant DB as Bóveda Cifrada\n\n    Usuario->>Hub: GET /api/v1/documentos/{id}\n    Hub->>Auth: Validar Token JWT + Rol RBAC\n    Auth-->>Hub: 200 OK (Rol: DEVELOPER)\n    Hub->>DB: Consultar Snapshot Cifrado\n    DB-->>Hub: Retorno de Datos Protegidos\n    Hub-->>Usuario: Respuesta con Data Masking Aplicado\n```\n\n',
                    '', ''
                  )}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-xs flex items-center gap-2 cursor-pointer"
                >
                  <Activity className="w-3.5 h-3.5 text-sky-500" />
                  <div>
                    <div className="font-semibold">Diagrama de Secuencia</div>
                    <div className="text-[10px] text-slate-400">Flujo paso a paso entre actores y APIs</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => insertFormat(
                    '\n```mermaid\ngraph TD\n    A[Solicitud del Cliente] --> B{¿Autenticado?}\n    B -->|Sí| C[Evaluar Permisos IAM]\n    B -->|No| D[Rechazar HTTP 401]\n    C -->|Permitido| E[Generar Token de Sesión]\n    C -->|Denegado| F[Registrar Intento en Auditoría]\n    E --> G((Acceso al Hub))\n```\n\n',
                    '', ''
                  )}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-xs flex items-center gap-2 cursor-pointer"
                >
                  <GitBranch className="w-3.5 h-3.5 text-amber-500" />
                  <div>
                    <div className="font-semibold">Diagrama de Flujo (Flowchart)</div>
                    <div className="text-[10px] text-slate-400">Decisiones lógicas y bifurcaciones</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => insertFormat(
                    '\n```mermaid\nclassDiagram\n    class HubDocument {\n        +String id\n        +String title\n        +String ecosystem\n        +UserRole requiredRole\n        +publishVersion()\n        +revertVersion()\n    }\n    class DocumentVersion {\n        +String versionId\n        +String timestamp\n        +String authorRole\n        +String contentSnapshot\n    }\n    HubDocument "1" *-- "many" DocumentVersion : historial\n```\n\n',
                    '', ''
                  )}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-xs flex items-center gap-2 cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-emerald-500" />
                  <div>
                    <div className="font-semibold">Diagrama de Clases / Entidades</div>
                    <div className="text-[10px] text-slate-400">Estructura OOP y relaciones de datos</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* MENÚ DESPLEGABLE: CALLOUTS / ALERTAS CONFLUENCE */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setActiveMenu(activeMenu === 'callouts' ? null : 'callouts')}
              className={`p-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${
                activeMenu === 'callouts'
                  ? 'bg-accent-500/20 text-accent-600 dark:text-accent-400 font-bold'
                  : 'hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title="Insertar Callouts y Paneles Informativos"
            >
              <AlertCircle className="w-4 h-4 text-purple-500" />
              <span className="text-[11px] font-semibold hidden sm:inline">Callout</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {activeMenu === 'callouts' && (
              <div className={`absolute top-full left-0 mt-1 w-64 rounded-xl border shadow-xl z-30 p-2 space-y-1 ${
                isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
              }`}>
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Callouts Confluence</div>

                <button
                  type="button"
                  onClick={() => insertFormat(
                    '\n> [!NOTE]\n> Esta especificación técnica ha sido revisada por el equipo de arquitectura y está lista para deployment.\n\n',
                    '', ''
                  )}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-xs flex items-center gap-2 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5 text-blue-500" />
                  <div>
                    <div className="font-semibold">Nota Informativa</div>
                    <div className="text-[10px] text-slate-400">Caja azul para aclaraciones</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => insertFormat(
                    '\n> [!TIP]\n> Para acelerar las consultas en producción, utiliza índices compuestos sobre las columnas de búsqueda frecuente.\n\n',
                    '', ''
                  )}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-xs flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <div>
                    <div className="font-semibold">Consejo / Best Practice</div>
                    <div className="text-[10px] text-slate-400">Caja verde de optimización</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => insertFormat(
                    '\n> [!WARNING]\n> Las modificaciones en este endpoint requieren actualización obligatoria del token B2B en todos los repositorios satélites.\n\n',
                    '', ''
                  )}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-xs flex items-center gap-2 cursor-pointer"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                  <div>
                    <div className="font-semibold">Advertencia Crítica</div>
                    <div className="text-[10px] text-slate-400">Caja amarilla de precaución</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => insertFormat('\n```typescript\n// Ejemplo de código tipado\nexport interface ApiResponse<T> {\n  status: "success" | "error"\n  data: T\n  timestamp: string\n}\n```\n\n', '', '')}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-1 font-mono text-[11px]"
            title="Bloque de Código Tipado"
          >
            <FileCode className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
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
      <div className="flex-1 flex overflow-hidden min-h-[440px]">
        {/* Panel de Edición */}
        <div className={`flex-1 flex flex-col p-4 ${splitView ? 'border-r border-slate-200 dark:border-slate-700/80' : ''}`}>
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 w-full bg-transparent font-mono text-xs font-['Roboto_Mono',monospace] leading-relaxed outline-none resize-none placeholder-slate-400"
            placeholder="Escribe aquí el contenido en formato Markdown enriquecido o selecciona una plantilla superior..."
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
            placeholder="ej. Actualización de diagramas de secuencia y tablas de endpoints"
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

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-accent-600 hover:bg-accent-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Guardar & Publicar Versión</span>
          </button>
        </div>
      </div>
    </div>
  )
}
