<?php

require_once "config.php";


// =========================================
// 1. GET design_id FROM URL
// =========================================

$designId = $_GET["id"] ?? null;

if (!$designId || !is_numeric($designId)) {
    http_response_code(400);
    die("Invalid design ID.");
}


// =========================================
// 2. FETCH FROM DATABASE
// =========================================

try {

    $stmt = $pdo->prepare("
        SELECT generated_image
        FROM designs
        WHERE id = :id
    ");

    $stmt->execute([":id" => $designId]);

    $design = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$design) {
        http_response_code(404);
        die("Design not found.");
    }

} catch (PDOException $e) {

    http_response_code(500);
    die("Database error.");
}


// =========================================
// 3. FILE PATH
// =========================================

$relativePath = $design["generated_image"];
$filePath = __DIR__ . "/" . $relativePath;


if (!file_exists($filePath)) {
    http_response_code(404);
    die("File not found on server.");
}


// =========================================
// 4. FORCE DOWNLOAD
// =========================================

$downloadName = "ai-design-" . $designId . ".png";


if (ob_get_level()) {
    ob_end_clean();
}


header("Content-Description: File Transfer");
header("Content-Type: image/png");
header("Content-Disposition: attachment; filename=\"" . $downloadName . "\"");
header("Content-Transfer-Encoding: binary");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Pragma: public");
header("Content-Length: " . filesize($filePath));


readfile($filePath);

exit;