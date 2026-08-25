'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, MessageSquare, Building2, CheckCircle2, Phone, Mail, User } from 'lucide-react'
import { ShowroomApp } from '@/data/showroomData'

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
  app: ShowroomApp
}

export function QuoteModal({ isOpen, onClose, app }: QuoteModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    notes: '',
  })

  const whatsappUrl = `https://wa.me/529990000000?text=${encodeURIComponent(
    `Hola Creati, me interesa una solución como ${app.title} (${app.industry}) para mi empresa.`
  )}`

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
    }, 2800)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="quote-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <motion.div
            key="quote-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">¡Solicitud Recibida!</h3>
                <p className="text-sm text-gray-500 max-w-sm mx-auto">
                  Un consultor técnico de Creati te contactará en menos de 2 horas para agendar tu demo personalizada de <strong>{app.title}</strong>.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold text-accent-600 bg-accent-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Cotizar Solución
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">
                    Implementa {app.title} en tu Empresa
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Enfoque diseñado para el mercado de {app.targetRegion}.
                  </p>
                </div>

                {/* WhatsApp Fast Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mb-5 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  Hablar Directo por WhatsApp con un Consultor
                </a>

                <div className="relative flex py-2 items-center mb-5">
                  <div className="flex-grow border-t border-gray-200" />
                  <span className="shrink-0 mx-3 text-xs text-gray-400 font-medium">o completa tus datos</span>
                  <div className="flex-grow border-t border-gray-200" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Nombre Completo</label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                        <input
                          required
                          type="text"
                          placeholder="Ej. Carlos Mendoza"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-accent-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Empresa / Negocio</label>
                      <div className="relative">
                        <Building2 className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                        <input
                          required
                          type="text"
                          placeholder="Ej. Desarrollos Península"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-accent-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">WhatsApp / Teléfono</label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                        <input
                          required
                          type="tel"
                          placeholder="999 123 4567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-accent-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Correo Corporativo</label>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                        <input
                          required
                          type="email"
                          placeholder="carlos@empresa.mx"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-accent-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">¿Qué requerimiento especial tienen?</label>
                    <textarea
                      rows={2}
                      placeholder="Número de usuarios, sucursales o etapas del proyecto..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-accent-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 mt-2 bg-accent-500 hover:bg-accent-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-accent-200"
                  >
                    <Send className="w-4 h-4" />
                    Solicitar Propuesta & Workshop de Arquitectura
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
