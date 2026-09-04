# Guia de Inscripcion en Motores de Busqueda: Google Search Console, Bing y Yandex para Creati.mx

Esta guia documenta el flujo paso a paso para vincular https://creati.mx con Google Search Console y Bing Webmaster Tools, garantizando que el nuevo cluster de servicios y paginas estaticas se indexen de inmediato.

---

## 1. Asistente Rapido por CLI (Recomendado)

Igual que en el ecosistema Brokar, dispones de una herramienta automatizada:

```powershell
# En PowerShell:
powershell -File C:\dev\creati.mx\setup-search-console.ps1

# O haz doble clic en:
C:\dev\creati.mx\setup-search-console.bat
```

### Opciones del Asistente:
1. **[1] Inyectar y Desplegar Archivo HTML de Verificacion:**
   - Te solicita el nombre del archivo descargado de Google o Bing (ej. `googlea1b2c3d4e5f6.html` o `BingSiteAuth.xml`) y su contenido.
   - Lo guarda localmente y lo sube en **3 segundos a Hostinger** via SSH nativo, dejandolo listo para presionar *Verificar*.
2. **[2] Configurar Etiqueta Meta de Verificacion:**
   - Si prefieres usar la etiqueta `<meta name="google-site-verification" content="..." />`, la inyecta automaticamente en `src/lib/metadata.ts`.
3. **[3] Enviar Pings Inmediatos:**
   - Notifica a `https://www.google.com/ping?sitemap=...` y ejecuta el protocolo **IndexNow** con respuesta `HTTP 202 Accepted`.

---

## 2. Paso a Paso en Google Search Console

1. Ingresa a: [Google Search Console](https://search.google.com/search-console).
2. En la barra superior de seleccion de propiedades, haz clic en **+ Anadir propiedad**.
3. Selecciona la opcion **"Prefijo de la URL"** (mas rapida y sin tocar DNS) e ingresa:
   ```text
   https://creati.mx
   ```
4. Elige el metodo de verificacion:
   - **Opcion Recomendada (Archivo HTML):**
     1. Descarga el archivo que te ofrece Google (ej. `google1a2b3c4d5e.html`).
     2. Ejecuta `setup-search-console.bat` y elige la opcion `[1]`.
     3. Pega el nombre del archivo y su contenido cuando te lo solicite.
     4. En Search Console, haz clic en **Verificar**. Quedara verificado de inmediato.
   - **Opcion Alternativa (Etiqueta HTML):**
     1. Copia el codigo `content="valor_aqui"`.
     2. Ejecuta `setup-search-console.bat` y elige la opcion `[2]`.
     3. Corre `powershell -File deploy.ps1` para republicar y haz clic en **Verificar**.
5. **Enviar el Sitemap:**
   - En el menu lateral izquierdo de Search Console, haz clic en **Sitemaps**.
   - En el campo "Anadir un sitemap nuevo", escribe:
     ```text
     sitemap.xml
     ```
   - Haz clic en **Enviar**. Google comenzara a indexar las 13 URLs prerenderizadas del sitio.

---

## 3. Paso a Paso en Bing Webmaster Tools

1. Ingresa a: [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Haz clic en **Anadir un sitio**.
3. **Metodo instantaneo (Importar de Google Search Console):**
   - Si ya verificaste en Google Search Console, haz clic en **Importar desde GSC**. Bing validara la propiedad de forma inmediata en 1 clic sin subir ningun archivo adicional.
4. **Metodo Manual (Archivo XML de Bing):**
   - Si prefieres validarlo directamente en Bing, selecciona "Anadir manualmente", descarga el archivo `BingSiteAuth.xml`, correlo con `setup-search-console.bat` (opcion `[1]`) y haz clic en **Verificar**.
5. En el menu **Sitemaps** de Bing, registra:
   ```text
   https://creati.mx/sitemap.xml
   ```

---

## 4. Notificaciones Automaticas en Futuros Despliegues

Cada vez que agregues un nuevo servicio, modifiques el blog o actualices el portal, simplemente ejecuta:

```powershell
powershell -File C:\dev\creati.mx\deploy.ps1
```

Este script ejecuta automaticamente:
1. Recompilacion estatica de las 13 paginas en 1.3s.
2. Empaquetado y subida a Hostinger sin interrumpir sub-aplicaciones.
3. Notificacion instantanea via **IndexNow** hacia Microsoft Bing, Yandex y redes federadas con respuesta **HTTP 202 Accepted**.