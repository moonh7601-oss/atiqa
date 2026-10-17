<?php

// ==============================
// DATABASE CONFIGURATION
// ==============================

$host   = "localhost";
$user   = "root";
$pass   = "";
$dbname = "interiorcraft";

// ==============================
// GEMINI API KEY
// ==============================
try {

    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $user,
        $pass
    );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}


// =========================================
// STABILITY AI API KEY (FREE CREDITS ON SIGNUP)
// =========================================
// How to get it (FREE):
// 1. Go to https://platform.stability.ai  (free signup, no card needed)
// 2. After login, go to https://platform.stability.ai/account/keys
// 3. Click "Create API Key" → copy it (starts with sk-...)
// 4. Paste it below

$STABILITY_API_KEY = "sk-xTG6ezRMzs7uzK3O4bEdywAqqxfr8XZ4YgOmCe6fbVAUcTwu";


// =========================================
// HUGGING FACE API KEY (BACKUP / UNUSED)
// =========================================

$HF_API_KEY = "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";
