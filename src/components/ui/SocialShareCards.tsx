'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { QrCode, Download, Share2, Sparkles, ShieldCheck, CheckCircle2, ArrowRight, Smartphone, Building2 } from 'lucide-react'

export function SocialShareCards() {
  const [downloaded, setDownloaded] = useState(false)

  const showroomUrl = 'https://creati.mx/showroom'
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(showroomUrl)}&color=0f172a&bgcolor=ffffff`

  const handleDownloadMock = () => {
    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 3000)
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
            <img
              src={qrApiUrl}
              alt="QR Code Creati Showroom"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleDownloadMock}
            className="px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-2 mx-auto cursor-pointer shadow-lg shadow-accent-500/20 transition-all"
          >
            <Download className="w-4 h-4" />
            {downloaded ? '✓ Guardado como Imagen HD' : 'Guardar Brochure HD con QR para Imprimir'}
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
              <img src={qrApiUrl} alt="QR Social Share" className="w-full h-full object-contain" />
            </div>
            <span className="text-[10px] font-bold text-amber-300 block">creati.mx/showroom</span>
          </div>
        </div>
      </div>
    </div>
  )
}
