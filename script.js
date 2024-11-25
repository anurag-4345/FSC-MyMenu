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

// Show the camera container and start QR code scanning
function startQRScanner() {
  cameraContainer.classList.remove("hidden"); // Show camera container
  qrCodeData = null; // Reset QR code data

  // Initialize the html5-qrcode scanner
  if (!html5QrCode) {
    html5QrCode = new Html5Qrcode("qr-reader"); // Use the `qr-reader` div for the camera feed
  }

  // Start scanning with the camera
  html5QrCode
    .start(
      { facingMode: "environment" }, // Use the back camera
      {
        fps: 10, // Frames per second
        qrbox: 250, // Set scanning box size
      },
      (decodedText) => {
        // Success callback
        qrCodeData = decodedText; // Store the scanned QR code data
        alert(`QR Code Scanned: ${decodedText}`);
        scanQRButton.textContent = "QR Scanned!";
        scanQRButton.style.backgroundColor = "#34a853"; // Indicate success
        errorMessage.textContent = ""; // Clear any previous error
        stopQRScanner(); // Stop the scanner after a successful scan
      },
      (errorMessage) => {
        console.log(`QR Scan Error: ${errorMessage}`); // Handle scan errors (optional)
      }
    )
    .catch((err) => {
      console.error(`Error starting QR scanner: ${err}`);
    });
}

// Stop the QR scanner and hide the camera container
function stopQRScanner() {
  if (html5QrCode) {
    html5QrCode.stop().then(() => {
      cameraContainer.classList.add("hidden"); // Hide camera container
    });
  }
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

  // Check if the QR code is scanned
  if (!qrCodeData) {
    errorMessage.textContent = "Error: Please scan the QR code before submitting.";
    errorMessage.style.color = "red"; // Display error in red text
    return;
  }

  try {
    // Simulate API call
    const response = await sendToAPI({ name, phone, qrCode: qrCodeData });
    console.log(response);
    showThankYouScreen(); // Show success screen if API call succeeds
  } catch (error) {
    errorMessage.textContent = "Error: " + error; // Show error message
    errorMessage.style.color = "red";
  }
});

// Mock API call function
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
  homeScreen.classList.add("hidden"); // Hide home screen
  thankYouScreen.classList.remove("hidden"); // Show thank-you screen
}

// Reset to Home screen
function resetToHome() {
  qrCodeData = null; // Reset QR data
  scanQRButton.textContent = "Scan QR";
  scanQRButton.style.backgroundColor = "#fbbc04"; // Reset button style
  thankYouScreen.classList.add("hidden"); // Hide thank-you screen
  homeScreen.classList.remove("hidden"); // Show home screen
  errorMessage.textContent = ""; // Clear error message
}

// Event: Back to home button
document.getElementById("back-home-button").addEventListener("click", resetToHome);
