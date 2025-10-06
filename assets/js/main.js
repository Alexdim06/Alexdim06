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

  // Bootstrap validation for contact form
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  }
});

// Vanilla tilt effect for project cards (lightweight custom)
// Removed 3D tilt effect as requested

// Removed scroll-snap intro observer


