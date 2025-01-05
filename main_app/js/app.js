const state = {
  currentPage: "store",
  currentTab: "transactions",
  storeDetails: {
    name: "Store Name",
    address: "",
    phone: "",
    bank: "",
  },
  personalDetails: {
    name: "",
    phone: "",
    dob: "",
  },
  bankDetails: {
    bankName: "",
    bankNumber: "",
    ifscCode: "",
  },
  payments: [
    {
      id: 1,
      name: "vikas",
      time: "7:20PM",
      amount: 1000,
      dishes: 5,
      date: "2024-01-02",
    },
    {
      id: 2,
      name: "vikas",
      time: "7:20PM",
      amount: 1000,
      dishes: 5,
      date: "2024-01-02",
    },
    {
      id: 3,
      name: "vikas",
      time: "7:20PM",
      amount: 1000,
      dishes: 5,
      date: "2024-01-02",
    },
    {
      id: 4,
      name: "vikas",
      time: "7:20PM",
      amount: 1000,
      dishes: 5,
      date: "2024-01-02",
    },
    {
      id: 5,
      name: "vikas",
      time: "7:20PM",
      amount: 1000,
      dishes: 5,
      date: "2024-01-02",
    },
  ],
  transactions: [
    { date: "2024-01-02", amount: 9000, type: "Last payment" },
    { date: "2024-12-20", amount: 9000, type: "Settlement" },
    { date: "2024-12-19", amount: 1000, type: "Payment" },
    { date: "2024-12-18", amount: 1000, type: "Payment" },
  ],
  products: [
    {
      "images": {
        "primary": "https://media.istockphoto.com/",
        "others": [
          "https://media.istockphoto.com/",
          "https://media.istockphoto.com/id"
        ]
      },
      "name": "SandWhich-1",
      "price": 1840,
      "ordersCount": 0,
      "productStatus": "active",
      "_id": "67758aefbc84f46bb57b36e1"
    },
    {
      "images": {
        "primary": "https://media.istockphoto.com/",
        "others": [
          "https://media.istockphoto.com/",
          "https://media.istockphoto.com/id"
        ]
      },
      "name": "sweet",
      "price": 1840,
      "ordersCount": 0,
      "productStatus": "active",
      "_id": "67758aefbc84f46bb57b36e2"
    },
    {
      "images": {
        "primary": "https://media.istockphoto.com/",
        "others": [
          "https://media.istockphoto.com/",
          "https://media.istockphoto.com/id"
        ]
      },
      "name": "water bottle",
      "price": 1840,
      "ordersCount": 0,
      "productStatus": "active",
      "_id": "67758aefbc84f46bb57b36e3"
    },
    {
      "images": {
        "primary": "https://media.istockphoto.com/",
        "others": [
          "https://media.istockphoto.com/",
          "https://media.istockphoto.com/id"
        ]
      },
      "name": "fry",
      "price": 1840,
      "ordersCount": 0,
      "productStatus": "active",
      "_id": "67758aefbc84f46bb57b36e4"
    },
    {
      "images": {
        "primary": "https://media.istockphoto.com/",
        "others": [
          "https://media.istockphoto.com/",
          "https://media.istockphoto.com/id"
        ]
      },
      "name": "fry-6",
      "price": 1840,
      "ordersCount": 0,
      "productStatus": "active",
      "_id": "67758aefbc84f46bb57b36e5"
    }
  ],
};

function fetchAndSaveProductDetails() {
  const ownerId = localStorage.getItem('ownerId');
  const storeId = localStorage.getItem('storeId');
  fetch(`http://localhost:3000/api/owners/${ownerId}/stores/${storeId}/products`)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem('productDetails', JSON.stringify(data));
      state.products = data;
      renderProductList();
    })
    .catch((error) => {
      console.error('Error fetching product details:', error);
      const localData = localStorage.getItem('productDetails');
      if (localData) {
        state.products = JSON.parse(localData);
        renderProductList();
      } else {
        alert('Failed to fetch product details and no local data available.');
      }
    });
}

