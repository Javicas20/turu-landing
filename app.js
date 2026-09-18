const cookieBanner = document.getElementById("cookieBanner");
const acceptCookies = document.getElementById("acceptCookies");
const loginForm = document.getElementById("loginForm");
const loginButton = document.getElementById("loginButton");
const loginStatus = document.getElementById("loginStatus");
const loginDialog = document.getElementById("loginDialog");
const menuButton = document.querySelector(".menu-button");
const mainNav = document.getElementById("mainNav");
const newsletterForm = document.getElementById("newsletterForm");
const newsletterStatus = document.getElementById("newsletterStatus");
const config = window.TURU_CONFIG ?? {};

document.querySelectorAll("[data-login-open]").forEach((button) => {
  button.addEventListener("click", () => {
    if (typeof loginDialog?.showModal === "function") {
      loginDialog.showModal();
      window.setTimeout(() => loginForm?.elements.email?.focus(), 80);
    }
  });
});

document.querySelector("[data-login-close]")?.addEventListener("click", () => {
  loginDialog?.close();
});

loginDialog?.addEventListener("click", (event) => {
  if (event.target === loginDialog) loginDialog.close();
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

function setLoginStatus(message, kind = "") {
  if (!loginStatus) return;
  loginStatus.textContent = message;
  loginStatus.dataset.kind = kind;
}

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    setLoginStatus("Introduce tu correo y contraseña.", "error");
    return;
  }

  if (!window.supabase?.createClient || !config.supabaseUrl || !config.supabasePublishableKey) {
    setLoginStatus("El acceso web todavía no está configurado.", "error");
    return;
  }

  loginButton.disabled = true;
  setLoginStatus("Comprobando tus datos…", "loading");

  try {
    const client = window.supabase.createClient(config.supabaseUrl, config.supabasePublishableKey);
    const { error } = await client.auth.signInWithPassword({ email, password });
    if (error) throw error;

    setLoginStatus("Acceso correcto. Abriendo TURU…", "success");
    if (config.appUrl) {
      window.location.assign(config.appUrl);
    } else {
      setLoginStatus("Acceso correcto. La versión web del panel aún no está publicada; puedes abrir TURU desde la app.", "success");
    }
  } catch (error) {
    const message = error?.message?.toLowerCase().includes("invalid login credentials")
      ? "El correo o la contraseña no son correctos."
      : "No hemos podido iniciar sesión. Inténtalo de nuevo.";
    setLoginStatus(message, "error");
  } finally {
    loginButton.disabled = false;
  }
});

const authState = new URLSearchParams(window.location.search).get("auth");
if (authState === "confirmed") {
  setLoginStatus("Correo confirmado. Ya puedes iniciar sesión.", "success");
}
