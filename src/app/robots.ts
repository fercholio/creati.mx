import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'Google-Extended', 'ClaudeBot', 'Anthropic-ai'],
        allow: ['/', '/llms.txt', '/about', '/contact'],
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://creati.mx/sitemap.xml',
  }
}
