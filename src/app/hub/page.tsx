import type { Metadata } from 'next'
import { HubClient } from './HubClient'

export const metadata: Metadata = {
  title: 'Creati Knowledge Hub | Documentación Técnica & Estrategia',
  description: 'Portal privado y centro de documentación multi-rol para desarrolladores, product managers y equipo comercial de Creati.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function HubPage() {
  return <HubClient />
}