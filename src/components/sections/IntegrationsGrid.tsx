'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Cpu,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Building2,
  CreditCard,
  MessageSquare,
  Cloud,
  Brain,
  ShieldCheck,
  Zap,
  Globe,
  Database,
  Lock,
  Landmark,
  FileCode,
  Send,
  Server,
  Layers,
} from 'lucide-react'
import { Container } from '@/components/layout/Container'

const TECH_ECOSYSTEM = [
  {
    category: 'ERPs & Sistemas Contables',
    badge: 'Conectividad ERP',
    badgeStyle: 'bg-blue-100 text-blue-900 border-blue-200',
    icon: Building2,
    description: 'Sincronización bidireccional de inventarios, cartera y pedidos sin duplicar capturas.',
    items: [
      { name: 'SAP Business One', detail: 'REST / DI API', icon: Building2 },
      { name: 'Intelisis ERP', detail: 'Webhooks & SQL', icon: Database },
      { name: 'Microsip', detail: 'API SDK', icon: Layers },
      { name: 'Zoho One', detail: 'OAuth 2.0 API', icon: Globe },
      { name: 'Salesforce', detail: 'Apex Webhooks', icon: Cloud },
    ],
  },
  {
    category: 'Pagos & Bancos México',
    badge: 'Fintech & Fiscal',
    badgeStyle: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    icon: CreditCard,
    description: 'Cobro automatizado en segundos, dispersión bancaria y timbrado automático CFDI 4.0.',
    items: [
      { name: 'Stripe Payments', detail: 'Tarjetas & MSI', icon: CreditCard },
      { name: 'SPEI / Banxico Directo', detail: 'Conciliación instantánea', icon: Landmark },
      { name: 'SAT CFDI 4.0', detail: 'Timbrado automático', icon: FileCode },
      { name: 'MercadoPago', detail: 'Checkout Pro', icon: WalletIcon },
      { name: 'BBVA / Banorte API', detail: 'Webhooks bancarios', icon: ShieldCheck },
    ],
  },
  {
    category: 'Canales & Notificaciones',
    badge: 'Omnicanalidad',
    badgeStyle: 'bg-purple-100 text-purple-900 border-purple-200',
    icon: MessageSquare,
    description: 'Notificaciones automáticas por WhatsApp, SMS y Push a la cartera de tus clientes.',
    items: [
      { name: 'WhatsApp Business API', detail: 'Plantillas oficiales 24/7', icon: MessageSquare },
      { name: 'Twilio SMS & Voz', detail: 'Alertas de seguridad', icon: Send },
      { name: 'SendGrid Email', detail: 'Transaccional certificado', icon: Send },
      { name: 'Apple Push (APNs)', detail: 'Alertas iOS Wallet', icon: Zap },
      { name: 'Firebase Cloud Messaging', detail: 'Push Android/Web', icon: Cloud },
    ],
  },
  {
    category: 'Infraestructura & IA',
    badge: 'Alta Velocidad & Cloud',
    badgeStyle: 'bg-amber-100 text-amber-900 border-amber-200',
    icon: Brain,
    description: 'Agentes de Inteligencia Artificial y servidores escalables de alta disponibilidad.',
    items: [
      { name: 'Groq AI (Fast LLM)', detail: 'Respuesta en < 1.5 sec', icon: Zap },
      { name: 'OpenAI GPT-4o / RAG', detail: 'Modelos de lenguaje', icon: Brain },
      { name: 'Amazon Web Services (AWS)', detail: 'S3, EC2, Lambda', icon: Server },
      { name: 'Google Cloud Platform', detail: 'BigQuery & AI', icon: Cloud },
      { name: 'Docker / Kubernetes', detail: 'Contenedores aislados', icon: Cpu },
    ],
  },
]

function WalletIcon(props: any) {
  return <CreditCard {...props} />
}

export function IntegrationsGrid() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-[#f8fafc] via-white to-gray-50 relative overflow-hidden font-[family-name:var(--font-display)]" id="integrations">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-accent-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

      <Container>
        {/* Header (Executive & Sales-Focused) */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 text-accent-700 text-xs font-extrabold border border-accent-100 mb-4 shadow-2xs">
              <Cpu className="w-3.5 h-3.5 text-accent-500" />
              Ecosistema Tecnológico & Integraciones Enterprise
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-navy-950 tracking-tight leading-[1.15]"
          >
            Conectamos con la infraestructura que{' '}
            <span className="bg-gradient-to-r from-accent-600 via-accent-500 to-navy-700 bg-clip-text text-transparent">
              ya utiliza tu empresa
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-600 font-sans mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            No tienes que reemplazar tus sistemas actuales. Diseñamos conectores webhooks, conectividad a ERPs y APIs de IA para sincronizar tus datos en tiempo real sin interrumpir tu operación.
          </motion.p>
        </div>

        {/* Ecosystem Grid with Icons & Value Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TECH_ECOSYSTEM.map((cat, cIdx) => {
            const HeaderIcon = cat.icon
            return (
              <motion.div
                key={cIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: cIdx * 0.08 }}
                className="bg-white rounded-3xl border border-gray-200/90 p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-accent-300"
              >
                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-accent-50 text-accent-600 border border-accent-100 flex items-center justify-center font-bold shadow-2xs group-hover:scale-105 group-hover:bg-accent-500 group-hover:text-white transition-all">
                      <HeaderIcon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${cat.badgeStyle}`}>
                      {cat.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-navy-950 font-[family-name:var(--font-display)]">
                      {cat.category}
                    </h3>
                    <p className="text-[11px] text-gray-500 font-sans mt-1 leading-snug">
                      {cat.description}
                    </p>
                  </div>

                  {/* Technology Items List with Icons */}
                  <div className="space-y-2 pt-1 font-sans">
                    {cat.items.map((item, iIdx) => {
                      const ItemIcon = item.icon
                      return (
                        <div
                          key={iIdx}
                          className="p-2.5 bg-gray-50 hover:bg-accent-50/60 rounded-xl border border-gray-100 flex items-center justify-between transition-colors group/item"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-white text-navy-800 flex items-center justify-center border border-gray-200 shrink-0 group-hover/item:text-accent-600">
                              <ItemIcon className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-gray-900 group-hover/item:text-accent-600 transition-colors leading-tight">
                                {item.name}
                              </p>
                              <p className="text-[9px] text-gray-500 leading-none mt-0.5">{item.detail}</p>
                            </div>
                          </div>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 font-sans text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Conexión 100% Cifrada & Certificada</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
