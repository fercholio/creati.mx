'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { QrCode, Download, Share2, Sparkles, ShieldCheck, CheckCircle2, ArrowRight, Smartphone, Building2 } from 'lucide-react'

export function SocialShareCards() {
  const [downloaded, setDownloaded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const showroomUrl = 'https://creati.mx/showroom'
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(showroomUrl)}&color=0f172a&bgcolor=ffffff`

  const handleRealDownload = () => {
    try {
      const canvas = document.createElement('canvas')
      canvas.width = 1200
      canvas.height = 1600
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Helper for rounded rectangles
      const drawRoundRect = (
        x: number,
        y: number,
        w: number,
        h: number,
        r: number,
        fillColor: string,
        strokeColor?: string,
        strokeWidth = 2
      ) => {
        ctx.beginPath()
        ctx.moveTo(x + r, y)
        ctx.lineTo(x + w - r, y)
        ctx.arcTo(x + w, y, x + w, y + r, r)
        ctx.lineTo(x + w, y + h - r)
        ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
        ctx.lineTo(x + r, y + h)
        ctx.arcTo(x, y + h, x, y + h - r, r)
        ctx.lineTo(x, y + r)
        ctx.arcTo(x, y, x + r, y, r)
        ctx.closePath()

        if (fillColor) {
          ctx.fillStyle = fillColor
          ctx.fill()
        }
        if (strokeColor) {
          ctx.strokeStyle = strokeColor
          ctx.lineWidth = strokeWidth
          ctx.stroke()
        }
      }

      // Background Gradient (Deep Navy / Slate Luxury Theme)
      const bgGrad = ctx.createLinearGradient(0, 0, 1200, 1600)
      bgGrad.addColorStop(0, '#030712')
      bgGrad.addColorStop(0.4, '#0f172a')
      bgGrad.addColorStop(1, '#0284c7')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, 1200, 1600)

      // Outer Decorative Glass Border
      drawRoundRect(40, 40, 1120, 1520, 40, '', 'rgba(255, 255, 255, 0.15)', 4)
      drawRoundRect(50, 50, 1100, 1500, 34, '', 'rgba(56, 189, 248, 0.3)', 2)

      // Header Tagline
      ctx.fillStyle = '#38bdf8'
      ctx.font = '900 24px system-ui, -apple-system, sans-serif'
      ctx.fillText('CREATI.MX  ·  B2B CUSTOM SOFTWARE & AI STUDIO', 80, 130)

      // Main Title (Clean 2-line Wrapping)
      ctx.fillStyle = '#ffffff'
      ctx.font = '900 48px system-ui, -apple-system, sans-serif'
      ctx.fillText('BROCHURE EJECUTIVO DE SOLUCIONES', 80, 200)

      // Subtitle
      ctx.fillStyle = '#94a3b8'
      ctx.font = '500 26px system-ui, -apple-system, sans-serif'
      ctx.fillText('Plataformas a la medida con IA, SAP, SPEI & WhatsApp API', 80, 250)

      // Divider Line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(80, 290)
      ctx.lineTo(1120, 290)
      ctx.stroke()

      // Solution Cards (Grid 2x2 with rounded corners & glowing badges)
      const cards = [
        { title: '🏡 LIVU Proptech', subtitle: 'Control Residencial & SPEI', desc: 'Acceso en caseta en 6 seg y pases QR', color: '#10b981' },
        { title: '⏱️ HR-TCI Tempus', subtitle: 'Time & Cost Intelligence', desc: 'Costeo horario real y Groq AI Coach', color: '#38bdf8' },
        { title: '🌟 EstateFlow', subtitle: 'Masterplan & Lotes 36 MSI', desc: 'Mapa interactivo y cotización PDF', color: '#f59e0b' },
        { title: '🤖 Agentes de IA', subtitle: 'Automatización & RAG', desc: 'Atención por WhatsApp 24/7 y contratos', color: '#a855f7' },
      ]

      cards.forEach((card, idx) => {
        const row = Math.floor(idx / 2)
        const col = idx % 2
        const cx = 80 + col * 530
        const cy = 320 + row * 240
        const cw = 510
        const ch = 210

        // Card Box
        drawRoundRect(cx, cy, cw, ch, 24, 'rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.12)', 2)

        // Card Title
        ctx.fillStyle = card.color
        ctx.font = 'bold 30px system-ui, -apple-system, sans-serif'
        ctx.fillText(card.title, cx + 24, cy + 54)

        // Subtitle
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 22px system-ui, -apple-system, sans-serif'
        ctx.fillText(card.subtitle, cx + 24, cy + 96)

        // Description
        ctx.fillStyle = '#cbd5e1'
        ctx.font = '400 20px system-ui, -apple-system, sans-serif'
        ctx.fillText(card.desc, cx + 24, cy + 140)

        // Small Check Pill
        drawRoundRect(cx + 24, cy + 160, 160, 30, 8, 'rgba(255, 255, 255, 0.1)')
        ctx.fillStyle = '#34d399'
        ctx.font = 'bold 15px system-ui, -apple-system, sans-serif'
        ctx.fillText('✓ 100% Funcional', cx + 36, cy + 180)
      })

      // QR Code Container Box (Bottom White Card)
      drawRoundRect(80, 840, 1040, 640, 36, '#ffffff', '#fbbf24', 4)

      // Left Text Content Inside White Box
      ctx.fillStyle = '#0ea5e9'
      ctx.font = '900 20px system-ui, -apple-system, sans-serif'
      ctx.fillText('⚡ DEMOSTRACIÓN TÁCTIL EN TIEMPO REAL', 130, 930)

      ctx.fillStyle = '#0f172a'
      ctx.font = '900 42px system-ui, -apple-system, sans-serif'
      ctx.fillText('ESCANEA EL CÓDIGO QR', 130, 990)
      ctx.fillText('PARA PROBAR EL SHOWROOM', 130, 1045)

      ctx.fillStyle = '#475569'
      ctx.font = '500 24px system-ui, -apple-system, sans-serif'
      ctx.fillText('Apunta la cámara de tu celular para interactuar', 130, 1120)
      ctx.fillText('con las aplicaciones operativas en vivo.', 130, 1155)

      // URL Pill Box
      drawRoundRect(130, 1200, 480, 60, 16, '#f1f5f9', '#cbd5e1', 2)
      ctx.fillStyle = '#0284c7'
      ctx.font = 'bold 26px system-ui, -apple-system, sans-serif'
      ctx.fillText('https://creati.mx/showroom', 155, 1240)

      // Bottom Footer Badge Inside Box
      ctx.fillStyle = '#64748b'
      ctx.font = 'bold 20px system-ui, -apple-system, sans-serif'
      ctx.fillText('Creati Engineering · Mérida, Yucatán', 130, 1330)

      // Draw Crisp QR Code on Right Side
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        // White padding background for QR
        drawRoundRect(670, 910, 400, 400, 24, '#ffffff', '#e2e8f0', 2)
        ctx.drawImage(img, 690, 930, 360, 360)

        // Trigger Download
        const link = document.createElement('a')
        link.download = 'creati-brochure-ejecutivo-qr.png'
        link.href = canvas.toDataURL('image/png')
        link.click()

        setDownloaded(true)
        setTimeout(() => setDownloaded(false), 3500)
      }
      img.src = qrApiUrl
    } catch (e) {
      console.error('Download error:', e)
    }
  }

  return (
    <div className="space-y-12 py-10 font-[family-name:var(--font-display)]">
      {/* 1. Executive Brochure Graphic with QR Code (3:4 Ratio Vertical Poster) */}
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-slate-950 via-slate-900 to-navy-950 text-white rounded-[36px] p-8 sm:p-10 shadow-2xl border-2 border-accent-500/30 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header & Branding */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 relative z-10">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent-400 bg-accent-500/10 px-3 py-1 rounded-full border border-accent-500/30">
              Creati.mx · B2B Software Studio
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Brochure Ejecutivo de Soluciones
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">Mérida & LATAM</span>
        </div>

        {/* Brochure Core Content Grid */}
        <div className="py-6 space-y-5 relative z-10 font-sans">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Desarrollamos plataformas a la medida con arquitectura de código propia, IA autónoma e integraciones a SAP, SPEI, WhatsApp API y el SAT CFDI 4.0.
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
              <span className="font-bold text-accent-300 block">🏡 LIVU Proptech</span>
              <p className="text-[11px] text-slate-300 mt-0.5">Control en caseta & SPEI</p>
            </div>
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
              <span className="font-bold text-cyan-300 block">⏱️ HR-TCI Tempus</span>
              <p className="text-[11px] text-slate-300 mt-0.5">Costeo horario & Groq AI</p>
            </div>
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
              <span className="font-bold text-amber-300 block">🌟 EstateFlow</span>
              <p className="text-[11px] text-slate-300 mt-0.5">Masterplan & Lotes 36 MSI</p>
            </div>
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
              <span className="font-bold text-emerald-400 block">🤖 Agentes de IA</span>
              <p className="text-[11px] text-slate-300 mt-0.5">WhatsApp 24/7 & RAG</p>
            </div>
          </div>
        </div>

        {/* Real Dynamic QR Code Card (Bottom Box) */}
        <div className="mt-2 p-5 bg-white text-slate-950 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5 relative z-10 border border-amber-400/40">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-accent-700 bg-accent-50 px-2.5 py-0.5 rounded-full border border-accent-200">
              ⚡ Escaneo en Vivo
            </span>
            <h4 className="text-base font-extrabold text-slate-900 leading-tight">
              Prueba la Demo Interactiva en tu Teléfono
            </h4>
            <p className="text-xs text-slate-600 font-sans">
              Apunta la cámara de tu celular para abrir el Showroom en tiempo real.
            </p>
            <span className="text-[11px] font-mono font-bold text-accent-600 block pt-1">
              https://creati.mx/showroom
            </span>
          </div>

          {/* Crisp QR Code */}
          <div className="w-28 h-28 bg-white p-2 rounded-2xl border-2 border-slate-900 shadow-md shrink-0 flex flex-col items-center justify-center">
            {isMounted ? (
              <img
                src={qrApiUrl}
                alt="QR Code Creati Showroom"
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 rounded-lg animate-pulse" />
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleRealDownload}
            className="px-6 py-3.5 bg-accent-500 hover:bg-accent-600 text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-2 mx-auto cursor-pointer shadow-lg shadow-accent-500/20 transition-all active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            {downloaded ? '✓ ¡Descargando creati-brochure-ejecutivo-qr.png!' : 'Descargar Brochure HD en PNG con QR'}
          </button>
        </div>
      </div>

      {/* 2. Social Media Announcement Graphic (16:9 Landscape Card for LinkedIn/Twitter) */}
      <div className="max-w-3xl mx-auto bg-gradient-to-r from-navy-950 via-slate-900 to-accent-950 text-white rounded-[32px] p-8 shadow-2xl border border-accent-400/30 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center sm:text-left">
            <span className="text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full uppercase tracking-wider">
              🚀 Lanzamiento Creati v2.0
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              Software e Inteligencia Artificial a la Medida para Empresas en Crecimiento
            </h3>
            <p className="text-xs text-slate-300 font-sans max-w-md">
              Desarrollamos soluciones que automatizan operaciones, eliminan ineficiencias y se conectan a tu ERP.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <span className="text-[10px] bg-white/10 px-2.5 py-0.5 rounded-full">✓ 100% Propiedad del Código</span>
              <span className="text-[10px] bg-white/10 px-2.5 py-0.5 rounded-full">✓ SAP & SPEI</span>
              <span className="text-[10px] bg-white/10 px-2.5 py-0.5 rounded-full">✓ Mérida & LATAM</span>
            </div>
          </div>

          <div className="shrink-0 text-center">
            <div className="w-24 h-24 bg-white p-2 rounded-2xl border-2 border-accent-400 shadow-xl mb-2 mx-auto">
              {isMounted ? (
                <img src={qrApiUrl} alt="QR Social Share" className="w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full bg-gray-100 rounded-lg animate-pulse" />
              )}
            </div>
            <span className="text-[10px] font-bold text-amber-300 block">creati.mx/showroom</span>
          </div>
        </div>
      </div>
    </div>
  )
}
