import type { Metadata } from 'next'
import { ContactHero } from '@/components/sections/ContactHero'
import { ContactForm } from '@/components/sections/ContactForm'
import { FAQ } from '@/components/sections/FAQ'
import { FAQJsonLd } from '@/components/layout/FAQJsonLd'
import { faqs } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Hablemos sobre tu próximo proyecto. Contacta a Creati y respondemos en menos de 24 horas.',
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return (
    <>
      <FAQJsonLd faqs={[...faqs]} />
      <ContactHero />
      <ContactForm />
      <FAQ />
    </>
  )
}
