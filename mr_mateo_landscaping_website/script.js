// Menú móvil
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

// Cerrar el menú al seleccionar una sección
document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Año automático en el footer
document.getElementById("year").textContent = new Date().getFullYear();

// Formulario de cotización.
// Cambia este correo por el correo real del negocio.
// El formulario prepara un correo en el dispositivo del visitante; no envía datos a un servidor.
const BUSINESS_EMAIL = "your-email@example.com";

document.getElementById("quoteForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const subject = encodeURIComponent("Solicitud de cotización - Mr. Mateo Landscaping");
  const body = encodeURIComponent(
`Nueva solicitud de cotización

Nombre: ${data.get("name")}
Teléfono: ${data.get("phone")}
Correo: ${data.get("email") || "No proporcionado"}
Servicio: ${data.get("service")}

Detalles:
${data.get("details") || "No se proporcionaron detalles."}`
  );

  const feedback = document.getElementById("formFeedback");
  if (BUSINESS_EMAIL === "your-email@example.com") {
    feedback.textContent = "Antes de publicar, abre script.js y cambia BUSINESS_EMAIL por el correo real del negocio. La solicitud está lista, pero todavía no tiene un destinatario configurado.";
    return;
  }

  feedback.textContent = "Se abrirá tu aplicación de correo para enviar la solicitud.";
  window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
});
