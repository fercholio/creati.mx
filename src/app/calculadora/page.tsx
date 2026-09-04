import type { Metadata } from 'next'
import { CalculatorClient } from './CalculatorClient'

export const metadata: Metadata = {
  title: 'Calculadora de Costo de Software y Aplicaciones Móviles en México',
  description: 'Calcula el costo y tiempo estimado para desarrollar tu plataforma web, SaaS o app móvil. Estimación orientativa transparente basada en estándares de ingeniería.',
  alternates: {
    canonical: '/calculadora',
  },
  openGraph: {
    title: 'Calculadora de Costo de Software y Aplicaciones | Creati',
    description: 'Estima la inversión y semanas de desarrollo para tu proyecto digital con nuestra calculadora interactiva.',
    url: 'https://creati.mx/calculadora',
    type: 'website',
  },
}

export default function CalculatorPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://creati.mx',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Calculadora de Costo',
        item: 'https://creati.mx/calculadora',
      },
    ],
  }

  const toolJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Calculadora de Costo de Software Creati',
    url: 'https://creati.mx/calculadora',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript and HTML5 support',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'Creati',
      url: 'https://creati.mx',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <CalculatorClient />
    </>
  )
}