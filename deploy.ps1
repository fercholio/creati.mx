[CmdletBinding()]
param (
    [string]$SshHost = "creati.mx",
    [string]$SshUser = "u583627395",
    [int]$SshPort = 65002,
    [string]$RemoteRoot = "/home/u583627395/domains/creati.mx/public_html",
    [switch]$SkipBuild,
    [switch]$SkipIndexNow
)

$ErrorActionPreference = "Stop"

Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host "  CREATI.MX - DESPLIEGUE A PRODUCCION (HOSTINGER NATIVO TAR.GZ + SSH)" -ForegroundColor Cyan
Write-Host "================================================================================" -ForegroundColor Cyan

$baseDir = "C:\dev\creati.mx"
$keyPath = "$env:USERPROFILE\.ssh\id_rsa_abogalia"

if (-not (Test-Path $keyPath)) {
    throw "Llave SSH no encontrada en: $keyPath"
}

# 1. Compilación de Producción
if (-not $SkipBuild) {
    Write-Host "`n[1/5] Compilando Next.js en modo Export Estático..." -ForegroundColor Yellow
    Push-Location $baseDir
    npm run build
    Pop-Location
    Write-Host "  Compilacion exitosa. Salida en 'out'." -ForegroundColor Green
}

# 2. Empaquetar Artefactos
Write-Host "`n[2/5] Empaquetando directorio 'out' en TAR.GZ..." -ForegroundColor Yellow
$tarPath = "$baseDir\creati-deploy.tar.gz"
if (Test-Path $tarPath) { Remove-Item $tarPath -Force }

tar -czf "$tarPath" -C "$baseDir\out" .
$tarItem = Get-Item $tarPath
$tarSizeMb = [Math]::Round($tarItem.Length / 1MB, 2)
Write-Host "  Artefacto generado: creati-deploy.tar.gz ($tarSizeMb MB)" -ForegroundColor Green

# 3. Transferencia SCP
Write-Host "`n[3/5] Transfiriendo archivo TAR.GZ a Hostinger via SCP..." -ForegroundColor Yellow
scp -P $SshPort -i "$keyPath" -o StrictHostKeyChecking=no "$tarPath" "${SshUser}@${SshHost}:/tmp/creati-deploy.tar.gz"
Write-Host "  Transferencia a /tmp/ completada exitosamente." -ForegroundColor Green

# 4. Descompresión Segura en Servidor
# IMPORTANTE: Preservar subdirectorios abogalia, timetracking, medical, showroom
Write-Host "`n[4/5] Desplegando artefactos en $RemoteRoot (preservando sub-apps)..." -ForegroundColor Yellow
$remoteCmd = @"
mkdir -p /tmp/creati_extracted && \
tar -xzf /tmp/creati-deploy.tar.gz -C /tmp/creati_extracted && \
cp -rf /tmp/creati_extracted/* $RemoteRoot/ && \
chmod -R 755 $RemoteRoot/about* $RemoteRoot/contact* $RemoteRoot/servicios* $RemoteRoot/_next $RemoteRoot/llms.txt $RemoteRoot/sitemap.xml $RemoteRoot/robots.txt $RemoteRoot/index.html 2>/dev/null || true && \
rm -rf /tmp/creati_extracted /tmp/creati-deploy.tar.gz
"@

ssh -p $SshPort -i "$keyPath" -o StrictHostKeyChecking=no "${SshUser}@${SshHost}" "$remoteCmd"
Write-Host "  Archivos extraidos y permisos 755 configurados." -ForegroundColor Green

# 5. Notificar IndexNow
if (-not $SkipIndexNow) {
    Write-Host "`n[5/5] Ejecutando ping IndexNow a motores de busqueda..." -ForegroundColor Yellow
    node "$baseDir\scripts\ping-indexnow.js"
}

Write-Host "`n================================================================================" -ForegroundColor Cyan
Write-Host "  DESPLIEGUE A PRODUCCION COMPLETADO EXITOSAMENTE" -ForegroundColor Green
Write-Host "  URL: https://creati.mx" -ForegroundColor Cyan
Write-Host "  Servicios: https://creati.mx/servicios" -ForegroundColor Cyan
Write-Host "================================================================================" -ForegroundColor Cyan