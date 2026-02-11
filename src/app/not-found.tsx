'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="relative mb-8">
          <span className="text-[10rem] font-bold font-[family-name:var(--font-display)] text-indigo-100 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-xl shadow-indigo-200">
              <span className="text-white text-3xl font-bold">?</span>
            </div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] text-gray-900 mb-3">
          Página no encontrada
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          La página que buscas no existe o fue movida. Pero no te preocupes, te
          llevamos de regreso.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/" variant="primary">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Button>
          <Button href="/contact" variant="secondary">
            Contáctanos
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
