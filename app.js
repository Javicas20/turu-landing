const cookieBanner = document.getElementById("cookieBanner");
const acceptCookies = document.getElementById("acceptCookies");
const menuButton = document.querySelector(".menu-button");
const mainNav = document.getElementById("mainNav");
const newsletterForm = document.getElementById("newsletterForm");
const newsletterStatus = document.getElementById("newsletterStatus");
const config = window.TURU_CONFIG ?? {};

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

newsletterForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  newsletterStatus.textContent = "¡Gracias! Te mantendremos al día.";
  newsletterForm.reset();
});

if (cookieBanner && localStorage.getItem("turu_cookie_notice") !== "accepted") {
  cookieBanner.hidden = false;
}

acceptCookies?.addEventListener("click", () => {
  localStorage.setItem("turu_cookie_notice", "accepted");
  cookieBanner.hidden = true;
});
