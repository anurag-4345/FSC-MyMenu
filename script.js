const nameField = document.getElementById("name-field");
const phoneField = document.getElementById("phone-field");
const openCameraButton = document.getElementById("open-camera");
const flipCameraButton = document.getElementById("flip-camera");
const qrReaderDiv = document.getElementById("qr-reader");
const resultDisplay = document.getElementById("result");
const errorDisplay = document.getElementById("error");
const jsonDisplay = document.getElementById("json-display");
const setURLButton = document.getElementById("set-url");
const proceedButton = document.getElementById("proceed-button");
const progressBarContainer = document.getElementById("progress-bar-container");
const progressBar = document.getElementById("progress-bar");
const userInfoTable = document.getElementById("user-info-table");
const successPopup = document.getElementById("success-popup");
const popup = document.getElementById("popup");
const closePopupButton = document.getElementById("close-popup");
const closeSuccessPopupButton = document.getElementById("close-success-popup");
const merchantPopup = document.getElementById("merchant-popup");
const closeMerchantPopupButton = document.getElementById("close-merchant-popup");
const merchantDetails = document.getElementById("merchant-details");

let scannedData = null;
let currentScanner = null;

// Enable the camera button when the user fills in name and phone
function enableCameraButton() {
  if (nameField.value && phoneField.value.length === 10) {
    openCameraButton.disabled = false;
  } else {
    openCameraButton.disabled = true;
  }
}

// Show the "Proceed Merchant" button after QR scan is successful
function showProceedButton() {
  proceedButton.style.display = "block";
}

// Simulate smooth progress bar
function showProgressBar() {
  let progress = 0;
  progressBar.style.width = "0%";
  progressBarContainer.style.display = "block";

  let interval = setInterval(() => {
    progress += 2;
    progressBar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
      showSuccessPopup();
    }
  }, 50);
}

// Show success popup after progress bar is complete
function showSuccessPopup() {
  successPopup.style.display = "block";
}

// Close success popup
closeSuccessPopupButton.addEventListener("click", () => {
  successPopup.style.display = "none";
  document.getElementById("home-screen").style.display = "block";
});

// Close error popup
closePopupButton.addEventListener("click", () => {
  popup.style.display = "none";
  document.getElementById("home-screen").style.display = "block";
});

// Show Merchant details in the popup
function showMerchantDetailsPopup() {
  merchantDetails.innerHTML = `
    <p>Name: ${nameField.value}</p>
    <p>Phone: ${phoneField.value}</p>
    <p>QR Code: ${scannedData}</p>
  `;
  merchantPopup.style.display = "block";
}

// Handle proceed button click
proceedButton.addEventListener("click", () => {
  document.getElementById("home-screen").style.display = "none";
  showProgressBar();
  showMerchantDetailsPopup();
});

// Handle close merchant popup
closeMerchantPopupButton.addEventListener("click", () => {
  merchantPopup.style.display = "none";
  document.getElementById("home-screen").style.display = "block";
});

// Handle QR code scanner result
function handleQRCodeResult(result) {
  if (result && result.includes("wikipedia.org")) {
    scannedData = result;
    resultDisplay.textContent = `Scanned URL: ${scannedData}`;
    showProceedButton();
    setURLButton.style.display = "block";
    jsonDisplay.textContent = JSON.stringify({ url: scannedData }, null, 2);
  } else {
    errorDisplay.textContent = "Invalid QR Code! Only My-Menu QR code is allowed.";
    popup.style.display = "block";
  }
}

// Initialize QR code scanner
function startScanner() {
  const html5QrCode = new Html5Qrcode("qr-reader");
  html5QrCode.start(
    { facingMode: "environment" },
    {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    },
    handleQRCodeResult
  ).catch(err => {
    errorDisplay.textContent = "Error opening camera.";
  });
}

// Close the camera and show the scanned QR data
function closeCamera() {
  if (currentScanner) {
    currentScanner.stop();
  }
}

// Enable the camera button when the user has entered valid name and phone number
nameField.addEventListener("input", enableCameraButton);
phoneField.addEventListener("input", enableCameraButton);

// Start QR code scanning when the "Open Camera" button is clicked
openCameraButton.addEventListener("click", startScanner);