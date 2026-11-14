const cuprins = document.querySelector("#cuprins");
const openers = document.querySelectorAll("[data-open-cuprins]");
const closers = document.querySelectorAll("[data-close-cuprins]");
const closeButton = cuprins.querySelector(".cuprins-close");
const contactFeature = document.querySelector(".contact-feature");
const contactLinks = document.querySelectorAll('a[href="#contact"]');
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setMenuOpen(open) {
  primaryNav.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(!primaryNav.classList.contains("is-open"));
});

primaryNav.querySelectorAll("a, button").forEach((item) => {
  item.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("click", (event) => {
  if (!primaryNav.contains(event.target) && !menuToggle.contains(event.target)) setMenuOpen(false);
});

document.documentElement.classList.add("reveal-ready");
const revealItems = document.querySelectorAll(".reveal");
const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" })
  : null;

revealItems.forEach((item) => {
  if (revealObserver) {
    revealObserver.observe(item);
  } else {
    item.classList.add("is-visible");
  }
});

function setExpanded(open) {
  openers.forEach((button) => button.setAttribute("aria-expanded", String(open)));
}

function openCuprins() {
  cuprins.hidden = false;
  document.body.classList.add("cuprins-open");
  setExpanded(true);
  closeButton.focus();
}

function closeCuprins() {
  cuprins.hidden = true;
  document.body.classList.remove("cuprins-open");
  setExpanded(false);
}

openers.forEach((button) => {
  button.addEventListener("click", openCuprins);
});

closers.forEach((button) => {
  button.addEventListener("click", closeCuprins);
});

cuprins.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeCuprins);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !cuprins.hidden) closeCuprins();
  if (event.key === "Escape") setMenuOpen(false);
});

contactLinks.forEach((link) => {
  link.addEventListener("click", () => {
    contactFeature.classList.remove("is-highlighted");
    requestAnimationFrame(() => {
      contactFeature.classList.add("is-highlighted");
    });
    window.setTimeout(() => {
      contactFeature.classList.remove("is-highlighted");
    }, 1900);
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start"
    });
    window.history.replaceState(null, "", link.getAttribute("href"));
  });
});
