<?php

include "dp.php";

if (isset($_GET['style_id']) && isset($_GET['room_id'])) {

    $style_id = intval($_GET['style_id']);
    $room_id = intval($_GET['room_id']);

    $sql = "INSERT INTO designs (room_id, style_id)
            VALUES ('$room_id', '$style_id')";

    if (mysqli_query($conn, $sql)) {

        $design_id = mysqli_insert_id($conn);

        header("Location: design.php?id=$design_id");
        exit();

    } else {

        echo "Error: " . mysqli_error($conn);

    }

} else {

    echo "Room or Style not selected.";

}

?>