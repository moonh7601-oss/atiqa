<?php

header("Content-Type: application/json");

require_once "config.php";


// =========================================
// 1. ONLY POST REQUEST
// =========================================

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    echo json_encode([
        "success" => false,
        "message" => "Invalid request method. Use POST."
    ]);

    exit;
}


// =========================================
// 2. CHECK API KEY
// =========================================

if (
    empty($STABILITY_API_KEY) ||
    $STABILITY_API_KEY === "YOUR_STABILITY_API_KEY"
) {

    echo json_encode([
        "success" => false,
        "message" => "Stability AI API key is missing in config.php."
    ]);

    exit;
}


// =========================================
// 3. CHECK IMAGE
// =========================================

if (
    !isset($_FILES["room_image"]) ||
    $_FILES["room_image"]["error"] !== UPLOAD_ERR_OK
) {

    echo json_encode([
        "success" => false,
        "message" => "Please upload a room image."
    ]);

    exit;
}


$image = $_FILES["room_image"];


// =========================================
// 4. CHECK FILE SIZE
// =========================================

if ($image["size"] > 10 * 1024 * 1024) {

    echo json_encode([
        "success" => false,
        "message" => "Image must be less than 10 MB."
    ]);

    exit;
}


// =========================================
// 5. CHECK IMAGE TYPE
// =========================================

$finfo = new finfo(FILEINFO_MIME_TYPE);

$mimeType = $finfo->file(
    $image["tmp_name"]
);


$allowedTypes = [

    "image/jpeg" => "jpg",

    "image/png" => "png",

    "image/webp" => "webp"

];


if (!isset($allowedTypes[$mimeType])) {

    echo json_encode([
        "success" => false,
        "message" => "Only JPG, PNG and WEBP images are allowed."
    ]);

    exit;
}


// =========================================
// 6. USER PROMPT
// =========================================

$userPrompt = trim(
    $_POST["prompt"] ?? ""
);


if (empty($userPrompt)) {

    $userPrompt =
        "Redesign this room as a beautiful modern home interior. "
        . "Keep the existing room structure, walls, windows and doors. "
        . "Add elegant modern furniture, suitable wall colors, "
        . "beautiful lighting, realistic flooring and tasteful decoration.";

}


// =========================================
// 7. CREATE FOLDERS
// =========================================

$uploadFolder = __DIR__ . "/uploads/";

$generatedFolder = __DIR__ . "/generated/";


if (!is_dir($uploadFolder)) {

    mkdir(
        $uploadFolder,
        0777,
        true
    );

}


if (!is_dir($generatedFolder)) {

    mkdir(
        $generatedFolder,
        0777,
        true
    );

}


// =========================================
// 8. UNIQUE FILE NAME
// =========================================

$uniqueName =
    bin2hex(
        random_bytes(16)
    );


$extension =
    $allowedTypes[$mimeType];


$originalFileName =
    "room_" .
    $uniqueName .
    "." .
    $extension;


$originalPath =
    $uploadFolder .
    $originalFileName;


// =========================================
// 9. SAVE ORIGINAL IMAGE
// =========================================

if (
    !move_uploaded_file(
        $image["tmp_name"],
        $originalPath
    )
) {

    echo json_encode([
        "success" => false,
        "message" => "Could not save uploaded image."
    ]);

    exit;
}


// =========================================
// 10. CHECK IMAGE SIZE / DIMENSIONS
// =========================================

$imageInfo = getimagesize(
    $originalPath
);


if ($imageInfo === false) {

    echo json_encode([
        "success" => false,
        "message" => "Invalid image."
    ]);

    exit;
}


$width = $imageInfo[0];

$height = $imageInfo[1];


// =========================================
// 11. DETERMINE ASPECT RATIO
// =========================================

$ratio = $width / $height;


if ($ratio >= 1.7) {

    $aspectRatio = "16:9";

} elseif ($ratio >= 1.4) {

    $aspectRatio = "3:2";

} elseif ($ratio <= 0.7) {

    $aspectRatio = "2:3";

} elseif ($ratio <= 0.85) {

    $aspectRatio = "3:4";

} else {

    $aspectRatio = "1:1";

}


