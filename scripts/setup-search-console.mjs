#!/usr/bin/env node

/**
 * ==============================================================================
 * Creati.mx - Google Search Console & Bing Webmaster Tools Automation CLI Suite
 * ==============================================================================
 * Flujos guiados e independientes por buscador (Google, Bing, IndexNow)
 * Soporta opciones directas 1.1, 1.2, 1.3 o navegacion paso a paso.
 * ==============================================================================
 */

import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import readline from 'node:readline'
import os from 'node:os'

const PROD_DOMAIN = 'https://creati.mx'
const PROD_SITEMAP = `${PROD_DOMAIN}/sitemap.xml`
const SSH_USER = 'u583627395'
const SSH_HOST = 'creati.mx'
const SSH_PORT = 65002
const REMOTE_PATH = '/home/u583627395/domains/creati.mx/public_html'
const KEY_PATH = path.join(os.homedir(), '.ssh', 'id_rsa_abogalia')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question = (query) => new Promise((resolve) => rl.question(query, resolve))

function printHeader() {
  console.log(`\x1b[36m================================================================================\x1b[0m`)
  console.log(`\x1b[36m  \x1b[1m\x1b[35mCREATI.MX\x1b[0m - \x1b[33mGoogle Search Console & Bing Webmaster Setup Suite\x1b[0m            \x1b[36m\x1b[0m`)
  console.log(`\x1b[36m================================================================================\x1b[0m\n`)
}

// 1.1 Flujo Google Search Console
async function handleGoogleSetup() {
  console.log(`\n\x1b[35m================================================================================\x1b[0m`)
  console.log(`\x1b[1m\x1b[35m[1.1] SETUP GOOGLE SEARCH CONSOLE\x1b[0m`)
  console.log(`\x1b[35m================================================================================\x1b[0m`)
  console.log(`URL de propiedad a registrar en GSC: \x1b[36m${PROD_DOMAIN}\x1b[0m (Prefijo de la URL)`)
  console.log(`URL del Sitemap: \x1b[36m${PROD_SITEMAP}\x1b[0m\n`)

  console.log(`Metodos de Verificacion Disponibles:`)
  console.log(`  a) Archivo HTML de Google (ej: google7a5c4b467ad8b1c3.html)`)
  console.log(`  b) Etiqueta Meta HTML (<meta name="google-site-verification" ... />)`)
  console.log(`  c) Ya verifique en Google, solo registrar/verificar Sitemap en vivo`)
  console.log(`  d) Regresar\n`)

  const opt = await question('Elige una opcion [a/b/c/d]: ')

  if (opt.trim().toLowerCase() === 'a') {
    let fileName = await question(`Ingresa el nombre del archivo (ej. google7a5c4b467ad8b1c3.html): `)
    fileName = fileName.trim()
    if (!fileName.endsWith('.html')) {
      fileName += '.html'
      console.log(`-> Se anadio automaticamente la extension: \x1b[33m${fileName}\x1b[0m`)
    }

    let defaultContent = `google-site-verification: ${fileName}`
    const fileContent = await question(`Contenido del archivo (Presiona ENTER para usar por defecto: "${defaultContent}"): `)
    const finalContent = fileContent.trim() || defaultContent

    const localPublicPath = path.resolve('public', fileName)
    const outPath = path.resolve('out', fileName)

    fs.writeFileSync(localPublicPath, finalContent, 'utf8')
    if (fs.existsSync('out')) fs.writeFileSync(outPath, finalContent, 'utf8')

    console.log(`\n[*] Desplegando archivo a Hostinger via SSH...`)
    try {
      const scpCmd = `scp -P ${SSH_PORT} -i "${KEY_PATH}" -o StrictHostKeyChecking=no "${localPublicPath}" "${SSH_USER}@${SSH_HOST}:${REMOTE_PATH}/${fileName}"`
      execSync(scpCmd, { stdio: 'inherit' })
      execSync(`ssh -p ${SSH_PORT} -i "${KEY_PATH}" -o StrictHostKeyChecking=no "${SSH_USER}@${SSH_HOST}" "chmod 644 ${REMOTE_PATH}/${fileName}"`, { stdio: 'ignore' })
      console.log(`\x1b[32m[OK] Archivo disponible en vivo: ${PROD_DOMAIN}/${fileName}\x1b[0m`)
      console.log(`-> Ahora ve a Google Search Console y haz clic en "VERIFICAR".`)
    } catch (e) {
      console.log(`\x1b[31m[-] Error subiendo archivo: ${e.message}\x1b[0m`)
    }
  } else if (opt.trim().toLowerCase() === 'b') {
    await handleMetaTagVerification()
  } else if (opt.trim().toLowerCase() === 'c') {
    console.log(`\n\x1b[32m[OK] Propiedad en Google Search Console lista.\x1b[0m`)
    console.log(`En Google Search Console -> Sitemaps:`)
    console.log(`Escribe exactamente: \x1b[36msitemap.xml\x1b[0m y presiona "Enviar".`)
    console.log(`Comprueba en navegador: \x1b[36m${PROD_SITEMAP}\x1b[0m`)
  }
}