function showPage(page) {
  state.currentPage = page;
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelectorAll(".nav-item")
    .forEach((item) => item.classList.remove("active"));

  const pages = {
    store: {
      id: "storePage",
      title: "Store Details",
      render: renderTodayPayments,
    },
    qr: {
      id: "qrPage",
      title: "Store QR",
      render: renderQRCode,
    },
    account: { id: "accountPage", title: "Account Details" },
    history: {
      id: "historyPage",
      title: "Payment History",
      render: renderHistoryPage,
    },
    help: { id: "helpPage", title: "Help & Support" },
    productListingPage: {
      id: "productListingPage",
      title: "Product Listing",
      render: renderProductList,
    },
    personalDetails: {
      id: "personalDetailsPage",
      title: "Personal Details",
      render: renderPersonalDetails,
    },
    storeDetails: {
      id: "storeDetailsPage",
      title: "Store Details",
      render: renderStoreDetails,
    },
    bankDetails: {
      id: "bankDetailsPage",
      title: "Bank Details",
      render: renderBankDetails,
    },
  };

  const pageConfig = pages[page];
  if (pageConfig) {
    document.getElementById(pageConfig.id).classList.add("active");
    document
      .querySelector(`.nav-item[onclick="showPage('${page}')"]`)
      .classList.add("active");
    document.getElementById("pageTitle").textContent = pageConfig.title;
    if (pageConfig.render) pageConfig.render();
  }
  if (page === 'productListForm') {
    renderProductList();
  } else if (page === 'account') {
    renderPersonalDetails();
    renderStoreDetails();
    renderBankDetails();
  } else if (page === 'store') {
    fetchAndSaveProductDetails();
  }
}

function switchTab(tab) {
  state.currentTab = tab;
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelectorAll(".tab-content")
    .forEach((c) => c.classList.remove("active"));

  const tabElements = {
    transactions: { tab: ".tab:first-child", content: "transactionsTab" },
    settlement: { tab: ".tab:last-child", content: "settlementTab" },
  };

  const config = tabElements[tab];
  if (config) {
    document.querySelector(config.tab).classList.add("active");
    document.getElementById(config.content).classList.add("active");
  }
}

function renderTodayPayments() {
  const container = document.getElementById("todayPayments");
  const totalAmount = state.payments.reduce(
    (sum, p) => sum + p.amount,
    0
  );

  container.innerHTML = state.payments
    .map(
      (payment) => `
          <div class="payment-item">
              <span>${payment.name} ${payment.time} - ${payment.dishes} dish</span>
              <span>₹${payment.amount}</span>
          </div>
      `
    )
    .join("");

  const productContainer = document.getElementById("productDetails");
  productContainer.innerHTML = state.products
    .map(
      (product) => `
        <div class="product-item">
          <img src="${product.images.primary}" alt="${product.name}" class="product-image">
          <div class="product-info">
            <h4>${product.name}</h4>
            <p>Price: ₹${product.price}</p>
            <p>Status: ${product.productStatus}</p>
          </div>
        </div>
      `
    )
    .join("");
}

function renderHistoryPage() {
  renderTransactions();
  renderSettlementPayments();
}

function renderTransactions() {
  const container = document.querySelector(
    "#transactionsTab .payment-list"
  );
  container.innerHTML = state.transactions
    .map(
      (transaction) => `
          <div class="payment-item">
              <span>${transaction.type} (${transaction.date})</span>
              <span>₹${transaction.amount}</span>
          </div>
      `
    )
    .join("");
}

function renderSettlementPayments() {
  const container = document.getElementById("settlementPayments");
  const todayTotal = state.payments.reduce((sum, p) => sum + p.amount, 0);

  container.innerHTML = state.payments
    .map(
      (payment) => `
          <div class="payment-item">
              <span>${payment.name} ${payment.time}</span>
              <span>₹${payment.amount}</span>
          </div>
      `
    )
    .join("");
}

function fetchProductList() {
  const ownerId = localStorage.getItem('ownerId');
  const storeId = localStorage.getItem('storeId');
  fetch(`http://localhost:3000/api/owners/${ownerId}/stores/${storeId}/products`)
    .then((response) => response.json())
    .then((data) => {
      state.products = data;
      renderProductList();
    })
    .catch((error) => {
      console.error('Error fetching product list:', error);
      alert('Failed to fetch product list.');
    });
}

function renderProductList() {
  const container = document.getElementById('productList');
  container.innerHTML = state.products
    .map(
      (product) => `
        <div class="product-card">
          <img src="${product.images.primary}" alt="${product.name}" class="product-image">
          <div class="product-info">
            <h4>${product.name}</h4>
            <p>Price: ₹${product.price}</p>
            <p>Status: ${product.productStatus}</p>
            <button class="edit-btn" onclick="editProduct('${product._id}')">Edit</button>
          </div>
        </div>
      `
    )
    .join('');
}

