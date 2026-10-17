<?php
// ==========================================
// AI DESIGN GENERATOR — 2 Databases Connected
// ==========================================
session_start();
header('Content-Type: application/json; charset=utf-8');

// --- Database 1: interiorcraft (users) ---
$host = "localhost";
$user = "root";
$pass = "";

$conn_users = new mysqli($host, $user, $pass, "interiorcraft");
if ($conn_users->connect_error) {
    echo json_encode(["success" => false, "message" => "Users DB failed: " . $conn_users->connect_error]);
    exit;
}
$conn_users->set_charset("utf8mb4");

// --- Database 2: ai_design_tool (designs) ---
$conn_ai = new mysqli($host, $user, $pass, "ai_design_tool");
if ($conn_ai->connect_error) {
    echo json_encode(["success" => false, "message" => "AI DB failed: " . $conn_ai->connect_error]);
    exit;
}
$conn_ai->set_charset("utf8mb4");

// --- Login check ---
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Please login first"]);
    exit;
}

$user_id = $_SESSION['user_id'];

// --- Verify user ---
$check = $conn_users->prepare("SELECT id FROM users WHERE id = ?");
$check->bind_param("i", $user_id);
$check->execute();
$check->store_result();

if ($check->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "User not found"]);
    $check->close();
    $conn_users->close();
    $conn_ai->close();
    exit;
}
$check->close();

// --- Handle Form Submission ---
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Get prompt (either from generate or directly)
    $prompt = trim($_POST['prompt'] ?? '');

    if (empty($prompt)) {
        echo json_encode(["success" => false, "message" => "Please enter a prompt"]);
        exit;
    }

    // AI image URL
    $full_prompt = "Interior design of " . $prompt . ", photorealistic, 4k, highly detailed, professional architectural photography, realistic lighting, wide angle";
    $generated_image_url = "https://image.pollinations.ai/prompt/" . urlencode($full_prompt) . "?width=800&height=600&nologo=true&seed=" . rand(1, 99999);

    // Save to ai_design_tool
    $stmt = $conn_ai->prepare("INSERT INTO design_requests (user_id, user_prompt, generated_image_url) VALUES (?, ?, ?)");

    if ($stmt === false) {
        // Table missing ya query mein masla — ab fatal error ki jagah clean JSON milega
        echo json_encode(["success" => false, "message" => "DB prepare failed: " . $conn_ai->error]);
        $conn_users->close();
        $conn_ai->close();
        exit;
    }

    $stmt->bind_param("iss", $user_id, $prompt, $generated_image_url);

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Design generated successfully",
            "image_url" => $generated_image_url,
            "prompt" => $prompt
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "DB error: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method: " . $_SERVER['REQUEST_METHOD']]);
}

$conn_users->close();
$conn_ai->close();
?>