const pages = document.querySelectorAll('.form-page');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const submitBtn = document.getElementById('submitBtn');
const form = document.getElementById('multiPageForm');
let currentPage = 0;

function showPage(index) {
  pages.forEach((page, i) => {
    page.classList.toggle('active', i === index);
  });
  prevBtn.disabled = index === 0;
  nextBtn.style.display = index < pages.length - 1 ? 'inline-block' : 'none';
  submitBtn.style.display = index === pages.length - 1 ? 'inline-block' : 'none';
}

nextBtn.addEventListener('click', () => {
  const inputs = pages[currentPage].querySelectorAll('input');
  let valid = true;
  inputs.forEach(input => {
    if (!input.checkValidity()) {
      valid = false;
      input.reportValidity();
    }
  });

  if (currentPage === 1) {
    const account = document.getElementById('accountNumber').value;
    const reAccount = document.getElementById('reAccountNumber').value;
    if (account !== reAccount) {
      alert('Account numbers do not match. Please re-enter.');
      valid = false;
    }
  }

  if (valid) {
    currentPage++;
    showPage(currentPage);
  }
});

prevBtn.addEventListener('click', () => {
  currentPage--;
  showPage(currentPage);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById('ownerName').value,
    phoneNumber: document.getElementById('phoneNumber').value,
    bankName: document.getElementById('bankName').value,
    accountNumber: document.getElementById('accountNumber').value,
    ifscCode: document.getElementById('ifscCode').value,
    aadhar: document.getElementById('aadhar').value,
    pan: document.getElementById('pan').value,
    ownerStatus:"active"
  };

  fetch('https://backend-mymenu.onrender.com/api/owners', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => {
  if (response.ok) {
    return response.json(); // Parse response JSON
  } else {
    return response.json().then(error => {
      throw new Error(error.message || 'Failed to submit form.');
    });
  }
})
.then(responseData => {
  // Save ownerId in localStorage
  localStorage.setItem('ownerId', responseData._id); // Assuming `responseData._id` contains the owner ID
  form.reset();
  window.location.href = "./store.html"

  // Optional: Redirect to another page
  // window.location.href = 'your-next-page.html';
})
    .catch(error => {
      console.error('Error:', error);
      alert('Error submitting form.');
    });
});

showPage(currentPage);