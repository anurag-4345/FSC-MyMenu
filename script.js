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
  setTimeout(() => {
    executeURL();
  }, 1000);
}

// Execute URL based on user details
function executeURL() {
  let userDetails = {
    name: nameField.value,
    phone: phoneField.value,
    qr: scannedData,
  };
  let url = `https://my.menu.com?param_details=${encodeURIComponent(JSON.stringify(userDetails))}`;
  console.log("Successfully executed URL:", url);
}

// Close the popups and return to the home screen
function closePopups() {
  document.getElementById("home-screen").style.display = "block";
  successPopup.style.display = "none";
  merchantPopup.style.display = "none";
  progressBarContainer.style.display = "none";
}

// Close success popup
closeSuccessPopupButton.addEventListener("click", () => {
  closePopups();
});

// Close merchant popup
closeMerchantPopupButton.addEventListener("click", () => {
  closePopups();
});

// Close error popup
closePopupButton.addEventListener("click", () => {
  closePopups();
});

// Handle proceed button click
proceedButton.addEventListener("click", () => {
  document.getElementById("home-screen").style.display = "none";
  showProgressBar();
  showMerchantDetailsPopup();
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

// QR Scanner logic will go here. On successful scan, set the scanned data and show proceed button.