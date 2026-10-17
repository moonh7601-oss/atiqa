<?php

session_start();
require_once "dp.php";

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$user_id = $_SESSION['user_id'];

$message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_FILES['room_image'])) {

        $file = $_FILES['room_image'];

        $file_name = $file['name'];
        $file_tmp = $file['tmp_name'];
        $file_size = $file['size'];

        $allowed = [
            "jpg",
            "jpeg",
            "png",
            "webp"
        ];

        $extension = strtolower(
            pathinfo(
                $file_name,
                PATHINFO_EXTENSION
            )
        );

        if (!in_array($extension, $allowed)) {

            $message =
                "Only JPG, JPEG, PNG and WEBP files are allowed.";

        } elseif ($file_size > 5 * 1024 * 1024) {

            $message =
                "Image size must be less than 5MB.";

        } else {

            $new_name =
                "room_" .
                $user_id .
                "_" .
                time() .
                "." .
                $extension;

            $destination =
                "uploads/" . $new_name;

            if (move_uploaded_file(
                $file_tmp,
                $destination
            )) {

                $sql = "INSERT INTO uploaded_images
                        (user_id, image_name, image_path)
                        VALUES (?, ?, ?)";

                $stmt = $conn->prepare($sql);

                $stmt->bind_param(
                    "iss",
                    $user_id,
                    $file_name,
                    $destination
                );

                if ($stmt->execute()) {

                    $message =
                        "Image uploaded successfully!";

                } else {

                    $message =
                        "Database error.";

                }

            } else {

                $message =
                    "Image upload failed.";

            }
        }

    }

}

?>

<!DOCTYPE html>

<html>

<head>

<title>Upload Room Image</title>

<style>

body {
    font-family: Arial;
    background: #f5f5f5;
    padding: 40px;
}

.container {
    max-width: 600px;
    margin: auto;
    background: white;
    padding: 30px;
    border-radius: 15px;
}

h1 {
    text-align: center;
}

input[type="file"] {
    width: 100%;
    padding: 15px;
    margin-top: 20px;
}

button {
    width: 100%;
    padding: 12px;
    margin-top: 20px;
    background: #6255ff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.message {
    text-align: center;
    color: green;
    margin: 15px;
}

.back {
    display: block;
    text-align: center;
    margin-top: 20px;
}

</style>

</head>

<body>

<div class="container">

<h1>🖼 Upload Room Image</h1>

<?php if ($message != "") { ?>

<div class="message">

<?php echo htmlspecialchars($message); ?>

</div>

<?php } ?>


form
    method="POST"
    enctype="multipart/form-data"
>

<input
    type="file"
    name="room_image"
    accept=".jpg,.jpeg,.png,.webp"
    required
>

<button type="submit">
Upload Image
</button>

</form>


<a class="back" href="dashboard.php">
← Back to Dashboard
</a>

</div>

</body>

</html>
<?php
session_start();
include("dp.php");

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Upload Image</title>
</head>

<body>

<h1>Upload Room Image</h1>

<form action="generate_design.php" method="POST" enctype="multipart/form-data">

    <input type="file" name="room_image" accept="image/*" required>

    <br><br>

    <button type="submit" name="generate">
        Generate Design
    </button>

</form>

<br>

<a href="dashboard.php">Back to Dashboard</a>

</body>
</html>