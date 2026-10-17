<?php
// ==========================================
// BACKEND LOGIC (PHP) - Database & Form Handling
// ==========================================

// Database Connection
$host = "localhost";
$user = "root"; // Apna DB username dalein
$pass = "";     // Apna DB password dalein
$dbname = "ai_design_tool";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$generated_image_url = null; // Variable to hold generated image
$message = "";               // Variable for success/error messages

// Handle Form Submission (Jab "Generate" button click ho)
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['generate'])) {
    $prompt = trim($_POST['prompt'] ?? '');
    
    if (!empty($prompt)) {
        // --- AI INTEGRATION LOGIC START ---
        // Yahan aap Real AI API call karenge (e.g., OpenAI DALL-E, Stable Diffusion)
        // Filhal ke liye hum ek dummy image URL bana rahe hain testing ke liye
        
        // --- REAL AI IMAGE GENERATION (Hugging Face) ---
// --- REAL AI IMAGE GENERATION (Pollinations.ai - FREE, No Token) ---
$full_prompt = "Interior design of " . $prompt . ", photorealistic, 4k, highly detailed, professional architectural photography, realistic lighting, wide angle";

// Pollinations.ai - Direct URL, koi API key nahi chahiye
$generated_image_url = "https://image.pollinations.ai/prompt/" . urlencode($full_prompt) . "?width=800&height=600&nologo=true&seed=" . rand(1, 99999);

$message = "<div style='color: green; margin-bottom: 15px; font-weight: bold;'>✅ Design generated successfully!</div>";
// --- END REAL AI LOGIC ---
// --- END REAL AI LOGIC ---
        // --- AI INTEGRATION LOGIC END ---

        // Save Data to Database
        $stmt = $conn->prepare("INSERT INTO design_requests (user_prompt, generated_image_url) VALUES (?, ?)");
        $stmt->bind_param("ss", $prompt, $generated_image_url);
        
        if ($stmt->execute()) {
            $message = "<div style='color: green; margin-bottom: 15px; font-weight: bold;'>✅ Design generated successfully!</div>";
        } else {
            $message = "<div style='color: red; margin-bottom: 15px; font-weight: bold;'>❌ Database error: " . $conn->error . "</div>";
        }
        $stmt->close();
    } else {
        $message = "<div style='color: red; margin-bottom: 15px; font-weight: bold;'>⚠️ Please enter a prompt.</div>";
    }
}

