<?php

include "dp.php";

header("Content-Type: application/json");

if (!isset($_GET["design_id"])) {

    echo json_encode([
        "status" => false,
        "message" => "Design ID is required"
    ]);

    exit;
}

$design_id = intval($_GET["design_id"]);

$sql = "SELECT 
            di.id,
            di.design_id,
            di.furniture_id,

            di.pos_x,
            di.pos_y,
            di.pos_z,

            di.rotation_x,
            di.rotation_y,
            di.rotation_z,

            di.item_width,
            di.item_depth,
            di.item_height,

            f.name,
            f.image

        FROM design_furniture di

        INNER JOIN furniture f
        ON di.furniture_id = f.id

        WHERE di.design_id = ?";

$stmt = $conn->prepare($sql);

if (!$stmt) {

    echo json_encode([
        "status" => false,
        "message" => "SQL Error: " . $conn->error
    ]);

    exit;
}

$stmt->bind_param("i", $design_id);

$stmt->execute();

$result = $stmt->get_result();

$furniture = [];

while ($row = $result->fetch_assoc()) {

    $furniture[] = $row;

}

echo json_encode([
    "status" => true,
    "design_id" => $design_id,
    "items" => $furniture
]);

$stmt->close();
$conn->close();

?>