function renderQRCode() {
  const qrLink = localStorage.getItem('QrLink');
  if (qrLink) {
    const qrCodeImage = document.getElementById('qrCodeImage');
    qrCodeImage.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrLink)}&size=200x200`;
  } else {
    alert('QR Code link not found in local storage.');
  }
}

function reloadQRCode() {
  renderQRCode();
}

function editProduct(productId) {
  const product = state.products.find((p) => p._id === productId);
  if (product) {
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editPrimaryImage').value = product.images.primary;
    document.getElementById('editOtherImages').value = product.images.others.join(', ');
    document.getElementById('editProductStatus').value = product.productStatus;
    document.getElementById('editProductId').value = product._id;
    document.getElementById('editProductModal').classList.add('active');
  }
}

function updateProductDetails() {
  const productId = document.getElementById('editProductId').value;
  const updatedProduct = {
    name: document.getElementById('editProductName').value,
    price: document.getElementById('editProductPrice').value,
    images: {
      primary: document.getElementById('editPrimaryImage').value,
      others: document.getElementById('editOtherImages').value.split(',').map((url) => url.trim()),
    },
    productStatus: document.getElementById('editProductStatus').value,
  };

  // Show loader
  document.getElementById('loader').classList.add('active');

  // Update the product in the state
  state.products = state.products.map((product) =>
    product._id === productId ? { ...product, ...updatedProduct } : product
  );

  // Fire the API to update the product details
  const ownerId = localStorage.getItem('ownerId');
  const storeId = localStorage.getItem('storeId');
  fetch(`http://localhost:3000/api/owners/${ownerId}/stores/${storeId}/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedProduct),
  })
    .then((response) => response.json())
    .then((data) => {
      // Hide loader
      document.getElementById('loader').classList.remove('active');
      alert('Product updated successfully!');
      document.getElementById('editProductModal').classList.remove('active');
      renderProductList();
    })
    .catch((error) => {
      console.error('Error updating product:', error);
      alert('Failed to update product.');
      document.getElementById('loader').classList.remove('active');
    });
}

function cancelEdit() {
  document.getElementById('editProductModal').classList.remove('active');
}

function downloadQR() {
  const qrLink = localStorage.getItem('QrLink');
  if (qrLink) {
    const link = document.createElement('a');
    link.href = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrLink)}&size=200x200`;
    link.download = 'qr_code.png';
    link.click();
  } else {
    alert('QR Code link not found in local storage.');
  }
}

function showEditForm(formId) {
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
  document.getElementById(formId).classList.add("active");

  if (formId === 'personalDetailsForm') {
    document.getElementById('ownerName').value = state.personalDetails.name;
    document.getElementById('phoneNumber').value = state.personalDetails.phone;
    document.getElementById('dob').value = state.personalDetails.dob;
  } else if (formId === 'bankDetailsForm') {
    document.getElementById('bankName').value = state.bankDetails.bankName;
    document.getElementById('accountNumber').value = state.bankDetails.bankNumber;
    document.getElementById('ifscCode').value = state.bankDetails.ifscCode;
  } else if (formId === 'storeDetailsForm') {
    document.getElementById('storeName').value = state.storeDetails.name;
    document.getElementById('storeAddress').value = state.storeDetails.address;
  }
}

function updateDetails(formId) {
  const ownerId = localStorage.getItem('ownerId');
  const storeId = localStorage.getItem('storeId');
  let updateData = {};

  if (formId === 'personalDetailsForm') {
    updateData = {
      name: document.getElementById('ownerName').value,
      phoneNumber: document.getElementById('phoneNumber').value,
      DOB: document.getElementById('dob').value,
    };
    fetch(`http://localhost:3000/api/owners/${ownerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('ownerData', JSON.stringify(data));
        state.personalDetails.name = data.name;
        state.personalDetails.phone = data.phoneNumber;
        state.personalDetails.dob = data.DOB;
        alert('Personal details updated successfully!');
        showPage('account');
        renderPersonalDetails();
      })
      .catch(error => {
        console.error('Error updating personal details:', error);
        alert('Failed to update personal details.');
      });
  } else if (formId === 'bankDetailsForm') {
    updateData = {
      bankName: document.getElementById('bankName').value,
      accountNumber: document.getElementById('accountNumber').value,
      ifscCode: document.getElementById('ifscCode').value,
    };
    fetch(`http://localhost:3000/api/owners/${ownerId}/bank`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('ownerData', JSON.stringify(data));
        state.bankDetails.bankName = data.bankName;
        state.bankDetails.bankNumber = data.accountNumber;
        state.bankDetails.ifscCode = data.ifscCode;
        alert('Bank details updated successfully!');
        showPage('account');
        renderBankDetails();
      })
      .catch(error => {
        console.error('Error updating bank details:', error);
        alert('Failed to update bank details.');
      });
  } else if (formId === 'storeDetailsForm') {
    updateData = {
      name: document.getElementById('storeName').value,
      address: document.getElementById('storeAddress').value,
    };
    fetch(`http://localhost:3000/api/owners/${ownerId}/stores/${storeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('storeData', JSON.stringify(data));
        state.storeDetails.name = data.name;
        state.storeDetails.address = data.address;
        alert('Store details updated successfully!');
        showPage('account');
        renderStoreDetails();
      })
      .catch(error => {
        console.error('Error updating store details:', error);
        alert('Failed to update store details.');
      });
  }
}

function renderPersonalDetails() {
  const ownerData = JSON.parse(localStorage.getItem('ownerData'));
  if (ownerData) {
    state.personalDetails.name = ownerData.name;
    state.personalDetails.phone = ownerData.phoneNumber;
    state.personalDetails.dob = ownerData.DOB;
    state.bankDetails.bankName = ownerData.bankName;
    state.bankDetails.bankNumber = ownerData.accountNumber;
    state.bankDetails.ifscCode = ownerData.ifscCode;
    document.getElementById('personalName').textContent = state.personalDetails.name;
    document.getElementById('personalPhone').textContent = state.personalDetails.phone;
    document.getElementById('personalDOB').textContent = state.personalDetails.dob;
    document.getElementById('bankName').textContent = state.bankDetails.bankName;
    document.getElementById('bankNumber').textContent = state.bankDetails.bankNumber;
    document.getElementById('ifscCode').textContent = state.bankDetails.ifscCode;
  } else {
    const ownerId = localStorage.getItem('ownerId');
    if (ownerId) {
      fetch(`http://localhost:3000/api/owners/${ownerId}`)
        .then(response => response.json())
        .then(ownerData => {
          localStorage.setItem('ownerData', JSON.stringify(ownerData));
          state.personalDetails.name = ownerData.name;
          state.personalDetails.phone = ownerData.phoneNumber;
          state.personalDetails.dob = ownerData.DOB;
          state.bankDetails.bankName = ownerData.bankName;
          state.bankDetails.bankNumber = ownerData.accountNumber;
          state.bankDetails.ifscCode = ownerData.ifscCode;
          document.getElementById('personalName').textContent = state.personalDetails.name;
          document.getElementById('personalPhone').textContent = state.personalDetails.phone;
          document.getElementById('personalDOB').textContent = state.personalDetails.dob;
          document.getElementById('bankName').textContent = state.bankDetails.bankName;
          document.getElementById('bankNumber').textContent = state.bankDetails.bankNumber;
          document.getElementById('ifscCode').textContent = state.bankDetails.ifscCode;
        })
        .catch(error => {
          console.error('Error fetching personal details:', error);
          alert('Failed to fetch personal details.');
        });
    }
  }
}

