document.documentElement.classList.add("js");
const menuButton = document.querySelector(".menu-button");
const mainNav = document.getElementById("mainNav");
const config = window.TURU_CONFIG ?? {};
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const header = document.querySelector(".site-header");
const progressBar = document.querySelector(".scroll-progress span");

document.querySelectorAll("[data-app-link]").forEach((link) => {
  link.setAttribute("href", config.appUrl || "https://app.turito.es/");
});

menuButton?.addEventListener("click", () => {
  const isOpen = mainNav?.classList.toggle("open") ?? false;
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

function updateScrollState() {
  const scrollTop = window.scrollY;
  const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollRange > 0 ? Math.min(scrollTop / scrollRange, 1) : 0;
  header?.classList.toggle("is-scrolled", scrollTop > 18);
  if (progressBar) progressBar.style.transform = `scaleX(${progress})`;
}

updateScrollState();
window.addEventListener("scroll", updateScrollState, { passive: true });

const revealElements = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window && !prefersReducedMotion.matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const delay = Number(entry.target.dataset.delay || 0);
      window.setTimeout(() => entry.target.classList.add("is-visible"), delay);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -6%" });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const counters = document.querySelectorAll("[data-counter]");

function animateCounter(element) {
  const target = Number(element.dataset.counter || 0);
  const duration = 1100;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = String(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

if ("IntersectionObserver" in window && !prefersReducedMotion.matches) {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.7 });
  counters.forEach((counter) => counterObserver.observe(counter));
} else {
  counters.forEach((counter) => { counter.textContent = counter.dataset.counter; });
}

const phoneStage = document.querySelector("[data-phone-stage]");

if (phoneStage && !prefersReducedMotion.matches && window.matchMedia("(pointer: fine)").matches) {
  phoneStage.addEventListener("pointermove", (event) => {
    const rect = phoneStage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    phoneStage.style.setProperty("--phone-x", `${x * 14}px`);
    phoneStage.style.setProperty("--phone-y", `${y * 10}px`);
    phoneStage.style.setProperty("--phone-rx", `${y * -3}deg`);
    phoneStage.style.setProperty("--phone-ry", `${x * 4}deg`);
  });
  phoneStage.addEventListener("pointerleave", () => {
    phoneStage.style.setProperty("--phone-x", "0px");
    phoneStage.style.setProperty("--phone-y", "0px");
    phoneStage.style.setProperty("--phone-rx", "0deg");
    phoneStage.style.setProperty("--phone-ry", "0deg");
  });
}

document.querySelectorAll(".interactive-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  });
});