// 1.2 Flujo Bing Webmaster Tools
async function handleBingSetup() {
  console.log(`\n\x1b[34m================================================================================\x1b[0m`)
  console.log(`\x1b[1m\x1b[34m[1.2] SETUP BING WEBMASTER TOOLS\x1b[0m`)
  console.log(`\x1b[34m================================================================================\x1b[0m`)
  console.log(`1. Ingresa a: https://www.bing.com/webmasters`)
  console.log(`2. Opcion Instantanea Recomendada: "Importar desde Google Search Console"`)
  console.log(`   (Valida creati.mx y copia el sitemap en 1 clic sin subir nada).\n`)
  console.log(`Si prefieres validacion manual con archivo BingSiteAuth.xml:`)

  const opt = await question('Deseas subir archivo BingSiteAuth.xml ahora? [s/n]: ')
  if (opt.trim().toLowerCase() === 's') {
    const fileName = 'BingSiteAuth.xml'
    const fileContent = await question(`Pega el contenido XML completo de BingSiteAuth.xml: `)
    if (fileContent.trim()) {
      const localPath = path.resolve('public', fileName)
      const outPath = path.resolve('out', fileName)
      fs.writeFileSync(localPath, fileContent.trim(), 'utf8')
      if (fs.existsSync('out')) fs.writeFileSync(outPath, fileContent.trim(), 'utf8')

      console.log(`[*] Subiendo ${fileName} a Hostinger...`)
      try {
        const scpCmd = `scp -P ${SSH_PORT} -i "${KEY_PATH}" -o StrictHostKeyChecking=no "${localPath}" "${SSH_USER}@${SSH_HOST}:${REMOTE_PATH}/${fileName}"`
        execSync(scpCmd, { stdio: 'inherit' })
        execSync(`ssh -p ${SSH_PORT} -i "${KEY_PATH}" -o StrictHostKeyChecking=no "${SSH_USER}@${SSH_HOST}" "chmod 644 ${REMOTE_PATH}/${fileName}"`, { stdio: 'ignore' })
        console.log(`\x1b[32m[OK] Archivo disponible en: ${PROD_DOMAIN}/${fileName}\x1b[0m`)
        console.log(`-> Ahora puedes hacer clic en "Verificar" en Bing Webmaster Tools.`)
      } catch (e) {
        console.log(`\x1b[31m[-] Error subiendo a Hostinger: ${e.message}\x1b[0m`)
      }
    }
  } else {
    console.log(`-> Usa la opcion "Importar desde GSC" en Bing y registra el sitemap: ${PROD_SITEMAP}`)
  }
}

