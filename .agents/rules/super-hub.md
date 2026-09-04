# 👑 REGLA DE ORO: ARQUITECTURA, UX Y CALIDAD SUPER-CONFLUENCE PARA CREATI HUB

> **MANDATO SUPREMO PARA TODOS LOS AGENTES DE IA (Antigravity, Cursor, Claude Code, Copilot):**
> Toda interacción, cambio de interfaz, refactorización o adición a `creati.mx/hub` debe cumplir estrictamente con los 5 Principios de Oro de Experiencia de Usuario, Estándares de Código y Verificación Automatizada Sin Browser.

---

### 1. PRINCIPIO DE EXPERIENCIA VISUAL Y MICRO-INTERACCIONES (SUPER-CONFLUENCE UX)
- **Cero Caracteres Rotos / Cero Emojis Crudos en Controles Críticos:** Toda iconografía de navegación o acción DEBE usar componentes vectoriales SVG limpios (ej. `lucide-react`). Nunca inyectar caracteres Unicode crudos propensos a corrupción de encoding en botones interactivos.
- **Micro-Animaciones y Resonancia Háptica/Visual:** Toda transición de colapso, tabs o botones debe contar con `transition-all duration-200`, estados hover contrastados, bordes sutiles (`border-slate-200 dark:border-slate-800`), sombras suaves (`shadow-xs` / `shadow-sm`) y feedback visual al clic (`active:scale-95`).
- **Atajos de Teclado Universales:** 
  - `[` : Alternar colapso de la barra lateral izquierda.
  - `/` : Enfocar el buscador instantáneo del árbol de documentos.
  - `Ctrl + K` / `Cmd + K` : Abrir el buscador Spotlight global con vista previa.
  - `Esc` : Cerrar modales, asistentes o limpiar filtros activos.
- **Sticky Table of Contents (Outline Flotante):** En documentos de más de 300 palabras, debe existir un mini-mapa o tabla de navegación a la derecha que resalte dinámicamente la sección activa mediante `IntersectionObserver`.

---

### 2. ARQUITECTURA DE CONTENIDO Y DIAGRAMACIÓN VIVA
- **Diagramas Mermaid con Interacción de Grado Enterprise:** Cualquier bloque ````mermaid```` no solo debe renderizarse limpiamente: debe incluir controles de Zoom (+ / - / Reset), pantalla completa (Fullscreen Modal), y copiar código fuente.
- **Capa de Seguridad RBAC y Data-Masking:** Las credenciales, URLs privadas, tokens JWT o cadenas de conexión en el visor deben poder ofuscarse o mostrarse mediante el toggle de máscara (`Shield` / `EyeOff`), respetando la jerarquía de roles (`DEVELOPER`, `PRODUCT_MANAGER`, `SALES_MARKETING`, `SUPER_ADMIN`).
- **Control de Versiones y Auditoría Imborrable:** Cada cambio debe generar un snapshot de versión (`vYYMMDD.HHMMSS`) con metadatos del autor, fecha ISO y resumen del cambio para permitir comparativas (Diffs) y reversiones en 1 clic.

---

### 3. SINCRONIZACIÓN MULTI-REPOSITORIO B2B CONTINUA
- Todo agente que programe un cambio estructural, endpoint o funcionalidad en un repositorio satélite (`abogalia`, `medical`, `brokar`) está obligado a:
  1. Documentarlo en `/docs/*.md`.
  2. Ejecutar de forma autónoma: `node scripts/sync-to-hub.js`.
  3. Validar el HTTP 200 y el número de versión retornado por el ingestion endpoint.

---

### 4. PROTOCOLO DE TESTING ESTRICTO (PROHIBIDO USO DE BROWSER INTERACTIVO)
- **Cero Dependencia de Browser Agents:** No utilices `browser_subagent` ni herramientas de interacción manual de navegador para probar flujos; son propensos a timeouts, saturación de tokens y latencias innecesarias.
- **Validación por Automatización Pura:**
  1. **Tipado y Compilación Estática:** Ejecuta `npm run build` o `npx tsc --noEmit` para verificar 100% de coherencia en tipos de TypeScript y sintaxis JSX.
  2. **Tests Unitarios y de Integración Headless:** Crea y corre suites de verificación con Node.js / Vitest / Jest (ej. `node scripts/test-hub-integrity.js`).
  3. **Verificación de Contratos de API:** Ejecuta requests directos de prueba vía scripts de Node (`http.get`, `https.request`) validando códigos HTTP, payloads JSON e integridad de los datos.

---

### 5. DISCIPLINA DE PERSISTENCIA Y REPOSITORIO
- Nunca dejes scripts temporales huérfanos (`patch.js`, `update.py`, etc.). Límpialos inmediatamente al concluir.
- Todo cambio validado debe ser comiteado con convención semántica (`feat(hub): ...`, `fix(hub): ...`, `perf(hub): ...`) y sincronizado con `origin main`.
