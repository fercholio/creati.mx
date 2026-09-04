export type UserRole = 
  | 'SUPER_ADMIN' 
  | 'DEVELOPER' 
  | 'PRODUCT_MANAGER' 
  | 'SALES_MARKETING'
  | string // Permite roles dinámicos creados por el administrador

export type PermissionKey =
  | 'docs:read'
  | 'docs:edit'
  | 'docs:create'
  | 'docs:delete'
  | 'secrets:view_unmasked'
  | 'admin:manage_users'
  | 'admin:manage_roles'
  | 'audit:view_logs'

export interface RoleDefinition {
  id: string
  name: string
  description: string
  color: string
  permissions: PermissionKey[]
  isCustom?: boolean
}

export interface DocumentVersion {
  versionId: string
  versionNumber: string
  timestamp: string
  authorId: string
  authorName: string
  authorEmail: string
  authorRole: string
  changeSummary: string
  contentSnapshot: string
}

export interface HubUser {
  id: string
  name: string
  email: string
  role: UserRole
  avatarColor: string
  active: boolean
  createdAt: string
  sessionToken?: string
  customPermissions?: PermissionKey[] // Sobrescrituras granulares por usuario
}

export type EcosystemId = 'brokar' | 'abogalia' | 'medical' | 'creati_core'

export interface EncryptedDocumentMeta {
  id: string
  ecosystem: EcosystemId
  title: string
  category: 'architecture' | 'api' | 'security' | 'frd' | 'roadmap' | 'sales_pricing' | 'seo_marketing' | 'operations'
  requiredRole: UserRole | 'ALL'
  summary: string
  lastUpdated: string
  author: string
  tags: string[]
  isRestricted?: boolean
  lastModifiedBy?: {
    name: string
    email: string
    role: string
    timestamp: string
  }
  versions?: DocumentVersion[]
}

export interface HubDocument extends EncryptedDocumentMeta {
  content: string
}
