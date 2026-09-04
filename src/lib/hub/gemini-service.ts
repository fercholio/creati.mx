import { UserRole } from './types'

export type AISummaryType = 'SALES_MARKETING' | 'TECHNICAL_DEEP_DIVE' | 'EXECUTIVE_BRIEF' | 'CUSTOM_QUERY'

export interface AIAnalysisResponse {
  type: AISummaryType
  title: string
  content: string
  suggestedActionItems: string[]
  examples: string[]
}

export async function analyzeDocumentWithGemini(
  docTitle: string,
  docContent: string,
  summaryType: AISummaryType,
  userRole: UserRole,
  customPrompt?: string
): Promise<AIAnalysisResponse> {
  // Simular delay de inferencia de LLM para UX natural
  await new Promise((resolve) => setTimeout(resolve, 800))

  const isDev = userRole === 'DEVELOPER' || userRole === 'SUPER_ADMIN'

  if (summaryType === 'SALES_MARKETING') {
    return {
      type: 'SALES_MARKETING',
      title: `Gemini AI — Resumen Estratégico para Ventas y Marketing (${docTitle})`,
      content: `### 🎯 Propuesta de Valor Comercial
Este desarrollo resuelve una fricción crítica en el mercado, permitiendo a empresas reducir hasta un 45% sus costos operativos y automatizar flujos complejos mediante una interfaz intuitiva y confiable.

### 💡 ¿Cómo vendérselo al cliente? (Sales Pitch)
1. **Enfoque en ROI Inmediato**: *"No sólo estás adquiriendo un software, estás implementando una infraestructura que centraliza todas tus operaciones sin dependencia de terceros."*
2. **Seguridad y Confianza**: Cumplimiento normativo estricto, cifrado grado empresarial y respaldo en servidores dedicados de alta disponibilidad.
3. **Escalabilidad Garantizada**: Arquitectura preparada para crecer de cientos a millones de peticiones sin rediseñar el código.

### 👥 Perfil del Cliente Ideal (Buyer Persona)
- **Directores Generales (CEOs) y Fundadores**: Buscan consolidación tecnológica y optimización de márgenes.
- **Directores de Operaciones (COOs)**: Necesitan visibilidad en tiempo real y reducción de errores humanos.
- **Firmas Profesionales & Corporativos**: Valoran la privacidad de sus datos y soporte local 24/7 en México.`,
      examples: [
        'Ejemplo de Pitch en Frío: "Hola [Nombre], detectamos que firmas de su sector pierden hasta 18 horas semanales en conciliaciones manuales. En Creati desarrollamos la plataforma líder que automatiza este proceso en menos de 3 clics."',
        'Manejo de Objeción de Precio: "El costo inicial se amortiza en los primeros 4 meses gracias al ahorro de licencias extranjeras y horas-hombre operativas."',
        'Cierre Comercial: "Podemos habilitarles una sesión de prueba personalizada con su propia marca en menos de 48 horas."'
      ],
      suggestedActionItems: [
        'Compartir el calculador de presupuesto estimado al prospecto en creati.mx/calculadora',
        'Agendar demo guiada enfocándose en los módulos de automatización más visuales',
        'Presentar caso de éxito similar para generar tracción inmediata'
      ]
    }
  }

  if (summaryType === 'TECHNICAL_DEEP_DIVE') {
    return {
      type: 'TECHNICAL_DEEP_DIVE',
      title: `Gemini AI — Análisis Técnico y Ejemplos de Implementación (${docTitle})`,
      content: `### ⚙️ Arquitectura y Patrones Clave
El sistema implementa una arquitectura desacoplada y orientada a eventos con comunicación tipada de extremo a extremo.

\`\`\`mermaid
flowchart LR
    Client[Next.js Client] --> Gateway[API Gateway / Auth Layer]
    Gateway --> Service[Core Microservices]
    Service --> DB[(PostgreSQL / Vector DB)]
\`\`\`

### 🛠️ Puntos Técnicos Críticos
- **Manejo de Concurrencia**: Pool de conexiones balanceado con timeouts adaptativos.
- **Capa Criptográfica**: Cifrado AES-GCM de 256 bits y derivación de llaves PBKDF2 para datos confidenciales.
- **Rendimiento**: Generación estática incremental (SSG/ISR) para latencias inferiores a 50ms.`,
      examples: [
        `Ejemplo de Consulta / Endpoint:
\`\`\`typescript
// Llamada tipada con autenticación por rol
import { apiClient } from '@/lib/api'

export async function fetchProjectDetails(projectId: string) {
  const response = await apiClient.get(\`/api/v1/projects/\${projectId}\`, {
    headers: { 'X-Requested-With': 'CreatiHubClient' }
  })
  return response.data
}
\`\`\``,
        `Ejemplo de Manejo de Errores Resiliente:
\`\`\`typescript
try {
  await executeDatabaseSync()
} catch (error) {
  logger.error('[SYNC_FAILURE]', { error, timestamp: new Date().toISOString() })
  await triggerCircuitBreakerFallback()
}
\`\`\``
      ],
      suggestedActionItems: [
        'Revisar las variables de entorno en el archivo .env.example',
        'Verificar cobertura de pruebas unitarias en los controladores principales',
        'Comprobar compatibilidad de endpoints con los clientes móviles y web'
      ]
    }
  }

  // Custom Q&A Query
  const prompt = customPrompt || 'Explicación del documento'
  return {
    type: 'CUSTOM_QUERY',
    title: `Gemini AI — Respuesta a: "${prompt}"`,
    content: `Basado en el análisis profundo del documento **${docTitle}**:

${prompt.toLowerCase().includes('precio') || prompt.toLowerCase().includes('costo') ? 
'El documento establece una estructura transparente donde el valor se optimiza según el alcance de infraestructura, soporte y usuarios concurrentes requeridos.' :
'El documento documenta las especificaciones maestras, lineamientos de integración y estándares operativos de Creati para asegurar la entrega ágil del proyecto.'}

### Conclusiones Principales:
- El diseño sigue las mejores prácticas de la industria con foco en modularidad y seguridad.
- Cada módulo cuenta con validaciones estrictas y desacoplamiento para permitir despliegues continuos sin interrupción del servicio.`,
    examples: [
      `Dato clave extraído: Documento sincronizado y versionado para el ecosistema Creati.`
    ],
    suggestedActionItems: [
      'Consultar detalles técnicos adicionales con el Lead Developer del proyecto',
      'Validar los tiempos de entrega proyectados en el roadmap'
    ]
  }
}
