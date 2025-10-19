// Init AOS animations
document.addEventListener('DOMContentLoaded', function () {
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'ease-out-quart',
      once: true,
      offset: 80
    });
  }

  // Current year in footer
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Smooth scroll for navbar links
  var navLinks = document.querySelectorAll('a.nav-link, .btn[href^="#"]');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Contact form handling with Web3Forms
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      event.stopPropagation();

      // Check form validity
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      // Get elements
      var submitBtn = document.getElementById('submit-btn');
      var submitText = document.getElementById('submit-text');
      var submitSpinner = document.getElementById('submit-spinner');
      var formMessage = document.getElementById('form-message');

      // Show loading state
      submitBtn.disabled = true;
      submitSpinner.classList.remove('d-none');
      submitText.textContent = 'Sending...';
      formMessage.classList.add('d-none');

      // Get form data
      var formData = new FormData(form);

      try {
        // Send to Web3Forms API
        var response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        var data = await response.json();

        if (data.success) {
          // Success message
          formMessage.className = 'alert alert-success mb-3';
          formMessage.textContent = 'Thank you! Your message has been sent successfully.';
          formMessage.classList.remove('d-none');
          form.reset();
          form.classList.remove('was-validated');
        } else {
          // Error message
          formMessage.className = 'alert alert-danger mb-3';
          formMessage.textContent = 'Oops! Something went wrong. Please try again.';
          formMessage.classList.remove('d-none');
        }
      } catch (error) {
        // Network error
        formMessage.className = 'alert alert-danger mb-3';
        formMessage.textContent = 'Network error. Please check your connection and try again.';
        formMessage.classList.remove('d-none');
      } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitSpinner.classList.add('d-none');
        submitText.textContent = 'Send';
      }
    });
  }
});

// Vanilla tilt effect for project cards (lightweight custom)
// Removed 3D tilt effect as requested

// Removed scroll-snap intro observer


