<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "interiorcraft";

$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}

$conn->set_charset("utf8mb4");
?>