<?php
session_start();

echo "<h2>Session Check</h2>";
echo "<pre>";
print_r($_SESSION);
echo "</pre>";

if (isset($_SESSION['user_id'])) {
    echo "<p style='color:green;'>✅ User logged in: ID = " . $_SESSION['user_id'] . "</p>";
    echo "<p><a href='generate_design.php'>Go to generate_design.php</a></p>";
} else {
    echo "<p style='color:red;'>❌ No session found. Please login first.</p>";
    echo "<p><a href='login.html'>Go to Login</a></p>";
}
?>