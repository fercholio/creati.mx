/**
 * ==============================================================================
 * CREATI KNOWLEDGE HUB — REUSABLE MULTI-REPO SYNC CLI
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const HUB_ENDPOINT = process.env.CREATI_HUB_URL || 'https://creati.mx/api/hub/sync.php';
const HUB_SECRET = process.env.CREATI_HUB_SECRET || 'CREATI_VAULT_B2B_SYNC_KEY_99812_SECURE_ALPHA';

const repoRoot = process.cwd();
let ecosystem = 'creati_core';

const lowerRoot = repoRoot.toLowerCase();
if (lowerRoot.includes('abogalia')) ecosystem = 'abogalia';
else if (lowerRoot.includes('medical')) ecosystem = 'medical';
else if (lowerRoot.includes('brokar')) ecosystem = 'brokar';

console.log(`\n================================================================================`);
console.log(` 🚀 SINCRONIZADOR B2B — CREATI KNOWLEDGE HUB`);
console.log(` Ecosistema detectado: [${ecosystem.toUpperCase()}] | Directorio: ${repoRoot}`);
console.log(`================================================================================\n`);

const docsDir = path.join(repoRoot, 'docs');
if (!fs.existsSync(docsDir)) {
  console.log(`⚠️  No se encontró directorio /docs en ${repoRoot}.`);
  process.exit(0);
}

function syncDocAsync(filePath, changeSummary = 'Actualización automática desde agente') {
  return new Promise((resolve) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const filename = path.basename(filePath, path.extname(filePath));
    const docId = `${ecosystem}-${filename.toLowerCase().replace(/[^a-z0-9_-]/g, '-')}`;

    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : `${ecosystem.toUpperCase()} — ${filename}`;

    const payload = {
      docId,
      ecosystem,
      title,
      category: filename.toLowerCase().includes('api') ? 'api' : filename.toLowerCase().includes('frd') ? 'frd' : 'architecture',
      requiredRole: filename.toLowerCase().includes('sales') ? 'SALES_MARKETING' : 'DEVELOPER',
      author: process.env.AUTHOR_NAME || 'Antigravity AI Agent',
      authorRole: process.env.AUTHOR_ROLE || 'DEVELOPER',
      changeSummary,
      content,
      tags: [ecosystem, 'auto-sync', 'latest-build']
    };

    const dataString = JSON.stringify(payload);
    const urlObj = new URL(HUB_ENDPOINT);

    const req = https.request(
      {
        hostname: urlObj.hostname,
        port: 443,
        path: urlObj.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${HUB_SECRET}`,
          'Content-Length': Buffer.byteLength(dataString)
        }
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            const json = JSON.parse(body.replace(/^\uFEFF/, ''));
            if (json.success) {
              console.log(`✅ [SINCRONIZADO] ${title} (${json.version})`);
            } else {
              console.error(`❌ [ERROR] ${filename}:`, json.error);
            }
          } catch (e) {
            console.log(`⚠️ [RESPUESTA RAW HTTP ${res.statusCode}] en ${filename}`);
          }
          resolve();
        });
      }
    );

    req.on('error', (e) => {
      console.error(`❌ Error de conexión al sincronizar ${filename}:`, e.message);
      resolve();
    });

    req.write(dataString);
    req.end();
  });
}

async function run() {
  const files = fs.readdirSync(docsDir).filter((f) => f.endsWith('.md'));
  console.log(`Encontrados ${files.length} documento(s) en /docs. Transfiriendo en secuencia...\n`);

  for (const file of files) {
    await syncDocAsync(path.join(docsDir, file));
    // Pausa de 300ms entre llamadas para no saturar LiteSpeed
    await new Promise((r) => setTimeout(r, 300));
  }
  console.log(`\n🎉 Sincronización completa de ${ecosystem.toUpperCase()} con Creati Knowledge Hub.`);
}

run();
