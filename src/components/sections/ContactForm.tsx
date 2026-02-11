'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Animations'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    // Honeypot check — if filled, silently "succeed" (bot)
    if (formData.get('_gotcha')) {
      setSubmitted(true)
      return
    }

    // Client-side validation
    const email = formData.get('email') as string
    const message = formData.get('message') as string
    const name = formData.get('name') as string

    if (!name || name.trim().length < 2) {
      setError('Por favor ingresa tu nombre.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Por favor ingresa un email válido.')
      return
    }

    if (!message || message.trim().length < 10) {
      setError('El mensaje debe tener al menos 10 caracteres.')
      return
    }

    setSending(true)

    try {
      if (FORMSPREE_ID) {
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        })

        if (!response.ok) {
          throw new Error('Error al enviar el formulario.')
        }
      } else {
        // Fallback: mailto link if no Formspree configured
        const subject = encodeURIComponent(`Contacto desde creati.mx — ${name}`)
        const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\nEmpresa: ${formData.get('company') || 'N/A'}\n\n${message}`)
        window.location.href = `mailto:hola@creati.mx?subject=${subject}&body=${body}`
      }

      setSending(false)
      setSubmitted(true)
    } catch {
      setSending(false)
      setError('Hubo un error al enviar tu mensaje. Intenta de nuevo o escríbenos a hola@creati.mx.')
    }
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
                <Button onClick={() => { setSubmitted(false); setError(null) }} variant="secondary" size="sm">
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
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {/* Honeypot field — hidden from humans */}
                    <input
                      type="text"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="Nombre"
                        name="name"
                        placeholder="Tu nombre"
                        required
                        minLength={2}
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
                      minLength={10}
                    />

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm"
                        role="alert"
                      >
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <span>{error}</span>
                      </motion.div>
                    )}

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
