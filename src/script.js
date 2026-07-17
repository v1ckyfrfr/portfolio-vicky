// ── Hamburger/Menu ──────────────────────────────────
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => mobileMenu.classList.remove("open"));
});

// ── skill bar ─────────────────────────────
const skillItems = document.querySelectorAll(".skill-item");

const animateSkills = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const pct = entry.target.dataset.pct;
      const fill = entry.target.querySelector(".skill-fill");
      fill.style.width = pct + "%";
      observer.unobserve(entry.target);
    }
  });
};

const skillObserver = new IntersectionObserver(animateSkills, {
  threshold: 0.3,
});
skillItems.forEach((item) => skillObserver.observe(item));

// ── sections (generic fade) ──────────────────────────
const fadeEls = document.querySelectorAll(
  ".hero-text, .hero-photo, .about-grid, .skills-grid, .works-grid, .cert-grid, .contact-box",
);

fadeEls.forEach((el) => el.classList.add("fade-in"));

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${i * 0.05}s`;
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

fadeEls.forEach((el) => fadeObserver.observe(el));

// ── experience
const expItems = document.querySelectorAll(".experience-item");

const expObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const item  = entry.target;
      const index = [...expItems].indexOf(item);

      setTimeout(() => {
        item.classList.add("exp-visible");

        const tags = item.querySelectorAll(".exp-tag");
        tags.forEach((tag, j) => {
          setTimeout(() => tag.classList.add("tag-visible"), 300 + j * 60);
        });
      }, index * 150);

      expObserver.unobserve(item);
    });
  },
  { threshold: 0.2 },
);

expItems.forEach((item) => expObserver.observe(item));

// ── navbar scroll ─────────────────────────────
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  nav.style.background =
    window.scrollY > 40 ? "rgba(13,13,13,0.97)" : "rgba(13,13,13,0.85)";
});
