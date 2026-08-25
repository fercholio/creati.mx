'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  Sparkles,
  Bot,
  Send,
  MessageSquare,
  FileText,
  CheckCircle2,
  Zap,
  Cpu,
  RefreshCw,
  Clock,
  Building2,
  DollarSign,
  Search,
} from 'lucide-react'

export function NovaBrainSandbox({ role }: { role: string }) {
  const [userQuery, setUserQuery] = useState('')
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'ai',
      text: '🤖 Hola Fercho, soy NovaBrain AI, el agente autónomo de Inteligencia Artificial de Creati. Puedo cotizar proyectos, extraer cláusulas de contratos en PDF o responder a tus clientes por WhatsApp 24/7 en tiempo real.',
      time: '16:15',
    },
  ])
  const [isThinking, setIsThinking] = useState(false)
  const [extractedPdf, setExtractedPdf] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  const triggerNotification = (msg: string) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 3500)
  }

  const samplePrompts = [
    '¿Cuánto cuesta un software de cotización para 120 lotes?',
    'Audita este contrato de arrendamiento en PDF',
    'Genera un borrador de propuesta comercial en 3 seg',
  ]

  const handleSendPrompt = (promptText: string) => {
    if (!promptText) return
    const textToSend = promptText
    setUserQuery('')

    setChatHistory((prev) => [
      ...prev,
      { sender: 'user', text: textToSend, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ])

    setIsThinking(true)

    setTimeout(() => {
      setIsThinking(false)
      let aiReply = ''

      if (textToSend.includes('lotes') || textToSend.includes('cuesta')) {
        aiReply = '📊 **Dictamen de Inteligencia NovaBrain:**\nPara un desarrollo de 120 lotes residencial en Mérida Norte:\n- **Tiempo estimado:** 5 semanas (Fase MVP en Semana 3)\n- **Inversión estimada:** $85,000 MXN\n- **Incluye:** Mapa interactivo HTML5, cotizaciones en PDF, apartado bancario Stripe/SPEI e integración WhatsApp Business API.'
      } else if (textToSend.includes('contrato') || textToSend.includes('PDF') || textToSend.includes('Audita')) {
        setExtractedPdf(true)
        aiReply = '📄 **Análisis de Documento Completado (Groq AI Fast LLM · 0.38s):**\n- **Arrendador:** Desarrollos Inmobiliarios del Mayab S.A. de C.V.\n- **Vigencia:** 36 Meses (MSI)\n- **Riesgo Legal:** 0% detectado (Cláusulas normativas de Yucatán)\n- **Acción:** Pagaré digital certificado listo para firma NOM-151.'
      } else {
        aiReply = '🚀 **Respuesta de Agente Autónomo Creati:**\nProcesé tu solicitud y generé la propuesta en PDF sincronizada con tu ERP (SAP/Intelisis). ¿Deseas enviarla al WhatsApp del cliente?'
      }

      setChatHistory((prev) => [
        ...prev,
        { sender: 'ai', text: aiReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ])
    }, 1400)
  }

  return (
    <div className="space-y-4 font-[family-name:var(--font-display)]">
      {/* Toast Banner */}
      <AnimatePresence>
        {notification && (
          <motion.div
            key="toast-banner"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-cyan-950 text-cyan-100 border border-cyan-700 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left: NovaBrain Neural Chat Studio (7 cols) */}
        <div className="md:col-span-7 bg-slate-950 text-white p-4.5 rounded-2xl border border-cyan-800/80 shadow-xl flex flex-col justify-between min-h-[420px]">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-bold">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-white">NovaBrain AI Studio</h4>
                    <span className="text-[9px] bg-cyan-400/20 text-cyan-300 font-extrabold px-2 py-0.2 rounded-full border border-cyan-400/40">
                      Groq LLM 0.38s
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">Agente Autónomo B2B & RAG</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live Engine
              </span>
            </div>

            {/* Chat History Box */}
            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1 text-xs">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`p-3 rounded-2xl max-w-[90%] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-cyan-600 text-white font-medium rounded-tr-none'
                        : 'bg-slate-900 text-slate-100 border border-cyan-500/30 rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <span className="text-[9px] opacity-60 text-right block mt-1">{msg.time}</span>
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex items-center gap-2 p-3 bg-slate-900 rounded-2xl border border-cyan-500/30 w-fit">
                  <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
                  <span className="text-xs text-cyan-300 font-mono">NovaBrain pensando y consultando base RAG...</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Prompts & Input Form */}
          <div className="mt-4 space-y-2 pt-3 border-t border-slate-800">
            <div className="flex flex-wrap gap-1.5">
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendPrompt(p)}
                  className="text-[10px] bg-slate-900 hover:bg-cyan-950 text-cyan-300 border border-cyan-500/30 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  ✨ {p}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendPrompt(userQuery)
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Escribe tu consulta a la IA (ej. Cotizar software, analizar contrato)..."
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-cyan-500/20"
              >
                <Send className="w-3.5 h-3.5" />
                Enviar
              </button>
            </form>
          </div>
        </div>

        {/* Right: AI OCR Document & Contract Auditor (5 cols) */}
        <div className="md:col-span-5 bg-slate-900 text-white p-4.5 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-cyan-400" />
                Auditor de Contratos & Facturas SAT
              </h4>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 font-extrabold px-2 py-0.5 rounded-full">
                OCR & Vision
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Extrae automáticamente campos clave de PDF, RFCs del SAT y contratos firmados sin captura manual.
            </p>

            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Documento Procesado:</span>
                <span className="font-bold text-white">Contrato_Lote_42_Mérida.pdf</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Score de Riesgo Legal:</span>
                <span className="font-bold text-emerald-400">0.0% (SEGURO)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Validación SAT CFDI:</span>
                <span className="font-mono text-cyan-300 font-bold">VIGENTE Y CERTIFICADO</span>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <button
              onClick={() => handleSendPrompt('Audita este contrato de arrendamiento en PDF')}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Simular Extracción de PDF con IA (0.4s)
            </button>
            <p className="text-[10px] text-slate-400 text-center font-mono">
              Integrado a WhatsApp API & Vercel AI SDK.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
