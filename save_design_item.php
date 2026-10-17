<?php
/*
   NEW FILE — did not exist before.

   Without this, there was NO way for the app to write a placed
   furniture item back into "design_furniture". get_design.php could
   only READ items, confirm_design.php only changed status. This file
   closes that gap: it INSERTs a new item, UPDATEs an existing one
   (pass "id"), or DELETEs one (action=delete).

   Whatever script currently drags furniture onto the canvas
   (design.js / threeview.js — not included in what was uploaded)
   should call this file, e.g.:

   fetch('save_design_item.php', {
       method: 'POST',
       headers: {'Content-Type':'application/x-www-form-urlencoded'},
       body: new URLSearchParams({
           design_id, furniture_id, pos_x, pos_y, pos_z,
           rotation_x, rotation_y, rotation_z,
           item_width, item_depth, item_height
       })
   });
*/

include "dp.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => false, "message" => "Invalid request"]);
    exit;
}

$action = $_POST["action"] ?? "save";

// ---------------- DELETE ----------------
if ($action === "delete") {

    if (!isset($_POST["id"])) {
        echo json_encode(["status" => false, "message" => "id is required to delete"]);
        exit;
    }

    $id = intval($_POST["id"]);

    $sql = "DELETE FROM design_furniture WHERE id = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "i", $id);

    $ok = mysqli_stmt_execute($stmt);

    echo json_encode(["status" => $ok, "message" => $ok ? "Item deleted" : "Delete failed"]);

    mysqli_stmt_close($stmt);
    mysqli_close($conn);
    exit;
}

// ------------- SAVE (insert or update) -------------

if (!isset($_POST["design_id"]) || !isset($_POST["furniture_id"])) {
    echo json_encode(["status" => false, "message" => "design_id and furniture_id are required"]);
    exit;
}

$design_id    = intval($_POST["design_id"]);
$furniture_id = intval($_POST["furniture_id"]);

$pos_x = floatval($_POST["pos_x"] ?? 0);
$pos_y = floatval($_POST["pos_y"] ?? 0);
$pos_z = floatval($_POST["pos_z"] ?? 0);

$rotation_x = floatval($_POST["rotation_x"] ?? 0);
$rotation_y = floatval($_POST["rotation_y"] ?? 0);
$rotation_z = floatval($_POST["rotation_z"] ?? 0);

$item_width  = floatval($_POST["item_width"]  ?? 0);
$item_depth  = floatval($_POST["item_depth"]  ?? 0);
$item_height = floatval($_POST["item_height"] ?? 0);

$id = isset($_POST["id"]) ? intval($_POST["id"]) : null;

if ($id) {

    // UPDATE existing placed item
    $sql = "UPDATE design_furniture SET
                pos_x = ?, pos_y = ?, pos_z = ?,
                rotation_x = ?, rotation_y = ?, rotation_z = ?,
                item_width = ?, item_depth = ?, item_height = ?
            WHERE id = ?";

    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param(
        $stmt, "dddddddddi",
        $pos_x, $pos_y, $pos_z,
        $rotation_x, $rotation_y, $rotation_z,
        $item_width, $item_depth, $item_height,
        $id
    );

} else {

    // INSERT a new placed item
    $sql = "INSERT INTO design_furniture
                (design_id, furniture_id, pos_x, pos_y, pos_z,
                 rotation_x, rotation_y, rotation_z,
                 item_width, item_depth, item_height)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param(
        $stmt, "iiddddddddd",
        $design_id, $furniture_id,
        $pos_x, $pos_y, $pos_z,
        $rotation_x, $rotation_y, $rotation_z,
        $item_width, $item_depth, $item_height
    );
}

if (!$stmt) {
    echo json_encode(["status" => false, "message" => "SQL Error: " . mysqli_error($conn)]);
    exit;
}

$ok = mysqli_stmt_execute($stmt);

echo json_encode([
    "status"      => $ok,
    "message"     => $ok ? "Saved" : "Save failed: " . mysqli_stmt_error($stmt),
    "id"          => $id ? $id : mysqli_insert_id($conn),
    "design_id"   => $design_id,
    "furniture_id"=> $furniture_id
]);

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>