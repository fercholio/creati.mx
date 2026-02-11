import type { Metadata } from 'next'
import { AboutHero } from '@/components/sections/AboutHero'
import { Values } from '@/components/sections/Values'
import { Approach } from '@/components/sections/Approach'
import { CTA } from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conoce la historia detrás de Creati. Por qué existimos y cómo construimos software diferente.',
  alternates: {
    canonical: '/about',
  },
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Values />
      <Approach />
      <CTA />
    </>
  )
}
