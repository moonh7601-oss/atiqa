<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

include("dp.php");   // interiorcraft database

$email    = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

if ($email === '' || $password === '') {
    echo json_encode(["success" => false, "message" => "Email and password required"]);
    exit;
}

// User dhoondein
$stmt = $conn->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "User not found. Please sign up first."]);
    $stmt->close();
    $conn->close();
    exit;
}

$row = $result->fetch_assoc();

// Password verify
if (!password_verify($password, $row['password'])) {
    echo json_encode(["success" => false, "message" => "Wrong password. Please try again."]);
    $stmt->close();
    $conn->close();
    exit;
}

// Session save
$_SESSION['user_id']    = $row['id'];
$_SESSION['user_name']  = $row['name'];
$_SESSION['user_email'] = $row['email'];

echo json_encode([
    "success" => true,
    "message" => "Login successful",
    "user" => [
        "id"    => $row['id'],
        "name"  => $row['name'],
        "email" => $row['email']
    ]
]);

$stmt->close();
$conn->close();
?>