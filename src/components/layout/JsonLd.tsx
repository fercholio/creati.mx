export default function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Creati',
    url: 'https://creati.mx',
    logo: 'https://creati.mx/logo.png',
    description: 'Software que se adapta a tu vida. Creamos productos digitales que las personas realmente disfrutan usar.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Monterrey',
      addressRegion: 'Nuevo León',
      addressCountry: 'MX',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hola@creati.mx',
      contactType: 'sales',
      availableLanguage: ['Spanish', 'English'],
    },
    sameAs: [
      'https://linkedin.com/company/creati',
      'https://twitter.com/creatimx',
      'https://github.com/creatimx',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
