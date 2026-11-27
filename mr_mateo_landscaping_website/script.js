// Menú móvil
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function setMenuOpen(isOpen) {
  navLinks.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(!navLinks.classList.contains("open"));
});

// Cerrar el menú al seleccionar una sección
document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

// Cerrar el menú con Escape o al tocar fuera de él
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navLinks.classList.contains("open")) {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

document.addEventListener("click", (event) => {
  if (navLinks.classList.contains("open") && !navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
    setMenuOpen(false);
  }
});

// Resaltar el enlace de la sección visible
const sectionLinks = new Map(
  [...document.querySelectorAll(".nav-links > .nav-link, .services-menu > .nav-link")]
    .map((link) => [link.getAttribute("href").slice(1), link])
);

function setActiveLink(id) {
  sectionLinks.forEach((link, linkId) => {
    const isActive = linkId === id;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  });
}

const observedSections = ["servicios", "nosotros", "perfil", "cotizacion", "contacto"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveLink(entry.target.id);
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
observedSections.forEach((section) => sectionObserver.observe(section));

window.addEventListener("scroll", () => {
  if (window.scrollY < 200) setActiveLink("inicio");
}, { passive: true });

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
