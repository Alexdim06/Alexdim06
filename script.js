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

  document.querySelectorAll(".btn, .nav-cta, .contact-email").forEach((control) => {
    control.addEventListener("pointermove", (event) => {
      const bounds = control.getBoundingClientRect();
      const x = (event.clientX - (bounds.left + bounds.width / 2)) * 0.12;
      const y = (event.clientY - (bounds.top + bounds.height / 2)) * 0.12;
      control.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });

    control.addEventListener("pointerleave", () => {
      control.style.removeProperty("transform");
    });
  });
}

const setScrolledState = () => {
  document.body.classList.toggle("scrolled", window.scrollY > 18);
};

setScrolledState();
window.addEventListener("scroll", setScrolledState, { passive: true });

const sectionLinks = new Map(
  [...navLinks]
    .filter((link) => link.hash)
    .map((link) => [link.hash.slice(1), link])
);
const trackedSections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window && sectionLinks.size) {
  const activeSectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => link.classList.remove("active"));
        sectionLinks.get(entry.target.id)?.classList.add("active");
      });
    },
    { rootMargin: "-32% 0px -58% 0px", threshold: 0 }
  );

  trackedSections.forEach((section) => activeSectionObserver.observe(section));
}

const counters = document.querySelectorAll("[data-count]");

if ("IntersectionObserver" in window && counters.length && !prefersReducedMotion) {
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.count);
        const suffix = counter.dataset.suffix || "";
        const startedAt = performance.now();
        const duration = 900;

        const updateCounter = (now) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = `${Math.round(target * eased)}${suffix}`;
          if (progress < 1) {
            window.requestAnimationFrame(updateCounter);
          }
        };

        window.requestAnimationFrame(updateCounter);
        observer.unobserve(counter);
      });
    },
    { threshold: 0.8 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

const clockEl = document.querySelector("[data-sofia-clock]");

if (clockEl) {
  const updateSofiaClock = () => {
    const time = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Sofia",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).format(new Date());

    clockEl.textContent = `Sofia · ${time}`;
  };

  updateSofiaClock();
  window.setInterval(updateSofiaClock, 30000);
}

const feedEl = document.querySelector("[data-feed]");
const feedTimeEl = document.querySelector("[data-feed-time]");
const feedMessages = [
  "Deployment completed",
  "Workflow synced",
  "Analytics event received",
  "Team update delivered"
];

if (feedEl && !prefersReducedMotion) {
  let feedIndex = 0;
  const feedParent = feedEl.closest(".dashboard-feed");

  window.setInterval(() => {
    feedIndex = (feedIndex + 1) % feedMessages.length;
    feedParent?.classList.add("is-swapping");

    window.setTimeout(() => {
      const marker = feedEl.querySelector("i");
      feedEl.textContent = "";
      if (marker) feedEl.append(marker);
      feedEl.append(` ${feedMessages[feedIndex]}`);
      if (feedTimeEl) feedTimeEl.textContent = "just now";
      feedParent?.classList.remove("is-swapping");
    }, 220);
  }, 3200);
}
