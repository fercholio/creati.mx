'use client'

import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import {
  Globe,
  Smartphone,
  Layers,
  Cpu,
  ShieldAlert,
  Clock,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Info,
  Sliders,
  DollarSign
} from 'lucide-react'

interface Option {
  id: string
  label: string
  desc: string
  weeks: number
  priceMin: number
  priceMax: number
}

const platformOptions: Option[] = [
  { id: 'web', label: 'Plataforma Web SaaS / Dashboard', desc: 'Panel interactivo responsivo, microservicios y bases de datos cloud', weeks: 6, priceMin: 8000, priceMax: 15000 },
  { id: 'mobile', label: 'App Móvil iOS & Android', desc: 'Desarrollo nativo cross-platform con React Native y soporte offline', weeks: 8, priceMin: 11000, priceMax: 19000 },
  { id: 'both', label: 'Suite Integral (Web + App Móvil)', desc: 'Ecosistema sincronizado completo para usuarios finales y administración', weeks: 12, priceMin: 18000, priceMax: 32000 },
]

const stageOptions = [
  { id: 'mvp', label: 'MVP Ágil (Fase 1)', desc: 'Conjunto esencial de funciones para salir a mercado y validar con usuarios reales.', mult: 1.0 },
  { id: 'growth', label: 'Producto Escalable', desc: 'Módulos avanzados de analítica, flujos automatizados y roles diferenciados.', mult: 1.35 },
  { id: 'enterprise', label: 'Arquitectura Enterprise', desc: 'Alta concurrencia, compliance estricto, multi-tenant y auditoría técnica.', mult: 1.8 },
]

const featureOptions = [
  { id: 'ai', label: 'Inteligencia Artificial / Agentes LLM', desc: 'Búsqueda semántica (RAG), asistentes inteligentes o categorización de datos', weeks: 2, cost: 3500 },
  { id: 'payments', label: 'Pasarela de Pagos & Facturación', desc: 'Stripe, Conekta, suscripciones recurrentes y timbrado fiscal CFDI', weeks: 2, cost: 2500 },
  { id: 'hardware', label: 'Biometría & Acceso a Hardware', desc: 'FaceID, geolocalización en background, Bluetooth o escaneo de documentos', weeks: 1.5, cost: 2000 },
  { id: 'thirdparty', label: 'Integración con ERPs / CRMs Legacy', desc: 'Conexión segura bidireccional con sistemas empresariales existentes', weeks: 2, cost: 3000 },
]

