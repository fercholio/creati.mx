const https = require('https');

const host = 'creati.mx';
const key = 'creati-indexnow-key-2026';
const keyLocation = `https://${host}/${key}.txt`;

const services = [
  'desarrollo-software-a-medida',
  'desarrollo-aplicaciones-moviles',
  'diseno-ux-ui',
  'inteligencia-artificial-aplicada',
];

const urlList = [
  `https://${host}/`,
  `https://${host}/servicios`,
  `https://${host}/about`,
  `https://${host}/contact`,
  ...services.map((s) => `https://${host}/servicios/${s}`),
];

const payload = JSON.stringify({
  host,
  key,
  keyLocation,
  urlList,
});

console.log(`[IndexNow] Notificando ${urlList.length} URLs de Creati.mx a Bing, Yandex y buscadores participantes...`);

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/IndexNow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload),
  },
};

const req = https.request(options, (res) => {
  console.log(`[IndexNow] Respuesta del servidor: HTTP ${res.statusCode} ${res.statusMessage}`);
  res.on('data', (d) => process.stdout.write(d));
  res.on('end', () => console.log('\n[IndexNow] Proceso finalizado exitosamente.'));
});

req.on('error', (e) => {
  console.error(`[IndexNow Error] ${e.message}`);
});

req.write(payload);
req.end();