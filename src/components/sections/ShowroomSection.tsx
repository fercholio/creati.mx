'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Tablet, Zap } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { ShowroomHub } from '@/components/showroom/ShowroomHub'

export function ShowroomSection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden" id="showroom">
      {/* Background decoration */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-accent-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-navy-100/30 rounded-full blur-3xl -z-10" />

      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 text-accent-600 text-xs font-bold border border-accent-100 mb-4 shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-accent-500" />
              Demostración Ejecutiva & Simulador en Vivo
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] text-gray-900 tracking-tight leading-[1.15]"
          >
            Prueba la tecnología en vivo que{' '}
            <span className="bg-gradient-to-r from-accent-600 via-accent-500 to-navy-600 bg-clip-text text-transparent">
              impulsará tu empresa
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            Explora nuestro catálogo de plataformas especializadas. Selecciona cualquier solución para experimentar su interfaz, interactuar con los flujos operativos en vivo y visualizar el impacto directo en tu negocio.
          </motion.p>
        </div>

        {/* Interactive Hub */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ShowroomHub initialAppId="estateflow" />
        </motion.div>

        {/* Bottom Banner with link to standalone /showroom page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/showroom"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-navy-900 hover:bg-navy-800 text-white text-xs sm:text-sm font-bold shadow-lg shadow-navy-950/10 hover:shadow-xl transition-all cursor-pointer group"
          >
            <Tablet className="w-4 h-4 text-accent-400" />
            <span>Abrir Ecosistema Completo en Modo Presentación</span>
            <ArrowRight className="w-4 h-4 text-accent-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
