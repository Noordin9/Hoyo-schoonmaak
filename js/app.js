// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const icon = menuToggle.querySelector('i');
  if (navLinks.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
document.getElementById('headerQuoteBtn').addEventListener('click', () => scrollToSection('offerte'));
document.getElementById('heroOfferBtn').addEventListener('click', () => scrollToSection('offerte'));
document.getElementById('heroServicesBtn').addEventListener('click', () => scrollToSection('diensten'));

// Advanced form handling
const form = document.getElementById('quoteAdvancedForm');
const feedbackDiv = document.getElementById('formFeedbackAdvanced');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('fullname').value.trim();
  const phone = document.getElementById('phoneNumber').value.trim();
  const email = document.getElementById('emailAddress').value.trim();
  const dienst = document.getElementById('dienstSelect').value;
  const stad = document.getElementById('stadGemeente').value.trim();
  if (!name || !phone || !email || !dienst || !stad) {
    feedbackDiv.innerHTML = '<div class="response-msg" style="background:#FEE2E2; color:#B91C1C;">Vul alle verplichte velden in (*).</div>';
    return;
  }
  if (!email.includes('@')) {
    feedbackDiv.innerHTML = '<div class="response-msg" style="background:#FEE2E2; color:#B91C1C;">Geldig e-mailadres vereist.</div>';
    return;
  }
  feedbackDiv.innerHTML = '<div class="response-msg"><i class="fas fa-spinner fa-pulse"></i> Aanvraag wordt verzonden...</div>';
  setTimeout(() => {
    feedbackDiv.innerHTML = '<div class="response-msg" style="background:#DCFCE7; color:#166534;"><i class="fas fa-check-circle"></i> Bedankt! Uw offerteaanvraag is ontvangen. Wij nemen binnen 24u contact op.</div>';
    form.reset();
    setTimeout(() => feedbackDiv.innerHTML = '', 5000);
  }, 800);
});