// 1.3 Flujo IndexNow & Notificaciones Push
async function handleIndexNowPush() {
  console.log(`\n\x1b[33m================================================================================\x1b[0m`)
  console.log(`\x1b[1m\x1b[33m[1.3] PUSH INDEXNOW (BING, YANDEX, SEZNAM Y NAAVER)\x1b[0m`)
  console.log(`\x1b[33m================================================================================\x1b[0m`)
  console.log(`IndexNow es la API moderna oficial que reemplazo a los endpoints legacy /ping de Google y Bing.`)
  console.log(`Notificando lote completo de URLs indexables en tiempo real...\n`)

  try {
    const indexNowScript = path.resolve('scripts/ping-indexnow.js')
    if (fs.existsSync(indexNowScript)) {
      execSync(`node "${indexNowScript}"`, { stdio: 'inherit' })
    }
  } catch (err) {
    console.log(`\x1b[31m[-] Error en IndexNow: ${err.message}\x1b[0m`)
  }
}

async function handleMetaTagVerification() {
  console.log(`\n\x1b[34m[Verificacion por Etiqueta Meta HTML]\x1b[0m`)
  console.log(`Ejemplo: <meta name="google-site-verification" content="XYZ123..." />`)
  
  const tagOrCode = await question(`Pega el valor de content o la etiqueta completa: `)
  let code = tagOrCode.trim()
  
  const match = code.match(/content=["']([^"']+)["']/)
  if (match) code = match[1]

  if (!code) {
    console.log(`\x1b[31m[-] Codigo no valido.\x1b[0m`)
    return
  }

  console.log(`[*] Actualizando configuracion de metadata en src/lib/metadata.ts...`)
  const metadataFile = path.resolve('src/lib/metadata.ts')
  let content = fs.readFileSync(metadataFile, 'utf8')

  if (content.includes('google:')) {
    content = content.replace(/google:\s*['"][^'"]*['"]/, `google: '${code}'`)
  } else {
    content = content.replace(
      'robots: {',
      `verification: {\n    google: '${code}',\n  },\n  robots: {`
    )
  }

  fs.writeFileSync(metadataFile, content, 'utf8')
  console.log(`\x1b[32m[OK] Metadata actualizada con verification tag: ${code}\x1b[0m`)
  console.log(`[*] Para reflejarlo en produccion ejecuta: powershell -File deploy.ps1`)
}

async function main() {
  printHeader()
  console.log(`1. Flujos por Buscador:`)
  console.log(`   1.1 Google Search Console (Archivo HTML, Meta-tag, Sitemaps)`)
  console.log(`   1.2 Bing Webmaster Tools (Import GSC o BingSiteAuth.xml)`)
  console.log(`   1.3 IndexNow Push (Bing, Yandex y redes federadas)`)
  console.log(`2. Validar Estado de Produccion Completo (validate-production.ps1)`)
  console.log(`3. Desplegar Cambios a Produccion (deploy.ps1)`)
  console.log(`4. Salir\n`)

  const choice = await question('Selecciona una opcion (ej. 1.1, 1.2, 1.3 o 1-4): ')
  const clean = choice.trim()

  switch (clean) {
    case '1.1':
      await handleGoogleSetup()
      break
    case '1.2':
      await handleBingSetup()
      break
    case '1.3':
      await handleIndexNowPush()
      break
    case '1':
      console.log('\n[1] Seleccionaste menu de buscadores:')
      console.log('    1.1 Google Search Console')
      console.log('    1.2 Bing Webmaster Tools')
      console.log('    1.3 IndexNow Push')
      const sub = await question('\nElige 1.1, 1.2 o 1.3: ')
      if (sub.trim() === '1.1') await handleGoogleSetup()
      else if (sub.trim() === '1.2') await handleBingSetup()
      else if (sub.trim() === '1.3') await handleIndexNowPush()
      else console.log('Opcion no valida.')
      break
    case '2':
      console.log('\n[*] Ejecutando suite de validacion...')
      execSync(`powershell -ExecutionPolicy Bypass -File scripts/validate-production.ps1`, { stdio: 'inherit' })
      break
    case '3':
      console.log('\n[*] Ejecutando despliegue...')
      execSync(`powershell -ExecutionPolicy Bypass -File deploy.ps1`, { stdio: 'inherit' })
      break
    case '4':
      console.log('Hasta pronto.')
      break
    default:
      console.log('Opcion no valida.')
      break
  }

  rl.close()
}

main()