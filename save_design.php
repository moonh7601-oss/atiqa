<?php

include "dp.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "status" => false,
        "message" => "No data received"
    ]);
    exit;
}

$user_id = $data["user_id"];
$room_id = $data["room_id"];

$furniture_items = $data["furniture"];

if (empty($user_id) || empty($room_id)) {
    echo json_encode([
        "status" => false,
        "message" => "User ID and Room ID are required"
    ]);
    exit;
}

$conn->begin_transaction();

try {

    // Save main design
    $stmt = $conn->prepare(
        "INSERT INTO designs (user_id, room_id) VALUES (?, ?)"
    );

    $stmt->bind_param("ii", $user_id, $room_id);

    $stmt->execute();

    $design_id = $conn->insert_id;

    $stmt->close();


    // Save furniture used in design
    $stmt = $conn->prepare(
        "INSERT INTO design_furniture
        (design_id, furniture_id, position_x, position_y, rotation)
        VALUES (?, ?, ?, ?, ?)"
    );

    foreach ($furniture_items as $item) {

        $furniture_id = $item["furniture_id"];
        $position_x = $item["position_x"];
        $position_y = $item["position_y"];
        $rotation = $item["rotation"];

        $stmt->bind_param(
            "iiddd",
            $design_id,
            $furniture_id,
            $position_x,
            $position_y,
            $rotation
        );

        $stmt->execute();
    }

    $stmt->close();

    $conn->commit();

    echo json_encode([
        "status" => true,
        "message" => "Design saved successfully",
        "design_id" => $design_id
    ]);

} catch (Exception $e) {

    $conn->rollback();

    echo json_encode([
        "status" => false,
        "message" => "Design could not be saved"
    ]);
}

$conn->close();

?>
{
    "user_id": 1,
    "room_id": 2,
    "furniture": [
        {
            "furniture_id": 1,
            "position_x": 150,
            "position_y": 200,
            "rotation": 0
        },
        {
            "furniture_id": 3,
            "position_x": 300,
            "position_y": 250,
            "rotation": 45
        }
    ]
}