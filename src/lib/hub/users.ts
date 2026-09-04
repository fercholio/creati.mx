import { HubUser } from './types'

export const defaultUsers: (HubUser & { passwordHash: string })[] = [
  {
    id: 'usr_superadmin',
    name: 'Super Admin',
    email: 'admin@creati.mx',
    passwordHash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', // 'admin123'
    role: 'SUPER_ADMIN',
    avatarColor: 'from-amber-500 to-amber-700',
    active: true,
    createdAt: '2026-09-04',
  },
  {
    id: 'usr_dev_lead',
    name: 'Lead Developer',
    email: 'dev@creati.mx',
    passwordHash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', // 'admin123'
    role: 'DEVELOPER',
    avatarColor: 'from-sky-500 to-sky-700',
    active: true,
    createdAt: '2026-09-04',
  },
  {
    id: 'usr_pm_lead',
    name: 'Lead Product Manager',
    email: 'pm@creati.mx',
    passwordHash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', // 'admin123'
    role: 'PRODUCT_MANAGER',
    avatarColor: 'from-emerald-500 to-emerald-700',
    active: true,
    createdAt: '2026-09-04',
  },
  {
    id: 'usr_sales_lead',
    name: 'Sales & Growth Director',
    email: 'ventas@creati.mx',
    passwordHash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', // 'admin123'
    role: 'SALES_MARKETING',
    avatarColor: 'from-purple-500 to-purple-700',
    active: true,
    createdAt: '2026-09-04',
  },
]