// Elements
const startScanButton = document.getElementById("start-scan");
const stopScanButton = document.getElementById("stop-scan");
const qrReaderDiv = document.getElementById("qr-reader");
const scanResultDiv = document.getElementById("scan-result");
const resultText = document.getElementById("result-text");
const errorMessage = document.getElementById("error-message");

// QR Code Scanner Instance
let html5QrCode = null;

// Function to start the QR code scanner
function startQRScanner() {
  errorMessage.textContent = ""; // Clear error messages
  scanResultDiv.classList.add("hidden"); // Hide the result section

  // Ensure the library is loaded and camera permissions are requested
  if (!html5QrCode) {
    html5QrCode = new Html5Qrcode("qr-reader");
  }

  qrReaderDiv.classList.remove("hidden");
  stopScanButton.classList.remove("hidden");
  startScanButton.classList.add("hidden");

  html5QrCode
    .start(
      { facingMode: "environment" }, // Use the back camera
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (decodedText) => {
        // On successful scan
        resultText.textContent = decodedText;
        scanResultDiv.classList.remove("hidden");
        stopQRScanner();
      },
      (error) => {
        // Scanning errors
        console.warn("QR Scan Error:", error);
      }
    )
    .catch((err) => {
      console.error("Error starting QR scanner:", err);
      showError("Camera access is denied or unavailable. Ensure your browser has camera permissions.");
      stopQRScanner();
    });
}

// Function to stop the QR code scanner
function stopQRScanner() {
  if (html5QrCode) {
    html5QrCode.stop().then(() => {
      qrReaderDiv.classList.add("hidden");
      stopScanButton.classList.add("hidden");
      startScanButton.classList.remove("hidden");
    });
  }
}

// Show error messages
function showError(message) {
  errorMessage.textContent = message;
}

// Event Listeners
startScanButton.addEventListener("click", startQRScanner);
stopScanButton.addEventListener("click", stopQRScanner);
