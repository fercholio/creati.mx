<#
.SYNOPSIS
    Deploy creati.mx to Hostinger shared hosting
.DESCRIPTION
    Builds the Next.js site as static export and uploads to Hostinger via SCP
.PARAMETER SkipBuild
    Skip the build step (use existing dist)
#>
param(
    [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

# ── Config ──
$SSH_USER = "u583627395"
$SSH_HOST = "195.35.33.65"
$SSH_PORT = 65002
$REMOTE_PATH = "/home/$SSH_USER/domains/creati.mx/public_html"
$PROJECT_DIR = Split-Path -Parent $PSScriptRoot

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  DEPLOY: creati.mx" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# ── 1. Build ──
if (-not $SkipBuild) {
    Write-Host "[1/3] Building Next.js static export..." -ForegroundColor Yellow
    Set-Location $PROJECT_DIR
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "BUILD FAILED" -ForegroundColor Red
        exit 1
    }
    Write-Host "Build complete." -ForegroundColor Green
} else {
    Write-Host "[1/3] Skipping build (using existing output)" -ForegroundColor DarkGray
}

# ── 2. Upload ──
Write-Host ""
Write-Host "[2/3] Uploading to Hostinger..." -ForegroundColor Yellow
$distPath = Join-Path $PROJECT_DIR "out"
if (-not (Test-Path $distPath)) {
    Write-Host "ERROR: 'out' directory not found. Run build first." -ForegroundColor Red
    exit 1
}

scp -P $SSH_PORT -r "$distPath\*" "${SSH_USER}@${SSH_HOST}:${REMOTE_PATH}/"
if ($LASTEXITCODE -ne 0) {
    Write-Host "UPLOAD FAILED" -ForegroundColor Red
    exit 1
}
Write-Host "Upload complete." -ForegroundColor Green

# ── 3. Configure .htaccess ──
Write-Host ""
Write-Host "[3/3] Configuring .htaccess..." -ForegroundColor Yellow

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

# SPA fallback - try .html extension first
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^ %{REQUEST_URI}.html [L]

# SPA fallback - route to index.html
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

# Security headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
"@

$htaccess | ssh -p $SSH_PORT "${SSH_USER}@${SSH_HOST}" "cat > ${REMOTE_PATH}/.htaccess"
if ($LASTEXITCODE -ne 0) {
    Write-Host "HTACCESS CONFIG FAILED" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  DEPLOYED: https://creati.mx" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
