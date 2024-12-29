let imageFiles = [];
const imageInput = document.getElementById('image-input');
const previewContainer = document.getElementById('image-preview');
const productContainer = document.getElementById('product-container');
const categorySelect = document.getElementById('product-category');
const nameInput = document.getElementById('product-name');
const priceInput = document.getElementById('product-price');
const orderContainer = document.getElementById('orderContainer');
const ordersContainer = document.getElementById('ordersContainer');
const totalOrdersElement = document.getElementById('totalOrders');
const totalAmountElement = document.getElementById('totalAmount');

// Toggle API flag
const useApi = false;

// Toggle admin section visibility
function toggleAdminSection() {
  const adminSection = document.getElementById('admin-section');
  adminSection.classList.toggle('open');
  const toggleText = document.getElementById('toggle-text');
  toggleText.textContent = adminSection.classList.contains('open') ? 'Close' : 'You';

  // Enable or disable form elements based on admin section visibility
  document.querySelectorAll('.add-product-section input, .add-product-section select, .add-product-section button')
    .forEach(input => input.disabled = !adminSection.classList.contains('open'));
}

// Handle image upload preview
imageInput.addEventListener('change', function() {
  previewContainer.innerHTML = '';
  imageFiles = [];
  Array.from(this.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function(event) {
      const imgElement = document.createElement('img');
      imgElement.src = event.target.result;
      previewContainer.appendChild(imgElement);
      imageFiles.push(event.target.result);
    };
    reader.readAsDataURL(file);
  });
});

// Add product
function addProduct() {
  const name = nameInput.value;
  const price = priceInput.value;
  const category = categorySelect.value;

  if (validateForm(name, price, category)) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    // Image slider
    const slider = document.createElement('div');
    slider.classList.add('slider');
    imageFiles.forEach((base64, index) => {
      const imgElement = document.createElement('img');
      imgElement.src = base64;
      imgElement.style.transform = index === 0 ? 'scale(1)' : 'scale(0)';
      slider.appendChild(imgElement);
    });

    // Slider buttons
    const sliderButtons = document.createElement('div');
    sliderButtons.classList.add('slider-buttons');
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&#8592;';
    prevButton.onclick = () => moveSlider(slider, -1);
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&#8594;';
    nextButton.onclick = () => moveSlider(slider, 1);
    sliderButtons.appendChild(prevButton);
    sliderButtons.appendChild(nextButton);
    slider.appendChild(sliderButtons);

    productCard.appendChild(slider);

    const productInfo = document.createElement('div');
    productInfo.innerHTML = `
      <h3>${name}</h3>
      <p>$${price}</p>
      <p>${category}</p>
    `;
    productCard.appendChild(productInfo);

    // Close button
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-btn');
    closeButton.innerText = 'X';
    closeButton.onclick = () => {
      productCard.remove();
      saveProductsToLocalStorage();
    };
    productCard.appendChild(closeButton);

    productContainer.appendChild(productCard);
    saveProductsToLocalStorage();
    resetForm();
    toggleAdminSection();
  }
}

// Slider navigation
function moveSlider(slider, direction) {
  const images = slider.querySelectorAll('img');
  let currentIndex = Array.from(images).findIndex(img => img.style.transform === 'scale(1)');
  currentIndex = (currentIndex + direction + images.length) % images.length;
  images.forEach((img, index) => {
    img.style.transform = index === currentIndex ? 'scale(1)' : 'scale(0)';
  });
}

// Validate form
function validateForm(name, price, category) {
  let isValid = true;
  if (!name) {
    document.getElementById('name-error').textContent = 'Please enter a product name.';
    isValid = false;
  }
  if (!price || isNaN(price) || price <= 0) {
    document.getElementById('price-error').textContent = 'Please enter a valid product price.';
    isValid = false;
  }
  if (!category) {
    document.getElementById('category-error').textContent = 'Please select a category.';
    isValid = false;
  }
  if (imageFiles.length === 0) {
    document.getElementById('image-error').textContent = 'Please upload at least one image.';
    isValid = false;
  }
  return isValid;
}

// Reset form
function resetForm() {
  nameInput.value = '';
  priceInput.value = '';
  categorySelect.value = '';
  imageInput.value = '';
  previewContainer.innerHTML = '';
  imageFiles = [];
  document.getElementById('name-error').textContent = '';
  document.getElementById('price-error').textContent = '';
  document.getElementById('category-error').textContent = '';
  document.getElementById('image-error').textContent = '';
}

