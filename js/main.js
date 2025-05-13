// main.js - Handles menu, cart count, and form validation

document.addEventListener('DOMContentLoaded', function() {
  // Responsive menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Cart count (simple localStorage demo)
  function updateCartCount() {
    const count = localStorage.getItem('cartCount') || 0;
    document.querySelectorAll('#cart-count').forEach(el => el.textContent = count);
  }
  updateCartCount();

  // Contact form validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      let valid = true;
      if (!name || !email || !message) valid = false;
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) valid = false;
      const msgDiv = document.getElementById('form-message');
      if (valid) {
        msgDiv.textContent = 'Thank you for contacting us!';
        msgDiv.style.color = 'green';
        contactForm.reset();
      } else {
        msgDiv.textContent = 'Please fill out all fields with a valid email.';
        msgDiv.style.color = 'red';
      }
    });
  }
});
