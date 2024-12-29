const faqItems = document.querySelectorAll('.faq-item');

function toggleMenu() {
  document.getElementById('sideMenu').classList.toggle("open");
}

function toggleFaq(element) {
  const faqItem = element.parentElement;
  faqItem.classList.toggle('active');
}
