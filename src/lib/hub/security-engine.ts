/**
 * ==============================================================================
 * Creati Knowledge Hub — Zero-Trust Cryptographic Engine & Sanitizer
 * ==============================================================================
 * - Encriptación AES-GCM 256-bit por rol
 * - Ofuscación contextual de PII, secretos, tokens, credenciales y cláusulas legales
 * - Derivación de claves PBKDF2
 * ==============================================================================
 */

import { UserRole } from './types'

// Secretos de derivación de rol (en memoria)
const ROLE_SALTS: Record<UserRole, string> = {
  SUPER_ADMIN: 'CREATI_VAULT_SALT_SUPER_ADMIN_9921_XE',
  DEVELOPER: 'CREATI_VAULT_SALT_DEV_CORE_4412_ALPHA',
  PRODUCT_MANAGER: 'CREATI_VAULT_SALT_PM_ROADMAP_7719_BETA',
  SALES_MARKETING: 'CREATI_VAULT_SALT_SALES_COMMERCE_3301_GAMMA',
}

// Derivar clave criptográfica AES-GCM a partir de la identidad del rol y sesión
async function getRoleCryptoKey(role: UserRole): Promise<CryptoKey> {
  const enc = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(ROLE_SALTS[role]),
    'PBKDF2',
    false,
    ['deriveKey']
  )

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: enc.encode('CREATI_ENTERPRISE_STATIC_SALT_2026'),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

// Encriptar bloque de contenido con AES-GCM
export async function encryptForRole(content: string, role: UserRole): Promise<string> {
  const enc = new TextEncoder()
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const key = await getRoleCryptoKey(role)

  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(content)
  )

  const combined = new Uint8Array(iv.length + encrypted.byteLength)
  combined.set(iv)
  combined.set(new Uint8Array(encrypted), iv.length)

  // Retornar en base64
  let binary = ''
  for (let i = 0; i < combined.byteLength; i++) {
    binary += String.fromCharCode(combined[i])
  }
  return btoa(binary)
}

// Desencriptar bloque sólo si el usuario posee el rol adecuado
export async function decryptForRole(ciphertextB64: string, userRole: UserRole, requiredRole: UserRole | 'ALL'): Promise<string | null> {
  if (userRole !== 'SUPER_ADMIN' && requiredRole !== 'ALL' && userRole !== requiredRole) {
    return null // Bloqueo criptográfico inmediato
  }

  try {
    const binary = atob(ciphertextB64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }

    const iv = bytes.slice(0, 12)
    const data = bytes.slice(12)

    // Si es super admin, desencriptar con la clave del rol requerido
    const decryptRole = (userRole === 'SUPER_ADMIN' && requiredRole !== 'ALL') ? requiredRole : userRole
    const key = await getRoleCryptoKey(decryptRole)

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    )

    const dec = new TextDecoder()
    return dec.decode(decrypted)
  } catch (err) {
    return null
  }
}

/**
 * OFUSCADOR CONTEXTUAL DINÁMICO (Data Masking & Redaction Engine)
 * Oculta y ofusca strings sensibles según el rol del observador.
 */
export function obfuscateSensitiveContent(content: string, viewerRole: UserRole): string {
  let masked = content

  // 1. Ofuscación de Secretos Técnicos, Tokens, Keys, SSH, Passwords (Ocultar a no-Devs)
  if (viewerRole !== 'DEVELOPER' && viewerRole !== 'SUPER_ADMIN') {
    // Hashes, API keys, Bearer tokens, Passwords
    masked = masked.replace(/(password|passwd|pwd|secret|api_key|token|auth_key)[\s:="']+[A-Za-z0-9_\-\.]{6,}/gi, '$1: [REDACTED_SECRET_KEY]')
    masked = masked.replace(/Bearer\s+[A-Za-z0-9_\-\.]{15,}/gi, 'Bearer [REDACTED_SECURITY_TOKEN]')
    masked = masked.replace(/ssh-rsa\s+[A-Za-z0-9+/=]{30,}/gi, 'ssh-rsa [REDACTED_PUBLIC_KEY]')
    masked = masked.replace(/id_rsa_[a-z0-9_]+/gi, '[REDACTED_SSH_KEYFILE]')
    masked = masked.replace(/u[0-9]{9}@[0-9\.]+/gi, '[REDACTED_SERVER_ENDPOINT]')
  }

  // 2. Ofuscación de Información Financiera y Estrategias Confidenciales (Ocultar a Devs no autorizados)
  if (viewerRole === 'DEVELOPER') {
    // Si un Dev visualiza docs con márgenes o comisiones financieras exactas, se aplica máscara
    masked = masked.replace(/(\$[0-9,]+\s*USD)[\s\S]*?(comisión|margen|utilidad)/gi, '[REDACTED_FINANCIAL_VALUE] $2')
  }

  // 3. Ofuscación Universal de PII (Cédulas completas, RFCs, Correos personales de prueba)
  masked = masked.replace(/([A-Z]{3,4})[0-9]{6}([A-Z0-9]{3})/g, '$1******$2') // RFC ofuscado
  masked = masked.replace(/(Cédula\s*(?:Profesional|DGP)?[:\s]*)[0-9]{6,10}/gi, '$1[VERIFIED_DGP_MASKED_ID]')

  
  // 4. Ofuscacion Legal y de Litigios (Tribunales, Juzgados, Expedientes y Clausulas)
  if (viewerRole !== 'SUPER_ADMIN') {
    masked = masked.replace(/(Expediente(?:\s+Judicial)?[:\s]*)[0-9]{2,6}\/[0-9]{4}/gi, '$1[EXP_CONFIDENCIAL_PROTEGIDO]')
    masked = masked.replace(/(Juzgado\s+[0-9]+[o|a]?\s+de\s+Distrito)/gi, '[JUZGADO_RESERVADO]')
    masked = masked.replace(/(Clausula\s+Penal[:\s]*)[^\n\.]+/gi, '$1[CLAUSULA_CONFIDENCIAL_RESERVADA]')
  }

  // 5. Ofuscacion de Infraestructura y Redes (IPs privadas, URLs de DB)
  if (viewerRole !== 'DEVELOPER' && viewerRole !== 'SUPER_ADMIN') {
    masked = masked.replace(/postgres(?:ql)?:\/\/[^\s\"\'\`]+/gi, 'postgresql://[PROTECTED_CREDENTIALS]@[PROTECTED_HOST]:5432/[DB_NAME]')
    masked = masked.replace(/mongodb(?:\+srv)?:\/\/[^\s\"\'\`]+/gi, 'mongodb://[PROTECTED_CREDENTIALS]@[PROTECTED_CLUSTER]')
  }

  return masked
}