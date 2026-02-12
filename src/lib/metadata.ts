import type { Metadata } from 'next'

export const siteConfig = {
  name: 'Creati',
  description: 'Software que se adapta a tu vida. Creamos productos digitales que las personas realmente disfrutan usar.',
  url: 'https://creati.mx',
  ogImage: '/og.png',
  links: {
    email: 'hola@creati.mx',
  },
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Software que se adapta a tu vida`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'desarrollo de software a medida México',
    'agencia de software Mérida',
    'desarrollo de aplicaciones web',
    'desarrollo de aplicaciones móviles',
    'diseño UX México',
    'productos digitales',
    'software a medida',
    'consultoría tecnológica',
    'plataformas SaaS',
    'inteligencia artificial',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: siteConfig.url,
    title: `${siteConfig.name} — Software que se adapta a tu vida`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Creati — Desarrollo de software a medida en México',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — Software que se adapta a tu vida`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: '/',
    languages: {
      'es-MX': siteConfig.url,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'theme-color': '#152238',
  },
  manifest: '/manifest.json',
}
