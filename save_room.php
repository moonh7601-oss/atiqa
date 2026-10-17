<?php /*

include "dp.php";

if (isset($_GET['id'])) {

    $room_id = $_GET['id'];

    $sql = "SELECT * FROM rooms WHERE id = $room_id";

    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {

        $room = mysqli_fetch_assoc($result);

        echo "<h1>You Selected: " . $room['room_name'] . "</h1>";

        echo "<p>" . $room['description'] . "</p>";

        echo "<br>";

        echo "<a href='room.php'>Back to Rooms</a>";

    } else {

        echo "Room not found.";

    }

} else {

    echo "No room selected.";

}

*/?><?php

include "dp.php";

if (isset($_GET['id'])) {

    $room_id = intval($_GET['id']);

    // Check room
    $sql = "SELECT * FROM rooms WHERE id = $room_id";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {

        // Style page par bhejo
        header("Location: style.php?room_id=" . $room_id);
        exit();

    } else {

        echo "Room not found.";

    }

} else {

    echo "No room selected.";

}

?>