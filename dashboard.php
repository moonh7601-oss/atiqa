<?php
session_start();
include("dp.php");

// Login check
if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit;
}

// User data database se laao
$user_id = $_SESSION['user_id'];
$stmt = $conn->prepare("SELECT name, email FROM users WHERE id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    session_destroy();
    header("Location: login.html");
    exit;
}

$user = $result->fetch_assoc();
$user_name  = $user['name'];
$user_email = $user['email'];
$first_name = explode(' ', trim($user_name))[0];

$stmt->close();
$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard | Interior Design Studio</title>
  <link rel="stylesheet" href="Dsidebar.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
</head>
<body>

  <!-- ================= SIDEBAR ================= -->
  <section class="Dash-sidebar">
    <div class="logo">
      <i class="fa-solid fa-house"></i>
      <div class="logo-text">
        <h2>Interior</h2>
        <span>Design Studio</span>
      </div>
    </div>

    <input type="file" id="realFileInput" accept="img/*" hidden>

    <div class="menu">
      <a href="dashboard.php" class="active"><i class="fa-solid fa-table-columns"></i> Dashboard</a>
      <a href="#" onclick="goToStylePage()"><i class="fa-solid fa-house"></i> Home Design</a>
      <a href="#" onclick="goToOfficeStylePage()"><i class="fa-solid fa-building"></i> Office Design</a>
      <a href="#" onclick="goToUploadPage()"><i class="fa-solid fa-image"></i> Upload Image</a>
      <a href="#" onclick="goToAIPage()"><i class="fa-solid fa-robot"></i> AI Assistant</a>
      <a href="#"><i class="fa-solid fa-folder"></i> My Projects</a>
      <a href="#"><i class="fa-solid fa-heart"></i> Favorites</a>
      <a href="#"><i class="fa-solid fa-gear"></i> Settings</a>
    </div>
  </section>

  <div class="sidebar-overlay" onclick="toggleSidebar()"></div>

  <!-- ================= MAIN ================= -->
  <div class="main">

    <section class="topbar">
      <div class="left">
        <button class="hamburger" onclick="toggleSidebar()" aria-label="Open menu">
          <i class="fa-solid fa-bars"></i>
        </button>
        <div>
          <h1>Welcome, <span id="userName"><?php echo htmlspecialchars($first_name); ?></span>!</h1>
          <p>What would you like to design?</p>
        </div>
      </div>

      <div class="right">
        <div class="search-box"></div>

        <div class="notification">
          <i class="fa-regular fa-bell"></i>
          <span>3</span>
        </div>

        <div class="profile" id="profileBtn">
          <img src="https://i.pravatar.cc/100" alt="Profile">
          <i class="fa-solid fa-chevron-down"></i>

          <div class="profile-dropdown" id="profileDropdown">
            <div class="dropdown-head">
              <img src="https://i.pravatar.cc/100" alt="Profile">
              <div>
                <strong id="dropName"><?php echo htmlspecialchars($user_name); ?></strong>
                <small id="dropEmail"><?php echo htmlspecialchars($user_email); ?></small>
              </div>
            </div>
            <div class="dropdown-divider"></div>
            <button type="button" class="dropdown-item logout" onclick="logout()">
              <i class="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= CARDS ================= -->
    <section class="cards">

      <!-- Card 1: Home Design -->
      <div class="card">
        <img src="img/home.jpg">
        <div class="content">
          <div class="icon green"><i class="fa-solid fa-house"></i></div>
          <h2>Home Design</h2>
          <p>Design your dream home</p>
          <ul class="feature">
            <li><i class="fa-solid fa-circle-check"></i> Bedroom</li>
            <li><i class="fa-solid fa-circle-check"></i> Kitchen</li>
            <li><i class="fa-solid fa-circle-check"></i> Living Room</li>
            <li><i class="fa-solid fa-circle-check"></i> Anything Else</li>
          </ul>
          <button class="btn green" onclick="goToStylePage()">
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <!-- Card 2: Office Design -->
      <div class="card">
        <img src="img/office.jpg">
        <div class="content">
          <div class="icon blue"><i class="fa-solid fa-building"></i></div>
          <h2>Office Design</h2>
          <p>Create productive and modern office space</p>
          <ul class="feature">
            <li><i class="fa-solid fa-circle-check"></i> Workspace</li>
            <li><i class="fa-solid fa-circle-check"></i> Cabin</li>
            <li><i class="fa-solid fa-circle-check"></i> Conference Room</li>
            <li><i class="fa-solid fa-circle-check"></i> Anything Else</li>
          </ul>
          <button class="btn blue" onclick="goToOfficeStylePage()">
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <!-- Card 3: Upload Images -->
      <div class="card">
        <img src="img/upload image.png" id="previewImage">
        <div class="content">
          <div class="icon purple"><i class="fa-regular fa-image"></i></div>
          <h2>Upload Images</h2>
          <p>Upload your room image and get AI suggestion</p>
          <ul class="feature">
            <li><i class="fa-solid fa-circle-check"></i> Upload Images</li>
            <li><i class="fa-solid fa-circle-check"></i> AI suggestion</li>
            <li><i class="fa-solid fa-circle-check"></i> Redesign Room</li>
          </ul>
          <button class="btn purple" onclick="goToUploadPage()">
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <!-- Card 4: AI Assistant -->
      <div class="card">
        <img src="img/ai.png">
        <div class="content">
          <div class="icon orange"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
          <h2>AI Design Assistant</h2>
          <p>Describe your dream design and AI will create it.</p>
          <ul class="feature">
            <li><i class="fa-solid fa-circle-check"></i> Text To Design</li>
            <li><i class="fa-solid fa-circle-check"></i> AI Ideas</li>
            <li><i class="fa-solid fa-circle-check"></i> Customize Design</li>
          </ul>
          <button class="btn orange" onclick="goToAIPage()">
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

    </section>
  </div>

  <script>
    function goToStylePage(){
      window.location.href = "interir-style.html";
    }
    function goToUploadPage(){
      window.location.href = "uimage.html";
    }
   function goToAIPage(){
  window.location.href = "AI.html";
}
    function goToOfficeStylePage(){
      window.location.href = "office-style.html";
    }
    function logout(){
      window.location.href = "logout.php";
    }
  </script>
  <script src="Dsidebar.js"></script>
</body>
</html>