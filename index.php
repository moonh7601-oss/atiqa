<?php

session_start();

include("dp.php");

$isLoggedIn=false;

if(isset($_SESSION['user_id']))
{
    $isLoggedIn=true;
}

?>
<a href="login.php" class="get-started-btn">
    Get Started
</a>

<a href="about.php" class="about-btn">
    About Us
</a>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Design from Image</title>
    <meta name="description" content="Upload your room photo and let AI redesign it with a new interior design style.">

    <style>

        /* ===========================
           GENERAL PAGE STYLES
        =========================== */

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, sans-serif;
            background: #f0f1fa;
            min-height: 100vh;
            padding: 30px 20px;
        }

        /* ===========================
           BACK BUTTON (top left)
        =========================== */

        .back-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background: white;
            cursor: pointer;
            font-size: 18px;
            color: #444;
            text-decoration: none;
            margin-bottom: 20px;
        }

        .back-btn:hover {
            background: #f5f5f5;
        }

        /* ===========================
           PAGE TITLE
        =========================== */

        .page-title {
            text-align: center;
            font-size: 26px;
            font-weight: bold;
            color: #1a1a2e;
            margin-bottom: 8px;
        }

        .page-subtitle {
            text-align: center;
            color: #888;
            font-size: 14px;
            margin-bottom: 30px;
        }

        /* ===========================
           MAIN LAYOUT — two columns
        =========================== */

        .main-layout {
            display: flex;
            gap: 20px;
            max-width: 1100px;
            margin: 0 auto;
            flex-wrap: wrap;
        }

        /* LEFT COLUMN */
        .left-panel {
            background: white;
            border-radius: 16px;
            padding: 25px;
            width: 310px;
            min-width: 280px;
            flex-shrink: 0;
        }

        /* RIGHT COLUMN */
        .right-panel {
            background: white;
            border-radius: 16px;
            padding: 25px;
            flex: 1;
            min-width: 300px;
        }

        /* ===========================
           SECTION HEADINGS
        =========================== */

        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #1a1a2e;
            margin-bottom: 15px;
        }

        /* ===========================
           IMAGE UPLOAD BOX
        =========================== */

        .upload-box {
            border: 1.5px dashed #ccc;
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            cursor: pointer;
            position: relative;
            background: #fafafa;
            margin-bottom: 12px;
        }

        .upload-box:hover {
            border-color: #6c5ce7;
            background: #f5f3ff;
        }

        /* Hidden file input — click anywhere on the box triggers it */
        #roomImage {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            opacity: 0;
            cursor: pointer;
        }

        .upload-icon {
            font-size: 40px;
            color: #6c5ce7;
            margin-bottom: 10px;
        }

        .upload-text {
            color: #777;
            font-size: 14px;
        }

        /* Preview of uploaded image */
        #uploadedImage {
            width: 100%;
            border-radius: 10px;
            display: none;
            margin-bottom: 10px;
        }

        /* X button to clear the image */
        .remove-image-btn {
            position: absolute;
            top: 8px;
            right: 8px;
            background: white;
            border: 1px solid #ddd;
            border-radius: 50%;
            width: 26px;
            height: 26px;
            cursor: pointer;
            font-size: 14px;
            display: none;
            align-items: center;
            justify-content: center;
            color: #555;
        }

        /* Change Image button */
        .change-image-btn {
            width: 100%;
            padding: 10px;
            border: 1.5px solid #6c5ce7;
            border-radius: 8px;
            background: white;
            color: #6c5ce7;
            font-size: 14px;
            cursor: pointer;
            margin-bottom: 20px;
        }

        .change-image-btn:hover {
            background: #f5f3ff;
        }

        /* ===========================
           DESCRIBE DESIGN TEXTAREA
        =========================== */

        #promptInput {
            width: 100%;
            height: 90px;
            border: 1.5px solid #ddd;
            border-radius: 10px;
            padding: 12px;
            font-size: 14px;
            resize: none;
            color: #333;
            font-family: Arial, sans-serif;
            margin-bottom: 15px;
        }

        #promptInput:focus {
            outline: none;
            border-color: #6c5ce7;
        }

        /* ===========================
           GENERATE DESIGN BUTTON
        =========================== */

        #generateBtn {
            width: 100%;
            padding: 14px;
            background: #6c5ce7;
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 15px;
            font-weight: bold;
            cursor: pointer;
            margin-bottom: 10px;
        }

        #generateBtn:hover {
            background: #5a4bd1;
        }

        #generateBtn:disabled {
            background: #aaa;
            cursor: not-allowed;
        }

        /* ===========================
           ERROR AND SUCCESS MESSAGES
        =========================== */

        #errorMsg {
            color: #e74c3c;
            font-size: 13px;
            margin-bottom: 15px;
            display: none;
            background: #fff5f5;
            border: 1px solid #fcc;
            border-radius: 8px;
            padding: 10px 12px;
        }

        /* ===========================
           QUICK PROMPT CHIPS
        =========================== */

        .quick-prompts-title {
            font-size: 14px;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
        }

        .chips {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .chip {
            padding: 7px 14px;
            border: 1.5px solid #ccc;
            border-radius: 20px;
            font-size: 13px;
            cursor: pointer;
            color: #444;
            background: white;
        }

        .chip:hover {
            border-color: #6c5ce7;
            color: #6c5ce7;
            background: #f5f3ff;
        }

        /* ===========================
           RIGHT PANEL — TOP BAR
        =========================== */

        .result-topbar {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 15px;
        }

        .result-topbar-left h3 {
            font-size: 16px;
            font-weight: bold;
            color: #1a1a2e;
        }

        .result-topbar-left p {
            font-size: 13px;
            color: #888;
            margin-top: 2px;
        }

        /* Action buttons — Regenerate, Download, Save */
        .action-btns {
            display: flex;
            gap: 8px;
        }

        .action-btn {
            padding: 8px 14px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background: white;
            font-size: 13px;
            cursor: pointer;
            color: #444;
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .action-btn:hover {
            background: #f5f5f5;
            border-color: #bbb;
        }

        .action-btn:disabled {
            color: #aaa;
            cursor: not-allowed;
        }

        /* ===========================
           AI RESULT AREA
           — single container holds
             placeholder / spinner /
             generated image all in
             the same fixed box
        =========================== */

        .result-box {
            position: relative;
            width: 100%;
            min-height: 350px;
            background: #f0f1fa;
            border-radius: 12px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Placeholder shown before design is generated */
        #resultPlaceholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 20px;
        }

        .placeholder-icon {
            font-size: 70px;
            margin-bottom: 15px;
            color: #bbb;
        }

        .placeholder-title {
            font-size: 16px;
            font-weight: bold;
            color: #555;
            margin-bottom: 6px;
        }

        .placeholder-sub {
            font-size: 13px;
            color: #999;
        }

        /* Loading Spinner — hidden by default */
        #loadingArea {
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 15px;
        }

        .spinner {
            width: 48px;
            height: 48px;
            border: 5px solid #ddd;
            border-top-color: #6c5ce7;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .loading-text {
            color: #666;
            font-size: 14px;
            text-align: center;
            max-width: 260px;
        }

        /* The AI Generated Image — fills the result box */
        #resultImage {
            display: none;
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 12px;
        }

        /* Success message for Save */
        #successMsg {
            color: #27ae60;
            font-size: 13px;
            margin-top: 10px;
            display: none;
            text-align: center;
        }

    </style>

</head>


<body>


    <!-- Back Button -->
    <a href="#" class="back-btn" onclick="history.back()">&#8592;</a>