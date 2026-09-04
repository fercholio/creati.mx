<#
.SYNOPSIS
    Deploy creati.mx to Hostinger shared hosting
.DESCRIPTION
    Builds the Next.js site as static export and uploads to Hostinger via TAR.GZ + SSH
.PARAMETER SkipBuild
    Skip the build step (use existing dist)
#>
param(
    [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

# ── Config ──
$SSH_USER = "u583627395"
$SSH_HOST = "creati.mx"
$SSH_PORT = 65002
$REMOTE_PATH = "/home/$SSH_USER/domains/creati.mx/public_html"
$PROJECT_DIR = Split-Path -Parent $PSScriptRoot

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  DEPLOY: creati.mx (TAR.GZ + SSH)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# ── 1. Build ──
if (-not $SkipBuild) {
    Write-Host "[1/4] Building Next.js static export..." -ForegroundColor Yellow
    Set-Location $PROJECT_DIR
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "BUILD FAILED" -ForegroundColor Red
        exit 1
    }
    Write-Host "Build complete." -ForegroundColor Green
} else {
    Write-Host "[1/4] Skipping build (using existing output)" -ForegroundColor DarkGray
}

# ── 2. Configure .htaccess ──
Write-Host ""
Write-Host "[2/4] Generando .htaccess para produccion..." -ForegroundColor Yellow
$distPath = Join-Path $PROJECT_DIR "out"
if (-not (Test-Path $distPath)) {
    Write-Host "ERROR: 'out' directory not found. Run build first." -ForegroundColor Red
    exit 1
}

$htaccess = @"
RewriteEngine On
RewriteBase /

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remove trailing slash
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)/$ /`$1 [L,R=301]

# Serve static files
RewriteCond %{REQUEST_FILENAME} -f
RewriteRule ^ - [L]

# Exclude subdomains/directories if accessed directly
RewriteCond %{REQUEST_URI} ^/(abogalia|timetracking) [NC]
RewriteRule ^ - [L]

# SPA fallback - try .html extension first (creati.mx domain only)
RewriteCond %{HTTP_HOST} ^(www\.)?creati\.mx$ [NC]
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^ %{REQUEST_URI}.html [L]

# SPA fallback - route to index.html (creati.mx domain only)
RewriteCond %{HTTP_HOST} ^(www\.)?creati\.mx$ [NC]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ /index.html [L]

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/svg+xml "access plus 1 month"
    ExpiresByType image/webp "access plus 1 month"
    ExpiresByType image/avif "access plus 1 month"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
</IfModule>

# Security headers & purge
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    Header set X-LiteSpeed-Purge "*"
</IfModule>
"@

$htaccessPath = Join-Path $distPath ".htaccess"
[System.IO.File]::WriteAllText($htaccessPath, $htaccess, (New-Object System.Text.UTF8Encoding($false)))
Write-Host "  .htaccess generado exitosamente." -ForegroundColor Green

# ── 3. Packaging ──
Write-Host ""
Write-Host "[3/4] Empaquetando artefacto TAR.GZ..." -ForegroundColor Yellow
$tarFile = Join-Path $PROJECT_DIR "creati-deploy.tar.gz"
if (Test-Path $tarFile) { Remove-Item $tarFile -Force }
tar -czf "$tarFile" -C "$distPath" .
Write-Host "  Artefacto creati-deploy.tar.gz generado." -ForegroundColor Green

# ── 4. Upload & Remote Extract ──
Write-Host ""
Write-Host "[4/4] Transfiriendo y desplegando en Hostinger..." -ForegroundColor Yellow
scp -P $SSH_PORT "$tarFile" "${SSH_USER}@${SSH_HOST}:/tmp/creati-deploy.tar.gz"
if ($LASTEXITCODE -ne 0) {
    Write-Host "UPLOAD FAILED" -ForegroundColor Red
    exit 1
}

$remoteCmd = "tar -xzf /tmp/creati-deploy.tar.gz -C $REMOTE_PATH && chmod -R 755 $REMOTE_PATH && rm -f /tmp/creati-deploy.tar.gz"
ssh -p $SSH_PORT "${SSH_USER}@${SSH_HOST}" "$remoteCmd"
if ($LASTEXITCODE -ne 0) {
    Write-Host "EXTRACTION FAILED" -ForegroundColor Red
    exit 1
}

Remove-Item $tarFile -Force -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  DEPLOYED: https://creati.mx" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
