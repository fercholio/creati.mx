import Link from 'next/link'
import { navLinks, socialLinks, contactInfo } from '@/lib/constants'
import { Linkedin, Twitter, Github, Mail, MapPin } from 'lucide-react'
import { LogoIcon } from '@/components/ui/Logo'

export function Footer() {
  return (
    <footer aria-label="Pie de página" className="bg-navy-950 text-gray-400 mt-0">
      {/* Organic divider */}
      <div className="relative h-16 -mt-16">
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <path
            d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,40 1440,32 L1440,64 L0,64 Z"
            fill="#060e1a"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <LogoIcon size={36} variant="color" />
              <span className="text-xl font-bold font-[family-name:var(--font-display)] text-white">
                Crea<span className="text-white">TI</span><span className="text-accent-400">.mx</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-6">
              Construimos software que se adapta a la vida real de las personas.
              Productos que la gente disfruta usar.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-accent-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-4">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent-400 shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-accent-400 transition-colors">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent-400 shrink-0" />
                {contactInfo.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} Creati.mx — Todos los derechos reservados.</p>
          <p className="text-gray-500">Hecho con cuidado en México</p>
        </div>
      </div>
    </footer>
  )
}
