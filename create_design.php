<?php
/*
   NEW FILE.
   Called automatically by design-connect.js when the page is opened
   without a ?design_id= in the URL (e.g. coming from room-select.html
   which currently doesn't create one). Creates a new row in "designs"
   with status 'draft' and returns its id, so the rest of the app
   (save, confirm, share) has something to attach to.
*/

include "dp.php";

header("Content-Type: application/json");

$sql = "INSERT INTO designs (status) VALUES ('draft')";

if (mysqli_query($conn, $sql)) {

    echo json_encode([
        "status" => true,
        "design_id" => mysqli_insert_id($conn)
    ]);

} else {

    echo json_encode([
        "status" => false,
        "message" => "Could not create design: " . mysqli_error($conn)
    ]);
}

mysqli_close($conn);
?>