<?php

session_start();
require_once "dp.php";

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}
?>
<a href="room.php" class="option">
    Design Yourself
</a>

<?$user_id = $_SESSION['user_id'];

$message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $project_name = $_POST['project_name'];
    $room_type = $_POST['room_type'];
    $description = $_POST['description'];

    $sql = "INSERT INTO projects
            (user_id, project_name, design_type, room_type, description)
            VALUES (?, ?, 'Home', ?, ?)";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param(
        "isss",
        $user_id,
        $project_name,
        $room_type,
        $description
    );

    if ($stmt->execute()) {

        $message = "Home project successfully saved!";

    } else {

        $message = "Error: " . $conn->error;

    }
}

?>

<!DOCTYPE html>

<html>

<head>

<title>Home Design</title>

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

label {
    display: block;
    margin-top: 15px;
}

input,
select,
textarea {
    width: 100%;
    padding: 12px;
    margin-top: 7px;
    box-sizing: border-box;
}

textarea {
    height: 120px;
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
    margin-bottom: 15px;
}

.back {
    display: block;
    margin-top: 20px;
    text-align: center;
}

</style>

</head>

<body>

<div class="container">

<h1>🏠 Home Design</h1>

<?php if ($message != "") { ?>

<div class="message">
    <?php echo htmlspecialchars($message); ?>
</div>

<?php } ?>


<form method="POST">

<label>
Project Name
</label>

<input
    type="text"
    name="project_name"
    placeholder="Enter project name"
    required
>


<label>
Room Type
</label>

<select name="room_type" required>

<option value="">
Select Room
</option>

<option value="Living Room">
Living Room
</option>

<option value="Bedroom">
Bedroom
</option>

<option value="Kitchen">
Kitchen
</option>

<option value="Bathroom">
Bathroom
</option>

<option value="Dining Room">
Dining Room
</option>

<option value="Other">
Other
</option>

</select>


<label>
Design Description
</label>

<textarea
    name="description"
    placeholder="Describe your dream room..."
></textarea>


<button type="submit">
Create Home Project
</button>

</form>


<a class="back" href="dashboard.php">
← Back to Dashboard
</a>

</div>

</body>

</html>