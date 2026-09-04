const fs = require('fs');
const path = require('path');

const targetDocs = [
  // ABOGALIA
  {
    path: 'C:/dev/abogalia/docs/abogalia_platform_master_blueprint.md',
    ecosystem: 'abogalia',
    category: 'architecture',
    requiredRole: 'DEVELOPER',
    title: 'Abogalia — Blueprint Maestro de Arquitectura y Plataforma',
    summary: 'Arquitectura completa del ecosistema LegalTech: Laravel API, Vue 3, Bóveda Documental Cifrada y Sistema Escrow.',
    tags: ['Architecture', 'Blueprint', 'Security', 'Laravel']
  },
  {
    path: 'C:/dev/abogalia/docs/abogalia_frd_legaltech_v2.md',
    ecosystem: 'abogalia',
    category: 'frd',
    requiredRole: 'PRODUCT_MANAGER',
    title: 'Abogalia — Especificación Funcional LegalTech (FRD v2)',
    summary: 'Requerimientos de producto para directorio de abogados certificados SEP, cotizador notarial y scoring judicial.',
    tags: ['FRD', 'Product', 'LegalTech', 'UserStories']
  },
  {
    path: 'C:/dev/abogalia/docs/SEO_ORGANIC_GROWTH_MANUAL.md',
    ecosystem: 'abogalia',
    category: 'seo_marketing',
    requiredRole: 'SALES_MARKETING',
    title: 'Abogalia — Manual de Estrategia de Crecimiento SEO Orgánico',
    summary: 'Embudo de conversión, arquitectura en silo para búsquedas de abogados por estado/materia y palabras clave transaccionales.',
    tags: ['SEO', 'Marketing', 'Funnels', 'OrganicGrowth']
  },
  {
    path: 'C:/dev/abogalia/docs/DEPLOYMENT_HOSTINGER_GUIDE.md',
    ecosystem: 'abogalia',
    category: 'operations',
    requiredRole: 'DEVELOPER',
    title: 'Abogalia — Guía de Despliegue y Operaciones en Hostinger',
    summary: 'Manual de operaciones DevOps: TAR.GZ con SSH nativo, permisos 755/777 y sincronización de SQLite.',
    tags: ['DevOps', 'Hostinger', 'Runbook']
  },
  {
    path: 'C:/dev/abogalia/docs/SECURITY_DEPLOYMENT_AUDIT_REPORT.md',
    ecosystem: 'abogalia',
    category: 'security',
    requiredRole: 'DEVELOPER',
    title: 'Abogalia — Reporte de Auditoría de Seguridad y Cifrado AES-256',
    summary: 'Protocolos de protección de secreto profesional, encriptación en reposo y cumplimiento LFPDPPP.',
    tags: ['Security', 'AES-256', 'Compliance']
  },

  // BROKAR
  {
    path: 'C:/dev/brokar/docs/brokar_platform_master_blueprint.md',
    ecosystem: 'brokar',
    category: 'architecture',
    requiredRole: 'DEVELOPER',
    title: 'Brokar — Master Blueprint de Arquitectura Real Estate OS',
    summary: 'Arquitectura multitenant para inmobiliarias, CRM Kanban, Red MLS de colaboración y constructor de micrositios.',
    tags: ['Architecture', 'PropTech', 'MLS', 'MultiTenant']
  },
  {
    path: 'C:/dev/brokar/docs/SAAS_GROWTH_SEO_AND_MOBILE_BLUEPRINT.md',
    ecosystem: 'brokar',
    category: 'sales_pricing',
    requiredRole: 'SALES_MARKETING',
    title: 'Brokar — Blueprint de Crecimiento SaaS, Precios y Monetización',
    summary: 'Estrategia comercial de planes (Pro, Elite, Agency), comisiones por referidos y retención de suscriptores.',
    tags: ['Sales', 'Pricing', 'SaaS', 'Monetization']
  },
  {
    path: 'C:/dev/brokar/docs/MANUAL_WEBSITE_BUILDER.md',
    ecosystem: 'brokar',
    category: 'frd',
    requiredRole: 'PRODUCT_MANAGER',
    title: 'Brokar — Manual Funcional del Website Builder para Agencias',
    summary: 'Especificación del constructor no-code de páginas inmobiliarias, bloques modulares y sincronización con dominio propio.',
    tags: ['Product', 'WebsiteBuilder', 'FRD', 'NoCode']
  },
  {
    path: 'C:/dev/brokar/docs/GOOGLE_SEO_GUIDE.md',
    ecosystem: 'brokar',
    category: 'seo_marketing',
    requiredRole: 'SALES_MARKETING',
    title: 'Brokar — Guía de Indexación Masiva en Google Search Console',
    summary: 'Estrategia de indexación relámpago de fichas de propiedades y catálogos de agencias con SEO programático.',
    tags: ['SEO', 'Google', 'SearchConsole', 'Marketplace']
  },
  {
    path: 'C:/dev/brokar/docs/operations/crm-leads-engagement.md',
    ecosystem: 'brokar',
    category: 'operations',
    requiredRole: 'PRODUCT_MANAGER',
    title: 'Brokar — Flujos de Gestión y Engagement de Prospectos (CRM)',
    summary: 'Embudo de atención al comprador, asignación de asesores y trazabilidad de citas en portal inmobiliario.',
    tags: ['CRM', 'Leads', 'Operations', 'Workflows']
  },

  // MEDICAL
  {
    path: 'C:/dev/medical/docs/medical_platform_master_blueprint.md',
    ecosystem: 'medical',
    category: 'architecture',
    requiredRole: 'DEVELOPER',
    title: 'Medical — Master Blueprint de Arquitectura HealthTech & NOM-004',
    summary: 'Plataforma clínica integral: expediente digital médico NOM-004, receta digital QR con sello criptográfico y telemedicina.',
    tags: ['Architecture', 'HealthTech', 'NOM-004', 'COFEPRIS']
  },
  {
    path: 'C:/dev/medical/docs/mkt-sales/01_ESTRATEGIA_PLANES_Y_PRICING_SALES.md',
    ecosystem: 'medical',
    category: 'sales_pricing',
    requiredRole: 'SALES_MARKETING',
    title: 'Medical — Estrategia Comercial de Planes, Pricing y Venta B2B',
    summary: 'Estructura de precios para consultorios independientes y clínicas ($649/mes), comisiones 0% y modelo de adquisición.',
    tags: ['Sales', 'Pricing', 'MedicalB2B', 'Pitch']
  },
  {
    path: 'C:/dev/medical/docs/doctoralia_pain_points_to_medical_features_matrix.md',
    ecosystem: 'medical',
    category: 'frd',
    requiredRole: 'PRODUCT_MANAGER',
    title: 'Medical — Matriz Comparativa de Pain Points vs Doctoralia',
    summary: 'Análisis de producto frente al competidor líder: eliminación de comisiones ocultas, propiedad de datos y receta electrónica.',
    tags: ['Benchmark', 'Product', 'Doctoralia', 'Features']
  },
  {
    path: 'C:/dev/medical/docs/mkt-sales/10_ESTRATEGIA_SEO_ORGANICO_SITIOS_MEDICOS_GOOGLE.md',
    ecosystem: 'medical',
    category: 'seo_marketing',
    requiredRole: 'SALES_MARKETING',
    title: 'Medical — Estrategia de Posicionamiento SEO para Médicos',
    summary: 'Guía de indexación local por especialidad y ciudad (Google Business Profile, Rich Snippets de médicos y citas).',
    tags: ['SEO', 'MedicalSEO', 'LocalSEO', 'GoogleMaps']
  },
  {
    path: 'C:/dev/medical/docs/health_entities_authentication_and_rbac.md',
    ecosystem: 'medical',
    category: 'security',
    requiredRole: 'DEVELOPER',
    title: 'Medical — Autenticación de Entidades Sanitarias y Roles RBAC',
    summary: 'Validación de cédulas profesionales ante DGP/SEP, control de acceso para médicos, recepcionistas y pacientes.',
    tags: ['Security', 'RBAC', 'DGP', 'Authentication']
  },

  // CREATI CORE
  {
    path: 'C:/dev/creati.mx/docs/SEARCH_CONSOLE_SETUP_GUIDE.md',
    ecosystem: 'creati_core',
    category: 'operations',
    requiredRole: 'ALL',
    title: 'Creati Core — Setup y Verificación en Motores de Búsqueda',
    summary: 'Manual de alta en Google Search Console, Bing Webmaster Tools y automatización del protocolo IndexNow.',
    tags: ['Creati', 'SearchConsole', 'IndexNow', 'DevOps']
  }
];

const docsList = [];

for (const item of targetDocs) {
  let rawContent = '';
  if (fs.existsSync(item.path)) {
    rawContent = fs.readFileSync(item.path, 'utf8');
  } else {
    rawContent = `# ${item.title}\n\n${item.summary}\n\nDocumento consolidado en el Knowledge Hub de Creati.`;
  }

  // Normalizar slug
  const id = path.basename(item.path, '.md').toLowerCase().replace(/[^a-z0-9]/g, '-');

  docsList.push({
    id,
    ecosystem: item.ecosystem,
    title: item.title,
    category: item.category,
    requiredRole: item.requiredRole,
    summary: item.summary,
    lastUpdated: '2026-09-04',
    author: 'Equipo de Arquitectura Creati',
    tags: item.tags,
    content: rawContent
  });
}

const finalFileContent = `import { HubDocument } from './types'\n\nexport const initialDocuments: HubDocument[] = ${JSON.stringify(docsList, null, 2)}\n`;

fs.writeFileSync('C:/dev/creati.mx/src/lib/hub/documents.ts', finalFileContent, 'utf8');
console.log(`[Ingesta Exitosa] ${docsList.length} documentos procesados e indexados en src/lib/hub/documents.ts`);