// ISAR SIEPA Digital — comportamiento del menú y formulario.
// IMPORTANTE: cambia WHATSAPP_NUMBER por tu número comercial con código de país,
// solo números, sin +, espacios ni guiones. Ejemplo de formato chileno: 56912345678.
const WHATSAPP_NUMBER = "569XXXXXXXX";

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const contactForm = document.getElementById("contactForm");
const formHelp = document.getElementById("formHelp");
const year = document.getElementById("year");

if (year) year.textContent = new Date().getFullYear();

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
      menuToggle.textContent = "☰";
    });
  });
}

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const serviceSelect = document.getElementById("service");
    if (serviceSelect) serviceSelect.value = link.dataset.service;
  });
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    if (WHATSAPP_NUMBER.includes("X") || WHATSAPP_NUMBER.length < 10) {
      if (formHelp) {
        formHelp.textContent = "Antes de usar el formulario, abre app.js y reemplaza 569XXXXXXXX por tu número comercial de WhatsApp (solo números).";
        formHelp.classList.add("form-warning");
      }
      alert("Falta configurar el número comercial de WhatsApp en app.js. No se ha enviado ningún mensaje.");
      return;
    }

    const data = new FormData(contactForm);
    const name = String(data.get("name") || "").trim();
    const business = String(data.get("business") || "").trim();
    const service = String(data.get("service") || "").trim();
    const details = String(data.get("details") || "").trim();
    const message = [
      "Hola, ISAR SIEPA Digital. Quiero consultar por un proyecto.",
      `Nombre: ${name}`,
      business ? `Negocio: ${business}` : "",
      `Servicio: ${service}`,
      `Detalles: ${details}`
    ].filter(Boolean).join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });
}
