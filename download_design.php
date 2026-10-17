<?php

// ==========================================
// DOWNLOAD AI GENERATED IMAGE
// ==========================================

if (!isset($_GET['file']) || empty($_GET['file'])) {
    die("No image selected.");
}

// ✅ Ab yeh already poora, sahi image URL hai (jo generate_design.php ne banaya tha)
$image_url = $_GET['file'];

// Security: sirf pollinations.ai domain ke URLs allow karein
if (strpos($image_url, "https://image.pollinations.ai/") !== 0) {
    die("Invalid image source.");
}

// Download image using cURL
$ch = curl_init($image_url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_TIMEOUT, 60);

$image_data = curl_exec($ch);

$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$content_type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

curl_close($ch);

// Check download
if ($image_data === false || $http_code != 200) {
    die("Unable to download image.");
}

// File name
$filename = "AI_Interior_Design_" . date("Y-m-d_H-i-s") . ".jpg";

// Force browser download
header("Content-Type: image/jpeg");
header("Content-Disposition: attachment; filename=\"$filename\"");
header("Content-Length: " . strlen($image_data));
header("Cache-Control: no-cache, must-revalidate");

echo $image_data;

exit;

?>