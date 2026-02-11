import type { Metadata } from 'next'

export const siteConfig = {
  name: 'Creati',
  description: 'Software that fits your life. We build products real people love to use.',
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
    'software', 'desarrollo', 'aplicaciones', 'diseño', 'UX',
    'productos digitales', 'México', 'tecnología',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
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
}