function renderStoreDetails() {
  const storeData = JSON.parse(localStorage.getItem('storeData'));
  if (storeData) {
    state.storeDetails.name = storeData.name;
    state.storeDetails.address = storeData.address;
    document.getElementById('storeName').textContent = state.storeDetails.name;
    document.getElementById('storeAddress').textContent = state.storeDetails.address;
  } else {
    const storeId = localStorage.getItem('storeId');
    if (storeId) {
      fetch(`http://localhost:3000/api/stores/${storeId}`)
        .then(response => response.json())
        .then(storeData => {
          localStorage.setItem('storeData', JSON.stringify(storeData));
          state.storeDetails.name = storeData.name;
          state.storeDetails.address = storeData.address;
          document.getElementById('storeName').textContent = state.storeDetails.name;
          document.getElementById('storeAddress').textContent = state.storeDetails.address;
        })
        .catch(error => {
          console.error('Error fetching store details:', error);
          alert('Failed to fetch store details.');
        });
    }
  }
}

function renderBankDetails() {
  const ownerData = JSON.parse(localStorage.getItem('ownerData'));
  if (ownerData) {
    state.bankDetails.bankName = ownerData.bankName;
    state.bankDetails.bankNumber = ownerData.accountNumber;
    state.bankDetails.ifscCode = ownerData.ifscCode;
    document.getElementById('bankName').textContent = state.bankDetails.bankName;
    document.getElementById('bankNumber').textContent = state.bankDetails.bankNumber;
    document.getElementById('ifscCode').textContent = state.bankDetails.ifscCode;
  } else {
    const ownerId = localStorage.getItem('ownerId');
    if (ownerId) {
      fetch(`http://localhost:3000/api/owners/${ownerId}/bank`)
        .then(response => response.json())
        .then(ownerData => {
          localStorage.setItem('ownerData', JSON.stringify(ownerData));
          state.bankDetails.bankName = ownerData.bankName;
          state.bankDetails.bankNumber = ownerData.accountNumber;
          state.bankDetails.ifscCode = ownerData.ifscCode;
          document.getElementById('bankName').textContent = state.bankDetails.bankName;
          document.getElementById('bankNumber').textContent = state.bankDetails.bankNumber;
          document.getElementById('ifscCode').textContent = state.bankDetails.ifscCode;
        })
        .catch(error => {
          console.error('Error fetching bank details:', error);
          alert('Failed to fetch bank details.');
        });
    }
  }
}

function toggleAnswer(element) {
  const answer = element.nextElementSibling;
  answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
}

// Initialize app
showPage("store");
renderTodayPayments();

function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.classList.toggle('hidden');
}