export function CalculatorClient() {
  const [platform, setPlatform] = useState<string>('web')
  const [stage, setStage] = useState<string>('mvp')
  const [features, setFeatures] = useState<string[]>([])

  const selectedPlatform = platformOptions.find((p) => p.id === platform) || platformOptions[0]
  const selectedStage = stageOptions.find((s) => s.id === stage) || stageOptions[0]

  const toggleFeature = (id: string) => {
    setFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  // Cálculos base conservadores
  const baseCostMin = selectedPlatform.priceMin * selectedStage.mult
  const baseCostMax = selectedPlatform.priceMax * selectedStage.mult

  const featuresCost = features.reduce((acc, fId) => {
    const feat = featureOptions.find((item) => item.id === fId)
    return acc + (feat ? feat.cost : 0)
  }, 0)

  const featuresWeeks = features.reduce((acc, fId) => {
    const feat = featureOptions.find((item) => item.id === fId)
    return acc + (feat ? feat.weeks : 0)
  }, 0)

  const totalMinUsd = Math.round(baseCostMin + featuresCost)
  const totalMaxUsd = Math.round(baseCostMax + featuresCost * 1.3)
  const totalWeeks = Math.round(selectedPlatform.weeks * (selectedStage.mult > 1 ? 1.25 : 1) + featuresWeeks)

  return (
    <div className="pt-24 pb-20">
      <Container>
        {/* Encabezado */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 text-accent-700 text-xs font-semibold mb-4">
            <Sliders className="w-3.5 h-3.5" />
            Herramienta Interactiva de Estimación Preliminar
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-navy-950 mb-6 font-serif">
            Calculadora de Costo y Tiempos de Software
          </h1>
          <p className="text-base sm:text-lg text-navy-700 leading-relaxed max-w-2xl mx-auto">
            Configura las características de tu proyecto para obtener un rango referencial estimado. Diseñado para ofrecer transparencia técnica inicial a fundadores y directivos.
          </p>
        </div>

        {/* Nota de Enfoque Conservador & Factores Variables */}
        <div className="max-w-4xl mx-auto mb-10 p-5 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-amber-950 flex items-start gap-3 text-xs sm:text-sm">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-1">
              Nota sobre estimaciones y factores de variabilidad técnica:
            </span>
            Los rangos calculados son aproximaciones orientativas del mercado basadas en estándares de código limpio y arquitectura cloud. El presupuesto final se ajusta de forma personalizada en función de variables específicas de cada cliente (complejidad del modelo de datos, volumen de concurrencia esperada, normativas de cumplimiento, estado del backend previo y nivel de soporte post-lanzamiento).
          </div>
        </div>

        {/* Grid Interactivo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Panel Izquierdo: Selección de Parámetros */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Tipo de Plataforma */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-navy-100 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-600 block mb-2">
                Paso 1 de 3
              </span>
              <h2 className="text-xl font-bold text-navy-950 font-serif mb-4">
                ¿Qué tipo de plataforma necesitas?
              </h2>
              <div className="space-y-3">
                {platformOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPlatform(opt.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${
                      platform === opt.id
                        ? 'border-accent-500 bg-accent-50/40 shadow-xs ring-1 ring-accent-500'
                        : 'border-navy-100 hover:border-navy-200 bg-white'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${platform === opt.id ? 'bg-accent-600 text-white' : 'bg-navy-50 text-navy-600'}`}>
                      {opt.id === 'web' && <Globe className="w-5 h-5" />}
                      {opt.id === 'mobile' && <Smartphone className="w-5 h-5" />}
                      {opt.id === 'both' && <Layers className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-900 text-sm">{opt.label}</h3>
                      <p className="text-xs text-navy-600 mt-1 leading-relaxed">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Madurez y Alcance */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-navy-100 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-600 block mb-2">
                Paso 2 de 3
              </span>
              <h2 className="text-xl font-bold text-navy-950 font-serif mb-4">
                Alcance y nivel de madurez inicial
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {stageOptions.map((stg) => (
                  <button
                    key={stg.id}
                    type="button"
                    onClick={() => setStage(stg.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      stage === stg.id
                        ? 'border-accent-500 bg-accent-50/40 ring-1 ring-accent-500'
                        : 'border-navy-100 hover:border-navy-200 bg-white'
                    }`}
                  >
                    <h3 className="font-bold text-navy-900 text-xs sm:text-sm">{stg.label}</h3>
                    <p className="text-[11px] text-navy-600 mt-1 leading-normal">{stg.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Módulos Adicionales */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-navy-100 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-600 block mb-2">
                Paso 3 de 3
              </span>
              <h2 className="text-xl font-bold text-navy-950 font-serif mb-4">
                Módulos y capacidades técnicas avanzadas
              </h2>
              <div className="space-y-3">
                {featureOptions.map((feat) => {
                  const active = features.includes(feat.id)
                  return (
                    <button
                      key={feat.id}
                      type="button"
                      onClick={() => toggleFeature(feat.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                        active
                          ? 'border-accent-500 bg-accent-50/30 ring-1 ring-accent-500'
                          : 'border-navy-100 hover:border-navy-200 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${active ? 'text-accent-600' : 'text-navy-300'}`} />
                        <div>
                          <h3 className="font-bold text-navy-900 text-xs sm:text-sm">{feat.label}</h3>
                          <p className="text-xs text-navy-600 mt-0.5">{feat.desc}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Panel Derecho: Tarjeta de Resumen y Estimación */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              <div className="bg-gradient-to-br from-navy-900 to-navy-950 rounded-3xl p-8 text-white shadow-xl border border-navy-800">
                <div className="flex items-center justify-between pb-6 border-b border-navy-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-accent-400 block">
                      Resultado Referencial
                    </span>
                    <h3 className="text-xl font-bold font-serif text-white">
                      Rango Presupuestario
                    </h3>
                  </div>
                  <DollarSign className="w-8 h-8 text-accent-400" />
                </div>

                <div className="py-6 border-b border-navy-800">
                  <p className="text-xs text-navy-300 mb-1">Inversión Estimada (USD):</p>
                  <div className="text-3xl sm:text-4xl font-extrabold text-accent-300 tracking-tight font-serif">
                    ${totalMinUsd.toLocaleString()} — ${totalMaxUsd.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-navy-400 mt-1 block">
                    *Rango indicativo en USD (o equivalente en MXN) sin IVA.
                  </span>

                  <div className="mt-6 flex items-center gap-3 text-sm text-navy-200">
                    <Clock className="w-5 h-5 text-accent-400 shrink-0" />
                    <span>Tiempo aproximado: <strong>{totalWeeks} a {totalWeeks + 3} semanas</strong> de ingeniería ágil</span>
                  </div>
                </div>

                {/* Resumen de factores */}
                <div className="py-4 space-y-2 text-xs text-navy-300">
                  <div className="flex justify-between">
                    <span>Plataforma:</span>
                    <span className="font-semibold text-white">{selectedPlatform.label.split(' ')[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Etapa:</span>
                    <span className="font-semibold text-white">{selectedStage.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Módulos adicionales:</span>
                    <span className="font-semibold text-white">{features.length} seleccionados</span>
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    href="/contact"
                    size="lg"
                    className="w-full bg-accent-500 hover:bg-accent-400 text-white font-bold"
                  >
                    Solicitar Propuesta y Alcance Real <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Caja de Explicación de Variables que Modifican el Presupuesto */}
              <div className="bg-white p-6 rounded-3xl border border-navy-100 shadow-xs text-xs space-y-3 text-navy-700">
                <h4 className="font-bold text-navy-950 font-serif text-sm flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-accent-600" />
                  ¿Qué variables modifican el presupuesto final?
                </h4>
                <p className="leading-relaxed">
                  Cada empresa opera con requerimientos particulares. Los factores principales que modulan el alcance final son:
                </p>
                <ul className="space-y-1.5 list-disc list-inside text-navy-600">
                  <li><strong>Arquitectura previa:</strong> Si se construye desde cero o se conecta a bases de datos legadas.</li>
                  <li><strong>Seguridad y Compliance:</strong> Requisitos financieros, cifrado bancario o normativas sanitarias.</li>
                  <li><strong>Concurrencia:</strong> Diseño para miles de usuarios simultáneos vs. uso operativo interno.</li>
                  <li><strong>Soporte y SLA:</strong> Cobertura de mantenimiento 24/7 post-lanzamiento.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}