// =========================================
// 12. AI PROMPT
// =========================================

$finalPrompt =

    $userPrompt .

    " Professional interior design photography, "
    . "photorealistic, realistic furniture placement, "
    . "realistic materials, realistic lighting, "
    . "clean and elegant room, high quality interior design. "
    . "Preserve the basic architecture of the original room.";


// =========================================
// 13. CALL CURRENT STABILITY AI API
// =========================================
//
// Current image-to-image API:
// /v2beta/stable-image/generate/core
//
// It uses:
// image
// prompt
// strength
// mode=image-to-image
//
// =========================================

$apiUrl =
    "https://api.stability.ai/v2beta/stable-image/generate/core";


$curl = curl_init();


$postFields = [

    "image" => new CURLFile(
        $originalPath,
        $mimeType,
        $originalFileName
    ),

    "prompt" => $finalPrompt,

    "mode" => "image-to-image",

    "strength" => "0.35",

    "aspect_ratio" => $aspectRatio,

    "negative_prompt" =>
        "blurry, distorted, deformed furniture, "
        . "low quality, cartoon, painting, "
        . "messy room, unrealistic objects",

    "output_format" => "png",

    "style_preset" => "photographic"

];


curl_setopt_array(

    $curl,

    [

        CURLOPT_URL => $apiUrl,

        CURLOPT_RETURNTRANSFER => true,

        CURLOPT_POST => true,

        CURLOPT_TIMEOUT => 180,

        CURLOPT_HTTPHEADER => [

            "Authorization: Bearer " .
            $STABILITY_API_KEY,

            "Accept: image/*"

        ],

        CURLOPT_POSTFIELDS => $postFields

    ]

);


$response = curl_exec($curl);


$httpCode =
    curl_getinfo(
        $curl,
        CURLINFO_HTTP_CODE
    );


$curlError =
    curl_error($curl);


curl_close($curl);


// =========================================
// 14. CURL ERROR
// =========================================

if ($response === false) {

    echo json_encode([

        "success" => false,

        "message" =>
            "AI connection failed: " .
            $curlError

    ]);

    exit;
}


// =========================================
// 15. API ERROR
// =========================================

if ($httpCode !== 200) {

    $apiError =
        json_decode(
            $response,
            true
        );


    $message =
        "AI generation failed. HTTP code: "
        . $httpCode;


    if (
        is_array($apiError) &&
        isset($apiError["errors"])
    ) {

        $message =
            implode(
                " | ",
                $apiError["errors"]
            );

    }


    echo json_encode([

        "success" => false,

        "message" => $message,

        "http_code" => $httpCode

    ]);

    exit;
}


// =========================================
// 16. SAVE GENERATED IMAGE
// =========================================

$generatedFileName =
    "design_" .
    $uniqueName .
    ".png";


$generatedPath =
    $generatedFolder .
    $generatedFileName;


if (
    file_put_contents(
        $generatedPath,
        $response
    ) === false
) {

    echo json_encode([

        "success" => false,

        "message" =>
            "AI generated the image but it could not be saved."

    ]);

    exit;
}


// =========================================
// 17. DATABASE SAVE
// =========================================

try {

    $stmt = $pdo->prepare("

        INSERT INTO designs
        (
            original_image,
            generated_image,
            prompt
        )

        VALUES
        (
            :original,
            :generated,
            :prompt
        )

    ");


    $stmt->execute([

        ":original" =>
            "uploads/" .
            $originalFileName,

        ":generated" =>
            "generated/" .
            $generatedFileName,

        ":prompt" =>
            $userPrompt

    ]);


    $designId =
        $pdo->lastInsertId();


} catch (PDOException $e) {

    echo json_encode([

        "success" => false,

        "message" =>
            "AI image generated but database save failed.",

        "database_error" =>
            $e->getMessage()

    ]);

    exit;
}


// =========================================
// 18. SUCCESS
// =========================================

echo json_encode([

    "success" => true,

    "message" =>
        "AI design generated successfully.",

    "design_id" =>
        $designId,

    "original_image" =>
        "uploads/" .
        $originalFileName,

    "generated_image" =>
        "generated/" .
        $generatedFileName

]);


exit;

?>