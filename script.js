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
const closePopupButton = document.getElementById("close-popup");
const popup = document.getElementById("popup");

let qrScanner;
let currentFacingMode = "environment"; // Default to back camera
let detectedURL = ""; // Store the detected QR code text

// Enable camera button when name and valid phone number are entered
function enableCameraButton() {
  const isNameValid = nameField.value.trim().length > 0;
  const isPhoneValid = phoneField.value.trim().length === 10;
  openCameraButton.disabled = !(isNameValid && isPhoneValid);
}

// Start the QR scanner
function startQRScanner() {
  qrReaderDiv.style.display = "block";
  flipCameraButton.style.display = "inline-block";
  qrScanner = new Html5Qrcode("qr-reader");

  qrScanner
    .start(
      { facingMode: currentFacingMode },
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      (decodedText) => {
        // On successful scan
        detectedURL = decodedText;

        // Validate if "mymenu" exists in the scanned text (case-insensitive)
        if (/mymenu/i.test(decodedText)) {
          resultDisplay.textContent = `Decoded Text: ${decodedText}`;
          errorDisplay.textContent = "";

          // Stop the scanner and show the "Set URL" button
          qrScanner.stop().then(() => {
            qrReaderDiv.style.display = "none";
            flipCameraButton.style.display = "none";
            setURLButton.style.display = "inline-block";
          });

          // Create JSON object with user input and QR code text
          const data = {
            name: nameField.value.trim(),
            phone: phoneField.value.trim(),
            qrCodeContent: decodedText,
          };

          // Display JSON
          jsonDisplay.textContent = JSON.stringify(data, null, 2);

          // Fill the user details table
          document.getElementById("user-name").textContent = data.name;
          document.getElementById("user-phone").textContent = data.phone;
          document.getElementById("user-qr-content").textContent = data.qrCodeContent;

          // Show user info table and proceed button
          userInfoTable.style.display = "block";
          proceedButton.style.display = "inline-block";
        } else {
          // Show error popup for invalid QR code
          showPopup();
        }
      },
      (error) => {
        // Display scanning errors (only if camera is active)
        errorDisplay.textContent = `Scanning...`;
      }
    )
    .catch((err) => {
      errorDisplay.textContent = `Error starting camera: ${err}`;
    });
}

// Show popup for invalid QR code
function showPopup() {
  popup.style.display = "block";
}

// Close popup when user clicks "Close"
closePopupButton.addEventListener("click", () => {
  popup.style.display = "none";
});

// Handle "Set URL" button click
setURLButton.addEventListener("click", () => {
  alert(`The detected content is: ${detectedURL}`);
});

// Start the progress bar animation and show success message
function startProgressBar() {
  progressBarContainer.style.display = "block";
  let progress = 0;

  const interval = setInterval(() => {
    progress += 5;
    progressBar.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        successPopup.style.display = "block";
        // Execute URL with user details
        const url = `https://my.menu.com?name=${encodeURIComponent(nameField.value)}&phone=${encodeURIComponent(phoneField.value)}&URL=${encodeURIComponent(detectedURL)}`;
        console.log(`Executed URL: ${url}`);
      }, 500);
    }
  }, 100);
}

// Handle "Proceed Merchant" button click
proceedButton.addEventListener("click", () => {
  startProgressBar();
});

// Event listeners
nameField.addEventListener("input", enableCameraButton);
phoneField.addEventListener("input", enableCameraButton);
openCameraButton.addEventListener("click", startQRScanner);
flipCameraButton.addEventListener("click", () => {
  currentFacingMode =
    currentFacingMode === "environment" ? "user" : "environment";
  stopQRScanner();
  startQRScanner();
});
