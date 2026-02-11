import type { Metadata } from 'next'
import { ContactHero } from '@/components/sections/ContactHero'
import { ContactForm } from '@/components/sections/ContactForm'
import { FAQ } from '@/components/sections/FAQ'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Hablemos sobre tu próximo proyecto. Escríbenos y respondemos en menos de 24 horas.',
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <FAQ />
    </>
  )
}
