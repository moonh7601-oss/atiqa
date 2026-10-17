// ==============================
// CONFIG
// ==============================
const BACKEND_URL = "generated2_imagedesign.php";

// ==============================
// ELEMENTS
// ==============================
const fileInput = document.getElementById("fileInput");
const previewImage = document.getElementById("previewImage");
const placeholder = document.getElementById("placeholder");
const promptBox = document.getElementById("prompt");
const resultImage = document.getElementById("resultImage");
const resultIcon = document.querySelector(".result-icon");
const resultText = document.querySelector(".result-text");
const generateBtn = document.querySelector(".generate-btn");
const actionButtons = document.getElementById("actionButtons");

let selectedFile = null;

function openExplorer() {
  fileInput.click();
}

fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];
  if (!file) return;
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    alert("Only JPG, PNG and WEBP images are allowed.");
    fileInput.value = "";
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    alert("Image must be less than 10 MB.");
    fileInput.value = "";
    return;
  }
  selectedFile = file;
  const reader = new FileReader();
  reader.onload = function (e) {
    previewImage.src = e.target.result;
    previewImage.style.display = "block";
    placeholder.style.display = "none";
  };
  reader.readAsDataURL(file);
});

function removeImage(event) {
  event.stopPropagation();
  selectedFile = null;
  fileInput.value = "";
  previewImage.src = "";
  previewImage.style.display = "none";
  placeholder.style.display = "flex";
}

function setPrompt(text) {
  if (promptBox.value.trim() === "") {
    promptBox.value = text;
  } else {
    promptBox.value += ", " + text;
  }
}

async function generateDesign() {
  if (!selectedFile) {
    alert("Please upload a room image first.");
    return;
  }
  const promptValue = promptBox.value.trim();
  const formData = new FormData();
  formData.append("room_image", selectedFile);
  formData.append("prompt", promptValue);
  setLoadingState(true);
  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      body: formData
    });
    const data = await response.json();
    if (!data.success) {
      let fullMessage = data.message || "Design generation failed. Please try again.";
      if (data.database_error) {
        fullMessage += "\n\nDatabase error: " + data.database_error;
      }
      console.error("Backend error:", data);
      alert(fullMessage);
      setLoadingState(false);
      return;
    }
    resultImage.src = data.generated_image + "?t=" + Date.now();
    resultImage.style.display = "block";
    resultIcon.style.display = "none";
    resultText.style.display = "none";
    if (actionButtons) {
      actionButtons.style.display = "block";
    }
  } catch (err) {
    console.error(err);
    alert("Could not connect to the server. Please try again.");
  } finally {
    setLoadingState(false);
  }
}

// ==============================
// DOWNLOAD DESIGN - FINAL FIXED 100%
// ==============================
async function downloadDesign() {
  if (!resultImage.src || resultImage.style.display === "none") {
    alert("Pehle design generate karo!");
    return;
  }
  try {
    const cleanUrl = resultImage.src.split('?')[0];
    const response = await fetch(cleanUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "AI-Design-" + Date.now() + ".jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error("Download failed:", err);
    window.open(resultImage.src, '_blank');
  }
}

function setLoadingState(isLoading) {
  if (isLoading) {
    generateBtn.disabled = true;
    generateBtn.dataset.originalText = generateBtn.innerHTML;
    generateBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';
  } else {
    generateBtn.disabled = false;
    if (generateBtn.dataset.originalText) {
      generateBtn.innerHTML = generateBtn.dataset.originalText;
    }
  }
}

function goToDashboard() {
  window.location.href = "dashboard.html";
}