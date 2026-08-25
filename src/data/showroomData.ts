export interface ShowroomApp {
  id: 'livu' | 'hrtci' | 'estateflow' | 'kavita' | 'routeops' | 'medikcore' | 'loyaltypulse' | 'credifast'
  title: string
  badge: string
  iconName: string
  industry: string
  targetRegion: string
  tagline: string
  painPoint: string
  solutionOverview: string
  metrics: {
    label: string
    value: string
    detail: string
  }[]
  roles: {
    id: string
    label: string
    badge: string
    description: string
  }[]
  pitchGuide: {
    pain: string
    valueProp: string
    closingQuestion: string
  }
  whatsappMessage: string
  isFeatured?: boolean
}

export const SHOWROOM_APPS: ShowroomApp[] = [
  {
    id: 'livu',
    title: 'LIVU',
    badge: 'Proptech & Condominios',
    iconName: 'ShieldCheck',
    industry: 'Privadas Residenciales, Condominios & Torres',
    targetRegion: 'Mérida Norte, Riviera Maya, Querétaro & CDMX',
    tagline: 'Plataforma integral para residenciales: control de accesos con QR dinámico en caseta, cobro de cuotas y app móvil para residentes.',
    painPoint: 'Filas interminables en caseta de acceso por registros manuales en libretas, morosidad de hasta 45% en cuotas de mantenimiento y falta de transparencia financiera con vecinos.',
    solutionOverview: 'Ecosistema móvil (.NET MAUI + Laravel API): invitaciones con QR dinámico inviolable para visitas, bitácora digital en caseta con escáner, cobro automatizado de mantenimiento vía SPEI/Stripe con recibos fiscales y marketplace de servicios del hogar.',
    isFeatured: true,
    metrics: [
      { label: 'Tiempo en Caseta', value: '< 6 seg', detail: 'Acceso exprés con escáner de QR dinámico' },
      { label: 'Reducción de Morosidad', value: '-85%', detail: 'Cobro y recordatorios automáticos por WhatsApp/SPEI' },
      { label: 'Ecosistema', value: 'Web + App', detail: 'App para condóminos y terminal para guardias' },
    ],
    roles: [
      {
        id: 'resident',
        label: 'Residente / Condómino',
        badge: 'Vista Residente',
        description: 'Genera pases QR para visitas, paga cuota de mantenimiento y reserva amenidades.',
      },
      {
        id: 'guard',
        label: 'Guardia en Caseta de Acceso',
        badge: 'Vista Caseta',
        description: 'Escanea códigos QR de visitas, valida placas y autoriza apertura de pluma.',
      },
      {
        id: 'admin',
        label: 'Mesa Directiva / Administrador',
        badge: 'Vista Admin',
        description: 'Supervisa finanzas condominales, recaudación, morosos y bitácora de seguridad.',
      },
    ],
    pitchGuide: {
      pain: '"¿Cuánto tiempo pierden sus visitas y proveedores esperando en la caseta de acceso, y cuántos vecinos tienen atrasos en sus cuotas de mantenimiento?"',
      valueProp: '"LIVU digitaliza el acceso en 6 segundos con QR y automatiza la cobranza condominal, brindando plusvalía inmediata y seguridad total a la privada."',
      closingQuestion: '"¿Cuántas casas, departamentos o lotes integran su privada para prepararles una demostración con la mesa directiva?"',
    },
    whatsappMessage: 'Hola Creati, me interesa implementar la plataforma LIVU en nuestra privada o condominio.',
  },
  {
    id: 'hrtci',
    title: 'HR-TCI / Tempus',
    badge: 'SaaS B2B & Rentabilidad',
    iconName: 'Clock',
    industry: 'Empresas de Servicios, Consultoría, Agencias & Tech',
    targetRegion: 'Mérida, Sureste, CDMX, Bajío & LATAM',
    tagline: 'Time & Cost Intelligence: control de horas, costeo por proyecto y AI Coach para maximizar la rentabilidad operativa.',
    painPoint: 'Empresas de servicios pierden hasta el 25% de margen por proyectos mal cotizados, fuga de horas no facturables y falta de visibilidad en el costo real por colaborador.',
    solutionOverview: 'Plataforma dual (Vue.js 3 SPA + Laravel 11 Backend): tracking de tiempo por proyecto/tarea, costeo horario real (salario + carga social), AI Productivity Coach con Groq AI y flujo de aprobación semanal de timesheets.',
    isFeatured: true,
    metrics: [
      { label: 'Margen de Proyecto', value: '+30%', detail: 'Costeo horario real y prevención de desvíos' },
      { label: 'Horas Facturables', value: '+18 hrs/mes', detail: 'Recuperación de micro-actividades no registradas' },
      { label: 'Inteligencia Artificial', value: 'Groq AI', detail: 'Auditoría automática de productividad y burnout' },
    ],
    roles: [
      {
        id: 'collaborator',
        label: 'Colaborador / Consultor',
        badge: 'Vista Equipo',
        description: 'Cronómetro en vivo, registro de tareas por cliente y recomendaciones del AI Coach.',
      },
      {
        id: 'manager',
        label: 'Project Manager / Gerente',
        badge: 'Vista PM',
        description: 'Aprobación de timesheets semanales, control de presupuesto consumido y horas extra.',
      },
      {
        id: 'cfo',
        label: 'Director / CFO',
        badge: 'Vista Dirección',
        description: 'Margen de rentabilidad por cliente, costo/hora real y facturación de servicios.',
      },
    ],
    pitchGuide: {
      pain: '"¿Saben con exactitud qué proyectos o clientes les están dejando dinero real y cuáles les están costando más horas de las presupuestadas?"',
      valueProp: '"HR-TCI cruza el tiempo de su equipo con los costos de nómina e inteligencia artificial para garantizar que cada hora trabajada sea rentable."',
      closingQuestion: '"¿Cuántos colaboradores integran su equipo para configurarles una prueba piloto de rentabilidad?"',
    },
    whatsappMessage: 'Hola Creati, queremos mejorar la rentabilidad de nuestros proyectos con HR-TCI / Tempus.',
  },
  {
    id: 'estateflow',
    title: 'EstateFlow',
    badge: 'Inmobiliario & Lotes',
    iconName: 'Building2',
    industry: 'Desarrollo Inmobiliario & Residencial',
    targetRegion: 'Mérida, Yucatán, Riviera Maya & Querétaro',
    tagline: 'Portal comercial de lotes y departamentos con cotizador inteligente y apartado digital en vivo.',
    painPoint: 'Desarrolladoras y master brokers pierden hasta 40% de prospectos por cotizaciones manuales lentas y falta de actualización del inventario de lotes.',
    solutionOverview: 'Mapa interactivo de lotes en tiempo real, cálculo paramétrico de enganche y mensualidades (MSI), apartado bancario en 3 clics y portal para brokers con cálculo de comisiones.',
    metrics: [
      { label: 'Tiempo de Cotización', value: 'Instantáneo', detail: 'De 2 horas a 10 segundos por cliente' },
      { label: 'Tasa de Conversión', value: '+38%', detail: 'Más cierres con corridas financieras en vivo' },
      { label: 'Apartados Digitales', value: '24/7', detail: 'Pagos con Stripe/SPEI directo a fiduciario' },
    ],
    roles: [
      {
        id: 'buyer',
        label: 'Inversionista / Comprador',
        badge: 'Vista Cliente',
        description: 'Explora el masterplan, selecciona lotes, calcula su financiamiento y genera corrida en PDF.',
      },
      {
        id: 'admin',
        label: 'Director Comercial / Master Broker',
        badge: 'Vista Gerente',
        description: 'Supervisa el mapa de calor de ventas, inventario en tiempo real, cobros y comisiones de brokers.',
      },
    ],
    pitchGuide: {
      pain: '"¿Cuánto tiempo tarda su equipo de ventas en enviarle una corrida financiera actualizada a un inversionista que visita el desarrollo el fin de semana?"',
      valueProp: '"Con EstateFlow su asesor entrega la corrida personalizada en el iPad antes de que el cliente se baje del carrito de golf, permitiendo apartar el lote al momento."',
      closingQuestion: '"¿Cuántos lotes o unidades tienen en su desarrollo actual para configurarles una prueba piloto?"',
    },
    whatsappMessage: 'Hola Creati, me interesa una solución como EstateFlow para desarrollos inmobiliarios.',
  },
  {
    id: 'kavita',
    title: 'Kavita Concierge',
    badge: 'Hotelería & Experiencias',
    iconName: 'Palmtree',
    industry: 'Hoteles Boutique, Resorts & Glampings',
    targetRegion: 'Mérida Colonial, Tulum, Holbox, San Miguel & Oaxaca',
    tagline: 'Experiencia integral de huéspedes con room service, reserva de experiencias y llave digital sin fricción.',
    painPoint: 'Los hoteles boutique pierden hasta el 30% de ingresos en alimentos, bebidas y tours porque los huéspedes no usan teléfonos de habitación ni descargan apps pesadas.',
    solutionOverview: 'Web app progresiva (PWA) accesible por QR o enlace directo: pedidos a cocina con 1 tap, reserva de masajes mayas o tours a cenotes, y despacho automático a recepción.',
    metrics: [
      { label: 'Ticket Promedio por Huésped', value: '+24%', detail: 'Incremento de consumo de amenidades y room service' },
      { label: 'Calificación en Reseñas', value: '4.9 ★', detail: 'Respuesta inmediata a solicitudes de huéspedes' },
      { label: 'Sin Descarga', value: '100% Web', detail: 'Funciona al instante escaneando el QR de la habitación' },
    ],
    roles: [
      {
        id: 'guest',
        label: 'Huésped en Suite',
        badge: 'Vista Huésped',
        description: 'Ordena room service, reserva spa/tours y solicita toallas o late check-out desde su celular.',
      },
      {
        id: 'staff',
        label: 'Concierge & Cocina',
        badge: 'Vista Operativa',
        description: 'Tablero Kanban de comandas y solicitudes en tiempo real con tiempos de entrega auditados.',
      },
    ],
    pitchGuide: {
      pain: '"¿Qué porcentaje de sus huéspedes no consume en su restaurante o spa porque prefieren pedir por apps externas?"',
      valueProp: '"Kavita convierte cada habitación en un punto de venta interactivo que incrementa la derrama directa en el hotel sin saturar la recepción."',
      closingQuestion: '"¿Les gustaría ver cómo se vería el menú y las amenidades de su hotel en nuestra plataforma?"',
    },
    whatsappMessage: 'Hola Creati, me interesa la solución Kavita Concierge para nuestro hotel boutique.',
  },
  {
    id: 'routeops',
    title: 'RouteOps',
    badge: 'Logística & Distribución',
    iconName: 'Truck',
    industry: 'CEDIS, Transporte & Cadena de Suministro',
    targetRegion: 'Hub Progreso, Mérida, Cancún, Tabasco & Bajío',
    tagline: 'Torre de control logística con monitoreo de flotas, sensores de cadena de frío y firma de entrega digital.',
    painPoint: 'Falta de visibilidad de rutas en tiempo real, pérdidas por variación térmica en perecederos y reportes manuales en papel con firmas que se extravían.',
    solutionOverview: 'Panel de despacho y telemetría en vivo, trazabilidad de temperatura en tiempo real, optimización de paradas y comprobante de entrega digital (POD) con foto y firma.',
    metrics: [
      { label: 'Reducción de Merma Térmica', value: '-85%', detail: 'Alertas tempranas de temperatura en cabina fría' },
      { label: 'Ahorro de Combustible', value: '18%', detail: 'Rutas optimizadas con menor kilometraje ocioso' },
      { label: 'Validación de Entrega', value: 'Tiempo Real', detail: 'Firma y foto respaldadas en la nube al instante' },
    ],
    roles: [
      {
        id: 'dispatcher',
        label: 'Torre de Control / Despachador',
        badge: 'Vista Gerencial',
        description: 'Supervisa el mapa de ruta regional, estados de carga, alertas de temperatura y retrasos.',
      },
      {
        id: 'driver',
        label: 'Operador / Chofer en Ruta',
        badge: 'Vista Chofer',
        description: 'Gestiona la lista de entregas, captura firma de cliente y registra incidencias con foto.',
      },
    ],
    pitchGuide: {
      pain: '"¿Qué pasa cuando un cliente importante reclama que su mercancía llegó tarde o que la cadena de frío se rompió en el trayecto Mérida-Cancún?"',
      valueProp: '"RouteOps le da a su empresa una torre de control en tiempo real con evidencias fotográficas y telemetría inviolable que protege sus contratos."',
      closingQuestion: '"¿Cuántas unidades activas tiene su flota actualmente para modelarles el ahorro operativo?"',
    },
    whatsappMessage: 'Hola Creati, queremos optimizar nuestra flota y logística con RouteOps.',
  },
  {
    id: 'medikcore',
    title: 'MedikCore',
    badge: 'Salud & Clínicas',
    iconName: 'Stethoscope',
    industry: 'Clínicas Especializadas, Médicos & Turismo de Salud',
    targetRegion: 'Hub Médico Mérida, CDMX, Guadalajara & Monterrey',
    tagline: 'Expediente clínico digital, agenda multiespecialidad con recordatorios inteligentes y cobro automatizado.',
    painPoint: 'Hasta un 35% de inasistencia a consultas médicas, expedientes físicos desactualizados y pérdida de tiempo en facturación y seguimiento de tratamientos.',
    solutionOverview: 'Expediente electrónico NOM-024, recetas digitales con código de barras, confirmaciones automatizadas por WhatsApp y portal de autoservicio del paciente.',
    metrics: [
      { label: 'Disminución de Ausentismo', value: '-60%', detail: 'Confirmaciones y cobro de anticipos por WhatsApp' },
      { label: 'Tiempo por Consulta', value: '+30% Efic.', detail: 'Captura rápida con plantillas clínicas por especialidad' },
      { label: 'Expediente 100% Digital', value: 'NOM-024', detail: 'Cumplimiento normativo y seguridad de datos' },
    ],
    roles: [
      {
        id: 'doctor',
        label: 'Médico Especialista',
        badge: 'Vista Doctor',
        description: 'Revisa historial clínico, evoluciones previas, emite receta digital y analiza laboratorios.',
      },
      {
        id: 'patient',
        label: 'Paciente / Familiar',
        badge: 'Vista Paciente',
        description: 'Agenda cita, recibe recordatorios por WhatsApp y descarga sus recetas y órdenes de estudio.',
      },
    ],
    pitchGuide: {
      pain: '"¿Cuántas citas vacías tienen a la semana por pacientes que olvidan su consulta o cancelan de último minuto?"',
      valueProp: '"MedikCore automatiza el recordatorio y confirmación por WhatsApp, además de profesionalizar la imagen de la clínica con recetas digitales y portal propio."',
      closingQuestion: '"¿Cuántos consultorios o especialistas integran su clínica para presentarles la propuesta de implementación?"',
    },
    whatsappMessage: 'Hola Creati, me gustaría conocer más sobre MedikCore para nuestra clínica.',
  },
  {
    id: 'loyaltypulse',
    title: 'LoyaltyPulse',
    badge: 'Retail & Gastronomía',
    iconName: 'ShoppingBag',
    industry: 'Cadenas de Restaurantes, Cafeterías & Retail',
    targetRegion: 'Yucatán, Quintana Roo, Puebla & Centro',
    tagline: 'Programa de lealtad en Apple/Google Wallet con pedidos en mesa y campañas de cashback automatizadas.',
    painPoint: 'Negocios gastan fortunas en redes sociales pero no conocen a sus clientes recurrentes ni tienen un canal directo para que vuelvan entre semana.',
    solutionOverview: 'Pase digital directo a Apple Wallet / Google Pay con código QR dinámico, acumulación de sellos/puntos, y notificaciones push geo-referenciadas en días de baja afluencia.',
    metrics: [
      { label: 'Frecuencia de Visitas', value: '+42%', detail: 'Incentivo directo con sellos digitales y recompensas' },
      { label: 'Retención de Clientes', value: '3.2x', detail: 'Campañas automatizadas de cumpleaños y días flojos' },
      { label: 'Instalación Inmediata', value: 'Apple Wallet', detail: 'Sin descargar apps: se guarda en la cartera del móvil' },
    ],
    roles: [
      {
        id: 'customer',
        label: 'Cliente Frecuente',
        badge: 'Vista Cliente',
        description: 'Pase digital en Apple Wallet con saldo de puntos, nivel VIP y cupones exclusivos.',
      },
      {
        id: 'manager',
        label: 'Gerente de Sucursal / POS',
        badge: 'Vista Sucursal',
        description: 'Escáner de código QR en caja, canje de recompensas y lanzamiento de promociones relámpago.',
      },
    ],
    pitchGuide: {
      pain: '"¿Qué porcentaje de sus clientes de fin de semana regresa durante los martes o miércoles?"',
      valueProp: '"LoyaltyPulse vive en la cartera de su cliente (Apple Wallet), permitiendo enviar una notificación directa con promoción 2x1 exactamente cuando las mesas están vacías."',
      closingQuestion: '"¿Tienen sucursales o franquicias donde podamos arrancar un programa piloto de 30 días?"',
    },
    whatsappMessage: 'Hola Creati, queremos implementar LoyaltyPulse para nuestro negocio/restaurante.',
  },
  {
    id: 'credifast',
    title: 'CrediFast',
    badge: 'Fintech & SOFOMes',
    iconName: 'Coins',
    industry: 'Financieras, Crédito Empresarial & Factoraje',
    targetRegion: 'Centro de México, Bajío & Sureste',
    tagline: 'Plataforma de originación de crédito con scoring paramétrico, validación biométrica y firma en minutos.',
    painPoint: 'Tiempos de evaluación de semanas debido a expedientes físicos, cotejo manual con el SAT y alto riesgo de fraude por falta de biometría.',
    solutionOverview: 'Simulador paramétrico de crédito, extracción automática de CIEC/SAT, score de riesgo automatizado y generación de pagaré digital con firma electrónica avanzada.',
    metrics: [
      { label: 'Tiempo de Aprobación', value: '< 15 min', detail: 'Evaluación algorítmica de buró y estados de cuenta' },
      { label: 'Tasa de Morosidad', value: '-22%', detail: 'Mejor selección de perfiles con scoring de IA' },
      { label: 'Originación 100% Remota', value: 'Sin Papel', detail: 'Firma electrónica con validez legal NOM-151' },
    ],
    roles: [
      {
        id: 'borrower',
        label: 'Empresario Solicitante',
        badge: 'Vista Solicitante',
        description: 'Simula el monto, calcula amortización, sube constancia fiscal y firma contrato digital.',
      },
      {
        id: 'underwriter',
        label: 'Analista de Riesgo / Mesa de Control',
        badge: 'Vista Analista',
        description: 'Revisa dictamen automatizado, score financiero, capacidad de pago y autoriza desembolso.',
      },
    ],
    pitchGuide: {
      pain: '"¿Cuántos prospectos calificados se van con la competencia porque su proceso de aprobación tarda más de 5 días?"',
      valueProp: '"CrediFast reduce el tiempo de originación a minutos con validaciones automatizadas, dándole a su SOFOM la velocidad de una fintech de Silicon Valley."',
      closingQuestion: '"¿Qué tipos de crédito o factoraje les gustaría automatizar primero en su financiera?"',
    },
    whatsappMessage: 'Hola Creati, nos interesa modernizar la originación de crédito con CrediFast.',
  },
]
