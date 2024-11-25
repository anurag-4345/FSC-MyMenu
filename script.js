// Elements
const homeScreen = document.getElementById("home-screen");
const thankYouScreen = document.getElementById("thank-you-screen");
const scanQRButton = document.getElementById("scan-qr");
const closeCameraButton = document.getElementById("close-camera");
const cameraContainer = document.getElementById("camera-container");
const qrReaderDiv = document.getElementById("qr-reader");
const form = document.getElementById("onboarding-form");
const errorMessage = document.getElementById("error-message");

// Global variable to store QR code data
let qrCodeData = null;

// Initialize QR Code scanner
let html5QrCode = null;

// Function to start QR scanning
function startQRScanner() {
  qrCodeData = null;
  cameraContainer.classList.remove("hidden"); // Show the camera container

  // Initialize the QR scanner
  if (!html5QrCode) {
    html5QrCode = new Html5Qrcode("qr-reader");
  }

  // Start scanning
  html5QrCode
    .start(
      { facingMode: "environment" }, // Back camera
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      (decodedText) => {
        // Success callback
        qrCodeData = decodedText;
        alert(`QR Code Scanned: ${decodedText}`);
        scanQRButton.textContent = "QR Scanned!";
        scanQRButton.style.backgroundColor = "#34a853";
        stopQRScanner(); // Stop after successful scan
      },
      (error) => {
        console.error("QR Scan Error:", error); // Optional error handling
      }
    )
    .catch((err) => {
      console.error("Error starting QR scanner:", err);
      showError("Camera access is required to scan QR codes.");
    });
}

// Function to stop QR scanning
function stopQRScanner() {
  if (html5QrCode) {
    html5QrCode.stop().then(() => {
      cameraContainer.classList.add("hidden"); // Hide the camera container
    });
  }
}

// Show error messages
function showError(message) {
  errorMessage.textContent = message;
}

// Handle form submission
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  if (!qrCodeData) {
    showError("Please scan a QR code before submitting.");
    return;
  }

  // Simulate API call
  try {
    const response = await sendToAPI({ name, phone, qrCode: qrCodeData });
    console.log(response);
    showThankYouScreen();
  } catch (error) {
    showError("Failed to submit the data. Please try again.");
  }
});

// Simulated API call
function sendToAPI(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate
      success ? resolve("API Success") : reject("API Error");
    }, 1000);
  });
}

// Show the thank you screen
function showThankYouScreen() {
  homeScreen.classList.add("hidden");
  thankYouScreen.classList.remove("hidden");
}

// Reset to home screen
function resetToHome() {
  qrCodeData = null;
  scanQRButton.textContent = "Scan QR";
  scanQRButton.style.backgroundColor = "#fbbc04"
  thankYouScreen.classList.add("hidden");
  homeScreen.classList.remove("hidden");
  errorMessage.textContent = "";
}

// Back to home button
document.getElementById("back-home-button").addEventListener("click", resetToHome);

// QR button event listener
scanQRButton.addEventListener("click", () => {
  startQRScanner();
});

// Close camera button
closeCameraButton.addEventListener("click", () => {
  stopQRScanner();
});