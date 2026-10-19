// Menú móvil
const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Año automático en el pie de página
document.querySelector("#year").textContent = new Date().getFullYear();

// Los enlaces de servicio seleccionan automáticamente la opción del formulario
document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const serviceSelect = document.querySelector("#service");
    const wanted = link.dataset.service;
    const option = [...serviceSelect.options].find((item) => item.text === wanted);
    if (option) serviceSelect.value = option.value;
  });
});

// Formulario de contacto: prepara un mensaje para WhatsApp.
// IMPORTANTE: reemplaza el número de ejemplo por el número de Nexati en formato internacional,
// solo dígitos, incluyendo código de país (Chile: 56), sin +, espacios ni guiones.
const WHATSAPP_NUMBER = "569XXXXXXXX";

document.querySelector("#contactForm").addEventListener("submit", (event) => {
  event.preventDefault();

  if (WHATSAPP_NUMBER.includes("X")) {
    alert("Antes de usar el formulario, abre app.js y reemplaza 569XXXXXXXX por tu número de WhatsApp en formato internacional.");
    return;
  }

  const name = document.querySelector("#name").value.trim();
  const service = document.querySelector("#service").value;
  const message = document.querySelector("#message").value.trim();

  const text = `Hola Nexati, soy ${name}. Me interesa: ${service}. Consulta: ${message}`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
