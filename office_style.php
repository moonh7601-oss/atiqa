<?php
header("Content-Type: application/json; charset=UTF-8");
include "dp.php"; 

$sql = "SELECT id, style_name, description, image FROM office_styles ORDER BY id";
$result = mysqli_query($conn, $sql);

if (!$result) {
    echo json_encode(["error" => mysqli_error($conn)]);
    exit;
}

$styles = [];
while ($row = mysqli_fetch_assoc($result)) {
    $styles[] = $row;
}

echo json_encode($styles);
mysqli_close($conn);
?>