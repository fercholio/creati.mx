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

      // Background Gradient
      const grad = ctx.createLinearGradient(0, 0, 1200, 1600)
      grad.addColorStop(0, '#020617')
      grad.addColorStop(0.5, '#0f172a')
      grad.addColorStop(1, '#0284c7')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 1200, 1600)

      // Outer Border
      ctx.strokeStyle = '#38bdf8'
      ctx.lineWidth = 12
      ctx.strokeRect(30, 30, 1140, 1540)

      // Header Badge
      ctx.fillStyle = '#0ea5e9'
      ctx.font = 'bold 28px sans-serif'
      ctx.fillText('CREATI.MX · B2B CUSTOM SOFTWARE & AI STUDIO', 80, 120)

      // Main Headline
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 54px sans-serif'
      ctx.fillText('BROCHURE EJECUTIVO DE SOLUCIONES', 80, 200)

      // Subtitle
      ctx.fillStyle = '#cbd5e1'
      ctx.font = '30px sans-serif'
      ctx.fillText('Plataformas a la medida con IA, SAP, SPEI & WhatsApp API', 80, 260)

      // Solution Cards Grid (Draw 4 Boxes)
      const drawCard = (x: number, y: number, title: string, desc: string, color: string) => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'
        ctx.fillRect(x, y, 500, 220)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'
        ctx.lineWidth = 2
        ctx.strokeRect(x, y, 500, 220)

        ctx.fillStyle = color
        ctx.font = 'bold 32px sans-serif'
        ctx.fillText(title, x + 30, y + 60)

        ctx.fillStyle = '#e2e8f0'
        ctx.font = '24px sans-serif'
        ctx.fillText(desc, x + 30, y + 120)
      }

      drawCard(80, 340, '🏡 LIVU Proptech', 'Control en caseta & SPEI', '#34d399')
      drawCard(620, 340, '⏱️ HR-TCI Tempus', 'Costeo horario & Groq AI', '#38bdf8')
      drawCard(80, 600, '🌟 EstateFlow', 'Masterplan & Lotes 36 MSI', '#fbbf24')
      drawCard(620, 600, '🤖 Agentes de IA', 'WhatsApp 24/7 & RAG', '#c084fc')

      // QR Box Container (Bottom)
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(80, 900, 1040, 580)

      ctx.fillStyle = '#0f172a'
      ctx.font = 'bold 44px sans-serif'
      ctx.fillText('ESCANEA Y PRUEBA EL SHOWROOM EN VIVO', 130, 990)

      ctx.fillStyle = '#475569'
      ctx.font = '28px sans-serif'
      ctx.fillText('Apunta la cámara de tu celular para abrir el simulador táctil.', 130, 1050)

      ctx.fillStyle = '#0284c7'
      ctx.font = 'bold 36px sans-serif'
      ctx.fillText('https://creati.mx/showroom', 130, 1120)

      // Draw QR Image inside Canvas
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        ctx.drawImage(img, 720, 960, 340, 340)

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
