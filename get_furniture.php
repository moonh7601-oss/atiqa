<?php

include "dp.php";

$sql = "SELECT id, name, image FROM furniture ORDER BY id DESC";

$result = $conn->query($sql);

$furniture = [];

if ($result) {

    while ($row = $result->fetch_assoc()) {
        $furniture[] = $row;
    }

}

header("Content-Type: application/json");

echo json_encode([
    "status" => true,
    "data" => $furniture
]);

$conn->close();

?>