import { RoleDefinition, PermissionKey } from './types'

export const AVAILABLE_PERMISSIONS: { key: PermissionKey; label: string; description: string; category: string }[] = [
  {
    key: 'docs:read',
    label: 'Lectura de Documentos',
    description: 'Permite explorar y leer documentos de los proyectos asignados.',
    category: 'Documentación'
  },
  {
    key: 'docs:edit',
    label: 'Edición y Actualización',
    description: 'Permite modificar el contenido de las especificaciones y guardar nuevas versiones.',
    category: 'Documentación'
  },
  {
    key: 'docs:create',
    label: 'Creación de Páginas',
    description: 'Permite crear nuevos documentos o blueprints en los proyectos.',
    category: 'Documentación'
  },
  {
    key: 'docs:delete',
    label: 'Eliminación y Archivado',
    description: 'Permite eliminar o archivar documentos existentes.',
    category: 'Documentación'
  },
  {
    key: 'secrets:view_unmasked',
    label: 'Ver Secretos Técnicos y Legales',
    description: 'Permite desofuscar claves, URLs de bases de datos y cláusulas legales confidenciales.',
    category: 'Seguridad'
  },
  {
    key: 'audit:view_logs',
    label: 'Consultar Auditoría e Historial',
    description: 'Permite ver la línea de tiempo completa de quién modificó cada documento y restaurar versiones.',
    category: 'Auditoría'
  },
  {
    key: 'admin:manage_users',
    label: 'Administrar Usuarios',
    description: 'Permite invitar nuevos colaboradores, suspender cuentas y asignar roles.',
    category: 'Administración'
  },
  {
    key: 'admin:manage_roles',
    label: 'Administrar Roles y Matriz IAM',
    description: 'Permite crear roles personalizados y ajustar permisos específicos por usuario.',
    category: 'Administración'
  },
]

export const DEFAULT_ROLES: RoleDefinition[] = [
  {
    id: 'SUPER_ADMIN',
    name: 'Super Administrador',
    description: 'Acceso total y control irrestricto de la plataforma, roles, usuarios y secretos.',
    color: 'from-amber-500 to-amber-700',
    permissions: [
      'docs:read',
      'docs:edit',
      'docs:create',
      'docs:delete',
      'secrets:view_unmasked',
      'audit:view_logs',
      'admin:manage_users',
      'admin:manage_roles',
    ],
  },
  {
    id: 'DEVELOPER',
    name: 'Lead Developer / Ingeniero',
    description: 'Acceso a arquitectura, esquemas de bases de datos, APIs y edición técnica.',
    color: 'from-sky-500 to-sky-700',
    permissions: [
      'docs:read',
      'docs:edit',
      'docs:create',
      'secrets:view_unmasked',
      'audit:view_logs',
    ],
  },
  {
    id: 'PRODUCT_MANAGER',
    name: 'Product Manager (PM)',
    description: 'Gestión de requerimientos funcionales, roadmaps, edición de PRDs y auditoría.',
    color: 'from-emerald-500 to-emerald-700',
    permissions: [
      'docs:read',
      'docs:edit',
      'docs:create',
      'audit:view_logs',
    ],
  },
  {
    id: 'SALES_MARKETING',
    name: 'Director Comercial & Marketing',
    description: 'Consulta de pricing, planes de suscripción, material de ventas y calculadoras.',
    color: 'from-purple-500 to-purple-700',
    permissions: [
      'docs:read',
      'audit:view_logs',
    ],
  },
]
