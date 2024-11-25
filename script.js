// Elements
const homeScreen = document.getElementById("home-screen");
const thankYouScreen = document.getElementById("thank-you-screen");
const scanQRButton = document.getElementById("scan-qr");
const closeCameraButton = document.getElementById("close-camera");
const cameraContainer = document.getElementById("camera-container");
const qrReaderDiv = document.getElementById("qr-reader");
const form = document.getElementById("onboarding-form");
const errorMessage = document.getElementById("error-message"); // Inline error message element

// Global variable to store QR code data
let qrCodeData = null;

// Initialize the QR scanner
let html5QrCode = null;

// Function to start QR scanner
function startQRScanner() {
  cameraContainer.classList.remove("hidden"); // Show camera container
  qrCodeData = null; // Reset QR code data

  if (!html5QrCode) {
    html5QrCode = new Html5Qrcode("qr-reader");
  }

  // Start scanning
  html5QrCode
    .start(
      { facingMode: "environment" }, // Use the back camera
      {
        fps: 10, // Frames per second
        qrbox: { width: 250, height: 250 }, // Scanning box
      },
      (decodedText) => {
        // Success callback
        qrCodeData = decodedText; // Store the scanned QR code data
        alert(`QR Code Scanned: ${decodedText}`);
        scanQRButton.textContent = "QR Scanned!";
        scanQRButton.style.backgroundColor = "#34a853"; // Indicate success
        stopQRScanner(); // Stop the scanner after a successful scan
      },
      (errorMessage) => {
        console.log(`QR Scan Error: ${errorMessage}`); // Handle scan errors (optional)
      }
    )
    .catch((err) => {
      console.error(`Error starting QR scanner: ${err}`);
      showError("Camera access denied or unavailable.");
    });
}

// Function to stop the QR scanner
function stopQRScanner() {
  if (html5QrCode) {
    html5QrCode.stop().then(() => {
      cameraContainer.classList.add("hidden"); // Hide camera container
    });
  }
}

// Function to show error messages
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.color = "red";
}

// Event: Click "Scan QR" button
scanQRButton.addEventListener("click", () => {
  startQRScanner(); // Start the QR scanner
});

// Event: Close camera button
closeCameraButton.addEventListener("click", () => {
  stopQRScanner(); // Stop the scanner and close the camera
});

// Event: Form submission
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  if (!qrCodeData) {
    showError("Error: Please scan the QR code before submitting.");
    return;
  }

  try {
    // Simulate API call
    const response = await sendToAPI({ name, phone, qrCode: qrCodeData });
    console.log(response);
    showThankYouScreen();
  } catch (error) {
    showError("Error submitting data. Please try again.");
  }
});

// Mock API call
function sendToAPI(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% chance of success
      success ? resolve("API Success") : reject("API Error");
    }, 1000);
  });
}

// Show Thank You screen
function showThankYouScreen() {
  homeScreen.classList.add("hidden");
  thankYouScreen.classList.remove("hidden");
}

// Reset to Home screen
function resetToHome() {
  qrCodeData = null;
  scanQRButton.textContent = "Scan QR";
  scanQRButton.style.backgroundColor = "#fbbc04";
  thankYouScreen.classList.add("hidden");
  homeScreen.classList.remove("hidden");
  errorMessage.textContent = "";
}

// Event: Back to Home button
document.getElementById("back-home-button").addEventListener("click", resetToHome);
