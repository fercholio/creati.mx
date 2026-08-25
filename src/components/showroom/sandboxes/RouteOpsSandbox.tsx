'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Truck, Navigation, Thermometer, Fuel, AlertTriangle, CheckCircle, MapPin, Camera, PenTool, ShieldCheck } from 'lucide-react'

export function RouteOpsSandbox({ role }: { role: string }) {
  const [tempAlert, setTempAlert] = useState(false)
  const [signatureSigned, setSignatureSigned] = useState(false)
  const [deliveryCompleted, setDeliveryCompleted] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  const triggerNotification = (msg: string) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 3500)
  }

  const handleSimulateAlert = () => {
    setTempAlert(true)
    triggerNotification('⚠️ ALERTA: Camión #04 registró variación térmica (-12°C). Alerta enviada a cabina.')
    setTimeout(() => setTempAlert(false), 5000)
  }

  const handleCompleteDelivery = () => {
    if (!signatureSigned) {
      triggerNotification('Firma del receptor requerida antes de cerrar la entrega.')
      return
    }
    setDeliveryCompleted(true)
    triggerNotification('✅ Entrega #4209 confirmada con firma digital y geolocalización. Notificación enviada al cliente.')
  }

  if (role === 'driver') {
    return (
      <div className="space-y-4">
        {/* Toast */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2 shadow-sm"
            >
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
            <div>
              <span className="text-[10px] bg-accent-50 text-accent-700 font-semibold px-2 py-0.5 rounded-full">Parada 4 de 6 en Ruta</span>
              <h4 className="text-sm font-bold text-gray-900 mt-1">Hotel Moon Palace · Cancún</h4>
              <p className="text-xs text-gray-400">Entrega de 40 cajas de pescados y mariscos congelados</p>
            </div>
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
              deliveryCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
            }`}>
              {deliveryCompleted ? 'ENTREGADO' : 'EN ANDÉN'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Stop Checklist */}
            <div className="space-y-3">
              <h5 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Detalles del Manifiesto</h5>
              <div className="bg-gray-50 p-3 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Orden de Carga:</span>
                  <span className="font-bold text-gray-800">OC-88392-CUN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Cadena de Frío:</span>
                  <span className="font-bold text-emerald-600">-18.2 °C (Verificado)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Receptor:</span>
                  <span className="font-semibold text-gray-800">Lic. Fernando Canché (Chef Ejecutivo)</span>
                </div>
              </div>

              {/* Photo Evidence Simulation */}
              <div className="p-3 border border-dashed border-gray-300 rounded-xl flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Camera className="w-4 h-4 text-accent-500" />
                  <span>Foto de Carga en Andén: <strong>img_anden_04.jpg</strong></span>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded">Adjunta</span>
              </div>
            </div>

            {/* Right: Digital Signature Box */}
            <div className="space-y-3">
              <h5 className="text-xs font-semibold text-gray-700 uppercase tracking-wider flex items-center justify-between">
                <span>Firma Digital de Recepción</span>
                <span className="text-[10px] text-gray-400 font-normal">Validez NOM-151</span>
              </h5>

              <div
                onClick={() => setSignatureSigned(true)}
                className={`h-28 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
                  signatureSigned
                    ? 'border-emerald-400 bg-emerald-50/30'
                    : 'border-accent-300 bg-accent-50/30 hover:bg-accent-50/60'
                }`}
              >
                {signatureSigned ? (
                  <div className="text-center">
                    <p className="font-serif italic text-xl text-navy-800 font-bold tracking-wider">F. Canché M.</p>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-1 justify-center">
                      <ShieldCheck className="w-3 h-3" /> Firma certificada (24/08/2026 16:56)
                    </span>
                  </div>
                ) : (
                  <div className="text-center text-accent-600">
                    <PenTool className="w-5 h-5 mx-auto mb-1 opacity-70" />
                    <span className="text-xs font-semibold">Toca aquí para firmar digitalmente</span>
                    <p className="text-[10px] text-gray-400">Simulación táctil para cliente en iPad</p>
                  </div>
                )}
              </div>

              <button
                onClick={handleCompleteDelivery}
                disabled={deliveryCompleted}
                className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  deliveryCompleted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-accent-500 hover:bg-accent-600 text-white shadow-sm'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                {deliveryCompleted ? '✓ Manifiesto Cerrado y Sincronizado' : 'Finalizar Entrega y Siguiente Parada'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Dispatcher View (Torre de Control)
  return (
    <div className="space-y-4">
      {/* Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 shadow-sm ${
              tempAlert
                ? 'bg-red-50 border border-red-200 text-red-800'
                : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
            }`}
          >
            <AlertTriangle className={`w-4 h-4 shrink-0 ${tempAlert ? 'text-red-600' : 'text-emerald-600'}`} />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Telemetry Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-[11px] text-gray-500 font-medium">Unidades en Ruta</span>
          <p className="text-xl font-bold text-gray-900 mt-0.5">3 / 3 <span className="text-xs text-emerald-600 font-normal">Activas</span></p>
          <span className="text-[10px] text-gray-400">Progreso - Cancún</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-[11px] text-gray-500 font-medium">Cumplimiento SLA</span>
          <p className="text-xl font-bold text-emerald-600 mt-0.5">98.8%</p>
          <span className="text-[10px] text-gray-400">Paradas a tiempo</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-[11px] text-gray-500 font-medium">Ahorro Diésel</span>
          <p className="text-xl font-bold text-navy-700 mt-0.5">-14.2%</p>
          <span className="text-[10px] text-accent-600">Rutas inteligentes</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] text-gray-500 font-medium">Prueba de Alerta</span>
          <button
            onClick={handleSimulateAlert}
            className="w-full py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded text-[10px] font-bold cursor-pointer transition-colors"
          >
            Simular Alerta Temp.
          </button>
        </div>
      </div>

      {/* Live Fleet Table */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Truck className="w-4 h-4 text-accent-500" />
            Monitoreo en Tiempo Real de Unidades
          </h4>
          <span className="text-xs text-gray-400">Actualización continua GPS</span>
        </div>

        <div className="space-y-2.5">
          {[
            {
              id: 'Unidad #04 (Thermo King)',
              route: 'Puerto Progreso ➔ Cancún Hotel Zone',
              driver: 'Roberto C.',
              temp: tempAlert ? '-12.0 °C ⚠️' : '-18.4 °C',
              tempStatus: tempAlert ? 'warning' : 'ok',
              fuel: '78%',
              speed: '82 km/h',
              eta: '16:45 hrs',
            },
            {
              id: 'Unidad #12 (Carga Seca)',
              route: 'CEDIS Umán ➔ Valladolid ➔ Playa del Carmen',
              driver: 'Mauricio G.',
              temp: 'Ambiente',
              tempStatus: 'ok',
              fuel: '64%',
              speed: '75 km/h',
              eta: '17:15 hrs',
            },
            {
              id: 'Unidad #09 (Urbana)',
              route: 'Mérida Norte Distribución Local',
              driver: 'Alejandro M.',
              temp: 'Refrigerado 4°C',
              tempStatus: 'ok',
              fuel: '91%',
              speed: '38 km/h',
              eta: '16:10 hrs',
            },
          ].map((truck, idx) => (
            <div key={idx} className="p-3 bg-gray-50/80 rounded-xl border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">{truck.id}</span>
                  <span className="text-[10px] bg-gray-200 text-gray-700 px-1.5 py-0.2 rounded font-medium">Chofer: {truck.driver}</span>
                </div>
                <p className="text-gray-500 text-[11px] mt-0.5 flex items-center gap-1">
                  <Navigation className="w-3 h-3 text-accent-500" /> {truck.route}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className={`flex items-center gap-1 px-2 py-0.5 rounded ${
                  truck.tempStatus === 'warning' ? 'bg-red-100 text-red-700 font-bold animate-pulse' : 'text-gray-700'
                }`}>
                  <Thermometer className="w-3.5 h-3.5 text-accent-500" /> {truck.temp}
                </span>
                <span className="flex items-center gap-1 text-gray-600">
                  <Fuel className="w-3.5 h-3.5 text-amber-500" /> {truck.fuel}
                </span>
                <span className="text-navy-700 bg-white border border-gray-200 px-2 py-1 rounded-md font-bold">
                  ETA: {truck.eta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

