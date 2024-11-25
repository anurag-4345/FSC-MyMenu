// Elements
const homeScreen = document.getElementById("home-screen");
const thankYouScreen = document.getElementById("thank-you-screen");
const errorPopup = document.getElementById("error-popup");
const closePopup = document.getElementById("close-popup");
const retryButton = document.getElementById("retry-button");
const cancelButton = document.getElementById("cancel-button");
const backHomeButton = document.getElementById("back-home-button");
const scanQRButton = document.getElementById("scan-qr");
const form = document.getElementById("onboarding-form");

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
  } catch (error) {
    showErrorPopup(error); // Show error if QR scan fails
  }
});

// Event: Form submission
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  // Check if the QR code is scanned
  if (!qrCodeData) {
    showErrorPopup("Please scan the QR code before submitting."); // Show error popup
    return;
  }

  try {
    const response = await sendToAPI({ name, phone, qrCode: qrCodeData }); // Simulate API call
    console.log(response);
    showThankYouScreen(); // Show success screen if API call succeeds
  } catch (error) {
    showErrorPopup(error); // Show error popup if API call fails
  }
});

// Show error popup
function showErrorPopup(message) {
  const popupMessage = errorPopup.querySelector("h2");
  popupMessage.innerText = message; // Update error message dynamically
  errorPopup.classList.remove("hidden"); // Show popup
}

// Hide error popup
function hideErrorPopup() {
  errorPopup.classList.add("hidden"); // Hide popup
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
}

// Event: Close popup
closePopup.addEventListener("click", hideErrorPopup);

// Event: Retry button
retryButton.addEventListener("click", hideErrorPopup);

// Event: Cancel button
cancelButton.addEventListener("click", hideErrorPopup);

// Event: Back to home button
backHomeButton.addEventListener("click", resetToHome);
