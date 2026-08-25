'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const ShowroomHub = dynamic(
  () => import('@/components/showroom/ShowroomHub').then((m) => m.ShowroomHub),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-8 animate-pulse">
        <div className="h-16 bg-gray-200/80 rounded-2xl w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-80 bg-gray-200/60 rounded-3xl" />
          ))}
        </div>
      </div>
    ),
  }
)

const SocialShareCards = dynamic(
  () => import('@/components/ui/SocialShareCards').then((m) => m.SocialShareCards),
  {
    ssr: false,
    loading: () => <div className="h-64 bg-gray-200/50 rounded-3xl animate-pulse" />,
  }
)

export function ShowroomClientView() {
  return (
    <>
      <ShowroomHub initialAppId="estateflow" isStandalonePage={true} />

      <div className="mt-20 border-t border-gray-200 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-extrabold border border-amber-200 mb-2">
            Brochure Impreso & Tarjetas para Redes Sociales
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-[family-name:var(--font-display)]">
            Descarga o Escanea el Brochure con QR
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Ideal para compartir en reuniones con clientes, redes sociales o imprimir en carpetas comerciales.
          </p>
        </div>

        <SocialShareCards />
      </div>
    </>
  )
}
