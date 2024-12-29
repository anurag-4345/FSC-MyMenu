const sideMenu = document.getElementById('sideMenu');
const overlay = document.getElementById('overlay');

function toggleMenu() {
  sideMenu.classList.toggle('open');
  overlay.classList.toggle('show');
}

overlay.addEventListener('click', () => {
  sideMenu.classList.remove('open');
  overlay.classList.remove('show');
});

function handleFormSubmit(formId, apiUrl, successMessage, errorMessage) {
  const form = document.getElementById(formId);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const ownerId = localStorage.getItem('owner_Id');
    if (!ownerId) {
      alert('Owner ID not found in local storage. Please log in again.');
      return;
    }

    const data = {
      name: document.getElementById('storeName').value,
      address: document.getElementById('address').value,
      numberOfProducts: parseInt(document.getElementById('numberOfProducts').value, 10),
      priceRange: document.getElementById('priceRange').value,
      storeStatus: "active",
      QRLink: "" // Placeholder for now, as per your requirements
    };

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      if (data._id) {
        alert(successMessage);
        localStorage.setItem('store_id', data._id);
        form.reset();
      } else {
        alert(`${errorMessage}: ${data.message || 'Unknown error'}`);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert(errorMessage);
    });
  });
}

// Example usage for store form
handleFormSubmit('storeForm', 'https://backend-mymenu.onrender.com/api/owners/${ownerId}/stores', 'Store created successfully!', 'Failed to create store');
