<?php
// api.php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// Database Connection
$host = "localhost";
$user = "root"; // Apna DB username dalein
$pass = "";     // Apna DB password dalein
$dbname = "ai_design_tool";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$action = $_POST['action'] ?? $_GET['action'] ?? '';

// 1. Fetch Example Prompts
if ($action == 'get_examples') {
    $sql = "SELECT prompt_text FROM example_prompts";
    $result = $conn->query($sql);
    $prompts = [];
    while($row = $result->fetch_assoc()) {
        $prompts[] = $row['prompt_text'];
    }
    echo json_encode($prompts);
    exit;
}

// 2. Generate Image via AI
if ($action == 'generate') {
    $prompt = $_POST['prompt'] ?? '';
    
    if (empty($prompt)) {
        echo json_encode(["error" => "Prompt is required"]);
        exit;
    }

    // --- AI INTEGRATION LOGIC START ---
    // Yahan aap Real AI API call karenge (e.g., OpenAI DALL-E)
    // Filhal ke liye hum ek dummy image return kar rahe hain testing ke liye
    
    // Example: Real API call logic (Concept)
    /*
    $apiKey = "YOUR_OPENAI_API_KEY";
    $data = [
        "prompt" => "Interior design of " . $prompt . ", photorealistic, 4k",
        "n" => 1,
        "size" => "1024x1024"
    ];
    // Curl request to OpenAI...
    */
    
    // Dummy response for now
    $generated_image_url = "https://via.placeholder.com/800x600.png?text=" . urlencode($prompt);
    // --- AI INTEGRATION LOGIC END ---

    // Save to Database
    $stmt = $conn->prepare("INSERT INTO design_requests (user_prompt, generated_image_url) VALUES (?, ?)");
    $stmt->bind_param("ss", $prompt, $generated_image_url);
    
    if ($stmt->execute()) {
        echo json_encode([
            "success" => true, 
            "image_url" => $generated_image_url,
            "message" => "Design generated successfully"
        ]);
    } else {
        echo json_encode(["error" => "Database error"]);
    }
    exit;
}
?>