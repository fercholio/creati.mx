[CmdletBinding()]
param (
    [string]$BaseUrl = "https://creati.mx"
)

Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host "  CREATI.MX - SUITE DE VALIDACION DE PRODUCCION (SEO, AEO Y ESTADO HTTP)" -ForegroundColor Cyan
Write-Host "================================================================================" -ForegroundColor Cyan

$urls = @(
    "$BaseUrl/",
    "$BaseUrl/servicios",
    "$BaseUrl/servicios/desarrollo-software-a-medida",
    "$BaseUrl/servicios/desarrollo-aplicaciones-moviles",
    "$BaseUrl/servicios/diseno-ux-ui",
    "$BaseUrl/servicios/inteligencia-artificial-aplicada",
    "$BaseUrl/about",
    "$BaseUrl/contact",
    "$BaseUrl/sitemap.xml",
    "$BaseUrl/robots.txt",
    "$BaseUrl/llms.txt",
    "$BaseUrl/creati-indexnow-key-2026.txt"
)

$passed = 0
$failed = 0

foreach ($url in $urls) {
    try {
        $res = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 15 -UseBasicParsing
        $status = $res.StatusCode
        if ($status -ge 200 -and $status -lt 400) {
            Write-Host "  [OK $status] $url" -ForegroundColor Green
            $passed++
        } else {
            Write-Host "  [FAIL $status] $url" -ForegroundColor Red
            $failed++
        }
    } catch {
        Write-Host "  [ERROR] $url -> $($_.Exception.Message)" -ForegroundColor Red
        $failed++
    }
}

Write-Host "`n--- Validacion de Metadatos Semanticos & AEO ---" -ForegroundColor Yellow

# Verificar contenido de llms.txt
try {
    $llms = (Invoke-WebRequest -Uri "$BaseUrl/llms.txt" -TimeoutSec 15 -UseBasicParsing).Content
    if ($llms -match "Brokar" -and $llms -match "Abogalia" -and $llms -match "Merida|M.rida") {
        Write-Host "  [OK] /llms.txt contiene entidades de autoridad y sede fisica validas." -ForegroundColor Green
        $passed++
    } else {
        Write-Host "  [WARN] /llms.txt no contiene todas las entidades esperadas." -ForegroundColor Yellow
    }
} catch {
    Write-Host "  [ERROR] Fallo al verificar /llms.txt: $($_.Exception.Message)" -ForegroundColor Red
    $failed++
}

# Verificar Sitemap XML
try {
    $sitemapContent = (Invoke-WebRequest -Uri "$BaseUrl/sitemap.xml" -TimeoutSec 15 -UseBasicParsing).Content
    if ($sitemapContent -match "servicios/desarrollo-software-a-medida") {
        Write-Host "  [OK] /sitemap.xml contiene el cluster de servicios indexable." -ForegroundColor Green
        $passed++
    } else {
        Write-Host "  [WARN] /sitemap.xml no contiene las rutas de servicios." -ForegroundColor Yellow
    }
} catch {
    Write-Host "  [ERROR] Fallo al verificar /sitemap.xml: $($_.Exception.Message)" -ForegroundColor Red
    $failed++
}

# Verificar Schema en Home
try {
    $homeHtml = (Invoke-WebRequest -Uri "$BaseUrl/" -TimeoutSec 15 -UseBasicParsing).Content
    if ($homeHtml -match "ProfessionalService" -and $homeHtml -match "GeoCoordinates") {
        Write-Host "  [OK] Home contiene Schema.org ProfessionalService con GeoCoordinates." -ForegroundColor Green
        $passed++
    } else {
        Write-Host "  [WARN] Home no contiene ProfessionalService o GeoCoordinates." -ForegroundColor Yellow
    }
} catch {
    Write-Host "  [ERROR] Fallo al verificar Home: $($_.Exception.Message)" -ForegroundColor Red
    $failed++
}

Write-Host "`n================================================================================" -ForegroundColor Cyan
Write-Host "  RESULTADO: $passed PRUEBAS SUPERADAS / $failed FALLOS" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Red" })
Write-Host "================================================================================" -ForegroundColor Cyan