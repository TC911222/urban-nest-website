/**
 * navbar.js
 * Renders the shared site navigation and wires up the mobile menu.
 * Call renderNavbar() once per page, passing the current page name.
 */

const NAV_LINKS = [
  { label: "Home", href: "/index.html", match: "index.html" },
  { label: "Properties", href: "/properties.html", match: "properties.html" },
  { label: "About", href: "/about.html", match: "about.html" },
  { label: "Contact", href: "/contact.html", match: "contact.html" },
];
export function renderNavbar(activePage) {
  const mount = document.getElementById("navbar");
  if (!mount) return;

  const linksHtml = NAV_LINKS.map((link) => {
    const isActive = link.match === activePage;
    return `<a href="${link.href}" class="${isActive ? "active" : ""}" ${isActive ? 'aria-current="page"' : ""}>${link.label}</a>`;
  }).join("");

  mount.innerHTML = `
    <div class="container">
      <a href="index.html" class="nav-logo" aria-label="Ochie Realty home">
        <span class="logo-main">Ochie&nbsp;Realty</span>
        <span class="logo-sub">AWKA · ANAMBRA</span>
      </a>

      <nav class="nav-links" id="navLinks" aria-label="Primary">
        ${linksHtml}
      </nav>

      <div class="nav-actions">
        <a href="contact.html" class="btn btn-primary btn-sm">
          <i class="fa-solid fa-house-circle-check" aria-hidden="true"></i>
          <span>List Property</span>
        </a>
        <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="navLinks" aria-label="Open menu">
          <i class="fa-solid fa-bars" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  `;

  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
      : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
      document.body.style.overflow = "";
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && links.classList.contains("open")) {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
      document.body.style.overflow = "";
    }
  });
}
