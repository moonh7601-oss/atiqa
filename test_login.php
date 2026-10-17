<?php
session_start();
include("dp.php");

echo "<h2>Login Test</h2>";

// Form submit hua?
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    
    echo "<p>Email: " . htmlspecialchars($email) . "</p>";
    
    // User dhoondein
    $stmt = $conn->prepare("SELECT id, name, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        echo "<p style='color:red;'>❌ User not found</p>";
    } else {
        $row = $result->fetch_assoc();
        
        if (password_verify($password, $row['password'])) {
            // Session save
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['user_name'] = $row['name'];
            $_SESSION['user_email'] = $email;
            
            echo "<p style='color:green;'>✅ Session saved! ID = " . $row['id'] . "</p>";
            echo "<pre>";
            print_r($_SESSION);
            echo "</pre>";
            echo "<p><a href='check_session.php'>Check session again</a></p>";
        } else {
            echo "<p style='color:red;'>❌ Wrong password</p>";
        }
    }
    $stmt->close();
} else {
    // Form dikhao
    ?>
    <form method="POST">
        <input type="email" name="email" placeholder="Email" value="test@test.com" required>
        <br><br>
        <input type="password" name="password" placeholder="Password" value="Test@1234" required>
        <br><br>
        <button type="submit">Test Login</button>
    </form>
    <?php
}
?>