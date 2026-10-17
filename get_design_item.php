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

/*
   FIX: original query used table "design_items" which does not
   exist in the database (phpMyAdmin shows "design_furniture").
   Also aliased columns f.furniture_name / f.category_name which
   don't exist on the "furniture" table (get_furniture.php shows
   the table only has id, name, image). Corrected below to match
   get_design.php's schema so this endpoint actually runs.
*/

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
            f.name AS furniture_name,
            f.image
        FROM design_furniture di
        LEFT JOIN furniture f
        ON di.furniture_id = f.id
        WHERE di.design_id = ?";

$stmt = mysqli_prepare($conn, $sql);

if (!$stmt) {
    echo json_encode([
        "status" => false,
        "message" => "SQL Error: " . mysqli_error($conn)
    ]);
    exit;
}

mysqli_stmt_bind_param($stmt, "i", $design_id);

mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

$items = [];

while ($row = mysqli_fetch_assoc($result)) {

    $items[] = $row;

}

echo json_encode([
    "status" => true,
    "design_id" => $design_id,
    "items" => $items
]);

mysqli_stmt_close($stmt);
mysqli_close($conn);

?>