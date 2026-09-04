# Creati.mx — Next.js 16 Enterprise & Instant SEO / AEO Architecture

[![Next.js 16](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![IndexNow](https://img.shields.io/badge/IndexNow-Instant_Indexing-success?style=flat-square)](https://www.indexnow.org/)
[![Schema.org](https://img.shields.io/badge/Schema.org-JSON--LD_Elite-orange?style=flat-square)](https://schema.org/)
[![Website](https://img.shields.io/badge/Official_Website-creati.mx-accent?style=flat-square&logo=google-chrome)](https://creati.mx)

> Repositorio oficial del portal corporativo y suite tecnológica de **[Creati](https://creati.mx)**: Estudio de ingeniería de software a medida, aplicaciones móviles, plataformas SaaS y agentes de Inteligencia Artificial con sede en Mérida, Yucatán, México.

---

## 🌐 Ecosistema de Software y Soluciones

Este proyecto implementa una arquitectura web de ultra-rendimiento con **Next.js 16 (Turbopack)**, optimización para motores de respuesta generativa (AEO/LLMs) y un cluster programático de alta intención transaccional:

* **Sitio Web Oficial:** [https://creati.mx](https://creati.mx)
* **Hub de Capacidades e Ingeniería:** [https://creati.mx/servicios](https://creati.mx/servicios)
* **Calculadora Interactiva de Costo de Software:** [https://creati.mx/calculadora](https://creati.mx/calculadora)
* **Plataforma PropTech Destacada (Brokar):** [https://brokar.com.mx](https://brokar.com.mx)
* **Plataforma LegalTech Destacada (Abogalia):** [https://abogalia.creati.mx](https://abogalia.creati.mx)

---

## 🚀 Pilares de Ingeniería & Posicionamiento Orgánico

### 1. 🤖 AEO (Answer Engine Optimization) & Protocolo `llms.txt`
Optimizada para ser indexada y citada con máxima autoridad por motores de IA conversacional (**ChatGPT Search**, **Perplexity**, **Claude** y **Google Gemini**):
* Archivo de contexto semántico público: [`public/llms.txt`](https://creati.mx/llms.txt)
* Marcado estructurado Schema.org profundo: `Organization`, `ProfessionalService` con geolocalización de precisión (`GeoCoordinates` en Mérida, Yucatán), `BreadcrumbList`, `Service`, `FAQPage` y `WebApplication`.

### 2. ⚡ Protocolo de Notificación Inmediata IndexNow
Notificación en tiempo real de nuevas rutas y actualizaciones hacia Microsoft Bing, Yandex, Seznam y Naver:
* Script automatizado: [`scripts/ping-indexnow.js`](./scripts/ping-indexnow.js)
* Respuesta directa: `HTTP 200 OK` en cada compilación y despliegue.

### 3. 🗺️ Cluster Programático de Servicios (Static Site Generation)
14 rutas pre-renderizadas en milisegundos con cero dependencias de servidor en tiempo de ejecución:
* [Desarrollo de Software a Medida](https://creati.mx/servicios/desarrollo-software-a-medida)
* [Desarrollo de Apps Móviles iOS & Android](https://creati.mx/servicios/desarrollo-aplicaciones-moviles)
* [Diseño UX/UI & Producto Digital](https://creati.mx/servicios/diseno-ux-ui)
* [Inteligencia Artificial Aplicada & Agentes LLM](https://creati.mx/servicios/inteligencia-artificial-aplicada)

---

## 🛠️ Stack Tecnológico

* **Framework:** Next.js 16.1.6 con App Router & Turbopack
* **Lenguaje:** TypeScript 5+
* **Estilos:** Tailwind CSS 3.4 con diseño editorial premium
* **Iconografía:** Lucide React
* **Compilación:** `output: export` (100% estático para máxima seguridad y velocidad Core Web Vitals)
* **Infraestructura:** Hostinger SSH / Nginx / LiteSpeed

---

## 💻 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar producción y generar rutas estáticas SSG
npm run build

# Validar estado del sitio en producción
powershell -File scripts/validate-production.ps1
```

---

## 🤝 Contacto & Colaboraciones

* **Web:** [https://creati.mx](https://creati.mx)
* **Email:** [hola@creati.mx](mailto:hola@creati.mx)
* **Sede:** Mérida, Yucatán, México. Cobertura remota y presencial en México y Estados Unidos.

---
© 2026 [Creati](https://creati.mx). Todos los derechos reservados.