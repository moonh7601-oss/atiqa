<?php

include("dp.php");

if (!isset($_GET['token'])) {
    die("Invalid link");
}

$token = $_GET['token'];

/* UPDATED: share_token now lives directly on "designs" (id + share_token),
   not on a separate "design_shares" table. Prepared statement used to
   avoid SQL injection. */

$sql = "SELECT id AS design_id
        FROM designs
        WHERE share_token = ?";

$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "s", $token);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($result) == 0) {
    die("Design not found");
}

$row = mysqli_fetch_assoc($result);

$design_id = $row['design_id'];

mysqli_stmt_close($stmt);

/* Get furniture items.
   FIX: table was "design_items" (doesn't exist) — corrected to
   "design_furniture" to match the database and get_design.php,
   and switched to a prepared statement. */

$sql2 = "SELECT
            di.*,
            f.name,
            f.image
        FROM design_furniture di
        LEFT JOIN furniture f
        ON di.furniture_id = f.id
        WHERE di.design_id = ?";

$stmt2 = mysqli_prepare($conn, $sql2);
mysqli_stmt_bind_param($stmt2, "i", $design_id);
mysqli_stmt_execute($stmt2);
$result = mysqli_stmt_get_result($stmt2);

?>

<!DOCTYPE html>
<html>

<head>

<title>Shared Interior Design</title>

<style>

body {
    font-family: Arial;
    background: #f5f5f5;
}

.container {
    width: 90%;
    margin: 40px auto;
}

.item {
    background: white;
    margin: 15px;
    padding: 20px;
    border-radius: 10px;
}

.item img {
    width: 150px;
}

</style>

</head>

<body>

<div class="container">

<h1>Interior Design</h1>

<p>Design ID: <?php echo htmlspecialchars($design_id); ?></p>

<?php

if (mysqli_num_rows($result) > 0) {

    while ($item = mysqli_fetch_assoc($result)) {

?>

<div class="item">

<h3><?php echo htmlspecialchars($item['name']); ?></h3>

<?php if (!empty($item['image'])) { ?>

<img src="<?php echo htmlspecialchars($item['image']); ?>">

<?php } ?>

<p>
Position:
<?php echo htmlspecialchars($item['pos_x']); ?>,
<?php echo htmlspecialchars($item['pos_y']); ?>,
<?php echo htmlspecialchars($item['pos_z']); ?>
</p>

</div>

<?php

    }

} else {

    echo "<p>No furniture found in this design.</p>";

}

mysqli_stmt_close($stmt2);
mysqli_close($conn);

?>

</div>

</body>

</html>