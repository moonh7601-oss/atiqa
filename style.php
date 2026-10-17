<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

include "dp.php"; // database connection

$sql = "SELECT * FROM styles";
$result = mysqli_query($conn, $sql);

if (!$result) {
    http_response_code(500);
    echo json_encode(["error" => mysqli_error($conn)]);
    exit;
}

$styles = [];
while ($row = mysqli_fetch_assoc($result)) {
    $styles[] = $row;
}

echo json_encode($styles);
?>