// Save products to localStorage
function saveProductsToLocalStorage() {
  const products = [];
  document.querySelectorAll('.product-card').forEach(card => {
    const name = card.querySelector('h3').textContent;
    const price = card.querySelector('p').textContent;
    const category = card.querySelectorAll('p')[1].textContent;
    const images = Array.from(card.querySelectorAll('.slider img')).map(img => img.src);
    products.push({ name, price, category, images });
  });

  localStorage.setItem('products', JSON.stringify(products));
}

// Load products from localStorage
function loadProductsFromLocalStorage() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const slider = document.createElement('div');
    slider.classList.add('slider');
    product.images.forEach(base64 => {
      const imgElement = document.createElement('img');
      imgElement.src = base64;
      slider.appendChild(imgElement);
    });

    // Slider buttons
    const sliderButtons = document.createElement('div');
    sliderButtons.classList.add('slider-buttons');
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&#8592;';
    prevButton.onclick = () => moveSlider(slider, -1);
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&#8594;';
    nextButton.onclick = () => moveSlider(slider, 1);
    sliderButtons.appendChild(prevButton);
    sliderButtons.appendChild(nextButton);
    slider.appendChild(sliderButtons);

    productCard.appendChild(slider);

    const productInfo = document.createElement('div');
    productInfo.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.price}</p>
      <p>${product.category}</p>
    `;
    productCard.appendChild(productInfo);

    // Close button
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-btn');
    closeButton.innerText = 'X';
    closeButton.onclick = () => {
      productCard.remove();
      saveProductsToLocalStorage();
    };
    productCard.appendChild(closeButton);

    productContainer.appendChild(productCard);
  });
}

// Load products when page loads
window.onload = () => loadProductsFromLocalStorage();

function toggleMenu() {
  document.getElementById('sideMenu').classList.toggle("open");
  document.getElementById('overlay').classList.toggle("active");
}

function showPopup(type) {
  const popup = document.getElementById(type + 'Popup');
  popup.classList.add('active');
  setTimeout(() => popup.classList.remove('active'), 3000);
}

function showLoader(isLoading) {
  document.getElementById('loader').style.display = isLoading ? 'block' : 'none';
}

function createOrder() {
  const customerName = document.getElementById("customerName").value;
  const orderAmount = Number(document.getElementById("orderAmount").value);
  const orderDate = document.getElementById("orderDate").value;

  const formData = new FormData();
  formData.append("customerName", customerName);
  formData.append("orderAmount", orderAmount);
  formData.append("orderDate", orderDate);

  showLoader(true);

  fetch("https://backend-mymenu.onrender.com/orders", {
    method: "POST",
    body: formData
  })
  .then(response => {
    showLoader(false);
    if (!response.ok) {
      throw new Error("Failed to create order");
    }
    showPopup('success');
    // Optionally, you can refresh the order list here
  })
  .catch(error => {
    showPopup('error');
  });
}

function fetchOrders() {
  if (useApi) {
    // Fetch orders from API
    fetch("https://backend-mymenu.onrender.com/orders")
      .then(response => response.json())
      .then(data => {
        displayOrders(data);
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
      });
  } else {
    // Use dummy data
    const orders = [
      { orderNumber: "12345", customer: "John Doe", amount: 50.00, date: "2024-12-15", time: "1:20 PM", products: ["path/to/image1.jpg", "path/to/image2.jpg"] },
      { orderNumber: "12346", customer: "Jane Smith", amount: 30.00, date: "2024-12-14", time: "2:15 PM", products: ["path/to/image3.jpg", "path/to/image4.jpg"] }
    ];
    displayOrders(orders);
  }
}

function displayOrders(orders) {
  let totalOrders = 0;
  let totalAmount = 0;

  orders.forEach(order => {
    totalOrders++;
    totalAmount += order.amount;

    const orderCard = document.createElement('div');
    orderCard.classList.add('order-card');

    const productImages = order.products.map(product => `<img src="${product}" alt="Product">`).join('');

    orderCard.innerHTML = `
      <div class="order-info">
        <h3>Order #${order.orderNumber}</h3>
        <p>Customer: ${order.customer}</p>
        <div class="product-images">${productImages}</div>
      </div>
      <div class="order-meta">
        <p>$${order.amount.toFixed(2)}</p>
        <p>${order.time} / ${order.date}</p>
      </div>
    `;

    ordersContainer.appendChild(orderCard);
  });

  totalOrdersElement.textContent = totalOrders;
  totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
}

fetchOrders();
