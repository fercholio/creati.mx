export default function JsonLd() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    name: 'Creati',
    legalName: 'Creati Digital Studio',
    url: 'https://creati.mx',
    logo: 'https://creati.mx/logo.png',
    image: 'https://creati.mx/og.png',
    description: 'Estudio de desarrollo de software a medida, aplicaciones móviles, plataformas web y soluciones de inteligencia artificial en México.',
    email: 'hola@creati.mx',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mérida',
      addressRegion: 'Yucatán',
      addressCountry: 'MX',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 20.96737,
      longitude: -89.592586,
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Yucatán' },
      { '@type': 'Country', name: 'México' },
      { '@type': 'Country', name: 'United States' },
    ],
    knowsAbout: [
      'Desarrollo de Software a Medida',
      'Desarrollo de Aplicaciones Móviles (iOS y Android)',
      'Diseño UX/UI de Alta Conversión',
      'Soluciones con Inteligencia Artificial',
      'Plataformas SaaS Escalables',
      'Arquitectura Cloud y DevOps',
    ],
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

  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Creati',
    url: 'https://creati.mx',
    description: 'Software que se adapta a tu vida. Creamos productos digitales que las personas realmente disfrutan usar.',
    inLanguage: 'es-MX',
    publisher: {
      '@type': 'Organization',
      name: 'Creati',
      url: 'https://creati.mx',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
    </>
  )
}
