<?php

include "dp.php";

session_start();

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    echo json_encode([
        "status" => false,
        "message" => "Invalid request"
    ]);

    exit;
}

if (!isset($_POST["design_id"])) {

    echo json_encode([
        "status" => false,
        "message" => "Design ID is required"
    ]);

    exit;
}

$design_id = intval($_POST["design_id"]);

/* Step 1: mark the design as confirmed (unchanged from original) */

$sql = "UPDATE designs
        SET status = 'confirmed'
        WHERE id = ?";

$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, "i", $design_id);

if (!mysqli_stmt_execute($stmt)) {

    echo json_encode([
        "status" => false,
        "message" => "Design could not be confirmed"
    ]);

    mysqli_stmt_close($stmt);
    mysqli_close($conn);
    exit;
}

mysqli_stmt_close($stmt);

/*
   Step 2: create (or re-use) a share token.

   UPDATED: the "designs" table already has its own "share_token" and
   "is_shared" columns, so we use those directly instead of a separate
   "design_shares" table (which would have meant two different places
   storing the same information).
*/

$sqlCheck = "SELECT share_token FROM designs WHERE id = ? LIMIT 1";
$stmtCheck = mysqli_prepare($conn, $sqlCheck);
mysqli_stmt_bind_param($stmtCheck, "i", $design_id);
mysqli_stmt_execute($stmtCheck);
$resCheck = mysqli_stmt_get_result($stmtCheck);
$rowCheck = mysqli_fetch_assoc($resCheck);
mysqli_stmt_close($stmtCheck);

$share_token = $rowCheck ? $rowCheck["share_token"] : null;

if (!$share_token) {

    $share_token = bin2hex(random_bytes(16));

    $sqlUpdate = "UPDATE designs SET share_token = ?, is_shared = 1 WHERE id = ?";
    $stmtUpdate = mysqli_prepare($conn, $sqlUpdate);
    mysqli_stmt_bind_param($stmtUpdate, "si", $share_token, $design_id);
    mysqli_stmt_execute($stmtUpdate);
    mysqli_stmt_close($stmtUpdate);

} else {

    // Token already existed — just make sure is_shared is set.
    $sqlUpdate = "UPDATE designs SET is_shared = 1 WHERE id = ?";
    $stmtUpdate = mysqli_prepare($conn, $sqlUpdate);
    mysqli_stmt_bind_param($stmtUpdate, "i", $design_id);
    mysqli_stmt_execute($stmtUpdate);
    mysqli_stmt_close($stmtUpdate);
}

$share_link = "http://localhost/interiorcraft/view_design.php?token=" . $share_token;

echo json_encode([
    "status" => true,
    "message" => "Design confirmed successfully",
    "design_id" => $design_id,
    "share_token" => $share_token,
    "share_link" => $share_link
]);

mysqli_close($conn);

?>