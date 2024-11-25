// Elements
const homeScreen = document.getElementById("home-screen");
const thankYouScreen = document.getElementById("thank-you-screen");
const scanQRButton = document.getElementById("scan-qr");
const form = document.getElementById("onboarding-form");
const errorMessage = document.getElementById("error-message"); // Inline error message element

// Global variable to track QR scan
let qrCodeData = null; // Initially null, meaning no QR code is scanned

// Mock function to simulate QR scanning
function scanQRCode() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% chance of success
      success ? resolve("QR123456") : reject("Invalid QR Code");
    }, 1000);
  });
}

// Mock API call function
function sendToAPI(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% chance of success
      success ? resolve("API Success") : reject("API Error");
    }, 1000);
  });
}

// Event: Scan QR button
scanQRButton.addEventListener("click", async () => {
  try {
    qrCodeData = await scanQRCode(); // Attempt to scan QR
    alert(`QR Scanned: ${qrCodeData}`); // Notify user
    scanQRButton.textContent = "QR Scanned!";
    scanQRButton.style.backgroundColor = "#34a853"; // Indicate success
    errorMessage.textContent = ""; // Clear any previous error
  } catch (error) {
    errorMessage.textContent = "Error: " + error; // Show error message
    errorMessage.style.color = "red";
  }
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
    const response = await sendToAPI({ name, phone, qrCode: qrCodeData }); // Simulate API call
    console.log(response);
    showThankYouScreen(); // Show success screen if API call succeeds
  } catch (error) {
    errorMessage.textContent = "Error: " + error; // Show error message
    errorMessage.style.color = "red";
  }
});

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