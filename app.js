// Número de WhatsApp: solo dígitos, con código de país y sin "+".
// Un móvil chileno tiene 11 dígitos (56 + 9 + 8 dígitos). Revisa que este esté completo.
const WHATSAPP_NUMBER = "5695521699";

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

function setMenu(open) {
  mainNav.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  menuToggle.textContent = open ? "✕" : "☰";
}

menuToggle.addEventListener("click", () => setMenu(!mainNav.classList.contains("open")));
mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
document.addEventListener("click", (e) => {
  if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) setMenu(false);
});

document.querySelector("#year").textContent = new Date().getFullYear();

// Los botones de servicio y plan preseleccionan el formulario
const serviceSelect = document.querySelector("#service");
const messageBox = document.querySelector("#message");

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const option = [...serviceSelect.options].find((item) => item.text === link.dataset.service);
    if (option) serviceSelect.value = option.value;
    if (link.dataset.plan && !messageBox.value.trim()) {
      messageBox.value = `Quiero consultar por el plan ${link.dataset.plan}.`;
    }
  });
});

// El formulario prepara un mensaje de WhatsApp para que lo revises antes de enviarlo
document.querySelector("#contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value.trim();
  const service = serviceSelect.value;
  const message = messageBox.value.trim();
  const text = `Hola, soy ${name}. Me interesa: ${service}. Consulta: ${message}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
});
