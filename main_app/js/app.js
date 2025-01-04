const state = {
  currentPage: "store",
  currentTab: "transactions",
  storeDetails: {
    name: "Store Name",
    address: "",
    phone: "",
    bank: "",
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
};

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
    qr: { id: "qrPage", title: "Store QR" },
    account: { id: "accountPage", title: "Account Details" },
    history: {
      id: "historyPage",
      title: "Payment History",
      render: renderHistoryPage,
    },
    help: { id: "helpPage", title: "Help & Support" },
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

function downloadQR() {
  alert("QR Code downloaded successfully!");
}

function showEditForm(formId) {
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
  document.getElementById(formId).classList.add("active");
}

function updateDetails(formId) {
  alert(`${formId} updated successfully!`);
  showPage('account');
}

function toggleAnswer(element) {
  const answer = element.nextElementSibling;
  answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
}

// Initialize app
showPage("store");
renderTodayPayments();