// Fetch Example Prompts from Database
$examples = [];
$sql = "SELECT prompt_text FROM example_prompts";
$result = $conn->query($sql);
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $examples[] = $row['prompt_text'];
    }
}
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Interior Design Generator</title>
    <style>
        /* --- CSS Styling --- */
        body { font-family: sans-serif; background-color: #f4f6f9; display: flex; justify-content: center; padding: 20px; margin: 0; }
        .container { display: flex; gap: 20px; max-width: 1200px; width: 100%; }
        
        /* Left Panel */
        .left-panel { width: 30%; background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        h2 { margin-top: 0; color: #333; }
        textarea { width: 100%; height: 150px; border: 1px solid #d4b078; border-radius: 8px; padding: 12px; margin-bottom: 20px; resize: none; font-family: inherit; font-size: 14px; box-sizing: border-box; outline: none; }
        textarea:focus { border-color: #b8955e; box-shadow: 0 0 5px rgba(212, 176, 120, 0.5); }
        
        .example-btn { display: block; width: 100%; text-align: left; padding: 12px 15px; margin-bottom: 10px; background: #f8f9fa; border: 1px solid #eee; border-radius: 8px; cursor: pointer; font-size: 14px; color: #444; transition: 0.2s; }
        .example-btn:hover { background: #e9ecef; border-color: #ddd; }

        /* Right Panel */
        .right-panel { width: 70%; background: white; padding: 25px; border-radius: 12px; display: flex; flex-direction: column; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        
        .action-buttons-top button { background: #f0f0f0; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 14px; margin-left: 10px; color: #333; }
        .action-buttons-top button:hover { background: #e0e0e0; }

        .image-area { flex-grow: 1; border: 1px dashed #ccc; border-radius: 8px; display: flex; justify-content: center; align-items: center; min-height: 450px; margin-bottom: 20px; position: relative; background: #fafafa; overflow: hidden; }
        .image-area img { max-width: 100%; max-height: 100%; display: <?php echo $generated_image_url ? 'block' : 'none'; ?>; object-fit: contain; }
        .placeholder-text { color: #aaa; font-size: 16px; display: <?php echo $generated_image_url ? 'none' : 'block'; ?>; }
        
        /* Bottom Controls */
        .controls { display: flex; gap: 15px; }
        button.primary { background: #d4b078; color: white; border: none; padding: 14px 30px; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 15px; transition: 0.2s; }
        button.primary:hover { background: #c29d62; }
        
        button.secondary { background: #f0f0f0; border: none; padding: 14px 30px; border-radius: 8px; cursor: pointer; font-size: 15px; color: #333; transition: 0.2s; }
        button.secondary:hover { background: #e0e0e0; }

        /* Loader */
        .loader { display: none; font-weight: bold; color: #d4b078; font-size: 18px; }
        
        /* Responsive */
        @media (max-width: 768px) {
            .container { flex-direction: column; }
            .left-panel, .right-panel { width: 100%; box-sizing: border-box; }
        }
    </style>
</head>
<body>

<div class="container">
    <!-- LEFT PANEL: Prompt Input -->
    <div class="left-panel">
        <h2>Prompt</h2>
        <p style="color: grey; font-size: 14px; margin-top: -10px; margin-bottom: 15px;">Describe the room or space you want</p>
        
        <?php echo $message; ?>

        <form method="POST" action="" id="designForm" onsubmit="showLoader()">
            <textarea name="prompt" id="promptInput" placeholder="e.g. Modern bedroom with minimal decor" required><?php echo isset($_POST['prompt']) ? htmlspecialchars($_POST['prompt']) : ''; ?></textarea>
            
            <h3 style="margin-bottom: 15px; color: #333;">Example Prompts</h3>
            <div id="examplesContainer">
                <?php if(!empty($examples)): ?>
                    <?php foreach($examples as $text): ?>
                        <button type="button" class="example-btn" onclick="fillPrompt('<?php echo addslashes($text); ?>')">
                            <?php echo htmlspecialchars($text); ?>
                        </button>
                    <?php endforeach; ?>
                <?php else: ?>
                    <p style="color: #999; font-size: 13px;">No examples found in database.</p>
                <?php endif; ?>
            </div>
            
            <div class="controls" style="margin-top: 25px;">
                <button type="submit" name="generate" class="primary" style="width: 100%;">Generate</button>
            </div>
        </form>
    </div>

    <!-- RIGHT PANEL: Generated Room -->
    <div class="right-panel">
        <div class="header-row">
            <h2>Generated Room</h2>
            <div class="action-buttons-top">
                <button type="button">2D 3D</button>
                <button type="button">Download</button>
            </div>
        </div>
        
        <div class="image-area" id="imageArea">
            <span class="loader" id="loader">Generating Design... Please wait.</span>
            <span class="placeholder-text" id="placeholderText">Your generated design will appear here.</span>
            
            <?php if($generated_image_url): ?>
                <img id="resultImage" src="<?php echo $generated_image_url; ?>" alt="Generated Room">
            <?php else: ?>
                <img id="resultImage" src="" alt="Generated Room">
            <?php endif; ?>
        </div>

        <div class="controls">
            <button type="button" class="secondary">Change Color</button>
            <button type="button" class="secondary">Add object</button>
        </div>
    </div>
</div>

<script>
    // Function to fill textarea when an example prompt is clicked
    function fillPrompt(text) {
        document.getElementById('promptInput').value = text;
    }

    // Function to show loader when form is submitted
    function showLoader() {
        const loader = document.getElementById('loader');
        const placeholder = document.getElementById('placeholderText');
        const img = document.getElementById('resultImage');
        
        loader.style.display = 'block';
        if(placeholder) placeholder.style.display = 'none';
        if(img) img.style.display = 'none';
    }
</script>

</body>
</html>