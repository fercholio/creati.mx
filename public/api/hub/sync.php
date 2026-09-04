<?php
/**
 * ==============================================================================
 * CREATI KNOWLEDGE HUB — B2B AUTO-SYNC INGESTION ENDPOINT
 * ==============================================================================
 * Permite que cualquier repositorio satélite (Abogalia, Brokar, Medical, etc.)
 * sincronice automáticamente sus documentos Markdown hacia el Hub de Creati.mx.
 * ==============================================================================
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Hub-Secret');

// Responder a preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Token B2B de autorización
define('CREATI_HUB_SECRET', 'CREATI_VAULT_B2B_SYNC_KEY_99812_SECURE_ALPHA');

// Verificar cabecera de autenticación
$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
$secretHeader = $headers['X-Hub-Secret'] ?? $headers['x-hub-secret'] ?? '';

$providedToken = '';
if (preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
    $providedToken = trim($matches[1]);
} elseif (!empty($secretHeader)) {
    $providedToken = trim($secretHeader);
}

if ($providedToken !== CREATI_HUB_SECRET) {
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'error' => 'Unauthorized: Invalid or missing B2B sync token.',
        'timestamp' => date('c')
    ]);
    exit;
}

// Ruta del archivo de documentos dinámicos en el servidor
$docsFile = __DIR__ . '/hub_dynamic_documents.json';

// Si es GET, retornar los documentos sincronizados
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!file_exists($docsFile)) {
        echo json_encode(['success' => true, 'documents' => []]);
        exit;
    }
    $content = file_get_contents($docsFile);
    echo $content ?: json_encode(['success' => true, 'documents' => []]);
    exit;
}

// Si es POST, procesar payload de sincronización
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $payload = json_decode($rawInput, true);

    if (!$payload || !isset($payload['docId']) || !isset($payload['content'])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Bad Request: Missing required fields (docId, content).'
        ]);
        exit;
    }

    $existing = [];
    if (file_exists($docsFile)) {
        $existing = json_decode(file_get_contents($docsFile), true) ?: [];
    }

    $docId = trim($payload['docId']);
    $ecosystem = trim($payload['ecosystem'] ?? 'creati_core');
    $title = trim($payload['title'] ?? 'Documento sin título');
    $category = trim($payload['category'] ?? 'architecture');
    $requiredRole = trim($payload['requiredRole'] ?? 'ALL');
    $author = trim($payload['author'] ?? 'AI Agent (Sync Bot)');
    $authorRole = trim($payload['authorRole'] ?? 'DEVELOPER');
    $changeSummary = trim($payload['changeSummary'] ?? 'Sincronización automática multi-repo');
    $tags = is_array($payload['tags'] ?? null) ? $payload['tags'] : ['auto-sync'];
    $summary = trim($payload['summary'] ?? substr(strip_tags($payload['content']), 0, 160) . '...');
    $timestamp = date('c');
    $today = date('Y-m-d');

    // Nueva versión para auditoría estricta
    $newVersion = [
        'versionId' => 'ver_' . round(microtime(true) * 1000),
        'versionNumber' => 'v' . date('ymd.His'),
        'timestamp' => $timestamp,
        'authorId' => 'usr_sync_agent',
        'authorName' => $author,
        'authorEmail' => 'agent@' . $ecosystem . '.creati.mx',
        'authorRole' => $authorRole,
        'changeSummary' => $changeSummary,
        'contentSnapshot' => $payload['content']
    ];

    $foundIndex = -1;
    foreach ($existing as $index => $doc) {
        if ($doc['id'] === $docId) {
            $foundIndex = $index;
            break;
        }
    }

    if ($foundIndex >= 0) {
        $versions = $existing[$foundIndex]['versions'] ?? [];
        $versions[] = $newVersion;
        $existing[$foundIndex]['title'] = $title;
        $existing[$foundIndex]['category'] = $category;
        $existing[$foundIndex]['requiredRole'] = $requiredRole;
        $existing[$foundIndex]['summary'] = $summary;
        $existing[$foundIndex]['lastUpdated'] = $today;
        $existing[$foundIndex]['content'] = $payload['content'];
        $existing[$foundIndex]['tags'] = $tags;
        $existing[$foundIndex]['lastModifiedBy'] = [
            'name' => $author,
            'email' => 'agent@' . $ecosystem . '.creati.mx',
            'role' => $authorRole,
            'timestamp' => $timestamp
        ];
        $existing[$foundIndex]['versions'] = $versions;
    } else {
        $existing[] = [
            'id' => $docId,
            'ecosystem' => $ecosystem,
            'title' => $title,
            'category' => $category,
            'requiredRole' => $requiredRole,
            'summary' => $summary,
            'lastUpdated' => $today,
            'author' => $author,
            'tags' => $tags,
            'isRestricted' => false,
            'content' => $payload['content'],
            'lastModifiedBy' => [
                'name' => $author,
                'email' => 'agent@' . $ecosystem . '.creati.mx',
                'role' => $authorRole,
                'timestamp' => $timestamp
            ],
            'versions' => [$newVersion]
        ];
    }

    file_put_contents($docsFile, json_encode($existing, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

    echo json_encode([
        'success' => true,
        'message' => "Document '{$docId}' synchronized successfully to Creati Knowledge Hub.",
        'version' => $newVersion['versionNumber'],
        'ecosystem' => $ecosystem,
        'timestamp' => $timestamp
    ]);
    exit;
}
