'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Animations'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Send, CheckCircle2 } from 'lucide-react'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    // Simulate send
    await new Promise((r) => setTimeout(r, 1500))
    setSending(false)
    setSubmitted(true)
  }

  return (
    <section className="py-12 lg:py-16">
      <Container>
        <div className="max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-display)]">
                  ¡Mensaje enviado!
                </h3>
                <p className="text-gray-500 mb-6">
                  Gracias por contactarnos. Te respondemos pronto.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="secondary" size="sm">
                  Enviar otro mensaje
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Reveal>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="Nombre"
                        name="name"
                        placeholder="Tu nombre"
                        required
                      />
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                    <Input
                      label="Empresa"
                      name="company"
                      placeholder="Tu empresa (opcional)"
                    />
                    <Textarea
                      label="Mensaje"
                      name="message"
                      placeholder="Cuéntanos sobre tu proyecto o idea..."
                      rows={5}
                      required
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={sending}
                    >
                      {sending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar mensaje
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </Reveal>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}
