document.getElementById('storeForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const ownerId = localStorage.getItem('ownerId');
  const address = `${document.getElementById('street').value}, ${document.getElementById('city').value}, ${document.getElementById('state').value} - ${document.getElementById('pin').value}`;
  const storeDetails = {
    name: document.getElementById('storeName').value,
    address: address,
    numberOfProducts: document.getElementById('numberOfProducts').value,
    priceRange: document.getElementById('priceRange').value,
    storeStatus: document.getElementById('storeStatus').value
  };

  fetch(`https://backend-mymenu.onrender.com/api/owners/${ownerId}/stores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(storeDetails)
  })
  .then(response => response.json())
  .then(data => {
    localStorage.setItem('storeId', data.storeId);
    // Redirect to main screen or next process
    window.location.href = '/main_screen';
  })
  .catch(error => console.error('Error:', error));
});
