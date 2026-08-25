export interface ShowroomRole {
  id: string
  label: string
  badge: string
  description: string
}

export interface PitchGuide {
  pain: string
  valueProp: string
  closingQuestion: string
}

export interface MetricHighlight {
  label: string
  value: string
  detail: string
}

export interface ShowroomApp {
  id: string
  title: string
  badge: string
  isFeatured?: boolean
  iconName: string
  industry: string
  targetRegion: string
  tagline: string
  painPoint: string
  solutionOverview: string
  metrics: MetricHighlight[]
  roles: ShowroomRole[]
  pitchGuide: PitchGuide
  whatsappMessage: string
}

export const SHOWROOM_APPS: ShowroomApp[] = [
  {
    id: 'novabrain',
    title: 'NovaBrain AI',
    badge: 'IA & Agentes Autónomos',
    isFeatured: true,
    iconName: 'Clock',
    industry: 'Empresas Corporativas, Inmobiliarias & Ventas B2B',
    targetRegion: 'Mérida, Cancún, CDMX & Cobertura Nacional',
    tagline: 'Agente autónomo de IA multimodal que atiende clientes por WhatsApp 24/7, responde cotizaciones y audita contratos en PDF.',
    painPoint: 'Fugas de prospectos nocturnos y de fin de semana por falta de atención inmediata, además de cuellos de botella en la elaboración manual de propuestas y revisión de contratos.',
    solutionOverview: 'Motor de Inteligencia Artificial entrenado con la base de conocimiento de tu empresa que responde con velocidad ultra-rápida (Groq AI 0.38s), emite dictámenes financieros y genera documentos certificados.',
    metrics: [
      { label: 'Tiempo de Respuesta', value: '< 1.5 seg', detail: 'Atención inmediata por WhatsApp y Web sin esperas' },
      { label: 'Disponibilidad Operativa', value: '24 / 7', detail: 'Cero prospectos perdidos fuera de horario de oficina' },
      { label: 'Auditoría de Documentos', value: '100% Auto', detail: 'Lectura OCR de PDF y facturas CFDI en 0.4 segundos' },
    ],
    roles: [
      {
        id: 'chat',
        label: 'Chat de IA & Cotización WhatsApp',
        badge: 'Vista Cliente',
        description: 'Simula preguntas en tiempo real, calcula cotizaciones y genera respuestas de negocio.',
      },
      {
        id: 'ocr',
        label: 'Auditoría OCR de PDF & Facturas',
        badge: 'Vista Documentos',
        description: 'Lee automáticamente contratos en PDF, valida sellos fiscales del SAT y emite dictámenes.',
      },
    ],
    pitchGuide: {
      pain: '"¿Cuántas oportunidades de venta pierden sus asesores por responder mensajes 12 horas después?"',
      valueProp: '"NovaBrain AI atiende de inmediato con el tono experto de su empresa, cotiza en vivo y califica a los prospectos antes de pasarlos a su equipo comercial."',
      closingQuestion: '"¿Qué proceso de atención o revisión de documentos les gustaría automatizar primero con IA?"',
    },
    whatsappMessage: 'Hola Creati, queremos probar NovaBrain AI en nuestra empresa.',
  },
  {
    id: 'livu',
    title: 'LIVU',
    badge: 'Proptech & Condominios',
    isFeatured: true,
    iconName: 'ShieldCheck',
    industry: 'Privadas Residenciales, Desarrollos & Condominios',
    targetRegion: 'Mérida (Temozón, Dzityá, Altabrisa) & Riviera Maya',
    tagline: 'Control de accesos inteligente con QR dinámico inviolable, terminal en caseta LPR y recaudación condominal por SPEI/Stripe con recibo fiscal.',
    painPoint: 'Largas filas en caseta para invitados, cobro manual de mantenimiento con alta morosidad y desconfianza en el manejo de fondos por la mesa directiva.',
    solutionOverview: 'LIVU conecta a residentes, administración y guardias en una plataforma integrada: accesos QR en 6 segundos, cobranza automatizada y transparencia financiera.',
    metrics: [
      { label: 'Ingreso en Caseta', value: '< 6 seg', detail: 'Lectura instantánea de QR sin detener la fila' },
      { label: 'Reducción de Morosidad', value: '-85%', detail: 'Recordatorios automáticos y cobro por SPEI' },
      { label: 'Transparencia Financiera', value: '100%', detail: 'Reportes de ingresos y gastos visibles para condóminos' },
    ],
    roles: [
      {
        id: 'resident',
        label: 'Residente / Vecino',
        badge: 'Vista Residente',
        description: 'Genera pases QR dinámicos para invitados y paga la cuota de mantenimiento con 1 clic por SPEI.',
      },
      {
        id: 'guard',
        label: 'Guardia de Caseta',
        badge: 'Vista Caseta',
        description: 'Escanea códigos QR, valida placas registradas y autoriza apertura de pluma vehicular.',
      },
      {
        id: 'admin',
        label: 'Administrador / Mesa Directiva',
        badge: 'Vista Admin',
        description: 'Monitorea recaudación mensual, morosidad por lote y envía avisos generales a la privada.',
      },
    ],
    pitchGuide: {
      pain: '"¿Cuánto tiempo pierden sus visitas en caseta solicitando identificación física y llamando a los residentes?"',
      valueProp: '"LIVU elimina las filas en caseta con pases QR que expiran automáticamente y automatiza la cobranza de mantenimiento por SPEI sin trabajo manual."',
      closingQuestion: '"¿Cuántas casas o departamentos tiene su privada para presentarles una cotización a la medida?"',
    },
    whatsappMessage: 'Hola Creati, me interesa implementar LIVU en mi privada/condominio.',
  },
  {
    id: 'hrtci',
    title: 'HR-TCI / Tempus',
    badge: 'Time & Cost Intelligence',
    isFeatured: true,
    iconName: 'Clock',
    industry: 'Consultoría, Agencias, Despachos & Software Houses',
    targetRegion: 'Mérida, CDMX, Monterrey & Guadalajara',
    tagline: 'Inteligencia de tiempo y costo horario por proyecto con auditoría de productividad impulsada por Groq AI.',
    painPoint: 'Fugas de rentabilidad en proyectos con precio fijo debido a horas no facturables no registradas y salarios de equipo mal calculados.',
    solutionOverview: 'HR-TCI cruza el tiempo real dedicado por cada colaborador con su costo horario de nómina (salario + cargas sociales) y analiza la eficiencia con IA.',
    metrics: [
      { label: 'Margen por Proyecto', value: '+30%', detail: 'Visibilidad exacta de costo horario vs precio facturado' },
      { label: 'Horas Facturables', value: '+18 hrs/mes', detail: 'Recuperación de tiempo ocioso y reuniones innecesarias' },
      { label: 'Aprobación de Timesheets', value: '1 Tap', detail: 'Flujo ágil de revisión semanal para Project Managers' },
    ],
    roles: [
      {
        id: 'consultant',
        label: 'Consultor / Desarrollador',
        badge: 'Vista Colaborador',
        description: 'Registra tiempo con cronómetro en vivo y recibe recomendaciones de productividad de Groq AI.',
      },
      {
        id: 'manager',
        label: 'Project Manager / Líder',
        badge: 'Vista PM',
        description: 'Revisa y aprueba timesheets semanales, vigila consumo de presupuesto y asignación de equipo.',
      },
      {
        id: 'cfo',
        label: 'CFO / Director de Finanzas',
        badge: 'Vista CFO',
        description: 'Visualiza la matriz de rentabilidad bruta por cliente, costo de nómina por hora y proyección mensual.',
      },
    ],
    pitchGuide: {
      pain: '"¿Saben con precisión de peso por peso si el proyecto que vendieron el mes pasado dejó margen real o perdieron dinero en horas de equipo?"',
      valueProp: '"HR-TCI mide el costo horario exacto de su nómina por proyecto y les avisa con IA antes de que un cliente consuma horas de más."',
      closingQuestion: '"¿Cuántas personas integran su equipo operativo para configurarles una prueba piloto sin costo?"',
    },
    whatsappMessage: 'Hola Creati, queremos evaluar la rentabilidad de nuestro equipo con HR-TCI.',
  },
  {
    id: 'estateflow',
    title: 'EstateFlow',
    badge: 'Masterplan & Lotes',
    iconName: 'Building2',
    industry: 'Desarrolladoras Inmobiliarias & Master Brokers',
    targetRegion: 'Mérida (Temozón, Dzityá), Tulum, Cancún & Querétaro',
    tagline: 'Masterplan interactivo de lotes residenciales con cotizador financiero a 36 MSI y apartado bancario instantáneo.',
    painPoint: 'Vendedores mostrando listas de Excel desactualizadas con lotes duplicados y cotizaciones manuales lentas.',
    solutionOverview: 'Mapa vectorizado interactivo que sincroniza disponibilidad en tiempo real, genera corridas financieras en PDF y permite apartar lotes con Stripe/SPEI.',
    metrics: [
      { label: 'Conversión de Ventas', value: '+38%', detail: 'Experiencia visual inmersiva para el comprador' },
      { label: 'Tiempo de Cotización', value: '10 seg', detail: 'Cálculo instantáneo de enganche, mensualidades y MSI' },
      { label: 'Apartados Digitales', value: 'Tiempo Real', detail: 'Bloqueo inmediato de inventario para evitar duplicidad' },
    ],
    roles: [
      {
        id: 'buyer',
        label: 'Inversionista / Comprador',
        badge: 'Vista Cliente',
        description: 'Explora mapa de lotes, filtra por superficie/precio, calcula mensualidades y aparta online.',
      },
      {
        id: 'manager',
        label: 'Director Comercial / Broker',
        badge: 'Vista Gerente',
        description: 'Gestiona inventario (disponible, apartado, vendido), aprueba descuentos y revisa metas de equipo.',
      },
    ],
    pitchGuide: {
      pain: '"¿Cuántas ventas han perdido porque un asesor tardó 2 horas en enviar una corrida financiera y el cliente se enfrió?"',
      valueProp: '"EstateFlow le permite a sus vendedores cotizar en 10 segundos desde su iPad frente al cliente y apartar el lote en caliente."',
      closingQuestion: '"¿Cuántos desarrollos o etapas tienen activos actualmente para integrarlos al Masterplan?"',
    },
    whatsappMessage: 'Hola Creati, nos interesa implementar EstateFlow para nuestros desarrollos inmobiliarios.',
  },
  {
    id: 'kavita',
    title: 'Kavita Concierge',
    badge: 'Hotelería Boutique',
    iconName: 'Palmtree',
    industry: 'Hoteles Boutique, Villas de Lujo & Glampings',
    targetRegion: 'Mérida Colonial, Tulum, Holbox & Riviera Maya',
    tagline: 'Concierge digital web app (sin descargas) para room service, experiencias gastronómicas y llave NFC.',
    painPoint: 'Llamadas interminables a recepción, pedidos en papel con margen de error y falta de venta cruzada de tours y masajes.',
    solutionOverview: 'Web app con código QR en la suite: el huésped ordena room service de autor, agenda masajes con cobro a su cuenta y abre su puerta con llave digital.',
    metrics: [
      { label: 'Ticket Promedio Extra', value: '+24%', detail: 'Venta impulsiva de room service y tours desde el celular' },
      { label: 'Satisfacción Guest', value: '4.9 ★', detail: 'Atención inmediata sin llamadas ni esperas' },
      { label: 'Descarga de Apps', value: '0 Mb', detail: 'Funciona directo en el navegador escaneando el QR' },
    ],
    roles: [
      {
        id: 'guest',
        label: 'Huésped en Suite',
        badge: 'Vista Huésped',
        description: 'Ordena platillos de autor, solicita toallas extra, agenda tratamientos de spa y usa llave digital.',
      },
      {
        id: 'ops',
        label: 'Operación / Recepción & Cocina',
        badge: 'Vista Hotel',
        description: 'Recibe comandas en tiempo real, asigna solicitudes a camaristas y monitorea tiempos de entrega.',
      },
    ],
    pitchGuide: {
      pain: '"¿Cuántas ventas adicionales de alimentos, bebidas y tours están dejando ir porque el huésped no quiere llamar a recepción?"',
      valueProp: '"Kavita coloca el menú interactivo y catálogo de experiencias de su hotel a un QR de distancia en la mesita de noche."',
      closingQuestion: '"¿Cuántas habitaciones o villas opera su hotel para prepararles una demostración personalizada?"',
    },
    whatsappMessage: 'Hola Creati, queremos elevar la experiencia de nuestros huéspedes con Kavita Concierge.',
  },
  {
    id: 'routeops',
    title: 'RouteOps',
    badge: 'Logística & Frío',
    iconName: 'Truck',
    industry: 'Cadena de Frío, Distribuidoras de Alimentos & CEDIS',
    targetRegion: 'Mérida (Hub Progreso), Cancún, Campeche & Tabasco',
    tagline: 'Telemetría de cadena de frío (-18°C) en tiempo real, optimización de rutas de reparto y firma de entrega digital.',
    painPoint: 'Mermas millonarias por pérdida de temperatura en congelados durante el trayecto y disputas con clientes por horarios de entrega.',
    solutionOverview: 'Sensores IoT inviolables que transmiten la temperatura en ruta cada 30 segundos, alertas preventivas al chofer y prueba de entrega digital certificada.',
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
