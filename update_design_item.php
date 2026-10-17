<?php

include "dp.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    echo json_encode([
        "status" => false,
        "message" => "Invalid request"
    ]);

    exit;
}

if (!isset($_POST["item_id"])) {

    echo json_encode([
        "status" => false,
        "message" => "Item ID is required"
    ]);

    exit;
}

$item_id = intval($_POST["item_id"]);

$pos_x = isset($_POST["pos_x"]) ? floatval($_POST["pos_x"]) : 0;
$pos_y = isset($_POST["pos_y"]) ? floatval($_POST["pos_y"]) : 0;
$pos_z = isset($_POST["pos_z"]) ? floatval($_POST["pos_z"]) : 0;

$rotation_x = isset($_POST["rotation_x"]) ? floatval($_POST["rotation_x"]) : 0;
$rotation_y = isset($_POST["rotation_y"]) ? floatval($_POST["rotation_y"]) : 0;
$rotation_z = isset($_POST["rotation_z"]) ? floatval($_POST["rotation_z"]) : 0;

$sql = "UPDATE design_items
        SET
        pos_x = ?,
        pos_y = ?,
        pos_z = ?,
        rotation_x = ?,
        rotation_y = ?,
        rotation_z = ?
        WHERE id = ?";

$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param(
    $stmt,
    "ddddddi",
    $pos_x,
    $pos_y,
    $pos_z,
    $rotation_x,
    $rotation_y,
    $rotation_z,
    $item_id
);

if (mysqli_stmt_execute($stmt)) {

    echo json_encode([
        "status" => true,
        "message" => "Furniture position updated successfully"
    ]);

} else {

    echo json_encode([
        "status" => false,
        "message" => "Position could not be updated"
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);

?>