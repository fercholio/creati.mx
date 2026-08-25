'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Stethoscope, Calendar, FileText, Pill, CheckCircle2, QrCode, MessageSquare, Download, Clock, User } from 'lucide-react'

export function MedikCoreSandbox({ role }: { role: string }) {
  const [prescriptionSent, setPrescriptionSent] = useState(false)
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)
  const [medsList, setMedsList] = useState<string[]>([
    'Losartán 50mg - 1 tableta cada 24 hrs por 30 días',
    'Atorvastatina 20mg - 1 tableta por la noche',
  ])
  const [newMed, setNewMed] = useState('')

  const triggerNotification = (msg: string) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 3500)
  }

  const handleAddMed = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMed.trim()) return
    setMedsList([...medsList, newMed.trim()])
    setNewMed('')
    triggerNotification('Medicamento añadido a la receta digital.')
  }

  const handleSendPrescription = () => {
    setPrescriptionSent(true)
    triggerNotification('Receta digital firmada con sello criptográfico y enviada por WhatsApp al paciente.')
  }

  if (role === 'patient') {
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
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Patient Upcoming Appointment */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] bg-accent-50 text-accent-700 font-semibold px-2 py-0.5 rounded-full">Próxima Consulta</span>
                <span className="text-xs text-emerald-600 font-bold">Confirmada</span>
              </div>
              <h4 className="text-sm font-bold text-gray-900">Dr. Alejandro Patrón · Traumatología</h4>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-accent-500" /> Jueves 27 de Agosto · 11:30 AM
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Torre Médica Altabrisa, Consultorio 402, Mérida</p>

              <div className="mt-4 p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs">
                <p className="font-semibold text-navy-800 mb-1">Simulación de Recordatorio WhatsApp:</p>
                <p className="text-gray-600 text-[11px]">
                  "Hola Jorge, te recordamos tu cita mañana a las 11:30 AM con el Dr. Patrón. Responde 1 para confirmar."
                </p>
                <button
                  onClick={() => {
                    setAppointmentConfirmed(true)
                    triggerNotification('Confirmación enviada vía WhatsApp a la clínica.')
                  }}
                  className={`mt-2 w-full py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    appointmentConfirmed
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 inline mr-1" />
                  {appointmentConfirmed ? '✓ Cita Re-confirmada por WhatsApp' : 'Simular Respuesta "1 - Confirmar"'}
                </button>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-400">Expediente #CLIN-9481</span>
              <span className="font-medium text-accent-600">Ver Indicaciones</span>
            </div>
          </div>

          {/* Past Prescriptions & Studies */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-accent-500" />
                Mis Recetas y Estudios Digitales
              </h4>
              <div className="space-y-2.5">
                {[
                  { name: 'Receta Digital #RX-3091', date: '15 Ago 2026', doctor: 'Dr. Alejandro Patrón', type: 'Receta con QR' },
                  { name: 'Química Sanguínea 24 Elementos', date: '10 Ago 2026', doctor: 'Laboratorio Biomédico Mérida', type: 'PDF' },
                  { name: 'Radiografía Lumbar Digital', date: '02 Ago 2026', doctor: 'Imagenología Star Médica', type: 'DICOM/PDF' },
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-gray-50 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-gray-800">{item.name}</p>
                      <p className="text-[10px] text-gray-400">{item.date} · {item.doctor}</p>
                    </div>
                    <button
                      onClick={() => triggerNotification(`Descargando documento ${item.name}...`)}
                      className="p-1.5 bg-white hover:bg-accent-50 text-accent-600 border border-gray-200 rounded-lg cursor-pointer transition-colors"
                      title="Descargar"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[10px] text-gray-400 mt-3 text-center">
              Acceso seguro cifrado de extremo a extremo conforme a la NOM-024.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Doctor View
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
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Patient Active Consultation (5 cols) */}
        <div className="lg:col-span-5 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center gap-3 pb-3 mb-3 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-accent-100 text-accent-700 flex items-center justify-center font-bold text-sm">
              JP
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Don Jorge Pech Herrera</h4>
              <p className="text-[11px] text-gray-400">62 años · Masculino · Exp. #M-8821</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-gray-50 p-2.5 rounded-xl">
              <span className="text-[10px] text-gray-400 font-semibold uppercase">Signos Vitales Hoy</span>
              <div className="grid grid-cols-3 gap-2 mt-1 font-bold text-gray-800 text-xs">
                <div>PA: <span className="text-emerald-600 font-normal">120/80</span></div>
                <div>FC: <span className="text-emerald-600 font-normal">72 lpm</span></div>
                <div>Gluc: <span className="text-emerald-600 font-normal">96 mg</span></div>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-gray-400 font-semibold uppercase">Diagnóstico Clínico</span>
              <p className="font-semibold text-gray-800 mt-0.5">Hipertensión Arterial Grado 1 (Controlada)</p>
            </div>

            <div>
              <span className="text-[10px] text-gray-400 font-semibold uppercase">Alergias</span>
              <span className="inline-block ml-2 text-[10px] bg-red-50 text-red-700 font-bold px-2 py-0.5 rounded">
                Penicilina
              </span>
            </div>
          </div>
        </div>

        {/* Right: Digital Prescription Generator (7 cols) */}
        <div className="lg:col-span-7 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-100">
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <Pill className="w-4 h-4 text-accent-500" />
                Receta Digital & Indicaciones
              </h4>
              <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Cédula Prof. 8492019</span>
            </div>

            {/* Prescribed List */}
            <div className="space-y-2 mb-3">
              {medsList.map((med, idx) => (
                <div key={idx} className="p-2 bg-gray-50 rounded-lg text-xs flex items-center justify-between">
                  <span className="text-gray-800 font-medium">{med}</span>
                  <span className="text-[10px] text-accent-600 font-semibold">Activo</span>
                </div>
              ))}
            </div>

            {/* Add Med Form */}
            <form onSubmit={handleAddMed} className="flex gap-2 mb-3">
              <input
                type="text"
                value={newMed}
                onChange={(e) => setNewMed(e.target.value)}
                placeholder="Ej. Paracetamol 500mg cada 8 hrs..."
                className="flex-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-accent-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
              >
                + Agregar
              </button>
            </form>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
            <button
              onClick={handleSendPrescription}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                prescriptionSent
                  ? 'bg-emerald-600 text-white'
                  : 'bg-accent-500 hover:bg-accent-600 text-white shadow-sm'
              }`}
            >
              <QrCode className="w-4 h-4" />
              {prescriptionSent ? '✓ Receta con QR Firmada y Enviada' : 'Firmar y Enviar Receta Digital por WhatsApp'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

