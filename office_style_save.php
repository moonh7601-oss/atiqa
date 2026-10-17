<?php

session_start();

$conn = mysqli_connect("localhost", "root", "", "interiorcraft");

if (!$conn) {
    die("Database connection failed");
}

if (isset($_POST['style_id'])) {

    $style_id = $_POST['style_id'];

    // Login user ki ID
    $user_id = $_SESSION['user_id'];

    $sql = "INSERT INTO user_office_designs 
            (user_id, style_id)
            VALUES ('$user_id', '$style_id')";

    if (mysqli_query($conn, $sql)) {

        header("Location: office-furniture.php");
        exit();

    } else {

        echo "Style save nahi hua.";

    }

}

?>