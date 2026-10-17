<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

// Database connection — aapki dp.php use kar rahe hain
include("dp.php");

// HTML form se data receive karein
$name     = trim($_POST['fullname'] ?? '');
$phone    = trim($_POST['phone'] ?? '');
$email    = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$confirm  = $_POST['confirm'] ?? '';

// ---- Validation ----
if ($name === '' || $email === '' || $password === '') {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Invalid email format"]);
    exit;
}

if ($password !== $confirm) {
    echo json_encode(["success" => false, "message" => "Passwords do not match"]);
    exit;
}

// ---- Duplicate email check ----
$check = $conn->prepare("SELECT id FROM users WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "This email is already registered"]);
    $check->close();
    $conn->close();
    exit;
}
$check->close();

// ---- Password hash ----
$hash = password_hash($password, PASSWORD_DEFAULT);

// ---- Insert user ----
$stmt = $conn->prepare("INSERT INTO users (name, phone, email, password) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $phone, $email, $hash);

if ($stmt->execute()) {
    $newId = $conn->insert_id;

    // Session save (dashboard ke liye)
    $_SESSION['user_id']    = $newId;
    $_SESSION['user_name']  = $name;
    $_SESSION['user_email'] = $email;

    // Success response JSON
    echo json_encode([
        "success" => true,
        "message" => "Signup successful",
        "user" => [
            "id"    => $newId,
            "name"  => $name,
            "email" => $email
        ]
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Insert failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>