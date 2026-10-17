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

$sql = "DELETE FROM design_items WHERE id = ?";

$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, "i", $item_id);

if (mysqli_stmt_execute($stmt)) {

    echo json_encode([
        "status" => true,
        "message" => "Furniture deleted successfully"
    ]);

} else {

    echo json_encode([
        "status" => false,
        "message" => "Furniture could not be deleted"
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);

?>