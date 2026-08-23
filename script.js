const menuBtn = document.getElementById("menuBtn");
const siteNav = document.getElementById("siteNav");
const navLinks = document.querySelectorAll(".site-nav a");
const yearEl = document.getElementById("year");
const closeMenu = () => {
  if (!menuBtn || !siteNav) return;
  siteNav.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", "Open navigation menu");
};

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (menuBtn && siteNav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuBtn.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!siteNav.contains(event.target) && !menuBtn.contains(event.target)) {
      closeMenu();
    }
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

const revealItems = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -30px 0px" }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 18, 140)}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const scrollProgress = document.getElementById("scrollProgress");

if (scrollProgress) {
  const updateScrollProgress = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    scrollProgress.style.width = `${Math.min(progress * 100, 100)}%`;
  };

  updateScrollProgress();
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  window.addEventListener("resize", updateScrollProgress);
}

const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

if (hasFinePointer && !prefersReducedMotion) {
  let pointerFrame;

  window.addEventListener(
    "pointermove",
    (event) => {
      if (pointerFrame) return;

      pointerFrame = window.requestAnimationFrame(() => {
        document.body.classList.add("pointer-active");
        document.body.style.setProperty("--cursor-x", `${event.clientX}px`);
        document.body.style.setProperty("--cursor-y", `${event.clientY}px`);
        pointerFrame = null;
      });
    },
    { passive: true }
  );

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${event.clientX - bounds.left}px`);
      card.style.setProperty("--mouse-y", `${event.clientY - bounds.top}px`);
    });
  });

  const portrait = document.querySelector(".portrait-frame");

  if (portrait) {
    portrait.addEventListener("pointermove", (event) => {
      const bounds = portrait.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      portrait.style.setProperty("--portrait-rx", `${y * -4}deg`);
      portrait.style.setProperty("--portrait-ry", `${x * 5}deg`);
    });

    portrait.addEventListener("pointerleave", () => {
      portrait.style.setProperty("--portrait-rx", "0deg");
      portrait.style.setProperty("--portrait-ry", "0deg");
    });
  }
}
