<?php
include("config.php");

echo "<h3>DP Test:</h3>";
$stmt = $conn->query("SELECT DATABASE()");
echo "Connected to: " . $stmt->fetchColumn() . "<br><br>";

echo "<h3>Gemini Models Test:</h3>";
$url = "https://generativelanguage.googleapis.com/v1beta/models?key=" . $GEMINI_API_KEY;

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Code: $httpCode<br>";
echo "<pre>";
print_r(json_decode($response, true));
echo "</pre>";
?>